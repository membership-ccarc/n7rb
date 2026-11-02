import { createHash } from "node:crypto";
import { isIP } from "node:net";

export const MAX_BODY_BYTES = 16 * 1024;
const WINDOW_SECONDS = 3600;
const MAX_SUBMISSIONS = 3;
const MAX_LOCAL_BUCKETS = 5000;
const buckets = new Map<string, { count: number; resetAt: number }>();
let warnedAboutLocalLimit = false;

export class FormRequestError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isValidEmail(value: string) {
  return value.length <= 254 && /^[^\s@\x00-\x1f\x7f]+@[^\s@\x00-\x1f\x7f]+\.[^\s@\x00-\x1f\x7f]+$/.test(value);
}

export function hasStringFields(body: Record<string, unknown>, required: string[], optional: string[] = []) {
  return required.every((key) => typeof body[key] === "string") &&
    optional.every((key) => body[key] === undefined || typeof body[key] === "string");
}

// Only trust Vercel's overwritten header when running on Vercel. Arbitrary proxy
// headers (especially cf-connecting-ip) are not an authenticated client identity.
export function getClientIp(request: Request) {
  if (process.env.VERCEL !== "1") return "local";
  const value = request.headers.get("x-vercel-forwarded-for")?.trim() ?? "";
  if (!isIP(value)) throw new FormRequestError(503, "Unable to accept submissions right now. Please try again later.");
  return value;
}

const rateLimitScript = `
local count = redis.call('INCR', KEYS[1])
if count == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end
return count
`;

function localRateLimited(key: string) {
  const now = Date.now();
  for (const [entryKey, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(entryKey);
  }
  const bucket = buckets.get(key);
  if (bucket) return ++bucket.count > MAX_SUBMISSIONS;
  // Do not evict active entries: that would allow cycling identities to reset limits.
  if (buckets.size >= MAX_LOCAL_BUCKETS) return true;
  buckets.set(key, { count: 1, resetAt: now + WINDOW_SECONDS * 1000 });
  return false;
}

export async function enforceRateLimit(request: Request, form: "contact" | "class-signup") {
  const ip = getClientIp(request);
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  // Store a digest rather than a raw client IP. Separate preview and production.
  const key = `forms:${process.env.VERCEL_ENV ?? "local"}:${form}:${createHash("sha256").update(ip).digest("hex")}`;
  let limited: boolean;
  if (url || token) {
    let reason = !url ? "missing_url" : !token ? "missing_token" : "invalid_url";
    let status: number | undefined;
    try {
      if (!url || !token) throw new Error("Incomplete limiter configuration");
      const endpoint = new URL(url ?? "");
      if (!token || endpoint.protocol !== "https:" || !endpoint.hostname.endsWith(".upstash.io") ||
          endpoint.username || endpoint.password || endpoint.port || endpoint.pathname !== "/" || endpoint.search || endpoint.hash) {
        throw new Error("Invalid limiter configuration");
      }
      reason = "network_error";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(["EVAL", rateLimitScript, "1", key, String(WINDOW_SECONDS)]),
        signal: AbortSignal.timeout(3000),
        redirect: "error",
        cache: "no-store",
      });
      status = response.status;
      reason = status === 401 ? "authentication_failed" : status === 403 ? "permission_denied" :
        status === 429 ? "provider_rate_limited" : "provider_http_error";
      if (!response.ok) throw new Error("Limiter unavailable");
      reason = "invalid_response";
      const data: unknown = await response.json();
      if (isRecord(data) && typeof data.error === "string") {
        reason = /NOPERM|read.?only|permission/i.test(data.error) ? "permission_denied" :
          /NOAUTH|WRONGPASS|unauthori|token/i.test(data.error) ? "authentication_failed" :
          /quota|limit exceeded|max requests/i.test(data.error) ? "provider_quota_exceeded" : "redis_command_error";
        throw new Error("Redis rejected limiter command");
      }
      if (!isRecord(data) || data.error || !Number.isSafeInteger(data.result) || (data.result as number) < 1) {
        throw new Error("Invalid limiter response");
      }
      limited = (data.result as number) > MAX_SUBMISSIONS;
    } catch (error) {
      if (error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError")) reason = "timeout";
      // Only log fixed categories and HTTP status, never provider messages or credentials.
      // Never silently weaken a configured shared limit during an outage.
      console.error("Form rate limiter unavailable.", { form, reason, ...(status === undefined ? {} : { status }) });
      throw new FormRequestError(503, "Unable to accept submissions right now. Please try again later.");
    }
  } else {
    if (!warnedAboutLocalLimit && process.env.VERCEL === "1") {
      console.warn("Shared form rate limiting is not configured; using a per-instance fallback.");
      warnedAboutLocalLimit = true;
    }
    limited = localRateLimited(key);
  }
  if (limited) throw new FormRequestError(429, "Too many submissions. Please try again in an hour.");
}

export async function readFormJson(request: Request): Promise<unknown> {
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    throw new FormRequestError(415, "Please submit the form as JSON.");
  }
  const encoding = request.headers.get("content-encoding");
  if (encoding && encoding.toLowerCase() !== "identity") throw new FormRequestError(415, "Unsupported request encoding.");
  const length = request.headers.get("content-length");
  if (length && (!/^\d+$/.test(length) || Number(length) > MAX_BODY_BYTES)) {
    throw new FormRequestError(413, "Submission is too large.");
  }
  const reader = request.body?.getReader();
  if (!reader) throw new FormRequestError(400, "Invalid JSON body.");
  const chunks: Uint8Array[] = [];
  let size = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new FormRequestError(408, "Submission timed out.")), 5000);
  });
  try {
    while (true) {
      const { done, value } = await Promise.race([reader.read(), timeout]);
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) throw new FormRequestError(413, "Submission is too large.");
      chunks.push(value);
    }
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch (error) {
    // Do not wait for a client-controlled stream to acknowledge cancellation.
    void reader.cancel().catch(() => {});
    if (error instanceof FormRequestError) throw error;
    throw new FormRequestError(400, "Invalid JSON body.");
  } finally {
    clearTimeout(timer);
    reader.releaseLock();
  }
}

export function formErrorResponse(error: unknown) {
  const known = error instanceof FormRequestError;
  return Response.json({ error: known ? error.message : "Unable to accept submissions right now." }, {
    status: known ? error.status : 503,
    headers: {
      "Cache-Control": "no-store",
      ...(known && error.status === 429 ? { "Retry-After": String(WINDOW_SECONDS) } : {}),
    },
  });
}

export async function submitWebhook(form: "contact" | "class-signup", payload: object) {
  const prefix = form === "contact" ? "MAKE_CONTACT" : "MAKE_CLASS_SIGNUP";
  const apiKey = process.env[`${prefix}_API_KEY`]?.trim();
  let endpoint: URL;
  try {
    endpoint = new URL(process.env[`${prefix}_WEBHOOK_URL`] ?? "");
    if (!apiKey || /[\x00-\x1f\x7f]/.test(apiKey) || endpoint.protocol !== "https:" ||
        !/^hook\.(?:[a-z0-9-]+\.)?make\.com$/.test(endpoint.hostname) || endpoint.port ||
        endpoint.username || endpoint.password || endpoint.search || endpoint.hash || endpoint.pathname.length < 2) {
      throw new Error("Invalid webhook configuration");
    }
  } catch {
    console.error("Form webhook configuration is invalid.", { form });
    throw new FormRequestError(503, "Unable to accept submissions right now. Please try again later.");
  }
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-make-apikey": apiKey },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
      redirect: "error",
      cache: "no-store",
    });
    // The response body is not needed, and may contain submitted personal data.
    void response.body?.cancel().catch(() => {});
    if (!response.ok) {
      console.error("Form webhook returned an error.", { form, status: response.status });
      throw new FormRequestError(502, "Unable to submit the form. Please try again later.");
    }
  } catch (error) {
    if (error instanceof FormRequestError) throw error;
    // Do not log exception objects: fetch errors can contain secret webhook URLs.
    console.error("Form webhook request failed.", { form });
    throw new FormRequestError(502, "Unable to submit the form. Please try again later.");
  }
}

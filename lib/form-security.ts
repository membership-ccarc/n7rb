import { createHash } from "node:crypto";
import { isIP } from "node:net";

export const MAX_BODY_BYTES = 16 * 1024;
const WINDOW_SECONDS = 10 * 60;
const MAX_SUBMISSIONS = 10;
const MAX_LOCAL_BUCKETS = 5000;
const buckets = new Map<string, { count: number; resetAt: number }>();

export class FormRequestError extends Error {
  constructor(public status: number, message: string, public retryAfterSeconds?: number) {
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

// Best-effort per-instance protection: no external service or credentials.
// Counters reset on cold starts and are not shared across Vercel instances.
export async function enforceRateLimit(request: Request, form: "contact" | "class-signup") {
  const ip = getClientIp(request);
  const key = `${form}:${createHash("sha256").update(ip).digest("hex")}`;
  const now = Date.now();
  for (const [entryKey, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(entryKey);
  }
  const bucket = buckets.get(key);
  if (bucket) {
    if (bucket.count >= MAX_SUBMISSIONS) {
      const seconds = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
      const minutes = Math.ceil(seconds / 60);
      throw new FormRequestError(429, `Too many attempts. Please try again in ${minutes} ${minutes === 1 ? "minute" : "minutes"}.`, seconds);
    }
    bucket.count += 1;
    return;
  }
  // Keep active limits intact when at capacity; do not allow rotating identities
  // to evict them. Return a short retry instead of an unrelated ten-minute lockout.
  if (buckets.size >= MAX_LOCAL_BUCKETS) {
    throw new FormRequestError(503, "The form is busy. Please try again in a minute.", 60);
  }
  buckets.set(key, { count: 1, resetAt: now + WINDOW_SECONDS * 1000 });
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
      ...(known && error.retryAfterSeconds ? { "Retry-After": String(error.retryAfterSeconds) } : {}),
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

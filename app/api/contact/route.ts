import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  callsign: string;
  phone: string;
  message: string;
};

type SpamCheckBody = ContactPayload & {
  website: string;
  renderedAt: string;
};

const GENERIC_SUCCESS = { ok: true };
const GENERIC_VALIDATION_ERROR = "Please check your message and try again.";
const MIN_SUBMIT_SECONDS = 4;
const MAX_LINKS = 2;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

// In-memory rate limiting is a lightweight fallback. On serverless platforms,
// each instance has its own map and entries disappear when the instance resets.
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getWebhookUrl(value: string | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return request.headers.get("cf-connecting-ip") ?? request.headers.get("x-real-ip") ?? forwardedFor ?? "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(ip);

  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX;
}

function countLinks(value: string) {
  return (value.match(/https?:\/\/|www\.|[a-z0-9-]+\.(com|org|net|info|biz|xyz|ru|cn|top|site)\b/gi) ?? []).length;
}

function hasSuspiciousInjection(value: string) {
  return /<\s*\/?\s*script\b|javascript\s*:|onerror\s*=|onload\s*=|<\s*iframe\b|<\s*object\b|<\s*embed\b|union\s+select|drop\s+table|insert\s+into|--\s*$|\{\{|\}\}/i.test(value);
}

function isGibberish(value: string) {
  const compact = value.replace(/\s+/g, "");
  const hasLongNoSpaceRun = /[A-Za-z0-9]{24,}/.test(value);
  const mixedCaseNonsense = /[a-z][A-Z][a-z][A-Z]|[A-Z][a-z][A-Z][a-z]/.test(compact);
  const hasFewVowels = (compact.match(/[aeiou]/gi) ?? []).length / Math.max(compact.length, 1) < 0.15;
  const mostlyRandomChars = compact.length >= 18 && hasLongNoSpaceRun && (mixedCaseNonsense || hasFewVowels);

  return mostlyRandomChars;
}

function hasSuspiciousSingleToken(value: string) {
  const compact = value.replace(/[^a-z0-9]/gi, "");
  if (/\s/.test(value) || compact.length < 18) return false;

  const hasAlternatingCase = /[a-z][A-Z][a-z][A-Z]|[A-Z][a-z][A-Z][a-z]/.test(compact);
  const hasLongConsonantRun = /[bcdfghjklmnpqrstvwxyz]{6,}/i.test(compact);
  const vowelRatio = (compact.match(/[aeiou]/gi) ?? []).length / compact.length;

  // Real one-word names exist, so require length plus random-looking structure.
  return hasAlternatingCase || hasLongConsonantRun || vowelRatio < 0.2;
}

function hasSuspiciousEmailLocalPart(email: string) {
  const localPart = email.split("@")[0] ?? "";
  const compact = localPart.replace(/[^a-z0-9]/gi, "");
  if (compact.length < 18) return false;

  const dottedNoise = (localPart.match(/\./g) ?? []).length >= 4 && /\d/.test(localPart);
  return dottedNoise || hasSuspiciousSingleToken(compact);
}

function hasSuspiciousShortMessage(message: string) {
  const compact = message.replace(/\s+/g, "");
  if (/\s/.test(message) || compact.length < 16) return false;

  const mixedCaseNonsense = /[a-z][A-Z][a-z]|[A-Z][a-z][A-Z]/.test(compact);
  const wordLikeVowelRatio = (compact.match(/[aeiou]/gi) ?? []).length / compact.length;

  // Short, no-space mixed-case strings are a common bot test payload.
  return mixedCaseNonsense && wordLikeVowelRatio < 0.45;
}

function logSpam(reason: string, request: NextRequest) {
  console.warn("Contact form spam rejected.", {
    reason,
    ip: getClientIp(request),
    userAgent: request.headers.get("user-agent") ?? "unknown",
  });
}

function validatePayload(body: unknown): { payload?: ContactPayload; spamReason?: string; error?: string } {
  if (!isRecord(body)) return { error: "Invalid request." };

  const candidate: SpamCheckBody = {
    name: asTrimmedString(body.name),
    email: asTrimmedString(body.email),
    callsign: asTrimmedString(body.callsign),
    phone: asTrimmedString(body.phone),
    message: asTrimmedString(body.message),
    website: asTrimmedString(body.website),
    renderedAt: asTrimmedString(body.renderedAt),
  };

  if (candidate.website) return { spamReason: "honeypot" };

  const renderedAt = Number(candidate.renderedAt);
  if (!Number.isFinite(renderedAt)) return { spamReason: "missing timestamp" };
  if (Date.now() - renderedAt < MIN_SUBMIT_SECONDS * 1000) return { spamReason: "submitted too quickly" };

  if (candidate.name.length < 2 || candidate.name.length > 60) return { error: GENERIC_VALIDATION_ERROR };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate.email)) return { error: GENERIC_VALIDATION_ERROR };
  if (candidate.callsign.length > 20 || candidate.phone.length > 30) return { error: GENERIC_VALIDATION_ERROR };
  if (candidate.message.length < 10 || candidate.message.length > 2000) return { error: GENERIC_VALIDATION_ERROR };

  const combinedText = `${candidate.name}\n${candidate.email}\n${candidate.callsign}\n${candidate.phone}\n${candidate.message}`;
  if (hasSuspiciousSingleToken(candidate.name)) return { spamReason: "suspicious name" };
  if (hasSuspiciousEmailLocalPart(candidate.email)) return { spamReason: "suspicious email local part" };
  if (hasSuspiciousShortMessage(candidate.message)) return { spamReason: "suspicious short message" };
  if (isGibberish(candidate.message)) return { spamReason: "gibberish message" };
  if (countLinks(candidate.message) > MAX_LINKS) return { spamReason: "too many links" };
  if (hasSuspiciousInjection(combinedText)) return { spamReason: "injection pattern" };

  return {
    payload: {
      name: candidate.name,
      email: candidate.email.toLowerCase(),
      callsign: candidate.callsign.toUpperCase(),
      phone: candidate.phone,
      message: candidate.message,
    },
  };
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    logSpam("rate limit", request);
    return NextResponse.json(GENERIC_SUCCESS);
  }

  const { payload, spamReason, error } = validatePayload(body);

  if (spamReason) {
    logSpam(spamReason, request);
    return NextResponse.json(GENERIC_SUCCESS);
  }

  if (!payload) {
    return NextResponse.json({ error: error ?? GENERIC_VALIDATION_ERROR }, { status: 400 });
  }

  const webhookUrl = getWebhookUrl(process.env.MAKE_CONTACT_WEBHOOK_URL);

  if (!webhookUrl) {
    console.error("MAKE_CONTACT_WEBHOOK_URL is missing or is not a valid URL.");
    return NextResponse.json({ error: "Contact form is not configured correctly." }, { status: 500 });
  }

  const webhookPayload = {
    ...payload,
    source: "n7rb.org contact form",
    submittedAt: new Date().toISOString(),
    spam_checked: true,
  };

  const apiKey = process.env.MAKE_CONTACT_API_KEY;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (apiKey) headers["x-make-apikey"] = apiKey;

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(webhookPayload),
    });

    if (!response.ok) {
      console.error("Make.com contact webhook returned an error.", response.status, response.statusText);
      return NextResponse.json({ error: "Unable to submit your message." }, { status: 502 });
    }
  } catch (err) {
    console.error("Contact webhook request failed.", err);
    return NextResponse.json({ error: "Unable to submit your message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

import { NextRequest, NextResponse } from "next/server";

const licenseInterests = ["Technician", "General", "Not sure yet"] as const;
const experienceLevels = ["Completely new", "Studying now", "Licensed but inactive", "Currently licensed"] as const;
const contactMethods = ["Email", "Phone", "Text"] as const;
const mainInterests = [
  "Get My Ham License",
  "Emergency communications",
  "SOTA/POTA",
  "Outdoor/adventure radio",
  "Electronics/maker projects",
  "Digital Communications",
  "General curiosity",
] as const;

const GENERIC_SUCCESS = { ok: true };
const MIN_SUBMIT_SECONDS = 4;
const MAX_LINKS = 2;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

// In-memory rate limiting is a lightweight fallback. On serverless platforms,
// each instance has its own map and entries disappear when the instance resets.
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

type ClassSignupPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  licenseInterest: string;
  experienceLevel: string;
  mainInterests: string[];
  preferredContactMethod: string;
  notes?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isAllowedValue<T extends readonly string[]>(value: string, allowedValues: T) {
  return allowedValues.includes(value as T[number]);
}

function getWebhookUrl(value: string | undefined) {
  if (!value) {
    return null;
  }

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
  console.warn("Class signup spam rejected.", {
    reason,
    ip: getClientIp(request),
    userAgent: request.headers.get("user-agent") ?? "unknown",
  });
}

function validatePayload(body: unknown): { payload?: ClassSignupPayload; spamReason?: string; error?: string } {
  if (!isRecord(body)) {
    return { error: "Invalid signup request." };
  }

  const website = asTrimmedString(body.website);
  const renderedAt = Number(asTrimmedString(body.renderedAt));

  if (website) return { spamReason: "honeypot" };
  if (!Number.isFinite(renderedAt)) return { spamReason: "missing timestamp" };
  if (Date.now() - renderedAt < MIN_SUBMIT_SECONDS * 1000) return { spamReason: "submitted too quickly" };

  const payload: ClassSignupPayload = {
    firstName: asTrimmedString(body.firstName),
    lastName: asTrimmedString(body.lastName),
    email: asTrimmedString(body.email),
    phone: asTrimmedString(body.phone),
    licenseInterest: asTrimmedString(body.licenseInterest),
    experienceLevel: asTrimmedString(body.experienceLevel),
    mainInterests: Array.isArray(body.mainInterests) ? body.mainInterests.map(asTrimmedString).filter(Boolean) : [],
    preferredContactMethod: asTrimmedString(body.preferredContactMethod),
    notes: asTrimmedString(body.notes),
  };

  if (!payload.firstName || !payload.lastName || !payload.email) {
    return { error: "First name, last name, and email are required." };
  }

  if (!payload.email.includes("@")) {
    return { error: "A valid email address is required." };
  }

  if (!isAllowedValue(payload.licenseInterest, licenseInterests)) {
    return { error: "Choose a valid license interest." };
  }

  if (!isAllowedValue(payload.experienceLevel, experienceLevels)) {
    return { error: "Choose a valid experience level." };
  }

  if (!isAllowedValue(payload.preferredContactMethod, contactMethods)) {
    return { error: "Choose a valid preferred contact method." };
  }

  if ((payload.preferredContactMethod === "Phone" || payload.preferredContactMethod === "Text") && !payload.phone) {
    return { error: "Phone number is required when phone or text is preferred." };
  }

  if (payload.mainInterests.length === 0 || payload.mainInterests.some((interest) => !isAllowedValue(interest, mainInterests))) {
    return { error: "Choose at least one valid main interest." };
  }

  if (hasSuspiciousSingleToken(payload.firstName)) return { spamReason: "suspicious first name" };
  if (hasSuspiciousSingleToken(payload.lastName)) return { spamReason: "suspicious last name" };
  if (hasSuspiciousEmailLocalPart(payload.email)) return { spamReason: "suspicious email local part" };

  if (payload.notes) {
    if (hasSuspiciousShortMessage(payload.notes)) return { spamReason: "suspicious short notes" };
    if (isGibberish(payload.notes)) return { spamReason: "gibberish notes" };
    if (countLinks(payload.notes) > MAX_LINKS) return { spamReason: "too many links" };
  }

  const combinedText = `${payload.firstName}\n${payload.lastName}\n${payload.email}\n${payload.notes ?? ""}`;
  if (hasSuspiciousInjection(combinedText)) return { spamReason: "injection pattern" };

  return { payload };
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
    return NextResponse.json({ error }, { status: 400 });
  }

  const webhookUrl = getWebhookUrl(process.env.MAKE_CLASS_SIGNUP_WEBHOOK_URL);

  if (!webhookUrl) {
    console.error("MAKE_CLASS_SIGNUP_WEBHOOK_URL is missing or is not a valid URL.");
    return NextResponse.json({ error: "Class signup automation is not configured correctly." }, { status: 500 });
  }

  const webhookPayload = {
    ...payload,
    source: "n7rb.org class signup form",
    submittedAt: new Date().toISOString(),
  };

  const apiKey = process.env.MAKE_CLASS_SIGNUP_API_KEY;
  const webhookHeaders: Record<string, string> = { "Content-Type": "application/json" };
  if (apiKey) {
    webhookHeaders["x-make-apikey"] = apiKey;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: webhookHeaders,
      body: JSON.stringify(webhookPayload),
    });

    if (!response.ok) {
      console.error("Make.com webhook returned an error.", response.status, response.statusText);
      return NextResponse.json({ error: "Unable to submit class signup." }, { status: 502 });
    }
  } catch (submissionError) {
    console.error("Class signup webhook request failed.", submissionError);
    return NextResponse.json({ error: "Unable to submit class signup." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

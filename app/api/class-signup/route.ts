import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit, readFormJson, formErrorResponse, submitWebhook, isRecord, isValidEmail, hasStringFields } from "../../../lib/form-security";

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

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isAllowedValue<T extends readonly string[]>(value: string, allowedValues: T) {
  return allowedValues.includes(value as T[number]);
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

function logSpam(reason: string) {
  console.warn("Class signup spam rejected.", {
    reason,
  });
}

function validatePayload(body: unknown): { payload?: ClassSignupPayload; spamReason?: string; error?: string } {
  if (!isRecord(body)) {
    return { error: "Invalid signup request." };
  }

  if (!hasStringFields(body, ["firstName", "lastName", "email", "licenseInterest", "experienceLevel", "preferredContactMethod", "renderedAt"], ["phone", "notes", "website"])) {
    return { error: "Please check your signup and try again." };
  }
  if (!Array.isArray(body.mainInterests) || body.mainInterests.length > mainInterests.length ||
      body.mainInterests.some((value) => typeof value !== "string")) {
    return { error: "Choose valid main interests." };
  }

  const website = asTrimmedString(body.website);
  const renderedAt = Number(asTrimmedString(body.renderedAt));

  if (website) return { spamReason: "honeypot" };
  if (!body.renderedAt || !Number.isFinite(renderedAt) || renderedAt <= 0) return { spamReason: "missing timestamp" };
  if (Date.now() - renderedAt < MIN_SUBMIT_SECONDS * 1000) return { spamReason: "submitted too quickly" };

  const payload: ClassSignupPayload = {
    firstName: asTrimmedString(body.firstName),
    lastName: asTrimmedString(body.lastName),
    email: asTrimmedString(body.email),
    phone: asTrimmedString(body.phone),
    licenseInterest: asTrimmedString(body.licenseInterest),
    experienceLevel: asTrimmedString(body.experienceLevel),
    mainInterests: [...new Set(body.mainInterests.map(asTrimmedString))],
    preferredContactMethod: asTrimmedString(body.preferredContactMethod),
    notes: asTrimmedString(body.notes),
  };

  if (!payload.firstName || !payload.lastName || !payload.email) {
    return { error: "First name, last name, and email are required." };
  }

  if (payload.firstName.length > 60 || payload.lastName.length > 60 ||
      (payload.phone?.length ?? 0) > 30 || (payload.notes?.length ?? 0) > 2000) {
    return { error: "Please shorten your name, phone number, or notes and try again." };
  }

  if (!isValidEmail(payload.email)) {
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
    await enforceRateLimit(request, "class-signup");
    body = await readFormJson(request);
  } catch (error) {
    return formErrorResponse(error);
  }

  const { payload, spamReason, error } = validatePayload(body);

  if (spamReason) {
    logSpam(spamReason);
    return NextResponse.json(GENERIC_SUCCESS);
  }

  if (!payload) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const webhookPayload = {
    ...payload,
    source: "n7rb.org class signup form",
    submittedAt: new Date().toISOString(),
  };

  try {
    await submitWebhook("class-signup", webhookPayload);
  } catch (error) {
    return formErrorResponse(error);
  }

  return NextResponse.json({ ok: true });
}

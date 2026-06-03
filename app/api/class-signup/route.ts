import { NextResponse } from "next/server";

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

function validatePayload(body: unknown): { payload?: ClassSignupPayload; error?: string } {
  if (!isRecord(body)) {
    return { error: "Invalid signup request." };
  }

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

  return { payload };
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { payload, error } = validatePayload(body);

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

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

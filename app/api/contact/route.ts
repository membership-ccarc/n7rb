import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

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

function validatePayload(body: unknown): { payload?: ContactPayload; error?: string } {
  if (!isRecord(body)) return { error: "Invalid request." };

  const payload: ContactPayload = {
    name: asTrimmedString(body.name),
    email: asTrimmedString(body.email),
    message: asTrimmedString(body.message),
  };

  if (!payload.name) return { error: "Name is required." };
  if (!payload.email || !payload.email.includes("@")) return { error: "A valid email address is required." };
  if (!payload.message) return { error: "Message is required." };

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

  const webhookUrl = getWebhookUrl(process.env.MAKE_CONTACT_WEBHOOK_URL);

  if (!webhookUrl) {
    console.error("MAKE_CONTACT_WEBHOOK_URL is missing or is not a valid URL.");
    return NextResponse.json({ error: "Contact form is not configured correctly." }, { status: 500 });
  }

  const webhookPayload = {
    ...payload,
    source: "n7rb.org contact form",
    submittedAt: new Date().toISOString(),
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

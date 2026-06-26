"use client";

import { useState } from "react";
import { ButtonLink, InfoCard } from "@/components/ui";
import { LINKS, SITE } from "@/lib/site-data";

type FormState = "idle" | "submitting" | "success" | "error";

export default function JoinContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMessage(json.error ?? "Something went wrong. Please try again.");
        setFormState("error");
        return;
      }

      setFormState("success");
      form.reset();
    } catch {
      setErrorMessage("Unable to send your message. Please check your connection and try again.");
      setFormState("error");
    }
  }

  return (
    <section className="bg-stonewarm-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-black text-mountain-900 sm:text-5xl">Join / Contact</h1>
        <p className="mt-5 text-lg leading-8 text-stonewarm-700">
          Ready to join, visit, or ask a beginner question? Fill out the form below or reach out directly.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={LINKS.MEMBERSHIP_FORM_URL}>Apply for Membership</ButtonLink>
          <ButtonLink href={LINKS.CONTACT_EMAIL} variant="light">Email CCARC</ButtonLink>
        </div>
      </div>
      <div className="mx-auto mt-10 grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.85fr]">
        <form className="rounded-lg bg-white p-6 shadow-sm" onSubmit={handleSubmit} noValidate>
          <h2 className="text-2xl font-black text-mountain-900">Contact Us</h2>
          <p className="mt-2 text-sm leading-6 text-stonewarm-700">
            Have a question or want to get involved? We&apos;ll get back to you soon.
          </p>

          {formState === "success" && (
            <div role="status" className="mt-4 rounded-md bg-pine-50 px-4 py-3 text-sm font-medium text-pine-700">
              Message sent! We&apos;ll be in touch soon.
            </div>
          )}

          {formState === "error" && errorMessage && (
            <div role="alert" className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {errorMessage}
            </div>
          )}

          <div className="mt-6 grid gap-5">
            <label className="grid gap-2 font-bold text-mountain-900">
              Name
              <input
                className="min-h-11 rounded-md border border-stonewarm-100 px-3 py-2 font-normal text-mountain-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-pine-700"
                name="name"
                type="text"
                autoComplete="name"
                required
                disabled={formState === "submitting"}
              />
            </label>
            <label className="grid gap-2 font-bold text-mountain-900">
              Email
              <input
                className="min-h-11 rounded-md border border-stonewarm-100 px-3 py-2 font-normal text-mountain-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-pine-700"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={formState === "submitting"}
              />
            </label>
            <label className="grid gap-2 font-bold text-mountain-900">
              Message
              <textarea
                className="min-h-32 rounded-md border border-stonewarm-100 px-3 py-2 font-normal text-mountain-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-pine-700"
                name="message"
                required
                disabled={formState === "submitting"}
              />
            </label>
            <button
              className="min-h-11 rounded-md bg-pine-700 px-5 py-3 text-sm font-bold text-white hover:bg-pine-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine-700 disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
              disabled={formState === "submitting"}
            >
              {formState === "submitting" ? "Sending…" : "Send Message"}
            </button>
          </div>
        </form>
        <div className="grid gap-5">
          <InfoCard title="Newsletter Signup">
            <p>
              Have news, photos, event reports, or article ideas for the club newsletter? Want to sign up to receive the monthly newsletter? Contact Marla Unruh, KM7LIB, at{" "}
              <a className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href="mailto:mkulib@gmail.com">
                mkulib@gmail.com
              </a>
              .
            </p>
          </InfoCard>
          <InfoCard title="Join Our Slack Community">
            <p>
              We&apos;d love to have you! Use our Contact Us form and let us know you&apos;d like access to our Slack workspace. Whether you&apos;re a long-time amateur radio operator or just getting started, we&apos;ll send you an invitation after a quick review.
            </p>
          </InfoCard>
          <article className="rounded-lg border border-stonewarm-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-mountain-900">Meeting Location</h2>
            <p className="mt-3 leading-7 text-stonewarm-700">
              CCARC meets on the first non-holiday Monday of each month at 7:00 PM.
            </p>
            <p className="mt-2 leading-7 text-stonewarm-700">{SITE.meetingAddress}</p>
            <div className="mt-5 overflow-hidden rounded-lg border border-stonewarm-100">
              <iframe
                title="Map to Salvation Army church, 1905 Henderson St., Helena, Montana"
                src="https://www.google.com/maps?q=Salvation%20Army%20church%201905%20Henderson%20St%20Helena%20MT&output=embed"
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-stonewarm-700">
              Map fallback: Salvation Army church, 1905 Henderson St., Helena, MT.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { ButtonLink, InfoCard } from "@/components/ui";
import { LINKS, SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Join / Contact",
  description: "Join CCARC, ask questions, or contact the Capital City Amateur Radio Club in Helena, Montana.",
};

export default function JoinContactPage() {
  return (
    <section className="bg-stonewarm-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-black text-mountain-900 sm:text-5xl">Join / Contact</h1>
        <p className="mt-5 text-lg leading-8 text-stonewarm-700">
          Ready to join, visit, or ask a beginner question? Use the placeholders below for the future membership form, mailing list, and club contact details.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={LINKS.MEMBERSHIP_FORM_URL}>Apply for Membership</ButtonLink>
          <ButtonLink href={LINKS.CONTACT_EMAIL} variant="light">Email CCARC</ButtonLink>
        </div>
      </div>
      <div className="mx-auto mt-10 grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.85fr]">
        <form className="rounded-lg bg-white p-6 shadow-sm" aria-describedby="contact-help">
          <h2 className="text-2xl font-black text-mountain-900">Contact Form Placeholder</h2>
          <p id="contact-help" className="mt-2 text-sm leading-6 text-stonewarm-700">
            TODO: Connect this form to a real submission endpoint and add server-side validation.
          </p>
          <div className="mt-6 grid gap-5">
            <label className="grid gap-2 font-bold text-mountain-900">
              Name
              <input className="min-h-11 rounded-md border border-stonewarm-100 px-3 py-2 font-normal text-mountain-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-pine-700" name="name" type="text" autoComplete="name" required aria-describedby="name-error" />
              <span id="name-error" className="text-sm font-medium text-stonewarm-700">Enter your name before submitting.</span>
            </label>
            <label className="grid gap-2 font-bold text-mountain-900">
              Email
              <input className="min-h-11 rounded-md border border-stonewarm-100 px-3 py-2 font-normal text-mountain-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-pine-700" name="email" type="email" autoComplete="email" required aria-describedby="email-error" />
              <span id="email-error" className="text-sm font-medium text-stonewarm-700">Use an address where the club can reply.</span>
            </label>
            <label className="grid gap-2 font-bold text-mountain-900">
              Message
              <textarea className="min-h-32 rounded-md border border-stonewarm-100 px-3 py-2 font-normal text-mountain-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-pine-700" name="message" required aria-describedby="message-error" />
              <span id="message-error" className="text-sm font-medium text-stonewarm-700">Tell us what you would like help with.</span>
            </label>
            <button className="min-h-11 rounded-md bg-pine-700 px-5 py-3 text-sm font-bold text-white hover:bg-pine-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine-700" type="submit">
              Send Message Placeholder
            </button>
          </div>
        </form>
        <div className="grid gap-5">
          <InfoCard title="Newsletter Signup">
            <p>TODO: Add a newsletter signup form or link for CCARC&apos;s monthly club newsletter with articles from club members.</p>
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
          <InfoCard title="Club Email">
            <p>TODO: Replace CONTACT_EMAIL with the real public club email address.</p>
          </InfoCard>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { NewsletterDownloadLink } from "./NewsletterDownloadLink";
import { newsletters } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "CCARC Newsletter Archive",
  description: "Browse and read Capital City Amateur Radio Club newsletters from Helena, Montana.",
  alternates: { canonical: "/newsletter" },
};

export default function NewsletterPage() {
  return (
    <section className="bg-stonewarm-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-black text-mountain-900 sm:text-5xl">CCARC Newsletter Archive</h1>
        <p className="mt-5 text-lg leading-8 text-stonewarm-700">
          Stay current with club news, events, and member updates.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-4xl gap-5">
        {newsletters.map((newsletter) => (
          <article
            key={newsletter.href}
            className="rounded-lg border border-stonewarm-100 bg-white p-6 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-8"
          >
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-pine-700">
                <time dateTime={newsletter.date}>{newsletter.title}</time>
              </p>
              <h2 className="mt-2 text-xl font-black text-mountain-900">{newsletter.title} Newsletter</h2>
              <p className="mt-3 leading-7 text-stonewarm-700">{newsletter.description}</p>
            </div>
            <div className="mt-5 shrink-0 sm:mt-0">
              <NewsletterDownloadLink
                className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-pine-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-pine-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine-900 sm:w-auto"
                date={newsletter.date}
                href={newsletter.href}
                title={newsletter.title}
              >
                View Newsletter PDF
              </NewsletterDownloadLink>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

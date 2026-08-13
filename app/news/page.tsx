import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui";
import { LINKS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: { absolute: "CCARC News & Updates | Amateur Radio in Helena, Montana" },
  description: "Latest news and updates from Capital City Amateur Radio Club — classes, events, field day, emergency communications, and community service in Helena and Lewis and Clark County.",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "CCARC News & Updates | Amateur Radio in Helena, Montana",
    description: "Classes, events, Field Day, emergency communications, and community service updates from CCARC in Helena, Montana.",
    url: "/news",
  },
};

const linkClasses = "font-bold text-pine-700 underline decoration-pine-700/40 underline-offset-4 hover:decoration-pine-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine-700";

export default function NewsPage() {
  return (
    <section className="bg-stonewarm-50 px-4 py-12 sm:px-6 lg:px-8">
      <header className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-bold uppercase tracking-wide text-pine-700">Latest from CCARC</p>
        <h1 className="mt-3 text-4xl font-black text-mountain-900 sm:text-5xl">News &amp; Updates</h1>
        <p className="mt-5 text-lg leading-8 text-stonewarm-700">Stay informed about CCARC events, club activities, and amateur radio opportunities in Helena and Lewis and Clark County.</p>
      </header>

      <div className="mx-auto mt-12 max-w-4xl">
        <h2 className="text-3xl font-black text-mountain-900">Recent Updates</h2>
        <div className="mt-7 space-y-5">
          <NewsItem date="August 10, 2026" title="Capital City Amateur Radio Club Is Now on Facebook">
            Keep up with club news, activities, photos, and upcoming events by following <a className={linkClasses} href={LINKS.FACEBOOK_URL} target="_blank" rel="noopener noreferrer">CCARC on Facebook</a>.
          </NewsItem>
          <NewsItem date="August 5, 2026" title="Technician License Class Announced: Class Begins September 9">
            Our Fall 2026 Technician License Class is finalized and enrollment is open. Six weekly sessions begin September 9 at the Salvation Army in Helena. No experience is required — begin your journey to getting licensed. <a className={linkClasses} href="/classes">Sign up for the Technician Class →</a>
          </NewsItem>
          <NewsItem date="August 1, 2026" title="CCARC Supports the HURL Elkhorn Endurance Race">
            CCARC volunteers provided critical radio communications support for the 2026 HURL Elkhorn Endurance Runs, helping coordinate between race participants and support teams. Read the full report in our <a className={linkClasses} href="/newsletters/newsletter-2026-08.pdf" target="_blank" rel="noopener noreferrer">August 2026 newsletter →</a>
          </NewsItem>
          <NewsItem date="July 7, 2026" title="July Board Meeting Minutes Available">
            The CCARC board met on July 7, 2026 to discuss club operations, planning, and community service activities. <a className={linkClasses} href="/docs/CCARC_July_2026_Minutes.pdf" target="_blank" rel="noopener noreferrer">View July 2026 meeting minutes →</a>
          </NewsItem>
          <NewsItem date="June 28, 2026" title="CCARC Participates in ARRL Field Day">
            CCARC members activated an amateur radio station from MacDonald Pass for the 2026 ARRL Field Day event, a nationwide operating exercise that combines emergency preparedness with public education. Read the full report in our <a className={linkClasses} href="/newsletters/newsletter-2026-07.pdf" target="_blank" rel="noopener noreferrer">July 2026 newsletter →</a>
          </NewsItem>
          <NewsItem date="June 1, 2026" title="Membership Growth Committee Established">
            At the June board meeting, CCARC officially established the Membership Growth Committee and approved a $500 annual budget to support amateur radio education and community outreach in Helena. This initiative drives our free license classes, public events, partnerships with community organizations, and expanded mentoring programs for new operators.
          </NewsItem>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-4xl rounded-lg border border-stonewarm-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-black text-mountain-900">Previous Updates</h2>
        <p className="mt-4 leading-7 text-stonewarm-700">Older news and club reports are available in our <a className={linkClasses} href="/newsletter">newsletter archive →</a>. You can also review the <a className={linkClasses} href="/docs/CCARC_June_2026_Minutes.pdf" target="_blank" rel="noopener noreferrer">June 2026 board meeting minutes →</a></p>
      </div>

      <div className="mx-auto mt-10 max-w-4xl rounded-lg bg-mountain-900 p-6 text-white shadow-soft sm:p-8">
        <h2 className="text-2xl font-black">Stay Connected</h2>
        <p className="mt-3 leading-7 text-stonewarm-50">Want to stay in the loop? Follow CCARC on Facebook or contact us to join our mailing list for news and event updates.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href={LINKS.FACEBOOK_URL} variant="secondary">Follow CCARC on Facebook</ButtonLink>
          <ButtonLink href="/join-contact" variant="light">Contact CCARC</ButtonLink>
        </div>
      </div>
    </section>
  );
}

function NewsItem({ date, title, children }: { date: string; title: string; children: React.ReactNode }) {
  return (
    <article className="rounded-lg border border-stonewarm-100 bg-white p-6 shadow-sm sm:p-8">
      <time className="text-sm font-bold uppercase tracking-wide text-pine-700">{date}</time>
      <h3 className="mt-2 text-2xl font-black text-mountain-900">{title}</h3>
      <p className="mt-4 leading-7 text-stonewarm-700">{children}</p>
    </article>
  );
}

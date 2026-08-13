import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Link from "next/link";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SiteHeader } from "@/components/SiteHeader";
import { LINKS, SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Capital City Amateur Radio Club | N7RB Helena, Montana",
    template: "%s | CCARC | N7RB Helena, Montana",
  },
  description:
    "Discover amateur radio in Helena, Montana with the Capital City Amateur Radio Club. Learn licensing, meetings, exams, nets, emergency communications, and outdoor radio.",
  keywords: [
    "amateur radio Helena Montana",
    "ham radio Helena",
    "CCARC",
    "N7RB",
    "Technician license class",
    "Volunteer Examiner testing",
  ],
  openGraph: {
    title: "Capital City Amateur Radio Club | N7RB",
    description: "Helena's amateur radio club — licensing classes, nets, exams, and community. Join N7RB.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/CCARC_firetower_favi.png",
        width: 842,
        height: 703,
        alt: "Capital City Amateur Radio Club logo",
      },
    ],
  },
  icons: {
    icon: "/CCARC_firetower_favi.png",
    apple: "/CCARC_firetower_favi.png",
  },
};

function Footer() {
  return (
    <footer className="bg-mountain-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-lg font-black">{SITE.name}</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-stonewarm-100">
            Capital City Amateur Radio Club is a 501(c)(3) nonprofit organization serving Helena and Lewis and Clark County through education, testing, mentoring, emergency communications, and community service.
          </p>
          <p className="mt-3 text-sm"><Link className="font-bold underline underline-offset-4" href="/about">Mission and nonprofit information</Link></p>
          <a
            className="mt-5 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-stonewarm-100/50 text-white transition hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            href={LINKS.FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit CCARC on Facebook (opens in a new tab)"
          >
            <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.436H7.078v-3.491h3.047V9.413c0-3.026 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.973h-1.513c-1.49 0-1.956.931-1.956 1.887v2.261h3.328l-.532 3.491h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
            </svg>
          </a>
        </div>
        <div>
          <p className="font-bold">Monthly Meeting Location</p>
          <p className="mt-2 text-sm leading-6 text-stonewarm-100">
            {SITE.meetingAddress}. 1st non-holiday Monday of the month at 7:00 PM.
          </p>
        </div>
        <div>
          <p className="font-bold">Local Repeater</p>
          <p className="mt-2 text-sm leading-6 text-stonewarm-100">
            Belmont repeater {SITE.repeater}, {SITE.repeaterTone} tone. Backup simplex {SITE.backupSimplex}.
          </p>
          <p className="mt-4 text-sm">
            <Link
              className="font-bold text-white underline decoration-stonewarm-100 underline-offset-4 hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              href="/privacy"
            >
              Privacy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body className="min-h-screen antialiased">
        <a
          href="#main-content"
          className="sr-only z-[60] rounded-md bg-white px-4 py-3 font-bold text-mountain-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-pine-700"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

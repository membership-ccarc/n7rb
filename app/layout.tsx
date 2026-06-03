import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE } from "@/lib/site-data";

export const metadata: Metadata = {
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
  },
  icons: {
    icon: "/favicon.svg",
  },
};

function Footer() {
  return (
    <footer className="bg-mountain-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-lg font-black">{SITE.name}</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-stonewarm-100">
            Helena&apos;s friendly amateur radio club for licensing, learning, outdoor radio, emergency communications, and community service.
          </p>
        </div>
        <div>
          <p className="font-bold">Meeting Location</p>
          <p className="mt-2 text-sm leading-6 text-stonewarm-100">{SITE.meetingAddress}</p>
        </div>
        <div>
          <p className="font-bold">Local Repeater</p>
          <p className="mt-2 text-sm leading-6 text-stonewarm-100">
            Belmont repeater {SITE.repeater}, {SITE.repeaterTone} tone. Backup simplex {SITE.backupSimplex}.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
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
      </body>
    </html>
  );
}

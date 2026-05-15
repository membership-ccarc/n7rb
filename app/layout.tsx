import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { navItems, SITE } from "@/lib/site-data";

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
    description: "A modern onboarding front door for amateur radio in Helena, Montana.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-stonewarm-100 bg-stonewarm-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md font-black leading-tight text-mountain-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine-700"
          aria-label={`${SITE.name} home`}
        >
          <Image
            src="/favicon.svg"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-md"
            priority
          />
          <span>
            <span className="block text-lg">{SITE.shortName}</span>
            <span className="block text-xs font-bold uppercase tracking-wide text-pine-700">{SITE.callsign}</span>
          </span>
        </Link>
        <nav aria-label="Primary navigation">
          <details className="group relative md:hidden">
            <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-md bg-white px-4 py-2 text-sm font-bold text-mountain-900 shadow-sm ring-1 ring-stonewarm-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine-700">
              Menu
              <span className="ml-2" aria-hidden="true">▾</span>
            </summary>
            <div className="absolute right-0 mt-2 w-72 rounded-lg border border-stonewarm-100 bg-white p-2 shadow-soft">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  className="block rounded-md px-3 py-3 text-sm font-bold text-mountain-900 hover:bg-stonewarm-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine-700"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="rounded-md px-3 py-2 text-sm font-bold text-mountain-900 hover:bg-white hover:text-pine-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine-700"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

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
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

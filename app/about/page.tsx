import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, InfoCard } from "@/components/ui";
import { LINKS, SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About CCARC",
  description: "About Capital City Amateur Radio Club, a 501(c)(3) nonprofit organization (EIN 81-0506653) serving Helena and Lewis and Clark County, Montana.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="bg-stonewarm-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-pine-700">{SITE.nonprofitStatus} · {SITE.callsign}</p>
          <h1 className="mt-3 text-4xl font-black text-mountain-900 sm:text-5xl">About CCARC</h1>
          <p className="mt-6 text-lg leading-8 text-stonewarm-700">
            We are a 501(c)(3) nonprofit organization (EIN 81-0506653) dedicated to amateur radio education, licensing, emergency communications, and community service in Helena, Montana and Lewis and Clark County. CCARC helps people learn radio, get licensed, practice useful communication skills, and enjoy radio as an active outdoor and technical hobby.
          </p>
          <div className="mt-6 rounded-lg border-l-4 border-gold-300 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-mountain-900">Our Mission</h2>
            <p className="mt-3 leading-7 text-stonewarm-700">{SITE.mission}</p>
          </div>
        </div>
        <div className="flex min-h-[320px] items-center justify-center rounded-lg bg-white p-6 shadow-soft">
          <Image
            src="/CCARC_firetower.png"
            alt="Capital City Amateur Radio Club fire tower logo"
            width={400}
            height={400}
            className="h-auto w-full max-w-sm rounded-lg object-contain"
            priority
          />
        </div>
      </div>
      <div className="mx-auto mt-10 grid max-w-7xl gap-5 md:grid-cols-3">
        <InfoCard title="A Community Nonprofit">
          <p>Capital City Amateur Radio Club Incorporated is a tax-exempt 501(c)(3) charitable organization. Our classes, exam sessions, public events, radio nets, mentoring, and emergency-communications activities are organized to benefit the community.</p>
        </InfoCard>
        <InfoCard title="History of N7RB">
          <p>
            CCARC&apos;s club callsign honors Dick Beaton, N7RB, a longtime Helena amateur radio operator and club member who served as president, newsletter editor, instructor, and Volunteer Examiner. Dick was licensed for 80 years, mentored many new hams, stayed active on the local ARES net, and represented the generous amateur spirit the club wants to carry forward.
          </p>
          <div className="mt-5">
            <ButtonLink href="/about/n7rb-bio" variant="light" openInNewTab>Read the full N7RB history</ButtonLink>
          </div>
        </InfoCard>
        <InfoCard title="Officers and Board">
          <ul className="space-y-3">
            <li><strong className="text-mountain-900">President:</strong> Tom Mandera KE7VUX</li>
            <li><strong className="text-mountain-900">Vice-president:</strong> Brian Lee KJ7OUF</li>
            <li><strong className="text-mountain-900">Treasurer/ARES:</strong> Al Simons WA1TYB</li>
            <li><strong className="text-mountain-900">Secretary:</strong> Oakley Clark-Snustad KE7WWL</li>
            <li><strong className="text-mountain-900">Newsletter:</strong> Marla Unruh KM7LIB</li>
            <li><strong className="text-mountain-900">Repeaters:</strong> Dan Hawkins N7SHM</li>
            <li><strong className="text-mountain-900">Membership Growth:</strong> Allen Le Vie KH7AL</li>
            <li><strong className="text-mountain-900">Testing &amp; Training:</strong> John Geach KS7R</li>
          </ul>
        </InfoCard>
      </div>
      <div className="mx-auto mt-12 max-w-7xl rounded-lg border border-stonewarm-100 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-bold uppercase tracking-wide text-pine-700">Public records</p>
        <h2 className="mt-3 text-3xl font-black text-mountain-900">Nonprofit Registration &amp; Legal Information</h2>
        <p className="mt-5 max-w-4xl leading-7 text-stonewarm-700"><strong className="text-mountain-900">Capital City Amateur Radio Club Inc.</strong> is a 501(c)(3) tax-exempt charitable organization dedicated to amateur radio education and community service.</p>
        <div className="mt-7 overflow-x-auto rounded-lg border border-stonewarm-100">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <thead className="bg-mountain-900 text-white"><tr><th className="px-4 py-3 font-bold">Item</th><th className="px-4 py-3 font-bold">Details</th></tr></thead>
            <tbody className="divide-y divide-stonewarm-100 text-stonewarm-700">
              <tr><th className="px-4 py-3 font-bold text-mountain-900">Legal Name</th><td className="px-4 py-3">Capital City Amateur Radio Club Inc.</td></tr>
              <tr><th className="px-4 py-3 font-bold text-mountain-900">Tax Status</th><td className="px-4 py-3">501(c)(3) Tax-Exempt Organization</td></tr>
              <tr><th className="px-4 py-3 font-bold text-mountain-900">Federal EIN</th><td className="px-4 py-3">81-0506653</td></tr>
              <tr><th className="px-4 py-3 font-bold text-mountain-900">Montana Filing Number</th><td className="px-4 py-3">D063362</td></tr>
              <tr><th className="px-4 py-3 font-bold text-mountain-900">Registered</th><td className="px-4 py-3">Montana Secretary of State; tax-exempt status confirmed by the IRS</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="mt-8 text-2xl font-black text-mountain-900">Official Documentation</h3>
        <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-stonewarm-700">
          <li><a className="font-bold text-pine-700 underline-offset-4 hover:underline" href="https://apps.irs.gov/app/eos/" target="_blank" rel="noopener noreferrer">IRS Tax Exempt Organization Search →</a> — Search for EIN <strong className="text-mountain-900">81-0506653</strong> or “Capital City Amateur Radio Club Inc.” to verify the club&apos;s current federal tax-exempt status</li>
          <li><a className="font-bold text-pine-700 underline-offset-4 hover:underline" href="https://biz.sosmt.gov/search" target="_blank" rel="noopener noreferrer">Montana Secretary of State Business Search →</a> — Verify the club&apos;s registration with Montana</li>
        </ul>
        <p className="mt-6 leading-7 text-stonewarm-700">All class fees, donations, and grants support amateur radio education, license testing, emergency communications training, and community service in Helena and Lewis and Clark County.</p>
      </div>
    </section>
  );
}

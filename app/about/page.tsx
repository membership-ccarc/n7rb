import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, InfoCard } from "@/components/ui";
import { LINKS, SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About CCARC",
  description: "About the Capital City Amateur Radio Club, callsign N7RB, in Helena, Montana.",
};

export default function AboutPage() {
  return (
    <section className="bg-stonewarm-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-pine-700">{SITE.callsign}</p>
          <h1 className="mt-3 text-4xl font-black text-mountain-900 sm:text-5xl">About CCARC</h1>
          <p className="mt-6 text-lg leading-8 text-stonewarm-700">
            The Capital City Amateur Radio Club is Helena&apos;s local amateur radio club. CCARC helps people learn radio, get licensed, practice useful communication skills, support community service, and enjoy radio as an active outdoor and technical hobby.
          </p>
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
        <InfoCard title="Club Purpose">
          <p>Make amateur radio approachable, useful, and welcoming for beginners and experienced operators alike.</p>
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
            <li><strong className="text-mountain-900">Treasurer:</strong> Al Simons WA1TYB</li>
            <li><strong className="text-mountain-900">Secretary:</strong> Oakely Clark-Snustad KE7WWL</li>
          </ul>
        </InfoCard>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ButtonLink, InfoCard, MeetingDetails } from "@/components/ui";
import { LINKS, nets, SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Meetings & Nets",
  description: "CCARC club meetings, local nets, repeater information, and meeting location in Helena, Montana.",
};

const externalResources = [
  { href: "https://www.wr7mt.club/", label: "MRLA" },
  { href: "https://www.dmr-montana.net/styled-2/index.html", label: "DMR Montana repeater site information" },
  { href: "https://www.macpassradio.com/mprg/", label: "Mac Pass Repeater Group" },
  { href: "https://www.pistar.uk/dmr_bm_talkgroups.php", label: "BrandMeister talk group list" },
  { href: "/belmont-repeater-history.pdf", label: "Belmont repeater history PDF" },
] as const;

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children} <span className="text-sm font-medium">(opens in a new tab)</span>
    </a>
  );
}

export default function MeetingsNetsPage() {
  return (
    <section className="bg-stonewarm-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-black text-mountain-900 sm:text-5xl">Meetings & Nets</h1>
        <p className="mt-5 text-lg leading-8 text-stonewarm-700">
          Meetings and nets are the easiest way to hear local activity, ask questions, and meet operators around Helena.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-7xl gap-5 md:grid-cols-3">
        {nets.map((net) => (
          <div key={net.name} className="text-center">
            <InfoCard title={net.name}>
              <p>{net.time}</p>
            </InfoCard>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-8 max-w-4xl rounded-lg bg-white p-6 text-center shadow-sm">
        <h2 className="text-2xl font-black text-mountain-900">Repeater Information</h2>
        <p className="mt-4 leading-7 text-stonewarm-700">
          Belmont repeater {SITE.repeater} with {SITE.repeaterTone} tone. Backup simplex: {SITE.backupSimplex}.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-mountain-900">Club Meeting</h2>
          <div className="mt-6">
            <MeetingDetails />
          </div>
          <div className="mt-6">
            <ButtonLink href={LINKS.ONLINE_MEETING_URL}>Join the Monthly Google Meet</ButtonLink>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-mountain-900">Club Meeting Map</h2>
          <p className="mt-4 leading-7 text-stonewarm-700">
            Meeting address: {SITE.meetingAddress}.
          </p>
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
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-mountain-900">Weekly Informal Coffee Meeting</h2>
          <p className="mt-4 text-lg leading-8 text-stonewarm-700">
            Meet local hams in the back of the Staggering Ox. Stop by any time between 9:00 AM and 12:00 PM, come and go as you please, and bring beginner questions or radio projects.
          </p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="font-bold text-mountain-900">When</dt>
              <dd className="mt-1 text-stonewarm-700">Weekly, 9:00 AM to 12:00 PM</dd>
            </div>
            <div>
              <dt className="font-bold text-mountain-900">Where</dt>
              <dd className="mt-1 text-stonewarm-700">Staggering Ox, 400 Euclid Ave, Helena, MT 59601</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-mountain-900">Coffee Meeting Map</h2>
          <p className="mt-4 leading-7 text-stonewarm-700">
            Staggering Ox, 400 Euclid Ave, Helena, MT 59601.
          </p>
          <div className="mt-5 overflow-hidden rounded-lg border border-stonewarm-100">
            <iframe
              title="Map to Staggering Ox, 400 Euclid Avenue, Helena, Montana"
              src="https://www.google.com/maps?q=Staggering%20Ox%20400%20Euclid%20Ave%20Helena%20MT%2059601&output=embed"
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
          <p className="mt-3 text-sm leading-6 text-stonewarm-700">
            Map fallback: Staggering Ox, 400 Euclid Ave, Helena, MT 59601.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-4xl rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-mountain-900">Stay Connected Between Meetings</h2>
        <p className="mt-4 leading-7 text-stonewarm-700">
          CCARC uses Slack for quick questions, project photos, activity planning, and casual conversation between nets, meetings, and coffee gatherings.
        </p>
        <div className="mt-5">
          <ButtonLink href="/join-contact/slack" variant="light">Join the Slack Workspace</ButtonLink>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-mountain-900">Additional Repeater Information</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-black text-mountain-900">Montana Repeater Link Association</h3>
            <p className="mt-3 leading-7 text-stonewarm-700">
              MRLA, pronounced "marla," is a statewide ham radio repeater linking system. This system can be connected to other linked repeaters outside of Montana.
            </p>
            <ul className="mt-4 space-y-3 leading-7 text-stonewarm-700">
              <li><strong className="text-mountain-900">145.45-</strong> ("Hogback", tone: 100.0). It is a MRLA link located on Hogback Mountain, 25 miles northeast of Helena.</li>
              <li><strong className="text-mountain-900">147.32+</strong> (tone: 100.0). This is also a MRLA link, located in Townsend, 30 miles southeast of Helena.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-black text-mountain-900">Digital Repeaters</h3>
            <p className="mt-3 leading-7 text-stonewarm-700">
              These are Digital Mobile Radio (DMR) repeaters on the BrandMeister worldwide DMR network.
            </p>
            <ul className="mt-4 space-y-3 leading-7 text-stonewarm-700">
              <li><strong className="text-mountain-900">147.10+</strong> on MacDonald Pass, 15 miles west of Helena.</li>
              <li><strong className="text-mountain-900">444.10+</strong> also on MacDonald Pass.</li>
              <li><strong className="text-mountain-900">448.90-</strong> on Helena's north hill.</li>
              <li><strong className="text-mountain-900">449.20-</strong> near Boulder, 20 miles south of Helena.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-black text-mountain-900">Common Local DMR Talk Groups</h3>
            <p className="mt-3 leading-7 text-stonewarm-700">
              Since DMR talk groups are usable on all repeaters, these are the most common local talk groups:
            </p>
            <ul className="mt-4 space-y-3 leading-7 text-stonewarm-700">
              <li><strong className="text-mountain-900">MPRG1:</strong> talk group 31301, color code 1, time slot 2</li>
              <li><strong className="text-mountain-900">MPRG2:</strong> talk group 31302, color code 1, time slot 1</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-black text-mountain-900">Packet Radio</h3>
            <ul className="mt-3 space-y-3 leading-7 text-stonewarm-700">
              <li><strong className="text-mountain-900">KM7DES-10</strong> is on 145.01. It is located at the State of Montana DES office on Ft. Harrison, a few miles west of Helena. It is part of the Winlink network.</li>
              <li><strong className="text-mountain-900">WA1TYB-10</strong> is on 145.05 and is located in East Helena. It is part of the Winlink network.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-stonewarm-100 pt-6">
          <h3 className="text-xl font-black text-mountain-900">External Repeater Resources</h3>
          <p className="mt-3 text-sm leading-6 text-stonewarm-700">
            These links leave this site and open in a new browser tab or window.
          </p>
          <ul className="mt-4 grid gap-3 text-stonewarm-700 sm:grid-cols-2">
            {externalResources.map((resource) => (
              <li key={resource.href}>
                <ExternalLink href={resource.href}>{resource.label}</ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

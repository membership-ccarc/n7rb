import type { Metadata } from "next";
import { ButtonLink, InfoCard, MeetingDetails } from "@/components/ui";
import { LINKS, nets, SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Meetings & Nets",
  description: "CCARC club meetings, local nets, repeater information, and meeting location in Helena, Montana.",
};

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
          <InfoCard key={net.name} title={net.name}>
            <p>{net.time}</p>
          </InfoCard>
        ))}
      </div>
      <div className="mx-auto mt-8 max-w-4xl rounded-lg bg-white p-6 shadow-sm">
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
    </section>
  );
}

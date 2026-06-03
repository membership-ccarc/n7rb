import type { Metadata } from "next";
import { ButtonLink, InfoCard } from "@/components/ui";
import { SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "ARES/LCARES",
  description: "Lewis and Clark County Amateur Radio Emergency Service information, contacts, and frequency plan.",
};

const frequencySections = [
  {
    title: "VHF / UHF Simplex",
    items: [
      "Primary VHF simplex: 147.50 MHz local simplex",
      "VHF simplex: 146.52 MHz national simplex",
      "Primary UHF simplex: 446.00 MHz national simplex",
    ],
  },
  {
    title: "VHF Repeaters",
    items: [
      "Primary: 147.22+ Belmont, tone 100.0 Hz. If this repeater is not operating, nets switch to 147.50 simplex.",
      "145.45- Hogback, tone 100.0 Hz, MRLA link",
      "147.32+ Townsend, tone 100.0 Hz, MRLA link",
      "Portable repeater: RX 145.47, TX 147.97, tone 146.2 Hz. Non-standard 2.5 MHz split.",
    ],
  },
  {
    title: "VHF Winlink",
    items: ["KM7DES-10 on 145.01 MHz, located at Fort Harrison."],
  },
  {
    title: "DMR Repeaters",
    items: [
      "Primary talk group: 31309 MTARES",
      "Alternate talk groups: 31301 MPRG1 and 3130036 MPRG4",
      "Nearby DMR repeaters use color code 1. MPRG1 uses time slot 2; all other listed talk groups use time slot 1.",
      "MacDonald Pass: 147.10+ and 444.10+",
      "North Hill: 448.90-",
      "Boulder: 449.20-",
    ],
  },
  {
    title: "HF",
    items: [
      "80 m: 3.880 MHz, Montana ARES statewide",
      "40 m: 7.247 MHz, Montana ARES statewide",
    ],
  },
  {
    title: "National HF Centers of Activity",
    items: [
      "3750 or 3985 kHz, LSB",
      "7060, 7240, or 7290 kHz, LSB",
      "14300 kHz, USB",
      "18160 kHz, USB",
      "21360 kHz, USB",
    ],
  },
] as const;

export default function AresPage() {
  return (
    <section className="bg-stonewarm-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-wide text-pine-700">{SITE.city}</p>
        <h1 className="mt-3 text-4xl font-black text-mountain-900 sm:text-5xl">ARES/LCARES</h1>
        <p className="mt-5 text-lg leading-8 text-stonewarm-700">
          Welcome to the Lewis and Clark County Amateur Radio Emergency Service hub. LCARES supports emergency communications training and readiness in Lewis and Clark County and surrounding counties.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl gap-5 lg:grid-cols-3">
        <InfoCard title="Local Contacts">
          <p>
            The LCARES Emergency Coordinator is{" "}
            <a className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href="mailto:al@simonshome.org">
              Al Simons
            </a>
            , WA1TYB. The Assistant Emergency Coordinator is{" "}
            <a className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href="mailto:k7wgr@arrl.org">
              Lynn Wagner
            </a>
            , K7WGR.
          </p>
        </InfoCard>
        <InfoCard title="Who Can Participate">
          <p>
            You do not need to be an ARRL member or a Lewis and Clark County resident. The main requirement is a willingness to train and support emergency communications.
          </p>
        </InfoCard>
        <InfoCard title="Next Steps">
          <p>Contact Al or Lynn with questions, suggestions, or interest in participating with LCARES.</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <ButtonLink href="/ares/ares-training" variant="light">ARES Training</ButtonLink>
            <ButtonLink href="/ares/field-operations-guides" variant="light">Field Operations Guides</ButtonLink>
          </div>
        </InfoCard>
      </div>

      <div className="mx-auto mt-10 max-w-7xl rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-mountain-900">Frequency Plan</h2>
        <p className="mt-3 leading-7 text-stonewarm-700">Lewis and Clark County, Montana emergency communications reference.</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {frequencySections.map((section) => (
            <article key={section.title} className="rounded-lg bg-stonewarm-50 p-5">
              <h3 className="text-lg font-black text-mountain-900">{section.title}</h3>
              <ul className="mt-4 space-y-3 leading-7 text-stonewarm-700">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

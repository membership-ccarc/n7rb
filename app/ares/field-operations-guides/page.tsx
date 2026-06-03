import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Field Operations Guides",
  description: "Emergency communications field operations guides and public safety reference resources.",
};

const guides = [
  {
    title: "National Interoperability Field Operations Guide (NIFOG)",
    href: "https://www.cisa.gov/sites/default/files/2023-04/NIFOG%202.01_508%20FINAL%20VERSION%205%2011%2022.pdf",
    text: "A technical reference designed to support incident communications. While aimed primarily at public safety users, it also contains amateur radio information. It is available as a PDF, and as the eNIFOG app in the App Store and Play Store.",
  },
  {
    title: "Auxiliary Communications Field Operations Guide (AUXFOG)",
    href: "https://www.cisa.gov/sites/default/files/publications/AUXFOG%2520June%25202016%2520-%2520508%2520Reviewed%2520-%2520Final%2520%25282-16-17%2529.pdf",
    text: "A companion to the NIFOG, oriented primarily to Auxiliary Communicators. It is available as a PDF, and as the eAUXFOG app in the App Store and Play Store.",
  },
  {
    title: "Montana Mutual Aid and Common Frequencies Manual 2021",
    href: "https://dojmt.gov/wp-content/uploads/MA_Manual_2021_color_v1.pdf",
    text: "A Montana emergency communications manual focused on mutual aid between jurisdictions. Many search engines still list the 2015 version; use this link for the current 2021 manual.",
  },
  {
    title: "Public Safety Library App",
    href: "https://www.cisa.gov/safecom/public-safety-library-app",
    text: "A mobile bookshelf for downloading phone versions of field operations guides, including the Montana guide as MT eFOG, plus eNIFOG, eAUXFOG, and other state eFOGs.",
  },
] as const;

export default function FieldOperationsGuidesPage() {
  return (
    <section className="bg-stonewarm-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-wide text-pine-700">LCARES</p>
        <h1 className="mt-3 text-4xl font-black text-mountain-900 sm:text-5xl">Field Operations Guides</h1>
        <p className="mt-5 text-lg leading-8 text-stonewarm-700">
          Field operations guides are concise collections of information that may be useful in emergency situations.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl gap-5 md:grid-cols-2">
        {guides.map((guide) => (
          <article key={guide.href} className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-mountain-900">
              <a className="text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href={guide.href} target="_blank" rel="noopener noreferrer">
                {guide.title}
              </a>
            </h2>
            <p className="mt-3 leading-7 text-stonewarm-700">{guide.text}</p>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-7xl">
        <ButtonLink href="/ares" variant="light">Back to ARES/LCARES</ButtonLink>
      </div>
    </section>
  );
}

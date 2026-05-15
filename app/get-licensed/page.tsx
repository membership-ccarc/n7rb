import type { Metadata } from "next";
import { ButtonLink, InfoCard, PlaceholderImage } from "@/components/ui";
import { licenseLevels, LINKS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Get Licensed",
  description: "Beginner-friendly guide to getting an amateur radio license with CCARC in Helena, Montana.",
};

export default function GetLicensedPage() {
  return (
    <section className="bg-stonewarm-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-pine-700">Start with Technician</p>
          <h1 className="mt-3 text-4xl font-black text-mountain-900 sm:text-5xl">Get Licensed</h1>
          <p className="mt-6 text-lg leading-8 text-stonewarm-700">
            You do not need an engineering background to become a ham. Most people start with the Technician license, learn the practical basics, and get on local repeaters with a simple radio.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={LINKS.TECHNICIAN_CLASSROOM_URL}>Join Technician Google Classroom</ButtonLink>
            <ButtonLink href="https://hamstudy.org" variant="light">Practice with HamStudy.org</ButtonLink>
          </div>
        </div>
        <PlaceholderImage
          className="min-h-[320px]"
          label="First radio license"
          alt="Placeholder illustration of a beginner learning amateur radio outdoors"
        />
      </div>
      <div className="mx-auto mt-12 grid max-w-7xl gap-5 md:grid-cols-3">
        {licenseLevels.map((level) => (
          <InfoCard key={level.name} title={level.name}>{level.summary}</InfoCard>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-3xl rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-mountain-900">A practical study path</h2>
        <p className="mt-4 leading-7 text-stonewarm-700">
          Take the CCARC Technician class, practice with HamStudy.org, then register for a local exam session. After your license appears in the FCC database, club members can help you make your first contacts.
        </p>
      </div>
    </section>
  );
}

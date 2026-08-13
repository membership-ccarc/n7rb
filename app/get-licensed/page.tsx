import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, InfoCard } from "@/components/ui";
import { licenseLevels, LINKS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Get Licensed",
  description: "Beginner-friendly guide to getting an amateur radio license with CCARC in Helena, Montana.",
  alternates: { canonical: "/get-licensed" },
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
            <ButtonLink href={LINKS.CLASS_SIGNUP_URL}>Join the Next Technician Class</ButtonLink>
            <ButtonLink href="https://hamstudy.org" variant="light">Practice with HamStudy.org</ButtonLink>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg bg-mountain-900 shadow-soft">
          <Image
            src="/get-licensed.png"
            alt="Beginner amateur radio students in a Technician license class"
            width={1672}
            height={941}
            className="h-full min-h-[320px] w-full object-cover"
            priority
          />
        </div>
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
      <div className="mx-auto mt-8 max-w-3xl rounded-lg border border-stonewarm-100 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-mountain-900">Study Resources</h2>
        <p className="mt-4 leading-7 text-stonewarm-700">To prepare for the exam, we recommend:</p>
        <ul className="mt-4 list-disc space-y-4 pl-5 leading-7 text-stonewarm-700">
          <li><a className="font-bold text-pine-700 underline-offset-4 hover:underline" href={LINKS.HAMSTUDY_URL} target="_blank" rel="noopener noreferrer">HamStudy.org</a> — Free online study guide and practice exams. Start here for self-paced learning.</li>
          <li><strong className="text-mountain-900">ARRL Technician License Manual</strong> (about $36) — The definitive reference for exam topics. Available through <a className="font-bold text-pine-700 underline-offset-4 hover:underline" href={LINKS.AMAZON_TECHNICIAN_MANUAL_URL} target="_blank" rel="noopener noreferrer">Amazon</a> or <a className="font-bold text-pine-700 underline-offset-4 hover:underline" href={LINKS.ARRL_TECHNICIAN_MANUAL_URL} target="_blank" rel="noopener noreferrer">ARRL.org</a>.</li>
          <li><strong className="text-mountain-900">Practice exams</strong> — Available free online; HamStudy and other sites offer full-length practice tests to build exam confidence.</li>
        </ul>
        <p className="mt-5 leading-7 text-stonewarm-700">Study materials and resources will be sent to you after you sign up for class.</p>
        <div className="mt-6"><ButtonLink href={LINKS.CLASS_SIGNUP_URL}>Sign Up for Class</ButtonLink></div>
      </div>
    </section>
  );
}

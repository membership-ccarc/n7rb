import type { Metadata } from "next";
import { ClassSignupForm } from "@/components/ClassSignupForm";
import { ButtonLink, InfoCard } from "@/components/ui";

export const metadata: Metadata = {
  title: "Classes",
  description: "Technician and General amateur radio license classes from CCARC in Helena, Montana.",
};

export default function ClassesPage() {
  return (
    <section className="bg-stonewarm-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-black text-mountain-900 sm:text-5xl">License Classes</h1>
        <p className="mt-5 text-lg leading-8 text-stonewarm-700">
          Seasonal classes help new and advancing hams study with local support, clear expectations, and a path to the exam.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-2">
        <InfoCard title="Technician Prep Course">
          <p>Hosted twice per year: Q1 and Q3. This is the recommended entry point for new amateur radio operators.</p>
          <div className="mt-5 flex flex-col gap-3">
            <ButtonLink href="#class-signup">Join the Next Technician Class</ButtonLink>
          </div>
        </InfoCard>
        <InfoCard title="General Prep Course">
          <p>Hosted twice per year: Q2 and Q4. This class helps licensed Technicians expand into HF and long-distance operating.</p>
          <div className="mt-5 flex flex-col gap-3">
            <ButtonLink href="#class-signup">Join the Next General Class</ButtonLink>
          </div>
        </InfoCard>
      </div>
      <div className="mx-auto mt-8 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard title="Instructor Contact">
          <p>TBD. </p>
        </InfoCard>
        <InfoCard title="Class Calendar">
          <p>The next technician class is tentatively planned to begin in September 2026.</p>
        </InfoCard>
        <InfoCard title="Downloadable Syllabus">
          <ul className="space-y-3">
            <li>
              <a className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href="/syllabi/technician-syllabus.pdf" target="_blank" rel="noopener noreferrer">
                Technician Syllabus
              </a>
            </li>
            <li>
              <a className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href="/syllabi/general-class-syllabus.pdf" target="_blank" rel="noopener noreferrer">
                General Class Syllabus
              </a>
            </li>
          </ul>
        </InfoCard>
      </div>
      <div className="mx-auto mt-10 max-w-4xl">
        <ClassSignupForm />
      </div>
    </section>
  );
}

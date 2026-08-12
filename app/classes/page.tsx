import type { Metadata } from "next";
import { ClassSignupForm } from "@/components/ClassSignupForm";
import { ButtonLink, InfoCard } from "@/components/ui";
import { LINKS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Classes",
  description: "CCARC Technician License Class — Fall 2026. Six free Wednesday sessions starting September 9 in Helena, Montana. Limited to 15 students.",
  alternates: { canonical: "/classes" },
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

      <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-xl border-4 border-gold-300 bg-mountain-900 shadow-soft">
        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <p className="text-sm font-bold uppercase tracking-wide text-gold-300">Confirmed &amp; Open for Enrollment</p>
          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">CCARC Technician License Class — Fall 2026</h2>
          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-bold uppercase tracking-wide text-gold-300">Starts</dt>
              <dd className="mt-1 text-lg font-bold text-white">Wednesday, September 9, 2026</dd>
            </div>
            <div>
              <dt className="text-sm font-bold uppercase tracking-wide text-gold-300">Schedule</dt>
              <dd className="mt-1 text-lg font-bold text-white">Six consecutive Wednesdays, September 9 – October 14</dd>
            </div>
            <div>
              <dt className="text-sm font-bold uppercase tracking-wide text-gold-300">Time</dt>
              <dd className="mt-1 text-lg font-bold text-white">6:00–7:30 PM <span className="font-medium text-stonewarm-50">(Q&amp;A until 8:00 PM)</span></dd>
            </div>
            <div>
              <dt className="text-sm font-bold uppercase tracking-wide text-gold-300">Location</dt>
              <dd className="mt-1 text-lg font-bold text-white">Helena Salvation Army <span className="font-medium text-stonewarm-50">(1905 Henderson St., Helena, MT)</span></dd>
            </div>
            <div>
              <dt className="text-sm font-bold uppercase tracking-wide text-gold-300">Cost</dt>
              <dd className="mt-1 text-lg font-bold text-white">Free</dd>
            </div>
            <div>
              <dt className="text-sm font-bold uppercase tracking-wide text-gold-300">Class Size</dt>
              <dd className="mt-1 text-lg font-bold text-white">Limited to 15 students</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="#class-signup-form" variant="secondary">Reserve Your Spot</ButtonLink>
            <ButtonLink href={LINKS.CLASS_LOCATION_MAP_URL} variant="light">Get Directions</ButtonLink>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-2">
        <InfoCard title="Technician Prep Course">
          <p>This is the recommended entry point for new amateur radio operators. The next confirmed session is the Fall 2026 class detailed above.</p>
          <div className="mt-5 flex flex-col gap-3">
            <ButtonLink href="#class-signup-form">Join the Next Technician Class</ButtonLink>
          </div>
        </InfoCard>
        <InfoCard title="General Prep Course">
          <p>Hosted twice per year: Q2 and Q4. This class helps licensed Technicians expand into HF and long-distance operating.</p>
          <div className="mt-5 flex flex-col gap-3">
            <ButtonLink href="#class-signup-form">Join the Next General Class</ButtonLink>
          </div>
        </InfoCard>
      </div>
      <div className="mx-auto mt-8 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard title="Instructor Contact">
          <p>Use the class signup form below for instructor questions, schedule needs, or help choosing the right class.</p>
        </InfoCard>
        <InfoCard title="Enrollment">
          <p>Class size is capped at 15 students to keep hands-on time with the instructor. Reserve your spot early using the form below.</p>
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

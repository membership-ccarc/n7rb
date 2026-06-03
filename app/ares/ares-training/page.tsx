import type { Metadata } from "next";
import { ButtonLink, InfoCard } from "@/components/ui";

export const metadata: Metadata = {
  title: "ARES Training",
  description: "ARES initial and advanced Incident Command System training resources for LCARES volunteers.",
};

const basicCourses = [
  { code: "ICS-100", title: "An Introduction to the Incident Command System", href: "https://emilms.fema.gov/is_0100c/curriculum/1.html" },
  { code: "ICS-200", title: "Basic Incident Command System for Initial Response", href: "https://emilms.fema.gov/is_0200c/curriculum/1.html" },
  { code: "ICS-700", title: "An Introduction to the National Incident Management System", href: "https://emilms.fema.gov/is_0700b/curriculum/1.html" },
  { code: "ICS-800", title: "National Response Framework, An Introduction", href: "https://emilms.fema.gov/is_0800d/curriculum/1.html" },
] as const;

export default function AresTrainingPage() {
  return (
    <section className="bg-stonewarm-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-wide text-pine-700">LCARES</p>
        <h1 className="mt-3 text-4xl font-black text-mountain-900 sm:text-5xl">ARES Training</h1>
        <p className="mt-5 text-lg leading-8 text-stonewarm-700">
          Initial ARES training focuses on the Incident Command System used to manage emergencies in the United States.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-mountain-900">Basic ICS Courses</h2>
          <p className="mt-3 leading-7 text-stonewarm-700">
            Completing these introductory online courses is highly encouraged for ARES participation. Links open FEMA training pages in a new tab.
          </p>
          <ul className="mt-6 grid gap-4">
            {basicCourses.map((course) => (
              <li key={course.code} className="rounded-lg bg-stonewarm-50 p-4 leading-7">
                <a className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href={course.href} target="_blank" rel="noopener noreferrer">
                  {course.code}: {course.title}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 leading-7 text-stonewarm-700">
            After completing a course, download the PDF completion certificate and send a copy to{" "}
            <a className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href="mailto:al@simonshome.org">
              Al Simons
            </a>
            , WA1TYB.
          </p>
        </div>

        <div className="grid gap-5">
          <InfoCard title="Course Revisions">
            <p>
              FEMA courses are occasionally revised. Completion of any version is acceptable, but volunteers are encouraged to retake courses completed more than a few years ago.
            </p>
          </InfoCard>
          <InfoCard title="Advanced ICS Courses">
            <ul className="space-y-3">
              <li><strong className="text-mountain-900">AUXCOMM:</strong> two or three-day in-person training for Auxiliary Communicators operating in a Communications Unit.</li>
              <li><strong className="text-mountain-900">ICS-300:</strong> three-day in-person Intermediate ICS course for expanding incidents.</li>
            </ul>
            <p className="mt-4">
              These courses are offered infrequently in Montana. Contact Al Simons, WA1TYB, for availability.
            </p>
          </InfoCard>
          <div>
            <ButtonLink href="/ares" variant="light">Back to ARES/LCARES</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

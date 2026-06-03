import type { Metadata } from "next";
import { ButtonLink, InfoCard } from "@/components/ui";
import { LINKS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Testing",
  description: "In-person Volunteer Examiner amateur radio testing information for Helena, Montana.",
};

export default function TestingPage() {
  return (
    <section className="bg-stonewarm-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-black text-mountain-900 sm:text-5xl">Amateur Radio Exam Testing</h1>
        <p className="mt-5 text-lg leading-8 text-stonewarm-700">
          Volunteer Examiner testing is the FCC exam process run by accredited volunteers. CCARC offers in-person exams in Helena about every 6 weeks for all amateur radio license classes.
        </p>
        <div className="mt-8">
          <ButtonLink href={LINKS.TESTING_REGISTRATION_URL}>Register for an Exam</ButtonLink>
        </div>
      </div>
      <div className="mx-auto mt-10 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard title="Current Testing Format">
          <p>In-person exams in Helena, tablet-based testing, all license classes available, and no remote exams currently.</p>
        </InfoCard>
        <InfoCard title="Next Exam Date">
          <p>Wednesday, June 17, 2026, from 6:30-7:45 PM MDT in Helena, Montana.</p>
        </InfoCard>
        <InfoCard title="FCC FRN">
          <ol className="list-decimal space-y-2 pl-5">
            <li>Create or log in to an FCC CORES account at <a className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href="https://apps.fcc.gov/cores/" target="_blank" rel="noopener noreferrer">apps.fcc.gov/cores</a>.</li>
            <li>Select <span className="font-bold">Register New FRN</span> and choose <span className="font-bold">An Individual</span>.</li>
            <li>Complete the form using the applicant&apos;s legal name, contact information, and required identification details.</li>
            <li>Save the assigned 10-digit FRN and bring it to the exam session.</li>
          </ol>
        </InfoCard>
        <InfoCard title="Exam Fee">
          <p>$14, payable by cash or check at the exam session.</p>
        </InfoCard>
        <InfoCard title="What to Bring">
          <p>Bring a photo ID, your FCC FRN, and $14 cash for the exam fee. If you are upgrading, bring a copy of your current license or any valid CSCE.</p>
        </InfoCard>
        <InfoCard title="Registration Link">
          <p>Use HamStudy to view upcoming in-person exam sessions near Helena and register for an available seat.</p>
          <div className="mt-5">
            <ButtonLink href={LINKS.TESTING_REGISTRATION_URL}>Register on HamStudy</ButtonLink>
          </div>
        </InfoCard>
      </div>
    </section>
  );
}

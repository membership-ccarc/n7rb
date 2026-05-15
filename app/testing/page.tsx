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
          <p>TODO: Insert the next scheduled exam date and location details.</p>
        </InfoCard>
        <InfoCard title="FCC FRN">
          <p>TODO: Add step-by-step FCC Registration Number instructions for new applicants.</p>
        </InfoCard>
        <InfoCard title="Exam Fee">
          <p>TODO: Confirm and publish the current exam fee and payment methods.</p>
        </InfoCard>
        <InfoCard title="What to Bring">
          <p>TODO: Add accepted ID, FRN, current license or CSCE if upgrading, and any payment instructions.</p>
        </InfoCard>
        <InfoCard title="Registration Link">
          <p>TODO: Replace the placeholder registration/contact link with the live testing form.</p>
        </InfoCard>
      </div>
    </section>
  );
}

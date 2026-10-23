import { AtAGlance, ButtonLink, FaqSection, InfoCard, type FaqItem } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { getUpcomingExamSessions } from "@/lib/exam-sessions";
import { EXAM_FEE_USD, FCC_APPLICATION_FEE_USD, LINKS, PLACES } from "@/lib/site-data";
import { examSessionSchema } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Testing",
  description: "In-person Volunteer Examiner amateur radio testing information for Helena, Montana.",
  path: "/testing",
});

export const revalidate = 3600;

const faqs: FaqItem[] = [
  {
    question: "Where and when are amateur radio exams held in Helena?",
    answer: `CCARC holds in-person exam sessions about every 6 weeks, typically at the ${PLACES.testing.name}, ${PLACES.testing.streetAddress}, Helena, MT. Upcoming dates are listed on this page and on HamStudy.org.`,
  },
  {
    question: "How much does the exam cost?",
    answer: `The CCARC exam session fee is $${EXAM_FEE_USD}, payable by cash or check at the session. New license applicants also pay a separate $${FCC_APPLICATION_FEE_USD} application fee directly to the FCC after passing.`,
  },
  {
    question: "What do I need to bring to the exam?",
    answer: `Bring a photo ID, your FCC Registration Number (FRN), and $${EXAM_FEE_USD} cash for the exam fee. If you are upgrading, also bring a copy of your current license or any valid CSCE.`,
  },
  {
    question: "How do I get an FCC Registration Number (FRN)?",
    answer: "Register for free in the FCC's CORES system before your exam. HamStudy.org walks new applicants through the process when you register for a session.",
  },
  {
    question: "Which license exams can I take?",
    answer: "All three amateur radio license classes are available: Technician, General, and Amateur Extra.",
  },
  {
    question: "Does CCARC offer remote or online exams?",
    answer: "Not currently. All CCARC exam sessions are in person in Helena, using tablet-based testing.",
  },
];

export default async function TestingPage() {
  const upcomingExamDates = await getUpcomingExamSessions();

  return (
    <section className="bg-stonewarm-50 px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd data={upcomingExamDates.map(examSessionSchema)} />
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-black text-mountain-900 sm:text-5xl">Amateur Radio Exam Testing</h1>
        <p className="mt-5 text-lg leading-8 text-stonewarm-700">
          Volunteer Examiner testing is the FCC exam process run by accredited volunteers. CCARC offers in-person exams in Helena about every 6 weeks for all amateur radio license classes.
        </p>
        <div className="mt-8">
          <ButtonLink href={LINKS.TESTING_REGISTRATION_URL}>Register for an Exam</ButtonLink>
        </div>
      </div>
      <AtAGlance
        className="mx-auto mt-10 max-w-4xl"
        items={[
          { label: "Next exam", value: upcomingExamDates[0]?.label.replace(/\.$/, "") ?? "Dates coming soon" },
          { label: "Where", value: `${PLACES.testing.name}, ${PLACES.testing.streetAddress}, Helena` },
          { label: "Fee", value: `$${EXAM_FEE_USD}, cash or check` },
          { label: "License classes", value: "Technician, General, and Amateur Extra" },
          { label: "How often", value: "About every 6 weeks" },
          { label: "Register", value: <a className="text-pine-700 underline-offset-4 hover:underline" href={LINKS.TESTING_REGISTRATION_URL} target="_blank" rel="noopener noreferrer">HamStudy.org</a> },
        ]}
      />
      <div className="mx-auto mt-10 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard title="Current Testing Format">
          <p>In-person exams in Helena, tablet-based testing, all license classes available, and no remote exams currently. Sessions are typically held at the Lewis and Clark Library, 120 South Last Chance Gulch, Helena, MT.</p>
        </InfoCard>
        <InfoCard title="Upcoming Exam Dates">
          {upcomingExamDates.length > 0 ? (
            <ul className="space-y-2">
              {upcomingExamDates.map((d) => (
                <li key={d.date}>{d.label}</li>
              ))}
            </ul>
          ) : (
            <p>
              Dates coming soon. Contact John Geach KS7R at{" "}
              <a className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href="mailto:jcgeach@gmail.com">
                jcgeach@gmail.com
              </a>{" "}
              for the next scheduled session.
            </p>
          )}
        </InfoCard>
        <InfoCard title="Exam Fee">
          <p>$14, payable by cash or check at the exam session.</p>
        </InfoCard>
        <InfoCard title="What to Bring">
          <p>Bring a photo ID, your FCC FRN, and $14 cash for the exam fee. If you are upgrading, bring a copy of your current license or any valid CSCE.</p>
        </InfoCard>
        <InfoCard title="Registration Link">
          <p>Use HamStudy to view our upcoming in-person exam sessions and register for an available seat. HamStudy also guides new applicants through the FCC CORES process to get the required FRN.</p>
          <div className="mt-5">
            <ButtonLink href={LINKS.TESTING_REGISTRATION_URL}>Register on HamStudy</ButtonLink>
          </div>
        </InfoCard>
        <InfoCard title="Questions">
          <p>
            Please contact John Geach KS7R at{" "}
            <a className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href="mailto:jcgeach@gmail.com">
              jcgeach@gmail.com
            </a>{" "}
            with any questions.
          </p>
        </InfoCard>
      </div>
      <div className="mx-auto mt-12 max-w-7xl rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-mountain-900">Test Preparation</h2>
        <p className="mt-3 leading-7 text-stonewarm-700">
          These resources can help new applicants study for the Technician exam before attending a local test session.
        </p>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="rounded-lg bg-stonewarm-50 p-5">
            <h3 className="text-lg font-black text-mountain-900">Video Courses</h3>
            <ul className="mt-4 space-y-3 leading-7">
              <li>
                <a className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href="https://www.youtube.com/watch?v=DdzQS10JnHU" target="_blank" rel="noopener noreferrer">
                  Ham Radio Technician Prep Intro (2022-2026)
                </a>
              </li>
              <li>
                <a className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href="https://www.youtube.com/watch?v=QC3-NZvZgH8" target="_blank" rel="noopener noreferrer">
                  How To Study and Pass Your Ham Radio Exam
                </a>
              </li>
              <li>
                <a className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href="https://www.youtube.com/watch?v=bovJEGIunNg&list=PLuapIzKwhZN_30dcgsDbGU3J7C8BAYJcG" target="_blank" rel="noopener noreferrer">
                  Dave Casler Technician License Series T01
                </a>
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-stonewarm-50 p-5">
            <h3 className="text-lg font-black text-mountain-900">License Manuals</h3>
            <ul className="mt-4 space-y-3 leading-7">
              <li>
                <a className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href="https://www.amazon.com/dp/1625952384" target="_blank" rel="noopener noreferrer">
                  Gordon West Technician Class FCC Element 2 Amateur Radio License Preparation
                </a>
              </li>
              <li>
                <strong className="text-mountain-900">ARRL Technician License Manual</strong> (about $36) — The definitive reference for exam topics. Available through{" "}
                <a className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href={LINKS.AMAZON_TECHNICIAN_MANUAL_URL} target="_blank" rel="noopener noreferrer">
                  Amazon
                </a>{" "}
                or{" "}
                <a className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href={LINKS.ARRL_TECHNICIAN_MANUAL_URL} target="_blank" rel="noopener noreferrer">
                  ARRL.org
                </a>
                .
              </li>
            </ul>
          </div>
        </div>
      </div>
      <FaqSection items={faqs} />
    </section>
  );
}

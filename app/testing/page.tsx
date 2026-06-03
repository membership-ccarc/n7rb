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
                <a className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href="https://www.amazon.com/Technician-Element-Amateur-Preparation-2022-2026/dp/1625951906" target="_blank" rel="noopener noreferrer">
                  Gordon West Technician Class FCC Element 2 Amateur Radio License Preparation
                </a>
              </li>
              <li>
                ARRL Ham Radio License Manual, 5th Edition. A copy was donated by CCARC to the Lewis and Clark Library, or you can{" "}
                <a className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href="https://home.arrl.org/action/Store/Product-Details/productId/2003373064" target="_blank" rel="noopener noreferrer">
                  buy it from ARRL
                </a>
                .
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { ClassSignupForm } from "@/components/ClassSignupForm";
import { ButtonLink, InfoCard } from "@/components/ui";
import { LINKS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Classes",
  description: "Free Technician License Class in Helena, Montana. Pre-enrollment is open for the Q1 2027 Technician class, and CCARC is gauging interest in a General License Class. Learn FCC rules, radio fundamentals, antennas, and operating practices from local instructors.",
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
        <p className="mt-3 leading-7 text-stonewarm-700">
          This free public education program advances CCARC&apos;s nonprofit mission by helping people in Helena and Lewis and Clark County earn an amateur radio license and build useful communication skills.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-xl border-4 border-gold-300 bg-mountain-900 shadow-soft">
        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <p className="text-sm font-bold uppercase tracking-wide text-gold-300">Gauging Interest</p>
          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">CCARC General License Class</h2>
          <p className="mt-5 text-lg leading-8 text-stonewarm-50">
            Already hold a Technician license? We&apos;re considering offering a General License Class and want to hear from you. If now is the right time for you to upgrade and open up HF and long-distance operating, let us know you&apos;re interested.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/classes?interest=General#class-signup-form" variant="secondary">I&apos;m Interested in General Class</ButtonLink>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-xl border-4 border-gold-300 bg-mountain-900 shadow-soft">
        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <p className="text-sm font-bold uppercase tracking-wide text-gold-300">Pre-Enrollment Open</p>
          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">CCARC Technician License Class — Q1 2027</h2>
          <p className="mt-5 text-lg leading-8 text-stonewarm-50">
            Our next Technician class is planned for the first quarter of 2027. Dates are not set yet, but we are taking names now for pre-enrollment. Add your name and you&apos;ll be among the first to hear when the schedule is announced.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/classes?interest=Technician#class-signup-form" variant="secondary">Pre-Enroll for Q1 2027</ButtonLink>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wide text-pine-700">Six-week curriculum</p>
          <h2 className="mt-3 text-3xl font-black text-mountain-900 sm:text-4xl">What You&apos;ll Learn in Technician Class</h2>
          <p className="mt-4 text-lg leading-8 text-stonewarm-700">Each session combines clear instruction, practical examples, and time for questions.</p>
        </div>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            "FCC Rules & Radio Regulations",
            "Radio Fundamentals & Electronics",
            "Antennas, Feedlines & Propagation",
            "Operating Practices & Emergency Communications",
            "Station Setup, Safety & Digital Modes",
            "Exam Review & Getting On the Air",
          ].map((topic, i) => (
            <li key={topic} className="flex items-center gap-4 rounded-lg border border-stonewarm-100 bg-white p-5 shadow-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mountain-900 font-black text-gold-300">{i + 1}</span>
              <span className="text-lg font-black text-mountain-900">{topic}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-2">
        <InfoCard title="Technician Prep Course">
          <p>This is the recommended entry point for new amateur radio operators. Pre-enrollment is open for the Q1 2027 Technician class.</p>
          <div className="mt-5 flex flex-col gap-3">
            <ButtonLink href="/join-contact">Get Notified About the Next Class</ButtonLink>
          </div>
        </InfoCard>
        <InfoCard title="General Prep Course">
          <p>Hosted twice per year: Q2 and Q4. This class helps licensed Technicians expand into HF and long-distance operating.</p>
          <div className="mt-5 flex flex-col gap-3">
            <ButtonLink href="/join-contact">Get Notified About the Next Class</ButtonLink>
          </div>
        </InfoCard>
      </div>
      <div className="mx-auto mt-8 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard title="Instructor Contact">
          <p>Use the <a className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href="/join-contact">Join / Contact page</a> for instructor questions, schedule needs, or help choosing the right class.</p>
          <p className="mt-4"><a className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href="#instructors">Meet your instructors</a></p>
        </InfoCard>
        <InfoCard title="Enrollment">
          <p>Class size is capped at 15 students to keep hands-on time with the instructor.</p>
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
      <div id="instructors" className="mx-auto mt-12 max-w-4xl scroll-mt-28 rounded-lg border border-stonewarm-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-3xl font-black text-mountain-900">About Your Instructors</h2>
        <p className="mt-5 leading-7 text-stonewarm-700">CCARC&apos;s class instructors are club members with a vast wealth of ham radio knowledge and experience. They are focused on helping anyone with an interest in amateur radio get started in the hobby, from first questions through exam day and beyond.</p>
      </div>
      <div className="mx-auto mt-10 max-w-4xl rounded-lg bg-mountain-900 p-6 text-white shadow-soft sm:p-8">
        <p className="text-sm font-bold uppercase tracking-wide text-gold-300">Support beyond the classroom</p>
        <h2 className="mt-3 text-3xl font-black">After the Exam: Ham-101 Mentorship Program</h2>
        <p className="mt-5 leading-7 text-stonewarm-50">Passing the FCC exam is an exciting milestone — but getting comfortable on the air is the next step.</p>
        <p className="mt-4 leading-7 text-stonewarm-50">CCARC&apos;s <strong className="text-white">Ham-101 program</strong> matches newly licensed Technicians and General class graduates with an experienced club mentor based on their interests and goals. Whether you&apos;re interested in emergency communications, outdoor adventure radio (SOTA/POTA), digital modes, building projects, or casual conversation, we&apos;ll pair you with someone who shares your passion.</p>
        <p className="mt-5 font-bold text-white">Your mentor helps you:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-stonewarm-50">
          <li>Set up your first station and choose equipment</li><li>Make your first on-air contacts with confidence</li><li>Learn local repeater practices, nets, and community norms</li><li>Troubleshoot questions during your first weeks</li><li>Build the skills and knowledge to become an active operator</li>
        </ul>
        <div className="mt-7"><ButtonLink href="/join-contact" variant="secondary">Ask About Ham-101 Mentorship</ButtonLink></div>
      </div>
      <div className="mx-auto mt-10 max-w-4xl">
        <Suspense>
          <ClassSignupForm />
        </Suspense>
      </div>
      <div className="mx-auto mt-12 max-w-4xl">
        <h2 className="text-3xl font-black text-mountain-900 sm:text-4xl">Frequently Asked Questions</h2>
        <div className="mt-7 space-y-4">
          {[
            ["Is this for complete beginners?", <>Yes. No experience is required. We start from the basics and assume no prior knowledge of radio, electronics, or FCC rules.</>],
            ["What if I can’t make every session?", <>Missing one session is understandable — just communicate with your instructor. Missing multiple sessions may make it harder to keep up because the material builds on itself, so consistent attendance is important for exam readiness.</>],
            ["Do I need to buy anything?", <>The class and study materials are free. We highly recommend the ARRL Technician License Manual (about $36) as a study reference. It is available through <a className="font-bold text-pine-700 underline hover:no-underline" href={LINKS.AMAZON_TECHNICIAN_MANUAL_URL} target="_blank" rel="noopener noreferrer">Amazon</a> or <a className="font-bold text-pine-700 underline hover:no-underline" href={LINKS.ARRL_TECHNICIAN_MANUAL_URL} target="_blank" rel="noopener noreferrer">ARRL.org</a>. Many students also use free resources such as <a className="font-bold text-pine-700 underline hover:no-underline" href={LINKS.HAMSTUDY_URL} target="_blank" rel="noopener noreferrer">HamStudy.org</a>.</>],
            ["What should I bring to class?", <>Bring a notebook and something to write with. Questions and curiosity are also welcome.</>],
            ["Is there a cost to take the FCC exam?", <>The exam fee with CCARC is $14, which covers testing administration costs. CCARC volunteers administer the exam at no additional charge.</>],
            ["What happens after I pass the exam?", <>Welcome to the hobby! CCARC&apos;s Ham-101 mentorship program matches you with a club mentor based on your interests. Your mentor helps you set up your first station, make your first on-air contacts, and become a confident operator.</>],
            ["Can I still join if I’m a licensed ham looking to upgrade to General?", <>Yes. We offer General class twice per year, in Q2 and Q4. Reach out through the <a className="font-bold text-pine-700 underline hover:no-underline" href="/join-contact">Join / Contact page</a> and indicate your experience level and interest in General class.</>],
          ].map(([question, answer]) => (
            <article key={question as string} className="rounded-lg border border-stonewarm-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-black text-mountain-900">{question}</h3><div className="mt-3 leading-7 text-stonewarm-700">{answer}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

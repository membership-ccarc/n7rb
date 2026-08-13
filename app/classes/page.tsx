import type { Metadata } from "next";
import { ClassSignupForm } from "@/components/ClassSignupForm";
import { ButtonLink, InfoCard } from "@/components/ui";
import { LINKS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Classes",
  description: "Free Technician License Class in Helena, Montana. Six weekly sessions Sept 9-Oct 14, 2026. No experience required. Learn FCC rules, radio fundamentals, antennas, and operating practices from local instructors.",
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

      <div className="mx-auto mt-12 max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wide text-pine-700">Six-week curriculum</p>
          <h2 className="mt-3 text-3xl font-black text-mountain-900 sm:text-4xl">What You&apos;ll Learn in Technician Class</h2>
          <p className="mt-4 text-lg leading-8 text-stonewarm-700">Each session combines clear instruction, practical examples, and time for questions. Allen KH7AL leads every class with support from experienced session mentors.</p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {[
            { title: "Session 1 (September 9) — FCC Rules & Radio Regulations", instructor: "Allen KH7AL with Devon N7HNT", points: ["Understand what amateur radio is and why people participate in the hobby", "Learn basic FCC licensing structure and frequency allocations", "Understand call signs and operating etiquette", "Learn about the amateur radio frequency bands and their uses"] },
            { title: "Session 2 (September 16) — Radio Fundamentals & Electronics", instructor: "Allen KH7AL with a session mentor to be announced", points: ["Understand basic electricity concepts: voltage, current, resistance, and Ohm’s Law", "Learn frequency and wavelength basics", "Understand modulation and how radio signals work", "Learn about basic radio components and circuits"] },
            { title: "Session 3 (September 23) — Antennas, Feedlines & Propagation", instructor: "Allen KH7AL with a session mentor to be announced", points: ["Understand basic antenna types and their practical uses", "Learn about feedline choices and transmission line theory", "Discover how radio signals propagate across distance", "Understand line-of-sight communication and skip propagation", "Learn why antenna placement matters for signal strength"] },
            { title: "Session 4 (September 30) — Operating Practices & Emergency Communications", instructor: "Allen KH7AL with Al Simons (WA1TYB)", points: ["Learn proper repeater operation and etiquette", "Understand local and regional nets and how to participate", "Learn the basics of emergency communications", "Discover tactical communication concepts", "Understand logging and Q-signals for efficient communication"] },
            { title: "Session 5 (October 7) — Station Setup, Safety & Digital Modes", instructor: "Allen KH7AL with a session mentor to be announced", points: ["Understand station grounding and electrical safety practices", "Learn power supply and battery basics for portable operation", "Explore digital modes including FT8, Winlink, and packet radio", "Understand RF exposure and safe operating practices"] },
            { title: "Session 6 (October 14) — Exam Review & Getting On the Air", instructor: "Allen KH7AL with Rob Kingery (AE7AP)", points: ["Review common weak exam areas and practice questions", "Learn realistic first-station recommendations and equipment choices", "Understand next steps after getting your license", "Build confidence for exam day", "Optional: Take your FCC Technician exam the same day"] },
          ].map((session) => (
            <article key={session.title} className="rounded-lg border border-stonewarm-100 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-black text-mountain-900">{session.title}</h3>
              <p className="mt-3 font-bold text-pine-700">{session.instructor}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-stonewarm-700">
                {session.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </article>
          ))}
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
          <p className="mt-4"><a className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href="#instructors">Meet your instructors</a></p>
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
      <div id="instructors" className="mx-auto mt-12 max-w-4xl scroll-mt-28 rounded-lg border border-stonewarm-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-3xl font-black text-mountain-900">About Your Instructors</h2>
        <p className="mt-5 leading-7 text-stonewarm-700"><strong className="text-mountain-900">Allen Le Vie (KH7AL)</strong> leads all Technician class sessions, bringing hands-on experience and a patient teaching style. Allen learned basic and advanced electronic systems theory through 23 years in the USAF before retiring in 2020. He is also CCARC&apos;s Membership Growth Committee Chair and has mentored dozens of new operators through their first on-air contacts.</p>
        <p className="mt-5 leading-7 text-stonewarm-700"><strong className="text-mountain-900">Session mentors and guest instructors</strong> add depth and real-world perspective to specific topics:</p>
        <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-stonewarm-700">
          <li><strong className="text-mountain-900">Devon N7HNT</strong> — Session 1, FCC Rules &amp; Regulations</li>
          <li><strong className="text-mountain-900">Al Simons (WA1TYB)</strong> — Session 4, Operating Practices &amp; Emergency Communications. Al is CCARC&apos;s Treasurer and ARES Coordinator.</li>
          <li><strong className="text-mountain-900">Rob Kingery (AE7AP)</strong> — Session 6, Exam Review &amp; First Station Guidance. Rob is the Montana SOTA Association Manager and brings active outdoor radio experience.</li>
        </ul>
        <p className="mt-5 leading-7 text-stonewarm-700">More mentors are being added to provide well-rounded perspectives across the diverse hobby.</p>
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
        <ClassSignupForm />
      </div>
      <div className="mx-auto mt-12 max-w-4xl">
        <h2 className="text-3xl font-black text-mountain-900 sm:text-4xl">Frequently Asked Questions</h2>
        <div className="mt-7 space-y-4">
          {[
            ["Is this for complete beginners?", <>Yes. No experience is required. We start from the basics and assume no prior knowledge of radio, electronics, or FCC rules.</>],
            ["What if I can’t make every session?", <>Missing one session is understandable — just communicate with your instructor. Missing multiple sessions may make it harder to keep up because the material builds on itself, so consistent attendance is important for exam readiness.</>],
            ["Do I need to buy anything?", <>The class and study materials are free. We highly recommend the ARRL Technician License Manual (about $36) as a study reference. It is available through <a className="font-bold text-pine-700 underline hover:no-underline" href={LINKS.AMAZON_TECHNICIAN_MANUAL_URL} target="_blank" rel="noopener noreferrer">Amazon</a> or <a className="font-bold text-pine-700 underline hover:no-underline" href={LINKS.ARRL_TECHNICIAN_MANUAL_URL} target="_blank" rel="noopener noreferrer">ARRL.org</a>. Many students also use free resources such as <a className="font-bold text-pine-700 underline hover:no-underline" href={LINKS.HAMSTUDY_URL} target="_blank" rel="noopener noreferrer">HamStudy.org</a>.</>],
            ["What should I bring to class?", <>Bring a notebook and something to write with. Questions and curiosity are also welcome.</>],
            ["Is there a cost to take the FCC exam?", <>The Volunteer Examiner session has a small exam fee (about $15) to cover testing administration costs. CCARC volunteers administer the exam at no additional charge beyond the standard VE fee.</>],
            ["What happens after I pass the exam?", <>Welcome to the hobby! CCARC&apos;s Ham-101 mentorship program matches you with a club mentor based on your interests. Your mentor helps you set up your first station, make your first on-air contacts, and become a confident operator.</>],
            ["Can I still join if I’m a licensed ham looking to upgrade to General?", <>Yes. We offer General class twice per year, in Q2 and Q4. Sign up using the form above and indicate your experience level and interest in General class.</>],
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

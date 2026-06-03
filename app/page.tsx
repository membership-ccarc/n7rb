import { amateurRadioCards, LINKS, nets, SITE, whatWeDo } from "@/lib/site-data";
import Image from "next/image";
import { ButtonLink, InfoCard, MeetingDetails, PlaceholderImage, SectionIntro } from "@/components/ui";

export default function Home() {
  return (
    <>
      <section className="bg-stonewarm-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_0.86fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-pine-700">CCARC | {SITE.callsign} {SITE.city}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-mountain-900 sm:text-5xl lg:text-6xl">
              Ready to Get Started in Ham Radio?
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stonewarm-700">
              CCARC helps new and advancing operators in Helena learn the basics, prepare for license exams, and make their first contacts with support from local ham radio operators.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={LINKS.CLASS_SIGNUP_URL}>Join the Next License Class</ButtonLink>
              <ButtonLink href="/meetings-nets" variant="secondary">Visit a Meeting</ButtonLink>
              <ButtonLink href="/testing" variant="light">Take an Exam</ButtonLink>
            </div>
          </div>
          <div className="relative min-h-[340px] overflow-hidden rounded-lg bg-mountain-900 shadow-soft sm:min-h-[440px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(233,191,85,0.45),transparent_30%),linear-gradient(140deg,#12364a_0%,#24556f_38%,#39724f_72%,#f8e9bd_100%)]" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[linear-gradient(155deg,transparent_0%,transparent_38%,rgba(23,55,39,0.9)_39%,rgba(23,55,39,0.95)_100%)]" />
            <div className="relative flex min-h-[340px] items-center justify-center p-3 sm:min-h-[440px]">
              <Image
                src="/CCARC_firetower.png"
                alt="N7RB fire tower logo"
                width={400}
                height={400}
                className="h-[300px] w-[300px] rounded-lg object-contain sm:h-[390px] sm:w-[390px]"
                style={{ backgroundColor: "#faf7f1" }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <SectionIntro title="What is Amateur Radio?">
          <p>
            Amateur radio, often called ham radio, is a practical way to learn wireless communication, serve your community, experiment with technology, and make real contacts without needing cell service.
          </p>
        </SectionIntro>
        <div className="mx-auto mt-10 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {amateurRadioCards.map(({ title, text, image, imageAlt }) => (
            <article key={title} className="grid overflow-hidden rounded-lg border border-stonewarm-100 bg-white shadow-sm sm:grid-cols-[8.5rem_1fr]">
              <Image
                src={image}
                alt={imageAlt}
                width={640}
                height={640}
                className="aspect-square w-full object-cover sm:h-full"
              />
              <div className="p-6">
                <h3 className="text-xl font-black text-mountain-900">{title}</h3>
                <p className="mt-3 leading-7 text-stonewarm-700">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-stonewarm-50 px-4 py-16 sm:px-6 lg:px-8">
        <SectionIntro eyebrow="Start here" title="Your Path to Getting Licensed" />
        <div className="mx-auto mt-10 grid max-w-7xl gap-5 md:grid-cols-4">
          {[
            ["1", "Join a Technician Class", "Learn the basics with local instructors and other beginners."],
            ["2", "Practice with HamStudy", "Use short study sessions and practice exams at HamStudy.org."],
            ["3", "Take the FCC Exam", "Sit for a local Volunteer Examiner session in Helena."],
            ["4", "Get on the Air with CCARC", "Make your first contacts with help from club members."],
          ].map(([step, title, text]) => (
            <article key={step} className="rounded-lg bg-white p-6 shadow-sm">
              <p className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-300 font-black text-mountain-900">{step}</p>
              <h3 className="mt-5 text-lg font-black text-mountain-900">{title}</h3>
              <p className="mt-3 leading-7 text-stonewarm-700">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <SectionIntro title="Upcoming License Classes">
          <p>CCARC offers a friendly path into amateur radio with seasonal courses for new and advancing operators.</p>
        </SectionIntro>
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-2">
          <InfoCard title="Technician Prep Course">
            <p>Hosted twice per year: Q1 and Q3.</p>
            <div className="mt-5">
              <ButtonLink href={LINKS.CLASS_SIGNUP_URL}>Join the Next Technician Class</ButtonLink>
            </div>
          </InfoCard>
          <InfoCard title="General Prep Course">
            <p>Hosted twice per year: Q2 and Q4.</p>
            <div className="mt-5">
              <ButtonLink href={LINKS.CLASS_SIGNUP_URL}>Join the Next General Class</ButtonLink>
            </div>
          </InfoCard>
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm font-medium text-stonewarm-700">
          Submit the class interest form and a club volunteer will follow up with next steps.
        </p>
      </section>

      <section className="bg-stonewarm-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <PlaceholderImage
            className="min-h-[280px]"
            label="Monthly club meeting"
            alt="Placeholder illustration representing a welcoming amateur radio club meeting"
          />
          <div>
            <h2 className="text-3xl font-black text-mountain-900">Visit a Club Meeting</h2>
            <p className="mt-4 text-lg leading-8 text-stonewarm-700">
              Visitors are welcome. Meetings are a simple way to meet local operators, ask beginner questions, and see what the club is doing next.
            </p>
            <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
              <MeetingDetails />
            </div>
            <div className="mt-6">
              <ButtonLink href="/meetings-nets">Attend the Next Meeting</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <h2 className="text-3xl font-black text-mountain-900">Take an Amateur Radio Exam</h2>
            <p className="mt-4 text-lg leading-8 text-stonewarm-700">
              CCARC offers in-person Volunteer Examiner testing in Helena about every 6 weeks. Exams are available for all amateur radio license classes, use tablet-based testing, and remote testing is not currently offered.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/testing">View Testing Information</ButtonLink>
              <ButtonLink href={LINKS.TESTING_REGISTRATION_URL} variant="light">Register on HamStudy</ButtonLink>
            </div>
          </div>
          <div className="rounded-lg bg-stonewarm-50 p-6">
            <h3 className="text-xl font-black text-mountain-900">Exam sessions include</h3>
            <ul className="mt-4 space-y-3 text-stonewarm-700">
              <li>All amateur license classes</li>
              <li>Tablet-based testing</li>
              <li>Local in-person sessions in Helena</li>
              <li>Help understanding what to bring</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-stonewarm-50 px-4 py-16 sm:px-6 lg:px-8">
        <SectionIntro title="Get On the Air">
          <p>Listen first, check in when ready, and get familiar with local radio activity.</p>
        </SectionIntro>
        <div className="mx-auto mt-10 grid max-w-7xl gap-5 lg:grid-cols-3">
          {nets.map((net) => (
            <InfoCard key={net.name} title={net.name}>
              <p>{net.time} on the {net.frequency}</p>
            </InfoCard>
          ))}
        </div>
        <div className="mx-auto mt-8 max-w-3xl rounded-lg bg-white p-6 text-center shadow-sm">
          <p className="font-bold text-mountain-900">
            Belmont repeater {SITE.repeater} with {SITE.repeaterTone} tone. Backup simplex: {SITE.backupSimplex}.
          </p>
          <div className="mt-5">
            <ButtonLink href="/meetings-nets" variant="secondary">Listen to a Net</ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.58fr] lg:items-center">
          <div className="overflow-hidden rounded-lg border border-stonewarm-100 bg-mountain-900 shadow-soft">
            <Image
              src="/CCARC_FD2026.png"
              alt="Capital City Amateur Radio Club Field Day 2026 flyer for June 27-28, 2026 in Helena, Montana"
              width={1732}
              height={908}
              className="h-auto w-full"
            />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-pine-700">Next Big Event</p>
            <h2 className="mt-3 text-3xl font-black text-mountain-900 sm:text-4xl">Field Day 2026</h2>
            <p className="mt-4 text-lg leading-8 text-stonewarm-700">
              Join CCARC for Field Day on June 27-28, 2026 at Quigley Group Campground atop MacDonald Pass, west of Helena.
            </p>
            <p className="mt-3 leading-7 text-stonewarm-700">
              Coordinates: 46.560979, -112.304516. Operate, learn, connect, and help keep amateur radio strong.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink href="https://www.facebook.com/share/14eDkjzrqRU/">View the Facebook Event</ButtonLink>
              <ButtonLink href="/join-contact" variant="light">Ask a Question</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <SectionIntro title="What We Do" />
        <div className="mx-auto mt-10 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whatWeDo.map(({ title, text, references }) => (
            <InfoCard key={title} title={title}>
              <p>{text}</p>
              {references.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-bold">
                  {references.map((reference) => (
                    <li key={reference.href}>
                      <a
                        className="text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                        href={reference.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {reference.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </InfoCard>
          ))}
        </div>
      </section>

      <section className="bg-pine-700 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-black sm:text-4xl">Ready to Start?</h2>
          <p className="mt-4 text-lg leading-8 text-pine-50">
            Whether you are curious about preparedness, hiking, electronics, STEM, or community service, CCARC can help you take the next step.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/get-licensed" variant="secondary">Get Licensed</ButtonLink>
            <ButtonLink href="/join-contact" variant="light">Ask a Question</ButtonLink>
            <ButtonLink href={LINKS.MEMBERSHIP_FORM_URL} variant="light">Join CCARC</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

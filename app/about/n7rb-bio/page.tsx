import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui";
import { SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Dick Beaton, N7RB",
  description: "A local profile of Dick Beaton, N7RB, whose callsign became the CCARC club callsign.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function N7RBBioPage() {
  return (
    <article className="bg-stonewarm-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-pine-700">Why {SITE.callsign}?</p>
          <h1 className="mt-3 text-4xl font-black text-mountain-900 sm:text-5xl">Dick Beaton, N7RB</h1>
          <p className="mt-5 text-xl font-bold text-pine-700">1916-2013</p>
          <p className="mt-6 text-lg leading-8 text-stonewarm-700">
            Dick Beaton was a longtime Helena resident, amateur radio operator, and member of the Capital City Amateur Radio Club. After his death, CCARC applied for and received his callsign, N7RB, as the club&apos;s official callsign.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/about" variant="light">Back to About CCARC</ButtonLink>
          </div>
        </div>
        <figure className="mx-auto w-fit rounded-lg bg-white p-3 shadow-soft lg:mx-0 lg:justify-self-center">
          <Image
            src="/Dick_Beaton_N7RB.png"
            alt="Dick Beaton, N7RB"
            width={195}
            height={292}
            className="h-auto w-[195px] rounded-md object-contain"
            priority
          />
          <figcaption className="mt-4 text-center text-sm font-bold text-stonewarm-700">
            Dick Beaton, N7RB
          </figcaption>
        </figure>
      </div>

      <div className="mx-auto mt-12 max-w-4xl space-y-8 rounded-lg bg-white p-6 leading-8 text-stonewarm-700 shadow-sm sm:p-8">
        <section aria-labelledby="club-service">
          <h2 id="club-service" className="text-2xl font-black text-mountain-900">A Life in Radio and Club Service</h2>
          <p className="mt-4">
            Dick served CCARC in many practical roles, including club president, newsletter editor, license-class instructor, and Volunteer Examiner. Even after macular degeneration severely affected his eyesight, he remained active on the air and was a regular check-in on the club&apos;s Tuesday night ARES net.
          </p>
          <p className="mt-4">
            He became a silent key in 2013 at age 96 after roughly 80 years as a licensed amateur radio operator. His radio life stretched from the early experimental years of amateur radio into the digital era, making him a bridge between generations of operators.
          </p>
        </section>

        <section aria-labelledby="early-radio">
          <h2 id="early-radio" className="text-2xl font-black text-mountain-900">Early Interest and First License</h2>
          <p className="mt-4">
            Dick was born on December 22, 1916, and grew up in Lemmon, South Dakota. As a child, he became fascinated by radio during the 1920s, when broadcast radio was still new. He read what he could find, built crystal sets and tube radios, and experimented with improvised parts.
          </p>
          <p className="mt-4">
            After moving to Fargo, North Dakota, he met an older amateur operator who encouraged his interest. Dick studied Morse code with a friend after school and earned his first amateur license on June 14, 1934, first through the Federal Radio Commission and then again as the new FCC took over licensing.
          </p>
        </section>

        <section aria-labelledby="homebrew">
          <h2 id="homebrew" className="text-2xl font-black text-mountain-900">Homebuilt Gear and Early Contacts</h2>
          <p className="mt-4">
            Using information from an ARRL Handbook, Dick built an early station with a regenerative receiver and a crystal-controlled 40-meter CW transmitter. He made his first contact with a station near Chicago and later reached New Zealand on 40 meters, receiving a QSL card that proved the contact to skeptical friends.
          </p>
          <p className="mt-4">
            Like many early hams, he learned by building. He cut and ground quartz crystals for radio frequencies, made his own CW keyer parts, and solved power-supply problems with available materials. That practical, experimental approach stayed with him throughout his amateur radio life.
          </p>
        </section>

        <section aria-labelledby="career">
          <h2 id="career" className="text-2xl font-black text-mountain-900">Radio Work and Helena</h2>
          <p className="mt-4">
            During the Depression, Dick joined the Civilian Conservation Corps and served as a radio operator. He later pursued commercial radio work, earned a commercial radio operator&apos;s license, and began working for Northwest Airlines in 1938. His early airline work brought him to Helena, and radio remained part of both his career and his hobby.
          </p>
          <p className="mt-4">
            He continued operating from several Northwest Airlines locations. After World War II, when amateurs were allowed back on the air, he relicensed and eventually received the W7SAW callsign. He used surplus military equipment, built Heathkit radios, and adapted as amateur radio changed through the decades.
          </p>
        </section>

        <section aria-labelledby="mentor">
          <h2 id="mentor" className="text-2xl font-black text-mountain-900">Mentor, Examiner, and Example</h2>
          <p className="mt-4">
            Dick earned Amateur Extra in the early 1980s and took his 20 WPM code test using a typewriter. He was one of the first amateurs in Helena to become a Volunteer Examiner, giving exams for many years and helping new operators enter the hobby.
          </p>
          <p className="mt-4">
            He was also open to new modes and encouraged others to try them, including early local use of PSK31. As newsletter editor, he helped keep the club connected and added personality through a recurring cartoon character, Aunt Ida.
          </p>
          <p className="mt-4">
            Dick is remembered as a generous mentor with a positive outlook and a steady willingness to help beginners. CCARC&apos;s use of N7RB as the club callsign is a living memorial to that example.
          </p>
        </section>

        <p className="border-t border-stonewarm-100 pt-6 text-sm leading-6">
          This local profile is a paraphrased adaptation of CCARC&apos;s original “Why N7RB?” page. For the original profile and interview excerpts, visit the source page.
        </p>
      </div>
    </article>
  );
}

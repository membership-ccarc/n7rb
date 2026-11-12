import { ButtonLink } from "@/components/ui";
import { CONTACT_EMAIL_ADDRESS, LINKS, PLACES, TECHNICIAN_CLASS } from "@/lib/site-data";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: { absolute: "CCARC News & Updates | Amateur Radio in Helena, Montana" },
  description: "Latest news and updates from Capital City Amateur Radio Club — classes, events, field day, emergency communications, and community service in Helena and Lewis and Clark County.",
  path: "/news",
  ogTitle: "CCARC News & Updates | Amateur Radio in Helena, Montana",
  ogDescription: "Classes, events, Field Day, emergency communications, and community service updates from CCARC in Helena, Montana.",
});

const HEAD_LANE_TRAILHEAD_MAP_URL = "https://www.google.com/maps/place/Head+Lane+Trailhead/@46.6681115,-112.0975953,625m/data=!3m2!1e3!4b1!4m6!3m5!1s0x534353d556df1e07:0xf3173c18db101289!8m2!3d46.6681078!4d-112.0950204!16s%2Fg%2F11sxyfycc_";

const linkClasses = "font-bold text-pine-700 underline decoration-pine-700/40 underline-offset-4 hover:decoration-pine-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine-700";

export default function NewsPage() {
  return (
    <section className="bg-stonewarm-50 px-4 py-12 sm:px-6 lg:px-8">
      <header className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-bold uppercase tracking-wide text-pine-700">Latest from CCARC</p>
        <h1 className="mt-3 text-4xl font-black text-mountain-900 sm:text-5xl">News &amp; Updates</h1>
        <p className="mt-5 text-lg leading-8 text-stonewarm-700">Stay informed about CCARC events, club activities, and amateur radio opportunities in Helena and Lewis and Clark County.</p>
      </header>

      <div className="mx-auto mt-12 max-w-4xl">
        <h2 className="text-3xl font-black text-mountain-900">Recent Updates</h2>
        <div className="mt-7 space-y-5">
          <NewsItem id="nerds-on-a-hike-december" date="November 12, 2026" title="Nerds on a Hike: Join Us December 5 at Scratchgravel Hills">
            <p>Ever wondered how people can talk across the country with a radio that fits in a backpack? Come find out.</p>
            <p className="mt-4">Join the Capital City Amateur Radio Club for our next Nerds on a Hike. Local hams will lead the hike and set up portable radio stations at the summit of Scratchgravel Hills. We&apos;ll make contacts from a public park as part of Summits On The Air (SOTA) and Parks On The Air (POTA), two worldwide programs, and you&apos;re welcome to step up to the mic and make one yourself. No license or experience is needed.</p>
            <p className="mt-4">New hams: this is your chance to get on the air with experienced operators beside you.</p>
            <p className="mt-4"><strong className="font-bold text-mountain-900">When:</strong> 10:00 AM, Saturday, December 5, 2026.</p>
            <p className="mt-4"><strong className="font-bold text-mountain-900">Where:</strong> Meet at the <a className={linkClasses} href={HEAD_LANE_TRAILHEAD_MAP_URL} target="_blank" rel="noopener noreferrer">Head Lane Trailhead</a>.</p>
            <p className="mt-4"><strong className="font-bold text-mountain-900">Bring:</strong> Warm layers, water, sturdy shoes, and your sense of adventure.</p>
            <p className="mt-4"><strong className="font-bold text-mountain-900">Weather:</strong> We&apos;ll post a go/no-go on our <a className={linkClasses} href={LINKS.FACEBOOK_URL} target="_blank" rel="noopener noreferrer">Facebook page</a> by 7 AM. If we cancel, we&apos;ll move to Saturday, December 12.</p>
            <h4 className="mt-5 text-lg font-bold text-mountain-900">What to Expect</h4>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>A 2.4-mile round-trip hike with about 880 feet of elevation gain.</li>
              <li>A friendly group hike to our operating location.</li>
              <li>A portable ham radio station you can see in action.</li>
              <li>Opportunities for newcomers to get on the air with help from licensed operators.</li>
              <li>Experienced hams sharing tips about portable operating.</li>
              <li>A chance to help complete a SOTA/POTA activation.</li>
              <li>Good conversation, fresh air, and plenty of nerdiness.</li>
            </ul>
            <p className="mt-4">Nerds on a Hike happens the first Saturday of every month. Questions? Email <a className={linkClasses} href={`mailto:${CONTACT_EMAIL_ADDRESS}?subject=Nerds%20on%20a%20Hike`}>{CONTACT_EMAIL_ADDRESS}</a>.</p>
          </NewsItem>
          <NewsItem date="November 5, 2026" title="Next Technician License Class Starts February 3 — Thank You, DoubleTree by Hilton">
            <p>Our next free Technician License Class is set! The class meets for six Wednesday evenings, February 3 through March 10, 2027, from 6:00 to 8:00 PM at the <a className={linkClasses} href={LINKS.CLASS_LOCATION_MAP_URL} target="_blank" rel="noopener noreferrer">{PLACES.technicianClass.name}</a>, {PLACES.technicianClass.streetAddress}. No experience is required, and the class is free.</p>
            <p className="mt-4"><strong className="font-bold text-mountain-900">Seats are limited to {TECHNICIAN_CLASS.capacity} students</strong> and are filled in the order registrations arrive, so please register early. If you added your name to our pre-enrollment list, you&apos;ll hear from a club volunteer soon.</p>
            <p className="mt-4">A big thank-you to the DoubleTree by Hilton Helena Downtown, and especially General Manager John Lytle, for hosting the class and supporting our club&apos;s nonprofit effort to help more people around Helena earn their ham radio licenses. Community partners like this make free public education possible.</p>
            <p className="mt-4"><a className={linkClasses} href="/classes?interest=Technician#class-signup-form">Reserve your seat in the Technician class →</a></p>
          </NewsItem>
          <NewsItem date="October 31, 2026" title="November CCARC Newsletter — 10 new hams, a moonbounce antenna, and a hike">
            <p>The November newsletter is out, and it&apos;s a good one.</p>
            <p className="mt-4">Our Technician class wrapped up with 10 of 11 students passing on October 21, and three of them walked out with their General as well. Come see who they are so you can welcome them on the air.</p>
            <p className="mt-4">Also in this issue:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li><strong>Nerds On a Hike</strong> kicks off November 7 at Scratchgravel Hills with a POTA activation. New hams, bring your mic courage.</li>
              <li><strong>Get Yourself Grounded:</strong> Bill N7MSI walks through his single-point shack ground, copper strap and all.</li>
              <li><strong>Thunder on the Snake River:</strong> Rob KI4NCT on running safety boat comms where the cell signal gives up.</li>
              <li><strong>EME Antenna Build, Part Deux:</strong> Tom KE7VUX machines a 24-foot, 12-element Yagi to the half-millimeter.</li>
              <li><strong>Fire Prevention Week:</strong> Stacy KK7CJV led 7 land to the top spot with 4,747 QSOs.</li>
            </ul>
            <p className="mt-4">Plus a Hallicrafters SX-110 looking for a new home, and a Badger Pass trip that&apos;s bringing solar backup to the Belmont repeater.</p>
            <p className="mt-4"><a className={linkClasses} href="/newsletters/newsletter-2026-11.pdf" target="_blank" rel="noopener noreferrer">Read the November newsletter →</a></p>
          </NewsItem>
          <NewsItem date="October 31, 2026" title="October Club Meeting Minutes Available">
            The minutes from the October 5, 2026 CCARC club meeting are now available. <a className={linkClasses} href="/docs/CCARC_October_2026_Minutes.pdf" download>Download the October meeting minutes (PDF) →</a>
          </NewsItem>
          <NewsItem date="October 27, 2026" title="Introducing Nerds on a Hike: Join Us November 7">
            <p>Ever wondered how people can talk across the country with a radio that fits in a backpack? Come find out at CCARC&apos;s first Nerds on a Hike on Saturday, November 7, 2026!</p>
            <p className="mt-4">Trail Master Brett (N7SKI) will lead a short, easy walk and set up a portable radio station in the Scratchgravel Hills. We&apos;ll make contacts from a public park as part of Parks On The Air (POTA), a worldwide program, and you&apos;re welcome to step up to the mic and make one yourself. No license or experience needed.</p>
            <p className="mt-4">New hams: this is your chance to get on the air with experienced operators beside you.</p>
            <p className="mt-4"><strong className="font-bold text-mountain-900">Bring:</strong> Warm layers, water, sturdy shoes, and your sense of adventure.</p>
            <p className="mt-4"><strong className="font-bold text-mountain-900">Weather:</strong> We&apos;ll post a go/no-go update here by 7 AM on the day of the hike. If we cancel, we&apos;ll move to Saturday, November 14.</p>
            <h4 className="mt-5 text-lg font-bold text-mountain-900">What to Expect</h4>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>A friendly group hike to our operating location.</li>
              <li>A portable ham radio station you can see in action.</li>
              <li>Opportunities for newcomers to get on the air with help from licensed operators.</li>
              <li>Experienced hams sharing tips about portable operating.</li>
              <li>A chance to help complete a POTA activation.</li>
              <li>Good conversation, fresh air, and plenty of nerdiness.</li>
            </ul>
            <p className="mt-4">Nerds on a Hike is a new club member activity happening the first Saturday of every month. Come join the adventure!</p>
          </NewsItem>
          <NewsItem date="October 25, 2026" title="Congratulations to Our Technician License Class Graduates">
            <p>Please join CCARC in congratulating the 10 successful candidates from our recent Technician License Class and welcoming them into this great hobby!</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>KM7IFH — Technician — Clayton</li>
              <li>KM7IFI — Technician — John</li>
              <li>KM7IFJ — Technician — Josh</li>
              <li>KM7IFK — Technician — Kurt</li>
              <li>KM7IFL — Technician — Dennis</li>
              <li>KM7IFR — Technician — Jacob</li>
              <li>KM7IFS — General — Neil</li>
              <li>KM7IFT — General — Charlie</li>
              <li>KM7IFU — General — Kendall</li>
              <li>Callsign pending — Technician — Shawn</li>
            </ul>
            <p className="mt-4">A special thank-you goes to our guest mentors who helped with class presentations and the Volunteer Examiners who supported our special test session: N7HNT, AI7BM, N7MSI, WA1TYB, N7SHM, AE7AP, AA7VG (VE), and KS7R (VEC).</p>
            <p className="mt-4">We hope to host another class in the first quarter of 2027. Thank you to everyone who helped make this class a success!</p>
          </NewsItem>
          <NewsItem date="October 5, 2026" title="Join the Great Montana ShakeOut Net on October 15">
            <p>International ShakeOut Day is Thursday, October 15 (10/15 at 10:15 a.m. local time), when millions of people worldwide will practice earthquake safety with drills at work, school, or home. At 10:15 a.m., you can join people across Montana in practicing earthquake safety.</p>
            <p className="mt-4">Local hams can take part in a directed net exercise shortly after 10:15 a.m. on the Belmont repeater: <strong className="font-bold text-mountain-900">147.22 MHz (+), 100 Hz tone</strong>. CCARC has registered as a group, so you do not need to register individually to participate.</p>
            <p className="mt-4">For more on earthquake safety and the event, visit the <a className={linkClasses} href="https://www.shakeout.org/montana/" target="_blank" rel="noopener noreferrer">Great Montana ShakeOut website</a> or contact Lynn Wagner, K7WGR. Details are also in our <a className={linkClasses} href="/newsletters/newsletter-2026-10.pdf" target="_blank" rel="noopener noreferrer">October 2026 newsletter →</a></p>
          </NewsItem>
          <NewsItem date="September 25, 2026" title="Belmont Repeater Tower Maintenance Completed">
            <p>After more than a year of discussion and months of planning, a crew of CCARC members headed up Mount Belmont on Thursday, September 24 to improve the N7RB repeater tower&apos;s guy wires and grounding.</p>
            <p className="mt-4">The Belmont repeater endures extreme weather and high winds most of the year, and that wear had been making the repeater hard to use on windy days. Loose connections or grounding on the tower and guy wires were suspected of causing radio frequency interference (RFI), filling the repeater&apos;s signal with static and noise and hitting weaker stations such as handheld radios hardest.</p>
            <p className="mt-4">The crew installed new guy clamps and insulators to stop stray currents between the guy wires, and properly re-tensioned the guys to keep the tower upright. The work came none too soon: they found one guy wire significantly under tension and worn bolts that needed replacing. Early reports since the work have been very positive, with many operators noting greatly improved audio and signals.</p>
            <p className="mt-4">This is part two of the club&apos;s ongoing repeater improvements funded by your dues. Last summer the repeater itself was replaced with a newer, more capable and reliable model, and next year the club may look at adding solar power.</p>
            <p className="mt-4">Special thanks to the repeater maintenance crew: Brian Lee (KJ7OUF), Al Simons (WA1TYB), Bill McGuire (N7MSI), Eric Webb (KE7NLU), Stacy Webb (KK7CJV), Matt Gould (AA7MG), Keith Platts (KM7AEM), Mark Heckenlaible (W7HS), Dan Hawkins (N7SHM), and Steve Miller (KF7HJS). Read the full story with photos in our <a className={linkClasses} href="/newsletters/newsletter-2026-10.pdf" target="_blank" rel="noopener noreferrer">October 2026 newsletter →</a></p>
          </NewsItem>
          <NewsItem date="September 14, 2026" title="Volunteers Needed for Three October Events">
            <p>We have a few events coming up in October that Al Simons is looking for volunteers to help support:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Montana State Exercise on October 6</li>
              <li>The Great Montana ShakeOut 2026 on October 15</li>
              <li>Just for the Helena of It race on October 18</li>
            </ul>
            <p className="mt-4"><strong className="font-bold text-mountain-900">Montana State Exercise</strong> — New this year, we have been requested to participate in a state exercise on October 6. We will activate the four stations we have pre-positioned around town at the State DES, Department of Public Health and Human Services (DPHHS) Emergency Preparedness Division, St. Peter&apos;s Health, and the Lewis and Clark County EOC at the airport.</p>
            <p className="mt-4"><strong className="font-bold text-mountain-900">The Great Montana ShakeOut</strong> — This is an earthquake-based exercise raising awareness of how to prepare for and behave during an earthquake. Lynn, K7WGR, will conduct a net on the morning of October 15 at a time to be determined, as he has done for several years. More information is available on the <a className={linkClasses} href="https://www.shakeout.org/montana/" target="_blank" rel="noopener noreferrer">Great Montana ShakeOut website</a>.</p>
            <p className="mt-4"><strong className="font-bold text-mountain-900">Just for the Helena of It</strong> — This is a running race we support with amateur radio operators at various checkpoints to track runners and keep race officials informed. All profits from Just for the Helena of It will be donated to The Friendship Center and Girls Thrive.</p>
            <p className="mt-4">If you are interested in learning about one or more of these opportunities, please contact Al Simons at <a className={linkClasses} href="mailto:al@simonshome.org?subject=October%202026%20Volunteer%20Opportunities">al@simonshome.org</a>.</p>
          </NewsItem>
          <NewsItem date="September 2, 2026" title="RSVP Now: CCARC Annual Picnic & Tailgate Swap Meet, September 12">
            Join us Saturday, September 12, 2026 from 3:00–6:00 PM at the Lewis and Clark County Fairgrounds Picnic Shelter (98 W Custer Ave, Helena) for our Annual Picnic and Ham Radio Tailgate Swap Meet. The event is free and open to the public — come meet local ham radio operators, browse the 3–4 PM tailgate swap meet, and find out what the hobby is all about in a relaxed, no-pressure setting. Please RSVP with Marla at <a className={linkClasses} href="mailto:mkulib@gmail.com?subject=CCARC%20Picnic%20RSVP">mkulib@gmail.com</a> so we can get a head count and have enough food. The club is supplying grill items — we&apos;re asking members to bring a side dish: if your last name starts with A&ndash;L, please bring a salad; if it starts with M&ndash;Z, please bring a dessert.
          </NewsItem>
          <NewsItem date="August 10, 2026" title="Capital City Amateur Radio Club Is Now on Facebook">
            Keep up with club news, activities, photos, and upcoming events by following <a className={linkClasses} href={LINKS.FACEBOOK_URL} target="_blank" rel="noopener noreferrer">CCARC on Facebook</a>.
          </NewsItem>
          <NewsItem date="August 5, 2026" title="Technician License Class Announced: Class Begins September 9">
            Our Fall 2026 Technician License Class is finalized and enrollment is open. Six weekly sessions begin September 9 at the Salvation Army in Helena. No experience is required — begin your journey to getting licensed. <a className={linkClasses} href="/classes">Sign up for the Technician Class →</a>
          </NewsItem>
          <NewsItem date="August 1, 2026" title="CCARC Supports the HURL Elkhorn Endurance Race">
            CCARC volunteers provided critical radio communications support for the 2026 HURL Elkhorn Endurance Runs, helping coordinate between race participants and support teams. Read the full report in our <a className={linkClasses} href="/newsletters/newsletter-2026-08.pdf" target="_blank" rel="noopener noreferrer">August 2026 newsletter →</a>
          </NewsItem>
          <NewsItem date="July 7, 2026" title="July Board Meeting Minutes Available">
            The CCARC board met on July 7, 2026 to discuss club operations, planning, and community service activities. <a className={linkClasses} href="/docs/CCARC_July_2026_Minutes.pdf" target="_blank" rel="noopener noreferrer">View July 2026 meeting minutes →</a>
          </NewsItem>
          <NewsItem date="June 28, 2026" title="CCARC Participates in ARRL Field Day">
            CCARC members activated an amateur radio station from MacDonald Pass for the 2026 ARRL Field Day event, a nationwide operating exercise that combines emergency preparedness with public education. Read the full report in our <a className={linkClasses} href="/newsletters/newsletter-2026-07.pdf" target="_blank" rel="noopener noreferrer">July 2026 newsletter →</a>
          </NewsItem>
          <NewsItem date="June 1, 2026" title="Membership Growth Committee Established">
            At the June board meeting, CCARC officially established the Membership Growth Committee and approved a $500 annual budget to support amateur radio education and community outreach in Helena. This initiative drives our free license classes, public events, partnerships with community organizations, and expanded mentoring programs for new operators.
          </NewsItem>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-4xl rounded-lg border border-stonewarm-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-black text-mountain-900">Previous Updates</h2>
        <p className="mt-4 leading-7 text-stonewarm-700">Older news and club reports are available in our <a className={linkClasses} href="/newsletter">newsletter archive →</a>. You can also review the <a className={linkClasses} href="/docs/CCARC_June_2026_Minutes.pdf" target="_blank" rel="noopener noreferrer">June 2026 board meeting minutes →</a></p>
      </div>

      <div className="mx-auto mt-10 max-w-4xl rounded-lg bg-mountain-900 p-6 text-white shadow-soft sm:p-8">
        <h2 className="text-2xl font-black">Stay Connected</h2>
        <p className="mt-3 leading-7 text-stonewarm-50">Want to stay in the loop? Follow CCARC on Facebook or contact us to join our mailing list for news and event updates.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href={LINKS.FACEBOOK_URL} variant="secondary">Follow CCARC on Facebook</ButtonLink>
          <ButtonLink href="/join-contact" variant="light">Contact CCARC</ButtonLink>
        </div>
      </div>
    </section>
  );
}

function NewsItem({ id, date, title, children }: { id?: string; date: string; title: string; children: React.ReactNode }) {
  return (
    <article id={id} className="scroll-mt-28 rounded-lg border border-stonewarm-100 bg-white p-6 shadow-sm sm:p-8">
      <time className="text-sm font-bold uppercase tracking-wide text-pine-700">{date}</time>
      <h3 className="mt-2 text-2xl font-black text-mountain-900">{title}</h3>
      <div className="mt-4 leading-7 text-stonewarm-700">{children}</div>
    </article>
  );
}

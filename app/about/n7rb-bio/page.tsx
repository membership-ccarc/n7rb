import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui";
import { SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Dick Beaton, N7RB",
  description: "The full CCARC profile of Dick Beaton, N7RB, whose callsign became the club callsign.",
  robots: {
    index: false,
    follow: true,
  },
};

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

export default function N7RBBioPage() {
  return (
    <article className="bg-stonewarm-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-pine-700">Why {SITE.callsign}?</p>
          <h1 className="mt-3 text-4xl font-black text-mountain-900 sm:text-5xl">Dick Beaton, N7RB</h1>
          <p className="mt-5 text-xl font-bold text-pine-700">1917-2013</p>
          <p className="mt-6 text-lg leading-8 text-stonewarm-700">
            Dick Beaton, N7RB was a longtime resident of Helena and member of the Capital City Amateur Radio Club. As a living memorial to Dick, CCARC applied for and received his call sign, N7RB, as the club&apos;s official call sign.
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

      <div className="mx-auto mt-12 max-w-4xl rounded-lg bg-white p-6 leading-8 text-stonewarm-700 shadow-sm sm:p-8">
        <div className="space-y-5">
          <p>
            <strong className="text-mountain-900">Dick Beaton, N7RB 1917-2013</strong>
          </p>
          <p>
            Dick Beaton, N7RB was a longtime resident of Helena and member of the Capital City Amateur Radio Club (CCARC). His involvement in the CCARC included many roles such as president, newsletter editor, class instructor and volunteer examiner. In his later years Dick developed macular degeneration which severely affected his eyesight, but not his operating ability. He remained active on the ham bands and was a regular check-in on the club&apos;s <TextLink href="/meetings-nets">Tuesday night Amateur Radio Emergency Services (ARES) net</TextLink>.
          </p>
          <p>
            Dick became a silent key in 2013 at the age of 96, having been a licensed amateur radio operator for 80 years. His operating experiences over that period of time span the earliest days of amateur radio experimentation to the advent of digital communications. He was truly an amateur radio pioneer. His operating experiences and devotion to the hobby exemplifies the amateur spirit. As a living memorial to Dick, the CCARC applied for and received his call sign, N7RB, as the club&apos;s official call sign.
          </p>
          <p>The following quotes are Dick&apos;s own words from an interview conducted a few years before his death.</p>
          <p>
            Dick was born on December 22, 1916 and lived his childhood years in Lemmon, South Dakota. When he was about ten years old, Dick recalled &quot;radio was just coming into use in the mid twenties after the first station, <TextLink href="https://en.wikipedia.org/wiki/KDKA_(AM)">KDKA</TextLink>  in Pittsburgh went on the air in 1920. There was a fellow in Lemmon who had two windmill towers in the yard. He may have been a ham radio operator. I recall going with my family and parking the car near his house. He would put an old horn speaker out the window so people could hear the music from the radio! That really turned me on to radio; I read everything I could find about it.&quot;
          </p>
          <p>
            &quot;A few years later, our neighbors, the Wards, got a big console radio and she turned that thing loud enough to hear all over the block. We had an old 3 tube radio that an uncle gave to me. My cousin and I decided we could send code back and forth somehow; so we used a Model T spark coil tied to a long piece of wire for an antenna. When I pressed the key down it made Mrs. Ward&apos;s radio jump off the floor, so that didn&apos;t last, but my interest in radio continued.&quot;
          </p>
          <p>
            &quot;At first I built crystal sets and then radios with tubes. The problem with tube radios is that they needed batteries. We could go out to the car and borrow the battery to light the tube filaments, but they still needed a higher voltage &quot;B&quot; battery. Batteries cost about $4.00 and didn&apos;t last very long. One day I got a bright idea and invented a &quot;B&quot; battery eliminator out of junk parts I had acquired. A Model T Ford coil, a door-bell transformer and an audio transformer out of an old radio; and one tube. I plugged this into the wall outlet and it worked! We used it for a long time. When AC/DC radios came on the market they were using the same basic idea! I guess it just proves that necessity is the mother of invention.&quot;
          </p>
          <p>
            &quot;After my sophomore year in high school we moved to Fargo, North Dakota. In those days many people were experimenting and building their own radio equipment, mostly AM band receivers. Because of the interest, the local Woolworth store carried some radio parts. One day while shopping for parts, Dick had to explain to the woman sales clerk the difference between a &quot;male&quot; and &quot;female&quot; connector!
          </p>
          <p>
            &quot;There was an older ham, W9BTJ who lived just down the street. I got to know him and he really piqued my interest in amateur radio. I got a neighborhood friend, Bob Gordon, interested in studying the Morse code so we could get our amateur radio licenses. We practiced a half hour after school every day for a couple of months. To get your license you had to pass a written test and a 10 WPM CW test administered by a licensed amateur who held a higher class license. My first license was a &quot;C&quot; license, meaning it was administered through the mail by a local ham who had a &quot;B&quot; class license. It took two months to receive a reply indicating you either passed or failed.&quot;
          </p>
          <p>
            &quot;I took my exam first and got my license issued by the Federal Radio Commission (FRC) on June 14, 1934. This was about the same time the Federal Communications Commission (FCC) came into existence and replaced the FRC. The FCC reissued all licenses, so in 1934, I actually received two separate amateur radio licenses from two different federal agencies. My first call sign was W9SAW. Bob Gordon passed his test later and received his call, W9UED.&quot;
          </p>
          <p>
            &quot;An old ARRL Handbook provided me with enough information to build a basic ham station. It consisted of a two tube regenerative receiver and a single tube, crystal controlled 40 meter CW transmitter with about 25 watts output. The whole thing was powered with parts taken from a junked receiver. I also built a home brew CW &quot;bug&quot; made out of a small piece of corset stay as the spring and a long threaded bolt mounted on a piece of pine wood. My first contact was with W9JO near Chicago.&quot;
          </p>
          <p>
            &quot;In those days, when you called CQ, you listened around the band for an answer. Since there was no side tone oscillator, you couldn&apos;t hear your own signal, just some loud thumps. Most hams had crystal controlled rigs, so you weren&apos;t necessarily on the exact same frequency, just somewhere close. It was always a thrill to hear a station come back to a CQ or answer your call to him. One early morning I heard a ZL (New Zealand) calling CQ on 40 meters. I gave him a call and was thrilled when he answered me! About two months later I received a QSL from him, which I showed my friends who hadn&apos;t believed me.&quot;
          </p>
          <p>
            &quot;A ham friend&apos;s father owned a tombstone engraving business and ordered a large quartz crystal from Brazil for us. We made a gem cutting saw to cut the crystal into thin slices. I bought a small, 50 cent micrometer to measure the thickness of the crystals. We got good enough at cutting, we could cut crystals for the 80 meter band. If the crystal wasn&apos;t on the exact frequency you wanted, we would hand grind them with polishing compound on a piece of glass to get them to the exact frequency.&quot;
          </p>
          <p>
            &quot;I graduated from Fargo High School in June of 1935. This was during the Depression and two weeks later I joined the Civilian Conservation Corps (CCC). I was stationed as a radio operator at a new camp in Larimore, ND. Most camps were manned with an amateur radio operator and we communicated with the CCC headquarters at Ft. Lincoln. They furnished a crystal to get on their frequency, which was close to the 80 meter ham band. They also furnished a CW &quot;bug&quot;. I had to furnish my own ham radio equipment&quot;.
          </p>
          <p>
            After leaving the CCC, Dick worked at several other jobs including being an elevator boy in the eight story Black Building in downtown Fargo. The singer <TextLink href="https://en.wikipedia.org/wiki/Peggy_Lee">Peggy Lee</TextLink>  was a frequent visitor to the building and Dick&apos;s steady hand would see her safely to her floor.
          </p>
          <p>
            &quot;Word came that Northwest Airlines was looking for radio operators. Bob Gordon and I went out and visited with the manager and found out the main requirement was a Commercial Radio Operator&apos;s License. We sent for a book and studied. In about two months, Bob and I drove to St. Paul and took our tests at the FCC office. In a short time we got our licenses, but jobs weren&apos;t all that easy to come by. A lot of writing and calling got frustrating&quot;.
          </p>
          <p>
            The famous aviator Amelia Earhart vanished in the Pacific in July of 1937 on an around the world flight. At that time, Dick had a regular CW schedule with a ham in Hawaii who kept him informed of the daily search operations for Amelia. Through amateur radio, Dick had the latest news directly from someone close to the search location.
          </p>
          <p>
            &quot;Late in January 1938, I decided to go to the Port Arthur Radio School in Texas. Maybe I could get a higher class license and get a better job working on a ship or at a radio station.&quot; With his high school ham friend, Bob Gordon, they drove a 1932 Essex to Port Arthur. &quot;Shortly after starting school, I received a registered letter from my folks with $30 cash for a train ticket and a telegram from Northwest wanting to know if I still wanted to work. I sent them a telegram and was on the Kansas City Southern RR for St. Paul the next morning.&quot;
          </p>
          <p>
            Dick started working for Northwest Airlines in February 1938 and after initial training was transferred to Helena. &quot;I stayed at a nice family boarding house on south Rodney Street close to downtown for $47.00 a month, which included washing and ironing my white uniform shirts. I didn&apos;t have a car and had to walk the three miles out to the airport so I saved up and made a down payment on a 1934 Chevrolet coupe. Later I was transferred to Fargo where I could live at home and also help my parents.&quot;
          </p>
          <p>
            &quot;One day a bulletin came from headquarters announcing that they were going to convert all the transmitters so we could switch from AM voice to CW for handling reservation traffic. This meant everyone had to get a radiotelegraph license. Back to the books again. Code was no problem, just a matter of passing a written test. I passed my test first so that I could also get the day shift, even though I was the junior member of the Northwest station staff.&quot;
          </p>
          <p>
            Dick continued to operate his ham station from each location he was transferred to with Northwest Airlines including Billings, MT; Bismark and Fargo, ND, Rochester, MN and Spokane, WA. After World War II started Amateurs were ordered to disassemble their stations and remain off the air. In 1946, they were allowed back on the air but Dick&apos;s license had expired. He had to take the FCC exams again and received his new call sign, W9GJR which he hated. He applied for a new call and got W7SAW.
          </p>
          <p>
            After the war, there as a lot of surplus military radio equipment available for very reasonable prices. Many articles on how to convert surplus equipment to the amateur band could be found in QST, CQ and other ham publications of the day. Surplus military transmitters were variable frequency oscillator (VFO) controlled and would operate either AM, FM or CW with approximately 55 watts of output power. This equipment worked great until television came along in the 50&apos;s and RFI began to haunt most amateurs. The military equipment put out numerous harmonics which weren&apos;t a problem until TV began using frequencies where those harmonics fell.
          </p>
          <p>
            This lead to the dawn of the manufacture of commercial equipment for the amateur, many in kit form. Amateur equipment became readily available from suppliers including Allied Radio, Knight Kit and Heathkit. Dick build several Heathkit radios, including an HW-101, a 100-watt transceiver.
          </p>
          <p>
            Dick got his Extra Class license in the early 1980&apos;s and took his 20 WPM CW test with a typewriter! The FCC examiner was surprised anyone would show up to take their test with a typewriter, which was allowed. She gave Dick his test alone with headphones so the typing wouldn&apos;t bother anyone else taking the CW exam. Dick was a good typist from his years at Northwest and says &quot;at 20 WPM, CW may seem fast, but typing at 20 WPM is slow.&quot;
          </p>
          <p>
            Dick was always willing to help anyone entering the hobby. During his life, he instructed and mentored many amateurs to receive their licenses. He was also open to the changes amateur radio has brought. He was the first Amateur in Helena to get his Volunteer Examiner certification in the early 80&apos;s and gave VE exams for many years. He was one of the first in Helena to become active in the PSK31 and encouraged others to join the exciting new communication mode.
          </p>
          <p>
            He served as the CCARC newsletter editor for many years. His newsletters always included a cartoon of a matronly lady &quot;Aunt Ida&quot; who always had a humorous opinion or word of wisdom. Aunt Ida&apos;s caricature resembled one of Dick&apos;s aunts.
          </p>
          <p>
            Dick&apos;s interest in radio lead him to a successful career with Northwest Airlines and a very enjoyable life long hobby. Upon his retirement, Dick was the Manager of the Northwest Airlines operation here in Helena.
          </p>
          <p>
            Dick served as a role model and inspiration to many amateurs who knew him. He always had a positive outlook on life, never complained or criticizes and always had a word of praise or encouragement for others, especially those new amateurs.
          </p>
          <p>The world needs more amateurs like Dick Beaton, N7RB.</p>
        </div>
      </div>
    </article>
  );
}

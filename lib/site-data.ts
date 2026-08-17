export const SITE = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.n7rb.org").replace(/\/$/, ""),
  name: "Capital City Amateur Radio Club",
  shortName: "CCARC",
  callsign: "N7RB",
  city: "Helena, Montana",
  nonprofitStatus: "501(c)(3) nonprofit organization",
  mission: "Our mission is to make amateur radio accessible in Helena and Lewis and Clark County through education, license testing, mentoring, emergency communications training, and volunteer community service.",
  meetingAddress: "Salvation Army church, 1905 Henderson St., Helena, MT",
  repeater: "147.22+",
  repeaterTone: "100.0 Hz",
  backupSimplex: "147.50 MHz",
} as const;

export const CLASS_SIGNUP_URL = "/classes#class-signup-form";
export const TESTING_REGISTRATION_URL = "https://hamstudy.org/sessions/59601/inperson";
export const MEMBERSHIP_FORM_URL = "/join-contact/membership-application";
export const ONLINE_MEETING_URL = "https://meet.google.com/zfs-ctwp-bax";
export const CONTACT_EMAIL = "mailto:membership@ccarc-info.org?subject=CCARC%20Website%20Inquiry";
export const N7RB_HISTORY_URL = "/about/n7rb-bio";
export const TREASURER_EMAIL = "al@simonshome.org";
export const MEMBERSHIP_APPLICATION_PDF_URL = "/membership_application.pdf";
export const NEWSLETTER_ARCHIVE_URL = "https://drive.google.com/drive/folders/1kHy8ILAoDxdaguP4rmM0f1W6D3c4IK0l?usp=drive_link";
export const PICNIC_MAP_URL = "https://maps.app.goo.gl/Vi3ERZ3qc8rMMzF76";
export const JFK_PARK_MAP_URL = "https://www.google.com/maps/search/?api=1&query=JFK+Park%2C+309+Harrison+Ave+N%2C+East+Helena%2C+MT+59635";
export const CLASS_LOCATION_MAP_URL = "https://www.google.com/maps/search/?api=1&query=Salvation+Army%2C+1905+Henderson+St%2C+Helena%2C+MT+59601";
// Slack invite links expire and should be refreshed as needed.
export const SLACK_INVITE_URL = "https://join.slack.com/t/ccarcslack/shared_invite/zt-3k0ieygwx-rBeNphjqJ1EqnyYieSfmUg";
export const FACEBOOK_URL = "https://www.facebook.com/CCARCHelena/";
// Search by the 2026–2030 sixth-edition ISBN so students do not buy the expired fifth edition.
export const AMAZON_TECHNICIAN_MANUAL_URL = "https://www.amazon.com/s?k=9781625952934";
export const ARRL_TECHNICIAN_MANUAL_URL = "https://home.arrl.org/action/Store/Product-Details/productId/2097393415";
export const HAMSTUDY_URL = "https://hamstudy.org";

export const LINKS = {
  CLASS_SIGNUP_URL,
  TESTING_REGISTRATION_URL,
  MEMBERSHIP_FORM_URL,
  ONLINE_MEETING_URL,
  CONTACT_EMAIL,
  N7RB_HISTORY_URL,
  TREASURER_EMAIL,
  MEMBERSHIP_APPLICATION_PDF_URL,
  NEWSLETTER_ARCHIVE_URL,
  SLACK_INVITE_URL,
  FACEBOOK_URL,
  AMAZON_TECHNICIAN_MANUAL_URL,
  ARRL_TECHNICIAN_MANUAL_URL,
  HAMSTUDY_URL,
  PICNIC_MAP_URL,
  JFK_PARK_MAP_URL,
  CLASS_LOCATION_MAP_URL,
} as const;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/get-licensed", label: "Get Licensed" },
  { href: "/classes", label: "Classes" },
  { href: "/testing", label: "Testing" },
  { href: "/meetings-nets", label: "Meetings & Nets" },
  { href: "/news", label: "News & Updates" },
  { href: "/about", label: "About CCARC" },
  {
    href: "/ares",
    label: "ARES/LCARES",
    children: [
      { href: "/ares/ares-training", label: "ARES Training" },
      { href: "/ares/field-operations-guides", label: "Field Operations Guides" },
    ],
  },
  { href: "/join-contact", label: "Join / Contact" },
] as const;

export const amateurRadioCards = [
  {
    title: "Emergency Communications",
    text: "Help neighbors stay connected when phones, power, or internet are disrupted.",
    image: "/amateur-radio/emergency-communication.webp",
    imageAlt: "Volunteer radio operator with emergency communications equipment",
  },
  {
    title: "Outdoor Adventure",
    text: "Use lightweight radios on trails, summits, parks, and public lands.",
    image: "/amateur-radio/outdoor-adventure.webp",
    imageAlt: "Hiker using a handheld radio in the mountains",
  },
  {
    title: "Talk Around the World",
    text: "Make contacts across Montana, the country, and the globe.",
    image: "/amateur-radio/talk-around-the-world.webp",
    imageAlt: "Amateur radio operator at a radio desk with global contact equipment",
  },
  {
    title: "Digital Technology",
    text: "Explore modern wireless data, satellites, weak-signal modes, and software-defined radio.",
    image: "/amateur-radio/digital-technology.webp",
    imageAlt: "Laptop and radio equipment used for digital amateur radio modes",
  },
  {
    title: "Community Service",
    text: "Support events, public safety partners, and community preparedness.",
    image: "/amateur-radio/community-service.webp",
    imageAlt: "Volunteer radio operators supporting a community event",
  },
  {
    title: "Build and Experiment",
    text: "Learn antennas, electronics, propagation, and practical problem solving.",
    image: "/amateur-radio/build-and-experiment.webp",
    imageAlt: "Electronics workbench with circuit board and soldering tools",
  },
] as const;

type WhatWeDoReference = { label: string; href: string; description?: string };

type WhatWeDoItem = {
  title: string;
  text: string;
  references: WhatWeDoReference[];
  video?: { youtubeId: string; title: string };
};

export const whatWeDo: WhatWeDoItem[] = [
  {
    title: "Mentoring New Hams",
    text: "Friendly help choosing gear, making first contacts, and learning local radio habits.",
    references: [],
  },
  {
    title: "POTA and SOTA",
    text: "Portable operating from parks and summits for people who like radio with fresh air.",
    references: [
      { label: "Parks on the Air", href: "https://parksontheair.com/" },
      { label: "Summits on the Air", href: "https://www.sota.org.uk/" },
    ],
  },
  {
    title: "Emergency Communications",
    text: "Training and practice for useful communications when normal systems are unavailable.",
    references: [{ label: "ARRL ARES", href: "https://www.arrl.org/ares" }],
  },
  {
    title: "Local Event Support",
    text: "Provide radio communication support for Helena-area races and endurance events throughout the year.",
    references: [
      { label: "Elkhorn Endurance Runs", href: "https://hurlelkhorn.com/" },
      { label: "Governor's Cup", href: "https://govcupmt.com/" },
      { label: "Just for the Helena of It", href: "https://www.runhelena.com/" },
      { label: "Don't Fence Me In", href: "https://pricklypearlt.org/explore/dfmi/" },
    ],
  },
  {
    title: "Repeaters",
    text: "Local infrastructure that helps handheld and mobile radios cover the Helena area.",
    references: [],
  },
  {
    title: "Digital Modes",
    text: "Computer-assisted radio tools for messaging, long-distance contacts, and experimentation.",
    references: [],
  },
  {
    title: "Field Day",
    text: "A yearly hands-on operating event that combines radio skills, public outreach, and emergency readiness.",
    references: [
      { label: "ARRL Field Day", href: "https://www.arrl.org/Field-Day" },
      {
        label: "2021 Balloon Launch",
        href: "https://sites.google.com/view/ccarcfieldday2021/home",
        description: "During this Field Day event the club launched an amateur radio balloon that rose to over 115,000 feet. Click the link for more information about the project.",
      },
    ],
    video: {
      youtubeId: "OxHCNbb3Nq0",
      title: "CCARC 2021 Field Day High-Altitude Balloon Launch",
    },
  },
];

export const newsletters = [
  { title: "August 2026", date: "2026-08-01", description: "Club news, upcoming events, operating updates, and contributions from CCARC members.", href: "/newsletters/newsletter-2026-08.pdf", year: "2026", month: "August" },
  { title: "July 2026", date: "2026-07-01", description: "Club news, upcoming events, operating updates, and contributions from CCARC members.", href: "/newsletters/newsletter-2026-07.pdf", year: "2026", month: "July" },
  { title: "May 2026", date: "2026-05-01", description: "Club news, upcoming events, operating updates, and contributions from CCARC members.", href: "/newsletters/newsletter-2026-05.pdf", year: "2026", month: "May" },
  { title: "April 2026", date: "2026-04-01", description: "Club news, upcoming events, operating updates, and contributions from CCARC members.", href: "/newsletters/newsletter-2026-04.pdf", year: "2026", month: "April" },
  { title: "March 2026", date: "2026-03-01", description: "Club news, upcoming events, operating updates, and contributions from CCARC members.", href: "/newsletters/newsletter-2026-03.pdf", year: "2026", month: "March" },
  { title: "February 2026", date: "2026-02-01", description: "Club news, upcoming events, operating updates, and contributions from CCARC members.", href: "/newsletters/newsletter-2026-02.pdf", year: "2026", month: "February" },
  { title: "January 2026", date: "2026-01-01", description: "Club news, upcoming events, operating updates, and contributions from CCARC members.", href: "/newsletters/newsletter-2026-01.pdf", year: "2026", month: "January" },
  { title: "December 2025", date: "2025-12-01", description: "Club news, upcoming events, operating updates, and contributions from CCARC members.", href: "/newsletters/newsletter-2025-12.pdf", year: "2025", month: "December" },
  { title: "November 2025", date: "2025-11-01", description: "Club news, upcoming events, operating updates, and contributions from CCARC members.", href: "/newsletters/newsletter-2025-11.pdf", year: "2025", month: "November" },
  { title: "October 2025", date: "2025-10-01", description: "Club news, upcoming events, operating updates, and contributions from CCARC members.", href: "/newsletters/newsletter-2025-10.pdf", year: "2025", month: "October" },
  { title: "September 2025", date: "2025-09-01", description: "Club news, upcoming events, operating updates, and contributions from CCARC members.", href: "/newsletters/newsletter-2025-09.pdf", year: "2025", month: "September" },
  { title: "August 2025", date: "2025-08-01", description: "Club news, upcoming events, operating updates, and contributions from CCARC members.", href: "/newsletters/newsletter-2025-08.pdf", year: "2025", month: "August" },
  { title: "July 2025", date: "2025-07-01", description: "Club news, upcoming events, operating updates, and contributions from CCARC members.", href: "/newsletters/newsletter-2025-07.pdf", year: "2025", month: "July" },
  { title: "June 2025", date: "2025-06-01", description: "Club news, upcoming events, operating updates, and contributions from CCARC members.", href: "/newsletters/newsletter-2025-06.pdf", year: "2025", month: "June" },
  { title: "May 2025", date: "2025-05-01", description: "Club news, upcoming events, operating updates, and contributions from CCARC members.", href: "/newsletters/newsletter-2025-05.pdf", year: "2025", month: "May" },
] as const;

export const newsletterArchiveFolders = [
  {
    year: "2025",
    href: "https://drive.google.com/drive/folders/1kHy8ILAoDxdaguP4rmM0f1W6D3c4IK0l?usp=drive_link",
  },
  {
    year: "2024",
    href: "https://drive.google.com/drive/folders/1RqKktFHfwZhEgYT8U-PGhFsrdgQqJBp3?usp=drive_link",
  },
  {
    year: "2023",
    href: "https://drive.google.com/drive/folders/1j5oOK7xjob5QYovBSnp7Fph3hJRpMwdd?usp=drive_link",
  },
] as const;

export const nets = [
  { name: "Tuesday ARES Net", time: "7:30 PM", frequency: "147.22+ repeater" },
  { name: "Saturday Coffee Net", time: "9:00 AM", frequency: "147.22+ repeater" },
  { name: "Sunday Trivia Net", time: "7:30 PM", frequency: "147.22+ repeater" },
] as const;

export const licenseLevels = [
  {
    name: "Technician",
    summary: "The best starting point for most new hams. It opens local repeaters, handheld radios, emergency communications practice, and many VHF/UHF activities.",
  },
  {
    name: "General",
    summary: "Adds broad HF privileges so you can make more long-distance contacts across the country and around the world.",
  },
  {
    name: "Amateur Extra",
    summary: "The highest class, with full amateur privileges and a deeper pool of radio theory, rules, and operating knowledge.",
  },
] as const;

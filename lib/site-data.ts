export const SITE = {
  name: "Capital City Amateur Radio Club",
  shortName: "CCARC",
  callsign: "N7RB",
  city: "Helena, Montana",
  meetingAddress: "Salvation Army church, 1905 Henderson St., Helena, MT",
  repeater: "147.22+",
  repeaterTone: "100.0 Hz",
  backupSimplex: "147.50 MHz",
} as const;

// TODO: Replace these placeholder constants with live CCARC URLs and contact details.
export const CLASS_SIGNUP_URL = "/classes#class-signup";
export const TESTING_REGISTRATION_URL = "https://hamstudy.org/sessions/59601/inperson";
export const MEMBERSHIP_FORM_URL = "/join-contact/membership-application";
export const ONLINE_MEETING_URL = "https://meet.google.com/zfs-ctwp-bax";
export const CONTACT_EMAIL = "mailto:CONTACT_EMAIL";
export const N7RB_HISTORY_URL = "https://n7rb.org/why-n7rb/";
export const TREASURER_EMAIL = "al@simonshome.org";
export const MEMBERSHIP_APPLICATION_PDF_URL = "/membership_application.pdf";
// TODO: Renew this expiring Slack invite URL monthly.
export const SLACK_INVITE_URL = "https://join.slack.com/t/ccarcslack/shared_invite/zt-3k0ieygwx-rBeNphjqJ1EqnyYieSfmUg";

export const LINKS = {
  CLASS_SIGNUP_URL,
  TESTING_REGISTRATION_URL,
  MEMBERSHIP_FORM_URL,
  ONLINE_MEETING_URL,
  CONTACT_EMAIL,
  N7RB_HISTORY_URL,
  TREASURER_EMAIL,
  MEMBERSHIP_APPLICATION_PDF_URL,
  SLACK_INVITE_URL,
} as const;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/get-licensed", label: "Get Licensed" },
  { href: "/classes", label: "Classes" },
  { href: "/testing", label: "Testing" },
  { href: "/meetings-nets", label: "Meetings & Nets" },
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
    title: "Emergency Communication",
    text: "Help neighbors stay connected when phones, power, or internet are disrupted.",
    image: "/amateur-radio/emergency-communication.webp",
    imageAlt: "Volunteer radio operator with emergency communication equipment",
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

export const whatWeDo = [
  {
    title: "Field Day",
    text: "A yearly hands-on operating event that combines radio skills, public outreach, and emergency readiness.",
    references: [
      { label: "Facebook Event", href: "https://www.facebook.com/share/14eDkjzrqRU/" },
      { label: "ARRL Field Day", href: "https://www.arrl.org/Field-Day" },
    ],
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
    title: "Mentoring New Hams",
    text: "Friendly help choosing gear, making first contacts, and learning local radio habits.",
    references: [],
  },
] as const;

export const newsletters = [
  { title: "May 2026", href: "/newsletters/newsletter-2026-05.pdf", year: "2026", month: "May" },
  { title: "April 2026", href: "/newsletters/newsletter-2026-04.pdf", year: "2026", month: "April" },
  { title: "March 2026", href: "/newsletters/newsletter-2026-03.pdf", year: "2026", month: "March" },
  { title: "February 2026", href: "/newsletters/newsletter-2026-02.pdf", year: "2026", month: "February" },
  { title: "January 2026", href: "/newsletters/newsletter-2026-01.pdf", year: "2026", month: "January" },
  { title: "December 2025", href: "/newsletters/newsletter-2025-12.pdf", year: "2025", month: "December" },
  { title: "November 2025", href: "/newsletters/newsletter-2025-11.pdf", year: "2025", month: "November" },
  { title: "October 2025", href: "/newsletters/newsletter-2025-10.pdf", year: "2025", month: "October" },
  { title: "September 2025", href: "/newsletters/newsletter-2025-09.pdf", year: "2025", month: "September" },
  { title: "August 2025", href: "/newsletters/newsletter-2025-08.pdf", year: "2025", month: "August" },
  { title: "July 2025", href: "/newsletters/newsletter-2025-07.pdf", year: "2025", month: "July" },
  { title: "June 2025", href: "/newsletters/newsletter-2025-06.pdf", year: "2025", month: "June" },
  { title: "May 2025", href: "/newsletters/newsletter-2025-05.pdf", year: "2025", month: "May" },
] as const;

export const nets = [
  { name: "Tuesday ARES Net", time: "7:30 PM", frequency: "147.22+ repeater" },
  { name: "Saturday Coffee Net", time: "9:00 AM", frequency: "147.22+ repeater" },
  { name: "Sunday Trivia Net", time: "7:30 PM", frequency: "147.22+ repeater" },
] as const;

export const licenseLevels = [
  {
    name: "Technician",
    summary: "The best starting point for most new hams. It opens local repeaters, handheld radios, emergency communication practice, and many VHF/UHF activities.",
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

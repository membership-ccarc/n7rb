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
export const TECHNICIAN_CLASSROOM_URL = "#technician-google-classroom";
export const GENERAL_CLASSROOM_URL = "#general-google-classroom";
export const TESTING_REGISTRATION_URL = "#testing-registration";
export const MEMBERSHIP_FORM_URL = "/join-contact/membership-application";
export const ONLINE_MEETING_URL = "https://meet.google.com/zfs-ctwp-bax";
export const CONTACT_EMAIL = "mailto:CONTACT_EMAIL";
export const N7RB_HISTORY_URL = "https://n7rb.org/why-n7rb/";
export const TREASURER_EMAIL = "al@simonshome.org";
export const MEMBERSHIP_APPLICATION_PDF_URL = "/membership_application.pdf";

export const LINKS = {
  TECHNICIAN_CLASSROOM_URL,
  GENERAL_CLASSROOM_URL,
  TESTING_REGISTRATION_URL,
  MEMBERSHIP_FORM_URL,
  ONLINE_MEETING_URL,
  CONTACT_EMAIL,
  N7RB_HISTORY_URL,
  TREASURER_EMAIL,
  MEMBERSHIP_APPLICATION_PDF_URL,
} as const;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/get-licensed", label: "Get Licensed" },
  { href: "/classes", label: "Classes" },
  { href: "/testing", label: "Testing" },
  { href: "/meetings-nets", label: "Meetings & Nets" },
  { href: "/about", label: "About CCARC" },
  { href: "/join-contact", label: "Join / Contact" },
] as const;

export const amateurRadioCards = [
  ["Emergency Communication", "Help neighbors stay connected when phones, power, or internet are disrupted."],
  ["Outdoor Adventure", "Use lightweight radios on trails, summits, parks, and public lands."],
  ["Talk Around the World", "Make contacts across Montana, the country, and the globe."],
  ["Digital Technology", "Explore modern wireless data, satellites, weak-signal modes, and software-defined radio."],
  ["Community Service", "Support events, public safety partners, and community preparedness."],
  ["Build and Experiment", "Learn antennas, electronics, propagation, and practical problem solving."],
] as const;

export const whatWeDo = [
  ["Field Day", "A yearly hands-on operating event that combines radio skills, public outreach, and emergency readiness."],
  ["POTA and SOTA", "Portable operating from parks and summits for people who like radio with fresh air."],
  ["Emergency Communications", "Training and practice for useful communications when normal systems are unavailable."],
  ["Repeaters", "Local infrastructure that helps handheld and mobile radios cover the Helena area."],
  ["Digital Modes", "Computer-assisted radio tools for messaging, long-distance contacts, and experimentation."],
  ["Mentoring New Hams", "Friendly help choosing gear, making first contacts, and learning local radio habits."],
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

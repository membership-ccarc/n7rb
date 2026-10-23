// schema.org JSON-LD builders. These describe the club in machine-readable form
// for search engines and AI answer engines; keep them in sync with visible page content.
import type { ExamSession } from "@/lib/exam-sessions";
import { CONTACT_EMAIL_ADDRESS, EXAM_FEE_USD, LINKS, PLACES, SITE } from "@/lib/site-data";

const ORGANIZATION_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;
const TIME_ZONE = "America/Denver";

type Place = (typeof PLACES)[keyof typeof PLACES];

function placeSchema(place: Place) {
  return {
    "@type": "Place",
    name: place.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: place.streetAddress,
      addressLocality: "Helena",
      addressRegion: "MT",
      postalCode: place.postalCode,
      addressCountry: "US",
    },
  };
}

// UTC offset for a Helena calendar date, e.g. "-06:00" in summer and "-07:00" in winter.
function denverOffset(date: string) {
  const name = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, timeZoneName: "longOffset" })
    .formatToParts(new Date(`${date}T12:00:00Z`))
    .find((part) => part.type === "timeZoneName")?.value;
  return name?.replace("GMT", "") || "-07:00";
}

const organizationRef = { "@id": ORGANIZATION_ID };

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": ORGANIZATION_ID,
  name: SITE.name,
  legalName: "Capital City Amateur Radio Club Inc.",
  alternateName: [SITE.shortName, SITE.callsign],
  url: SITE.url,
  logo: `${SITE.url}/CCARC_firetower_logo_v2.png`,
  image: `${SITE.url}/CCARC_firetower.png`,
  description: SITE.mission,
  email: CONTACT_EMAIL_ADDRESS,
  nonprofitStatus: "Nonprofit501c3",
  taxID: "81-0506653",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Helena",
    addressRegion: "MT",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Helena, Montana" },
    { "@type": "AdministrativeArea", name: "Lewis and Clark County, Montana" },
  ],
  knowsAbout: [
    "Amateur radio",
    "Ham radio licensing",
    "FCC amateur radio exams",
    "Emergency communications",
    "ARES",
  ],
  sameAs: [LINKS.FACEBOOK_URL],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: SITE.name,
  alternateName: `${SITE.shortName} ${SITE.callsign}`,
  url: SITE.url,
  publisher: organizationRef,
  inLanguage: "en-US",
};

const pad = (n: number) => String(n).padStart(2, "0");

// First Monday of the month, pushed a week when it falls on New Year's Day, July 4, or Labor Day.
function firstNonHolidayMonday(year: number, month: number) {
  const firstWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  let day = 1 + ((8 - firstWeekday) % 7);
  if (month === 9 || (month === 1 && day === 1) || (month === 7 && day === 4)) day += 7;
  return `${year}-${pad(month)}-${pad(day)}`;
}

// Next monthly meeting date (YYYY-MM-DD) on or after today in Helena.
function nextMeetingDate(now: Date) {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE }).format(now);
  let [year, month] = today.split("-").map(Number);
  for (;;) {
    const date = firstNonHolidayMonday(year, month);
    if (date >= today) return date;
    if (++month > 12) {
      month = 1;
      year++;
    }
  }
}

export function monthlyMeetingSchema(now = new Date()) {
  const date = nextMeetingDate(now);
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${SITE.shortName} Monthly Club Meeting`,
    description:
      "Monthly meeting of the Capital City Amateur Radio Club, held the first non-holiday Monday of each month. Visitors and newcomers are welcome, in person or online.",
    startDate: `${date}T19:00:00${denverOffset(date)}`,
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    eventSchedule: {
      "@type": "Schedule",
      repeatFrequency: "P1M",
      byDay: "https://schema.org/Monday",
      byMonthWeek: 1,
      startTime: "19:00:00",
      scheduleTimezone: TIME_ZONE,
    },
    location: [placeSchema(PLACES.meeting), { "@type": "VirtualLocation", url: LINKS.ONLINE_MEETING_URL }],
    isAccessibleForFree: true,
    organizer: organizationRef,
    url: `${SITE.url}/meetings-nets`,
  };
}

export function examSessionSchema(session: ExamSession) {
  const offset = denverOffset(session.date);
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Amateur Radio License Exam Session (all license classes)",
    description:
      "In-person FCC amateur radio license exam session in Helena, Montana, run by Volunteer Examiners. Technician, General, and Amateur Extra exams available. Bring a photo ID and your FCC FRN.",
    startDate: `${session.date}T${session.startTime}:00${offset}`,
    endDate: `${session.date}T${session.endTime}:00${offset}`,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: placeSchema(PLACES.testing),
    organizer: organizationRef,
    offers: {
      "@type": "Offer",
      price: EXAM_FEE_USD,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: LINKS.TESTING_REGISTRATION_URL,
    },
    url: `${SITE.url}/testing`,
  };
}

export const courseSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Technician License Class",
    description:
      "Free six-week class in Helena, Montana that prepares beginners for the FCC Technician amateur radio license exam. Covers FCC rules, radio fundamentals, antennas and propagation, operating practices, emergency communications, station setup, and exam review. No experience required.",
    provider: organizationRef,
    educationalLevel: "Beginner",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", category: "Free", price: 0, priceCurrency: "USD" },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Onsite",
      location: placeSchema(PLACES.meeting),
    },
    url: `${SITE.url}/classes`,
  },
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "General License Class",
    description:
      "Class in Helena, Montana that helps licensed Technicians prepare for the FCC General amateur radio license exam and expand into HF and long-distance operating.",
    provider: organizationRef,
    educationalLevel: "Intermediate",
    coursePrerequisites: "FCC Technician amateur radio license",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Onsite",
      location: placeSchema(PLACES.meeting),
    },
    url: `${SITE.url}/classes`,
  },
];

export function faqSchema(items: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

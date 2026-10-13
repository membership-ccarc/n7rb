// Plain-text site summary for AI assistants and answer engines (https://llmstxt.org).
import { EXAM_FEE_USD, getUpcomingExamSessions, LINKS, nets, PLACES, SITE } from "@/lib/site-data";

export const revalidate = 3600;

function page(path: string, title: string, summary: string) {
  return `- [${title}](${SITE.url}${path}): ${summary}`;
}

export function GET() {
  const upcomingExams = getUpcomingExamSessions();
  const examLines =
    upcomingExams.length > 0
      ? upcomingExams.map((session) => `- ${session.label}`)
      : ["- Dates coming soon; see the Testing page for the next scheduled session."];

  const body = [
    `# ${SITE.name} (${SITE.shortName}, ${SITE.callsign})`,
    "",
    `> ${SITE.name} is a 501(c)(3) nonprofit amateur (ham) radio club in ${SITE.city}, serving Helena and Lewis and Clark County. The club offers free license classes, FCC license exams, mentoring for new operators, weekly on-air nets, and emergency communications (ARES) training.`,
    "",
    "## Key facts",
    "",
    `- Club callsign: ${SITE.callsign}`,
    `- Monthly meeting: first non-holiday Monday of each month at 7:00 PM, ${PLACES.meeting.name}, ${PLACES.meeting.streetAddress}, Helena, MT ${PLACES.meeting.postalCode}. Visitors welcome; an online Google Meet option is available.`,
    `- License classes: free Technician License Class (six weeks, no experience required; next class planned for Q1 2027, pre-enrollment open). General License Class for licensed Technicians.`,
    `- License exams: in-person Volunteer Examiner sessions about every 6 weeks at the ${PLACES.testing.name}, ${PLACES.testing.streetAddress}, Helena, MT. All license classes. Fee $${EXAM_FEE_USD}. Register at ${LINKS.TESTING_REGISTRATION_URL}`,
    `- Local repeater: Belmont repeater ${SITE.repeater}, ${SITE.repeaterTone} tone. Backup simplex ${SITE.backupSimplex}.`,
    `- Nets: ${nets.map((net) => `${net.name} at ${net.time} on the ${net.frequency}`).join("; ")}.`,
    "- Mentoring: the Ham-101 program pairs newly licensed operators with an experienced club mentor.",
    "- Nonprofit: Capital City Amateur Radio Club Inc., 501(c)(3), EIN 81-0506653.",
    `- Contact: ${SITE.url}/join-contact`,
    "",
    "## Upcoming exam sessions",
    "",
    ...examLines,
    "",
    "## Pages",
    "",
    page("/get-licensed", "Get Licensed", "How to get an amateur radio license in Helena, Montana, and the license levels."),
    page("/classes", "License Classes", "Free Technician class, General class, curriculum, Ham-101 mentorship, and class FAQ."),
    page("/testing", "Exam Testing", "In-person FCC license exam dates, fee, what to bring, and how to register."),
    page("/meetings-nets", "Meetings & Nets", "Monthly club meeting, weekly nets, coffee meetups, and repeater information."),
    page("/ares", "ARES / LCARES", "Lewis and Clark County Amateur Radio Emergency Service."),
    page("/ares/ares-training", "ARES Training", "Emergency communications training resources."),
    page("/news", "News & Updates", "Recent club news, events, and announcements."),
    page("/newsletter", "Newsletter", "Monthly club newsletter archive."),
    page("/about", "About CCARC", "Mission, officers, nonprofit registration, and history."),
    page("/about/n7rb-bio", "History of N7RB", "The story of Dick Beaton, N7RB, whose callsign the club carries."),
    page("/join-contact", "Join / Contact", "Sign up for club updates, contact the club, or apply for membership."),
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

import { EXAM_SESSIONS } from "@/lib/site-data";

// CCARC's team page on HamStudy. Its markup tags each session with a start time (ms since
// epoch) and duration (seconds), which is what we read here.
const HAMSTUDY_TEAM_SESSIONS_URL = "https://hamstudy.org/sessions/CCARC/all";
const TIME_ZONE = "America/Denver";

export type ExamSession = {
  date: string;
  startTime: string;
  endTime: string;
  label: string;
};

function denverParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  return Object.fromEntries(parts.map((part) => [part.type, part.value]));
}

function formatTime(date: Date, options: Intl.DateTimeFormatOptions = {}) {
  return new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, hour: "numeric", minute: "2-digit", ...options }).format(date);
}

// Matches the hand-written labels, e.g. "Wednesday, December 02, 2026, from 6:30-7:45 PM MST."
function toExamSession(start: Date, end: Date): ExamSession {
  const startParts = denverParts(start);
  const endParts = denverParts(end);
  const day = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "long",
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(start);
  const endLabel = formatTime(end, { timeZoneName: "short" });
  const samePeriod = formatTime(start).slice(-2) === formatTime(end).slice(-2);
  const startLabel = samePeriod ? formatTime(start).replace(/\s?[AP]M$/, "") : formatTime(start);

  return {
    date: `${startParts.year}-${startParts.month}-${startParts.day}`,
    startTime: `${startParts.hour}:${startParts.minute}`,
    endTime: `${endParts.hour}:${endParts.minute}`,
    label: `${day}, from ${startLabel}-${endLabel}.`,
  };
}

function parseHamStudySessions(html: string) {
  const sessions: ExamSession[] = [];
  for (const entry of html.split('class="schedule-team-entry"').slice(1)) {
    if (!entry.includes('data-teamId="CCARC"')) continue;
    for (const [, time, duration] of entry.matchAll(/data-time="(\d+)"\s+data-duration="(\d+)"/g)) {
      const start = new Date(Number(time));
      sessions.push(toExamSession(start, new Date(start.getTime() + Number(duration) * 1000)));
    }
  }
  return sessions;
}

// HamStudy sessions, refreshed weekly. Falls back to the hand-entered EXAM_SESSIONS if HamStudy
// is unreachable or its page no longer looks like a session schedule.
async function getExamSessions(): Promise<readonly ExamSession[]> {
  try {
    const response = await fetch(HAMSTUDY_TEAM_SESSIONS_URL, {
      headers: { "User-Agent": "n7rb.org exam schedule (weekly)" },
      next: { revalidate: 60 * 60 * 24 * 7 },
    });

    if (!response.ok) {
      return EXAM_SESSIONS;
    }

    const html = await response.text();
    if (!html.includes('class="schedule"')) {
      return EXAM_SESSIONS;
    }

    return parseHamStudySessions(html).sort((left, right) =>
      `${left.date}${left.startTime}`.localeCompare(`${right.date}${right.startTime}`),
    );
  } catch {
    return EXAM_SESSIONS;
  }
}

export async function getUpcomingExamSessions() {
  const sessions = await getExamSessions();
  return sessions.filter((session) => new Date(`${session.date}T23:59:59`) >= new Date());
}

const COFFEE_NET_SCHEDULE_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1ymezggbApFMEWt53lBnE0boo5Mbe_BaQBbWwAf7gT58/gviz/tq?tqx=out:csv";

export const COFFEE_NET_SCHEDULE_URL =
  "https://docs.google.com/spreadsheets/d/1ymezggbApFMEWt53lBnE0boo5Mbe_BaQBbWwAf7gT58/edit?usp=sharing";

export type CoffeeNetSlot = {
  date: string;
  displayDate: string;
  callsign: string;
  name: string;
  note?: string;
  status: "assigned" | "available" | "canceled";
};

export type CoffeeNetSchedule = {
  next?: CoffeeNetSlot;
  onDeck?: CoffeeNetSlot;
};

function parseCsvLine(line: string) {
  const values: string[] = [];
  let value = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    const nextCharacter = line[index + 1];

    if (character === '"' && inQuotes && nextCharacter === '"') {
      value += '"';
      index += 1;
      continue;
    }

    if (character === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (character === "," && !inQuotes) {
      values.push(value);
      value = "";
      continue;
    }

    value += character;
  }

  values.push(value);
  return values;
}

function parseCsv(csv: string) {
  const rows = csv
    .trim()
    .split(/\r?\n/)
    .map(parseCsvLine);
  const headers = rows[0] ?? [];

  return rows.slice(1).map((row) =>
    headers.reduce<Record<string, string>>((record, header, index) => {
      if (header) {
        record[header] = row[index] ?? "";
      }

      return record;
    }, {}),
  );
}

function parseScheduleDate(value: string) {
  const [month, day, shortYear] = value.split("-").map(Number);

  if (!month || !day || Number.isNaN(shortYear)) {
    return undefined;
  }

  return new Date(Date.UTC(2000 + shortYear, month - 1, day, 12));
}

function getMountainDate() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Denver",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const partMap = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return new Date(Date.UTC(Number(partMap.year), Number(partMap.month) - 1, Number(partMap.day), 0));
}

function formatDisplayDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

function getSlotStatus(callsign: string): CoffeeNetSlot["status"] {
  const normalizedCallsign = callsign.trim().toLowerCase();

  if (normalizedCallsign === "available") {
    return "available";
  }

  if (normalizedCallsign === "no net") {
    return "canceled";
  }

  return "assigned";
}

export async function getCoffeeNetSchedule(): Promise<CoffeeNetSchedule> {
  try {
    const response = await fetch(COFFEE_NET_SCHEDULE_CSV_URL, {
      next: { revalidate: 60 * 60 },
    });

    if (!response.ok) {
      return {};
    }

    const today = getMountainDate();
    const rows = parseCsv(await response.text());
    const upcoming = rows
      .map((row) => {
        const date = parseScheduleDate(row.Date ?? "");

        if (!date) {
          return undefined;
        }

        const callsign = (row["Net Control Op"] ?? "").trim();
        const name = (row.Name ?? "").trim();
        const note = Object.values(row)
          .slice(4)
          .find((value) => value.trim());

        const slot: CoffeeNetSlot = {
          date: date.toISOString(),
          displayDate: formatDisplayDate(date),
          callsign,
          name,
          note,
          status: getSlotStatus(callsign),
        };

        return slot;
      })
      .filter((slot): slot is CoffeeNetSlot => Boolean(slot))
      .filter((slot) => new Date(slot.date) >= today)
      .sort((left, right) => new Date(left.date).getTime() - new Date(right.date).getTime());

    return {
      next: upcoming[0],
      onDeck: upcoming[1],
    };
  } catch {
    return {};
  }
}

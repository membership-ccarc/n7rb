"use client";

import { useMemo, useState } from "react";
import { newsletters } from "@/lib/site-data";

export function NewsletterArchive() {
  const [query, setQuery] = useState("");
  const latest = newsletters[0];
  const previousNewsletters = newsletters.slice(1);
  const normalizedQuery = query.trim().toLowerCase();

  const filteredNewsletters = useMemo(() => {
    if (!normalizedQuery) {
      return previousNewsletters;
    }

    return previousNewsletters.filter((newsletter) =>
      `${newsletter.title} ${newsletter.month} ${newsletter.year}`.toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery, previousNewsletters]);

  return (
    <div className="mx-auto mt-10 grid max-w-7xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <article className="rounded-lg bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wide text-pine-700">Latest Edition</p>
        <h3 className="mt-3 text-2xl font-black text-mountain-900">{latest.title} Newsletter</h3>
        <p className="mt-3 leading-7 text-stonewarm-700">
          Read the latest CCARC newsletter for club updates, event notes, local radio activity, and member contributions.
        </p>
        <div className="mt-5">
          <a
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-pine-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-pine-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine-900"
            href={latest.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Latest Newsletter
          </a>
        </div>
      </article>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <label className="grid gap-2 font-bold text-mountain-900" htmlFor="newsletter-search">
          Search Previous Editions
          <input
            id="newsletter-search"
            className="min-h-11 rounded-md border border-stonewarm-100 px-3 py-2 font-normal text-mountain-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-pine-700"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by month or year"
          />
        </label>
        <ul className="mt-5 grid max-h-80 gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
          {filteredNewsletters.map((newsletter) => (
            <li key={newsletter.href}>
              <a
                className="block rounded-md border border-stonewarm-100 px-4 py-3 font-bold text-pine-700 hover:bg-stonewarm-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine-700"
                href={newsletter.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {newsletter.title}
              </a>
            </li>
          ))}
        </ul>
        {filteredNewsletters.length === 0 ? (
          <p className="mt-5 rounded-md bg-stonewarm-50 px-4 py-3 text-sm font-bold text-stonewarm-700">
            No newsletter editions match that search.
          </p>
        ) : null}
      </div>
    </div>
  );
}

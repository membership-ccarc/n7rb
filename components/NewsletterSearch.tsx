"use client";

import { useState } from "react";

// Filters the server-rendered newsletter list in place by toggling `hidden` on its items,
// so the list itself stays out of the client bundle.
export function NewsletterSearch({ listId }: { listId: string }) {
  const [noMatches, setNoMatches] = useState(false);

  function filter(value: string) {
    const query = value.trim().toLowerCase();
    let visible = 0;
    document.querySelectorAll<HTMLLIElement>(`#${listId} > li`).forEach((item) => {
      const match = !query || (item.dataset.search ?? "").includes(query);
      item.hidden = !match;
      if (match) visible++;
    });
    setNoMatches(visible === 0);
  }

  return (
    <>
      <label className="grid gap-2 font-bold text-mountain-900" htmlFor="newsletter-search">
        Search Previous Editions
        <input
          id="newsletter-search"
          className="min-h-11 rounded-md border border-stonewarm-100 px-3 py-2 font-normal text-mountain-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-pine-700"
          type="search"
          aria-controls={listId}
          onChange={(event) => filter(event.target.value)}
          placeholder="Search by month or year"
        />
      </label>
      {noMatches ? (
        <p className="order-last mt-5 rounded-md bg-stonewarm-50 px-4 py-3 text-sm font-bold text-stonewarm-700">
          No newsletter editions match that search.
        </p>
      ) : null}
    </>
  );
}

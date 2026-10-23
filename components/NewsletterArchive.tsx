import { NewsletterSearch } from "@/components/NewsletterSearch";
import { TrackedNewsletterLink } from "@/components/TrackedNewsletterLink";
import { newsletterArchiveFolders, newsletters } from "@/lib/site-data";

export function NewsletterArchive() {
  const latest = newsletters[0];
  const previousNewsletters = newsletters.slice(1);

  return (
    <div className="mx-auto mt-10 grid max-w-7xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <article className="rounded-lg bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wide text-pine-700">Latest Edition</p>
        <h3 className="mt-3 text-2xl font-black text-mountain-900">{latest.title} Newsletter</h3>
        <p className="mt-3 leading-7 text-stonewarm-700">
          Read the latest CCARC newsletter for club updates, event notes, local radio activity, and member contributions.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <TrackedNewsletterLink
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-pine-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-pine-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine-900"
            href={latest.href}
            newsletterTitle={latest.title}
            source="homepage-archive"
          >
            Read the Latest Newsletter
          </TrackedNewsletterLink>
        </div>
        <div className="mt-6">
          <p className="text-sm font-bold uppercase tracking-wide text-pine-700">Past Editions</p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {newsletterArchiveFolders.map((folder) => (
              <a
                key={folder.year}
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-bold text-mountain-900 shadow-sm ring-1 ring-stonewarm-100 transition hover:bg-stonewarm-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine-700"
                href={folder.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {folder.year}
              </a>
            ))}
          </div>
        </div>
      </article>

      <div className="flex flex-col rounded-lg bg-white p-6 shadow-sm">
        <NewsletterSearch listId="newsletter-list" />
        <ul id="newsletter-list" className="mt-5 grid max-h-80 gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
          {previousNewsletters.map((newsletter) => (
            <li key={newsletter.href} data-search={`${newsletter.title} ${newsletter.month} ${newsletter.year}`.toLowerCase()}>
              <TrackedNewsletterLink
                className="block rounded-md border border-stonewarm-100 px-4 py-3 font-bold text-pine-700 hover:bg-stonewarm-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine-700"
                href={newsletter.href}
                newsletterTitle={newsletter.title}
                source="homepage-archive"
              >
                {newsletter.title}
              </TrackedNewsletterLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

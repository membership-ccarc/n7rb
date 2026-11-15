import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

// Unlisted review page for the N7RB QRZ.com biography.
// Not in the nav or sitemap, and marked noindex. The single source of truth is
// qrz/n7rb-qrz-bio.html; this page reads it at build time.

export const metadata: Metadata = {
  title: "N7RB QRZ Bio Preview",
  description: "Review copy of the N7RB QRZ.com biography.",
  robots: { index: false, follow: false },
};

function loadBio() {
  const file = readFileSync(path.join(process.cwd(), "qrz", "n7rb-qrz-bio.html"), "utf8");
  const start = file.indexOf("<!-- ===================== BEGIN QRZ BIO");
  const end = file.indexOf("<!-- ====================== END QRZ BIO");
  const endLine = file.indexOf("\n", end);
  return file.slice(start, endLine === -1 ? undefined : endLine).trim();
}

export default function QrzPreviewPage() {
  const bio = loadBio();

  return (
    <article className="bg-stonewarm-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-pine-700">Draft for review</p>
        <h1 className="mt-2 text-3xl font-black text-mountain-900">N7RB QRZ.com Bio Preview</h1>
        <p className="mt-3 text-stonewarm-700">
          This is how the club call&apos;s QRZ.com biography will look. The HTML to paste into QRZ is at the bottom of
          this page.
        </p>

        <div className="mt-8 rounded-2xl border border-stonewarm-100 bg-white p-4 shadow-soft sm:p-6">
          <div dangerouslySetInnerHTML={{ __html: bio }} />
        </div>

        <h2 className="mt-12 text-xl font-black text-mountain-900">HTML for QRZ</h2>
        <p className="mt-2 text-sm text-stonewarm-700">
          On QRZ: Edit Page &rarr; Biography &rarr; switch the editor to HTML/source mode, paste everything below, and save.
          Click in the box and press Ctrl+A (Cmd+A on a Mac) to select it all.
        </p>
        <textarea
          readOnly
          aria-label="QRZ biography HTML"
          className="mt-3 h-64 w-full rounded-lg border border-stonewarm-100 bg-white p-3 font-mono text-xs text-stonewarm-700"
          value={bio}
        />
      </div>
    </article>
  );
}

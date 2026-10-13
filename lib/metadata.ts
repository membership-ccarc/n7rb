import type { Metadata } from "next";
import { SITE } from "@/lib/site-data";

// Next.js replaces (rather than merges) a parent's openGraph object, so every page's
// openGraph must carry these defaults or it loses the site name and preview image.
export const defaultOpenGraph = {
  siteName: `${SITE.name} (${SITE.callsign})`,
  type: "website",
  locale: "en_US",
  images: [
    {
      url: "/CCARC_firetower_favi.png",
      width: 842,
      height: 703,
      alt: "Capital City Amateur Radio Club logo",
    },
  ],
} satisfies Metadata["openGraph"];

type PageMetadataInput = {
  title: NonNullable<Metadata["title"]>;
  description: string;
  path: string;
  // Defaults to "<title> | CCARC Helena, Montana" and the page description.
  ogTitle?: string;
  ogDescription?: string;
};

export function pageMetadata({ title, description, path, ogTitle, ogDescription }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...defaultOpenGraph,
      title: ogTitle ?? `${typeof title === "string" ? title : SITE.name} | ${SITE.shortName} Helena, Montana`,
      description: ogDescription ?? description,
      url: path,
    },
  };
}

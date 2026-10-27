import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site-data";

// `updated` tells search and AI crawlers when a page last changed meaningfully.
// Bump it (YYYY-MM-DD) when you change a page's content.
const routes = [
  { path: "", updated: "2026-10-27" },
  { path: "/about", updated: "2026-08-13" },
  { path: "/about/n7rb-bio", updated: "2026-08-19" },
  { path: "/ares", updated: "2026-09-28" },
  { path: "/ares/ares-training", updated: "2026-07-21" },
  { path: "/ares/field-operations-guides", updated: "2026-07-21" },
  { path: "/classes", updated: "2026-10-27" },
  { path: "/get-licensed", updated: "2026-10-13" },
  { path: "/join-contact", updated: "2026-10-12" },
  { path: "/join-contact/membership-application", updated: "2026-10-08" },
  { path: "/meetings-nets", updated: "2026-10-13" },
  { path: "/news", updated: "2026-10-27" },
  { path: "/newsletter", updated: "2026-08-06" },
  { path: "/privacy", updated: "2026-08-12" },
  { path: "/testing", updated: "2026-10-13" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, updated }) => ({
    url: `${SITE.url}${path}`,
    lastModified: updated,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}

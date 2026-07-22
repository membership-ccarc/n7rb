import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site-data";

const routes = [
  "",
  "/about",
  "/ares",
  "/ares/ares-training",
  "/ares/field-operations-guides",
  "/classes",
  "/get-licensed",
  "/join-contact",
  "/join-contact/membership-application",
  "/meetings-nets",
  "/privacy",
  "/testing",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE.url}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}

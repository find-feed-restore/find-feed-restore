import type { MetadataRoute } from "next";

const productionOrigin = "https://www.findfeedrestore.com";

const canonicalRoutes = [
  "/",
  "/affordable-housing/",
  "/housing-first/",
  "/homelessness-avoidance/",
  "/care-coach-mobile-unit/",
  "/news-media/",
  "/testimonials/",
  "/contact-us/",
  "/board-staff/",
  "/sponsors/",
  "/live-here-love-here-lake/",
  "/we-need-trailers/",
  "/hope-in-action/",
  "/terms-conditions/",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return canonicalRoutes.map((route) => ({
    url: `${productionOrigin}${route}`,
  }));
}

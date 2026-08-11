import type { MetadataRoute } from "next";

const productionOrigin = "https://www.findfeedrestore.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${productionOrigin}/sitemap.xml`,
    host: productionOrigin,
  };
}

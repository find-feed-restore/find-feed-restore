import type { MetadataRoute } from "next";

const productionOrigin = "https://www.findfeedrestore.com";

export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV === "preview") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${productionOrigin}/sitemap.xml`,
    host: productionOrigin,
  };
}

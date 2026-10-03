import { sitemapPages } from "@/lib/sitemap";

const productionOrigin = "https://www.findfeedrestore.com";

export const dynamic = "force-static";

function pageSettings(path: string) {
  if (path === "/") return { changeFrequency: "weekly", priority: "1.0" };
  if (path === "/hope-in-action/") return { changeFrequency: "daily", priority: "0.6" };
  if (["/terms-conditions/", "/privacy-policy/", "/sitemap/"].includes(path)) return { changeFrequency: "yearly", priority: "0.3" };
  if (
    [
      "/miriams-hope/",
      "/affordable-housing/",
      "/housing-first/",
      "/homelessness-avoidance/",
      "/care-coach-mobile-unit/",
    ].includes(path)
  ) {
    return { changeFrequency: "monthly", priority: "0.9" };
  }
  return { changeFrequency: "monthly", priority: "0.7" };
}

const escapeXml = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

export function GET() {
  const urls = sitemapPages.map((page) => {
    const { changeFrequency, priority } = pageSettings(page.path);
    const images = page.images
      .map((image) => `\n    <image:image>\n      <image:loc>${escapeXml(productionOrigin + image)}</image:loc>\n    </image:image>`)
      .join("");
    return `  <url>
    <loc>${escapeXml(productionOrigin + page.path)}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>${images}
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join("\n")}
</urlset>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}

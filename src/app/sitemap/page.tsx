import type { Metadata } from "next";
import Link from "next/link";
import { ProgramHero } from "@/components/program-sections";
import programStyles from "@/components/program-sections.module.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import styles from "@/components/sitemap-sections.module.css";
import { defaultOpenGraphImages } from "@/lib/seo";
import { sitemapSections } from "@/lib/sitemap";

export const metadata: Metadata = {
  title: "Site Map - Find Feed Restore",
  description: "Browse every page on the Find Feed Restore website, including programs, ways to get involved, stories, and contact details.",
  alternates: { canonical: "/sitemap/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/sitemap/",
    siteName: "Find Feed Restore",
    images: defaultOpenGraphImages,
    title: "Site Map - Find Feed Restore",
    description: "Browse every page on the Find Feed Restore website, including programs, ways to get involved, stories, and contact details.",
  },
};

export default function SiteMapPage() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <SiteHeader />
      <main id="content">
        <ProgramHero
          eyebrow="Find Your Way"
          title="Site Map"
          description="Every page on findfeedrestore.com in one place."
          backgroundClassName={programStyles.siteMapHero}
        />
        <section className={styles.sections} aria-label="All pages">
          <div className={styles.grid}>
            {sitemapSections().map((section) => (
              <section className={styles.card} key={section.heading} aria-labelledby={`sitemap-${section.heading}`}>
                <h2 id={`sitemap-${section.heading}`}>{section.heading}</h2>
                <ul>
                  {section.pages.map((page) => (
                    <li key={page.path}>
                      <Link href={page.path}>{page.title}</Link>
                      <p>{page.description}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <p className={styles.xmlNote}>
            Search engines can use the <a href="/sitemap.xml">XML sitemap</a>.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

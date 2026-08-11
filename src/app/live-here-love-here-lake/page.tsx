import type { Metadata } from "next";
import { LiveHerePageBody } from "@/components/live-here-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Live Here Love Here Lake - Find Feed Restore",
  description: "Local businesses helping families find home through Find, Feed & Restore.",
  alternates: { canonical: "/live-here-love-here-lake/" },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "/live-here-love-here-lake/",
    siteName: "Find Feed Restore",
    title: "Live Here Love Here Lake - Find Feed Restore",
    description: "Local businesses helping families find home through Find, Feed & Restore.",
  },
};

export default function LiveHereLoveHereLakePage() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <SiteHeader />
      <main id="content">
        <LiveHerePageBody />
      </main>
      <SiteFooter />
    </>
  );
}

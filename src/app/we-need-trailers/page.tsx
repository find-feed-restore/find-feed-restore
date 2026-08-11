import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrailerPageBody } from "@/components/trailer-sections";

export const metadata: Metadata = {
  title: "We Need Trailers - Find Feed Restore",
  description: "Donate a travel trailer, fifth wheel, or RV to help house families with children in Central Florida.",
  alternates: { canonical: "/we-need-trailers/" },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "/we-need-trailers/",
    siteName: "Find Feed Restore",
    title: "We Need Trailers - Find Feed Restore",
    description: "Donate a travel trailer, fifth wheel, or RV to help house families with children in Central Florida.",
  },
};

export default function WeNeedTrailersPage() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <SiteHeader />
      <main id="content">
        <TrailerPageBody />
      </main>
      <SiteFooter />
    </>
  );
}

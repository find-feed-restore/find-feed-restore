import type { Metadata } from "next";
import { SponsorsPageBody } from "@/components/sponsor-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Partners & Sponsors - Find Feed Restore",
  description: "Community partners helping Find, Feed & Restore provide housing and hope for families.",
  alternates: { canonical: "/sponsors/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/sponsors/",
    siteName: "Find Feed Restore",
    title: "Partners & Sponsors - Find Feed Restore",
    description: "Community partners helping Find, Feed & Restore provide housing and hope for families.",
  },
};

export default function SponsorsPage() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <SiteHeader />
      <main id="content">
        <SponsorsPageBody />
      </main>
      <SiteFooter />
    </>
  );
}

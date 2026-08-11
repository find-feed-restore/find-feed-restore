import type { Metadata } from "next";
import { LegalTermsPageBody } from "@/components/legal-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Terms & Conditions - Find Feed Restore",
  description: "Terms and Conditions governing use of the Find Feed Restore website.",
  alternates: { canonical: "/terms-conditions/" },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "/terms-conditions/",
    siteName: "Find Feed Restore",
    title: "Terms & Conditions - Find Feed Restore",
    description: "Terms and Conditions governing use of the Find Feed Restore website.",
  },
};

export default function TermsConditionsPage() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <SiteHeader />
      <main id="content">
        <LegalTermsPageBody />
      </main>
      <SiteFooter />
    </>
  );
}

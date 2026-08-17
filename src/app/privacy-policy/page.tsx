import type { Metadata } from "next";
import { PrivacyPolicyPageBody } from "@/components/privacy-policy-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Privacy Policy - Find Feed Restore",
  description: "Privacy Policy for the Find Feed Restore website and Instagram API integration.",
  alternates: { canonical: "/privacy-policy/" },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "/privacy-policy/",
    siteName: "Find Feed Restore",
    title: "Privacy Policy - Find Feed Restore",
    description: "Privacy Policy for the Find Feed Restore website and Instagram API integration.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <SiteHeader />
      <main id="content">
        <PrivacyPolicyPageBody />
      </main>
      <SiteFooter />
    </>
  );
}

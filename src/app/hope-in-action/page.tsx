import type { Metadata } from "next";
import { HopePageBody } from "@/components/hope-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Hope In Action - Find Feed Restore",
  description: "Follow Find Feed Restore stories of hope and moments of impact across Central Florida.",
  alternates: { canonical: "/hope-in-action/" },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "/hope-in-action/",
    siteName: "Find Feed Restore",
    title: "Hope In Action - Find Feed Restore",
    description: "Follow Find Feed Restore stories of hope and moments of impact across Central Florida.",
  },
};

export default function HopeInActionPage() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <SiteHeader />
      <main id="content">
        <HopePageBody />
      </main>
      <SiteFooter />
    </>
  );
}

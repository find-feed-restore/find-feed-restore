import type { Metadata } from "next";
import { BoardSection, PeopleCta, PeopleHero, StaffSection } from "@/components/people-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Board & Staff - Find Feed Restore",
  description: "Meet the staff and board members guiding Find, Feed & Restore.",
  alternates: { canonical: "/board-staff/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/board-staff/",
    siteName: "Find Feed Restore",
    title: "Board & Staff - Find Feed Restore",
    description: "Meet the staff and board members guiding Find, Feed & Restore.",
  },
};

export default function BoardStaffPage() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <SiteHeader />
      <main id="content">
        <PeopleHero />
        <StaffSection />
        <BoardSection />
        <PeopleCta />
      </main>
      <SiteFooter />
    </>
  );
}

import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  VolunteerCta,
  VolunteerHero,
  VolunteerIntro,
  VolunteerOpportunities,
  VolunteerSteps,
} from "@/components/volunteer-sections";

export const metadata: Metadata = {
  title: "Volunteer - Find Feed Restore",
  description:
    "Volunteer with Find Feed Restore and help families with children move toward housing, stability, and hope across Central Florida.",
  alternates: { canonical: "/volunteer/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/volunteer/",
    siteName: "Find Feed Restore",
    title: "Volunteer - Find Feed Restore",
    description:
      "Give your time and talents to help families with children move toward housing, stability, and hope.",
  },
};

export default function VolunteerPage() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <SiteHeader />
      <main id="content">
        <VolunteerHero />
        <VolunteerIntro />
        <VolunteerOpportunities />
        <VolunteerSteps />
        <VolunteerCta />
      </main>
      <SiteFooter />
    </>
  );
}

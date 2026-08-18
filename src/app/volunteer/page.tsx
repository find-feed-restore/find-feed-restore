import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TestimonialVideos } from "@/components/testimonial-videos";
import {
  VolunteerCta,
  VolunteerHero,
  VolunteerIntro,
  VolunteerOpportunities,
  VolunteerSteps,
} from "@/components/volunteer-sections";
import type { TestimonialVideo } from "@/data/testimonial-videos";

const volunteerVideos: TestimonialVideo[] = [
  {
    id: "T3XRcY1_nG4",
    eyebrow: "Volunteer Spotlight",
    title: "2024 Christmas Gathering",
    description: "Watch community members come together in service and celebration at the 2024 Christmas Gathering.",
    thumbnail: "/images/volunteer/T3XRcY1_nG4.jpg",
  },
];

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
        <TestimonialVideos
          videos={volunteerVideos}
          eyebrow="Community In Action"
          title="See What Showing Up Can Mean."
          description="Watch the 2024 Christmas Gathering and see community members come together in service and celebration."
          variant="program"
          layout="feature"
        />
        <VolunteerSteps />
        <VolunteerCta />
      </main>
      <SiteFooter />
    </>
  );
}

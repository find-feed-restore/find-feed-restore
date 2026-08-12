import type { Metadata } from "next";
import { EditorialCta, EditorialHero, EditorialIntro } from "@/components/editorial-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TestimonialVideos } from "@/components/testimonial-videos";

export const metadata: Metadata = {
  title: "Testimonials - Find Feed Restore",
  description: null,
  alternates: { canonical: "/testimonials/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/testimonials/",
    siteName: "Find Feed Restore",
    title: "Testimonials - Find Feed Restore",
  },
};

const videos = [
  {
    id: "69VFG8OXVAs",
    eyebrow: "Hope In Action",
    title: "Find, Feed & Restore Is Changing Lives",
    description:
      "Learn how Find, Feed & Restore provides housing solutions, support, and hope for homeless families with children.",
    thumbnail: "/images/editorial/testimonials/69VFG8OXVAs.jpg",
  },
  {
    id: "3OEgOEgOsSA",
    eyebrow: "Community Impact",
    title: "Community Support In Action",
    description:
      "See how neighbors, donors, and volunteers help bring stability and encouragement to families in need.",
    thumbnail: "/images/editorial/testimonials/3OEgOEgOsSA.jpg",
  },
  {
    id: "C4Gta9eC0Ho",
    start: 95,
    eyebrow: "Mission Moment",
    title: "Families Moving From Homeless To Hopeful",
    description:
      "A closer look at the mission, the families served, and the local impact of Find, Feed & Restore.",
    thumbnail: "/images/editorial/testimonials/C4Gta9eC0Ho.jpg",
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="content">
        <EditorialHero
          variant="testimonials"
          eyebrow="Find, Feed & Restore Testimonails"
          title="Lives Changed. Communities Strengthened."
          description="Explore testimonials from residents, volunteers, donors, and partners who have experienced the impact of Find,  Feed & Restore firsthand. Every story represents a step from crisis toward stability, dignity, and hope."
        />
        <EditorialIntro
          eyebrow="Testimonials"
          title="Hope is happening across Central Florida."
          description="From affordable housing milestones and community fundraisers to restored trailers, local partnerships, and mission-driven videos, these stories show the work of Find, Feed & Restore in action."
        />
        <TestimonialVideos videos={videos} />
        <EditorialCta contactHref="/contact-us/" variant="testimonials" />
      </main>
      <SiteFooter />
    </>
  );
}

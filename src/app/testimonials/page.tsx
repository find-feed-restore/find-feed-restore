import type { Metadata } from "next";
import { EditorialCta, EditorialHero, EditorialIntro } from "@/components/editorial-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TestimonialVideos } from "@/components/testimonial-videos";
import { testimonialVideos } from "@/data/testimonial-videos";

export const metadata: Metadata = {
  title: "Testimonials - Find Feed Restore",
  description: "Watch client stories and community videos showing how Find Feed Restore helps families move from crisis toward housing, stability, and hope.",
  alternates: { canonical: "/testimonials/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/testimonials/",
    siteName: "Find Feed Restore",
    title: "Testimonials - Find Feed Restore",
    description: "Watch client stories and community videos showing how Find Feed Restore helps families move from crisis toward housing, stability, and hope.",
  },
};

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
          eyebrow="Find, Feed & Restore Testimonials"
          title="Lives Changed. Communities Strengthened."
          description="Explore testimonials from residents, volunteers, donors, and partners who have experienced the impact of Find, Feed & Restore firsthand. Every story represents a step from crisis toward stability, dignity, and hope."
        />
        <EditorialIntro
          eyebrow="Testimonials"
          title="Hope is happening across Central Florida."
          description="From affordable housing milestones and community fundraisers to restored trailers, local partnerships, and mission-driven videos, these stories show the work of Find, Feed & Restore in action."
        />
        <TestimonialVideos videos={testimonialVideos} />
        <EditorialCta contactHref="/contact-us/" variant="testimonials" />
      </main>
      <SiteFooter />
    </>
  );
}

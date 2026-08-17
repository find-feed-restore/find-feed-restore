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
    id: "pLxLVhRZUso",
    eyebrow: "Client Testimonial",
    title: "Brittney’s Story",
    description: "Hear Brittney share her experience with Find, Feed & Restore.",
    thumbnail: "/images/editorial/testimonials/pLxLVhRZUso.jpg",
  },
  {
    id: "4AtAVDaScBI",
    eyebrow: "Client Testimonial",
    title: "Alliania’s Story",
    description: "Hear Alliania share her experience with Find, Feed & Restore.",
    thumbnail: "/images/editorial/testimonials/4AtAVDaScBI.jpg",
  },
  {
    id: "SFWs27dkzeM",
    eyebrow: "Client Testimonial",
    title: "Andre’s Story",
    description: "Hear Andre share his experience with Find, Feed & Restore.",
    thumbnail: "/images/editorial/testimonials/SFWs27dkzeM.jpg",
  },
  {
    id: "xEHiFubpcks",
    eyebrow: "Program Spotlight",
    title: "Housing First",
    description: "See how Housing First helps families move toward stability and self-sufficiency.",
    thumbnail: "/images/editorial/testimonials/xEHiFubpcks.jpg",
  },
  {
    id: "kyG14I1jJDg",
    eyebrow: "Media Feature",
    title: "Find Feed Restore On Channel 6 News",
    description: "Watch Channel 6 News highlight Find Feed Restore’s work with homeless families and children.",
    thumbnail: "/images/editorial/testimonials/kyG14I1jJDg.jpg",
  },
  {
    id: "7VC1Sl9h0VI",
    eyebrow: "Care Coach",
    title: "Back To School Event 2022",
    description: "See the Care Coach and community partners support families at the 2022 back-to-school event.",
    thumbnail: "/images/editorial/testimonials/7VC1Sl9h0VI.jpg",
  },
  {
    id: "8_yZI7EGC84",
    eyebrow: "Community Education",
    title: "Hunger And Housing Simulation",
    description: "Experience a community simulation focused on the realities of hunger and housing instability.",
    thumbnail: "/images/editorial/testimonials/8_yZI7EGC84.jpg",
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
          eyebrow="Find, Feed & Restore Testimonials"
          title="Lives Changed. Communities Strengthened."
          description="Explore testimonials from residents, volunteers, donors, and partners who have experienced the impact of Find, Feed & Restore firsthand. Every story represents a step from crisis toward stability, dignity, and hope."
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

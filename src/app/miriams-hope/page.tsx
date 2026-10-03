import type { Metadata } from "next";
import { MiriamsHopeGoal, MiriamsHopeIntro, MiriamsHopeServices } from "@/components/miriams-hope-sections";
import {
  OtherPrograms,
  ProgramHero,
  ProgramStoryGallery,
  ProgramSupportCta,
} from "@/components/program-sections";
import programStyles from "@/components/program-sections.module.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TestimonialVideos } from "@/components/testimonial-videos";
import type { TestimonialVideo } from "@/data/testimonial-videos";

export const metadata: Metadata = {
  title: "Miriam’s Hope - Find Feed Restore",
  description: "Miriam’s Hope gives survivors of domestic violence and their children in Central Florida 6–12 months of no-cost transitional housing and support.",
  alternates: { canonical: "/miriams-hope/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/miriams-hope/",
    siteName: "Find Feed Restore",
    title: "Miriam’s Hope - Find Feed Restore",
    description: "Miriam’s Hope gives survivors of domestic violence and their children in Central Florida 6–12 months of no-cost transitional housing and support.",
  },
};

const miriamsHopeVideos: TestimonialVideo[] = [
  {
    id: "1rDQZta18EY",
    eyebrow: "Featured Video",
    title: "Miriam’s Hope",
    description: "Learn more about Miriam’s Hope from Find, Feed & Restore.",
    thumbnail: "/images/programs/miriams-hope/1rDQZta18EY.jpg",
  },
];

const storyImages = [
  { src: "/images/programs/miriams-hope/story-reading.webp", alt: "Mother reading a picture book with her daughter" },
  { src: "/images/programs/miriams-hope/story-park.webp", alt: "Mother braiding her daughter’s hair in a park" },
  { src: "/images/programs/miriams-hope/story-home.webp", alt: "Mother kissing her young daughter at home" },
  { src: "/images/programs/miriams-hope/story-embrace.webp", alt: "Mother lifting her smiling child outdoors" },
];

const otherPrograms = [
  {
    title: "Housing First",
    description: "Allows families to live rent and utility free while they regain stability.",
    href: "/housing-first/",
  },
  {
    title: "Affordable Housing",
    description: "Permanent housing solutions for working families with children.",
    href: "/affordable-housing/",
  },
  {
    title: "Homelessness Avoidance",
    description: "Temporary financial assistance for households experiencing hardship.",
    href: "/homelessness-avoidance/",
  },
];

export default function MiriamsHopePage() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <SiteHeader />
      <main id="content">
        <ProgramHero
          eyebrow="Our Programs"
          title="Miriam’s Hope"
          description="Safe. Stable. Hopeful."
          backgroundClassName={programStyles.miriamsHopeHero}
          backgroundImage="/images/programs/miriams-hope/hero.webp"
        />
        <MiriamsHopeIntro />
        <TestimonialVideos
          videos={miriamsHopeVideos}
          eyebrow="Inside Miriam’s Hope"
          title="See Miriam’s Hope In Action."
          description="Watch Find, Feed & Restore share how Miriam’s Hope helps survivors and their children find safety, stability and hope."
          variant="program"
          layout="feature"
        />
        <MiriamsHopeServices />
        <ProgramStoryGallery
          eyebrow="A Fresh Start"
          title="Room to heal. Space to grow."
          description="Miriam’s Hope gives survivors and their children a safe, stable place to heal, rebuild and plan for what comes next."
          images={storyImages}
        />
        <MiriamsHopeGoal />
        <ProgramSupportCta
          title="Your support can help a survivor rebuild."
          description="Help us make sure no one has to choose between staying with their abuser and becoming homeless."
          backgroundClassName={programStyles.miriamsHopeSupportCta}
          buttonLabel="Support Miriam’s Hope →"
        />
        <OtherPrograms programs={otherPrograms} />
      </main>
      <SiteFooter />
    </>
  );
}

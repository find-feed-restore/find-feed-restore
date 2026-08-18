import type { Metadata } from "next";
import {
  OtherPrograms,
  ProgramHero,
  ProgramIntro,
  ProgramStoryGallery,
  ProgramSupportCta,
} from "@/components/program-sections";
import programStyles from "@/components/program-sections.module.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Care Coach - Find Feed Restore",
  description: "The Care Coach mobile unit brings health, housing, hunger relief, and practical support to underserved Central Florida communities.",
  alternates: { canonical: "/care-coach-mobile-unit/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/care-coach-mobile-unit/",
    siteName: "Find Feed Restore",
    title: "Care Coach - Find Feed Restore",
    description: "The Care Coach mobile unit brings health, housing, hunger relief, and practical support to underserved Central Florida communities.",
  },
};

const storyImages = [
  { src: "/images/programs/affordable-housing/support-family.jpg", alt: "" },
  { src: "/images/programs/care-coach/framing.jpg", alt: "" },
  { src: "/images/give-banner.jpg", alt: "" },
];

const otherPrograms = [
  {
    title: "Affordable Housing",
    description: "Permanent housing solutions for working families with children.",
    href: "/affordable-housing/",
  },
  {
    title: "Homelessness Avoidance",
    description: "Temporary financial assistance for households facing hardship.",
    href: "/homelessness-avoidance/",
  },
  {
    title: "Housing First",
    description: "Rent and utility-free support while families regain stability.",
    href: "/housing-first/",
  },
];

export default function CareCoachPage() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <SiteHeader />
      <main id="content">
        <ProgramHero
          eyebrow="Our Programs"
          title="Care Coach"
          description="Providing health, housing, hunger, and hope to underserved communities."
          backgroundClassName={programStyles.careCoachHero}
          backgroundImage="/images/programs/care-coach/care-coach.jpg"
        />
        <ProgramIntro
          eyebrow="Care Coach Mobile Unit"
          title="Providing for health, housing and hunger"
          paragraphs={[
            "Our Care Coach Mobile Unit provides hot meals, fresh fruit, housing assistance and health screening to underserved and low-income communities.",
            "We help families move toward stability by connecting immediate care with long-term housing support, resources, and practical assistance.",
          ]}
          logo={{
            src: "/images/programs/care-coach/care-coach-logo.svg",
            alt: "Care Coach Logo",
            width: 649,
            height: 375,
          }}
          logoClassName={programStyles.careCoachLogo}
          applicationImage={{
            src: "/images/programs/care-coach/care-coach.jpg",
            alt: "Family receiving support",
          }}
          applicationImageClassName={programStyles.centeredApplicationImage}
          applicationUrl="https://greatthings.typeform.com/to/ZZkgIj"
        />
        <ProgramStoryGallery
          eyebrow="Program Impact"
          title="Real families. Real impact."
          description="See how Find, Feed & Restore is helping families find stability, safety, and a path forward."
          images={storyImages}
          galleryClassName={programStyles.careCoachGallery}
          video={{
            src: "https://www.youtube.com/embed/SonlnoRUCQg",
            title: "Care Coach Video",
          }}
        />
        <ProgramSupportCta
          title="Your support can change tomorrow."
          description="A small monthly gift can help provide meals, housing assistance, care, and hope for families experiencing homelessness."
          backgroundClassName={programStyles.careCoachSupportCta}
        />
        <OtherPrograms
          programs={otherPrograms}
          gridClassName={programStyles.careCoachOtherProgramsGrid}
        />
      </main>
      <SiteFooter />
    </>
  );
}

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
  title: "Housing First - Find Feed Restore",
  description: null,
  alternates: { canonical: "/housing-first/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/housing-first/",
    siteName: "Find Feed Restore",
    title: "Housing First - Find Feed Restore",
  },
};

const storyImages = [
  { src: "/images/unique/housing-story-1.webp", alt: "" },
  { src: "/images/unique/housing-story-2.webp", alt: "" },
  { src: "/images/unique/housing-story-3.webp", alt: "" },
  { src: "/images/unique/housing-story-4.webp", alt: "" },
];

const otherPrograms = [
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
  {
    title: "Care Coach",
    description: "Hot meals, housing assistance, and health screening for underserved communities.",
    href: "/care-coach-mobile-unit/",
  },
];

export default function HousingFirstPage() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <SiteHeader />
      <main id="content">
        <ProgramHero
          eyebrow="Our Programs"
          title="Housing First"
          description="Helping homeless families with children live rent and utility free while they regain stability."
          backgroundClassName={programStyles.housingFirstHero}
        />
        <ProgramIntro
          eyebrow="Housing First"
          title="Providing housing for those in need"
          paragraphs={[
            "Housing First allows homeless families with children to live rent and utility free for 6 to 12 months while we help them get back on their feet and obtain self-sufficiency.",
            "Initial cost-free living and support systems followed by an affordable housing option helps families obtain long-term sustainability and success.",
          ]}
          logo={{
            src: "/images/programs/housing-first/housing-first-logo.svg",
            alt: "Housing First Logo",
            width: 255,
            height: 199,
          }}
          logoClassName={programStyles.housingFirstLogo}
          applicationImage={{
            src: "/images/unique/housing-intro-v2.webp",
            alt: "Mother and children smiling together in their new home",
          }}
          applicationImageClassName={programStyles.housingFirstApplicationImage}
        />
        <ProgramStoryGallery
          eyebrow="Stories Of Hope"
          title="Stability starts at home."
          description="Through Housing First, families receive the breathing room, support, and stability needed to move toward self-sufficiency."
          images={storyImages}
        />
        <ProgramSupportCta
          title="Your support can help a family rebuild."
          description="A small monthly gift can help provide housing support, care, and hope for families experiencing homelessness."
          backgroundClassName={programStyles.housingFirstSupportCta}
        />
        <OtherPrograms programs={otherPrograms} />
      </main>
      <SiteFooter />
    </>
  );
}

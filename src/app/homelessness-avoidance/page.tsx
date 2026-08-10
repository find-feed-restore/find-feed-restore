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
  title: "Homelessness Avoidance - Find Feed Restore",
  description: null,
  alternates: { canonical: "/homelessness-avoidance/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/homelessness-avoidance/",
    siteName: "Find Feed Restore",
    title: "Homelessness Avoidance - Find Feed Restore",
  },
};

const storyImages = [
  { src: "/images/programs/affordable-housing/teresa-family.jpg", alt: "" },
  { src: "/images/programs/affordable-housing/thalia-family.jpg", alt: "" },
  { src: "/images/programs/affordable-housing/tammy-family.jpg", alt: "" },
  { src: "/images/programs/affordable-housing/latoya-family.jpg", alt: "" },
];

const otherPrograms = [
  {
    title: "Affordable Housing",
    description: "Permanent housing solutions for working families with children.",
    href: "/affordable-housing/",
  },
  {
    title: "Care Coach",
    description: "Hot meals, housing assistance, and health screening for underserved communities.",
    href: "/care-coach-mobile-unit/",
  },
  {
    title: "Housing First",
    description: "Rent and utility-free support while families regain stability.",
    href: "/housing-first/",
  },
];

export default function HomelessnessAvoidancePage() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <SiteHeader />
      <main id="content">
        <ProgramHero
          eyebrow="Our Programs"
          title="Homelessness Avoidance"
          description="Providing temporary financial assistance and stability services to help families avoid homelessness."
          backgroundClassName={programStyles.homelessnessAvoidanceHero}
        />
        <ProgramIntro
          eyebrow="Homelessness Avoidance"
          title="Getting families back on their feet"
          paragraphs={[
            "Our homelessness avoidance program provides temporary financial assistance to help cover rent, mortgages, and utilities for households experiencing unexpected economic shocks.",
            "Coupled with stability services, such as counselors and legal aid, this program provides an emergency cushion to low-income people in crisis, helping them avoid housing instability and homelessness.",
          ]}
          logo={{
            src: "/images/programs/homelessness-avoidance/homelessness-avoidance-logo.svg",
            alt: "Homelessness Avoidance Logo",
            width: 252,
            height: 82,
          }}
          logoClassName={programStyles.homelessnessAvoidanceLogo}
          applicationImage={{
            src: "/images/homelessness-avoidance.jpg",
            alt: "Family outside their home",
          }}
          applicationImageClassName={programStyles.centeredApplicationImage}
        />
        <ProgramStoryGallery
          eyebrow="Stories Of Hope"
          title="Support before crisis becomes homelessness."
          description="Homelessness Avoidance helps families stay housed during unexpected hardship by providing a bridge toward stability."
          images={storyImages}
        />
        <ProgramSupportCta
          title="Your support can help keep a family housed."
          description="A small monthly gift can help provide emergency assistance, stability services, and hope for families facing hardship."
          backgroundClassName={programStyles.homelessnessAvoidanceSupportCta}
        />
        <OtherPrograms programs={otherPrograms} />
      </main>
      <SiteFooter />
    </>
  );
}

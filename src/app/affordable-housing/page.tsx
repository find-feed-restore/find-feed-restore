import type { Metadata } from "next";
import {
  OtherPrograms,
  ProgramHero,
  ProgramIntro,
  ProgramSupportCta,
} from "@/components/program-sections";
import programStyles from "@/components/program-sections.module.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TestimonialVideos } from "@/components/testimonial-videos";
import type { TestimonialVideo } from "@/data/testimonial-videos";

export const metadata: Metadata = {
  title: "Affordable Housing - Find Feed Restore",
  description: "Find Feed Restore helps working families with children find safe, stable, and affordable housing in Central Florida.",
  alternates: { canonical: "/affordable-housing/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/affordable-housing/",
    siteName: "Find Feed Restore",
    title: "Affordable Housing - Find Feed Restore",
    description: "Find Feed Restore helps working families with children find safe, stable, and affordable housing in Central Florida.",
  },
};

const assetRoot = "/images/programs/affordable-housing";

const affordableHousingVideos: TestimonialVideo[] = [
  {
    id: "UIg8fVh3lq0",
    eyebrow: "Featured Video",
    title: "HGG Myers Walkthrough",
    description: "Take a closer look inside Hannah Grace Gardens with Find, Feed & Restore.",
    thumbnail: `${assetRoot}/UIg8fVh3lq0.jpg`,
  },
];

const otherPrograms = [
  {
    title: "Care Coach",
    description: "Provides hot meals, housing assistance, and health screening to underserved communities.",
    href: "/care-coach-mobile-unit/",
  },
  {
    title: "Homelessness Avoidance",
    description: "Temporary financial assistance for households experiencing financial hardship.",
    href: "/homelessness-avoidance/",
  },
  {
    title: "Housing First",
    description: "Allows families to live rent and utility free while they regain stability.",
    href: "/housing-first/",
  },
];

export default function AffordableHousingPage() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <SiteHeader />
      <main id="content">
        <ProgramHero
          eyebrow="Our Programs"
          title="Affordable Housing"
          description="Helping working families with children find safe, stable, and affordable housing."
          backgroundClassName={programStyles.affordableHousingHero}
          backgroundImage="/images/programs/affordable-housing/hero.jpg"
        />
        <ProgramIntro
          eyebrow="Affordable Housing"
          title="Helping families find affordable housing"
          paragraphs={[
            "Affordable Housing provides a permanent housing solution for working families with children who are in need.",
            "Hannah Grace Gardens allows working families to keep more of their income for essentials like food, medicine, education, childcare, and transportation while having a safe place to call home.",
          ]}
          logo={{
            src: `${assetRoot}/hannah-grace-gardens.svg`,
            alt: "Hannah Grace Gardens Logo",
            width: 3118,
            height: 2317,
          }}
          applicationImage={{
            src: "/images/unique/affordable-intro.webp",
            alt: "Family receiving housing support",
          }}
        />
        <TestimonialVideos
          videos={affordableHousingVideos}
          eyebrow="Inside Hannah Grace Gardens"
          title="See Affordable Housing In Action."
          description="Take a closer look at Hannah Grace Gardens through this walkthrough from Find, Feed & Restore."
          variant="program"
          layout="feature"
        />
        <ProgramSupportCta
          title="Your support can help a family come home."
          description="A small monthly gift can help provide housing support, stability, and hope for families experiencing homelessness."
        />
        <OtherPrograms programs={otherPrograms} />
      </main>
      <SiteFooter />
    </>
  );
}

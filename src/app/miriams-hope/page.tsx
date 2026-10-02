import type { Metadata } from "next";
import { MiriamsHopeGoal, MiriamsHopeIntro, MiriamsHopeServices } from "@/components/miriams-hope-sections";
import { OtherPrograms, ProgramHero, ProgramSupportCta } from "@/components/program-sections";
import programStyles from "@/components/program-sections.module.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Miriam’s Hope - Find Feed Restore",
  description: "Miriam’s Hope provides 6–12 months of no-cost transitional housing and support for survivors of domestic violence and their children.",
  alternates: { canonical: "/miriams-hope/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/miriams-hope/",
    siteName: "Find Feed Restore",
    title: "Miriam’s Hope - Find Feed Restore",
    description: "Miriam’s Hope provides 6–12 months of no-cost transitional housing and support for survivors of domestic violence and their children.",
  },
};

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
        />
        <MiriamsHopeIntro />
        <MiriamsHopeServices />
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

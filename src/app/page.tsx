import {
  CausesSection,
  GivingSection,
  HeroSection,
  ImpactSection,
  MottoSection,
} from "@/components/home-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Find Feed Restore",
    url: "https://www.findfeedrestore.com/",
    logo: "https://www.findfeedrestore.com/images/ffr-logo-light.png",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <a className="skip-link" href="#content">Skip to content</a>
      <SiteHeader />
      <main id="content">
        <HeroSection />
        <MottoSection />
        <ImpactSection />
        <CausesSection />
        <GivingSection />
      </main>
      <SiteFooter />
    </>
  );
}

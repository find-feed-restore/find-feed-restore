import {
  CausesSection,
  GivingSection,
  HeroSection,
  ImpactSection,
} from "@/components/home-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NGO",
        "@id": "https://www.findfeedrestore.com/#organization",
        name: "Find Feed Restore",
        alternateName: "Find, Feed & Restore",
        url: "https://www.findfeedrestore.com/",
        logo: "https://www.findfeedrestore.com/images/ffr-logo.png",
        image: "https://www.findfeedrestore.com/opengraph-image.jpg",
        description:
          "Central Florida nonprofit helping homeless families with children, and survivors of domestic violence, move to stable housing through affordable housing, Housing First, homelessness avoidance, transitional housing, and mobile care.",
        email: "info@findfeedrestore.com",
        telephone: "+1-866-236-2983",
        address: {
          "@type": "PostalAddress",
          streetAddress: "20180 US Highway 27 Ste 308",
          addressLocality: "Clermont",
          addressRegion: "FL",
          postalCode: "34715",
          addressCountry: "US",
        },
        areaServed: { "@type": "State", name: "Florida" },
        sameAs: [
          "https://www.facebook.com/FindFeedRestore",
          "https://www.instagram.com/findfeedrestore",
          "https://www.linkedin.com/company/find-feed-%26-restore",
          "https://www.youtube.com/@findfeedrestore-n9x",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.findfeedrestore.com/#website",
        url: "https://www.findfeedrestore.com/",
        name: "Find Feed Restore",
        publisher: { "@id": "https://www.findfeedrestore.com/#organization" },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <a className="skip-link" href="#content">Skip to content</a>
      <SiteHeader />
      <main id="content">
        <HeroSection />
        <ImpactSection />
        <CausesSection />
        <GivingSection />
      </main>
      <SiteFooter />
    </>
  );
}

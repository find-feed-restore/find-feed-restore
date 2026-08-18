import type { Metadata } from "next";
import {
  ContactCta,
  ContactDetails,
  ContactGallery,
  ContactHero,
  ContactWays,
} from "@/components/contact-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Contact Us - Find Feed Restore",
  description: "Contact Find Feed Restore for housing assistance, volunteer opportunities, partnerships, donations, and general questions.",
  alternates: { canonical: "/contact-us/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/contact-us/",
    siteName: "Find Feed Restore",
    title: "Contact Us - Find Feed Restore",
    description: "Contact Find Feed Restore for housing assistance, volunteer opportunities, partnerships, donations, and general questions.",
  },
};

export default function ContactUsPage() {
  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="content">
        <ContactHero />
        <ContactDetails />
        <ContactWays />
        <ContactGallery />
        <ContactCta />
      </main>
      <SiteFooter />
    </>
  );
}

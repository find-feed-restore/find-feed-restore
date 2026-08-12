import type { Metadata } from "next";
import {
  EditorialCta,
  EditorialHero,
  EditorialIntro,
  NewsGrid,
  type NewsItem,
} from "@/components/editorial-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "News & Media - Find Feed Restore",
  description: null,
  alternates: { canonical: "/news-media/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/news-media/",
    siteName: "Find Feed Restore",
    title: "News & Media - Find Feed Restore",
  },
};

const newsItems: NewsItem[] = [
  {
    day: "05",
    monthYear: "Aug 2019",
    source: "Spectrum News 13",
    location: "Central Florida",
    title: "Everyday Hero: Clermont Pastor Helps Families Get Back on Their Feet",
    description:
      "Spectrum News 13 featured Pastor Brian Broadway and the mission of Find Feed Restore, highlighting how homeless families are finding stability, support, and hope through transitional housing and community partnerships.",
    href: "https://mynews13.com/fl/orlando/news/2019/08/05/everyday-hero--clermont-pastor-helps-families-get-back-on-their-feet",
    featured: true,
  },
  {
    day: "29",
    monthYear: "Sep 2025",
    source: "South Lake Tablet",
    location: "Clermont, FL",
    title: "Cops vs. Docs: A Battle for Hope Benefiting Find, Feed and Restore",
    description:
      "Find Feed & Restore hosted its Battle for Hope fundraiser, bringing the community together to support homeless families.",
    href: "https://sltablet.com/2025/09/29/cops-vs-docs-a-battle-for-hope-benefiting-find-feed-and-restore/",
  },
  {
    day: "27",
    monthYear: "Mar 2025",
    source: "Click Orlando",
    location: "News 6",
    title: "Giving Machines Get Results for Central Florida Nonprofits",
    description:
      "Local organizations celebrated the success of the Light the World Giving Machine campaign benefiting Find Feed Restore and other nonprofits.",
    href: "https://www.clickorlando.com/news/local/2025/03/27/giving-machines-get-results-for-central-florida-nonprofits/",
  },
  {
    day: "17",
    monthYear: "Jan 2025",
    source: "Florida Conference",
    location: "Lakeland, FL",
    title: "Warren Willis Camp Partnership Provides Transitional Housing",
    description:
      "Warren Willis Camp partnered with Find Feed Restore to help bring families from homeless to hopeful.",
    href: "https://www.flumc.org/newsdetail/warren-willis-camp-has-a-partnership-to-provide-transitional-housing-for-the-homeless-18876545",
  },
  {
    day: "19",
    monthYear: "Dec 2024",
    source: "Clermont Sun",
    location: "Clermont, FL",
    title: "A Unique and Impactful Way to Support Local Charities",
    description:
      "The Neighborhood Center of South Lake and Find Feed Restore partnered with Light the World Giving Machine.",
    href: "https://www.midfloridanewspapers.com/clermont_sun/news/a-unique-and-impactful-way-to-support-local-charities/article_1de9a5b2-be28-11ef-90d1-830d586dc15a.html",
  },
  {
    day: "02",
    monthYear: "Dec 2024",
    source: "Style.",
    location: "Leesburg, FL",
    title: "Double the Difference: Power Couples of 2024",
    description:
      "Pastor Brian and Allison Broadway were recognized for their impact through Living Message Church and Find Feed Restore.",
    href: "https://lakeandsumterstyle.com/double-the-difference-power-couples-of-2024/",
  },
  {
    day: "17",
    monthYear: "Sep 2024",
    source: "Clermont Sun",
    location: "Clermont, FL",
    title: "Homeless Families Are the Real Winners in This Year’s Battle for Hope",
    description:
      "South Lake law enforcement officers battled to raise awareness and funds for homeless families.",
    href: "https://www.midfloridanewspapers.com/clermont_sun/homeless-families-are-the-real-winners-in-this-year-s-battle-for-hope/article_0ea19fd4-74e4-11ef-afab-27e6e8731ec3.html",
  },
  {
    day: "14",
    monthYear: "Sep 2024",
    source: "South Lake Tablet",
    location: "Clermont, FL",
    title: "Find Feed and Restore: A Battle For Hope",
    description:
      "Battle for Hope brought together Clermont Police and Lake County Sheriff’s Office for a community fundraiser.",
    href: "https://sltablet.com/2024/09/14/find-feed-and-restore-a-battle-for-hope/",
  },
  {
    day: "28",
    monthYear: "Jun 2024",
    source: "Style.",
    location: "Leesburg, FL",
    title: "Hi Society: The South Lake Business Leaders",
    description:
      "The South Lake Business Leaders donated funds to support the mission of Find Feed Restore.",
    href: "https://lakeandsumterstyle.com/hi-society-the-south-lake-business-leaders/",
  },
  {
    day: "16",
    monthYear: "Nov 2023",
    source: "The News Leader",
    location: "Clermont, FL",
    title: "Construction Begins on Affordable Housing Project",
    description:
      "Find Feed Restore celebrated the groundbreaking of the Hannah Grace Gardens affordable housing community.",
    href: "https://www.midfloridanewspapers.com/clermont_news_leader/construction-begins-on-affordable-housing-project/article_21c1d924-8487-11ee-92d6-a385a518affe.html",
  },
  {
    day: "27",
    monthYear: "Apr 2017",
    source: "Click Orlando",
    location: "News 6",
    title: "Restored Travel Trailers Provide Sanctuary for Homeless Families with Children",
    description:
      "Donated travel trailers are restored and transformed into temporary homes, giving homeless families with children a safe place to stay.",
    href: "https://www.clickorlando.com/news/2017/04/27/restored-travel-trailers-provide-sanctuary-for-homeless-families-with-children/",
  },
];

export default function NewsMediaPage() {
  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="content">
        <EditorialHero
          variant="news"
          eyebrow="Find, Feed & Restore News"
          title="Stories, Press & Community Impact"
          description="Read the latest news, media features, videos, and community stories highlighting how Find, Feed &  is helping families move from homeless to hopeful."
        />
        <EditorialIntro
          eyebrow="News & Media"
          title="Hope is happening across Central Florida."
          description="From affordable housing milestones and community fundraisers to restored trailers, local partnerships, and mission-driven videos, these stories show the work of Find, Feed & Restore in action."
        />
        <NewsGrid items={newsItems} />
        <EditorialCta variant="news" />
      </main>
      <SiteFooter />
    </>
  );
}

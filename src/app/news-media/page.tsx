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
  description: "Recent news, press coverage, community partnerships, and stories of impact from Find Feed Restore.",
  alternates: { canonical: "/news-media/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/news-media/",
    siteName: "Find Feed Restore",
    title: "News & Media - Find Feed Restore",
    description: "Recent news, press coverage, community partnerships, and stories of impact from Find Feed Restore.",
  },
};

const newsItems: NewsItem[] = [
  {
    publishedAt: "2026-07-19",
    day: "19",
    monthYear: "Jul 2026",
    source: "South Lake Tablet",
    location: "Lake County, FL",
    title: "Lake County Supervisor of Elections Team Supports Local Charity through Fundraisers",
    description:
      "The Lake County Supervisor of Elections team selected Find Feed Restore as its 2026 nonprofit beneficiary and presented more than $1,600 raised through staff fundraisers.",
    href: "https://sltablet.com/2026/07/19/lake-county-supervisor-of-elections-team-supports-local-charity-through-fundraisers/",
  },
  {
    publishedAt: "2026-05-06",
    day: "06",
    monthYear: "May 2026",
    source: "County Materials",
    location: "Clermont, FL",
    title: "Partnering with Find, Feed, & Restore to Support Homeless Families",
    description:
      "County Materials highlighted its partnership with Find Feed Restore through the Sonnentag American Foundation, supporting food, clothing, safe housing, and pathways toward self-sufficiency.",
    href: "https://www.countymaterials.com/our-culture-and-team/partnering-with-find-feed-restore-to-support-homeless-families",
  },
  {
    publishedAt: "2026-04-28",
    day: "28",
    monthYear: "Apr 2026",
    source: "Duke Energy",
    location: "Central Florida",
    title: "Duke Energy Foundation Invests $275,000 in Nonprofits Supporting Floridians’ Most Essential Needs",
    description:
      "The Duke Energy Foundation awarded Find Feed Restore a $20,000 grant as part of its investment in Central Florida nonprofits expanding access to essential needs and affordable housing.",
    href: "https://news.duke-energy.com/releases/duke-energy-foundation-invests-275-000-in-nonprofits-supporting-floridians-most-essential-needs",
  },
  {
    publishedAt: "2026-04-19",
    day: "19",
    monthYear: "Apr 2026",
    source: "South Lake Tablet",
    location: "Clermont, FL",
    title: "Highlights Of April’s South Lake Chamber of Commerce Breakfast",
    description:
      "Find Feed Restore sponsored the Chamber breakfast, where its team highlighted the organization’s housing, mental health counseling, and financial literacy work for local families.",
    href: "https://sltablet.com/2026/04/19/highlights-of-aprils-south-lake-chamber-of-commerce-breakfast/",
  },
  {
    publishedAt: "2025-09-29",
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
    publishedAt: "2025-03-27",
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
    publishedAt: "2025-01-17",
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
    publishedAt: "2024-12-19",
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
    publishedAt: "2024-12-17",
    day: "17",
    monthYear: "Dec 2024",
    source: "American Land Title Association",
    location: "Washington, DC",
    title: "Your Donations at Work: Stories of Hope and Home from ALTA Good Deeds",
    description:
      "ALTA Good Deeds shared how a $6,000 grant helped Find Feed Restore provide stable housing, case management, counseling, and financial education for a working mother and her children.",
    href: "https://www.alta.org/news-and-publications/news/20241217-Your-Donations-at-Work-Stories-of-Hope-and-Home-from-ALTA-Good-Deeds",
  },
  {
    publishedAt: "2024-12-02",
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
    publishedAt: "2024-09-17",
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
    publishedAt: "2024-09-14",
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
    publishedAt: "2024-06-28",
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
    publishedAt: "2024-04-16",
    day: "16",
    monthYear: "Apr 2024",
    source: "South Lake Tablet",
    location: "Clermont, FL",
    title: "Poverty Simulation: Experience The Challenges Of Living in Poverty",
    description:
      "Find Feed Restore and the Neighborhood Center of South Lake co-hosted a community simulation focused on the local need for affordable housing and hunger relief.",
    href: "https://sltablet.com/2024/04/16/poverty-simulation-experience-the-challenges-of-living-in-poverty/",
  },
  {
    publishedAt: "2023-11-16",
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
    publishedAt: "2019-08-05",
    day: "05",
    monthYear: "Aug 2019",
    source: "Spectrum News 13",
    location: "Central Florida",
    title: "Everyday Hero: Clermont Pastor Helps Families Get Back on Their Feet",
    description:
      "Spectrum News 13 featured Pastor Brian Broadway and the mission of Find Feed Restore, highlighting how homeless families are finding stability, support, and hope through transitional housing and community partnerships.",
    href: "https://mynews13.com/fl/orlando/news/2019/08/05/everyday-hero--clermont-pastor-helps-families-get-back-on-their-feet",
  },
  {
    publishedAt: "2018-03-19",
    day: "19",
    monthYear: "Mar 2018",
    source: "South Lake Tablet",
    location: "Clermont, FL",
    title: "Brian Broadway Receives The Gem Of The Hills Award",
    description:
      "Brian Broadway received the Gem of the Hills Award in recognition of his community service and his work providing housing and support to homeless families through Find Feed Restore.",
    href: "https://sltablet.com/2018/03/19/brian-broadway-receives-the-gem-of-the-hills-award/",
  },
  {
    publishedAt: "2017-04-27",
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
          description="Read the latest news, media features, videos, and community stories highlighting how Find, Feed & Restore is helping families move from homeless to hopeful."
        />
        <EditorialIntro
          eyebrow="News & Media"
          title="Hope is happening across Central Florida."
          description="From affordable housing milestones and community fundraisers to restored trailers, local partnerships, and mission-driven videos, these stories show the work of Find, Feed & Restore in action."
        />
        <NewsGrid items={newsItems.toSorted((a, b) => b.publishedAt.localeCompare(a.publishedAt))} />
        <EditorialCta variant="news" />
      </main>
      <SiteFooter />
    </>
  );
}

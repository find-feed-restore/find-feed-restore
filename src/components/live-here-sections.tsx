import Image from "next/image";
import { LiveHereStoryVideo } from "./live-here-video";
import styles from "./live-here-sections.module.css";

const assetRoot = "/images/campaigns/live-here-love-here";
const partnerUrl = "https://greatthings.typeform.com/to/JLL8BMEH?typeform-source=link.edgepilot.com";

type CampaignSponsor = {
  name: string;
  image: string;
  width: number;
  height: number;
  href?: string;
};

type SponsorTier = {
  eyebrow: string;
  title: string;
  tone: "leaders" | "partners" | "members";
  sponsors: CampaignSponsor[];
};

const sponsorTiers: SponsorTier[] = [
  {
    eyebrow: "Top Tier",
    title: "Business Leaders",
    tone: "leaders",
    sponsors: [
      { name: "Denise Calderon CPA", href: "https://www.denisecalderon.com/", image: "denise-calderon.png", width: 1024, height: 219 },
      { name: "Living Message Church", href: "https://www.livingmessagechurch.com/", image: "living-message.jpg", width: 1536, height: 1152 },
      { name: "BlueWater Family Wellness", href: "https://bluewaterfamilywellness.com/", image: "bluewater-family-wellness.jpg", width: 201, height: 78 },
      { name: "Dahl Family Law Group", href: "https://www.dahlfamilylaw.com/", image: "dahl-family-law.jpg", width: 1202, height: 528 },
    ],
  },
  {
    eyebrow: "Mid Tier",
    title: "Business Partners",
    tone: "partners",
    sponsors: [
      { name: "Southern Stoneworks", href: "https://www.southernstoneworksfl.com/", image: "southern-stoneworks.png", width: 300, height: 233 },
      { name: "Christine Holland", href: "https://christinehollandlife.com/", image: "christine-holland.png", width: 1210, height: 440 },
      { name: "Kiwanis", image: "kiwanis-golden-triangle.png", width: 960, height: 540 },
      { name: "Legacy Construction and Remodeling", href: "https://www.facebook.com/LegacyCandR/", image: "legacy-construction.png", width: 1024, height: 1024 },
      { name: "Southern Home Specialists", image: "southern-home-specialists.png", width: 600, height: 300 },
    ],
  },
  {
    eyebrow: "Supporting Tier",
    title: "Business Members",
    tone: "members",
    sponsors: [
      { name: "Teamont Boba", href: "https://teamontboba.com/", image: "teamont.jpeg", width: 1773, height: 1773 },
      { name: "Super Claims Adjusting", href: "https://superclaimsadjusting.com/", image: "super-claims-adjusting.png", width: 1280, height: 186 },
      { name: "South Lake Business Leaders", href: "https://www.southlakebusinessleaders.com/", image: "south-lake-business-leaders.png", width: 1024, height: 442 },
      { name: "HRS Construction", href: "https://www.homeadvisor.com/rated.HRSConstruction.16255596.html", image: "hrs-construction.png", width: 2000, height: 2000 },
      { name: "OMG Juice", href: "https://www.omgjuicefl.com/", image: "omg-juice.png", width: 2048, height: 2048 },
      { name: "Lincoln Park South Lake Alliance", href: "https://www.lpsla.org/", image: "lincoln-park.webp", width: 224, height: 224 },
      { name: "The Cruz Team Realtor", href: "https://reginacruz.kw.com/", image: "cruz-team.png", width: 263, height: 242 },
      { name: "Olympus Executive Realty", href: "https://www.realtor.com/realestateagents/5fcb610dc8cf620011efbc41", image: "olympus-realty.jpg", width: 399, height: 126 },
      { name: "Key Food", href: "https://www.keyfood.com/stores/4315", image: "key-food.png", width: 1280, height: 522 },
      { name: "Main Squeeze", href: "https://www.facebook.com/people/Main-Squeeze-Clermont/100087423011062", image: "main-squeeze.jpg", width: 1040, height: 1040 },
      { name: "PDQ", href: "https://www.eatpdq.com/locations/clermont", image: "pdq.png", width: 159, height: 220 },
      { name: "Paula Wold Real Estate", href: "https://www.preferredrebrokers.com/agents/125830-paula-wold", image: "paula-wold.png", width: 300, height: 300 },
      { name: "A Very Handyman", href: "https://www.facebook.com/AVeryHandyman.TonyWold/", image: "a-very-handyman.jpeg", width: 412, height: 220 },
      { name: "Milestone Counseling", href: "https://www.milestone-counseling.com/", image: "milestone-counseling.jpg", width: 300, height: 171 },
      { name: "Skillful Antics", href: "https://www.skillfulantics.com/", image: "skillful-antics.png", width: 554, height: 150 },
      { name: "Better Life Church", href: "https://www.betterlifeworship.com/", image: "better-life-church.jpg", width: 489, height: 173 },
      { name: "Affordable Insurance Solutions", href: "https://www.affordableinsurancesolutionsusa.com/", image: "affordable-insurance.webp", width: 526, height: 208 },
      { name: "Home Instead", href: "https://www.homeinstead.com/home-care/usa/fl/clermont/846/", image: "home-instead.jpeg", width: 200, height: 200 },
      { name: "Wheatley Realty Group", href: "https://www.wheatleyrealtygroup.com/agents/101089-dana-broadway", image: "wheatley-realty.webp", width: 1895, height: 1377 },
      { name: "Law Offices of Brett Jones", href: "https://www.bretjonespa.com/", image: "bret-jones-law.png", width: 727, height: 198 },
    ],
  },
];

const benefits = [
  ["Community Visibility", "Mention on yearly social media video with over 15,000 local views."],
  ["Brand Recognition", "Business logo and brand recognition during one of our annual events."],
  ["Local Support", "Corporate Partnership support window cling for your business."],
];

export function LiveHereHero() {
  return (
    <section className={styles.hero} aria-labelledby="live-here-title">
      <div className={styles.heroContent}>
        <div className={styles.logoWrap}>
          <Image
            className={styles.heroLogo}
            src={`${assetRoot}/campaign-logo.png`}
            alt="Live Here Love Here Lake"
            width={603}
            height={467}
            fetchPriority="high"
            sizes="(max-width: 450px) 80vw, 360px"
          />
        </div>
        <h1 id="live-here-title">Local Businesses Helping Families Find Home</h1>
        <p>
          Partner with Find, Feed &amp; Restore to provide safe housing and meaningful support for
          homeless families, veterans, and survivors of domestic violence.
        </p>
        <div className={styles.heroActions}>
          <a className={`${styles.button} ${styles.primaryButton}`} href={partnerUrl} target="_blank" rel="noopener">
            Become a Partner
          </a>
          <a className={`${styles.button} ${styles.videoButton}`} href="https://www.youtube.com/watch?v=69VFG8OXVAs" target="_blank" rel="noopener">
            <span className={styles.shimmer} />
            <span className={styles.playIcon} aria-hidden="true" />
            <span className={styles.videoLabel}>Watch the Story</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function LiveHereImpact() {
  return (
    <div className={styles.impactOuter}>
      <section className={styles.impact} aria-labelledby="impact-title">
        <div className={styles.impactBand}>
          <p>For less than <strong>$.55 a day</strong>, your business can change lives.</p>
        </div>
        <div className={styles.impactSection}>
          <div className={styles.impactInner}>
            <span className={styles.sectionLabel}>Partner Benefits</span>
            <h2 id="impact-title">Small Business. Big Impact.</h2>
            <p className={styles.impactIntro}>
              Join local business leaders helping provide housing, hope, and stability for families across Lake County.
            </p>
            <a className={styles.impactButton} href={partnerUrl}>Get Started</a>
            <div className={styles.benefitGrid}>
              {benefits.map(([title, copy]) => (
                <article className={styles.benefitCard} key={title}>
                  <div className={styles.benefitIcon} aria-hidden="true">♥</div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SponsorLogo({ sponsor }: { sponsor: CampaignSponsor }) {
  const image = (
    <Image
      src={`${assetRoot}/${sponsor.image}`}
      alt={sponsor.name}
      width={sponsor.width}
      height={sponsor.height}
      sizes="(max-width: 640px) calc(100vw - 98px), (max-width: 1024px) calc((100vw - 184px) / 2), 263px"
    />
  );

  return sponsor.href ? (
    <a className={styles.logoCard} href={sponsor.href} target="_blank" rel="noopener" aria-label={`Visit ${sponsor.name}`}>
      {image}
    </a>
  ) : <div className={styles.logoCard}>{image}</div>;
}

export function LiveHereSponsors() {
  return (
    <section className={styles.sponsors} aria-labelledby="community-partners-title">
      <div className={styles.sponsorsInner}>
        <header className={styles.sponsorsHead}>
          <span>Community Partners</span>
          <h2 id="community-partners-title">Local Businesses Making Home Possible</h2>
          <p>Thank you to the businesses helping families find housing, stability, and hope throughout Lake County.</p>
        </header>
        {sponsorTiers.map((tier) => (
          <section className={`${styles.tier} ${styles[tier.tone]}`} aria-labelledby={`tier-${tier.tone}`} key={tier.tone}>
            <header className={styles.tierHeader}>
              <span>{tier.eyebrow}</span>
              <h3 id={`tier-${tier.tone}`}>{tier.title}</h3>
            </header>
            <div className={`${styles.logoGrid} ${styles[`${tier.tone}Grid`]}`}>
              {tier.sponsors.map((sponsor) => <SponsorLogo sponsor={sponsor} key={sponsor.name} />)}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

export function LiveHereStory() {
  return (
    <section className={styles.story} aria-labelledby="live-here-story-title">
      <div className={styles.storyInner}>
        <div className={styles.storyCopy}>
          <h2 id="live-here-story-title">With Your Help, We are Making The World a Better Place</h2>
          <p>
            Find, Feed &amp; Restore is a housing program that assists families with children. After 6 years of
            providing food, career development, computer training and job placement assistance, we realized the
            missing element necessary for families with children to develop and grow is a stable environment for
            them to call home.
          </p>
          <p>
            So we created and implemented three effective and strategic methods including Housing First (no cost
            housing for 6 to 12 months), Permanent Housing Solutions (affordable housing for working families) and
            Homelessness Avoidance (rent/mortgage/utilities assistance for struggling families).
          </p>
        </div>
        <LiveHereStoryVideo />
      </div>
    </section>
  );
}

export function LiveHerePageBody() {
  return (
    <div className={styles.page}>
      <LiveHereHero />
      <LiveHereImpact />
      <LiveHereSponsors />
      <LiveHereStory />
    </div>
  );
}

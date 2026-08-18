import Image from "next/image";
import { HeroImagePreload } from "./hero-image-preload";
import styles from "./sponsor-sections.module.css";

type Sponsor = {
  name: string;
  href: string;
  image: string;
  width: number;
  height: number;
};

const sponsors: Sponsor[] = [
  { name: "Duke Energy", href: "https://www.duke-energy.com", image: "/images/sponsors/duke-energy.png", width: 525, height: 225 },
  { name: "Live Well Foundation of South Lake", href: "https://www.lwfsl.com/", image: "/images/sponsors/live-well.png", width: 847, height: 294 },
  { name: "AdventHealth", href: "https://www.adventhealth.com/", image: "/images/sponsors/adventhealth.png", width: 3582, height: 901 },
  { name: "United Way of Lake and Sumter Counties", href: "https://www.uwls.org/", image: "/images/sponsors/united-way.png", width: 182, height: 123 },
  { name: "Community Foundation of South Lake", href: "https://cfslc.org/", image: "/images/sponsors/community-foundation.png", width: 1800, height: 1800 },
  { name: "Truist", href: "https://www.truist.com/", image: "/images/sponsors/truist-logo.png", width: 300, height: 70 },
  { name: "Law Offices of Bret Jones PA", href: "https://www.bretjonespa.com/", image: "/images/sponsors/bret-jones.jpg", width: 1109, height: 371 },
  { name: "Women's Giving Alliance", href: "https://cfslc.org/womens-giving-alliance/", image: "/images/sponsors/womens-giving-alliance.png", width: 203, height: 105 },
  { name: "Kiwanis Club of Clermont Foundation", href: "https://k01485.site.kiwanis.org/", image: "/images/sponsors/kiwanis-clermont.png", width: 1060, height: 235 },
  { name: "Morgridge Family Foundation", href: "https://morgridgefamilyfoundation.org/", image: "/images/sponsors/morgridge-foundation.png", width: 441, height: 114 },
  { name: "Lake County Florida", href: "https://www.lakecountyfl.gov/human-services", image: "/images/sponsors/lake-county.jpg", width: 666, height: 583 },
  { name: "RJ's Boat Lifts", href: "https://www.rjsboatlifts.com/", image: "/images/sponsors/rjs-boat-lifts.png", width: 706, height: 368 },
  { name: "Mark's Floors", href: "https://www.marksfloorsonline.com/", image: "/images/sponsors/marks-flooring.png", width: 205, height: 129 },
  { name: "Living Hope Church", href: "https://www.livinghope.today/", image: "/images/sponsors/living-hope.png", width: 1500, height: 476 },
  { name: "Merideth Nagel PA", href: "https://mnagellaw.com/", image: "/images/sponsors/merideth-nagel.png", width: 541, height: 461 },
  { name: "Living Message Church", href: "https://www.livingmessagechurch.com", image: "/images/sponsors/living-message.png", width: 4333, height: 2000 },
  { name: "Lincoln Park South Lake Alliance", href: "https://www.lpsla.org/", image: "/images/sponsors/lincoln-park.png", width: 624, height: 309 },
  { name: "Kiwanis Club of South Lake", href: "https://kcosl.org/", image: "/images/sponsors/kiwanis-south-lake.webp", width: 1770, height: 508 },
];

export function SponsorsHero() {
  return (
    <>
      <HeroImagePreload href="/images/unique/sponsors-hero.webp" />
      <section className={styles.hero} aria-labelledby="sponsors-title">
        <div className={styles.heroInner}>
          <span>Partners & Sponsors</span>
          <h1 id="sponsors-title">Community Leaders Helping Families Find Home</h1>
          <p>
            We are grateful for the businesses, foundations, churches, and community partners investing
            in housing solutions and brighter futures for families across Central Florida.
          </p>
          <div className={styles.actions}>
            <a className={styles.button} href="https://findfeedrestore-bloom.kindful.com/" target="_blank" rel="noopener">
              Support the Mission
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export function SponsorsIntro() {
  return (
    <section className={styles.intro} aria-labelledby="sponsors-intro-title">
      <div className={`${styles.inner} ${styles.introGrid}`}>
        <div>
          <span>Being The Change</span>
          <h2 id="sponsors-intro-title">Purpose-driven partners. Life-changing impact.</h2>
        </div>
        <p>
          These organizations help Find Feed Restore provide shelter, stability, care, and hope for
          families with children. Their generosity helps move families from crisis toward a safe,
          sustainable future.
        </p>
      </div>
    </section>
  );
}

function SponsorTile({ sponsor }: { sponsor: Sponsor }) {
  return (
    <a
      className={styles.sponsorCard}
      href={sponsor.href}
      target="_blank"
      rel="noopener"
      aria-label={`Visit ${sponsor.name}`}
    >
      <Image
        src={sponsor.image}
        alt={sponsor.name}
        width={sponsor.width}
        height={sponsor.height}
        sizes="(max-width: 520px) calc(100vw - 56px), (max-width: 768px) calc((100vw - 72px) / 2), (max-width: 1100px) calc((100vw - 116px) / 3), (max-width: 1280px) calc((100vw - 140px) / 4), 255px"
      />
    </a>
  );
}

export function SponsorWall() {
  return (
    <section className={styles.wallSection} aria-labelledby="sponsor-wall-title">
      <div className={styles.inner}>
        <header className={styles.sectionHead}>
          <span>Community Partners</span>
          <h2 id="sponsor-wall-title">Thank You To Our Sponsors</h2>
          <p>Click a logo to learn more about the organizations helping make this mission possible.</p>
        </header>
        <div className={styles.sponsorWall}>
          {sponsors.map((sponsor) => <SponsorTile sponsor={sponsor} key={sponsor.name} />)}
        </div>
      </div>
    </section>
  );
}

export function SponsorsPageBody() {
  return (
    <div className={styles.elementorInset}>
      <div className={styles.page}>
        <SponsorsHero />
        <SponsorsIntro />
        <SponsorWall />
      </div>
    </div>
  );
}

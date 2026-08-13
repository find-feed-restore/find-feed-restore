import Image from "next/image";
import Link from "next/link";
import { AnimatedCounter } from "./animated-counter";
import styles from "./home-sections.module.css";

const impactItems = [
  { value: 191, label: "Families Housed" },
  { value: 349, label: "Children Housed" },
  { value: 498, label: "People Housed" },
];

const causes = [
  {
    image: "/images/affordable-housing.jpg",
    alt: "Affordable housing family",
    kicker: "Housing Stability",
    title: "Affordable Housing",
    text: "Helping families keep more of their income for essentials like food, medicine, education, childcare, and transportation.",
    href: "/affordable-housing/",
    width: 859,
    height: 552,
  },
  {
    image: "/images/housing-first.jpg",
    alt: "Family supported through Housing First",
    kicker: "Immediate Shelter",
    title: "Housing First",
    text: "Providing rent and utilities free while families receive budgeting, career assistance, mentoring, and support.",
    href: "/housing-first/",
    width: 1000,
    height: 648,
  },
  {
    image: "/images/homelessness-avoidance.jpg",
    alt: "Families supported through homelessness avoidance",
    kicker: "Prevention",
    title: "Homelessness Avoidance",
    text: "Helping those at risk of homelessness with support that protects stability and creates a path forward.",
    href: "/homelessness-avoidance/",
    width: 1000,
    height: 648,
  },
  {
    image: "/images/care-coach.jpg",
    alt: "Care Coach mobile unit",
    kicker: "Mobile Support",
    title: "Care Coach Mobile Unit",
    text: "Bringing health, housing, hunger relief, and care resources directly to low-income families with children.",
    href: "/care-coach-mobile-unit/",
    width: 859,
    height: 552,
  },
];

const givingOptions = [
  {
    title: "Sponsor A Family",
    text: "Sponsor a family for just $25 a month and help provide stability, support, and hope for families and children experiencing homelessness.",
    label: "Give Today",
    href: "https://findfeedrestore-bloom.kindful.com/",
  },
  {
    title: "Support Find Feed Restore",
    text: "Your one-time donation helps Find, Feed & Restore provide immediate housing assistance and practical care for families in need.",
    label: "Give Today",
    href: "https://findfeedrestore-bloom.kindful.com/",
  },
  {
    title: "Donate A Trailer",
    text: "Have a used travel trailer? Your donation can provide a safe temporary home for a family while also qualifying as a tax-deductible contribution.",
    label: "Find Out More",
    href: "/we-need-trailers/",
  },
];

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <h1 id="hero-title" className={styles.heroTitle}>
          Housing For Homeless
          <br />
          Families With Children
        </h1>
        <h2 className={styles.heroSubtitle}>Our Vision</h2>
        <p className={styles.heroText}>
          Find, Feed &amp; Restore is a Central Florida non-profit organization working to end homelessness for families
          with children through housing, financial literacy, and mental health counseling.
        </p>
        <div className={styles.heroActions}>
          <a className={`${styles.heroButton} ${styles.primaryButton}`} href="https://findfeedrestore-bloom.kindful.com/">
            Support Our Mission
          </a>
          <a
            className={`${styles.heroButton} ${styles.videoButton}`}
            href="https://www.youtube.com/watch?v=69VFG8OXVAs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.videoShimmer} />
            <span className={styles.playIcon} aria-hidden="true" />
            <span>Watch Video</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function ImpactSection() {
  return (
    <section className={styles.impact} aria-labelledby="impact-title">
      <div className={styles.impactInner}>
        <p className={styles.mottoBadge} aria-label="Our motto: Homeless to Hopeful">
          <span>Our Motto</span>
          {" "}
          <strong>Homeless to Hopeful</strong>
        </p>
        <header className={styles.impactHeading}>
          <p className={styles.impactEyebrow}>Our Impact</p>
          <h2 id="impact-title">Housing Families. Restoring Hope.</h2>
          <p>For over ten years, Find, Feed &amp; Restore has helped house families, children and restored hope.</p>
        </header>
        <div className={styles.impactGrid}>
          {impactItems.map((item) => (
            <article className={styles.impactCard} key={item.label}>
              <div className={styles.impactNumber}>
                <AnimatedCounter value={item.value} />
              </div>
              <p className={styles.impactLabel}>{item.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CausesSection() {
  return (
    <section className={styles.causes} aria-labelledby="causes-title">
      <div className={styles.causesInner}>
        <header className={styles.causesHeading}>
          <span>Our Causes</span>
          <h2 id="causes-title">What We Do</h2>
          <p>Help make the world a better place for struggling families.</p>
        </header>
        <div className={styles.causesGrid}>
          {causes.map((cause) => (
            <article className={styles.causeCard} key={cause.title}>
              <div className={styles.causeImage}>
                <Image
                  src={cause.image}
                  alt={cause.alt}
                  width={cause.width}
                  height={cause.height}
                  sizes="(max-width: 700px) calc(100vw - 36px), (max-width: 1300px) calc(50vw - 38px), 25vw"
                />
              </div>
              <div className={styles.causeContent}>
                <span className={styles.causeKicker}>{cause.kicker}</span>
                <h3>{cause.title}</h3>
                <p>{cause.text}</p>
                <Link className={styles.causeButton} href={cause.href}>
                  Find Out More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GivingSection() {
  return (
    <section className={styles.giving} aria-labelledby="giving-title">
      <div className={styles.givingInner}>
        <header className={styles.givingHeading}>
          <span>Help A Family In Need</span>
          <h2 id="giving-title">How You Can Give</h2>
          <p>Every act of generosity helps provide housing, support, and hope for families experiencing homelessness.</p>
        </header>
        <div className={styles.givingGrid}>
          {givingOptions.map((option) => (
            <article className={styles.givingCard} key={option.title}>
              <h3>{option.title}</h3>
              <p>{option.text}</p>
              <a className={styles.givingButton} href={option.href}>
                {option.label}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

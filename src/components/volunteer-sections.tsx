import Image from "next/image";
import styles from "./volunteer-sections.module.css";

const volunteerFormUrl = "https://greatthings.typeform.com/to/V1SK6LFX";

const opportunities = [
  {
    number: "01",
    title: "Pack & Prepare",
    description:
      "Help organize household essentials, prepare welcome-home supplies, and support practical needs for families moving toward stability.",
  },
  {
    number: "02",
    title: "Events & Outreach",
    description:
      "Lend a hand at community events, donation drives, and outreach efforts that connect neighbors with the mission.",
  },
  {
    number: "03",
    title: "Share Your Skills",
    description:
      "Offer professional, creative, administrative, or hands-on experience when a current volunteer need matches your skills.",
  },
];

const steps = [
  {
    title: "Tell Us About You",
    description: "Complete the volunteer form and share your interests, experience, and availability.",
  },
  {
    title: "Find The Right Fit",
    description: "Our team will review current opportunities and connect you with a role that fits.",
  },
  {
    title: "Serve With Purpose",
    description: "Join other community members in providing practical support and encouragement.",
  },
];

function VolunteerFormLink({ children, secondary = false }: { children: React.ReactNode; secondary?: boolean }) {
  return (
    <a
      className={`${styles.button} ${secondary ? styles.secondaryButton : ""}`}
      href={volunteerFormUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

export function VolunteerHero() {
  return (
    <section className={styles.hero} aria-labelledby="volunteer-title">
      <div className={styles.heroMedia}>
        <Image
          src="/images/volunteer/volunteer-hero.webp"
          alt="Community volunteers preparing household supplies together"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className={styles.heroContent}>
        <span>Volunteer With Us</span>
        <h1 id="volunteer-title">Show Up.<br />Make Hope Possible.</h1>
        <p>
          Give your time and talents to help families with children move toward housing, stability,
          and hope.
        </p>
        <VolunteerFormLink>Become A Volunteer</VolunteerFormLink>
      </div>
    </section>
  );
}

export function VolunteerIntro() {
  return (
    <section className={styles.intro} aria-labelledby="volunteer-intro-title">
      <div className={styles.inner}>
        <div className={styles.introCopy}>
          <span>Make A Meaningful Difference</span>
          <h2 id="volunteer-intro-title">Your time can help a family move forward.</h2>
          <p>
            Volunteers strengthen the practical, caring support that surrounds families as they
            work toward lasting stability. Whether you can help for a day, at an event, or through a
            specialized skill, your service matters.
          </p>
          <p>
            Opportunities vary based on current family and program needs. Tell us how you would
            like to help, and our team will follow up when there is a good fit.
          </p>
          <VolunteerFormLink>Complete The Volunteer Form</VolunteerFormLink>
        </div>
        <div className={styles.introImage}>
          <Image
            src="/images/volunteer/neighbors-helping.webp"
            alt="Volunteers delivering groceries and household supplies to a neighbor"
            width={1536}
            height={1024}
            sizes="(max-width: 900px) calc(100vw - 40px), 48vw"
          />
        </div>
      </div>
    </section>
  );
}

export function VolunteerOpportunities() {
  return (
    <section className={styles.opportunities} aria-labelledby="volunteer-opportunities-title">
      <div className={styles.sectionInner}>
        <header className={styles.sectionHeading}>
          <span>Ways To Help</span>
          <h2 id="volunteer-opportunities-title">Bring what you have. Help where it matters.</h2>
          <p>Volunteer roles are matched to active needs, availability, and the strengths you bring.</p>
        </header>
        <div className={styles.opportunityGrid}>
          {opportunities.map((opportunity) => (
            <article className={styles.opportunityCard} key={opportunity.number}>
              <strong>{opportunity.number}</strong>
              <h3>{opportunity.title}</h3>
              <p>{opportunity.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VolunteerSteps() {
  return (
    <section className={styles.steps} aria-labelledby="volunteer-steps-title">
      <div className={styles.sectionInner}>
        <header className={`${styles.sectionHeading} ${styles.lightHeading}`}>
          <span>Getting Started</span>
          <h2 id="volunteer-steps-title">A simple path to serving.</h2>
        </header>
        <ol className={styles.stepGrid}>
          {steps.map((step, index) => (
            <li key={step.title}>
              <span>{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function VolunteerCta() {
  return (
    <section className={styles.cta} aria-labelledby="volunteer-cta-title">
      <div className={styles.ctaInner}>
        <span>Ready To Help?</span>
        <h2 id="volunteer-cta-title">Take the first step today.</h2>
        <p>
          Complete the volunteer interest form and let us know how you would like to support
          families in our community.
        </p>
        <VolunteerFormLink secondary>Open The Volunteer Form</VolunteerFormLink>
      </div>
    </section>
  );
}

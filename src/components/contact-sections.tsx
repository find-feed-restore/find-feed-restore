import Image from "next/image";
import styles from "./contact-sections.module.css";

const planStreetUrl = "https://app.planstreetinc.com/findfeedrestore/PublicForm";
const volunteerUrl = "https://greatthings.typeform.com/to/V1SK6LFX";
const donationUrl = "https://findfeedrestore-bloom.kindful.com/";

export function ContactHero() {
  return (
    <section className={styles.hero} aria-labelledby="contact-title">
      <div className={styles.heroInner}>
        <span>Get In Touch</span>
        <h1 id="contact-title">Contact Us</h1>
        <p>Give a family a place to call home. Take the first step — we’ll do the rest.</p>
      </div>
    </section>
  );
}

function AssistanceCard() {
  return (
    <article className={styles.assistanceCard}>
      <Image
        src="/images/unique/contact-intro.webp"
        alt="Family receiving housing support"
        width={2000}
        height={1333}
        sizes="(max-width: 1100px) calc(100vw - 48px), 41vw"
        unoptimized
      />
      <div className={styles.assistanceCardBody}>
        <h3>Are you a family in need?</h3>
        <p>Start the process toward recovery today.</p>
        <a className={styles.applicationButton} href={planStreetUrl}>
          Start Application
        </a>
      </div>
    </article>
  );
}

export function ContactDetails() {
  return (
    <section className={styles.section} aria-labelledby="contact-details-title">
      <div className={`${styles.inner} ${styles.split}`}>
        <div className={styles.contactCopy}>
          <span>Contact Us</span>
          <h2 id="contact-details-title">Find, Feed & Restore.</h2>
          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon} aria-hidden="true">⌖</div>
              <div>
                <span>Location</span>
                <strong>Clermont, FL</strong>
              </div>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon} aria-hidden="true">☎</div>
              <div>
                <span>Phone</span>
                <strong><a href="tel:18662362983">(866) 236-2983</a></strong>
              </div>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon} aria-hidden="true">✉</div>
              <div>
                <span>Email</span>
                <strong><a href="mailto:info@findfeedrestore.com">info@findfeedrestore.com</a></strong>
              </div>
            </div>
          </div>
        </div>
        <AssistanceCard />
      </div>
    </section>
  );
}

const connectionCards = [
  {
    icon: "♥",
    title: "Volunteer",
    description:
      "Help families move from crisis to stability through hands-on support, outreach, events, and community service.",
    label: "Become A Volunteer",
    href: volunteerUrl,
    external: true,
  },
  {
    icon: "★",
    title: "Corporate Partnership",
    description:
      "Partner with Find Feed Restore to make a lasting impact for families across Clermont, Lake County, and Central Florida.",
    label: "Partner With Us",
    href: "/live-here-love-here-lake/",
    external: false,
  },
  {
    icon: "＋",
    title: "Donate",
    description:
      "Your generosity helps provide housing, stability, support, and hope for families with children.",
    label: "Support Our Mission",
    href: donationUrl,
    external: true,
  },
];

export function ContactWays() {
  return (
    <section className={`${styles.section} ${styles.whiteSection}`} aria-labelledby="contact-ways-title">
      <div className={styles.inner}>
        <header className={styles.sectionHeading}>
          <span>Ways To Connect</span>
          <h2 id="contact-ways-title">Join The Mission</h2>
          <p>There are many ways to help families move from crisis to stability.</p>
        </header>
        <div className={styles.connectionGrid}>
          {connectionCards.map((card) => (
            <article className={styles.connectionCard} key={card.title}>
              <div className={styles.connectionIcon} aria-hidden="true">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <a
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noopener" : undefined}
              >
                {card.label}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const galleryImages = [
  { className: styles.large, src: "/images/unique/contact-gallery-1.webp", label: "Family celebrating a new home" },
  { src: "/images/contact/family-by-trailer.jpg", label: "Family receiving housing support" },
  { src: "/images/unique/contact-gallery-2.webp", label: "Family celebrating together" },
  { src: "/images/contact/amelia-and-ariel.jpg", label: "Family celebrating housing support" },
  { className: styles.wide, src: "/images/unique/contact-gallery-3.webp", label: "Family sharing a joyful moment" },
];

export function ContactGallery() {
  return (
    <section className={`${styles.section} ${styles.whiteSection}`} aria-labelledby="contact-gallery-title">
      <div className={styles.inner}>
        <header className={styles.sectionHeading}>
          <span>Hope In Action</span>
          <h2 id="contact-gallery-title">Real Families. Real Support. Real Hope.</h2>
          <p>
            See the families, volunteers, supporters, and community partners helping transform lives
            every day.
          </p>
        </header>
        <div className={styles.galleryGrid}>
          {galleryImages.map((image) => (
            <div
              className={`${styles.galleryItem} ${image.className ?? ""}`}
              style={{ backgroundImage: `url("${image.src}")` }}
              role="img"
              aria-label={image.label}
              key={image.src}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactCta() {
  return (
    <section className={styles.cta} aria-labelledby="contact-cta-title">
      <div className={styles.ctaInner}>
        <span>Every Family Deserves A Place To Call Home</span>
        <h2 id="contact-cta-title">Help Provide Housing, Stability, And Hope.</h2>
        <p>Your support helps families with children move from homelessness to hopefulness.</p>
        <div className={styles.ctaActions}>
          <a className={styles.mainButton} href={donationUrl} target="_blank" rel="noopener">
            Donate Today
          </a>
          <a
            className={`${styles.mainButton} ${styles.secondaryButton}`}
            href={volunteerUrl}
            target="_blank"
            rel="noopener"
          >
            Volunteer
          </a>
        </div>
      </div>
    </section>
  );
}

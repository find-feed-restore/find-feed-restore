import { Suspense } from "react";
import { HopeFeedLoading, HopeInstagramFeed } from "./hope-instagram-feed";
import styles from "./hope-sections.module.css";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/FindFeedRestore",
    icon: <path d="M14.2 8.5h3.1V5.1c-.5-.1-2.4-.2-4.5-.2-4.4 0-7.4 2.7-7.4 7.6v4.2H.5v3.8h4.9V30h6V20.5h5l.8-3.8h-5.8v-3.8c0-1.1.3-1.9 1.8-1.9h3.1V8.6c-.5-.1-1.1-.1-2.1-.1Z" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/findfeedrestore",
    icon: <><rect x="4.5" y="4.5" width="23" height="23" rx="6" /><circle cx="16" cy="16" r="5.5" /><circle cx="23.5" cy="8.7" r="1.2" fill="currentColor" stroke="none" /></>,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/find-feed-&-restore",
    icon: <><rect x="3" y="11" width="6" height="18" rx=".5" fill="currentColor" stroke="none" /><circle cx="6" cy="6" r="3.2" fill="currentColor" stroke="none" /><path d="M13 11h5.7v2.5h.1c.8-1.5 2.8-3.1 5.7-3.1 6.1 0 7.2 4 7.2 9.2V29h-6v-8.3c0-2 0-4.5-2.8-4.5s-3.2 2.2-3.2 4.4V29h-6V11Z" fill="currentColor" stroke="none" /></>,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@findfeedrestore-n9x",
    icon: <><path d="M29.8 9.2a3.8 3.8 0 0 0-2.7-2.7C24.7 5.9 16 5.9 16 5.9s-8.7 0-11.1.6a3.8 3.8 0 0 0-2.7 2.7C1.6 11.6 1.6 16 1.6 16s0 4.4.6 6.8a3.8 3.8 0 0 0 2.7 2.7c2.4.6 11.1.6 11.1.6s8.7 0 11.1-.6a3.8 3.8 0 0 0 2.7-2.7c.6-2.4.6-6.8.6-6.8s0-4.4-.6-6.8Z" fill="currentColor" stroke="none" /><path d="m13 20.3 7.6-4.3L13 11.7v8.6Z" fill="white" stroke="none" /></>,
  },
];

export function HopePageBody() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span>Hope In Action</span>
          <h1>Stories of Hope.<br />Moments of Impact.</h1>
          <p>Follow Find, Feed &amp; Restore on social media to see how we are helping families move from crisis to stability across Clermont, Lake County, and Central Florida.</p>
        </div>
      </section>

      <section className={styles.socialSection}>
        <div className={styles.inner}>
          <div className={styles.sectionHead}>
            <span>From The Community</span>
            <h2>Follow The Moments</h2>
            <nav className={styles.socialLinks} aria-label="Find Feed Restore social media">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">{link.icon}</svg>
                </a>
              ))}
            </nav>
          </div>
          <Suspense fallback={<HopeFeedLoading />}>
            <HopeInstagramFeed />
          </Suspense>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <span>Join The Mission</span>
          <h2>Help Create More Stories Like These</h2>
          <p>Your support helps families with children move from homelessness to hope.</p>
          <div className={styles.ctaActions}>
            <a className={styles.button} href="https://findfeedrestore-bloom.kindful.com/">Donate</a>
            <a className={`${styles.button} ${styles.secondaryButton}`} href="https://greatthings.typeform.com/to/V1SK6LFX">Volunteer</a>
          </div>
        </div>
      </section>
    </div>
  );
}

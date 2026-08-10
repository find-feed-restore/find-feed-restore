import Image from "next/image";
import Link from "next/link";
import styles from "./site-footer.module.css";

const quickLinks = [
  ["Board & Staff", "/about-us/"],
  ["Corporate Partnership", "/live-here-love-here-lake/"],
  ["Hope In Action", "/hope-in-action"],
  ["News", "/news"],
  ["Volunteer", "https://greatthings.typeform.com/to/V1SK6LFX"],
  ["Contact", "/contact-us/"],
  ["Donate Trailer", "/we-need-trailers/"],
];

const programs = [
  ["Care Coach", "/care-coach-mobile-unit/"],
  ["Affordable Housing", "/affordable-housing/"],
  ["Housing First", "/housing-first/"],
  ["Homelessness Avoidance", "/homelessness-avoidance/"],
];

function FooterLinks({ items }: { items: string[][] }) {
  return (
    <ul className={styles.linkList}>
      {items.map(([label, href]) => (
        <li key={label}>
          {href.startsWith("/") ? <Link href={href}>{label}</Link> : <a href={href}>{label}</a>}
        </li>
      ))}
    </ul>
  );
}

function SocialIcon({ label }: { label: "facebook" | "instagram" | "linkedin" | "youtube" }) {
  if (label === "facebook") return <span aria-hidden="true">f</span>;
  if (label === "linkedin") return <span aria-hidden="true">in</span>;
  if (label === "youtube") return <span aria-hidden="true">▶</span>;
  return <span className={styles.instagramIcon} aria-hidden="true" />;
}

export function SiteFooter() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerGrid}>
            <section>
              <h2>Quick Links</h2>
              <FooterLinks items={quickLinks} />
            </section>

            <section>
              <h2>Our Programs</h2>
              <FooterLinks items={programs} />
            </section>

            <section>
              <h2>Contact Info</h2>
              <address className={styles.contactList}>
                <p><span aria-hidden="true">●</span> 20180 US Highway 27 Ste 308 Clermont, FL 34715</p>
                <p><span aria-hidden="true">●</span> <a href="tel:+18662362983">(866) 236-2983</a></p>
                <p><span aria-hidden="true">●</span> <a href="mailto:info@findfeedrestore.com">info@findfeedrestore.com</a></p>
              </address>
              <div className={styles.socialLinks} aria-label="Social media links">
                <a href="https://www.facebook.com/FindFeedRestore" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <SocialIcon label="facebook" />
                </a>
                <a href="https://www.instagram.com/findfeedrestore" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <SocialIcon label="instagram" />
                </a>
                <a href="http://linkedin.com/company/find-feed-&-restore" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <SocialIcon label="linkedin" />
                </a>
                <a href="https://www.youtube.com/@findfeedrestore-n9x" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <SocialIcon label="youtube" />
                </a>
              </div>
            </section>

            <section className={styles.supportColumn}>
              <h2>Support Our Mission</h2>
              <p>Your generosity helps provide housing solutions for families with children.</p>
              <a className={styles.footerButton} href="https://findfeedrestore-bloom.kindful.com/">
                Support Our Mission
              </a>
              <a
                className={styles.guideStar}
                href="https://app.candid.org/profile/10965679/find-feed-restore-86-3070194/?pkId=c7268203-0251-4d4e-908c-c42e4f0ceddb"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Find Feed Restore Candid profile"
              >
                <Image src="/images/guidestar-seal.svg" alt="Candid transparency seal" width={108} height={108} />
              </a>
            </section>
          </div>

          <div className={styles.footerBottom}>
            <Image src="/images/ffr-logo-light.png" alt="Find Feed Restore" width={600} height={236} />
            <p>
              Copyright © 2025. Find Feed Restore.
              <br />
              <Link href="/terms">Terms &amp; Conditions</Link>
            </p>
          </div>
        </div>
      </footer>

      <a className={styles.floatingDonate} href="https://findfeedrestore-bloom.kindful.com/" aria-label="Donate now">
        <span className={styles.floatingHeart} aria-hidden="true">♥</span>
        <span className={styles.floatingText}>Support Our Mission Today</span>
      </a>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import styles from "./site-footer.module.css";

const quickLinks = [
  ["Board & Staff", "/board-staff/"],
  ["Corporate Partnership", "/live-here-love-here-lake/"],
  ["Hope In Action", "/hope-in-action"],
  ["News", "/news-media/"],
  ["Volunteer", "/volunteer/"],
  ["Contact", "/contact-us/"],
  ["Donate Trailer", "/we-need-trailers/"],
];

const programs = [
  ["Affordable Housing", "/affordable-housing/"],
  ["Housing First", "/housing-first/"],
  ["Homelessness Avoidance", "/homelessness-avoidance/"],
  ["Mobile Help", "/care-coach-mobile-unit/"],
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
                <p><span aria-hidden="true">●</span><span className={styles.contactValue}>20180 US Highway 27 Ste 308<br />Clermont, FL 34715</span></p>
                <p><span aria-hidden="true">●</span><span className={styles.contactValue}><a href="tel:+18662362983">(866) 236-2983</a></span></p>
                <p><span aria-hidden="true">●</span><span className={styles.contactValue}><a href="mailto:info@findfeedrestore.com">info@findfeedrestore.com</a></span></p>
              </address>
              <div className={styles.socialLinks} aria-label="Social media links">
                <a href="https://www.facebook.com/FindFeedRestore" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <SocialIcon label="facebook" />
                </a>
                <a href="https://www.instagram.com/findfeedrestore" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <SocialIcon label="instagram" />
                </a>
                <a href="https://www.linkedin.com/company/find-feed-%26-restore" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
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
              <Link href="/terms-conditions/">Terms &amp; Conditions</Link>
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

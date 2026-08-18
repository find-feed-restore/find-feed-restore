import { Fragment } from "react";
import { HeroImagePreload } from "./hero-image-preload";
import styles from "./legal-sections.module.css";

const sections = [
  {
    heading: "Use of the Site",
    items: [
      "You must use this Site only for lawful purposes and in accordance with these Terms.",
      "You agree not to misuse or attempt to disrupt the Site’s functionality.",
      "Unauthorized use of this Site may result in legal action.",
    ],
  },
  {
    heading: "Intellectual Property",
    items: [
      "All content on this Site, including text, images, logos, and designs, is owned by Find, Feed, Restore and protected by copyright and trademark laws.",
      "You may not copy, modify, or distribute any content from this Site without our prior written consent.",
    ],
  },
  {
    heading: "Third-Party Links",
    items: [
      "Our Site may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of those sites.",
      "The inclusion of any link does not imply endorsement by Find, Feed, Restore.",
    ],
  },
  {
    heading: " Privacy Policy",
    items: [
      "Your use of our Site is also governed by our Privacy Policy, which explains how we collect, use, and protect your information.",
    ],
  },
  {
    heading: "Disclaimers and Limitation of Liability",
    items: [
      "The Site is provided on an “as-is” and “as-available” basis. We make no warranties regarding the Site’s functionality, accuracy, or reliability.",
      "To the fullest extent permitted by law, Find, Feed, Restore is not liable for any direct, indirect, incidental, or consequential damages arising from the use of this Site.",
    ],
  },
  {
    heading: "Changes to These Terms",
    items: [
      "We reserve the right to update or modify these Terms at any time. Continued use of the Site after changes constitutes acceptance of the updated Terms.",
    ],
  },
  {
    heading: "Contact Us",
    items: [
      "If you have any questions about these Terms, please contact us at: info@findfeedrestore.com",
    ],
  },
] as const;

export function LegalTermsPageBody() {
  return (
    <div className={styles.page}>
      <HeroImagePreload href="/images/legal/terms-hero.jpg" />
      <section className={styles.hero} aria-labelledby="terms-title">
        <div className={styles.heroContainer}>
          <div className={styles.heroGrid}>
            <h1 id="terms-title">Terms &amp; Conditions</h1>
            <ol className={styles.breadcrumb} aria-label="Breadcrumb">
              <li>Home</li>
              <li><span className={styles.chevron} aria-hidden="true" />Terms &amp; Conditions</li>
            </ol>
          </div>
        </div>
      </section>

      <section className={styles.content} aria-label="Terms and Conditions">
        <div className={styles.contentInner}>
          <div className={`${styles.widget} ${styles.intro}`}>
            Welcome to Find, Feed, Restore (“we,” “our,” or “us”). By accessing and using our website (the “Site”), you agree to comply with and be bound by these Terms and Conditions (“Terms”). If you do not agree with these Terms, please do not use our Site.
          </div>

          {sections.map((section, index) => (
            <Fragment key={section.heading}>
              <div className={`${styles.widget} ${styles.headingWidget}`}>
                <div className={styles.headingContainer}>
                  <h2>{section.heading}</h2>
                </div>
              </div>
              <div className={`${styles.widget} ${styles.listWidget} ${index === sections.length - 1 ? styles.lastWidget : ""}`}>
                <div className={styles.listContainer}>
                  <ul>
                    {section.items.map((item) => <li key={item}><p>{item}</p></li>)}
                  </ul>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import { HeroImagePreload } from "./hero-image-preload";
import styles from "./legal-sections.module.css";

export function PrivacyPolicyPageBody() {
  return (
    <div className={styles.page}>
      <HeroImagePreload href="/images/legal/terms-hero.jpg" />
      <section className={styles.hero} aria-labelledby="privacy-title">
        <div className={styles.heroContainer}>
          <div className={styles.heroGrid}>
            <h1 id="privacy-title">Privacy Policy</h1>
            <ol className={styles.breadcrumb} aria-label="Breadcrumb">
              <li><Link href="/">Home</Link></li>
              <li><span className={styles.chevron} aria-hidden="true" />Privacy Policy</li>
            </ol>
          </div>
        </div>
      </section>

      <section className={styles.content} aria-label="Privacy Policy">
        <div className={styles.contentInner}>
          <div className={`${styles.widget} ${styles.intro}`}>
            <p><strong>Effective Date: August 17, 2026</strong></p>
            <p>Find Feed Restore respects your privacy and is committed to protecting information associated with your use of our website and digital services. This Privacy Policy explains how information may be collected, used, and protected when you visit the Find Feed Restore website, including our use of the Instagram API to display content from our official Instagram account.</p>
          </div>

          <PolicySection title="Information You Provide">
            <p>We may collect information that you voluntarily provide when you contact us, submit a website form, request assistance, express interest in volunteering, or otherwise communicate with Find Feed Restore. Depending on the form or service, this information may include your name, email address, telephone number, the nature of your request, and any information you include in a message.</p>
            <p>Some applications, donations, volunteer forms, and other services are provided by third parties. Information submitted directly to those services is also governed by the privacy policy of the applicable provider.</p>
          </PolicySection>

          <PolicySection title="Information Collected Automatically">
            <p>When you use our website, our hosting and service providers may automatically process limited technical information needed to deliver, secure, and maintain the website. This may include an Internet Protocol address, browser or device type, requested pages, referring pages, and the date and time of a request.</p>
            <p>Our website may use cookies or similar technologies that are necessary for site functionality. Third-party content or services may use their own technologies as described in their respective privacy policies.</p>
          </PolicySection>

          <PolicySection title="How We Use Information">
            <p>We may use information associated with the website to:</p>
            <ul>
              <li>Respond to messages, requests, and inquiries</li>
              <li>Process website form submissions</li>
              <li>Provide information about our programs and services</li>
              <li>Operate, secure, troubleshoot, and improve the website</li>
              <li>Maintain records as reasonably necessary for our nonprofit operations</li>
              <li>Comply with applicable legal obligations</li>
            </ul>
            <p>We do not sell personal information submitted through our website.</p>
          </PolicySection>

          <PolicySection title="Website Forms and Email Delivery">
            <p>When you submit a form hosted by Find Feed Restore, the information you provide may be processed by our website hosting and email-delivery providers so that the submission can be delivered to and reviewed by Find Feed Restore. Please do not include sensitive personal, financial, medical, or account information unless a form specifically requests it through an authorized service.</p>
          </PolicySection>

          <PolicySection title="Instagram API Integration">
            <p>The Find Feed Restore website uses the Instagram API provided by Meta Platforms, Inc. to retrieve and display content from Find Feed Restore’s official Instagram account.</p>
            <p>This integration is used solely to display Find Feed Restore Instagram content, such as photographs, captions, videos, and links to Instagram posts, on our website.</p>
            <p>Our Instagram integration does not require website visitors to log in to Instagram, connect their Instagram accounts, or provide Instagram credentials.</p>
            <p>We do not use the Instagram API to collect information about website visitors, access visitors’ Instagram accounts, publish content on behalf of visitors, or track visitors’ activity on Instagram.</p>
          </PolicySection>

          <PolicySection title="Information Received from Instagram">
            <p>Through the Instagram API, Find Feed Restore may receive information associated with its own Instagram account and published content, including:</p>
            <ul>
              <li>Instagram account identifiers</li>
              <li>Media identifiers</li>
              <li>Published images and video thumbnails</li>
              <li>Media types</li>
              <li>Captions</li>
              <li>Instagram post URLs or permalinks</li>
              <li>Media timestamps</li>
              <li>Other information made available through the Instagram API that is necessary to display our Instagram feed</li>
            </ul>
            <p>This information is used only to operate and maintain the Instagram feed displayed on the Find Feed Restore website.</p>
          </PolicySection>

          <PolicySection title="Instagram Access Tokens">
            <p>Our website may use an Instagram access token to communicate with the Instagram API.</p>
            <p>Access tokens and other credentials are maintained securely on our server and are not intentionally exposed to website visitors or included in publicly accessible client-side website code.</p>
            <p>Access tokens are used only to authenticate authorized requests between Find Feed Restore’s website and Instagram.</p>
          </PolicySection>

          <PolicySection title="How We Use Instagram Information">
            <p>Information obtained through the Instagram API is used to:</p>
            <ul>
              <li>Display Find Feed Restore’s Instagram posts on our website</li>
              <li>Link website visitors to the original content on Instagram</li>
              <li>Maintain and troubleshoot the Instagram feed integration</li>
              <li>Improve the reliability and functionality of our website</li>
            </ul>
            <p>We do not sell information obtained through the Instagram API.</p>
          </PolicySection>

          <PolicySection title="Data Sharing">
            <p>Find Feed Restore does not sell, rent, or trade information received through the Instagram API.</p>
            <p>Information may be processed by service providers that support the operation and hosting of our website when necessary to provide those services. Such providers are expected to handle information in accordance with applicable privacy and security requirements.</p>
            <p>Our use of information received from Instagram is also subject to applicable Meta and Instagram platform policies.</p>
          </PolicySection>

          <PolicySection title="Data Retention">
            <p>Instagram content may be temporarily cached by our website or hosting infrastructure to improve website performance and reduce unnecessary requests to the Instagram API.</p>
            <p>Cached information may be refreshed or removed as content changes, the cache expires, or the Instagram integration is discontinued.</p>
            <p>We retain information obtained through the Instagram API only for as long as reasonably necessary to provide and maintain the Instagram feed functionality. Other website information is retained only for as long as reasonably necessary for the purposes described in this policy, to maintain appropriate records, or to satisfy applicable legal requirements.</p>
          </PolicySection>

          <PolicySection title="Data Deletion Requests">
            <p>If you have questions about information associated with the Find Feed Restore Instagram integration or would like to request deletion of information maintained by Find Feed Restore through this integration, please contact us using the contact information provided below.</p>
            <p>Please include sufficient information for us to understand and process your request.</p>
            <p>You may also manage information associated with your Instagram or Meta account through the privacy and account settings provided by Meta and Instagram.</p>
          </PolicySection>

          <PolicySection title="Third-Party Services">
            <p>Our website may contain links to Instagram and other third-party websites or services. When you follow a link to Instagram or another third-party service, your interaction with that service is governed by that provider’s own privacy policy and terms.</p>
            <p>Find Feed Restore is not responsible for the privacy practices of third-party websites or services.</p>
          </PolicySection>

          <PolicySection title="Security">
            <p>We use reasonable administrative and technical measures designed to protect information and credentials associated with our website integrations.</p>
            <p>However, no internet-based system or method of electronic storage can be guaranteed to be completely secure.</p>
          </PolicySection>

          <PolicySection title="Children’s Privacy">
            <p>Our website and Instagram integration are not designed to collect personal information from children under 13. Website visitors are not required to provide Instagram account information in order to view the Instagram content displayed on our website. If you believe a child has provided personal information to us through the website, please contact us.</p>
          </PolicySection>

          <PolicySection title="Changes to This Privacy Policy">
            <p>We may update this Privacy Policy periodically to reflect changes to our website, Instagram integration, applicable laws, or third-party platform requirements.</p>
            <p>When changes are made, the updated policy will be posted on this page with a revised effective date.</p>
          </PolicySection>

          <PolicySection title="Contact Us" last>
            <p>If you have questions about this Privacy Policy, our use of the Instagram API, or a data deletion request, please contact:</p>
            <address>
              Find Feed Restore<br />
              20180 US Highway 27 Ste 308<br />
              Clermont, FL 34715<br />
              <a href="mailto:info@findfeedrestore.com">info@findfeedrestore.com</a><br />
              <Link href="/contact-us/">www.findfeedrestore.com/contact-us/</Link>
            </address>
          </PolicySection>
        </div>
      </section>
    </div>
  );
}

function PolicySection({
  title,
  children,
  last = false,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section>
      <div className={`${styles.widget} ${styles.headingContainer} ${styles.headingWidget}`}>
        <h2>{title}</h2>
      </div>
      <div className={`${styles.widget} ${styles.listContainer} ${styles.listWidget} ${last ? styles.lastWidget : ""}`}>
        {children}
      </div>
    </section>
  );
}

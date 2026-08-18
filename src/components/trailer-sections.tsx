import Image from "next/image";
import { HeroImagePreload } from "./hero-image-preload";
import { TrailerDonationForm } from "./trailer-form";
import styles from "./trailer-sections.module.css";

const missionUrl = "https://findfeedrestore-bloom.kindful.com/";

export function TrailerPageBody() {
  return (
    <div className={styles.page}>
      <HeroImagePreload href="/images/programs/care-coach/care-coach.jpg" />
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span>We Need Your Trailer</span>
          <h1>Give a Family a Safe Place to Call Home</h1>
          <p>Your used travel trailer, fifth wheel, or RV can help provide temporary housing and hope for families with children in Central Florida.</p>
          <div className={styles.actions}>
            <a href="#trailer-form" className={styles.button}>Donate a Trailer</a>
            <a href={missionUrl} className={`${styles.button} ${styles.secondaryButton}`} target="_blank" rel="noopener">Support the Mission</a>
          </div>
          <div className={styles.stats}>
            <span>Tax-Deductible Donation</span>
            <span>Pickup Available</span>
            <span>Helps Families With Children</span>
          </div>
        </div>
      </section>

      <section className={styles.intro}>
        <div className={`${styles.inner} ${styles.twoColumn}`}>
          <div className={styles.copyBlock}>
            <span>Trailer Ministry</span>
            <h2>Take the first step. We will do the rest.</h2>
            <p>If you have a used travel trailer, fifth wheel, or motor coach, Find Feed Restore can use it to help provide temporary housing for a family with children in need.</p>
            <p>We can arrange pickup, and because Find Feed Restore is a 501(c)(3) nonprofit, your donation may qualify for a tax-deductible receipt.</p>
          </div>
          <div className={styles.impactCard}>
            <h3>Your trailer can become more than a donation.</h3>
            <p>It can become shelter, safety, dignity, and a new beginning for a family moving from crisis to hope.</p>
            <ul>
              <li>Used travel trailers</li>
              <li>Fifth wheels</li>
              <li>Motor coaches / RVs</li>
              <li>Pickup coordination available</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={styles.inner}>
          <div className={styles.sectionHead}>
            <span>How It Works</span>
            <h2>A Simple Way to Make a Life-Changing Impact</h2>
          </div>
          <div className={styles.processGrid}>
            <article>
              <strong>01</strong>
              <h3>Tell Us About Your Trailer</h3>
              <p>Share your contact information and the type of trailer or RV you would like to donate.</p>
            </article>
            <article>
              <strong>02</strong>
              <h3>We Follow Up</h3>
              <p>Our team will contact you to learn more, answer questions, and review next steps.</p>
            </article>
            <article>
              <strong>03</strong>
              <h3>We Coordinate Pickup</h3>
              <p>Find Feed Restore can help arrange pickup and provide donation documentation.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.formSection} id="trailer-form">
        <div className={`${styles.inner} ${styles.formLayout}`}>
          <div className={styles.formCopy}>
            <span>Start Here</span>
            <h2>Have a Trailer to Donate?</h2>
            <p>Fill out the form and someone from Find Feed Restore will follow up with you.</p>
            <div className={styles.trailerVisual}>
              <Image
                src="/images/campaigns/we-need-trailers/trailer-ffr.png"
                alt="Travel trailer donation render"
                className={styles.trailerRender}
                width={900}
                height={600}
              />
              <div className={styles.visualCallout}>
                <strong>From driveway to dignity</strong>
                <p>Your unused trailer can become emergency shelter for a family with children.</p>
              </div>
            </div>
            <div className={styles.contactCard}>
              <p><strong>Phone:</strong> <a href="tel:18662362983">(866) 236-2983</a></p>
              <p><strong>Email:</strong> <a href="mailto:info@findfeedrestore.com">info@findfeedrestore.com</a></p>
            </div>
          </div>
          <TrailerDonationForm />
        </div>
      </section>

      <section className={styles.gallerySection}>
        <div className={styles.inner}>
          <div className={styles.sectionHead}>
            <span>Families First</span>
            <h2>Hope Starts With a Safe Place to Stay</h2>
            <p>Every trailer donation helps create a path from uncertainty to stability for families with children.</p>
          </div>
          <div className={styles.galleryGrid}>
            <figure>
              <Image src="/images/programs/care-coach/care-coach.jpg" alt="Find Feed Restore Care Coach" width={2048} height={1536} />
            </figure>
            <figure>
              <Image src="/images/campaigns/we-need-trailers/latoya-family.jpg" alt="Find Feed Restore family with home key" width={768} height={1025} />
            </figure>
            <figure>
              <Image src="/images/campaigns/we-need-trailers/community-support.jpg" alt="Find Feed Restore community support" width={768} height={576} />
            </figure>
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.finalCtaInner}>
          <span>Make an Impact</span>
          <h2>Your Trailer Could Change a Family’s Future</h2>
          <p>Help provide shelter, stability, and hope for families with children in Central Florida.</p>
          <a href="#trailer-form" className={styles.button}>Donate a Trailer</a>
        </div>
      </section>
    </div>
  );
}

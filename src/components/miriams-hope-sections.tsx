import Image from "next/image";
import programStyles from "./program-sections.module.css";
import styles from "./miriams-hope-sections.module.css";

const donationUrl = "https://findfeedrestore-bloom.kindful.com/";

const supportServices = [
  "6–12 months of no-cost transitional housing",
  "Trauma-informed counseling",
  "Mental health counseling and support",
  "Case management",
  "Financial literacy and budgeting training",
  "Employment and career development",
  "Credit building and savings assistance",
  "Childcare and community resource connections",
  "Life-skills development",
  "Assistance preparing for permanent housing",
];

const pathway = ["Safety", "Healing", "Stability", "Independence"];

export function MiriamsHopeIntro() {
  return (
    <section className={styles.intro} aria-labelledby="miriams-hope-intro-title">
      <div className={styles.introInner}>
        <div className={styles.introCopy}>
          <Image
            className={`${programStyles.programLogo} ${programStyles.miriamsHopeLogo}`}
            src="/images/programs/miriams-hope/miriams-hope-logo.svg"
            alt="Miriam’s Hope logo"
            width={199}
            height={257}
          />
          <span className={programStyles.eyebrow}>Miriam’s Hope</span>
          <h2 id="miriams-hope-intro-title">Transitional housing for survivors</h2>
          <p>
            Miriam’s Hope is Find, Feed &amp; Restore’s transitional housing program for survivors of domestic
            violence and their children. Florida ranks 20th in the nation for the highest number of domestic
            violence cases, yet survivors often face the difficult reality of leaving an abusive home without a
            safe place to go.
          </p>
          <p>
            Miriam’s Hope provides 6–12 months of no-cost transitional housing in a safe, stable environment
            where families can begin healing, rebuilding and preparing for permanent housing and independence.
          </p>
          <a className={programStyles.button} href={donationUrl}>
            Support Miriam’s Hope
          </a>
        </div>

        <figure className={styles.quoteCard}>
          <span className={styles.quoteMark} aria-hidden="true">“</span>
          <blockquote>
            <p>No one should have to run from the hands of abuse, just to run into the arms of homelessness.</p>
          </blockquote>
          <dl className={styles.quoteStats}>
            <div>
              <dt>Housing</dt>
              <dd>6–12 Months</dd>
            </div>
            <div>
              <dt>Cost To Families</dt>
              <dd>$0</dd>
            </div>
          </dl>
        </figure>
      </div>
    </section>
  );
}

export function MiriamsHopeServices() {
  return (
    <section className={styles.services} aria-labelledby="miriams-hope-services-title">
      <div className={styles.servicesInner}>
        <header className={programStyles.sectionHeading}>
          <span className={programStyles.eyebrow}>More Than Shelter</span>
          <h2 id="miriams-hope-services-title">Program Support Includes</h2>
          <p>
            Miriam’s Hope is designed to address more than the immediate need for shelter. It gives survivors
            the time, stability, resources and support needed to rebuild their lives and create a safe,
            sustainable future for their families.
          </p>
        </header>
        <ul className={styles.serviceList}>
          {supportServices.map((service) => (
            <li key={service}>
              <span className={styles.check} aria-hidden="true" />
              {service}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function MiriamsHopeGoal() {
  return (
    <section className={styles.goal} aria-labelledby="miriams-hope-goal-title">
      <div className={styles.goalInner}>
        <header className={styles.goalHeading}>
          <span className={programStyles.eyebrow}>Our Goal</span>
          <h2 id="miriams-hope-goal-title">From victim to victor.</h2>
          <p>
            To bridge the gap between victim and victor by providing a pathway from safety, to healing, to
            stability, to independence.
          </p>
        </header>
        <ol className={styles.pathway}>
          {pathway.map((step, index) => (
            <li key={step}>
              <span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

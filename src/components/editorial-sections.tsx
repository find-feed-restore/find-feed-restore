import styles from "./editorial-sections.module.css";

type EditorialHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

type EditorialIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

type EditorialHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  id: string;
};

export type NewsItem = {
  day: string;
  monthYear: string;
  source: string;
  location: string;
  title: string;
  description: string;
  href: string;
  featured?: boolean;
};

export function EditorialHero({ eyebrow, title, description }: EditorialHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="editorial-title">
      <div className={styles.heroInner}>
        <span>{eyebrow}</span>
        <h1 id="editorial-title">{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}

export function EditorialIntro({ eyebrow, title, description }: EditorialIntroProps) {
  return (
    <section className={styles.intro} aria-labelledby="editorial-intro-title">
      <div className={`${styles.inner} ${styles.introGrid}`}>
        <div>
          <span>{eyebrow}</span>
          <h2 id="editorial-intro-title">{title}</h2>
        </div>
        <p>{description}</p>
      </div>
    </section>
  );
}

export function EditorialHeading({ eyebrow, title, description, id }: EditorialHeadingProps) {
  return (
    <header className={styles.sectionHeading}>
      <span>{eyebrow}</span>
      <h2 id={id}>{title}</h2>
      <p>{description}</p>
    </header>
  );
}

export function EditorialContainer({ children }: { children: React.ReactNode }) {
  return <div className={styles.inner}>{children}</div>;
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className={`${styles.newsCard} ${item.featured ? styles.featured : ""}`}>
      <time className={styles.newsDate} dateTime={`${item.monthYear} ${item.day}`}>
        <span>{item.day}</span>
        <strong>{item.monthYear}</strong>
      </time>
      <div className={styles.newsContent}>
        <div className={styles.newsMeta}>
          <span>{item.source}</span>
          <span>{item.location}</span>
        </div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <a className={styles.button} href={item.href} target="_blank" rel="noopener">
          Read More
        </a>
      </div>
    </article>
  );
}

export function NewsGrid({ items }: { items: NewsItem[] }) {
  return (
    <section className={styles.newsSection} aria-labelledby="news-press-title">
      <EditorialContainer>
        <EditorialHeading
          eyebrow="In The News"
          title="News & Press"
          description="Read about how Find, Feed & Restore is impacting lives and giving families hope."
          id="news-press-title"
        />
        <div className={styles.newsGrid}>
          {items.map((item) => (
            <NewsCard item={item} key={item.href} />
          ))}
        </div>
      </EditorialContainer>
    </section>
  );
}

export function EditorialCta({ contactHref = "mailto:info@findfeedrestore.com" }: { contactHref?: string }) {
  return (
    <section className={styles.cta} aria-labelledby="editorial-cta-title">
      <div className={styles.ctaInner}>
        <span>Share The Mission</span>
        <h2 id="editorial-cta-title">Have a media inquiry or story to share?</h2>
        <p>
          Connect with Find Feed Restore to learn more about our work with families across Central
          Florida.
        </p>
        <div className={styles.actions}>
          <a className={styles.button} href={contactHref}>
            Contact Us
          </a>
          <a
            className={`${styles.button} ${styles.secondaryButton}`}
            href="https://findfeedrestore-bloom.kindful.com/"
          >
            Support Our Mission
          </a>
        </div>
      </div>
    </section>
  );
}

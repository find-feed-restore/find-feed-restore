import Image from "next/image";
import Link from "next/link";
import { HeroImagePreload } from "./hero-image-preload";
import styles from "./program-sections.module.css";

type ProgramHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  backgroundClassName: string;
  backgroundImage: string;
};

type ProgramIntroProps = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  applicationImage: {
    src: string;
    alt: string;
  };
  applicationUrl?: string;
  logoClassName?: string;
  applicationImageClassName?: string;
};

type StoryImage = {
  src: string;
  alt: string;
};

type OtherProgram = {
  title: string;
  description: string;
  href: string;
};

const donationUrl = "https://findfeedrestore-bloom.kindful.com/";
const defaultApplicationUrl = "https://app.planstreetinc.com/findfeedrestore/PublicForm";

function ProgramButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className={styles.button} href={href}>
      {children}
    </a>
  );
}

export function ProgramHero({ eyebrow, title, description, backgroundClassName, backgroundImage }: ProgramHeroProps) {
  return (
    <>
      <HeroImagePreload href={backgroundImage} />
      <section className={`${styles.hero} ${backgroundClassName}`} aria-labelledby="program-title">
        <div className={styles.heroContent}>
          <span className={styles.lightEyebrow}>{eyebrow}</span>
          <h1 id="program-title">{title}</h1>
          <p>{description}</p>
        </div>
      </section>
    </>
  );
}

export function ProgramIntro({
  eyebrow,
  title,
  paragraphs,
  logo,
  applicationImage,
  applicationUrl = defaultApplicationUrl,
  logoClassName,
  applicationImageClassName,
}: ProgramIntroProps) {
  return (
    <section className={styles.intro} aria-labelledby="program-intro-title">
      <div className={styles.introInner}>
        <div className={styles.introCopy}>
          <Image
            className={`${styles.programLogo} ${logoClassName ?? ""}`}
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
          />
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 id="program-intro-title">{title}</h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ProgramButton href={donationUrl}>Donate Today</ProgramButton>
        </div>

        <article className={styles.applicationCard}>
          <Image
            className={applicationImageClassName}
            src={applicationImage.src}
            alt={applicationImage.alt}
            width={300}
            height={300}
            sizes="(max-width: 980px) calc(100vw - 48px), 44vw"
          />
          <div className={styles.applicationCardBody}>
            <h3>Are you a family in need?</h3>
            <p>Start the process toward recovery today.</p>
            <ProgramButton href={applicationUrl}>Start Application</ProgramButton>
          </div>
        </article>
      </div>
    </section>
  );
}

export function ProgramStoryGallery({
  eyebrow,
  title,
  description,
  images,
  galleryClassName,
  video,
}: {
  eyebrow: string;
  title: string;
  description: string;
  images: StoryImage[];
  galleryClassName?: string;
  video?: {
    src: string;
    title: string;
  };
}) {
  return (
    <section className={styles.media} aria-labelledby="program-stories-title">
      <div className={styles.mediaInner}>
        <header className={styles.sectionHeading}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 id="program-stories-title">{title}</h2>
          <p>{description}</p>
        </header>
        <div className={`${styles.gallery} ${galleryClassName ?? ""}`}>
          {images.map((image) => (
            <Image
              src={image.src}
              alt={image.alt}
              width={300}
              height={300}
              sizes="(max-width: 700px) calc(100vw - 36px), (max-width: 1100px) calc(50vw - 35px), 25vw"
              key={image.src}
            />
          ))}
        </div>
        {video ? (
          <div className={styles.programVideo}>
            <iframe src={video.src} title={video.title} frameBorder="0" allowFullScreen />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function ProgramSupportCta({
  title,
  description,
  backgroundClassName,
}: {
  title: string;
  description: string;
  backgroundClassName?: string;
}) {
  return (
    <section
      className={`${styles.supportCta} ${backgroundClassName ?? ""}`}
      aria-labelledby="program-support-title"
    >
      <div className={styles.supportCtaInner}>
        <span className={styles.lightEyebrow}>How Can You Help?</span>
        <h2 id="program-support-title">{title}</h2>
        <p>{description}</p>
        <ProgramButton href={donationUrl}>Donate Today</ProgramButton>
      </div>
    </section>
  );
}

export function OtherPrograms({
  programs,
  gridClassName,
}: {
  programs: OtherProgram[];
  gridClassName?: string;
}) {
  return (
    <section className={styles.otherPrograms} aria-labelledby="other-programs-title">
      <div className={styles.otherProgramsInner}>
        <header className={styles.sectionHeading}>
          <span className={styles.eyebrow}>Explore More</span>
          <h2 id="other-programs-title">Other Programs</h2>
        </header>
        <div className={`${styles.otherProgramsGrid} ${gridClassName ?? ""}`}>
          {programs.map((program) => (
            <Link className={styles.otherProgramCard} href={program.href} key={program.title}>
              <h3>{program.title}</h3>
              <p>{program.description}</p>
              <strong>Learn More</strong>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { HeroImagePreload } from "./hero-image-preload";
import styles from "./people-sections.module.css";

type Person = {
  name: string;
  role: string;
  image: string;
  organization?: string;
};

const founders: Person[] = [
  {
    name: "Brian Broadway",
    role: "Founder & Missional Leader",
    image: "/images/people/brian-broadway.jpg",
  },
  {
    name: "Allison Broadway",
    role: "Co-Founder & Administrative Director",
    image: "/images/people/allison-broadway.jpg",
  },
];

const staff: Person[] = [
  { name: "Lisa Bishop", role: "Program Director", image: "/images/people/lisa-bishop.jpg" },
  { name: "Holly Grant", role: "Development Manager", image: "/images/people/holly-grant.jpg" },
  { name: "Jeremy Elliott", role: "Development Manager", image: "/images/people/jeremy-elliott.jpg" },
  { name: "Mia Cortes", role: "Program Coordinator", image: "/images/people/mia-cortes.jpg" },
];

const board: Person[] = [
  {
    name: "Jennifer Bachmann",
    role: "Board President & Chair",
    organization: "MasterCorp Inc.",
    image: "/images/people/jennifer-bachmann.jpg",
  },
  {
    name: "Dawn Simons",
    role: "Board Vice Chair",
    organization: "Homemaker",
    image: "/images/people/dawn-simons.jpg",
  },
  {
    name: "Lauren Narvaez",
    role: "Board Treasurer",
    organization: "Legacy Construction Inc.",
    image: "/images/people/lauren-narvaez.jpg",
  },
  {
    name: "Carolyn Scott",
    role: "Board Secretary",
    organization: "Lake Sumter College",
    image: "/images/people/carolyn-scott.jpg",
  },
  {
    name: "Mark Hughes",
    role: "Board Member",
    organization: "Retired Warden NYCDOC",
    image: "/images/people/mark-hughes.jpg",
  },
  {
    name: "Bridget Montemayor",
    role: "Board Member",
    organization: "Plains AG",
    image: "/images/people/bridget-montemayor.jpg",
  },
  {
    name: "Kelley Moring",
    role: "Board Member",
    organization: "AdventHealth",
    image: "/images/people/kelley-moring.jpg",
  },
  {
    name: "Jaime Simons",
    role: "Board Member",
    organization: "Chief Building Inspector",
    image: "/images/people/jaime-simons.jpg",
  },
  {
    name: "Kathy Smith",
    role: "Board Member",
    organization: "Former Executive Director at Community Foundation of South Lake",
    image: "/images/people/kathy-smith.jpg",
  },
  {
    name: "Brian Hughey",
    role: "Emeritus Board Member",
    image: "/images/people/brian-hughey.jpg",
  },
  {
    name: "Carlos Martinez",
    role: "Emeritus Board Member",
    image: "/images/people/carlos-martinez.jpg",
  },
];

function PersonCard({ person }: { person: Person }) {
  return (
    <article className={styles.personCard}>
      <Image
        src={person.image}
        alt={person.name}
        width={200}
        height={300}
        sizes="(max-width: 700px) 280px, 240px"
      />
      <div>
        <h3>{person.name}</h3>
        <p>{person.role}</p>
        {person.organization ? <strong>{person.organization}</strong> : null}
      </div>
    </article>
  );
}

export function PeopleHero() {
  return (
    <>
      <HeroImagePreload href="/images/unique/people-hero.webp" />
      <section className={styles.hero} aria-labelledby="people-title">
        <div className={styles.heroInner}>
          <span>About Find, Feed & Restore</span>
          <h1 id="people-title">Board & Staff Members</h1>
          <p>Meet the people helping families move toward stability, housing, and hope.</p>
        </div>
      </section>
    </>
  );
}

export function StaffSection() {
  return (
    <section className={styles.staffSection} aria-labelledby="staff-title">
      <div className={styles.peopleInner}>
        <header className={styles.sectionHeading}>
          <span>Our Team</span>
          <h2 id="staff-title">Staff</h2>
          <p>The dedicated team serving families and advancing the mission of Find, Feed & Restore.</p>
        </header>
        <div className={styles.founderGrid}>
          {founders.map((person) => <PersonCard person={person} key={person.name} />)}
        </div>
        <div className={`${styles.teamGrid} ${styles.staffGrid}`}>
          {staff.map((person) => <PersonCard person={person} key={person.name} />)}
        </div>
      </div>
    </section>
  );
}

export function BoardSection() {
  return (
    <section className={styles.boardSection} aria-labelledby="board-title">
      <div className={styles.peopleInner}>
        <header className={styles.sectionHeading}>
          <span>Leadership</span>
          <h2 id="board-title">Board Of Directors</h2>
          <p>Community leaders and partners helping guide the mission of Find, Feed & Restore.</p>
        </header>
        <div className={styles.teamGrid}>
          {board.map((person) => <PersonCard person={person} key={person.name} />)}
        </div>
      </div>
    </section>
  );
}

export function PeopleCta() {
  return (
    <section className={styles.cta} aria-labelledby="people-cta-title">
      <div className={styles.ctaInner}>
        <span>Get Involved</span>
        <h2 id="people-cta-title">Help us restore hope for families.</h2>
        <p>Your generosity helps provide housing, stability, and practical support for families with children.</p>
        <div className={styles.ctaActions}>
          <a className={styles.button} href="https://findfeedrestore-bloom.kindful.com/">
            Support Our Mission
          </a>
          <a className={`${styles.button} ${styles.secondaryButton}`} href="/volunteer/">
            Volunteer
          </a>
        </div>
      </div>
    </section>
  );
}

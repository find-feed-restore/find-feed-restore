"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./site-header.module.css";

type NavItem = {
  label: string;
  href: string;
  children?: Array<{ label: string; href: string }>;
};

const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Programs",
    href: "#",
    children: [
      { label: "Care Coach", href: "/care-coach-mobile-unit/" },
      { label: "Affordable Housing", href: "/affordable-housing/" },
      { label: "Housing First", href: "/housing-first/" },
      { label: "Homelessness Avoidance", href: "/homelessness-avoidance/" },
    ],
  },
  {
    label: "Get Involved",
    href: "#",
    children: [
      { label: "Volunteer", href: "https://greatthings.typeform.com/to/V1SK6LFX" },
      { label: "Live Here Love Here Lake", href: "/live-here-love-here-lake/" },
      { label: "Partners & Sponsors", href: "/sponsors/" },
      { label: "Donate A Trailer", href: "/we-need-trailers/" },
      { label: "Donate", href: "https://findfeedrestore-bloom.kindful.com/" },
    ],
  },
  {
    label: "Hope In Action",
    href: "#",
    children: [
      { label: "News & Media", href: "/news-media/" },
      { label: "Testimonials", href: "/testimonials/" },
      { label: "Social Media", href: "/hope-in-action/" },
    ],
  },
  { label: "Board & Staff", href: "/board-staff/" },
  { label: "Contact Us", href: "/contact-us/" },
];

function NavLink({
  item,
  light = false,
  onNavigate,
}: {
  item: NavItem;
  light?: boolean;
  onNavigate: () => void;
}) {
  if (!item.children) {
    return (
      <li className={styles.navItem}>
        <Link
          className={light ? styles.lightNavLink : styles.navLink}
          href={item.href}
          scroll={false}
          onNavigate={onNavigate}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li className={`${styles.navItem} ${styles.hasDropdown}`}>
      <button className={light ? styles.lightNavLink : styles.navLink} type="button">
        {item.label}
        <span className={styles.chevron} aria-hidden="true" />
      </button>
      <ul className={styles.dropdown}>
        {item.children.map((child) => (
          <li key={child.label}>
            <Link href={child.href} scroll={false} onNavigate={onNavigate}>
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

function DesktopNavigation({
  light = false,
  onNavigate,
}: {
  light?: boolean;
  onNavigate: () => void;
}) {
  return (
    <nav aria-label="Primary navigation">
      <ul className={styles.navList}>
        {navigation.map((item) => (
          <NavLink item={item} light={light} onNavigate={onNavigate} key={item.label} />
        ))}
      </ul>
    </nav>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 80);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const resetForNavigation = () => {
    window.scrollTo(0, 0);
    setScrolled(false);
    setMenuOpen(false);
  };

  return (
    <header className={styles.siteHeader}>
      <div className={`${styles.desktopHeader} ${scrolled ? styles.desktopHeaderScrolled : ""}`}>
        <div className={styles.desktopInner}>
          <Link
            className={styles.desktopLogo}
            href="/"
            aria-label="Find Feed Restore home"
            scroll={false}
            onNavigate={resetForNavigation}
          >
            <Image src="/images/ffr-logo.png" alt="Find Feed Restore" width={600} height={236} priority />
          </Link>
          <DesktopNavigation onNavigate={resetForNavigation} />
          <a className={styles.supportButton} href="https://findfeedrestore-bloom.kindful.com/">
            Support Our Mission
          </a>
        </div>
      </div>

      <div className={styles.tabletHeader}>
        <Link
          className={styles.tabletLogo}
          href="/"
          aria-label="Find Feed Restore home"
          scroll={false}
          onNavigate={resetForNavigation}
        >
          <Image src="/images/ffr-logo.png" alt="Find Feed Restore" width={600} height={236} priority />
        </Link>
        <DesktopNavigation light onNavigate={resetForNavigation} />
      </div>

      <div className={styles.mobileHeader}>
        <Link
          className={styles.mobileLogo}
          href="/"
          aria-label="Find Feed Restore home"
          scroll={false}
          onNavigate={resetForNavigation}
        >
          <Image src="/images/ffr-logo.png" alt="Find Feed Restore" width={600} height={236} priority />
        </Link>
        <button
          className={styles.menuToggle}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-site-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          id="mobile-site-navigation"
          aria-label="Mobile navigation"
          className={`${styles.mobileNavigation} ${menuOpen ? styles.mobileNavigationOpen : ""}`}
        >
          <ul>
            {navigation.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <details>
                    <summary>{item.label}</summary>
                    <ul>
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            scroll={false}
                            onClick={() => setMenuOpen(false)}
                            onNavigate={resetForNavigation}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link
                    href={item.href}
                    scroll={false}
                    onClick={() => setMenuOpen(false)}
                    onNavigate={resetForNavigation}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

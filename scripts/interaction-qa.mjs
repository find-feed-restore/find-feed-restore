import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright-core";

const routeArgument = process.argv[2] ?? "/";
const route = `/${routeArgument.replace(/^\/+|\/+$/g, "")}${routeArgument === "/" ? "" : "/"}`;
const localBaseUrl = process.env.VISUAL_QA_LOCAL_URL ?? "http://localhost:3002/";
const localUrl = new URL(route, localBaseUrl).href;
const routeKey = route === "/" ? null : route.replaceAll("/", "");
const outputDirectory = path.resolve(
  process.cwd(),
  routeKey ? path.join(".visual-qa", "routes", routeKey) : ".visual-qa",
);
const programPageExpectations = {
  "/affordable-housing/": {
    name: "Affordable Housing",
    links: [
      "https://findfeedrestore-bloom.kindful.com/",
      "https://app.planstreetinc.com/findfeedrestore/PublicForm",
      "/care-coach-mobile-unit",
      "/homelessness-avoidance",
      "/housing-first",
    ],
  },
  "/housing-first/": {
    name: "Housing First",
    links: [
      "https://findfeedrestore-bloom.kindful.com/",
      "https://app.planstreetinc.com/findfeedrestore/PublicForm",
      "/affordable-housing",
      "/homelessness-avoidance",
      "/care-coach-mobile-unit",
    ],
  },
  "/homelessness-avoidance/": {
    name: "Homelessness Avoidance",
    links: [
      "https://findfeedrestore-bloom.kindful.com/",
      "https://app.planstreetinc.com/findfeedrestore/PublicForm",
      "/affordable-housing",
      "/care-coach-mobile-unit",
      "/housing-first",
    ],
  },
  "/care-coach-mobile-unit/": {
    name: "Care Coach",
    links: [
      "https://findfeedrestore-bloom.kindful.com/",
      "https://greatthings.typeform.com/to/ZZkgIj",
      "/affordable-housing",
      "/homelessness-avoidance",
      "/housing-first",
    ],
  },
};
const chromeCandidates = [
  process.env.PLAYWRIGHT_CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

async function findChrome() {
  for (const candidate of chromeCandidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Try the next conventional installation path.
    }
  }
  throw new Error("No supported Chrome/Chromium executable was found.");
}

async function loadPage(page) {
  await page.goto(localUrl, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => undefined);
}

async function main() {
  await mkdir(outputDirectory, { recursive: true });
  const browser = await chromium.launch({
    executablePath: await findChrome(),
    headless: true,
    args: ["--mute-audio"],
  });
  const checks = [];
  const check = (name, passed, details) => checks.push({ name, passed, details });

  try {
    const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const desktop = await desktopContext.newPage();
    await loadPage(desktop);
    await desktop.evaluate(() => document.fonts.ready);

    const siteHeader = desktop.getByRole("banner");
    const initialHeader = await siteHeader.boundingBox();
    await desktop.evaluate(() => window.scrollTo(0, 200));
    await desktop.waitForTimeout(550);
    const scrolledHeader = await siteHeader.boundingBox();
    check(
      "desktop sticky header",
      initialHeader?.height > scrolledHeader?.height && Math.round(scrolledHeader?.y ?? -1) === 0,
      { initialHeight: initialHeader?.height, scrolledHeight: scrolledHeader?.height, top: scrolledHeader?.y },
    );

    await desktop.evaluate(() => window.scrollTo(0, 0));
    const programsButton = desktop.getByRole("button", { name: "Programs" }).first();
    await programsButton.hover();
    await desktop.waitForTimeout(250);
    const dropdown = programsButton.locator("xpath=..").locator("ul");
    check("desktop navigation dropdown", await dropdown.isVisible(), await dropdown.getAttribute("class"));

    await desktop.keyboard.press("Tab");
    const focusOutline = await desktop.evaluate(() => {
      const active = document.activeElement;
      const style = active ? getComputedStyle(active) : null;
      return { tag: active?.tagName, outlineWidth: style?.outlineWidth, outlineStyle: style?.outlineStyle };
    });
    check("keyboard focus treatment", focusOutline.outlineWidth === "3px", focusOutline);

    if (route === "/care-coach-mobile-unit/") {
      const mediaFrame = desktop.locator('iframe[title="Care Coach Video"]');
      const mediaRect = await mediaFrame.boundingBox();
      check(
        "Care Coach desktop media geometry",
        Math.round(mediaRect?.width ?? 0) === 1280 && Math.round(mediaRect?.height ?? 0) === 620,
        mediaRect,
      );
      await mediaFrame.focus();
      check(
        "Care Coach media keyboard focus",
        await mediaFrame.evaluate((element) => document.activeElement === element),
        await mediaFrame.getAttribute("title"),
      );
    }

    for (const width of [1440, 1181, 1025]) {
      await desktop.setViewportSize({ width, height: 900 });
      await desktop.waitForTimeout(100);
      const itemRects = await desktop
        .getByRole("navigation", { name: "Primary navigation" })
        .first()
        .locator(":scope > ul > li")
        .evaluateAll((items) =>
          items.map((item) => {
            const bounds = item.getBoundingClientRect();
            return { top: Math.round(bounds.top), right: Math.round(bounds.right) };
          }),
        );
      const tops = new Set(itemRects.map((item) => item.top));
      check(`desktop navigation single row at ${width}px`, tops.size === 1, itemRects);
    }
    if (route === "/news-media/") {
      await desktop.setViewportSize({ width: 1440, height: 900 });
      const firstNewsCard = desktop.locator("main article").first();
      const restingTransform = await firstNewsCard.evaluate((element) => getComputedStyle(element).transform);
      await firstNewsCard.hover();
      await desktop.waitForTimeout(350);
      const hoveredTransform = await firstNewsCard.evaluate((element) => getComputedStyle(element).transform);
      check(
        "News card hover lift",
        restingTransform === "none" && hoveredTransform !== "none",
        { restingTransform, hoveredTransform },
      );
    }
    if (route === "/testimonials/") {
      await desktop.setViewportSize({ width: 1440, height: 900 });
      const firstVideoCard = desktop.locator("main article").first();
      const restingTransform = await firstVideoCard.evaluate((element) => getComputedStyle(element).transform);
      await firstVideoCard.hover();
      await desktop.waitForTimeout(350);
      const hoveredTransform = await firstVideoCard.evaluate((element) => getComputedStyle(element).transform);
      check(
        "Testimonial card hover lift",
        restingTransform === "none" && hoveredTransform !== "none",
        { restingTransform, hoveredTransform },
      );
    }
    if (route === "/contact-us/") {
      await desktop.setViewportSize({ width: 1440, height: 900 });
      const firstConnectionCard = desktop.locator("main article").nth(1);
      const restingTransform = await firstConnectionCard.evaluate(
        (element) => getComputedStyle(element).transform,
      );
      await firstConnectionCard.hover();
      await desktop.waitForTimeout(350);
      const hoveredTransform = await firstConnectionCard.evaluate(
        (element) => getComputedStyle(element).transform,
      );
      check(
        "Contact action-card hover lift",
        restingTransform === "none" && hoveredTransform !== "none",
        { restingTransform, hoveredTransform },
      );
    }
    if (route === "/board-staff/") {
      await desktop.setViewportSize({ width: 1440, height: 900 });
      const personCards = desktop.locator("main article");
      const restingTransform = await personCards.first().evaluate(
        (element) => getComputedStyle(element).transform,
      );
      await personCards.first().hover();
      await desktop.waitForTimeout(300);
      const hoveredTransform = await personCards.first().evaluate(
        (element) => getComputedStyle(element).transform,
      );
      check(
        "Board and staff cards remain static",
        (await personCards.count()) === 17 && restingTransform === "none" && hoveredTransform === "none",
        { count: await personCards.count(), restingTransform, hoveredTransform },
      );
    }
    if (route === "/sponsors/") {
      await desktop.setViewportSize({ width: 1440, height: 900 });
      const firstSponsor = desktop.locator("main a").filter({ has: desktop.locator("img") }).first();
      const firstLogo = firstSponsor.locator("img");
      const resting = await firstSponsor.evaluate((element) => ({
        transform: getComputedStyle(element).transform,
        logoFilter: getComputedStyle(element.querySelector("img")).filter,
        logoOpacity: getComputedStyle(element.querySelector("img")).opacity,
      }));
      await firstSponsor.hover();
      await desktop.waitForTimeout(350);
      const hovered = await firstSponsor.evaluate((element) => ({
        transform: getComputedStyle(element).transform,
        logoFilter: getComputedStyle(element.querySelector("img")).filter,
        logoOpacity: getComputedStyle(element.querySelector("img")).opacity,
      }));
      await firstSponsor.focus();
      const sponsorFocus = await firstSponsor.evaluate((element) => ({
        focused: document.activeElement === element,
        outlineWidth: getComputedStyle(element).outlineWidth,
      }));
      check(
        "Sponsor tile hover and focus treatment",
        resting.transform === "none" &&
          resting.logoFilter !== "none" &&
          resting.logoOpacity === "0.82" &&
          hovered.transform !== "none" &&
          hovered.logoFilter === "none" &&
          hovered.logoOpacity === "1" &&
          sponsorFocus.focused &&
          sponsorFocus.outlineWidth === "3px" &&
          (await firstLogo.count()) === 1,
        { resting, hovered, sponsorFocus },
      );
    }
    if (route === "/live-here-love-here-lake/") {
      await desktop.setViewportSize({ width: 1440, height: 900 });
      const firstCampaignSponsor = desktop.getByRole("link", { name: "Visit Denise Calderon CPA" });
      const restingTransform = await firstCampaignSponsor.evaluate(
        (element) => getComputedStyle(element).transform,
      );
      await firstCampaignSponsor.hover();
      await desktop.waitForTimeout(350);
      const hoveredTransform = await firstCampaignSponsor.evaluate(
        (element) => getComputedStyle(element).transform,
      );
      await firstCampaignSponsor.focus();
      const focus = await firstCampaignSponsor.evaluate((element) => ({
        focused: document.activeElement === element,
        outlineWidth: getComputedStyle(element).outlineWidth,
      }));
      check(
        "Live Here sponsor hover and focus treatment",
        restingTransform === "none" && hoveredTransform !== "none" && focus.focused && focus.outlineWidth === "3px",
        { restingTransform, hoveredTransform, focus },
      );
    }

    await desktop.setViewportSize({ width: 1440, height: 900 });
    await desktop.evaluate(() => window.scrollTo(0, 0));
    await desktop.waitForTimeout(550);
    const navigationTarget = route === "/contact-us/" ? "Board & Staff" : "Contact Us";
    await desktop.getByRole("link", { name: navigationTarget, exact: true }).first().click();
    await desktop.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => undefined);
    await desktop.waitForTimeout(550);
    const navigationHeader = await desktop.getByRole("banner").boundingBox();
    const navigationPosition = await desktop.evaluate(() => window.scrollY);
    check(
      "header navigation starts at full-size page top",
      navigationPosition === 0 && Math.round(navigationHeader?.height ?? 0) === Math.round(initialHeader?.height ?? -1),
      {
        destination: desktop.url(),
        scrollY: navigationPosition,
        initialHeight: initialHeader?.height,
        navigationHeight: navigationHeader?.height,
      },
    );
    await desktopContext.close();

    const mobileContext = await browser.newContext({ viewport: { width: 390, height: 900 } });
    const mobile = await mobileContext.newPage();
    await loadPage(mobile);
    if (route === "/care-coach-mobile-unit/") {
      const mobileMediaRect = await mobile.locator('iframe[title="Care Coach Video"]').boundingBox();
      check(
        "Care Coach mobile media geometry",
        Math.round(mobileMediaRect?.x ?? -1) === 18 &&
          Math.round(mobileMediaRect?.width ?? 0) === 354 &&
          Math.round(mobileMediaRect?.height ?? 0) === 260 &&
          Math.round((mobileMediaRect?.x ?? 0) + (mobileMediaRect?.width ?? 0)) <= 390,
        mobileMediaRect,
      );
    }
    if (route === "/testimonials/") {
      const mobileCards = await mobile.locator("main article").evaluateAll((cards) =>
        cards.map((card) => {
          const bounds = card.getBoundingClientRect();
          return { x: bounds.x, width: bounds.width, right: bounds.right };
        }),
      );
      check(
        "Testimonial mobile cards do not overflow",
        mobileCards.length === 3 &&
          mobileCards.every((card) => Math.round(card.x) === 18 && Math.round(card.right) === 372),
        mobileCards,
      );
    }
    if (route === "/contact-us/") {
      const mobileSections = await mobile.locator("main > section").evaluateAll((sections) =>
        sections.map((section) => {
          const bounds = section.getBoundingClientRect();
          return { x: bounds.x, width: bounds.width, right: bounds.right };
        }),
      );
      check(
        "Contact mobile sections do not overflow",
        mobileSections.length === 5 &&
          mobileSections.every((section) => Math.round(section.x) === 0 && Math.round(section.right) === 390),
        mobileSections,
      );
    }
    if (route === "/board-staff/") {
      const mobileCards = await mobile.locator("main article").evaluateAll((cards) =>
        cards.map((card) => {
          const bounds = card.getBoundingClientRect();
          return { x: bounds.x, width: bounds.width, right: bounds.right };
        }),
      );
      check(
        "Board and staff mobile cards do not overflow",
        mobileCards.length === 17 &&
          mobileCards.every((card) => card.x >= 0 && Math.round(card.right) <= 390),
        mobileCards,
      );
    }
    if (route === "/sponsors/") {
      const mobileTiles = await mobile.locator("main a").filter({ has: mobile.locator("img") }).evaluateAll((tiles) =>
        tiles.map((tile) => {
          const bounds = tile.getBoundingClientRect();
          return { x: bounds.x, width: bounds.width, right: bounds.right };
        }),
      );
      check(
        "Sponsor mobile tiles do not overflow",
        mobileTiles.length === 18 &&
          mobileTiles.every((tile) => tile.x >= 0 && Math.round(tile.right) <= 390),
        mobileTiles,
      );
    }
    if (route === "/live-here-love-here-lake/") {
      const campaignLogoCards = await mobile
        .locator('main img:not([alt="Live Here Love Here Lake"]):not([alt=""])')
        .evaluateAll((images) =>
          images.map((image) => {
            const bounds = image.parentElement.getBoundingClientRect();
            return { x: bounds.x, width: bounds.width, right: bounds.right };
          }),
        );
      check(
        "Live Here mobile logo cards do not overflow",
        campaignLogoCards.length === 29 &&
          campaignLogoCards.every((card) => card.x >= 0 && Math.round(card.right) <= 390),
        campaignLogoCards,
      );
    }
    const menuToggle = mobile.locator('button[aria-controls="mobile-site-navigation"]');
    await menuToggle.click();
    const mobileNavigation = mobile.getByRole("navigation", { name: "Mobile navigation" });
    await mobileNavigation.waitFor({ state: "visible" });
    check(
      "mobile navigation opens",
      (await menuToggle.getAttribute("aria-expanded")) === "true" && (await mobileNavigation.isVisible()),
      { expanded: await menuToggle.getAttribute("aria-expanded") },
    );
    await menuToggle.click();
    check(
      "mobile navigation closes",
      (await menuToggle.getAttribute("aria-expanded")) === "false",
      { expanded: await menuToggle.getAttribute("aria-expanded") },
    );
    await mobileContext.close();

    const reducedContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const reduced = await reducedContext.newPage();
    await loadPage(reduced);
    await reduced.waitForTimeout(250);
    if (route === "/") {
      const counterValues = await reduced.locator("article").filter({ hasText: /Families Housed|Children Housed|People Housed/ }).allTextContents();
      check(
        "reduced-motion counters",
        ["191", "349", "498"].every((value) => counterValues.some((text) => text.includes(value))),
        counterValues,
      );
    }

    const donationHref = await reduced.locator('a[aria-label="Donate now"]').getAttribute("href");
    check(
      "floating donation control",
      donationHref === "https://findfeedrestore-bloom.kindful.com/",
      donationHref,
    );

    const emptyLinks = await reduced.locator("a").evaluateAll((links) =>
      links
        .map((link) => ({
          text: link.textContent.trim(),
          href: link.getAttribute("href"),
          providerControlled: link.classList.contains("jcr-post-primary-link"),
        }))
        .filter(
          (link) =>
            (!link.href || link.href === "#") &&
            !link.providerControlled,
        ),
    );
    check(`${route} links have destinations`, emptyLinks.length === 0, emptyLinks);

    const programPage = programPageExpectations[route];
    if (programPage) {
      const hrefs = await reduced.locator("main a").evaluateAll((links) =>
        links.map((link) => link.getAttribute("href")),
      );
      check(
        `${programPage.name} CTA and program links`,
        programPage.links.every((href) => hrefs.includes(href)),
        hrefs,
      );
      check(
        `${programPage.name} semantic heading`,
        (await reduced.getByRole("heading", { level: 1, name: programPage.name }).count()) === 1,
        await reduced.locator("main h1").allTextContents(),
      );
    }

    if (route === "/news-media/") {
      const articleLinks = reduced.locator("main article a");
      const articleLinkContracts = await articleLinks.evaluateAll((links) =>
        links.map((link) => ({
          href: link.getAttribute("href"),
          target: link.getAttribute("target"),
          rel: link.getAttribute("rel"),
        })),
      );
      check(
        "News external article links",
        articleLinkContracts.length === 15 &&
          articleLinkContracts.every(
            (link) => link.href?.startsWith("https://") && link.target === "_blank" && link.rel === "noopener",
          ),
        articleLinkContracts,
      );
      const mainHrefs = await reduced.locator("main a").evaluateAll((links) =>
        links.map((link) => link.getAttribute("href")),
      );
      check(
        "News media-inquiry CTA destinations",
        mainHrefs.includes("mailto:info@findfeedrestore.com") &&
          mainHrefs.includes("https://findfeedrestore-bloom.kindful.com/"),
        mainHrefs,
      );
      check(
        "News semantic heading",
        (await reduced
          .getByRole("heading", { level: 1, name: "Stories, Press & Community Impact" })
          .count()) === 1,
        await reduced.locator("main h1").allTextContents(),
      );
    }

    if (route === "/testimonials/") {
      const videoButtons = reduced.locator('main button[data-youtube-id]');
      const buttonContracts = await videoButtons.evaluateAll((buttons) =>
        buttons.map((button) => ({
          id: button.getAttribute("data-youtube-id"),
          start: button.getAttribute("data-start"),
          label: button.getAttribute("aria-label"),
        })),
      );
      check(
        "Testimonial thumbnail contracts",
        JSON.stringify(buttonContracts) ===
          JSON.stringify([
            { id: "69VFG8OXVAs", start: null, label: "Play Find, Feed & Restore Is Changing Lives" },
            { id: "3OEgOEgOsSA", start: null, label: "Play Community Support In Action" },
            { id: "C4Gta9eC0Ho", start: "95", label: "Play Families Moving From Homeless To Hopeful" },
          ]),
        buttonContracts,
      );

      const firstButton = videoButtons.first();
      const initialMediaRect = await firstButton.boundingBox();
      await firstButton.focus();
      const buttonFocused = await firstButton.evaluate((element) => document.activeElement === element);
      await firstButton.press("Enter");
      const testimonialFrame = reduced.locator('main iframe[title="Play Find, Feed & Restore Is Changing Lives"]');
      await testimonialFrame.waitFor({ state: "visible" });
      const activeMediaRect = await testimonialFrame.boundingBox();
      const frameContract = {
        src: await testimonialFrame.getAttribute("src"),
        allow: await testimonialFrame.getAttribute("allow"),
        allowFullscreen: await testimonialFrame.getAttribute("allowfullscreen"),
        articleFrames: await reduced.locator("main article").first().locator("iframe").count(),
      };
      check(
        "Testimonial keyboard activation and in-card iframe geometry",
        buttonFocused &&
          Math.abs((initialMediaRect?.width ?? 0) - (activeMediaRect?.width ?? 0)) < 1 &&
          Math.abs((initialMediaRect?.height ?? 0) - (activeMediaRect?.height ?? 0)) < 1 &&
          frameContract.articleFrames === 1,
        { buttonFocused, initialMediaRect, activeMediaRect, frameContract },
      );
      check(
        "Testimonial YouTube and fullscreen contract",
        frameContract.src === "https://www.youtube.com/embed/69VFG8OXVAs?autoplay=1&rel=0" &&
          frameContract.allow ===
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" &&
          frameContract.allowFullscreen !== null,
        frameContract,
      );

      await reduced.waitForTimeout(3500);
      const testimonialProviderFrame = reduced.frames().find((frame) =>
        frame.url().includes("youtube.com/embed/69VFG8OXVAs"),
      );
      let testimonialPlayback = { providerLoaded: false, playing: false, paused: false };
      if (testimonialProviderFrame) {
        testimonialPlayback.providerLoaded = true;
        const providerVideo = testimonialProviderFrame.locator("video").first();
        testimonialPlayback.playing = await providerVideo
          .evaluate((video) => !video.paused && video.currentTime > 0)
          .catch(() => false);
        if (!testimonialPlayback.playing) {
          const providerPlayButton = testimonialProviderFrame
            .getByRole("button", { name: "Play video" })
            .first();
          if (await providerPlayButton.isVisible().catch(() => false)) {
            await providerPlayButton.click({ force: true }).catch(() => undefined);
          }
          await providerVideo.evaluate((video) => void video.play()).catch(() => undefined);
          await reduced.waitForTimeout(500);
          testimonialPlayback.playing = await providerVideo
            .evaluate((video) => !video.paused)
            .catch(() => false);
        }
        await providerVideo.evaluate((video) => video.pause()).catch(() => undefined);
        await reduced.waitForTimeout(300);
        testimonialPlayback.paused = await providerVideo
          .evaluate((video) => video.paused)
          .catch(() => false);
      }
      check(
        "Testimonial provider play and pause",
        testimonialPlayback.providerLoaded && testimonialPlayback.playing && testimonialPlayback.paused,
        testimonialPlayback,
      );

      const testimonialHrefs = await reduced.locator("main a").evaluateAll((links) =>
        links.map((link) => link.getAttribute("href")),
      );
      check(
        "Testimonial CTA destinations",
        testimonialHrefs.includes("/contact-us") &&
          testimonialHrefs.includes("https://findfeedrestore-bloom.kindful.com/"),
        testimonialHrefs,
      );
      check(
        "Testimonial semantic heading",
        (await reduced
          .getByRole("heading", { level: 1, name: "Lives Changed. Communities Strengthened." })
          .count()) === 1,
        await reduced.locator("main h1").allTextContents(),
      );
    }

    if (route === "/contact-us/") {
      const formContract = {
        forms: await reduced.locator("main form").count(),
        fields: await reduced.locator("main input, main textarea, main select").count(),
        submitControls: await reduced.locator('main button[type="submit"], main input[type="submit"]').count(),
        maps: await reduced.locator("main iframe").count(),
      };
      check(
        "Contact production has no form or map backend",
        Object.values(formContract).every((count) => count === 0),
        formContract,
      );

      const contactLinks = await reduced.locator("main a").evaluateAll((links) =>
        links.map((link) => ({
          text: link.textContent.trim(),
          href: link.getAttribute("href"),
          target: link.getAttribute("target"),
          rel: link.getAttribute("rel"),
          tabIndex: link.tabIndex,
        })),
      );
      const linkByHref = Object.fromEntries(contactLinks.map((link) => [link.href, link]));
      check(
        "Contact phone and email links",
        linkByHref["tel:18662362983"]?.tabIndex === 0 &&
          linkByHref["mailto:info@findfeedrestore.com"]?.tabIndex === 0,
        {
          phone: linkByHref["tel:18662362983"],
          email: linkByHref["mailto:info@findfeedrestore.com"],
        },
      );
      check(
        "Contact external service contracts",
        linkByHref["https://app.planstreetinc.com/findfeedrestore/PublicForm"]?.target === null &&
          linkByHref["/volunteer/"]?.target === null &&
          linkByHref["https://findfeedrestore-bloom.kindful.com/"]?.target === "_blank" &&
          linkByHref["https://findfeedrestore-bloom.kindful.com/"]?.rel === "noopener" &&
          linkByHref["/live-here-love-here-lake/"]?.target === null,
        contactLinks,
      );
      check(
        "Contact semantic heading",
        (await reduced.getByRole("heading", { level: 1, name: "Contact Us" }).count()) === 1,
        await reduced.locator("main h1").allTextContents(),
      );
    }

    if (route === "/board-staff/") {
      const peopleContract = {
        cards: await reduced.locator("main article").count(),
        portraits: await reduced.locator("main article img").count(),
        missingAlt: await reduced.locator('main article img[alt=""]').count(),
        profileLinks: await reduced.locator("main article a").count(),
        headings: await reduced.locator("main h1, main h2").allTextContents(),
        hrefs: await reduced.locator("main a").evaluateAll((links) =>
          links.map((link) => link.getAttribute("href")),
        ),
      };
      check(
        "Board and staff identity and static-card contract",
        peopleContract.cards === 17 &&
          peopleContract.portraits === 17 &&
          peopleContract.missingAlt === 0 &&
          peopleContract.profileLinks === 0,
        peopleContract,
      );
      check(
        "Board and staff CTA destinations",
        peopleContract.hrefs.includes("https://findfeedrestore-bloom.kindful.com/") &&
          peopleContract.hrefs.includes("/volunteer/"),
        peopleContract.hrefs,
      );
      check(
        "Board and staff semantic headings",
        (await reduced
          .getByRole("heading", { level: 1, name: "Board & Staff Members" })
          .count()) === 1 &&
          peopleContract.headings.includes("Staff") &&
          peopleContract.headings.includes("Board Of Directors"),
        peopleContract.headings,
      );
    }

    if (route === "/volunteer/") {
      const volunteerContract = {
        h1: await reduced.locator("main h1").allTextContents(),
        images: await reduced.locator("main img").count(),
        formLinks: await reduced.locator('main a[href="https://greatthings.typeform.com/to/V1SK6LFX"]').evaluateAll(
          (links) => links.map((link) => ({ target: link.getAttribute("target"), rel: link.getAttribute("rel") })),
        ),
      };
      check(
        "Volunteer page and Typeform CTA contract",
        volunteerContract.h1.length === 1 &&
          volunteerContract.images === 2 &&
          volunteerContract.formLinks.length === 3 &&
          volunteerContract.formLinks.every(
            (link) => link.target === "_blank" && link.rel === "noopener noreferrer",
          ),
        volunteerContract,
      );
    }

    if (route === "/sponsors/") {
      const sponsorLinks = await reduced.locator("main a").filter({ has: reduced.locator("img") }).evaluateAll((links) =>
        links.map((link) => ({
          href: link.getAttribute("href"),
          target: link.getAttribute("target"),
          rel: link.getAttribute("rel"),
          label: link.getAttribute("aria-label"),
          alt: link.querySelector("img")?.getAttribute("alt"),
        })),
      );
      const sponsorHrefs = await reduced.locator("main a").evaluateAll((links) =>
        links.map((link) => link.getAttribute("href")),
      );
      check(
        "Sponsor identity and external-link contract",
        sponsorLinks.length === 18 &&
          sponsorLinks.every(
            (link) =>
              link.href?.startsWith("https://") &&
              link.target === "_blank" &&
              link.rel === "noopener" &&
              link.label?.startsWith("Visit ") &&
              Boolean(link.alt),
          ),
        sponsorLinks,
      );
      check(
        "Sponsors support CTA destination",
        sponsorHrefs.includes("https://findfeedrestore-bloom.kindful.com/"),
        sponsorHrefs,
      );
      check(
        "Sponsors semantic heading",
        (await reduced
          .getByRole("heading", { level: 1, name: "Community Leaders Helping Families Find Home" })
          .count()) === 1,
        await reduced.locator("main h1").allTextContents(),
      );
    }

    if (route === "/live-here-love-here-lake/") {
      const campaignSponsorLinks = await reduced
        .locator('main a[aria-label^="Visit "]')
        .evaluateAll((links) =>
          links.map((link) => ({
            href: link.getAttribute("href"),
            target: link.getAttribute("target"),
            rel: link.getAttribute("rel"),
            label: link.getAttribute("aria-label"),
            alt: link.querySelector("img")?.getAttribute("alt"),
          })),
        );
      const campaignLinks = await reduced.locator("main a").evaluateAll((links) =>
        links.map((link) => ({
          text: link.textContent.trim(),
          href: link.getAttribute("href"),
          target: link.getAttribute("target"),
          rel: link.getAttribute("rel"),
        })),
      );
      const partnerLinks = campaignLinks.filter((link) => link.href === "https://greatthings.typeform.com/to/JLL8BMEH?typeform-source=link.edgepilot.com");
      check(
        "Live Here sponsor identity and external-link contract",
        campaignSponsorLinks.length === 27 &&
          campaignSponsorLinks.every(
            (link) =>
              link.href?.startsWith("https://") &&
              link.target === "_blank" &&
              link.rel === "noopener" &&
              link.label?.startsWith("Visit ") &&
              Boolean(link.alt),
          ) &&
          (await reduced.locator('main img[alt="Kiwanis"]').count()) === 1 &&
          (await reduced.locator('main img[alt="Southern Home Specialists"]').count()) === 1,
        campaignSponsorLinks,
      );
      check(
        "Live Here campaign CTA destinations",
        partnerLinks.length === 2 &&
          partnerLinks.some((link) => link.target === "_blank" && link.rel === "noopener") &&
          partnerLinks.some((link) => link.target === null && link.rel === null) &&
          campaignLinks.some(
            (link) =>
              link.href === "https://www.youtube.com/watch?v=69VFG8OXVAs" &&
              link.target === "_blank" &&
              link.rel === "noopener",
          ),
        campaignLinks,
      );

      const campaignVideo = reduced.locator("main video");
      const campaignPoster = reduced.getByRole("button", { name: "Play Video about movie-poster-ffr" });
      const initialVideoRect = await campaignVideo.boundingBox();
      const initialPosterRect = await campaignPoster.boundingBox();
      const mediaContract = await campaignVideo.evaluate((video) => ({
        src: video.getAttribute("src"),
        controls: video.controls,
        preload: video.preload,
        controlsList: video.getAttribute("controlsList"),
        autoplay: video.autoplay,
        muted: video.muted,
        loop: video.loop,
        playsInline: video.playsInline,
      }));
      await campaignPoster.focus();
      const posterFocused = await campaignPoster.evaluate((element) => document.activeElement === element);
      await campaignPoster.press("Enter");
      await reduced.waitForTimeout(750);
      const playing = await campaignVideo.evaluate((video) => !video.paused && video.currentTime > 0);
      await campaignVideo.evaluate((video) => video.pause());
      const paused = await campaignVideo.evaluate((video) => video.paused);
      check(
        "Live Here hosted-video source and geometry contract",
        mediaContract.src === "/images/campaigns/live-here-love-here/keller-williams-volunteer-day.mp4" &&
          mediaContract.controls &&
          mediaContract.preload === "metadata" &&
          mediaContract.controlsList === "nodownload" &&
          !mediaContract.autoplay &&
          !mediaContract.muted &&
          !mediaContract.loop &&
          !mediaContract.playsInline &&
          Math.abs((initialVideoRect?.width ?? 0) - (initialPosterRect?.width ?? 0)) < 1 &&
          Math.abs((initialVideoRect?.height ?? 0) - (initialPosterRect?.height ?? 0)) < 1,
        { mediaContract, initialVideoRect, initialPosterRect },
      );
      check(
        "Live Here hosted-video keyboard play and pause",
        posterFocused && playing && paused && (await campaignPoster.count()) === 0,
        { posterFocused, playing, paused },
      );
      check(
        "Live Here semantic heading",
        (await reduced
          .getByRole("heading", { level: 1, name: "Local Businesses Helping Families Find Home" })
          .count()) === 1,
        await reduced.locator("main h1").allTextContents(),
      );
    }

    if (route === "/care-coach-mobile-unit/") {
      const mediaFrame = reduced.locator('iframe[title="Care Coach Video"]');
      const mediaContract = {
        src: await mediaFrame.getAttribute("src"),
        title: await mediaFrame.getAttribute("title"),
        allowFullscreen: await mediaFrame.getAttribute("allowfullscreen"),
        loading: await mediaFrame.getAttribute("loading"),
        allow: await mediaFrame.getAttribute("allow"),
      };
      check(
        "Care Coach YouTube source and playback contract",
        mediaContract.src === "https://www.youtube.com/embed/SonlnoRUCQg" &&
          mediaContract.title === "Care Coach Video" &&
          mediaContract.allowFullscreen !== null &&
          mediaContract.loading === null &&
          mediaContract.allow === null &&
          !mediaContract.src.includes("autoplay="),
        mediaContract,
      );

      const providerFrame = reduced.frames().find((frame) =>
        frame.url().includes("youtube.com/embed/SonlnoRUCQg"),
      );
      let playback = { playVisible: false, controlActivated: false, playing: false, paused: false };
      if (providerFrame) {
        await reduced.waitForTimeout(3500);
        const playButton = providerFrame.getByRole("button", { name: "Play video" }).first();
        playback.playVisible = await playButton.isVisible().catch(() => false);
        if (playback.playVisible) {
          playback.controlActivated = await playButton
            .click({ force: true })
            .then(() => true)
            .catch(() => false);
          await providerFrame
            .waitForFunction(
              () => Array.from(document.querySelectorAll("video")).some((video) => !video.paused && video.currentTime > 0),
              undefined,
              { timeout: 10_000 },
            )
            .catch(() => undefined);
          playback.playing = await providerFrame
            .locator("video")
            .evaluateAll((videos) => videos.some((video) => !video.paused && video.currentTime > 0))
            .catch(() => false);
          const providerVideo = providerFrame.locator("video").first();
          if (!playback.playing) {
            await providerVideo.evaluate((video) => {
              void video.play();
            }).catch(() => undefined);
            await reduced.waitForTimeout(400);
            playback.playing = await providerVideo
              .evaluate((video) => !video.paused)
              .catch(() => false);
          }
          await providerVideo.evaluate((video) => video.pause()).catch(() => undefined);
          await reduced.waitForTimeout(400);
          playback.paused = await providerVideo
            .evaluate((video) => video.paused)
            .catch(() => false);
        }
      }
      check(
        "Care Coach muted media play and pause controls",
        playback.playVisible && playback.controlActivated && playback.playing && playback.paused,
        playback,
      );
    }
    await reducedContext.close();
  } finally {
    await browser.close();
  }

  await writeFile(path.join(outputDirectory, "interactions.json"), `${JSON.stringify(checks, null, 2)}\n`);
  console.table(checks);
  if (checks.some((check) => !check.passed)) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

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
    await desktop.goto(localUrl, { waitUntil: "networkidle" });
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
    await desktopContext.close();

    const mobileContext = await browser.newContext({ viewport: { width: 390, height: 900 } });
    const mobile = await mobileContext.newPage();
    await mobile.goto(localUrl, { waitUntil: "networkidle" });
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
    await reduced.goto(localUrl, { waitUntil: "networkidle" });
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
        .map((link) => ({ text: link.textContent.trim(), href: link.getAttribute("href") }))
        .filter((link) => !link.href || link.href === "#"),
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
        articleLinkContracts.length === 11 &&
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
        testimonialHrefs.includes("/contact-us/") &&
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

import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright-core";

const canonicalRoutes = [
  "/",
  "/affordable-housing/",
  "/housing-first/",
  "/homelessness-avoidance/",
  "/care-coach-mobile-unit/",
  "/news-media/",
  "/testimonials/",
  "/contact-us/",
  "/board-staff/",
  "/sponsors/",
  "/live-here-love-here-lake/",
  "/we-need-trailers/",
  "/hope-in-action/",
  "/volunteer/",
  "/terms-conditions/",
  "/privacy-policy/",
];
const routes = process.env.CERTIFICATION_ROUTES
  ? process.env.CERTIFICATION_ROUTES.split(",").map((route) => route.trim()).filter(Boolean)
  : canonicalRoutes;
const widths = process.env.CERTIFICATION_WIDTHS
  ? process.env.CERTIFICATION_WIDTHS.split(",").map(Number)
  : [430, 390, 375, 360, 320];
const baseUrl = process.env.CERTIFICATION_LOCAL_URL ?? "http://localhost:3002/";
const outputPath = path.resolve(".visual-qa/certification/mobile-interactions.json");
const chromeCandidates = [
  process.env.PLAYWRIGHT_CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
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

function roundedRect(bounds) {
  if (!bounds) return null;
  const x = Math.round(bounds.x);
  const y = Math.round(bounds.y);
  const width = Math.round(bounds.width);
  const height = Math.round(bounds.height);
  return { x, y, width, height, top: y, right: x + width, bottom: y + height, left: x };
}

async function inspectLayout(page, route, width) {
  return page.evaluate(
    ({ currentRoute, viewportWidth }) => {
      const visible = (element) => {
        if (!element) return false;
        const style = getComputedStyle(element);
        const bounds = element.getBoundingClientRect();
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          !element.closest('[aria-hidden="true"]') &&
          bounds.width > 1 &&
          bounds.height > 1
        );
      };
      const rect = (element) => {
        if (!element) return null;
        const bounds = element.getBoundingClientRect();
        return Object.fromEntries(
          ["x", "y", "width", "height", "top", "right", "bottom", "left"].map((key) => [
            key,
            Math.round(bounds[key]),
          ]),
        );
      };
      const contained = (element) => {
        const bounds = element.getBoundingClientRect();
        return bounds.left >= -1 && bounds.right <= viewportWidth + 1;
      };
      const header = document.querySelector("header");
      const mobileHeader = header?.querySelector('[class*="mobileHeader"]');
      const logo = mobileHeader?.querySelector("a img");
      const toggle = mobileHeader?.querySelector('button[aria-controls="mobile-site-navigation"]');
      const h1 = document.querySelector("main h1");
      const hero = h1?.closest("section");
      const footer = document.querySelector("footer");
      const footerSections = Array.from(footer?.querySelectorAll("section") ?? []).filter(visible);
      const mainMedia = Array.from(document.querySelectorAll("main iframe, main video")).filter(visible);
      const mainImages = Array.from(document.querySelectorAll("main img")).filter(visible);
      const mainControls = Array.from(
        document.querySelectorAll("main a[href], main button, main input:not([type='hidden']), main select, main textarea"),
      ).filter(visible);
      const articles = Array.from(document.querySelectorAll("main article")).filter(visible);
      const articleRects = articles.map(rect);
      const articleTops = articleRects.map((item) => item?.top).filter((item) => item !== null);
      const textElements = Array.from(document.querySelectorAll("main h1, main h2, main h3, main p, main li, main label"))
        .filter(visible)
        .filter((element) => element.scrollWidth > element.clientWidth + 1)
        .map((element) => ({ tag: element.tagName, text: element.textContent?.trim().slice(0, 80), rect: rect(element) }));
      const footerSectionRects = footerSections.map(rect);
      const form = document.querySelector("main form");
      const formFields = form
        ? Array.from(form.querySelectorAll("input:not([type='hidden']), select, textarea, button")).filter(visible)
        : [];
      const labels = form
        ? Array.from(form.querySelectorAll("label")).filter((label) => !label.closest('[aria-hidden="true"]'))
        : [];
      const testimonialFrames = Array.from(document.querySelectorAll("main article button, main article iframe")).filter(visible);
      const sponsorTiles = currentRoute === "/sponsors/"
        ? Array.from(document.querySelectorAll("main a")).filter((element) => element.querySelector("img") && visible(element))
        : [];
      const peopleCards = currentRoute === "/board-staff/" ? articles : [];
      const campaignMedia = currentRoute === "/live-here-love-here-lake/"
        ? Array.from(document.querySelectorAll("main video, main img")).filter(visible)
        : [];
      const feed = currentRoute === "/hope-in-action/" ? document.querySelector('[data-provider="instagram"]') : null;
      const feedMedia = feed ? Array.from(feed.querySelectorAll("img, video, iframe")).filter(visible) : [];
      const legalContent = currentRoute === "/terms-conditions/" ? document.querySelector("main section:last-of-type") : null;
      const h1Style = h1 ? getComputedStyle(h1) : null;

      return {
        route: currentRoute,
        width: viewportWidth,
        pageHeight: document.documentElement.scrollHeight,
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        header: rect(header),
        mobileHeader: rect(mobileHeader),
        logo: rect(logo),
        toggle: rect(toggle),
        h1: rect(h1),
        h1Style: h1Style ? { fontSize: h1Style.fontSize, lineHeight: h1Style.lineHeight } : null,
        hero: rect(hero),
        footer: rect(footer),
        footerLogo: rect(footer?.querySelector('img[alt="Find Feed Restore"]')),
        footerSections: footerSectionRects,
        footerStacked: footerSectionRects.every((item, index) => index === 0 || item.top > footerSectionRects[index - 1].top),
        floatingControl: rect(document.querySelector('a[aria-label="Donate now"]')),
        media: mainMedia.map(rect),
        mediaContained: mainMedia.every(contained),
        imagesContained: mainImages.every(contained),
        controlsContained: mainControls.every(contained),
        clippedText: textElements,
        articleCount: articleRects.length,
        articlesContained: articles.every(contained),
        articlesStacked: articleTops.every((top, index) => index === 0 || top > articleTops[index - 1]),
        form: rect(form),
        formFields: formFields.map(rect),
        formFieldsContained: formFields.every(contained),
        formLabelCount: labels.length,
        testimonialMedia: testimonialFrames.map(rect),
        testimonialMediaContained: testimonialFrames.every(contained),
        sponsorTileCount: sponsorTiles.length,
        sponsorTilesContained: sponsorTiles.every(contained),
        peopleCardCount: peopleCards.length,
        peopleCardsContained: peopleCards.every(contained),
        campaignMediaContained: campaignMedia.every(contained),
        feed: rect(feed),
        feedMediaContained: feedMedia.every(contained),
        legalContent: rect(legalContent),
        legalContained: !legalContent || contained(legalContent),
      };
    },
    { currentRoute: route, viewportWidth: width },
  );
}

async function inspectMenu(page, width) {
  const toggle = page.locator('button[aria-controls="mobile-site-navigation"]');
  const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
  const bodyOverflowBefore = await page.locator("body").evaluate((body) => getComputedStyle(body).overflow);

  await toggle.focus();
  await page.keyboard.press("Enter");
  await page.waitForTimeout(350);
  const open = {
    expanded: await toggle.getAttribute("aria-expanded"),
    toggleFocused: await toggle.evaluate((element) => document.activeElement === element),
    navigation: roundedRect(await navigation.boundingBox()),
    links: await navigation.locator("a, summary").evaluateAll((elements) =>
      elements.filter((element) => element.getBoundingClientRect().height > 0).map((element) => {
        const bounds = element.getBoundingClientRect();
        return { top: Math.round(bounds.top), right: Math.round(bounds.right), height: Math.round(bounds.height) };
      }),
    ),
  };
  await page.keyboard.press("Enter");
  await page.waitForTimeout(350);
  const bodyOverflowAfter = await page.locator("body").evaluate((body) => getComputedStyle(body).overflow);
  const closed = {
    expanded: await toggle.getAttribute("aria-expanded"),
    navigationHeight: Math.round((await navigation.boundingBox())?.height ?? 0),
  };

  return {
    open,
    closed,
    bodyOverflowBefore,
    bodyOverflowAfter,
    passed:
      open.expanded === "true" &&
      open.toggleFocused &&
      open.navigation !== null &&
      open.navigation.left >= -1 &&
      open.navigation.right <= width + 1 &&
      open.links.length > 0 &&
      open.links.every((link) => link.right <= width + 1 && link.height >= 40) &&
      closed.expanded === "false" &&
      closed.navigationHeight === 0 &&
      bodyOverflowBefore === bodyOverflowAfter,
  };
}

async function inspectMobileHeaderScroll(page) {
  await page.evaluate(() => window.scrollTo(0, 0));
  const siteHeader = page.getByRole("banner");
  const initial = roundedRect(await siteHeader.boundingBox());
  await page.evaluate(() => window.scrollTo(0, 250));
  await page.waitForTimeout(100);
  const scrolled = roundedRect(await siteHeader.boundingBox());
  await page.evaluate(() => window.scrollTo(0, 0));
  return {
    initial,
    scrolled,
    passed: initial?.top === 0 && initial.height === scrolled?.height && scrolled?.top === 0,
  };
}

async function inspectTrailerStates(page) {
  const form = page.locator("main form");
  if ((await form.count()) === 0) return null;
  const baselineHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const status = form.locator('[role="status"], [aria-live]');
  const submit = form.locator('button[type="submit"]');
  const initialStatus = await status.textContent();
  await page.evaluate(() => {
    const target = document.querySelector("main form [aria-live]");
    if (target) target.textContent = "Sending your request…";
    const button = document.querySelector("main form button[type='submit']");
    if (button) button.setAttribute("disabled", "");
  });
  const submitting = {
    text: await status.textContent(),
    disabled: await submit.isDisabled(),
    height: await page.evaluate(() => document.documentElement.scrollHeight),
  };
  await page.evaluate(() => {
    const target = document.querySelector("main form [aria-live]");
    if (target) target.textContent = "Your trailer ministry request was sent successfully.";
  });
  const success = {
    text: await status.textContent(),
    height: await page.evaluate(() => document.documentElement.scrollHeight),
  };
  await page.evaluate(() => {
    const target = document.querySelector("main form [aria-live]");
    if (target) target.textContent = "We could not send your request. Please try again.";
  });
  const error = {
    text: await status.textContent(),
    height: await page.evaluate(() => document.documentElement.scrollHeight),
  };
  return {
    baselineHeight,
    initialStatus,
    submitting,
    success,
    error,
    passed:
      submitting.disabled &&
      /sending/i.test(submitting.text ?? "") &&
      /sent|success/i.test(success.text ?? "") &&
      /try again/i.test(error.text ?? "") &&
      [submitting.height, success.height, error.height].every((height) => Math.abs(height - baselineHeight) <= 60),
  };
}

function routeSpecificPass(route, layout) {
  if (route === "/care-coach-mobile-unit/") return layout.media.length === 1 && layout.mediaContained;
  if (route === "/testimonials/") return layout.articleCount === 7 && layout.articlesStacked && layout.testimonialMediaContained;
  if (route === "/board-staff/") return layout.peopleCardCount === 17 && layout.articlesStacked && layout.peopleCardsContained;
  if (route === "/sponsors/") return layout.sponsorTileCount === 18 && layout.sponsorTilesContained;
  if (route === "/live-here-love-here-lake/") return layout.media.length === 1 && layout.mediaContained && layout.campaignMediaContained;
  if (route === "/we-need-trailers/") return layout.form !== null && layout.formFields.length === 6 && layout.formLabelCount === 5 && layout.formFieldsContained;
  if (route === "/hope-in-action/") return layout.feed !== null && layout.feedMediaContained;
  if (route === "/terms-conditions/") return layout.legalContent !== null && layout.legalContained;
  return true;
}

async function main() {
  await mkdir(path.dirname(outputPath), { recursive: true });
  const browser = await chromium.launch({
    executablePath: await findChrome(),
    headless: true,
    args: ["--mute-audio"],
  });
  const results = [];

  try {
    for (const route of routes) {
      for (const width of widths) {
        const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
        const page = await context.newPage();
        const response = await page.goto(new URL(route, baseUrl).href, {
          waitUntil: "domcontentloaded",
          timeout: 60_000,
        });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(route === "/hope-in-action/" ? 2_500 : 250);
        const layout = await inspectLayout(page, route, width);
        const menu = await inspectMenu(page, width);
        const headerScroll = await inspectMobileHeaderScroll(page);
        const trailerStates = route === "/we-need-trailers/" ? await inspectTrailerStates(page) : null;
        const passed =
          response?.status() === 200 &&
          layout.scrollWidth === layout.clientWidth &&
          layout.mobileHeader !== null &&
          layout.logo !== null &&
          layout.toggle !== null &&
          layout.footerStacked &&
          layout.mediaContained &&
          layout.imagesContained &&
          layout.controlsContained &&
          layout.articlesContained &&
          layout.clippedText.length === 0 &&
          menu.passed &&
          headerScroll.passed &&
          routeSpecificPass(route, layout) &&
          (trailerStates?.passed ?? true);

        results.push({ route, width, status: response?.status() ?? null, passed, layout, menu, headerScroll, trailerStates });
        console.log(`${passed ? "PASS" : "FAIL"} ${width}px ${route}`);
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  await writeFile(outputPath, `${JSON.stringify(results, null, 2)}\n`);
  const failures = results.filter((result) => !result.passed);
  console.log(`Mobile certification: ${results.length - failures.length}/${results.length} route-width checks passed.`);
  if (failures.length > 0) {
    console.table(failures.map(({ route, width, layout, menu, headerScroll }) => ({
      route,
      width,
      overflow: `${layout.scrollWidth}/${layout.clientWidth}`,
      clippedText: layout.clippedText.length,
      menu: menu.passed,
      headerScroll: headerScroll.passed,
    })));
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

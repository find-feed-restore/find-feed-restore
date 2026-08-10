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
  const browser = await chromium.launch({ executablePath: await findChrome(), headless: true });
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
    await desktopContext.close();

    const mobileContext = await browser.newContext({ viewport: { width: 390, height: 900 } });
    const mobile = await mobileContext.newPage();
    await mobile.goto(localUrl, { waitUntil: "networkidle" });
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

    if (route === "/affordable-housing/") {
      const expectedLinks = [
        "https://findfeedrestore-bloom.kindful.com/",
        "https://app.planstreetinc.com/findfeedrestore/PublicForm",
        "/care-coach-mobile-unit",
        "/homelessness-avoidance",
        "/housing-first",
      ];
      const hrefs = await reduced.locator("main a").evaluateAll((links) =>
        links.map((link) => link.getAttribute("href")),
      );
      check(
        "Affordable Housing CTA and program links",
        expectedLinks.every((href) => hrefs.includes(href)),
        hrefs,
      );
      check(
        "Affordable Housing semantic heading",
        (await reduced.getByRole("heading", { level: 1, name: "Affordable Housing" }).count()) === 1,
        await reduced.locator("main h1").allTextContents(),
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

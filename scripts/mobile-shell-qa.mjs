import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3000";
const outputDirectory = path.join(process.cwd(), ".visual-qa", "mobile-shell");
const widths = [430, 390, 360, 320];
const routes = ["/", "/board-staff/"];
const chromeCandidates = [
  process.env.PLAYWRIGHT_CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
].filter(Boolean);

async function findChrome() {
  for (const candidate of chromeCandidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {}
  }
  throw new Error("Chrome was not found.");
}

await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch({ executablePath: await findChrome(), headless: true });
const results = [];

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 844 } });
  for (const route of routes) {
    await page.goto(new URL(route, baseUrl).href, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      await Promise.all(
        [...document.images].map((image) =>
          image.complete
            ? image.decode?.().catch(() => undefined)
            : new Promise((resolve) => {
                image.addEventListener("load", resolve, { once: true });
                image.addEventListener("error", resolve, { once: true });
              }),
        ),
      );
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(400);
    await page.evaluate(() => window.scrollTo(0, 0));
    const shell = await page.evaluate(() => {
      const bounds = (element) => {
        const rect = element?.getBoundingClientRect();
        return rect ? { left: rect.left, right: rect.right, width: rect.width, height: rect.height } : null;
      };
      const header = document.querySelector("header");
      const logo = [...(header?.querySelectorAll("img") ?? [])].find((element) => element.getBoundingClientRect().width > 0);
      const toggle = [...(header?.querySelectorAll("button") ?? [])].find((element) => element.getBoundingClientRect().width > 0);
      const footer = document.querySelector("footer");
      return {
        viewport: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        header: bounds(header),
        logo: bounds(logo),
        toggle: bounds(toggle),
        footer: bounds(footer),
        footerBottom: (footer?.getBoundingClientRect().bottom ?? 0) + window.scrollY,
        documentHeight: document.documentElement.scrollHeight,
      };
    });

    if (shell.scrollWidth > shell.viewport) throw new Error(`${route} overflows at ${width}px`);
    if (!shell.logo || shell.logo.left > 30) throw new Error(`${route} logo is not left-aligned at ${width}px`);
    if (!shell.toggle || shell.toggle.right < width - 30) throw new Error(`${route} toggle is not right-aligned at ${width}px`);
    if (!shell.footer || Math.abs(shell.footer.width - width) > 1) throw new Error(`${route} footer is not full-width at ${width}px`);
    if (Math.abs(shell.footerBottom - shell.documentHeight) > 1) {
      throw new Error(`${route} has trailing page whitespace at ${width}px (${shell.footerBottom} vs ${shell.documentHeight})`);
    }

    await page.locator('button[aria-label="Open menu"]').click();
    if ((await page.locator('button[aria-label="Close menu"]').getAttribute("aria-expanded")) !== "true") {
      throw new Error(`${route} menu did not open at ${width}px`);
    }
    await page.waitForTimeout(350);
    const menuHeight = await page.locator("#mobile-site-navigation").evaluate((element) => element.getBoundingClientRect().height);
    if (menuHeight < 200) throw new Error(`${route} menu panel is not visible at ${width}px`);
    if (route === "/") {
      await page.screenshot({ path: path.join(outputDirectory, `menu-open-${width}.png`), fullPage: false });
    }
    await page.locator('button[aria-label="Close menu"]').click();

    const name = route === "/" ? "home" : "board-staff";
    await page.screenshot({ path: path.join(outputDirectory, `${name}-${width}.png`), fullPage: true });
    results.push({ route, width, ...shell, menu: "PASS" });
  }
  await page.close();
}

await browser.close();
await writeFile(path.join(outputDirectory, "results.json"), `${JSON.stringify(results, null, 2)}\n`);
console.log(`PASS: mobile header, menu, footer, and page-bottom checks at ${widths.join(", ")}px.`);

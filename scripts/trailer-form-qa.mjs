import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright-core";

const productionUrl = "https://www.findfeedrestore.com/we-need-trailers/";
const localUrl = new URL("/we-need-trailers/", process.env.VISUAL_QA_LOCAL_URL ?? "http://localhost:3002/").href;
const outputDirectory = path.resolve(process.cwd(), ".visual-qa/routes/we-need-trailers");
const widths = [1440, 1024, 768, 390];
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

async function formContract(page) {
  return page.locator("form").first().evaluate((form) => {
    const rect = (element) => {
      const bounds = element.getBoundingClientRect();
      return {
        x: Math.round(bounds.x),
        y: Math.round(bounds.y + window.scrollY),
        width: Math.round(bounds.width),
        height: Math.round(bounds.height),
      };
    };
    const fields = ["name", "phone", "email", "trailer_type", "message"];
    return {
      pageHeight: document.documentElement.scrollHeight,
      form: rect(form),
      fields: Object.fromEntries(
        fields.map((name) => {
          const element = form.elements.namedItem(name);
          return [
            name,
            {
              rect: rect(element),
              tag: element.tagName.toLowerCase(),
              type: element.getAttribute("type"),
              placeholder: element.getAttribute("placeholder"),
              required: element.required,
              maxLength: "maxLength" in element ? element.maxLength : null,
              label: form.querySelector(`label[for="${element.id}"]`)?.textContent?.trim(),
            },
          ];
        }),
      ),
      button: rect(form.querySelector('button[type="submit"], button')),
      status: form.querySelector('[role="status"]')
        ? {
            ariaLive: form.querySelector('[role="status"]').getAttribute("aria-live"),
            dataStatus: form.querySelector('[role="status"]').getAttribute("data-status"),
          }
        : null,
      honeypot: form.elements.namedItem("company_website")
        ? {
            tabIndex: form.elements.namedItem("company_website").tabIndex,
            hiddenContainerWidth: Math.round(form.elements.namedItem("company_website").parentElement.getBoundingClientRect().width),
          }
        : null,
      timingField: Boolean(form.elements.namedItem("form_started_at")),
    };
  });
}

function comparableGeometry(production, local) {
  const fieldNames = ["name", "phone", "email", "trailer_type", "message"];
  return fieldNames.every((name) => {
    const source = production.fields[name].rect;
    const target = local.fields[name].rect;
    return Math.abs(source.height - target.height) <= 2 && Math.abs(source.width - target.width) <= 16;
  }) && Math.abs(production.button.height - local.button.height) <= 2;
}

async function main() {
  await mkdir(outputDirectory, { recursive: true });
  const browser = await chromium.launch({ executablePath: await findChrome(), headless: true });
  const checks = [];
  const geometry = [];
  const check = (name, passed, details) => checks.push({ name, passed, details });

  try {
    for (const width of widths) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const production = await context.newPage();
      const local = await context.newPage();
      await Promise.all([
        production.goto(productionUrl, { waitUntil: "domcontentloaded", timeout: 60_000 }),
        local.goto(localUrl, { waitUntil: "domcontentloaded", timeout: 60_000 }),
      ]);
      await Promise.all([
        production.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => undefined),
        local.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => undefined),
      ]);
      await Promise.all([
        production.evaluate(() => document.fonts.ready),
        local.evaluate(() => document.fonts.ready),
      ]);
      const productionContract = await formContract(production);
      const localContract = await formContract(local);
      geometry.push({ width, production: productionContract, local: localContract });
      check(`${width}px production/local field geometry`, comparableGeometry(productionContract, localContract), {
        production: productionContract.fields,
        local: localContract.fields,
        productionButton: productionContract.button,
        localButton: localContract.button,
      });
      await context.close();
    }

    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(localUrl, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => undefined);
    await page.evaluate(() => document.fonts.ready);
    const contract = await formContract(page);
    const requiredFields = Object.entries(contract.fields)
      .filter(([, field]) => field.required)
      .map(([name]) => name);
    check("production field and required contract", JSON.stringify(requiredFields) === JSON.stringify(["email"]), {
      fields: Object.keys(contract.fields),
      requiredFields,
    });
    check(
      "semantic labels, status region, honeypot, and timing field",
      Object.values(contract.fields).every((field) => Boolean(field.label)) &&
        contract.status?.ariaLive === "polite" &&
        contract.honeypot?.tabIndex === -1 &&
        contract.honeypot?.hiddenContainerWidth <= 1 &&
        contract.timingField,
      contract,
    );

    const form = page.locator("main form");
    const email = form.locator('[name="email"]');
    await email.fill("invalid-email");
    check("browser invalid-email rejection", !(await email.evaluate((element) => element.checkValidity())), await email.evaluate((element) => element.validationMessage));
    await email.fill("");
    check("browser required-email rejection", !(await email.evaluate((element) => element.checkValidity())), await email.evaluate((element) => element.validationMessage));

    await form.locator('[name="name"]').focus();
    const tabOrder = [];
    for (let index = 0; index < 6; index += 1) {
      tabOrder.push(await page.evaluate(() => document.activeElement?.getAttribute("name") || document.activeElement?.getAttribute("type")));
      await page.keyboard.press("Tab");
    }
    check(
      "keyboard form order",
      JSON.stringify(tabOrder) === JSON.stringify(["name", "phone", "email", "trailer_type", "message", "submit"]),
      tabOrder,
    );

    await page.waitForTimeout(1_600);
    await email.fill("website-test@example.com");
    await page.evaluate(() => {
      const button = document.querySelector('main form button[type="submit"]');
      window.__trailerSawPending = false;
      new MutationObserver(() => {
        if (button.disabled || button.textContent.includes("Sending")) window.__trailerSawPending = true;
      }).observe(button, { attributes: true, childList: true, subtree: true });
    });
    const heightBeforeError = await page.evaluate(() => document.documentElement.scrollHeight);
    await form.locator('button[type="submit"]').click();
    const status = form.locator('[role="status"]');
    await status.filter({ hasText: "try again" }).waitFor({ state: "visible" });
    const errorState = {
      text: await status.textContent(),
      dataStatus: await status.getAttribute("data-status"),
      ariaLive: await status.getAttribute("aria-live"),
      sawPending: await page.evaluate(() => window.__trailerSawPending),
      heightBefore: heightBeforeError,
      heightAfter: await page.evaluate(() => document.documentElement.scrollHeight),
    };
    check(
      "submitting and safe accessible error states",
      errorState.sawPending &&
        errorState.dataStatus === "error" &&
        errorState.ariaLive === "polite" &&
        !/Resend|stack|api key/i.test(errorState.text) &&
        Math.abs(errorState.heightAfter - errorState.heightBefore) <= 20,
      errorState,
    );
    await page.screenshot({ path: path.join(outputDirectory, "state-error.png"), fullPage: true, animations: "disabled" });

    const heightBeforePreviews = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.evaluate(() => {
      const status = document.querySelector('main form [role="status"]');
      const button = document.querySelector('main form button[type="submit"]');
      status.dataset.status = "success";
      status.textContent = "Your trailer information was sent. Our team will follow up with you.";
      button.disabled = false;
      button.textContent = "Submit Trailer Info";
    });
    await page.screenshot({ path: path.join(outputDirectory, "state-success.png"), fullPage: true, animations: "disabled" });
    const successState = await status.evaluate((element) => ({
      text: element.textContent,
      dataStatus: element.dataset.status,
      ariaLive: element.getAttribute("aria-live"),
      color: getComputedStyle(element).color,
      pageHeight: document.documentElement.scrollHeight,
    }));
    check(
      "success-state layout and accessibility preview",
      successState.dataStatus === "success" &&
        successState.ariaLive === "polite" &&
        /sent/i.test(successState.text) &&
        successState.color === "rgb(36, 114, 68)" &&
        Math.abs(successState.pageHeight - heightBeforePreviews) <= 20,
      successState,
    );

    await page.evaluate(() => {
      const button = document.querySelector('main form button[type="submit"]');
      button.disabled = true;
      button.textContent = "Sending…";
    });
    await page.screenshot({ path: path.join(outputDirectory, "state-submitting.png"), fullPage: true, animations: "disabled" });
    const submittingState = await form.locator('button[type="submit"]').evaluate((button) => ({
      disabled: button.disabled,
      text: button.textContent,
      pageHeight: document.documentElement.scrollHeight,
    }));
    check(
      "submitting-state layout preview",
      submittingState.disabled && /Sending/.test(submittingState.text) && Math.abs(submittingState.pageHeight - heightBeforePreviews) <= 20,
      submittingState,
    );
    await context.close();
  } finally {
    await browser.close();
  }

  await writeFile(path.join(outputDirectory, "form-qa.json"), `${JSON.stringify({ checks, geometry }, null, 2)}\n`);
  console.table(checks);
  if (checks.some((item) => !item.passed)) process.exitCode = 1;
}

await main();

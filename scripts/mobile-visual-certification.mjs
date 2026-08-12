import { spawn } from "node:child_process";
import process from "node:process";

const routes = [
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
];

function captureRoute(route) {
  return new Promise((resolve, reject) => {
    const productionRoute = route === "/board-staff/" ? "/about-us/" : route;
    const child = spawn(process.execPath, ["scripts/visual-qa.mjs", route], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        VISUAL_QA_WIDTHS: "430,390,375,360,320",
        VISUAL_QA_PRODUCTION_ROUTE: productionRoute,
      },
      stdio: "inherit",
    });
    child.once("error", reject);
    child.once("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Mobile visual capture failed for ${route} with exit code ${code}.`));
    });
  });
}

async function main() {
  for (const route of routes) {
    console.log(`\nMobile visual certification: ${route}`);
    await captureRoute(route);
  }
  console.log(`Completed ${routes.length * 5} production/local mobile visual comparisons.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

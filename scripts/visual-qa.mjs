import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox", "--enable-unsafe-swiftshader"],
});
const base = process.env.BASE_URL || "http://localhost:3000";
await mkdir("docs/screenshots", { recursive: true });
const results = [];
for (const width of [1440, 768, 390]) {
  const page = await browser.newPage({
    viewport: { width, height: width === 390 ? 844 : 1000 },
    isMobile: width === 390,
    hasTouch: width === 390,
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) errors.push(r.status() + " " + r.url());
  });
  for (const route of [
    "/",
    "/menu/",
    "/desserts/",
    "/visit/",
    "/menu/lavender-cloud/",
    "/menu/espresso/?lang=ru",
    "/?lang=ru",
    "/menu/?lang=ru",
    "/desserts/?lang=ru",
    "/menu/pistachio-latte/",
    "/menu/tiramisu/",
  ]) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo({ top: y, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    await page.waitForTimeout(1300);
    const name =
      route === "/" ? "home" : route.replaceAll("?", "-").replaceAll("=", "-").split("/").filter(Boolean).join("-");
    await page.screenshot({
      path: `docs/screenshots/${name}-${width}.png`,
      fullPage: true,
    });
    const metrics = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      brokenImages: [...document.images]
        .filter((i) => !i.complete || i.naturalWidth === 0)
        .map((i) => i.getAttribute("src")),
    }));
    results.push({ width, route, ...metrics });
    console.log(width, route, metrics);
  }
  results.push({ width, errors });
  await page.close();
}
await writeFile("docs/visual-results.json", JSON.stringify(results, null, 2));
await browser.close();
if (
  results.some((r) => r.overflow || r.brokenImages?.length || r.errors?.length)
)
  process.exitCode = 1;

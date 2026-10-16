import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { writeFile, mkdir } from "node:fs/promises";
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox", "--enable-unsafe-swiftshader"],
});
const base = process.env.BASE_URL || "http://localhost:3000";
const results = [];
await mkdir("docs", { recursive: true });
for (const width of [1440, 390]) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
  });
  const page = await context.newPage();
  for (const route of [
    "/",
    "/menu/",
    "/story/",
    "/experience/",
    "/journal/",
    "/visit/",
    "/journal/the-art-of-slow-coffee/",
  ]) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo({ top: y, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    await page.waitForTimeout(900);
    const r = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const summary = {
      width,
      route,
      violations: r.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
      passes: r.passes.length,
      incomplete: r.incomplete.length,
    };
    results.push(summary);
    console.log(width, route, summary.violations.length, "violations");
  }
  await page.goto(base + "/menu/", { waitUntil: "networkidle" });
  await page
    .getByRole("button", { name: "View Black Sesame Latte details" })
    .click();
  const dialog = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  results.push({
    width,
    route: "menu dialog",
    violations: dialog.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  });
  await context.close();
}
await writeFile(
  "docs/accessibility-results.json",
  JSON.stringify(results, null, 2),
);
await browser.close();
if (results.some((r) => r.violations.length)) process.exitCode = 1;

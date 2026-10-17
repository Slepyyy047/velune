import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox", "--enable-unsafe-swiftshader"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const base = process.env.BASE_URL || "http://localhost:3000";
const client = await page.context().newCDPSession(page);
await client.send("Performance.enable");
const results = {
  environment:
    "Headless Chromium in cloud container; software/virtual GPU. Not representative of physical phone GPU.",
  heaps: [],
  frames: null,
  frameMeasurementNote: "Rendered FPS and physical-device GPU timing are not measured. This probe samples navigation heap and menu event durations.",
  interactionSamples: [],
  resourceFailures: [],
};
page.on("response", (r) => {
  if (r.status() >= 400) results.resourceFailures.push(r.url());
});
try {
for (let i = 0; i < 4; i++) {
  await page.goto(base + "/experience/", { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    for (let n = 0; n <= 40; n++) {
      scrollTo({ top: (document.documentElement.scrollHeight - innerHeight) * n / 40, behavior: "instant" });
      await new Promise(requestAnimationFrame);
    }
  });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await client.send("HeapProfiler.collectGarbage");
  const after = await client.send("Performance.getMetrics");
  results.heaps.push({ cycle: i, state: "ritual scrolled; home returned; GC requested", usedJSHeap: after.metrics.find(m => m.name === "JSHeapUsedSize")?.value });
}
await page.goto(base + "/menu/", { waitUntil: "networkidle" });
await page.evaluate(() => {
  window.__events = [];
  new PerformanceObserver((list) => {
    window.__events.push(
      ...list
        .getEntries()
        .map((e) => ({
          name: e.name,
          duration: e.duration,
          interactionId: e.interactionId,
        })),
    );
  }).observe({ type: "event", buffered: true, durationThreshold: 16 });
});
for (const name of [
  "Espresso Classics",
  "Milk-Based Coffee",
  "Seasonal Signatures",
  "All drinks",
]) {
  await page.getByRole("button", { name, exact: true }).click();
  await page.waitForTimeout(120);
}
await page.getByRole("searchbox").fill("yuzu");
await page.waitForTimeout(300);
results.interactionSamples = await page.evaluate(() => window.__events);
await writeFile("docs/runtime-profile.json", JSON.stringify(results, null, 2));
console.log(JSON.stringify(results));
} finally {
await browser.close();
}

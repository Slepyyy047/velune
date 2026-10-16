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
  frameMeasurementNote: "Idle requestAnimationFrame cadence with the model mounted; not actual GPU render FPS. On-demand scene may be idle. Physical-device GPU timing and sustained animation FPS are unverified.",
  interactionSamples: [],
  resourceFailures: [],
};
page.on("response", (r) => {
  if (r.status() >= 400) results.resourceFailures.push(r.url());
});
try {
await page.goto(base + "/experience/", { waitUntil: "networkidle" });
for (let i = 0; i < 4; i++) {
  await page.getByRole("button", { name: "Explore in 3D" }).click();
  await page.waitForTimeout(1800);
  const before = await client.send("Performance.getMetrics");
  results.heaps.push({
    cycle: i,
    state: "model active",
    usedJSHeap: before.metrics.find((m) => m.name === "JSHeapUsedSize")?.value,
  });
  if (i === 0) {
    results.frames = await page.evaluate(
      () =>
        new Promise((resolve) => {
          const deltas = [];
          let prev = performance.now();
          function frame(now) {
            deltas.push(now - prev);
            prev = now;
            if (deltas.length < 120) requestAnimationFrame(frame);
            else {
              deltas.sort((a, b) => a - b);
              resolve({
                samples: deltas.length,
                medianFrameMs: deltas[60],
                p95FrameMs: deltas[114],
                approxMedianFPS: 1000 / deltas[60],
              });
            }
          }
          requestAnimationFrame(frame);
        }),
    );
  }
  await page.getByRole("button", { name: "Image view" }).click();
  // Allow R3F's deferred renderer disposal before measuring and reopening.
  await page.waitForTimeout(700);
  await client.send("HeapProfiler.collectGarbage");
  const after = await client.send("Performance.getMetrics");
  results.heaps.push({
    cycle: i,
    state: "model unmounted, GC requested",
    usedJSHeap: after.metrics.find((m) => m.name === "JSHeapUsedSize")?.value,
  });
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

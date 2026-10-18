import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { mkdir, writeFile, readFile } from "node:fs/promises";
const chrome = await launch({
  chromePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  chromeFlags: [
    "--headless",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--enable-unsafe-swiftshader",
  ],
});
const base = process.env.BASE_URL || "http://localhost:3000";
const selectedRoutes = process.env.PERF_ROUTES?.split(",").filter(Boolean);
const results = selectedRoutes ? JSON.parse(await readFile("docs/performance-results.json", "utf8")) : [];
await mkdir("docs/lighthouse", { recursive: true });
try {
  for (const formFactor of ["desktop", "mobile"])
    for (const route of selectedRoutes || ["/", "/menu/", "/visit/"]) {
      const desktop = formFactor === "desktop";
      const { lhr, report } = await lighthouse(base + route, {
        port: chrome.port,
        output: ["json", "html"],
        logLevel: "error",
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
        formFactor,
        screenEmulation: {
          mobile: !desktop,
          width: desktop ? 1350 : 390,
          height: desktop ? 940 : 844,
          deviceScaleFactor: desktop ? 1 : 2,
          disabled: false,
        },
        throttling: desktop
          ? {
              rttMs: 40,
              throughputKbps: 10240,
              cpuSlowdownMultiplier: 1,
              requestLatencyMs: 0,
              downloadThroughputKbps: 0,
              uploadThroughputKbps: 0,
            }
          : {
              rttMs: 150,
              throughputKbps: 1638.4,
              cpuSlowdownMultiplier: 4,
              requestLatencyMs: 0,
              downloadThroughputKbps: 0,
              uploadThroughputKbps: 0,
            },
      });
      const name =
        (route === "/" ? "home" : route.replaceAll("/", "")) + "-" + formFactor;
      await writeFile(`docs/lighthouse/${name}.json`, report[0]);
      await writeFile(`docs/lighthouse/${name}.html`, report[1]);
      const summary = {
        route,
        formFactor,
        fetchTime: lhr.fetchTime,
        scores: Object.fromEntries(
          Object.entries(lhr.categories).map(([k, v]) => [
            k,
            Math.round(v.score * 100),
          ]),
        ),
        metrics: Object.fromEntries(
          [
            "largest-contentful-paint",
            "first-contentful-paint",
            "total-blocking-time",
            "cumulative-layout-shift",
            "speed-index",
            "total-byte-weight",
          ].map((k) => [
            k,
            {
              value: lhr.audits[k]?.numericValue,
              display: lhr.audits[k]?.displayValue,
            },
          ]),
        ),
        warnings: lhr.runWarnings,
      };
      const previous = results.findIndex(r => r.route === route && r.formFactor === formFactor);
      if (previous >= 0) results[previous] = summary;
      else results.push(summary);
      console.log(JSON.stringify(summary));
    }
} finally {
  await chrome.kill();
  await writeFile(
    "docs/performance-results.json",
    JSON.stringify(results, null, 2),
  );
}

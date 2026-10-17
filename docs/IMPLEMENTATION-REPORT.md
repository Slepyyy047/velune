# VELUNE — revision report

17 October 2026. This report replaces the initial-build report. VELUNE remains a fictional coffee concept, not an operating café.

## Completed revision

- Removed the entire interactive 3D cup, its GLB, scene components, model generator and Three.js/R3F/Drei dependencies. No WebGL canvas is created.
- Replaced the Experience page with four compact editorial chapters. A faint, non-interactive SVG coffee illustration sits behind foreground content across the site. Scroll position determines beans, grinding, brewing and pause stages; backward scrolling is deterministic. It is an illustration, not a fluid or physical simulation.
- Increased lilac/lavender in the header, editorial surfaces, calls to action, accents and footer; reduced major section spacing and removed the oversized scene layout.
- Added heading-letter hover responses, section/image movement, card/filter entrances and refined navigation/button transitions. All core text is rendered before enhancement. Reduced-motion preferences turn off decorative motion, and no entrance blocks navigation.
- Exactly twenty distinct drink portraits, rendered from five original generated image sheets. Added twenty dedicated static drink pages, each with USD price, volume, ingredients, allergens, flavor notes, original preparation copy, portrait/closeup view, favorites, related drinks and previous/next navigation.
- Menu cards and home signatures open drink pages in a new tab, with an accessible indication. Removed the drink modal. Search, six category filters, empty states and local favorites remain functional; favorites synchronize across tabs.
- English/Russian switch in the header, locally saved preference, Russian search, translated recipes and all five complete articles. Shared detail links carry a language query. Russian headings use Georgia for Cyrillic; the Latin wordmark retains Instrument Serif.
- Kept the keyboard-operated interior gallery, interactive grind-size explanation, responsive navigation, optional sound preference and clear fictional-concept disclosures.

## Routes

31 public content pages: `/`, `/menu/`, `/story/`, `/experience/`, `/journal/`, `/visit/`; twenty `/menu/[slug]/` routes defined in `data/menu.ts`; five `/journal/[slug]/` routes defined in `data/journal.ts`. Static 404 and application error UI are also included.

## Assets and scope

No 3D assets are used in this revision. The earlier 3D production specification is marked historical and is no longer a delivery requirement under the revised direction.

All imagery is generated concept imagery, not photographs of real premises or served drinks. The full-resolution drink sheets total 1.18 MiB, with a native 627 × 627 crop per drink. Optimized phone-card sheets total 269 KiB (400 × 400 per portrait); larger-card sheets total 353 KiB (480 × 480). Detail views retain the full-resolution sheets. An additional 1100 × 733 grinding editorial image replaces the unrelated pouring image in that chapter. Detail-page closeups are explicitly identified as enlarged crops of the same portrait, not additional photographs. Provenance is in `ASSETS.md` and `DRINK-IMAGE-SOURCES.md`.

## Executed verification

- `npm run build`: successful static export of all routes; Next.js 15.5.28.
- `npm run typecheck`: passed.
- Playwright: **26 passed, 0 failed, 0 skipped, 0 flaky**, desktop Chromium and iPhone 13 emulation. The full run took 154.5 seconds. After the final performance changes, **10 additional targeted desktop/mobile regressions passed** in 41.6 seconds, covering menu interactions, new tabs, Russian content, reversible background progress and reduced motion. Coverage includes all routes and all twenty detail pages, unique image crops, filters/search, new tabs, cross-tab favorites, Russian content/persistence, all articles, mobile navigation, gallery, grind controls, sound, storage failure, reduced motion and content without JavaScript.
- axe: **0 violations across 20 route/viewport cases** after fixing heading markup, language names, one contrast issue and signature-link accessible names. Four affected menu cases were rerun after the final accessible-name-only change. This is automated WCAG A/AA checking, not a manual assistive-technology certification.
- Visual QA: **33 page/viewport cases** at 1440, 768 and 390 px: no horizontal overflow, broken images, browser exceptions or failed asset responses. The final grinding photograph was separately checked and captured at all three sizes. Six additional image-delivery cases verified responsive source selection, square image proportions, all photos loaded and no horizontal overflow after optimization; new-tab behavior was rechecked on both sizes. Representative full-page desktop, tablet and Russian mobile screenshots were inspected.
- Runtime sample: four ritual-scroll/home cycles returned approximately 3.59–3.60 MB used JS heap after requested garbage collection. Menu event samples were 40–64 ms in an unthrottled lab. No resource failures were recorded. This short sample does not establish real-user INP, rendered FPS or physical-device behavior.

## Performance measurements

Lighthouse measured normal production functionality on 17 October 2026, without audit-specific disabling. Desktop uses 40 ms RTT / 10 Mbps / CPU ×1; mobile uses 150 ms RTT / 1.638 Mbps / CPU ×4.

| Page | Desktop performance | Mobile performance | Desktop LCP | Mobile LCP |
| --- | ---: | ---: | ---: | ---: |
| Home | 98 | 91 | 1.17 s | 3.49 s |
| Menu | 100 | 88 | 0.69 s | 3.28 s |
| Ritual | 100 | 94 | 0.64 s | 3.06 s |

All six cases scored 100 Accessibility, 100 Best Practices and 100 SEO, with CLS 0. Mobile performance meets the initial 85 target, but mobile LCP still misses the 2.5-second target. The measurements are lab results, not real-user INP or physical-device FPS. The menu improved from 78 to 88 mobile performance and from 5.33 s to 3.28 s LCP after responsive image delivery and reduced hydration/animation setup. Scores can vary between runs; raw reports are retained locally, with summaries in `performance-results.json`.

Next.js reports 138–147 kB first-load JavaScript across primary/detail routes. Scroll animation code is only loaded on routes with scroll scenes; menu cards use CSS motion. Phone drink-image sheets total 269 KiB versus 1.18 MiB for the original full-size set.

## Known limits

- Browser testing used Chromium and emulated phone/tablet dimensions, not physical Safari/iOS devices.
- The background brewing sequence is intentionally subtle 2D illustration. There is no 3D cup, realistic fluid simulation or extraction video.
- Language switching and preferences require JavaScript. With JavaScript disabled, English core content and ordinary page links remain available.
- Generated images are illustrative; the closeup view reuses the corresponding portrait. No real menu ordering, payments, reservations, address or operating hours are claimed.
- Favorites and sound preference are local to the browser; no account or backend is configured.

## Run and publish

```bash
npm ci
npm run dev
# Production preview:
npm run build
npm start
```

Both serve http://localhost:3000. Restart the static preview after a build. Validation commands and asset details are in `README.md`.

Publication target: https://velune-theta.vercel.app/ from https://github.com/Slepyyy047/velune, Vercel project `velune` in `slepyyy047`, production branch `main`. Git integration builds `main`; Vercel deployment history identifies the exact current production commit.

# VELUNE — photography and navigation revision

19 October 2026. This revision restores the photographic brand composition requested by the owner while retaining the café/menu focus.

## Completed changes

- Restored the real HTML `velune.` wordmark over the café interior. The complete 3:2 photograph is displayed without cover cropping or a split column. Desktop width is fitted to the available viewport height so the whole original frame is visible in the first screen. Mobile also keeps the original frame.
- Added shared photographic sections and headings to the home, menu, café and drink-detail pages, with restrained dark overlays for readable foreground type.
- Replaced all rendered photographic cup/bean cutouts with three original SVG line drawings: cup, beans and filter. Drawings scale cleanly on phones. The former cutout files remain only as archived assets; no page renders them.
- Extended the homepage with a short welcome, three featured drinks, a photographic coffee counter, illustrated cappuccino feature, cold-brew/matcha pair, full-width seating photograph, three seating options and four native expandable coffee questions. No journal or philosophy pages were restored.
- Made the header sticky on desktop and mobile. Navigation includes Home, Menu, At the counter, The café and Questions. Same-page mobile anchor clicks close the navigation and restore scrolling. Scroll padding keeps destination sections below the header.
- Preserved the twenty dedicated drink pages, prices, ingredients/allergens, separate tabs, search/filters, persistent favorites, English/Russian content, interior gallery and reduced-motion behavior.

## Verification

- Production static build and TypeScript passed.
- Final Playwright run: 32/32 passed in 1.9 minutes across desktop and mobile Chromium, with no skipped or flaky tests.
- Tests cover the complete-photo geometry, wordmark inside the image, absence of photographic stickers, sticky header, navigation to home anchors from drink pages, mobile menu dismissal, keyboard FAQ behavior, all 20 drinks, menu search/categories, cross-tab favorites, Russian persistence, gallery, reduced motion, sound, blocked storage and critical content without JavaScript.
- Axe: 12 desktop/mobile route-language checks, zero WCAG A/AA violations.
- Visual checks: 21 route/viewport cases at 1440, 768 and 390 px, with no horizontal overflow, broken images or browser errors. Home, menu and café screenshots were manually inspected.
- Additional responsive/axe checks: 6/6 passed at 320, 390 and 1440 px, including Russian at 320 px.

## Loading improvements

Critical photo headers have media-specific image preloads. The mobile menu uses an 800 px, 58 KB espresso image; the desktop keeps the original. The enlarged gallery photograph is mounted only while its dialog is open, avoiding eager loading of hidden modal content. All improvements are enabled for normal visitors and measurements.

## Assets and rendering

The original generated concept interior and twenty drink photographs are reused. The new line drawings are authored SVG paths in `components/coffee-drawing.tsx`; they need no model downloads, textures, image generation or external asset license. No WebGL, 3D cup, forced intro or scroll interception is used. The drawings and text entrances respect reduced motion. The main architectural image does not animate its scale or crop.

## Routes and deployment

23 content pages: `/`, `/menu/`, `/visit/`, and twenty `/menu/[slug]/` pages. Retired `/story/`, `/experience/` and journal URLs continue redirecting to the current café/menu pages. Public GitHub repository: `Slepyyy047/velune`. Production Vercel project: `velune`. Live URL: https://velune-theta.vercel.app/.

## Run

```sh
npm ci
npm run dev
```

Production export:

```sh
npm run build
npm start
```

Open `http://localhost:3000`. Restart the static preview after rebuilding. Node.js 22+; no API keys or backend required. Browser checks use `/usr/bin/chromium` unless `CHROMIUM_PATH` is set.

## Limitations

The café remains fictional; no real address, opening hours, orders or bookings are represented. Imagery depicts the concept, not actual premises or prepared products. Browser verification uses Chromium; physical Safari/phone GPU performance and field INP were not measured. Lab performance measurements are recorded below and in `performance-results.json`.

## Lab performance

Lighthouse 12.8 / Chromium, compressed static export. Desktop: 40 ms RTT, 10 Mbps, 1× CPU. Mobile: 150 ms RTT, 1.6 Mbps, 4× CPU.

| Page | Desktop performance | Mobile performance | Desktop LCP | Mobile LCP |
| --- | --- | --- | --- | --- |
| Home | 98 | 91 | 1.11 s | 3.49 s |
| Menu | 97 | 89 | 1.11 s | 3.73 s |
| The café | 97 | 90 | 0.89 s | 3.42 s |

All six final recorded runs scored 100 for Accessibility, Best Practices and SEO; CLS was 0. After the loading fix, mobile café performance increased from 65 to 90 and mobile menu performance from 86 to 89. Mobile LCP (3.4–3.7 s) remains above the 2.5 s goal under the simulated slow-device profile; the performance score goal of 85 is met. These are lab results, not field INP or physical-device frame-rate measurements.

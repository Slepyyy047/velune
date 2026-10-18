# VELUNE — café redesign

18 October 2026. Verification ran on 17 October 2026; the release was finalized on 18 October. This revision supersedes the earlier editorial/coffee-journey design at the owner's request.

## What changed

- Three primary destinations: Home, Menu, The café. Removed the journal, philosophy and ritual pages from navigation and content. Old editorial URLs redirect to the menu or café through both static-export redirects and Vercel routing rules.
- Rebuilt the homepage: lavender brand panel beside architectural photography, three drinks with prices, a cappuccino feature, and a short interior section. No journal feed, manifesto or coffee-journey chapters.
- Rewrote all twenty drink summaries in plain language and shortened recipe notes. Updated English/Russian content and retained search, filters, persistent favorites, separate drink tabs and full ingredients/allergens.
- Added two generated photographic cutouts: a lavender ceramic cappuccino and scattered coffee beans. Soft reversible scroll movement and photo entrances; no 3D model, canvas, WebGL, forced intro, custom cursor or scroll interception.
- Preserved keyboard-accessible gallery, responsive navigation, reduced-motion support, opt-in sound and the fictional-café disclosure. No real location, booking, checkout or opening hours are claimed.

## Routes

23 content pages: `/`, `/menu/`, `/visit/`, and twenty `/menu/[slug]/` pages. `/story/` redirects to `/visit/`; `/experience/`, `/journal/`, and the five former article URLs redirect to `/menu/`.

## Assets

Existing optimized concept interior and drink photography is reused. The two new cutouts total approximately 168 KB compressed, with alpha retained. Sources and generation provenance are recorded in [DRINK-IMAGE-SOURCES.md](DRINK-IMAGE-SOURCES.md). Generated imagery is not represented as photographs of an operating venue. No external 3D assets are needed for this design.

## Verification

- Production static build and TypeScript: passed.
- Playwright: 26/26 desktop and mobile Chromium tests passed in 1.7 minutes. Includes all twenty drink pages, search/categories/empty states, cross-tab favorites, Russian persistence, old URL redirects, gallery/navigation, decorative scroll reversal, reduced motion, sound, blocked storage, and critical content without JavaScript.
- After final contrast and pointer-effect cleanup: 8/8 relevant desktop/mobile regression tests passed in 28.4 seconds.
- Visual checks: 21 route/viewport cases at 1440, 768 and 390 px; no overflow, broken images or browser errors. Homepage screenshots were manually inspected at all three widths, including Russian at tablet width.
- Axe accessibility: 12 desktop/mobile English/Russian cases passed with zero WCAG A/AA violations after fixing footer contrast.
- Final responsive/axe checks after mobile typography and photo optimization: 6/6 cases passed at 320, 390 and 1440 px, including Russian on the narrowest viewport. No overflow, broken images, browser errors or WCAG A/AA violations.
- React review: animation effects and listeners clean up, scroll handlers are passive and frame-throttled, GSAP loads conditionally, decorative imagery cannot intercept pointer input, and primary content is statically rendered.

## Performance measurements

Lighthouse 12.8, local compressed production export, Chromium. Desktop uses 40 ms RTT / 10 Mbps / 1× CPU; mobile uses 150 ms RTT / 1.6 Mbps / 4× CPU. These are lab measurements, not real-user field metrics.

| Page | Desktop performance | Mobile performance | Desktop LCP | Mobile LCP |
| --- | --- | --- | --- | --- |

| Home | 98 | 90 | 1.07 s | 3.52 s |
| Menu | 100 | 92 | 0.69 s | 3.26 s |
| The café | 99 | 90 | 0.91 s | 3.55 s |

All six runs scored 100 for Accessibility, Best Practices and SEO; CLS was 0. The mobile interior page improved from 80 to 90 after serving the smaller hero image and removing initial image-transform work. Mobile LCP remains above the 2.5-second goal (3.3–3.6 s); photography and client hydration remain the main tradeoffs. No physical Safari/device-GPU or field INP measurements were performed.

## Run

```sh
npm ci
npm run dev
```

Production preview:

```sh
npm run build
npm start
```

Open `http://localhost:3000`. Restart the preview after rebuilding because it caches static files. Node.js 22+; no API keys or backend required. Chromium must be available for browser tests; use `CHROMIUM_PATH` to override `/usr/bin/chromium`.

## Deployment

The existing public GitHub repository `Slepyyy047/velune` is connected to Vercel project `velune`. Production builds from `main`, with `out/` as the static output. Live address: https://velune-theta.vercel.app/.

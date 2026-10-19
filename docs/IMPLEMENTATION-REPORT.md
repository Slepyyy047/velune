# VELUNE — coffee & bakery revision

19 October 2026. The owner's supplied café references guide the softer layout, food photography, rounded modules and compact cards. The original sage/lavender palette, café-backed wordmark and sticky navigation are retained.

## Completed

- Redesigned the home, catalogue and shared details with a sage outer frame, cream surfaces, lavender accents, rounded photographs, circular coffee portraits and compact bakery cards. Added an original coffee-and-croissant photograph.
- Expanded from 20 to **36 drinks**, adding vanilla, caramel, mocha, white chocolate, pistachio, Spanish, honey/cinnamon, orange espresso, iced caramel, iced mocha, coconut, affogato, strawberry matcha, iced matcha, chai and dirty chai.
- Added **18 desserts**: six pastries, seven cakes/chilled desserts and five cookies/small bakes. Each has a USD price, portion, ingredients, allergen/dietary notes, original photograph and short preparation instructions.
- Added a dedicated `/desserts/` page. Drink/dessert tabs, category deep links, English/Russian search, accent-insensitive matching, empty states and persistent cross-tab favorites work across the expanded catalogue.
- All 54 items have separate static detail pages. Food breadcrumbs return to desserts; related items and previous/next navigation stay within their collection and use dynamic counts.
- Simplified homepage copy and all 20 older preparation descriptions. New descriptions use concrete ingredients and methods. New item names, ingredients, descriptions, notes and allergens are translated; a dictionary audit found no missing new-item translations.
- Kept the complete original café photograph behind the real HTML `velune.` wordmark, sticky desktop/mobile navigation, café gallery, native expandable questions, reduced motion, opt-in sound and WebGL-free rendering.

## Routes

**58 content pages**: `/`, `/menu/`, `/desserts/`, `/visit/`, and 54 `/menu/[slug]/` pages. Former story/experience/journal URLs continue redirecting to current pages. No payment, booking, delivery, account or newsletter backend is represented.

## Assets

54 distinct product photographs are mapped to 54 items. The 34 new items use nine original generated image sheets; two desserts also have separately generated detail views. The new landscape banner and delivery variants are optimized locally. Original masters and provenance are retained in [CATALOGUE-ASSETS.md](CATALOGUE-ASSETS.md) and `assets/catalogue-images.json`. No required photo assets are missing in the released scope. No 3D assets are used or needed.

## Verification

- Production export and TypeScript passed.
- Final Playwright run: **48/48 passed** across desktop and mobile Chromium. The full detail-page test opens all 54 item routes and checks title, price, ingredients, dietary information and loaded portrait images.
- Tests also cover complete hero geometry at 320–2560 px, centered lettering, mouse refraction/settling, touch fallback and a runtime switch to reduced motion. Catalogue tests cover dessert categories, deep-link/reload persistence, accent-insensitive search, dessert detail tabs, grams/portions, allergen information, cross-tab favorites, Russian ingredient search, and manual keyboard tab activation (arrows move focus, Enter/Space activates). Existing tests cover navigation, complete hero geometry, sound, gallery, reduced motion, blocked storage and critical content without JavaScript.
- Axe accessibility: 20 route/viewport/language cases, zero WCAG A/AA violations.
- Visual audit: 33 route/viewport cases at 1440, 768 and 390 px, with no overflow, broken images or browser errors. Home and dessert pages were manually inspected on desktop and phone.
- Final narrow-screen audit: 9 cases at 320, 390 and 1440 px, including Russian at 320 px; no overflow, broken images, page errors or axe violations.

## Performance measurements

Lighthouse 12.8 against the production export, with all normal functionality enabled. Desktop: 40 ms RTT, 10 Mbps, 1× CPU. Mobile: 150 ms RTT, 1.6 Mbps, 4× CPU slowdown. These are local laboratory measurements rather than field data. Home was rerun after the wide-layout/wordmark update; the other routes retain their measurements from the bakery revision earlier the same day.

| Page | Desktop score / LCP | Mobile score / LCP |
| --- | --- | --- |
| `/` | 96 / 1.40 s | 90 / 3.62 s |
| `/menu/` | 99 / 0.83 s | 89 / 3.75 s |
| `/desserts/` | 98 / 1.17 s | 86 / 4.06 s |
| `/visit/` | 99 / 0.89 s | 91 / 3.54 s |

All eight measurements recorded CLS 0. Desktop blocking time was 0–1 ms; mobile was 44–129 ms. Accessibility scored 100 on all four pages; SEO scored 100 throughout. The initial performance goal of 85+ was reached. The 2.5 s LCP goal was reached on desktop, but **not on the throttled mobile profile** (3.54–4.06 s). Complete photographic compositions and the usable bilingual catalogue remain enabled. Field INP has not been measured. Raw summary: `performance-results.json`.

## Wide layout and liquid wordmark update

The desktop frame now expands to 1840 px. The home interior uses the available width rather than being constrained by viewport height, remains centered and retains its complete 3:2 composition. On short desktop windows the photo continues below the fold instead of becoming a narrow inset. The HTML wordmark is centered over the photograph.

Mouse hover adds smooth SVG refraction, a small amount of directional blur and localized sage/lavender echoes. Pointer coordinates are interpolated without React renders. The animation loop and filter stop after the effect settles, when the heading leaves view, or when the tab loses focus. Touch and reduced-motion preferences leave the wordmark clear. No dependencies, WebGL or image downloads were added. Compact coffee descriptions were darkened after the wide-screen contrast audit.

Final validation for this update: production export/types passed; 48 functional tests passed. Nine further visual cases cover 320, 390, 1366, 1920 and 2560 px, English/Russian home, menu, desserts and a drink detail. No overflow, broken images or browser errors; both home axe checks (1920/390 px) have zero violations after the contrast correction. See `wordmark-layout-checks.json`.

## Run and deployment

```sh
npm ci
npm run dev
```

Production preview:

```sh
npm run build
npm start
```

Open `http://localhost:3000`. Restart the static preview after building because it caches files. Node.js 22+; no API keys or database required. Browser checks use `/usr/bin/chromium` unless `CHROMIUM_PATH` is set.

The public `Slepyyy047/velune` GitHub repository is linked to the existing Vercel project `velune`. Production publishes `out/` from `main`. Live address: https://velune-theta.vercel.app/.

## Limits

VELUNE is a fictional café. There is no real address or opening schedule, and generated imagery represents the concept. Prices and recipes are illustrative; preparation/allergen notes are not a substitute for an operating café's verified information. Testing used Chromium rather than physical Safari/phones; field INP and real device GPU/frame-rate measurements were not collected.

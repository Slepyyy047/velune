# VELUNE — implementation report

Prepared 16 October 2026. This report distinguishes the working website from the remaining production-art requirements. VELUNE is a fictional concept, not an operating café.

## 1. Completed features

- Brand-first architectural homepage with real HTML `velune.`, local Instrument Serif / Manrope, cream/sage/lavender palette, original concept photography and responsive editorial compositions.
- Six connected primary pages and five complete article routes; semantic navigation, mobile menu, footer, not-found/error states, a genuine 3D-loading indicator, metadata and local assets.
- Exactly 20 drinks across six categories. Search includes names, descriptions, ingredients and flavor notes. Category filters, result counts, empty state, details dialogs, price/size/ingredients/allergens and persistent local favorites work without a backend.
- Journal reading times, cover/supporting images, four substantive sections per article and related links. Visit page states clearly that there is no real address, café, reservation service or operating schedule.
- Interior lightbox with keyboard controls. Interactive grind-size explanation. Explicit opt-in interface sound with persistent preference.
- Immediate CSS hero entrance and GSAP section entrances and reversible scroll bean accents; subtle magnetic links, pointer-only cursor accent, short nonblocking route wash; reduced-motion alternatives. All scroll-section text remains readable before animation.
- Lazy interactive cup: drag/touch rotation, keyboard and button rotation, limited zoom, reset, three inspection views, adaptive rendering, image mode and WebGL/context-loss fallback.
- Four-chapter experience controller: deterministic bean study; labeled grinding/extraction stills; final Sage cup study. Play/pause and manual chapter selection work.

## 2. Routes

| Route | Content |
| --- | --- |
| `/` | Brand introduction, signatures, atmosphere, craft, journal, visit invitation |
| `/menu/` | Searchable/filterable 20-drink menu and local favorites |
| `/story/` | Philosophy, sourcing principles, interactive grind study and process |
| `/experience/` | Bean-to-cup visual study and interactive Sage Edition |
| `/journal/` | Editorial index for five stories |
| `/visit/` | Concept location, atmosphere, gallery and explicit fictional disclosure |
| `/journal/the-art-of-slow-coffee/` | Practical slow-brewing ritual |
| `/journal/understanding-espresso/` | Espresso ratios, grind and tasting |
| `/journal/a-ritual-in-every-cup/` | Everyday rituals and personal preference |
| `/journal/the-beauty-of-thoughtful-spaces/` | Daylight, materials, acoustics and accessible spatial design |
| `/journal/from-bean-to-brew/` | Processing, roasting, freshness and sourcing transparency |

## 3. 3D assets used

The original `public/models/velune-sage-study.glb` contains 13 meshes and 23,680 triangles, approximately 1.04 MB uncompressed. Its reproducible generator is `scripts/build-cup.mjs`. Geometry includes the tapered side, inner wall, rolled rim, folded foot, recessed bottom, overlap seam, compound lid collar, drinking wall, sip opening, vent and molded details. The live material uses a curved 2048×1024 typographic map, deterministic grain, matte PBR settings and procedural studio lighting. It is labeled a design study.

The bean scene uses 36 instanced procedural creased beans, with size/orientation variation and deterministic, reversible paths. This is simplified contact, not a full rigid-body simulation. Home bean accents are CSS illustrations. The generated cup still is separate from the GLB; it is not falsely presented as a render of that model.

## 4. Missing or incomplete production assets

A licensed/commissioned professional grinder GLB, technically validated mechanical animation, realistic extraction footage/offline liquid render, multiple scanned bean meshes, full cached collision trajectories, calibrated scanned paper/lid textures and manufacturer-validated cup dimensions remain outstanding. The homepage cup is a still accent, not live WebGL. Exact photographs of all twenty recipes are not supplied: shared category imagery is disclosed in the menu.

`3D-PRODUCTION-PLAN.md` specifies geometry, UVs, materials, lighting, animation, licensing, mobile budgets, exports and acceptance criteria. These gaps prevent claiming the full photorealistic Coffee Journey is complete.

## 5. Validation

Final Chromium functional run: **38 passed, 2 intentionally skipped, 0 failed, 0 flaky**, in 214.8 seconds. The two skips separate mobile-only navigation from desktop-only navigation. Coverage includes all six routes, exactly twenty drinks and category counts, search/empty states, persistence/removal, ingredient/allergen details and focus return, signature deep links, five complete articles, mobile/desktop navigation, grind guidance, gallery, sound preference, 3D rotation/zoom/reset, real pointer and emulated touch drag, deterministic scrubbing, reduced motion, blocked storage, unavailable WebGL, context-loss fallback, plus visible menu content without JavaScript and readable scroll content before animation. `npm run typecheck` and the production `npm run build` also passed. Machine-readable evidence: `playwright-results.json`. Earlier passes found and fixed a cup UV placement error, article overflow at 768 px, decorative-text contrast and accessible-name mismatches. A desktop drag test initially timed out while several software-GPU browser jobs ran concurrently; the final run avoids concurrent 3D browser jobs and uses adaptive DPR, and an appropriate software-rendering timeout.

A subsequent lifecycle check reproduced an issue where intentionally closing the cup triggered the WebGL-loss fallback. The context-loss listener now cleans up when the scene unmounts. Focused Playwright regression run after the final rebuild: **4 passed in 24.7 seconds**, covering repeated opening/closing and genuine context-loss fallback on desktop and emulated mobile. These checks were run separately from the full-suite result above.

Automated accessibility: **0 violations across 16 checks** (seven representative page routes at 1440 and 390 px, plus the drink dialog at each width), using axe WCAG 2 A/AA and 2.1 checks. Ten automatic checks remained marked incomplete and require human judgement; automated results are not a certification. Keyboard focus, dialog dismissal, reduced motion and touch controls were separately exercised in functional tests.

Visual QA: **21 page/viewport combinations** at 1440, 768 and 390 px, plus six cup/lid captures. No horizontal overflow, missing images, HTTP asset failures or page errors in the final run. Representative Home, Menu, Visit, tablet article and 3D views were visually reviewed. Evidence: `visual-results.json`, `accessibility-results.json`, and `screenshots/`.

## 6. Performance

Production uses static export, locally hosted optimized imagery/WOFF2 fonts, gzip preview delivery, lazy supporting images and dynamic 3D. After measurement revealed desktop Menu CLS of 0.355 and mobile load costs, menu rendering was separated from its query-only Suspense boundary so all 20 drinks are in the initial HTML. Fonts were compressed from 316,560 to 112,140 bytes; navigation no longer speculatively prefetches every route; GSAP is skipped on routes without scroll scenes; WebGL context creation waits for an interaction. Generic scroll reveals retain full text opacity at all times. The global App Router loading boundary was also removed from the static export after a no-JavaScript test exposed hidden streamed content; loading feedback remains attached to actual 3D downloads. The actual production behavior was optimized for every visitor; no audit-specific code or disabled test functionality is used. Runtime images total about 1.07 MiB. Next.js reports approximately 107 KB first-load JS on Home, 112 KB on Menu, and 113 KB on Experience before on-demand scene chunks. The static output is approximately 5.4 MiB uncompressed.

Lighthouse measured the production export with its normal functionality on 16 October 2026. Desktop: 40 ms RTT, 10 Mbps, CPU ×1. Mobile: simulated 150 ms RTT, 1.638 Mbps, CPU ×4, 390×844 viewport. These are initial navigation measurements: visitors explicitly activate 3D, which was tested separately. Raw results are in `performance-results.json` and `lighthouse/`.

| Page | Desktop performance | Mobile performance | Desktop LCP | Mobile LCP |
| --- | ---: | ---: | ---: | ---: |
| Home | 98 | 89 | 1.09 s | 3.42 s |
| Menu | 100 | 94 | 0.60 s | 3.01 s |
| Experience | 96 | 81 | 0.84 s | 3.22 s |

All six measurements scored **100 Accessibility, 100 Best Practices, 100 SEO**, with **CLS 0**. Mobile LCP misses the 2.5-second goal; Experience mobile also misses the initial performance goal of 85. Its mobile total blocking time was 465 ms. This is an observed limitation of initial JavaScript/hydration under simulated CPU throttling, not a passing result. Scores vary between runs; the table records the latest complete six-run measurement before the subsequent 3D event-listener cleanup, which only affects an activated scene. A CDN and physical-device profiling remain necessary before public production sign-off.

Separate runtime probe (`runtime-profile.json`) completed four cup mount/unmount cycles with no failed asset responses. Active JS heap ranged from 9.43–12.08 MB; after requested garbage collection it rose from 7.54 to 8.58 MB across the four closures. That short sample does not establish a leak-free steady state or measure GPU memory. Recorded menu event durations were 16–24 ms in this unthrottled lab. Idle requestAnimationFrame intervals had a median of 16.7 ms; because the renderer runs on demand, this is not rendered-animation FPS.

Real-user INP, physical-phone GPU behavior, sustained rendered FPS and production-network performance are unmeasured and must not be inferred from local lab scores.

## 7. Known limitations and delivery

- This is a working concept website with an interactive 3D design study; the final production-art requirements above are not fulfilled.
- All photographs are generated concept imagery. See `ASSETS.md` for provenance and font licenses in `public/fonts/`.
- Browser QA uses Chromium desktop and emulated mobile/tablet dimensions, not physical Safari/iOS devices.
- Favorites/sound are browser-local. There is no account, checkout, booking, contact backend or pretend submission.
- The static build is prepared locally. Hosted publication is not verified: the Sites plugin's required source/packaging helpers are absent from this executor, including after environment recovery. No Site ID, hosted URL or successful deployment is claimed.
- Set `NEXT_PUBLIC_SITE_URL` before deployment to give social metadata the correct origin; the local default is `http://localhost:3000`.

## 8. Run and deploy

```bash
cd /workspace/sites/velune
npm ci
npm run dev
```

For the production preview:

```bash
npm run build
npm start
```

Both use http://localhost:3000. `npm start` serves `out/` with compression, caching and a custom 404 response. Upload the contents of `out/` to a static host with directory-index support and configure `404.html` as its not-found response. No credentials or database are needed.

Verification commands and environment variables are documented in `README.md`. Delivery includes `velune-source.zip`, `velune-static.zip` and `velune-qa.zip` (screenshots, raw Lighthouse reports and machine-readable results). Each archive is CRC-checked by `scripts/package.py`. Dependencies and build caches are excluded from source delivery.

# velune.

Live site: https://velune-theta.vercel.app/

Source: https://github.com/Slepyyy047/velune

A fictional premium specialty coffee shop concept based in Osaka, built with Next.js App Router, React, TypeScript, Three.js, React Three Fiber, Drei and GSAP. Six primary pages, five complete articles, a 20-drink menu and an original interactive cup study. No real café, payments, reservations, address or backend is represented.

## Run

Requires Node.js 22+ and npm.

```bash
npm ci
npm run dev
```

Open http://localhost:3000. For a production static build:

```bash
npm run build
npm start
```

This project uses Next.js `output: 'export'`. Deploy the **contents of `out/`** to any static host supporting directory indexes. `npm start` runs the included compressed static preview server; `next start` is not used for a static export. All image/font/model assets are local; no service credentials are needed. Deep route URLs use trailing slashes. Serve `404.html` as your host's missing-page response.

## Verify

```bash
npm run typecheck
npx playwright install chromium
CHROMIUM_PATH=/path/to/chromium npm run test:e2e
npm run test:a11y
npm run test:visual
npm run test:performance
node scripts/runtime-profile.mjs
```

Tests expect a running server at http://localhost:3000; override `BASE_URL` if needed. Playwright defaults to `/usr/bin/chromium` in this workspace. If using Playwright's downloaded browser, set `CHROMIUM_PATH` to its executable. The audit script respects the same variables.

## Structure

- `app/`: six page routes, journal article routes, error/not-found states, metadata, responsive design tokens and styling.
- `components/`: navigation, footer/sound, menu interactions, gallery, motion, grind study, experience controller, actual-load 3D indicator and reusable editorial components.
- `components/three/`: lazily imported cup/bean scenes, camera control, runtime materials and adaptive rendering.
- `data/`: typed 20-drink dataset and five original journal articles.
- `public/`: optimized WebP imagery, locally hosted fonts, original authored GLB.
- `assets/originals/`: master generated imagery, excluded from the runtime export.
- `scripts/`: reproducible cup generation, image preparation, visual/accessibility/performance audits.
- `tests/`: functional end-to-end coverage.
- `docs/`: asset provenance, production specification, screenshots, measurements and implementation report.

The CSS is a custom responsive design system; Tailwind and Motion were intentionally not added because neither is needed for this implementation. GSAP handles scroll motion; native CSS handles the immediate hero entrance and simple interface transitions; R3F handles model motion.

## Content and persistence

The concept menu is in USD. Images illustrate drink styles, not all twenty exact recipes. Favorites and sound preference use local storage only; blocked storage has a session fallback. Sound is off until explicitly enabled and only plays during interactions. Menu detail dialogs, mobile navigation and gallery support keyboard use. The app does not send contact, booking or order messages.

## 3D scope

The cup is a 13-mesh authored GLB design study with detailed rim, base and lid geometry. It is not claimed to meet the final photorealistic standard. The 36-bean scene uses deterministic simplified paths, not full collision physics. Professional grinder animation and extraction footage are not supplied; their chapters display honestly labeled stills. See [3D production plan](docs/3D-PRODUCTION-PLAN.md) and [asset provenance](docs/ASSETS.md).

Regenerate assets:

```bash
node scripts/build-cup.mjs
node scripts/prepare-images.mjs
```

Instrument Serif and Manrope are locally hosted Google Fonts, distributed under the SIL Open Font License. License files are retained in `public/fonts/`.

Before publishing to your own domain, set `NEXT_PUBLIC_SITE_URL` to that origin and rebuild so social-image metadata resolves to the deployed site. The local default is `http://localhost:3000`.

Prebuilt WOFF2 fonts reduce runtime font transfer to about 110 KiB. TTF masters and licenses are retained; optional regeneration uses `python scripts/prepare-fonts.py` with `fonttools` and `brotli` installed.

## Package

```bash
python scripts/package.py /path/to/delivery
```

Creates CRC-verified source, static-export and QA-evidence ZIP files. Run `npm run build` first. Restart the preview server after rebuilding; it caches static files in memory. See [implementation report](docs/IMPLEMENTATION-REPORT.md) for executed checks, measured performance and outstanding production assets.

## Vercel deployment from GitHub

The GitHub repository is connected to the existing Vercel project `velune`; pushes to `main` trigger deployment. `vercel.json` selects a static deployment: `npm ci`, `npm run build`, and output directory `out`. No database or application secrets are required. Social metadata uses `NEXT_PUBLIC_SITE_URL` when set, otherwise Vercel's production-domain environment variable. Local Vercel project linkage and environment files are excluded from Git.

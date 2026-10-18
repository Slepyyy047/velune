# velune.

Live: https://velune-theta.vercel.app/

Source: https://github.com/Slepyyy047/velune

A fictional Osaka specialty coffee concept built with Next.js App Router, React, TypeScript and GSAP. Three primary pages, twenty dedicated drink pages, English/Russian content, and subtle photographic coffee decorations. The former interactive 3D cup has been removed at the owner's request.

## Run

Node.js 22+ and npm:

```bash
npm ci
npm run dev
```

For a production static build:

```bash
npm run build
npm start
```

Both serve http://localhost:3000. `npm start` serves `out/` with compression; restart it after rebuilding because files are cached in memory. Next.js uses static export and trailing slashes. No database, API keys or service credentials are needed.

## Verify

With the production preview running:

```bash
npm run typecheck
npm run test:e2e
npm run test:a11y
npm run test:visual
npm run test:performance
node scripts/runtime-profile.mjs
```

Tests default to `/usr/bin/chromium`. Set `CHROMIUM_PATH` for another installed Chromium executable, and `BASE_URL` for another server. Screenshots and raw Lighthouse reports are ignored by Git; summary JSON is retained in `docs/`. See [the implementation report](docs/IMPLEMENTATION-REPORT.md) for actual executed results and limitations.

## Structure

- `app/`: three primary routes, twenty static drink routes, redirects for retired editorial URLs, metadata and responsive CSS.
- `components/`: menu filters, persistent favorites, language provider, photo crops, drink details, gallery, navigation, sound preference and motion.
- `components/coffee-background.tsx`: decorative coffee-bean photographs with a small reversible scroll offset. No WebGL, canvas or story sequence.
- `data/`: drink recipes, distinct preparation copy, archived journal data, Russian dictionary and twenty-photo crop manifest.
- `public/`: local optimized images and licensed local fonts.
- `assets/originals/`: generated image masters; not part of the deployed static output.
- `tests/`, `scripts/`, `docs/`: functional tests, visual/accessibility/performance checks, provenance and results.

Content is visible before animation enhancement. CSS handles hero, letter interactions, card transitions and hover feedback; GSAP handles section entrances and reversible image movement. Reduced-motion preferences disable decorative movement. Russian headings use Georgia for Cyrillic coverage; the Latin wordmark keeps Instrument Serif.

## Content and persistence

All prices are illustrative USD prices. Each drink has a distinct generated concept photograph, ingredients, allergens, volume, tasting notes and preparation copy. Menu cards open dedicated detail pages in new tabs; related/previous/next drink links stay within the detail tab. A second image view is honestly labeled as a closer crop of the same photograph.

English/Russian is switched in the header and saved locally. `?lang=ru` or `?lang=en` can set the language of a shared page. Favorites synchronize between tabs. Sound is off until enabled; it plays only during interactions. Favorites, language and sound use local storage; the menu remains usable when storage is blocked.

All current pages and recipe descriptions are translated. Editorial pages were retired at the owner’s request; their URLs redirect to the café or menu. No account, checkout, booking, real street address or contact backend is represented. Images depict an imagined café, not actual premises or prepared products. See [asset provenance](docs/ASSETS.md) and [drink image sources](docs/DRINK-IMAGE-SOURCES.md).

## Publish

GitHub `main` is connected to the existing Vercel project `velune`. `vercel.json` uses `npm ci`, `npm run build` and the `out` directory. Pushes to `main` trigger production deployment. Project linkage and environment files are ignored.

For another host, upload the contents of `out/`, support directory indexes and serve `404.html` for missing pages. Set `NEXT_PUBLIC_SITE_URL` to the public origin before building; otherwise metadata uses Vercel's production domain or localhost locally.

Optional archives: `python scripts/package.py /path/to/delivery` after a successful build. Font licenses are retained in `public/fonts/`.

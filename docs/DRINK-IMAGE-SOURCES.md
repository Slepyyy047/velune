# Individual VELUNE drink images

This revision supplies **20 distinct AI-generated drink illustrations** across five original image sheets. They were generated on 17 October 2026 using the available OpenAI image-generation tool. They are photorealistic concept artwork, not photographs of actual prepared recipes or products sold by an operating VELUNE shop.

## Composition and mapping

Each sheet contains exactly four independent photographs in an equal 2 × 2 grid, with no gutters, borders, lettering, logos, or hands. The top-left, top-right, bottom-left, bottom-right sequence follows `data/menu.ts` without changing menu order or recipes. `data/drink-photo-manifest.json` maps all 20 drink IDs to a sheet URL, zero-based column and row, and a brief image description.

| Sheet | Top left | Top right | Bottom left | Bottom right |
| --- | --- | --- | --- | --- |
| 1 | Espresso | Americano | Espresso Macchiato | Cortado |
| 2 | Flat White | Cappuccino | Velune Latte | Oat Latte |
| 3 | Hand-Poured Coffee | Daily Filter | AeroPress | Slow Cold Brew |
| 4 | Iced Latte | Espresso Tonic | Matcha Latte | Hojicha Latte |
| 5 | Dark Chocolate | Lavender Cloud | Black Sesame Latte | Yuzu Cold Brew |

The images distinguish black coffee from milk coffee, hot tea lattes from iced drinks, small espresso portions from larger drinks, white milk foam from grey sesame and green matcha, and orange tonic from yuzu cold brew. Props indicate listed ingredients but are not additional recipe claims. The images cannot certify serving volumes, ingredients, allergen safety, or equipment accuracy; menu text remains authoritative concept information.

## Runtime implementation

Runtime sheets are `public/images/drinks/sheet-1.webp` through `sheet-5.webp`. Originals are archived unchanged outside the served public directory at `assets/originals/drinks/sheet-1.png` through `sheet-5.png`. Original generated files also remain at their initial tool paths. No third-party stock photographs were downloaded.

Use a square image viewport with `background-size: 200% 200%`, and `background-position` equal to `(column × 100%) (row × 100%)` to isolate one quadrant. The underlying image file is never cropped or compositionally edited. A semantic accessible image description should be provided alongside or on the element. Do not show the entire contact sheet on a single-drink card.

The image tool returned square 1254 × 1254 source sheets, despite a request for 2048 × 2048. This provides 627 × 627 native pixels per drink. WebP encoding uses Sharp quality 90 and effort 6, without resizing, cropping, compositing, upscaling, or changes to composition. This is suitable for normal menu cards and moderate detail images; do not claim unlimited-resolution product photography.

## Origin and terms

These are original generated outputs supplied under the image-generation service's applicable terms, rather than assets carrying a separate stock-library license. No exclusive copyright or independent rights clearance is asserted. No borrowed model, product-logo or supplier certification rights are implied. Keep the user-facing imagery disclosure clear, for example: “Original concept illustrations. Actual preparations may differ.”

## Verification

The asset production task checks all sheets visually for quadrant placement, contained vessels, correct overall drink appearance, and absence of text, borders and hands. The manifest is checked against all 20 IDs in menu order, and every encoded WebP is decoded to verify dimensions. Browser crop integration is owned by the application task and must be reviewed in the final layouts.

## Generated source register and executed checks

Original tool files are retained under `/workspace/generated_images/`.

| Sheet | Original generation filename | WebP dimensions | WebP size |
| --- | --- | --- | --- |
| 1 | exec-51b8af90-8bc0-4df7-a51d-9ddb59dc3188.png | 1254 × 1254 | 207.1 KiB |
| 2 | exec-ba7aa6fa-0406-42ce-80af-257c49bcb060.png | 1254 × 1254 | 227.2 KiB |
| 3 | exec-dfd8a355-9c40-432b-8f1e-ae6a8af7a7bb.png | 1254 × 1254 | 253.0 KiB |
| 4 | exec-7ec661e3-abd4-447b-b53b-1ff6bef10f34.png | 1254 × 1254 | 271.4 KiB |
| 5 | exec-2cf13d14-2576-4bc1-a3bd-08e3e0760411.png | 1254 × 1254 | 250.1 KiB |

Executed results: **PASS** — all five originals visually inspected, five WebPs decoded successfully at unchanged dimensions, all 20 menu IDs mapped exactly once in menu order, and all row/column coordinates checked against expected sheet positions. Total runtime transfer for all five sheets: **1.18 MiB**. The image pipeline performed encoding only; no cropping or composition edits.

## Grinding chapter editorial image

Added an original AI-generated landscape concept illustration for the Experience “Grind” chapter, created with the available OpenAI image-generation tool on 17 October 2026. It depicts a conventional enclosed stainless coffee grinder with a translucent bean hopper, metal dispensing chute, and supported stainless portafilter receiving grounds. The pale lilac background and restrained sage accent follow VELUNE's visual palette. This is illustrative equipment imagery, not a photograph of a documented commercial model or an interactive grinder asset; it does not validate mechanical specifications or burr type.

- Original tool source: `/workspace/generated_images/exec-3df78ff9-ad47-4ef9-9b5d-48beb229c8a9.png` (retained).
- Archived original: `assets/originals/grinding.png`.
- Runtime image: `public/images/grinding.webp`, 1100 × 733, 73.4 KiB.
- Processing: proportional resize to 1100 px width, WebP quality 86/effort 6; no compositional editing, cropping, or fabricated motion.
- Verification executed: visual inspection of original and successful decode of optimized WebP with dimensions checked. No hands or product branding.
- Terms and representation: original generated output under the service's applicable terms, with the same concept-art disclosure and rights limitations stated above. It should replace the unrelated pour-over photograph in the grinding chapter, not be presented as footage or a professional 3D grinder model.

## Responsive delivery optimization

The runtime also includes 800 px and 960 px WebP versions of each sheet at quality 80. These are proportional resize/compression variants, with no content changes. Phone cards use the 800 px sheet (400 px per portrait); larger cards use 960 px (480 px per portrait). Detail portraits and closeups retain the original 1254 px runtime sheet.

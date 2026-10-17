# VELUNE visual asset register

All photographs are **original AI-generated concept imagery**, created for this fictional VELUNE project on 15 October 2026 with the available OpenAI image-generation tool. They do not document an operating coffee shop, real Osaka address, actual drink, supplier, certification, or manufactured product. No downloaded stock images or third-party trademarks are used in this image set.

## Origin and usage

The generated images have no separate stock-library license. They are supplied as generated output under the image-generation service's applicable terms; this document does not claim exclusive rights or independently guarantee clearance. Human review is appropriate before a real commercial launch. No third-party model licenses are implied by this image register.

The original generated PNGs are retained, unchanged, in `assets/originals/`. `public/images/sources.json` records each original generation filename. Runtime copies are locally served, optimized WebP files without an external image-host dependency.

| Runtime image | Intended use | Representation |
| --- | --- | --- |
| `hero.webp`, `hero-mobile.webp` | Homepage architecture and Visit | Imaginary cream-plaster and travertine cafe, sage seating, natural daylight |
| `cup.webp` | Sage Edition product editorial; accessible static fallback | Generated product visualization, **not a render exported from the interactive 3D model** |
| `latte.webp` | Milk-based drink cards | Representative category photograph; individual recipes can differ |
| `espresso.webp` | Espresso-classic drink cards | Representative espresso image; volume and preparation can differ |
| `iced.webp` | Iced-coffee cards | Representative iced latte; not an exact image of every listed iced drink |
| `matcha.webp` | Matcha and alternative drink cards | Representative matcha latte; recipe and temperature can differ |
| `filter.webp` | Filter-coffee cards and journal | Representative pour-over equipment and coffee |
| `beans.webp` | Bean narrative and journal | Generated macro still photograph; not a physically simulated animation |
| `ritual.webp` | Craftsmanship and journal | Generated pour-over preparation photograph; not footage or a supplier claim |
| `space.webp` | Interior gallery and architecture journal | Another view of an imaginary cafe space |

As of 17 October 2026, menu and signature cards use twenty distinct generated drink portraits from five equal-quadrant image sheets. CSS crops each portrait without modifying its content. See `DRINK-IMAGE-SOURCES.md` and `data/drink-photo-manifest.json` for mapping, provenance and resolutions. The older category images above remain editorial imagery or unused historical assets. The interactive cup and its GLB were removed at the owner’s request. Drink pages identify a secondary closeup as a crop of the same portrait. Recipes remain illustrative.

## Processing

Run `node scripts/prepare-images.mjs` from the application directory after installing dependencies. The script reads the manifest and uses Sharp to produce WebP images at quality 82 (84 for the hero). The hero's original resolution is 1536 × 1024; it is deliberately not upscaled to 1600. A separate 800 px-wide hero supports mobile delivery. The cup is resized to 1200 px wide and supporting images to at most 1100 px wide. Image dimensions are retained proportionally; no content is synthesized during optimization.

Originals are retained outside `public` for reproducibility. Only optimized runtime assets are included in the static export.

## Historical asset limitations (initial 3D brief; superseded)

These still images do not fulfill the requirement for a professional grinder GLB, a photorealistic takeaway-cup GLB, motion-captured coffee beans, environmental HDR illumination, or physically credible espresso-extraction footage. No generated still is presented as interactive fluid simulation. The production 3D specification must describe missing models, physically based textures, animation, optimization, licensing review and export requirements separately. The initial functional 3D experience should be labeled a material study if production visual fidelity has not been met.

All image assets must receive visual review in their final page crops. Generated depictions of brewing equipment are editorial illustrations, not technical or instructional references.

## Image QA performed

All ten original photographs were visually inspected. The optimization script was executed successfully for all eleven delivered WebP variants. Sharp successfully decoded every runtime image. Runtime dimensions and encoded sizes:

| Image | Dimensions | KiB |
| --- | --- | --- |
| beans.webp | 1100 × 733 | 106.8 |
| cup.webp | 1200 × 800 | 37.1 |
| espresso.webp | 1100 × 733 | 110.0 |
| filter.webp | 1100 × 733 | 77.2 |
| hero-mobile.webp | 800 × 533 | 82.7 |
| hero.webp | 1536 × 1024 | 246.6 |
| iced.webp | 1100 × 733 | 87.6 |
| latte.webp | 1100 × 733 | 87.3 |
| matcha.webp | 1100 × 733 | 90.4 |
| ritual.webp | 1100 × 733 | 75.9 |
| space.webp | 1100 × 733 | 98.5 |

Combined runtime image size: 1.07 MiB. Images should still be lazy-loaded outside the initial viewport; this combined size is not an initial-page transfer target.

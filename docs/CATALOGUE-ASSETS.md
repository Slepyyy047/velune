# Coffee & bakery image assets

Original images generated for VELUNE on 19 October 2026. These are concept visuals, not photographs of an operating café or actual products. The supplied reference sites informed layout and tone; their photography and logos were not copied into the application.

16 new drinks and 18 new desserts have individual, distinct image compositions. Nine generated 2×2 sheets provide these 34 product photographs plus two detail views. The existing 20 drink photographs remain available, making 54 unique mapped product photographs.

All sources are retained under `assets/originals/catalogue/`. Menu delivery uses 800 px sheets on phones and 960 px sheets on desktop (400 / 480 px per item); detail pages use the 1254 px sheets. Resizing and WebP encoding preserve the source proportions. Only the upper two quadrants of dessert sheet 5 are product portraits; its lower quadrants are detail views of the same two desserts.

| Group / sheet | Products | Generation source |
| --- | --- | --- |
| drinks / 6 | vanilla-latte, caramel-latte, mocha, white-mocha | `exec-0fb20c32-668f-4fec-aea2-857d95c2c029.png` |
| drinks / 7 | pistachio-latte, spanish-latte, honey-cinnamon-latte, orange-espresso | `exec-96253a1d-b727-4499-9b85-36bef6c943f0.png` |
| drinks / 8 | iced-caramel-latte, iced-mocha, coconut-iced-latte, affogato | `exec-cf4efb27-30ed-408e-ad89-95445db13cbb.png` |
| drinks / 9 | strawberry-matcha, iced-matcha, chai-latte, dirty-chai | `exec-d114e23f-d774-41fd-b7a2-5656a6272c94.png` |
| desserts / 1 | butter-croissant, almond-croissant, pain-au-chocolat, cinnamon-bun | `exec-e6c44077-bef5-458a-9d2a-b27b50b1f562.png` |
| desserts / 2 | pistachio-swirl, blueberry-danish, basque-cheesecake, strawberry-cheesecake | `exec-cf637950-9552-48dd-acf0-9bb5f2a254be.png` |
| desserts / 3 | tiramisu, matcha-crepe-cake, carrot-cake, chocolate-ganache-cake | `exec-339f3637-8ada-4135-bbeb-9ca4fb727234.png` |
| desserts / 4 | chocolate-chip-cookie, pistachio-cookie, fudge-brownie, lemon-loaf | `exec-73b280b1-1823-4282-b31a-375908a09138.png` |
| desserts / 5 | raspberry-financier, vanilla-panna-cotta | `exec-96d3aa7b-c473-4f11-9e5e-ed539154bfd9.png` |

The coffee-and-croissant banner comes from `exec-53455620-21d4-4045-9117-30f953d70b7a.png`; its master is `assets/originals/catalogue/coffee-croissant.png`. Delivery variants are 1600×900 (244,784 bytes) and 800×450 (66,580 bytes). It is a single complete still-life photograph, with no floating cutouts.

All new generated compositions were visually reviewed. The Spanish Latte recipe is iced, matching the photograph. Financiers are shown as two small cakes per portion. The panna cotta is grouped under chilled desserts.

Reproduction:

```sh
node scripts/integrate-catalogue-images.mjs assets/catalogue-images.json
```

The script regenerates optimized delivery files from retained masters and preserves detail-view mappings. No image-generation credentials are needed to run or build the website.

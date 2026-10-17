import sharp from "sharp";
// Preserve the full-size sheets; generate only proportional delivery variants.
for (let sheet = 1; sheet <= 5; sheet++) {
  for (const width of [800, 960]) {
    await sharp(`public/images/drinks/sheet-${sheet}.webp`)
      .resize({ width })
      .webp({ quality: 80, effort: 6 })
      .toFile(`public/images/drinks/sheet-${sheet}-${width}.webp`);
  }
}

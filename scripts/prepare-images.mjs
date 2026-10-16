import sharp from "sharp";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "public/images");
await mkdir(output, { recursive: true });
const manifest = JSON.parse(
  await readFile(path.join(output, "sources.json"), "utf8"),
);

for (const item of manifest.images) {
  const input = path.resolve(root, item.original);
  const variants =
    item.name === "hero"
      ? [
          { name: "hero", width: 1600 },
          { name: "hero-mobile", width: 800 },
        ]
      : [{ name: item.name, width: item.name === "cup" ? 1200 : 1100 }];
  for (const variant of variants) {
    const info = await sharp(input)
      .rotate()
      .resize({ width: variant.width, withoutEnlargement: true })
      .webp({ quality: item.name === "hero" ? 84 : 82, effort: 6 })
      .toFile(path.join(output, `${variant.name}.webp`));
    console.log(
      `${variant.name}.webp: ${info.width}×${info.height}, ${(info.size / 1024).toFixed(1)} KiB`,
    );
  }
}

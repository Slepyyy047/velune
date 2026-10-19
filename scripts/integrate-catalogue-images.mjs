import sharp from 'sharp';
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
const sources = JSON.parse(await readFile(process.argv[2], 'utf8'));
const manifest = JSON.parse(await readFile('data/drink-photo-manifest.json', 'utf8'));
const provenancePath = 'assets/catalogue-images.json';
let provenance = [];
try { provenance = JSON.parse(await readFile(provenancePath, 'utf8')); } catch {}
for (const entry of sources) {
  const stem = `sheet-${entry.sheet}`;
  const folder = `public/images/${entry.group}`;
  const originals = `assets/originals/catalogue/${entry.group}`;
  await mkdir(folder, { recursive:true }); await mkdir(originals, { recursive:true });
  const original = `${originals}/${stem}.png`;
  const source = entry.source || entry.original;
  if (path.resolve(source) !== path.resolve(original)) await copyFile(source, original);
  const metadata = await sharp(original).metadata();
  if (metadata.width !== metadata.height) throw new Error(`Expected a square image sheet: ${original}`);
  for (const width of [1254,800,960]) {
    await sharp(original).resize({width}).webp({quality:width===1254?87:80,effort:6}).toFile(`${folder}/${stem}${width===1254?'':`-${width}`}.webp`);
  }
  entry.ids.forEach((id,i) => { manifest[id] = {...manifest[id],sheet:`/images/${entry.group}/${stem}.webp`,column:i%2,row:Math.floor(i/2)}; });
  const record={group:entry.group,sheet:entry.sheet,ids:entry.ids,generation:entry.generation || path.basename(entry.source),original};
  provenance=provenance.filter(p=>!(p.group===entry.group&&p.sheet===entry.sheet));provenance.push(record);
}
await writeFile('data/drink-photo-manifest.json',JSON.stringify(manifest,null,2)+'\n');
await writeFile(provenancePath,JSON.stringify(provenance,null,2)+'\n');
console.log(`Integrated ${sources.length} image sheets; ${Object.keys(manifest).length} products mapped.`);

try {
  const original = 'assets/originals/catalogue/coffee-croissant.png';
  for (const width of [1600,800]) await sharp(original).resize(width).webp({quality:width===1600?85:80}).toFile(`public/images/coffee-croissant${width===800?'-mobile':''}.webp`);
} catch (error) { if (error.code !== 'ENOENT') throw error; }

import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { writeFile } from 'node:fs/promises';
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
const results = [];
for (const width of [320, 390, 1440]) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  for (const route of ['/', '/visit/']) {
    await page.goto((process.env.BASE_URL || 'http://localhost:3000') + route, { waitUntil:'networkidle' });
    if (width === 320) await page.getByRole('button', { name:'RU — Русский', exact:true }).click();
    await page.evaluate(async () => {
      for (let y=0;y<document.body.scrollHeight;y+=500) { scrollTo({top:y,behavior:'instant'}); await new Promise(r=>setTimeout(r,60)); }
      scrollTo({top:0,behavior:'instant'});
    });
    await page.waitForTimeout(500);
    const metrics = await page.evaluate(() => ({ overflow:document.documentElement.scrollWidth>innerWidth, brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src), heroSource:document.querySelector('.photo-panel--visit img')?.currentSrc }));
    const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    await page.screenshot({path:`docs/screenshots/cafe-final-${route==='/'?'home':'visit'}-${width}.png`,fullPage:true});
    results.push({width,route,...metrics,violations:axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),errors:[...errors]});
  }
  await context.close();
}
await browser.close();
await writeFile('docs/cafe-final-checks.json',JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
if(results.some(r=>r.overflow||r.brokenImages.length||r.violations.length||r.errors.length))process.exitCode=1;

import { test, expect } from "@playwright/test";
import { drinks, categories } from "../data/menu";
import { desserts, dessertCategories, menuItems } from "../data/catalogue";
const routes = ["/", "/menu/", "/desserts/", "/visit/"];
test("all four café pages load with visible content and no errors or overflow", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", e => errors.push(e.message));
  for (const route of routes) {
    expect((await page.goto(route))?.status()).toBe(200);
    await expect(page.locator("main h1")).toBeVisible();
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(350);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();
    await expect(page.locator("canvas")).toHaveCount(0);
  }
  expect(errors).toEqual([]);
});
test("all 54 menu items have a separate working page and different photograph crop", async ({ page }) => {
  test.setTimeout(180000);
  await page.goto("/menu/");
  await expect(page.locator(".drink-card")).toHaveCount(drinks.length);
  const photos = await page.locator(".drink-card .drink-photo img").evaluateAll(imgs => imgs.map(img => `${img.getAttribute("src")}:${img.getAttribute("style")}`));
  expect(new Set(photos).size).toBe(drinks.length);
  for (const drink of menuItems) {
    expect((await page.goto(`/menu/${drink.id}/`))?.status()).toBe(200);
    await expect(page.locator("main h1")).toHaveText(drink.name);
    await expect(page.locator(".detail-price")).toContainText(`$${drink.price.toFixed(2)}`);
    await expect(page.locator(".drink-facts")).toContainText(drink.ingredients[0]);
    await expect(page.locator(".drink-facts")).toContainText(drink.dietary);
    await expect(page.locator(".drink-preparation")).toBeAttached();
    await expect(page.locator(".drink-portrait img")).toBeVisible();
    await expect.poll(() => page.locator(".drink-portrait img").evaluate(img => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();
  }
});
test("category filters, search and empty states work", async ({ page }) => {
  await page.goto("/menu/");
  for (const category of categories) {
    await page.getByRole("button", { name: category, exact: true }).click();
    await expect(page.locator(".drink-card")).toHaveCount(drinks.filter(d => d.category === category).length);
  }
  await page.getByRole("button", { name: "All drinks", exact: true }).click();
  const search = page.getByRole("searchbox");
  await search.fill("yuzu");
  await expect(page.locator(".drink-card")).toHaveCount(1);
  await expect(page.locator(".drink-card")).toContainText("Yuzu Cold Brew");
  await search.fill("not-a-drink");
  await expect(page.locator(".empty-state")).toBeVisible();
  await page.getByRole("button", { name: "Show all drinks" }).click();
  await expect(page.locator(".drink-card")).toHaveCount(drinks.length);
  await search.fill("oat");
  await page.getByRole("button", { name: "Clear search" }).click();
  await expect(search).toHaveValue("");
});
test("cards open a new tab with full drink details and favorites synchronize", async ({ page, context }) => {
  await page.goto("/menu/");
  const popup = context.waitForEvent("page");
  await page.locator('.drink-open[href*="sesame-latte"]').click();
  const detail = await popup;
  await detail.waitForLoadState();
  await expect(detail.locator("main h1")).toHaveText("Black Sesame Latte");
  await expect(detail.locator(".drink-facts")).toContainText("Black sesame paste");
  await expect(detail.locator(".detail-price")).toContainText("$7.00");
  await expect(page.locator("dialog")).toHaveCount(0);
  await detail.getByRole("button", { name: "Save to favorites", exact: true }).click();
  await expect(page.getByRole("button", { name: "Remove from favorites: Black Sesame Latte", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await page.getByRole("button", { name: /My favorites/ }).click();
  await expect(page.locator(".drink-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Remove from favorites: Black Sesame Latte", exact: true }).click();
  await expect(page.locator(".empty-state")).toBeVisible();
  await expect(detail.getByRole("button", { name: "Save to favorites", exact: true })).toBeVisible();
  await detail.close();
});
test("home coffee preview opens the pistachio drink in a new tab", async ({ page, context }) => {
  await page.goto("/");
  const popup = context.waitForEvent("page");
  await page.locator('.menu-preview-card[href*="pistachio-latte"]').click();
  const detail = await popup;
  await expect(detail.locator(".drink-facts")).toContainText("Pistachio paste");
  await expect(detail.locator('.drink-portrait [data-drink-photo="pistachio-latte"]')).toBeVisible();
  await detail.close();
});
test("Russian preference persists, translates content and supports Russian search", async ({ page }) => {
  await page.goto("/menu/");
  await page.getByRole("button", { name: "RU — Русский", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(page.locator("main h1")).not.toContainText("A cup for");
  await page.getByRole("searchbox").fill("лаванд");
  await expect(page.locator(".drink-card")).toHaveCount(1);
  await expect(page.locator(".drink-card")).not.toContainText("A whisper");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  for (const route of [...routes, "/menu/sesame-latte/", ]) {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("lang", "ru");
    await expect(page.locator("main")).toContainText(/[А-Яа-я]/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();
    const untranslated = await page.locator("main").evaluate(main => {
      const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
      const texts: string[] = [];
      let node;
      while ((node = walker.nextNode())) {
        const text = node.textContent?.trim() || "";
        if (text.length > 35 && /^[A-Za-z][A-Za-z\s,.';:—–!?()\-]+$/.test(text)) texts.push(text);
      }
      return texts;
    });
    expect(untranslated, route).toEqual([]);
  }
  await page.getByRole("button", { name: "EN — English", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});
test("old editorial links redirect and drink pagination works", async ({ page }) => {
  for (const [from, to] of [["/story/", "/visit/"], ["/experience/", "/menu/"], ["/journal/", "/menu/"], ["/journal/the-art-of-slow-coffee/", "/menu/"]]) {
    await page.goto(from);
    await expect(page).toHaveURL(new RegExp(to + "$"));
    await expect(page.locator("main h1")).toBeVisible();
  }
  await page.goto("/menu/espresso/");
  await page.locator(".drink-pagination a").last().click();
  await expect(page.locator("main h1")).toHaveText("Americano");
  await page.getByRole("link", { name: "Back to menu" }).click();
  await expect(page.locator(".drink-card")).toHaveCount(drinks.length);
});
test("simple navigation and interior gallery remain usable", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await expect(page.locator("#mobile-nav")).toBeVisible();
    await page.locator("#mobile-nav").getByRole("link", { name: /The café/ }).click();
    await expect(page.locator("#mobile-nav")).toHaveCount(0);
  } else { await page.locator(".desktop-nav").getByRole("link", { name: "The café" }).click(); }
  await page.goto("/visit/");
  await page.locator(".gallery-grid button").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Next image" }).click();
  await expect(page.locator(".gallery-controls")).toContainText("The everyday details");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.locator(".gallery-grid button").first()).toBeFocused();
});
test("line illustrations move reversibly and never intercept input", async ({ page }) => {
  await page.goto("/");
  const scene = page.locator(".coffee-background");
  const first = await scene.evaluate(el => (el as HTMLElement).style.transform);
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect.poll(() => scene.evaluate(el => (el as HTMLElement).style.transform)).not.toBe(first);
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await expect.poll(() => scene.evaluate(el => (el as HTMLElement).style.transform)).toBe(first);
  expect(await scene.evaluate(el => getComputedStyle(el).pointerEvents)).toBe("none");
  await expect(page.locator('.cafe-home a[href^="/journal"], .cafe-home a[href^="/story"], .cafe-home a[href^="/experience"]')).toHaveCount(0);
  await expect(page.locator('.cafe-cup')).toBeAttached();
  expect(await page.locator("body").evaluate(el => getComputedStyle(el).overflow)).not.toBe("hidden");
});
test("reduced motion keeps all content visible and disables decorative motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".hero-wordmark")).toBeVisible();
  expect(await page.locator(".hero-wordmark").evaluate(el => getComputedStyle(el).animationName)).toBe("none");
  await page.locator(".cafe-space").scrollIntoViewIfNeeded();
  await expect(page.locator(".cafe-space h2")).toBeVisible();
  await page.goto("/menu/");
  await expect(page.locator(".drink-card")).toHaveCount(drinks.length);
});
test("sound preference is explicit and persists", async ({ page }) => {
  await page.goto("/");
  const sound = page.locator(".sound-control");
  await expect(sound).toHaveAttribute("aria-pressed", "false");
  await sound.click();
  await expect(sound).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await expect(sound).toHaveAttribute("aria-pressed", "true");
  await sound.click();
});
test("blocked storage leaves the menu usable with an honest notice", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window, "localStorage", { get() { throw new Error("Blocked storage"); } }));
  await page.goto("/menu/");
  await expect(page.locator(".notice")).toBeVisible();
  await page.locator(".favorite-button").first().click();
  await expect(page.locator(".favorite-button").first()).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("searchbox").fill("yuzu");
  await expect(page.locator(".drink-card")).toHaveCount(1);
});
test("critical content and links are available without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto((process.env.BASE_URL || "http://localhost:3000") + "/");
  await expect(page.locator(".hero-wordmark")).toBeVisible();
  await page.goto((process.env.BASE_URL || "http://localhost:3000") + "/menu/espresso/");
  await expect(page.locator("main h1")).toHaveText("Espresso");
  await expect(page.locator(".drink-facts")).toContainText("Double espresso");
  await context.close();
});


test("hero keeps the complete café photograph with its wordmark over it", async ({ page, isMobile }) => {
  await page.goto("/");
  const photo = page.locator(".home-hero-picture img");
  await expect(photo).toBeVisible();
  const geometry = await page.evaluate(() => {
    const img = document.querySelector<HTMLImageElement>(".home-hero-picture img")!;
    const photo = img.getBoundingClientRect();
    const brand = document.querySelector(".home-hero-brand h1")!.getBoundingClientRect();
    return { ratio:photo.width/photo.height, naturalRatio:img.naturalWidth/img.naturalHeight, fit:getComputedStyle(img).objectFit, brandInside:brand.top>=photo.top && brand.bottom<=photo.bottom, bottom:photo.bottom };
  });
  expect(Math.abs(geometry.ratio-geometry.naturalRatio)).toBeLessThan(.01);
  expect(geometry.fit).toBe("contain");
  expect(geometry.brandInside).toBeTruthy();
  const frame = await page.locator(".photo-home-hero").boundingBox();
  const main = await page.locator("main").boundingBox();
  expect(frame!.width / main!.width).toBeGreaterThan(.94);
  await expect(page.locator('img[src*="cutout"],img[src*="lavender-cup"]')).toHaveCount(0);
  await expect(page.locator("svg.cafe-cup")).toHaveCount(1);
});

test("sticky navigation stays reachable and anchors close the mobile menu", async ({ page, isMobile }) => {
  await page.goto("/");
  await page.locator("#questions").scrollIntoViewIfNeeded();
  expect(await page.locator(".site-header").evaluate(el=>Math.round(el.getBoundingClientRect().top))).toBe(isMobile ? 8 : 12);
  const navigate = async (name:string) => {
    if (isMobile) {
      await page.getByRole("button",{name:"Open navigation",exact:true}).click();
      await page.locator("#mobile-nav").getByRole("link",{name:new RegExp(name)}).click();
      await expect(page.locator("#mobile-nav")).toHaveCount(0);
    } else await page.locator(".desktop-nav").getByRole("link",{name,exact:true}).click();
  };
  await navigate("At the counter");
  await expect(page).toHaveURL(/#counter$/);
  await expect.poll(()=>page.locator("#counter").evaluate(el=>Math.round(el.getBoundingClientRect().top))).toBeGreaterThanOrEqual(76);
  expect(await page.locator("body").evaluate(el=>getComputedStyle(el).overflow)).not.toBe("hidden");
  await page.goto("/menu/cappuccino/");
  await page.locator("footer").scrollIntoViewIfNeeded();
  await navigate("Questions");
  await expect(page).toHaveURL(/\/#questions$/);
  await expect(page.locator("#questions h2")).toBeVisible();
});

test("coffee questions expand with keyboard input", async ({ page }) => {
  await page.goto("/");
  const summary = page.locator(".coffee-faq summary").first();
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".coffee-faq details").first()).toHaveAttribute("open", "");
  await expect(page.locator(".coffee-faq details").first().locator("p")).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.locator(".coffee-faq details").first()).not.toHaveAttribute("open", "");
});


test("dessert categories, ingredient search and accented names work", async ({ page }) => {
  await page.goto("/desserts/");
  await expect(page.locator(".drink-card")).toHaveCount(desserts.length);
  await expect(page.getByRole("tab",{name:/Desserts/})).toHaveAttribute("aria-selected","true");
  for (const category of dessertCategories) {
    await page.getByRole("button",{name:category,exact:true}).click();
    await expect(page.locator(".drink-card")).toHaveCount(desserts.filter(d=>d.category===category).length);
  }
  await page.getByRole("button",{name:"All desserts",exact:true}).click();
  await page.getByRole("searchbox").fill("crepe");
  await expect(page.locator(".drink-card")).toHaveCount(1);
  await expect(page.locator(".drink-card")).toContainText("Matcha Crêpe Cake");
  await page.getByRole("searchbox").fill("not-a-dessert");
  await expect(page.locator(".empty-state")).toBeVisible();
  await page.getByRole("button",{name:"Show all desserts",exact:true}).click();
  await expect(page.locator(".drink-card")).toHaveCount(18);
});

test("dessert links preserve category and collection through navigation", async ({ page }) => {
  await page.goto("/desserts/?category=Pastries");
  await expect(page.locator(".drink-card")).toHaveCount(6);
  await expect(page.getByRole("button",{name:"Pastries",exact:true})).toHaveAttribute("aria-pressed","true");
  await page.getByRole("tab",{name:/Drinks/}).click();
  await expect(page).toHaveURL(/\/menu\//);
  await expect(page.locator(".drink-card")).toHaveCount(36);
  await page.getByRole("tab",{name:/Desserts/}).click();
  await expect(page).toHaveURL(/\/desserts\//);
  await expect(page.locator(".drink-card")).toHaveCount(18);
  await page.reload();
  await expect(page.locator(".drink-card")).toHaveCount(18);
});

test("dessert detail tabs have allergens, portions and persistent favorites", async ({ page, context }) => {
  await page.goto("/desserts/");
  const popup=context.waitForEvent("page");
  await page.locator('.drink-open[href*="tiramisu"]').click();
  const detail=await popup;
  await expect(detail.locator("main h1")).toHaveText("Tiramisu");
  await expect(detail.locator(".detail-price")).toContainText("$7.50");
  await expect(detail.locator(".detail-price")).toContainText("140 g");
  await expect(detail.locator(".drink-facts")).toContainText("caffeine");
  await expect(detail.locator(".drink-facts")).toContainText("Mascarpone");
  await detail.getByRole("button",{name:"Save to favorites",exact:true}).click();
  await expect(page.getByRole("button",{name:"Remove from favorites: Tiramisu",exact:true})).toHaveAttribute("aria-pressed","true");
  await page.reload();
  await page.getByRole("button",{name:/My favorites/}).click();
  await expect(page.locator(".drink-card")).toHaveCount(1);
  await expect(page.locator(".drink-card")).toContainText("Tiramisu");
  await detail.getByRole("link",{name:"Back to menu",exact:true}).click();
  await expect(detail).toHaveURL(/\/desserts\//);
  await detail.close();
});

test("menu collection tabs support focus movement and Enter activation", async ({ page }) => {
  await page.goto("/menu/");
  await page.getByRole("tab",{name:/Drinks/}).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab",{name:/Desserts/})).toBeFocused();
  await expect(page.getByRole("tab",{name:/Drinks/})).toHaveAttribute("aria-selected","true");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("tab",{name:/Desserts/})).toHaveAttribute("aria-selected","true");
  await expect(page.locator(".drink-card")).toHaveCount(18);
  await page.getByRole("tab",{name:/Desserts/}).focus();
  await page.keyboard.press("Home");
  await expect(page.getByRole("tab",{name:/Drinks/})).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("tab",{name:/Drinks/})).toHaveAttribute("aria-selected","true");
  await expect(page.locator(".drink-card")).toHaveCount(36);
});

test("Russian dessert names and ingredients are searchable", async ({ page }) => {
  await page.goto("/desserts/?lang=ru");
  await expect(page.locator("html")).toHaveAttribute("lang","ru");
  await page.getByRole("searchbox").fill("фисташ");
  await expect(page.locator(".drink-card")).toHaveCount(2);
  await page.getByRole("searchbox").fill("маскарпоне");
  await expect(page.locator(".drink-card")).toHaveCount(1);
  await expect(page.locator(".drink-card")).toContainText("Тирамису");
});


test("wide and narrow windows keep the complete interior centered at the available width", async ({ page, isMobile }) => {
  for (const width of isMobile ? [320,390,768] : [1366,1920,2560]) {
    await page.setViewportSize({width,height:800});
    await page.goto("/");
    const geometry=await page.evaluate(()=>{
      const main=document.querySelector("main")!.getBoundingClientRect();
      const frame=document.querySelector(".photo-home-hero")!.getBoundingClientRect();
      const image=document.querySelector<HTMLImageElement>(".home-hero-picture img")!;
      const photo=image.getBoundingClientRect();
      const heading=document.querySelector(".hero-wordmark")!.getBoundingClientRect();
      return {mainWidth:main.width,frameWidth:frame.width,center:frame.left+frame.width/2,viewport:innerWidth,photoRatio:photo.width/photo.height,naturalRatio:image.naturalWidth/image.naturalHeight,headingCenter:heading.left+heading.width/2,headingY:heading.top+heading.height/2,photoY:photo.top+photo.height/2,overflow:document.documentElement.scrollWidth>innerWidth+1};
    });
    expect(geometry.mainWidth).toBe(Math.min(width-(width<=600?16:32),1840));
    expect(geometry.frameWidth/geometry.mainWidth).toBeGreaterThan(.93);
    expect(Math.abs(geometry.center-width/2)).toBeLessThan(1);
    expect(Math.abs(geometry.headingCenter-geometry.center)).toBeLessThan(1);
    expect(Math.abs(geometry.headingY-geometry.photoY)).toBeLessThan(geometry.frameWidth*.14);
    expect(Math.abs(geometry.photoRatio-geometry.naturalRatio)).toBeLessThan(.01);
    expect(geometry.overflow).toBe(false);
  }
});

test("the HTML wordmark refracts under a mouse and settles back to clear lettering", async ({ page, isMobile }) => {
  await page.goto("/");
  const wordmark=page.locator(".hero-wordmark");
  await expect(wordmark).toHaveText("velune.");
  await expect(wordmark).toHaveAttribute("data-water-active","false");
  const box=(await wordmark.boundingBox())!;
  if(isMobile) {
    await wordmark.tap();
    await expect(wordmark).toHaveAttribute("data-water-active","false");
    expect(await wordmark.locator("span").first().evaluate(el=>getComputedStyle(el).filter)).toBe("none");
  } else {
    await page.mouse.move(box.x+box.width*.3,box.y+box.height*.5);
    await expect(wordmark).toHaveAttribute("data-water-active","true");
    await expect.poll(()=>wordmark.locator("feDisplacementMap").getAttribute("scale").then(Number)).toBeGreaterThan(12);
    const first=await wordmark.evaluate(el=>(el as HTMLElement).style.getPropertyValue("--water-x"));
    await page.mouse.move(box.x+box.width*.75,box.y+box.height*.55);
    await expect.poll(()=>wordmark.evaluate(el=>(el as HTMLElement).style.getPropertyValue("--water-x"))).not.toBe(first);
    expect(await wordmark.locator("span").first().evaluate(el=>getComputedStyle(el).filter)).toContain("url(");
    await page.mouse.move(8,8);
    await expect(wordmark).toHaveAttribute("data-water-active","false");
    expect(await wordmark.locator("feDisplacementMap").getAttribute("scale")).toBe("0");
    expect(await wordmark.locator("span").first().evaluate(el=>getComputedStyle(el).filter)).toBe("none");
  }
  await page.locator('.home-hero-bottom a[href="/menu/"]').click();
  await expect(page.locator(".drink-card")).toHaveCount(36);
});

test("changing to reduced motion immediately removes the water effect", async ({ page, isMobile }) => {
  await page.goto("/");
  const wordmark=page.locator(".hero-wordmark");
  if(!isMobile) {
    await wordmark.hover();
    await expect(wordmark).toHaveAttribute("data-water-active","true");
  }
  await page.emulateMedia({reducedMotion:"reduce"});
  await expect(wordmark).toHaveAttribute("data-water-active","false");
  expect(await wordmark.locator("span").first().evaluate(el=>getComputedStyle(el).filter)).toBe("none");
  await expect(wordmark).toHaveText("velune.");
});

import { test, expect } from "@playwright/test";
import { drinks, categories } from "../data/menu";
const routes = ["/", "/menu/", "/visit/"];
test("all three café pages load with visible content and no errors or overflow", async ({ page }) => {
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
test("all twenty drinks have a separate working page and different photograph crop", async ({ page }) => {
  test.setTimeout(90000);
  await page.goto("/menu/");
  await expect(page.locator(".drink-card")).toHaveCount(20);
  const photos = await page.locator(".drink-card .drink-photo img").evaluateAll(imgs => imgs.map(img => `${img.getAttribute("src")}:${img.getAttribute("style")}`));
  expect(new Set(photos).size).toBe(20);
  for (const drink of drinks) {
    expect((await page.goto(`/menu/${drink.id}/`))?.status()).toBe(200);
    await expect(page.locator("main h1")).toHaveText(drink.name);
    await expect(page.locator(".detail-price")).toContainText(`$${drink.price.toFixed(2)}`);
    await expect(page.locator(".drink-facts")).toContainText(drink.ingredients[0]);
    await expect(page.locator(".drink-facts")).toContainText(drink.dietary);
    await expect(page.locator(".drink-preparation")).toBeAttached();
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
  await page.getByRole("button", { name: "Explore all 20 drinks" }).click();
  await expect(page.locator(".drink-card")).toHaveCount(20);
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
test("home signature opens the actual lavender drink in a new tab", async ({ page, context }) => {
  await page.goto("/");
  const popup = context.waitForEvent("page");
  await page.locator('.signature-card[href*="lavender-cloud"]').click();
  const detail = await popup;
  await expect(detail.locator(".drink-facts")).toContainText("Culinary lavender syrup");
  await expect(detail.locator('.drink-portrait [data-drink-photo="lavender-cloud"]')).toBeVisible();
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
  await expect(page.locator(".drink-card")).toHaveCount(20);
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
  await expect(page.locator(".drink-card")).toHaveCount(20);
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
    const brand = document.querySelector(".home-hero-brand")!.getBoundingClientRect();
    return { ratio:photo.width/photo.height, naturalRatio:img.naturalWidth/img.naturalHeight, fit:getComputedStyle(img).objectFit, brandInside:brand.top>=photo.top && brand.bottom<=photo.bottom, bottom:photo.bottom };
  });
  expect(Math.abs(geometry.ratio-geometry.naturalRatio)).toBeLessThan(.01);
  expect(geometry.fit).toBe("contain");
  expect(geometry.brandInside).toBeTruthy();
  if (!isMobile) expect(geometry.bottom).toBeLessThanOrEqual(page.viewportSize()!.height);
  await expect(page.locator('img[src*="cutout"],img[src*="lavender-cup"]')).toHaveCount(0);
  await expect(page.locator("svg.cafe-cup")).toHaveCount(1);
});

test("sticky navigation stays reachable and anchors close the mobile menu", async ({ page, isMobile }) => {
  await page.goto("/");
  await page.locator("#questions").scrollIntoViewIfNeeded();
  expect(await page.locator(".site-header").evaluate(el=>Math.round(el.getBoundingClientRect().top))).toBe(0);
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

import { test, expect } from "@playwright/test";
const routes = [
  "/",
  "/menu/",
  "/story/",
  "/experience/",
  "/journal/",
  "/visit/",
];
test("all six routes load without page errors or horizontal overflow", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBeTruthy();
    await expect(page.locator("footer")).toBeAttached();
  }
  expect(errors).toEqual([]);
});
test("menu has exactly 20 drinks and accurate category filters", async ({
  page,
}) => {
  await page.goto("/menu/");
  await expect(page.locator(".drink-card")).toHaveCount(20);
  const counts = [
    ["Espresso Classics", 3],
    ["Milk-Based Coffee", 5],
    ["Filter & Slow Brew", 3],
    ["Iced Coffee", 3],
    ["Matcha & Alternatives", 3],
    ["Seasonal Signatures", 3],
  ] as const;
  for (const [name, count] of counts) {
    await page.getByRole("button", { name, exact: true }).click();
    await expect(page.locator(".drink-card")).toHaveCount(count);
  }
  await page.getByRole("button", { name: "All drinks", exact: true }).click();
  await expect(page.locator(".drink-card")).toHaveCount(20);
});
test("search, empty states, and clear filters work", async ({ page }) => {
  await page.goto("/menu/");
  const input = page.getByRole("searchbox", { name: "Search the menu" });
  await input.fill("yuzu");
  await expect(page.locator(".drink-card")).toHaveCount(1);
  await expect(page.locator(".drink-card")).toContainText("Yuzu Cold Brew");
  await input.fill("no-such-cup-xyz");
  await expect(page.locator(".empty-state")).toBeVisible();
  await page.getByRole("button", { name: "Explore all 20 drinks" }).click();
  await expect(page.locator(".drink-card")).toHaveCount(20);
  await input.fill("sesame");
  await expect(page.locator(".drink-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Clear search" }).click();
  await expect(input).toHaveValue("");
});
test("favorites persist through reload and can be removed", async ({
  page,
}) => {
  await page.goto("/menu/");
  await page
    .getByRole("button", { name: "Save Espresso to favorites", exact: true })
    .click();
  await page.reload();
  await expect(
    page.getByRole("button", {
      name: "Remove Espresso from favorites",
      exact: true,
    }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: /My favorites/ }).click();
  await expect(page.locator(".drink-card")).toHaveCount(1);
  await page
    .getByRole("button", {
      name: "Remove Espresso from favorites",
      exact: true,
    })
    .click();
  await expect(page.locator(".empty-state")).toBeVisible();
  await page.reload();
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("velune-favorites") || "[]"),
    ),
  ).toEqual([]);
});
test("drink dialog shows ingredients, allergens, and returns focus", async ({
  page,
}) => {
  await page.goto("/menu/");
  const trigger = page.getByRole("button", {
    name: "View Black Sesame Latte details",
  });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Black sesame paste");
  await expect(dialog).toContainText("Contains sesame, milk, and caffeine.");
  await expect(dialog).toContainText("280 ml");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});
test("home signature deep links open correct drink", async ({ page }) => {
  await page.goto("/");
  await page
    .locator(".signature-card")
    .filter({ hasText: "Lavender Cloud" })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText(
    "Culinary lavender syrup",
  );
  await page.getByRole("button", { name: "Close drink details" }).click();
});
test("five complete journal articles and related links work", async ({
  page,
}) => {
  await page.goto("/journal/");
  const hrefs = await page
    .locator('main a[href^="/journal/"]')
    .evaluateAll((els) => [
      ...new Set(els.map((a) => a.getAttribute("href")!)),
    ]);
  expect(hrefs).toHaveLength(5);
  for (const href of hrefs) {
    await page.goto(href);
    await expect(page.locator(".article-body section")).toHaveCount(4);
    await expect(page.locator(".article-body figure img")).toBeVisible();
    expect(
      (await page.locator(".article-body").innerText()).split(/\s+/).length,
    ).toBeGreaterThan(300);
    await expect(page.locator(".related-articles a")).toHaveCount(2);
  }
  await page.getByRole("link", { name: "Back to the journal" }).click();
  await expect(page).toHaveURL(/\/journal\/$/);
});
test("mobile navigation opens, closes, navigates, and supports escape", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Mobile navigation only");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Menu", exact: false })
    .click();
  await expect(page).toHaveURL(/\/menu\/$/);
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).not.toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    "hidden",
  );
});
test("desktop navigation routes correctly", async ({ page, isMobile }) => {
  test.skip(isMobile, "Desktop navigation only");
  await page.goto("/");
  for (const [name, route] of [
    ["Menu", "menu"],
    ["Our story", "story"],
    ["Experience", "experience"],
    ["Journal", "journal"],
    ["Visit us", "visit"],
  ]) {
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp("/" + route + "/$"));
    await expect(
      page
        .getByRole("navigation", { name: "Main navigation" })
        .getByRole("link", { name, exact: true }),
    ).toHaveAttribute("aria-current", "page");
  }
});
test("grind range updates the brewing guidance", async ({ page }) => {
  await page.goto("/story/");
  const slider = page.getByRole("slider", { name: /Explore the grind/ });
  await slider.fill("0");
  await expect(page.locator(".grind-explanation")).toContainText("Espresso");
  await slider.fill("3");
  await expect(page.locator(".grind-explanation")).toContainText("Cold brew");
});
test("gallery supports previous, next, and close", async ({ page }) => {
  await page.goto("/visit/");
  await page.getByRole("button", { name: "Enlarge 01 / A quieter corner" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.getByRole("button", { name: "Next image" }).click();
  await expect(dialog).toContainText("2 / 3");
  await page.getByRole("button", { name: "Previous image" }).click();
  await expect(dialog).toContainText("1 / 3");
  await page.getByRole("button", { name: "Close gallery" }).click();
  await expect(dialog).not.toBeVisible();
});
test("sound is opt-in and preference persists", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Sound off" })).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  await page.getByRole("button", { name: "Sound off" }).click();
  await page.reload();
  await expect(page.getByRole("button", { name: "Sound on" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.getByRole("button", { name: "Sound on" }).click();
});
test("cup loads, rotates, zooms within limits, and resets", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/experience/");
  await page.getByRole("button", { name: "Explore in 3D" }).click();
  await expect(page.locator(".experience-visual canvas")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Rotate cup right" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Rotate cup right" }).click();
  await page.getByRole("button", { name: "Lid details" }).click();
  await expect(
    page.getByRole("button", { name: "Lid details" }),
  ).toHaveAttribute("aria-pressed", "true");
  for (let i = 0; i < 4; i++)
    await page.getByRole("button", { name: "Zoom in", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Zoom in", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Reset view" }).click();
  await expect(
    page.getByRole("button", { name: "Zoom in", exact: true }),
  ).toBeEnabled();
  await expect(
    page.getByRole("button", { name: "The silhouette" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.locator(".experience-visual").focus();
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("r");
  await page.getByRole("button", { name: "Image view" }).click();
  await expect(page.locator(".experience-visual canvas")).toHaveCount(0);
  expect(errors).toEqual([]);
});
test("journey chapters and deterministic bean scrubbing work", async ({
  page,
}) => {
  await page.goto("/experience/");
  await page.getByRole("button", { name: "01 The bean" }).click();
  const range = page.getByRole("slider", { name: /Explore the fall/ });
  await range.fill("85");
  await expect(range).toHaveValue("85");
  await range.fill("15");
  await expect(range).toHaveValue("15");
  await page.getByRole("button", { name: "02 The grind" }).click();
  await expect(page.locator(".scene-disclosure")).toContainText(
    "professional grinder animation is not available",
  );
  await page.getByRole("button", { name: "03 The extraction" }).click();
  await expect(page.locator(".scene-disclosure")).toContainText(
    "not extraction footage",
  );
  await page.getByRole("button", { name: "Play the journey" }).click();
  await expect(
    page.getByRole("button", { name: "Pause journey" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Pause journey" }).click();
});
test("WebGL unavailable preserves core functionality and image alternative", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      type: string,
      ...args: unknown[]
    ) {
      if (
        type === "webgl" ||
        type === "webgl2" ||
        type === "experimental-webgl"
      )
        return null;
      return original.apply(this, [type, ...args] as Parameters<
        typeof original
      >);
    } as typeof original;
  });
  await page.goto("/experience/");
  await page.getByRole("button", { name: "Explore in 3D" }).click();
  await expect(
    page.getByText("Image mode — 3D is unavailable on this device."),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Explore in 3D" })).toHaveCount(
    0,
  );
  await page.goto("/menu/");
  await expect(page.locator(".drink-card")).toHaveCount(20);
});
test("blocked storage degrades to session favorites with explanation", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new Error("blocked");
    };
    Storage.prototype.getItem = () => {
      throw new Error("blocked");
    };
  });
  await page.goto("/menu/");
  await page
    .getByRole("button", { name: "Save Espresso to favorites", exact: true })
    .click();
  await expect(
    page.getByRole("button", {
      name: "Remove Espresso from favorites",
      exact: true,
    }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByText("Your browser cannot save preferences right now.", {
      exact: false,
    }),
  ).toBeVisible();
});
test("reduced motion leaves readable content and navigation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".hero-wordmark")).toBeVisible();
  expect(
    await page
      .locator(".route-wash")
      .evaluate((el) => getComputedStyle(el).display),
  ).toBe("none");
  await page.goto("/experience/");
  await expect(
    page.getByRole("button", { name: "Explore in 3D" }),
  ).toBeVisible();
});
test("pointer or touch drag changes the rendered cup", async ({
  page,
  isMobile,
}) => {
  test.setTimeout(90000);
  await page.goto("/experience/");
  await page.getByRole("button", { name: "Explore in 3D" }).click();
  const canvas = page.locator(".experience-visual canvas");
  await expect(canvas).toBeVisible();
  await page.waitForTimeout(1800);
  await canvas.scrollIntoViewIfNeeded();
  const before = await canvas.screenshot();
  const box = (await canvas.boundingBox())!;
  const x = box.x + box.width / 2,
    y = box.y + box.height / 2;
  if (isMobile) {
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x, y }],
    });
    for (let i = 1; i <= 8; i++)
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x: x + i * 12, y }],
      });
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
  } else {
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + 120, y, { steps: 6 });
    await page.mouse.up();
  }
  await page.waitForTimeout(600);
  const after = await canvas.screenshot();
  expect(before.equals(after)).toBeFalsy();
  await page.getByRole("button", { name: "Reset view" }).click();
});
test("WebGL context loss switches to the static alternative", async ({
  page,
}) => {
  await page.goto("/experience/");
  await page.getByRole("button", { name: "Explore in 3D" }).click();
  const canvas = page.locator(".experience-visual canvas");
  await expect(canvas).toBeVisible();
  await expect(page.locator('.scene-hint')).toContainText('Drag to rotate');
  await canvas.evaluate((el) =>
    el.dispatchEvent(new Event("webglcontextlost")),
  );
  await expect(
    page.getByText("Image mode — 3D is unavailable on this device."),
  ).toBeVisible();
  await expect(page.locator(".experience-still")).toBeVisible();
});

test("cup can reopen after intentional renderer disposal", async ({ page }) => {
  test.setTimeout(90000);
  await page.goto("/experience/");
  for (let cycle = 0; cycle < 3; cycle++) {
    await page.getByRole("button", { name: "Explore in 3D" }).click();
    await expect(page.locator(".experience-visual canvas")).toBeVisible();
    await expect(page.locator(".scene-hint")).toContainText("Drag to rotate");
    await page.getByRole("button", { name: "Image view" }).click();
    await page.waitForTimeout(900);
    await expect(page.getByRole("button", { name: "Explore in 3D" })).toBeVisible();
    await expect(page.locator(".fallback-note")).toHaveCount(0);
  }
});

test('menu is present in initial HTML and scroll content stays readable', async ({page,request,browser}) => {
 const response=await request.get('/menu/');
 const html=await response.text();
 expect(html).toContain('Black Sesame Latte');
 expect(html).toContain('Yuzu Cold Brew');
 const noJs=await browser.newContext({javaScriptEnabled:false});
 const staticPage=await noJs.newPage();
 await staticPage.goto(response.url());
 await expect(staticPage.locator('.drink-card')).toHaveCount(20);
 await expect(staticPage.locator('.drink-card').first()).toBeVisible();
 await noJs.close();
 await page.goto('/');
 await expect(page.locator('.signature-section')).toHaveCSS('opacity','1');
});

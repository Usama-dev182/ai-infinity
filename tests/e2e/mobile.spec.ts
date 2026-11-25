import { test, expect } from "@playwright/test";
import { ready } from "./helpers";

test("mobile navigation opens, scrolls, closes on Escape and on navigation", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 560 });
  await page.goto("/");
  await ready(page);

  const open = page.getByRole("button", { name: "Open menu" });
  await expect(open).toHaveAttribute("aria-expanded", "false");
  await open.click();
  const menu = page.locator("#mobile-menu");
  await expect(menu).toBeVisible();
  const { scrollHeight, clientHeight, overflowY } = await menu.evaluate((el) => ({
    scrollHeight: el.scrollHeight,
    clientHeight: el.clientHeight,
    overflowY: getComputedStyle(el).overflowY,
  }));
  expect(overflowY).toBe("auto");
  expect(scrollHeight).toBeGreaterThan(clientHeight);

  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();

  await page.getByRole("button", { name: "Open menu" }).click();
  await menu.getByRole("link", { name: "Case Studies" }).click();
  await expect(page).toHaveURL(/\/case-studies$/);
  await expect(menu).toBeHidden();
});

for (const width of [360, 390, 768, 1024]) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/services/ai-product-engineering", "/industries/real-estate", "/tools/ai-roi-calculator", "/contact"]) {
      await page.goto(path);
      await ready(page);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `${path} overflows by ${overflow}px`).toBeLessThanOrEqual(0);
    }
  });
}

test("touch targets in the header meet the 24px minimum", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await ready(page);
  for (const name of ["Open menu", "Toggle colour theme"]) {
    const box = await page.getByRole("button", { name }).first().boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(24);
    expect(box!.height).toBeGreaterThanOrEqual(24);
  }
});

const { test, expect } = require("@playwright/test");

test("storefront loads the full collection and filters it", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Flux Supply/);
  await expect(page.getByRole("heading", { name: /Carry less/i })).toBeVisible();
  await expect(page.locator(".product-card")).toHaveCount(6);

  await page.getByRole("button", { name: /Power 02/i }).click();
  await expect(page.locator(".product-card")).toHaveCount(2);
  await expect(page.locator("#product-grid").getByRole("heading", { name: "Orbit 10K" })).toBeVisible();
});

test("product, cart, and transparent demo checkout flow work", async ({ page }) => {
  await page.goto("/");
  await page.locator("[data-add='orbit-power']").click();
  await page.locator(".site-header .cart-trigger").click();
  await expect(page.locator("#cart-drawer")).toHaveClass(/is-open/);
  await expect(page.locator("#cart-items")).toContainText("Orbit 10K");
  await expect(page.locator("#cart-subtotal")).toHaveText("$68.00");

  await page.getByRole("button", { name: /Continue to demo checkout/i }).click();
  await expect(page.getByRole("heading", { name: /Where would it go/i })).toBeVisible();
  await page.getByRole("button", { name: /Review demo order/i }).click();
  await expect(page.getByRole("heading", { name: /Review the fiction/i })).toBeVisible();
  await page.getByRole("button", { name: /Complete demo order/i }).click();
  await expect(page.getByRole("heading", { name: /Demo dispatched/i })).toBeVisible();
});

test("search and bundle builder work", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("/");
  await page.locator("#site-search").fill("wallet");
  await expect(page.locator(".search-result")).toHaveCount(1);
  await expect(page.locator(".search-result")).toContainText("Slate Wallet");
  await page.locator("#search-modal .modal-close").click();

  await page.locator("[data-bundle-option='orbit-power']").click();
  await page.locator("[data-bundle-option='relay-pouch']").click();
  await page.locator("[data-bundle-option='fold-stand']").click();
  await expect(page.locator("#add-bundle")).toBeEnabled();
  await expect(page.locator("#bundle-savings")).toContainText("demo bundle savings");
  await page.locator("#add-bundle").click();
  await expect(page.locator("#cart-subtotal")).toHaveText("$139.92");
});

test("mobile navigation opens and closes", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-specific interaction");
  await page.goto("/");
  const menu = page.locator(".menu-toggle");
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#site-nav")).toHaveClass(/is-open/);
  await page.locator("#site-nav a").first().click();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});

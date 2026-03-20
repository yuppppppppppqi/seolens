import { test, expect } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("homepage loads", async ({ page }) => {
    const res = await page.goto("/");
    expect(res?.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/.+/);
  });

  test("features page loads", async ({ page }) => {
    const res = await page.goto("/features");
    expect(res?.status()).toBeLessThan(400);
  });

  test("pricing page loads", async ({ page }) => {
    const res = await page.goto("/pricing");
    expect(res?.status()).toBeLessThan(400);
  });

  test("blog page loads", async ({ page }) => {
    const res = await page.goto("/blog");
    expect(res?.status()).toBeLessThan(400);
  });

  test("login page loads", async ({ page }) => {
    const res = await page.goto("/login");
    expect(res?.status()).toBeLessThan(400);
  });

  test("docs page loads", async ({ page }) => {
    const res = await page.goto("/docs");
    expect(res?.status()).toBeLessThan(400);
  });
});

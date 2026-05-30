import { test, expect } from "@playwright/test";

test.describe("smoke tests", () => {
  test("homepage loads", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/April Rieger/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("navigation links work", async ({ page }) => {
    await page.goto("/");

    const nav = page.locator("nav");
    await expect(nav.getByRole("link", { name: "Projects" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Blog" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Contact" })).toBeVisible();
  });

  test("projects page loads", async ({ page }) => {
    await page.goto("/projects");
    await expect(page).toHaveTitle(/Projects/);
  });

  test("blog page loads", async ({ page }) => {
    await page.goto("/blog");
    await expect(page).toHaveTitle(/Blog/);
  });

  test("talks page loads", async ({ page }) => {
    await page.goto("/talks");
    await expect(page).toHaveTitle(/Talks/);
  });

  test("contact page loads", async ({ page }) => {
    await page.goto("/contact");
    await expect(page).toHaveTitle(/Contact/);
  });

  test("resume page loads", async ({ page }) => {
    await page.goto("/resume");
    await expect(page).toHaveTitle(/Resume/);
  });
});

test.describe("accessibility basics", () => {
  test("skip link exists", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.getByRole("link", { name: /skip to/i });
    await expect(skipLink).toBeAttached();
  });

  test("images have alt text", async ({ page }) => {
    await page.goto("/");
    const images = page.locator("img");
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");
      expect(alt, `Image ${i} missing alt text`).not.toBeNull();
    }
  });
});

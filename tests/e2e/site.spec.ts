import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const copy = {
  fr: { open: "Ouvrir le menu", close: "Fermer le menu", nav: "Navigation principale", services: "Nos services", submit: "Envoyer mon projet", name: "Nom & prénom", description: "Description du projet", privacy: "Fermer la notice de confidentialité et de sécurité", pause: "Mettre en pause le défilement des images" },
  en: { open: "Open menu", close: "Close menu", nav: "Main navigation", services: "Services", submit: "Submit my project", name: "Full name", description: "Project description", privacy: "Close the privacy and security notice", pause: "Pause the image slideshow" },
};

async function dismissPrivacy(page: Page, locale: keyof typeof copy) {
  const button = page.getByRole("button", { name: copy[locale].privacy, exact: true });
  const noticeExpected = await page.evaluate(() => {
    try { return localStorage.getItem("aws:privacy-notice:dismissed") === null; }
    catch { return true; }
  });
  // The notice is client-only: waiting for it also avoids typing into SSR
  // form controls before React has hydrated them on slower browsers.
  if (noticeExpected) await expect(button).toBeVisible();
  if (await button.isVisible()) {
    await button.click();
    await expect(button).toHaveCount(0);
  }
}

async function fillForm(page: Page, locale: keyof typeof copy) {
  await dismissPrivacy(page, locale);
  await page.getByLabel(copy[locale].name, { exact: true }).fill("QA — données fictives");
  await page.getByLabel("Email", { exact: true }).fill("qa@example.com");
  await page.getByLabel(copy[locale].description, { exact: true }).fill("Test automatisé local, aucun email transmis.");
}

for (const locale of ["fr", "en"] as const) {
  test(`${locale}: pages, images, six projects, metadata and JavaScript`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error" && !message.text().includes("404")) errors.push(message.text()); });
    for (const suffix of ["", "/mentions-legales", "/confidentialite"]) {
      const response = await page.goto(`/${locale}${suffix}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.alfredwinnerservices.com/${locale}${suffix}`);
      for (const image of await page.locator("img").all()) await image.scrollIntoViewIfNeeded();
      await expect.poll(() => page.locator("img").evaluateAll(images => images.filter(image => !(image as HTMLImageElement).complete || (image as HTMLImageElement).naturalWidth === 0).map(image => image.getAttribute("src")))).toEqual([]);
    }
    await page.goto(`/${locale}`);
    expect(await page.locator('#projets h3').count()).toBe(6);
    expect(errors).toEqual([]);
  });

  test(`${locale}: responsive 320–1920 without overflow and accessible pages`, async ({ page }, testInfo) => {
    test.setTimeout(90_000); // Ten viewports, full-page captures and two axe scans.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/${locale}`);
    for (const image of await page.locator("img").all()) await image.scrollIntoViewIfNeeded();
    await expect.poll(() => page.locator("img").evaluateAll(images => images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
    for (const width of [320, 375, 390, 393, 430, 768, 1024, 1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: 950 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `overflow at ${width}`).toBe(true);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("#contact form")).toBeVisible();
      if ([375, 768, 1440].includes(width)) await page.screenshot({ path: testInfo.outputPath(`${locale}-${width}.png`), fullPage: true, scale: "css" });
    }
    await page.setViewportSize({ width: 390, height: 844 });
    expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze()).violations).toEqual([]);
    await page.goto(`/${locale}/confidentialite`);
    expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze()).violations).toEqual([]);
  });

  test(`${locale}: navigation, language, secure official contact links`, async ({ page }) => {
    await page.goto(`/${locale}?x=1#projets`);
    await dismissPrivacy(page, locale);
    const open = page.getByRole("button", { name: copy[locale].open, exact: true });
    if (await open.isVisible()) {
      await open.click();
      await expect(page.getByRole("button", { name: copy[locale].close, exact: true })).toHaveAttribute("aria-expanded", "true");
      await page.keyboard.press("Escape");
      await expect(open).toBeFocused();
      await open.click();
      await page.getByRole("navigation", { name: locale === "fr" ? "Navigation mobile" : "Mobile navigation" }).getByRole("link", { name: "Contact", exact: true }).click();
      await expect(page).toHaveURL(/#contact$/);
    } else {
      const service = page.getByRole("navigation", { name: copy[locale].nav, exact: true }).getByRole("button", { name: copy[locale].services, exact: true });
      await service.click();
      await expect(service).toHaveAttribute("aria-expanded", "true");
      await page.keyboard.press("Escape");
      await expect(service).toBeFocused();
    }
    // Test locale preservation independently of navigation links, which may
    // intentionally remove a previous service/query selection.
    await page.goto(`/${locale}?x=1#projets`);
    const other = locale === "fr" ? "en" : "fr";
    await page.locator(`a[aria-label^="${other.toUpperCase()} —"]`).filter({ visible: true }).first().click();
    await expect(page.locator("html")).toHaveAttribute("lang", other);
    await expect(page).toHaveURL(new RegExp(`/${other}\\?x=1#`));
    const footer = page.locator("footer");
    await expect(footer.locator('a[href="mailto:contact@alfredwinnerservices.com"]')).toHaveCount(1);
    await expect(footer.locator('a[href="tel:+2250748191100"]')).toHaveCount(1);
    const whatsapp = page.locator('a[href*="wa.me/"]');
    expect(await whatsapp.count()).toBeGreaterThanOrEqual(2);
    for (const link of await whatsapp.all()) expect(await link.getAttribute("href")).toContain("2250748191100");
    for (const link of await footer.locator('a[target="_blank"]').all()) {
      expect(await link.getAttribute("rel")).toContain("noopener");
      expect(await link.getAttribute("rel")).toContain("noreferrer");
    }
    expect(await footer.locator('a[href*="instagram"]').count()).toBe(0);
    await page.goto(`/${locale}`);
    for (const href of await page.locator('main a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute("href")!))) {
      expect(await page.locator(href).count(), `missing anchor ${href}`).toBe(1);
    }
    for (const [service, index] of [["software-ia", 0], ["bourse-finance", 1], ["immobilier", 2]] as const) {
      await page.goto(`/${locale}?service=${service}#contact`);
      await expect.poll(() => page.locator("#contact select").evaluate((select: HTMLSelectElement) => select.selectedIndex)).toBe(index);
    }
  });

  test(`${locale}: privacy notice persists and never implies marketing consent`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(page.getByRole("button", { name: copy[locale].privacy, exact: true })).toBeVisible();
    await dismissPrivacy(page, locale);
    await expect(page.getByRole("button", { name: copy[locale].privacy, exact: true })).toHaveCount(0);
    await page.reload();
    await expect(page.getByRole("button", { name: copy[locale].privacy, exact: true })).toHaveCount(0);
    expect(await page.context().cookies()).toEqual([]);
  });

  test(`${locale}: form validation, provider error and confirmed mocked success`, async ({ page }) => {
    await page.goto(`/${locale}#contact`);
    await dismissPrivacy(page, locale);
    await page.getByRole("button", { name: copy[locale].submit, exact: true }).click();
    await expect(page.getByLabel(copy[locale].name, { exact: true })).toBeFocused();
    await fillForm(page, locale);
    let requests = 0;
    await page.route("**/api/contact", async route => {
      requests++;
      const payload = route.request().postDataJSON();
      for (const field of ["nom", "email", "telephone", "entreprise", "service", "typeProjet", "description"]) expect(payload).toHaveProperty(field);
      await route.fulfill({ status: requests === 1 ? 502 : 200, json: requests === 1 ? { erreur: "envoi" } : { livraison: "envoye" } });
    });
    await page.getByRole("button", { name: copy[locale].submit, exact: true }).click();
    await expect(page.locator("#contact").getByRole("alert")).toBeVisible();
    await expect(page.getByRole("status")).toHaveCount(0);
    await page.getByRole("button", { name: copy[locale].submit, exact: true }).click();
    await expect(page.getByRole("status")).toBeVisible();
    await expect(page.getByRole("status")).toBeFocused();
    expect(requests).toBe(2);
  });
}

test("form timeout releases submission without displaying success", async ({ page }) => {
  await page.clock.install();
  await page.goto("/fr#contact");
  await fillForm(page, "fr");
  await page.route("**/api/contact", () => {});
  await page.getByRole("button", { name: copy.fr.submit, exact: true }).click();
  await expect(page.locator("form")).toHaveAttribute("aria-busy", "true");
  await page.clock.runFor(30_100);
  await expect(page.locator("#contact").getByRole("alert")).toBeVisible();
  await expect(page.getByRole("button", { name: copy.fr.submit, exact: true })).toBeEnabled();
  await expect(page.getByRole("status")).toHaveCount(0);
});

test("privacy notice remains dismissible when browser storage is unavailable", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new DOMException("Storage disabled", "SecurityError"); } });
  });
  await page.goto("/fr");
  await expect(page.getByRole("button", { name: copy.fr.privacy, exact: true })).toBeVisible();
  await dismissPrivacy(page, "fr");
  await expect(page.getByRole("button", { name: copy.fr.privacy, exact: true })).toHaveCount(0);
});

test("carousel cycles without layout shift and respects reduced motion", async ({ page }) => {
  await page.clock.install();
  await page.goto("/fr");
  await dismissPrivacy(page, "fr");
  await page.mouse.move(0, 0);
  const slides = page.locator('div[aria-hidden][style*="opacity"]');
  await expect(slides).toHaveCount(2);
  await page.clock.runFor(1_000);
  await page.evaluate(() => document.fonts.ready);
  await slides.first().evaluate(element => Promise.all(element.parentElement!.parentElement!.getAnimations().map(animation => animation.finished)));
  const bounds = await slides.first().boundingBox();
  for (const active of [1, 0, 1]) {
    await page.clock.runFor(7_100);
    await expect(slides.nth(active)).toHaveAttribute("aria-hidden", "false");
    const current = await slides.first().boundingBox();
    for (const key of ["x", "y", "width", "height"] as const) {
      expect(Math.abs(current![key] - bounds![key])).toBeLessThan(1);
    }
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.getByRole("button", { name: copy.fr.pause, exact: true })).toHaveCount(0);
  const state = await slides.first().getAttribute("aria-hidden");
  await page.clock.runFor(21_000);
  expect(await slides.first().getAttribute("aria-hidden")).toBe(state);
});

test("root, 404, robots, sitemap, API methods and production headers", async ({ request }) => {
  const root = await request.get("/", { maxRedirects: 0 });
  expect(root.status()).toBe(307);
  expect(new URL(root.headers().location, "http://127.0.0.1:3100").pathname).toBe("/fr");
  expect((await request.get("/fr/not-a-real-page")).status()).toBe(404);
  expect((await request.get("/api/contact")).status()).toBe(405);
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).not.toContain("netlify.app");
  const page = await request.get("/fr");
  expect(page.headers()["x-content-type-options"]).toBe("nosniff");
  expect(page.headers()["content-security-policy"]).toContain("object-src 'none'");
  expect(page.headers()["content-security-policy"]).not.toContain("unsafe-eval");
});

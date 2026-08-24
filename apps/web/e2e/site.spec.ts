import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const route of ["/", "/en"] as const) {
  test(`${route} renders an accessible homepage`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("main")).toHaveAttribute("id", "contenu");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

for (const route of ["/institut/a-propos", "/en/institut/a-propos"] as const) {
  test(`${route} renders an accessible about page`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("h1")).toContainText(
      route.startsWith("/en") ? "About the African" : "À propos de l’Institut",
    );
    await expect(page.locator(".about-hero__image")).toBeVisible();
    await expect(page.locator(".about-hero__mark")).toHaveCount(0);
    await expect(
      page.getByRole("heading", {
        name: route.startsWith("/en") ? "Our story" : "Notre histoire",
      }),
    ).toBeVisible();
    await expect(page.locator(".about-story blockquote p")).toHaveCount(4);
    await expect(
      page.getByRole("heading", {
        name: route.startsWith("/en") ? "Our team" : "Notre équipe",
      }),
    ).toBeVisible();
    await expect(page.locator(".about-team__member")).toHaveCount(6);
    await expect(page.locator(".about-actions article")).toHaveCount(4);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

for (const route of [
  "/institut/mission-vision",
  "/en/institut/mission-vision",
] as const) {
  test(`${route} renders an accessible mission and vision page`, async ({
    page,
  }) => {
    await page.goto(route);
    await expect(page.locator("h1")).toContainText(
      route.startsWith("/en")
        ? "Turning knowledge into"
        : "Faire de la connaissance",
    );
    await expect(page.locator(".mission-vision-statement")).toHaveCount(0);
    await expect(page.locator(".mission-vision-identity")).toBeVisible();
    await expect(
      page.locator(".mission-vision-identity__metrics dd"),
    ).toHaveCount(4);
    await expect(page.getByText("282", { exact: true })).toBeVisible();
    await expect(
      page.locator(".mission-vision-methodology + .mission-vision-identity"),
    ).toBeVisible();
    await expect(
      page.locator(".mission-vision-identity + .mission-vision-approach"),
    ).toBeVisible();
    await expect(page.locator(".mission-vision-approach__list li")).toHaveCount(
      4,
    );
    await expect(
      page.locator(".mission-vision-approach__media img"),
    ).toBeVisible();
    await expect(
      page.locator(".mission-vision-approach + .mission-vision-partners"),
    ).toBeVisible();
    await expect(
      page.locator(".mission-vision-partners__track ul").first().locator("li"),
    ).toHaveCount(5);
    await expect(
      page.locator(".mission-vision-partners__marquee"),
    ).toHaveAttribute("tabindex", "0");
    await expect(
      page.locator(".mission-vision-expertise__grid article"),
    ).toHaveCount(4);
    await expect(
      page.locator(".mission-vision-expertise__grid article li"),
    ).toHaveCount(12);
    await expect(page.locator(".mission-vision-mandates li")).toHaveCount(7);
    await expect(
      page.locator(".mission-vision-mandates__media img"),
    ).toBeVisible();
    await expect(
      page.locator(".mission-vision-methodology__phases li"),
    ).toHaveCount(4);
    await expect(
      page.locator(".mission-vision-methodology__media img"),
    ).toHaveCount(2);
    await expect(
      page.locator(".mission-vision-actions__grid article"),
    ).toHaveCount(4);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

for (const route of [
  "/institut/nos-services",
  "/en/institut/nos-services",
] as const) {
  test(`${route} renders an accessible services page`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("h1")).toContainText(
      route.startsWith("/en")
        ? "Expertise mobilised"
        : "Des expertises mobilisées",
    );
    await expect(page.locator(".service-card")).toHaveCount(12);
    await expect(page.locator(".services-group")).toHaveCount(4);
    await expect(page.locator(".services-process__list li")).toHaveCount(4);
    await expect(page.locator(".services-training")).toBeVisible();
    await expect(page.locator(".field-action-card")).toHaveCount(5);
    await expect(
      page.locator(".services-training").getByRole("link"),
    ).toHaveAttribute(
      "href",
      route.startsWith("/en") ? "/en/academie" : "/academie",
    );
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

for (const route of ["/academie", "/en/academie"] as const) {
  test(`${route} renders an accessible academy page`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("h1")).toContainText(
      route.startsWith("/en") ? "Our training programmes" : "Nos formations",
    );
    await expect(page.locator(".academy-formats__grid article")).toHaveCount(4);
    await expect(
      page.locator(
        ".academy-curriculum__block:first-child .academy-curriculum__list li",
      ),
    ).toHaveCount(11);
    await expect(
      page.locator(
        ".academy-curriculum__block--modules .academy-curriculum__list li",
      ),
    ).toHaveCount(6);
    await expect(page.locator(".academy-join")).toBeVisible();
    await expect(
      page.locator(".academy-join").getByRole("link"),
    ).toHaveAttribute(
      "href",
      route.startsWith("/en")
        ? "/en/contact?type=training"
        : "/contact?type=training",
    );
    await expect(page.locator(".academy-audiences__grid article")).toHaveCount(
      4,
    );
    await expect(page.locator(".academy-method__list li")).toHaveCount(4);
    await expect(page.locator(".academy-catalog__status")).toContainText(
      route.startsWith("/en")
        ? "No sessions currently open"
        : "Aucune session ouverte actuellement",
    );
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

for (const route of [
  "/actualites-medias/galerie",
  "/en/actualites-medias/galerie",
] as const) {
  test(`${route} renders an accessible filterable photo library`, async ({
    page,
  }) => {
    const english = route.startsWith("/en");
    await page.goto(route);
    await expect(page.locator("h1")).toContainText(
      english ? "Gallery & photo library" : "Galerie & photothèque",
    );
    await expect(page.locator(".gallery-card")).toHaveCount(24);

    await page
      .locator(".gallery-filters")
      .getByRole("button", { name: english ? /Training/ : /Formations/ })
      .click();
    await expect(page.locator(".gallery-card")).toHaveCount(3);

    await page.locator(".gallery-card button").first().click();
    await expect(page.locator(".gallery-lightbox")).toBeVisible();
    await expect(
      page.getByRole("button", {
        name: english ? "Next image" : "Image suivante",
      }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator(".gallery-lightbox")).not.toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test("language, mobile menu, search and permanent redirect work", async ({
  page,
}) => {
  await page.goto("/");
  const languageLink = page
    .locator(".utility-bar nav")
    .getByRole("link", { name: "EN", exact: true });
  await expect(languageLink).toHaveAttribute("href", "/en");
  await page.goto("/en");
  await expect(page).toHaveURL(/\/en$/);
  await page.goto("/a-propos-de-nous");
  await expect(page).toHaveURL(/\/institut\/a-propos$/);
  await page.goto("/recherche");
  await page
    .getByRole("textbox", { name: /Rechercher dans/ })
    .fill("médicament");
  await page.getByRole("button", { name: "Rechercher" }).click();
  await expect(page.getByText(/résultat/)).toBeVisible();
});

test("the Institute submenu exposes the about page on desktop and mobile", async ({
  page,
}) => {
  await page.goto("/");

  const instituteNavigation = page.locator(".desktop-nav__item").filter({
    has: page.getByRole("link", { name: "L’Institut", exact: true }),
  });
  await instituteNavigation.locator(".desktop-nav__trigger").hover();
  const instituteSubmenu = instituteNavigation.locator(".desktop-nav__submenu");
  const desktopAbout = instituteSubmenu.getByRole("link", {
    name: /À propos de nous/,
  });
  await expect(desktopAbout).toBeVisible();
  await expect(desktopAbout).toHaveAttribute("href", "/institut/a-propos");
  const desktopMission = instituteSubmenu.getByRole("link", {
    name: /Mission et vision/,
  });
  await expect(desktopMission).toBeVisible();
  await expect(desktopMission).toHaveAttribute(
    "href",
    "/institut/mission-vision",
  );
  const desktopServices = instituteSubmenu.getByRole("link", {
    name: /Nos services/,
  });
  await expect(desktopServices).toBeVisible();
  await expect(desktopServices).toHaveAttribute(
    "href",
    "/institut/nos-services",
  );

  await page.setViewportSize({ width: 375, height: 812 });
  await page.reload();
  await page.locator(".mobile-menu summary").click();
  await page
    .locator(".mobile-menu__group")
    .getByRole("link", { name: "À propos de nous" })
    .click();
  await expect(page).toHaveURL(/\/institut\/a-propos$/);
  await expect(page.locator(".mobile-menu")).not.toHaveAttribute("open", "");
  await expect(page.locator(".mobile-menu__panel")).not.toBeVisible();
  await expect(page.locator("h1")).toContainText("À propos de l’Institut");
});

test("the News and media menus expose the photo library", async ({ page }) => {
  await page.goto("/");

  const newsTrigger = page
    .locator(".desktop-nav__trigger")
    .filter({ hasText: "Actualités & médias" });
  await newsTrigger.hover();
  const desktopGallery = page
    .locator(".desktop-nav__submenu--right")
    .getByRole("link", { name: /Galerie & photothèque/ });
  await expect(desktopGallery).toBeVisible();
  await expect(desktopGallery).toHaveAttribute(
    "href",
    "/actualites-medias/galerie",
  );

  await page.setViewportSize({ width: 375, height: 812 });
  await page.reload();
  await page.locator(".mobile-menu summary").click();
  const mobileGallery = page
    .locator(".mobile-menu__group")
    .getByRole("link", { name: "Galerie & photothèque" });
  await expect(mobileGallery).toBeVisible();
  await expect(mobileGallery).toHaveAttribute(
    "href",
    "/actualites-medias/galerie",
  );
});

test("unconfigured contact form fails without losing the page", async ({
  page,
}) => {
  await page.goto("/contact");
  await page.getByLabel("Prénom").fill("Amina");
  await page.getByLabel("Email").fill("amina@example.org");
  await page.getByLabel("Pays").fill("Cameroun");
  await page
    .getByLabel("Votre demande")
    .fill("Demande institutionnelle de test suffisamment longue.");
  await page.getByRole("checkbox", { name: /J’accepte/ }).check();
  await page.getByRole("button", { name: "Envoyer la demande" }).click();
  await expect(page.locator(".form-error")).toContainText(
    /pas encore configuré|momentanément/,
  );
});

test("disabled Montreal route remains a 404", async ({ page }) => {
  const response = await page.goto("/montreal");
  expect(response?.status()).toBe(404);
});

test("the removed Science and data page remains unavailable", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page
      .locator(".desktop-nav")
      .getByRole("link", { name: "Science & données" }),
  ).toHaveCount(0);

  const frenchResponse = await page.goto("/science-donnees");
  expect(frenchResponse?.status()).toBe(404);

  const englishResponse = await page.goto("/en/science-donnees");
  expect(englishResponse?.status()).toBe(404);
});

test("the removed Programmes and impact page remains unavailable", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page
      .locator(".desktop-nav")
      .getByRole("link", { name: "Programmes & impact" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Découvrir nos services" }),
  ).toHaveAttribute("href", "/institut/nos-services");

  const frenchResponse = await page.goto("/programmes");
  expect(frenchResponse?.status()).toBe(404);

  const englishResponse = await page.goto("/en/programmes");
  expect(englishResponse?.status()).toBe(404);
});

test("hero globe exposes themes, depth, parallax and motion control", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("list", { name: "Thèmes des orbites" }),
  ).toContainText("ScienceAccèsCoopération");

  const globe = page.locator(".hero-science");
  await globe.hover({ position: { x: 470, y: 50 } });
  await expect
    .poll(() =>
      globe.evaluate((node) => node.style.getPropertyValue("--globe-shift-x")),
    )
    .not.toBe("0px");

  const frontRunner = page
    .locator(".hero-science__orbit-depth--front .hero-science__orbit-runner")
    .first();
  await expect(frontRunner).toHaveCSS(
    "animation-name",
    "iam-satellite-orbit, iam-depth-front",
  );

  await page.getByRole("button", { name: "Mettre en pause" }).click();
  await expect(globe).toHaveClass(/hero-science--paused/);
  await expect(
    page.getByRole("button", { name: "Activer l’animation" }),
  ).toHaveAttribute("aria-pressed", "true");
});

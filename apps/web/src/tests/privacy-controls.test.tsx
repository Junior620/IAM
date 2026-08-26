import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ContactForm } from "@/components/contact-form";
import { NewsletterForm } from "@/components/newsletter-form";
import { CookieConsent } from "@/components/cookie-consent";
import { requestFingerprint } from "@/lib/server/rate-limit";

describe("privacy controls", () => {
  const originalToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  beforeEach(() => {
    window.localStorage.clear();
    document.cookie = "iam_cookie_consent=; Path=/; Max-Age=0";
    window.history.replaceState({}, "", "/");
  });

  afterEach(() => {
    if (originalToken === undefined) {
      delete process.env.UPSTASH_REDIS_REST_TOKEN;
    } else {
      process.env.UPSTASH_REDIS_REST_TOKEN = originalToken;
    }
  });

  it("warns contact-form users not to submit health data", () => {
    render(<ContactForm locale="fr" />);

    expect(
      screen.getByText(/ne transmettez aucune donnée de santé/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Politique de confidentialité/ }),
    ).toHaveAttribute("href", "/confidentialite");
  });

  it("keeps newsletter consent explicit and links to privacy information", () => {
    render(<NewsletterForm locale="en" compact />);

    const consent = screen.getByRole("checkbox", {
      name: /I agree to receive the selected communications/,
    });
    expect(consent).not.toBeChecked();
    expect(
      screen.getByRole("link", { name: "Privacy policy" }),
    ).toHaveAttribute("href", "/en/confidentialite");
  });

  it("pseudonymises rate-limit identifiers before external storage", () => {
    process.env.UPSTASH_REDIS_REST_TOKEN = "test-secret-not-a-real-key";
    const request = new Request("https://iam.example/contact", {
      headers: { "x-forwarded-for": "203.0.113.42" },
    });

    const fingerprint = requestFingerprint(request);
    expect(fingerprint).not.toContain("203.0.113.42");
    expect(fingerprint).toMatch(/^[a-f0-9]{64}$/);
    expect(requestFingerprint(request)).toBe(fingerprint);
  });

  it("offers accept, reject and custom cookie choices to new visitors", async () => {
    render(<CookieConsent locale="fr" />);

    expect(
      await screen.findByRole("heading", {
        name: "Votre vie privée, votre choix",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Tout accepter" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Tout refuser" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Personnaliser" }));

    const audience = screen.getByRole("checkbox", {
      name: /Mesure d’audience/,
    });
    const necessary = screen.getByRole("checkbox", {
      name: /Strictement nécessaires/,
    });
    expect(necessary).toBeChecked();
    expect(necessary).toBeDisabled();
    expect(audience).not.toBeChecked();

    fireEvent.click(audience);
    fireEvent.click(
      screen.getByRole("button", { name: "Enregistrer mes choix" }),
    );

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: "Personnaliser mes cookies" }),
      ).not.toBeInTheDocument();
    });
    expect(document.documentElement.dataset.cookieAudience).toBe("granted");
    expect(document.cookie).toContain("iam_cookie_consent=");
  });

  it("remembers a rejection and hides the banner on a later visit", async () => {
    const firstVisit = render(<CookieConsent locale="en" />);
    fireEvent.click(await screen.findByRole("button", { name: "Reject all" }));
    firstVisit.unmount();

    render(<CookieConsent locale="en" />);

    await waitFor(() => {
      expect(
        screen.queryByRole("heading", {
          name: "Your privacy, your choice",
        }),
      ).not.toBeInTheDocument();
    });
    expect(document.documentElement.dataset.cookieAudience).toBe("denied");
  });
});

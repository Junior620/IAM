import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ContactForm } from "@/components/contact-form";
import { NewsletterForm } from "@/components/newsletter-form";
import { requestFingerprint } from "@/lib/server/rate-limit";

describe("privacy controls", () => {
  const originalToken = process.env.UPSTASH_REDIS_REST_TOKEN;

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
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomePage } from "@/components/home-page";

describe("HomePage", () => {
  it("renders the approved French positioning and eight pillars", () => {
    render(<HomePage locale="fr" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Faire progresser le médicament en Afrique",
    );
    expect(
      screen.getAllByText(/Donnée publiée uniquement après vérification/i)
        .length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: /Explorer/i }).length,
    ).toBeGreaterThanOrEqual(8);
    expect(
      screen.getByRole("link", { name: "Découvrir l’Institut" }),
    ).toHaveAttribute("href", "/institut/a-propos");
  });

  it("renders the English experience", () => {
    render(<HomePage locale="en" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Advancing medicine in Africa",
    );
    expect(
      screen.getByRole("link", { name: "Discover the Institute" }),
    ).toHaveAttribute("href", "/en/institut/a-propos");
  });
});

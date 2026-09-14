import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { UnderConstructionPage } from "@/components/under-construction-page";

describe("UnderConstructionPage", () => {
  it("presents the pending institutional page in French", () => {
    render(<UnderConstructionPage locale="fr" />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Cette page se construit avec soin.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Finalisation en cours")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Nous contacter/ })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("presents the pending institutional page in English", () => {
    render(<UnderConstructionPage locale="en" />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "This page is being built with care.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Return home/ })).toHaveAttribute(
      "href",
      "/en",
    );
  });

  it("presents the participation page with dedicated wording", () => {
    render(<UnderConstructionPage locale="fr" page="participate" />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Votre espace de participation arrive bientôt.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Parcours en préparation")).toBeInTheDocument();
    expect(screen.getByText("Préparation des parcours")).toBeInTheDocument();
  });
});

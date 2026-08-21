import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AboutPage } from "@/components/about-page";

describe("AboutPage", () => {
  it("presents the institutional story without unsupported metrics", () => {
    render(<AboutPage locale="fr" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "À propos de l’Institut Africain du Médicament",
    );
    expect(screen.getAllByText("2008").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Dr Didier Mouliom/).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/ministères de la Santé/).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", { name: "Notre histoire" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/dossier patient numérisé/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Ce témoignage mentionne 2009/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Notre équipe" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "M. Didier Mouliom" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Fondateur & Directeur Général"),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("Portrait de M. Didier Mouliom"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "M. Rostand SAGU" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Directeur Qualité et Affaires réglementaires"),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("Portrait de M. Rostand SAGU"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "M. MFOMOGNAM MAPOURE BELLINI RIQUET",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Responsable RH")).toBeInTheDocument();
    expect(
      screen.getByAltText("Portrait de M. MFOMOGNAM MAPOURE BELLINI RIQUET"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Mme Bouambo Vanneck Chancelle" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Responsable marketing")).toBeInTheDocument();
    expect(
      screen.getByAltText("Portrait de Mme Bouambo Vanneck Chancelle"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "M. Kevin Nye" }),
    ).toBeInTheDocument();
    expect(screen.getByText("HR Lead")).toBeInTheDocument();
    expect(screen.getByAltText("Portrait de M. Kevin Nye")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "M. Alex Young" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Customer Support Lead")).toBeInTheDocument();
    expect(
      screen.getByAltText("Portrait de M. Alex Young"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/distinct de l’Agence africaine/),
    ).toBeInTheDocument();
    expect(document.querySelector(".about-hero__image")).toHaveAttribute(
      "src",
      expect.stringContaining("about-hero-pharmacist.png"),
    );
    expect(document.querySelector(".about-hero__mark")).not.toBeInTheDocument();
  });

  it("localises navigation and content in English", () => {
    render(<AboutPage locale="en" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "About the African Institute of Medicine",
    );
    expect(screen.getByRole("link", { name: "Contact IAM" })).toHaveAttribute(
      "href",
      "/en/contact",
    );
    expect(
      screen.getByRole("heading", { name: "Our story" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Our team" }),
    ).toBeInTheDocument();
  });
});

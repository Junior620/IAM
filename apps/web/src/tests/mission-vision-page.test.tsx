import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MissionVisionPage } from "@/components/mission-vision-page";

describe("MissionVisionPage", () => {
  it("presents the mission, vision and operating principles in French", () => {
    render(<MissionVisionPage locale="fr" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Faire de la connaissance une capacité d’action",
    );
    expect(
      screen.getByRole("heading", { name: "Éclairer" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Relier" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Structurer" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Transmettre" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Notre expertise" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "L’Institut Africain du Médicament en chiffres :",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Dr Didier Mouliom")).toBeInTheDocument();
    expect(screen.getByText("2008")).toBeInTheDocument();
    expect(screen.getByText("282")).toBeInTheDocument();
    expect(screen.getByText("+30")).toBeInTheDocument();
    expect(screen.getByText("+50")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Une formation construite autour de chaque besoin.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Former les formateurs" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Ils nous font confiance" }),
    ).toBeInTheDocument();
    expect(screen.getByAltText("HelioScience")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Affaires réglementaires" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Réglementation & produits" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Former et accompagner les acteurs/,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Favoriser l’accès à des médicaments abordables"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "De l’état des lieux à la décision.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Analyser et planifier" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Évaluer l’impact" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Découvrir nos services/ }),
    ).toHaveAttribute("href", "/institut/nos-services");
  });

  it("localises the page and links in English", () => {
    render(<MissionVisionPage locale="en" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Turning knowledge into the capacity to act",
    );
    expect(
      screen.getByRole("heading", { name: "Our expertise" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "The African Institute of Medicine in figures:",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Training designed around each need.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "They place their trust in us",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Train and support health-system professionals.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "From assessment to decision." }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Talk to IAM/ })).toHaveAttribute(
      "href",
      "/en/contact",
    );
  });
});

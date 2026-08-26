import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ArtistPartnershipPage } from "@/components/artist-partnership-page";

describe("ArtistPartnershipPage", () => {
  it("presents the artistic partnership and official contact details in French", () => {
    render(<ArtistPartnershipPage locale="fr" />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Anna Snijder" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Artiste plasticienne internationale"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/je reverse un pourcentage fixe/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Le pourcentage contractuel exact n’est pas affiché publiquement.",
      ),
    ).toBeInTheDocument();

    const artistLinks = screen.getAllByRole("link", {
      name: /Découvrir son travail|Visiter le site de l’artiste/,
    });
    expect(artistLinks[0]).toHaveAttribute(
      "href",
      "https://www.annasnijder.com",
    );
    expect(artistLinks[0]).toHaveAttribute("target", "_blank");
    expect(artistLinks[0]).toHaveAttribute("rel", "noopener noreferrer");
    expect(
      screen.getByRole("link", { name: /info@annasnijder.com/ }),
    ).toHaveAttribute("href", "mailto:info@annasnijder.com");
    expect(
      screen.getByRole("img", {
        name: /Emplacement réservé aux visuels officiels/,
      }),
    ).toBeInTheDocument();
  });

  it("localises the page and internal IAM route in English", () => {
    render(<ArtistPartnershipPage locale="en" />);

    expect(screen.getByText("International visual artist")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "A meeting that grew into a commitment to IAM.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "Discover the African Institute of Medicine",
      }),
    ).toHaveAttribute("href", "/en/institut/a-propos");
  });
});

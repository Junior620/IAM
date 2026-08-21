import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GalleryPage } from "@/components/gallery-page";

describe("GalleryPage", () => {
  it("renders the documented French photo library", () => {
    const { container } = render(<GalleryPage locale="fr" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Galerie & photothèque",
    );
    expect(
      screen.getAllByRole("button", { name: /Agrandir l’image/ }),
    ).toHaveLength(24);
    expect(container.querySelectorAll(".gallery-card")).toHaveLength(24);
    expect(
      screen.getByRole("button", {
        name: "Réglementation cosmétique (5)",
      }),
    ).toHaveTextContent("5");
    expect(
      screen.getByRole("button", {
        name: "Soutien scolaire NOSO 2021 (5)",
      }),
    ).toHaveTextContent("5");
    const duphatFilter = screen.getByRole("button", {
      name: "DUPHAT 2020 (5)",
    });
    expect(duphatFilter).toHaveTextContent("5");
    fireEvent.click(duphatFilter);
    expect(container.querySelectorAll(".gallery-card")).toHaveLength(5);
    expect(screen.getByText("5 images affichées")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Formations/ }),
    ).toHaveTextContent("3");
    expect(
      screen.getByRole("link", { name: /Contacter l’équipe médias/ }),
    ).toHaveAttribute("href", "/contact?type=media");
  });

  it("localises the gallery in English", () => {
    render(<GalleryPage locale="en" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Gallery & photo library",
    );
    expect(
      screen.getByRole("link", { name: /Contact the media team/ }),
    ).toHaveAttribute("href", "/en/contact?type=media");
  });
});

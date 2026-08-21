import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServicesPage } from "@/components/services-page";

describe("ServicesPage", () => {
  it("presents twelve services and a contact pathway in French", () => {
    const { container } = render(<ServicesPage locale="fr" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Des expertises mobilisées au service des systèmes de santé",
    );
    expect(container.querySelectorAll(".service-card")).toHaveLength(12);
    expect(
      screen.getByRole("heading", { name: "Affaires réglementaires" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Management de projet" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Rejoignez nos formations et devenez un professionnel de santé",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Nos formations" }),
    ).toHaveAttribute("href", "/academie");
    expect(
      screen.getByRole("heading", { name: "Nos actions sur le terrain" }),
    ).toBeInTheDocument();
    expect(container.querySelectorAll(".field-action-card")).toHaveLength(5);
    expect(
      screen.getByRole("heading", {
        name: "Appui aux politiques de santé",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Nous contacter/ }),
    ).toHaveAttribute("href", "/contact?type=partnership");
  });

  it("localises the page and contact link in English", () => {
    const { container } = render(<ServicesPage locale="en" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Expertise mobilised to strengthen health systems",
    );
    expect(container.querySelectorAll(".service-card")).toHaveLength(12);
    expect(
      screen.getByRole("heading", { name: "Regulatory affairs" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Our courses" })).toHaveAttribute(
      "href",
      "/en/academie",
    );
    expect(
      screen.getByRole("heading", { name: "Our work in the field" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Contact us/ })).toHaveAttribute(
      "href",
      "/en/contact?type=partnership",
    );
  });
});

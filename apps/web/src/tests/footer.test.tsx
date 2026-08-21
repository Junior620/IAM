import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "@/components/header";

describe("Footer", () => {
  it("publishes the institutional contact details in French", () => {
    render(<Footer locale="fr" />);

    expect(
      screen.getByRole("heading", { name: "Coordonnées institutionnelles" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Bonamoussadi, Bloc 24/)).toBeInTheDocument();
    expect(screen.getByText(/5426 Douala/)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "+237 696 21 68 09" }),
    ).toHaveAttribute("href", "tel:+237696216809");
    expect(
      screen.getByRole("link", {
        name: "institutafricaindumedicament@gmail.com",
      }),
    ).toHaveAttribute("href", "mailto:institutafricaindumedicament@gmail.com");
    expect(screen.getByText("RC DLA / 2017 / B / 71")).toBeInTheDocument();
    expect(screen.getByText(/M011712585175S/)).toBeInTheDocument();
  });

  it("localises contact labels in English", () => {
    render(<Footer locale="en" />);

    expect(
      screen.getByRole("heading", { name: "Institutional contact details" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/P\.O\. Box 5426/)).toBeInTheDocument();
    expect(screen.getByText(/Taxpayer/)).toBeInTheDocument();
  });
});

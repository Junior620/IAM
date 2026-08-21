import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AcademyPage } from "@/components/academy-page";

describe("AcademyPage", () => {
  it("presents verified training information in French", () => {
    const { container } = render(<AcademyPage locale="fr" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Nos formations",
    );
    expect(
      container.querySelectorAll(".academy-formats__grid article"),
    ).toHaveLength(4);
    expect(
      container.querySelectorAll(".academy-audiences__grid article"),
    ).toHaveLength(4);
    expect(
      container.querySelectorAll(
        ".academy-curriculum__block:first-child .academy-curriculum__list li",
      ),
    ).toHaveLength(11);
    expect(
      container.querySelectorAll(
        ".academy-curriculum__block--modules .academy-curriculum__list li",
      ),
    ).toHaveLength(6);
    expect(
      screen.getByRole("link", { name: "Contactez-nous" }),
    ).toHaveAttribute("href", "/contact?type=training");
    expect(
      screen.getByText("Aucune session ouverte actuellement"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Manifester votre intérêt/ }),
    ).toHaveAttribute("href", "/contact?type=training");
  });

  it("localises the academy page in English", () => {
    render(<AcademyPage locale="en" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Our training programmes",
    );
    expect(screen.getByText("No sessions currently open")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Register your interest/ }),
    ).toHaveAttribute("href", "/en/contact?type=training");
  });
});

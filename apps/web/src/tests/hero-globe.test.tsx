import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { HeroGlobe } from "@/components/hero-globe";

describe("HeroGlobe", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    });
  });

  it("connects the three orbital themes and supports pausing", () => {
    render(<HeroGlobe locale="fr" />);

    expect(
      screen.getByRole("list", { name: "Thèmes des orbites" }),
    ).toHaveTextContent("ScienceAccèsCoopération");
    const toggle = screen.getByRole("button", { name: "Mettre en pause" });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(toggle.closest(".hero-science")).toHaveClass("hero-science--paused");
  });

  it("applies a restrained pointer parallax", () => {
    render(<HeroGlobe locale="fr" />);
    const globe = screen
      .getByRole("img", { name: /Globe scientifique animé/i })
      .closest<HTMLDivElement>(".hero-science");
    expect(globe).not.toBeNull();
    if (!globe) return;

    vi.spyOn(globe, "getBoundingClientRect").mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: 500,
      bottom: 500,
      width: 500,
      height: 500,
      toJSON: () => ({}),
    });
    fireEvent.pointerMove(globe, {
      clientX: 450,
      clientY: 50,
      pointerType: "mouse",
    });

    expect(globe.style.getPropertyValue("--globe-shift-x")).toBe("4.00px");
    expect(globe.style.getPropertyValue("--globe-shift-y")).toBe("-3.20px");
  });
});

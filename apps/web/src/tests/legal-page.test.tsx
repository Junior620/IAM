import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LegalPage } from "@/components/legal-page";

describe("LegalPage", () => {
  it("describes the actual cookie configuration without inventing trackers", () => {
    const { container } = render(<LegalPage locale="fr" path="/cookies" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Politique de cookies",
    );
    expect(screen.getByText(/Aucun Google Analytics/)).toBeInTheDocument();
    expect(screen.getByText(/Statistiques : inactifs/)).toBeInTheDocument();
    expect(container.querySelector("#gestion")).toBeInTheDocument();
  });

  it("identifies providers without publishing unresolved placeholders", () => {
    render(<LegalPage locale="en" path="/confidentialite" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Privacy policy",
    );
    expect(
      screen.queryByText(/INFORMATION TO BE COMPLETED BY IAM/),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Resend/ })).toHaveAttribute(
      "href",
      "https://resend.com/legal/dpa",
    );
    expect(
      screen.getByText(
        /neither a GDPR certification nor a HIPAA certification/,
      ),
    ).toBeInTheDocument();
  });

  it("publishes a medical disclaimer and a cautious accessibility status", () => {
    const { rerender } = render(
      <LegalPage locale="fr" path="/avertissement-medical" />,
    );
    expect(
      screen.getByText(/Le site ne fournit pas de diagnostic médical/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/ne constituent pas un canal de pharmacovigilance/i),
    ).toBeInTheDocument();

    rerender(<LegalPage locale="fr" path="/accessibilite" />);
    expect(
      screen.getByText(/ne déclare donc pas le site intégralement conforme/),
    ).toBeInTheDocument();
  });
});

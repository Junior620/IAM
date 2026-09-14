import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AssistantChat } from "@/components/assistant-chat";
import {
  classifyAssistantInput,
  localAssistantAnswer,
  selectAssistantKnowledge,
} from "@/lib/assistant-knowledge";
import { POST } from "@/app/api/assistant/route";

describe("IAM Assistant", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("opens an accessible bilingual chat and displays sourced answers", async () => {
    const request = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        answer: "L’IAM propose douze domaines d’intervention.",
        mode: "local",
        sources: [{ title: "Nos services", path: "/institut/nos-services" }],
      }),
    });
    vi.stubGlobal("fetch", request);

    render(<AssistantChat locale="fr" />);
    fireEvent.click(
      screen.getByRole("button", { name: "Ouvrir l’Assistant IAM" }),
    );

    expect(
      screen.getByRole("dialog", { name: "Assistant IAM" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/aucun conseil médical/i)).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Quels services propose l’IAM ?",
      }),
    );

    expect(
      await screen.findByText("L’IAM propose douze domaines d’intervention."),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Nos services/ })).toHaveAttribute(
      "href",
      "/institut/nos-services",
    );
    expect(request).toHaveBeenCalledWith(
      "/api/assistant",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("identifies medical and personal information before model processing", () => {
    expect(
      classifyAssistantInput(
        "Quelle dose dois-je prendre pour mes symptômes ?",
      ),
    ).toBe("medical");
    expect(classifyAssistantInput("Mon email est patient@example.com")).toBe(
      "personal",
    );
    expect(classifyAssistantInput("Quels services propose l’IAM ?")).toBe(
      "safe",
    );
  });

  it("selects local IAM knowledge and answers without an external model", () => {
    const entries = selectAssistantKnowledge(
      "Où se trouve votre adresse à Douala ?",
      "fr",
    );
    expect(entries[0]?.id).toBe("contact");
    expect(localAssistantAnswer("adresse Douala", "fr", entries)).toMatch(
      /Bonamoussadi/,
    );
  });

  it("returns a safe response from the API for a personal medical request", async () => {
    const response = await POST(
      new Request("http://localhost/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost",
        },
        body: JSON.stringify({
          locale: "fr",
          messages: [
            {
              role: "user",
              content: "J’ai des symptômes, quel traitement dois-je prendre ?",
            },
          ],
        }),
      }),
    );
    const result = (await response.json()) as {
      answer: string;
      mode: string;
    };

    expect(response.status).toBe(200);
    expect(result.mode).toBe("safety");
    expect(result.answer).toMatch(/professionnel de santé/i);
  });

  it("serves a local sourced answer when OpenAI is not configured", async () => {
    const originalKey = process.env.OPENAI_API_KEY;
    const originalModel = process.env.OPENAI_ASSISTANT_MODEL;
    delete process.env.OPENAI_API_KEY;
    delete process.env.OPENAI_ASSISTANT_MODEL;

    try {
      const response = await POST(
        new Request("http://localhost/api/assistant", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Origin: "http://localhost",
          },
          body: JSON.stringify({
            locale: "fr",
            messages: [
              { role: "user", content: "Quels services propose l’IAM ?" },
            ],
          }),
        }),
      );
      const result = (await response.json()) as {
        answer: string;
        mode: string;
        sources: Array<{ path: string }>;
      };

      expect(result.mode).toBe("local");
      expect(result.answer).toMatch(/douze domaines/i);
      expect(result.sources[0]?.path).toBe("/institut/nos-services");
    } finally {
      if (originalKey === undefined) delete process.env.OPENAI_API_KEY;
      else process.env.OPENAI_API_KEY = originalKey;
      if (originalModel === undefined)
        delete process.env.OPENAI_ASSISTANT_MODEL;
      else process.env.OPENAI_ASSISTANT_MODEL = originalModel;
    }
  });
});

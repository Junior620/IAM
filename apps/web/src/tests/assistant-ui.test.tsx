import type { AnchorHTMLAttributes } from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AssistantChat } from "@/components/assistant-chat";

const route = vi.hoisted(() => ({ pathname: "/" }));

vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }));
vi.mock("next/link", () => ({
  default: function Link({
    onNavigate,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & { onNavigate?: () => void }) {
    return (
      <a {...props} onClick={(event) => {
        event.preventDefault();
        if (!event.ctrlKey && !event.metaKey) onNavigate?.();
      }} />
    );
  },
}));

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

function reply(answer: string, mode: "local" | "safety" = "local") {
  return Response.json({
    answer,
    mode,
    sources: [{ title: "Nos services", path: "/institut/nos-services" }],
  });
}

function openChat() {
  fireEvent.click(screen.getByRole("button", { name: "Ouvrir l’Assistant IAM" }));
}

function ask(question: string) {
  fireEvent.change(screen.getByRole("textbox"), { target: { value: question } });
  fireEvent.click(screen.getByRole("button", { name: "Envoyer la question" }));
}

afterEach(() => {
  route.pathname = "/";
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("Assistant focus and navigation", () => {
  it("returns keyboard focus to the launcher after closing or pressing Escape", async () => {
    render(<AssistantChat locale="fr" />);
    openChat();
    await waitFor(() => expect(screen.getByRole("textbox")).toHaveFocus());
    fireEvent.click(screen.getByRole("button", { name: "Fermer l’Assistant IAM" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Ouvrir l’Assistant IAM" })).toHaveFocus());
    openChat();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole("button", { name: "Ouvrir l’Assistant IAM" })).toHaveFocus());
  });

  it.each([
    { link: "Confidentialité", path: "/confidentialite", needsAnswer: false },
    { link: "Nos services", path: "/institut/nos-services", needsAnswer: true },
  ])("closes on $link and focuses the destination page", async ({ link, path, needsAnswer }) => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(reply("Services IAM disponibles.")));
    const page = () => <><main>Contenu de la page</main><AssistantChat locale="fr" /></>;
    const view = render(page());
    openChat();
    if (needsAnswer) {
      ask("Quels sont les services ?");
      await screen.findByText("Services IAM disponibles.");
    }
    fireEvent.click(screen.getByRole("link", { name: link }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    route.pathname = path;
    view.rerender(page());
    await waitFor(() => expect(screen.getByRole("main")).toHaveFocus());
  });
});

describe("Assistant request lifecycle and privacy", () => {
  it("aborts an erased request and ignores a late successful response", async () => {
    const first = deferred<Response>();
    const request = vi.fn().mockReturnValueOnce(first.promise).mockResolvedValueOnce(reply("Nouvelle réponse."));
    vi.stubGlobal("fetch", request);
    render(<AssistantChat locale="fr" />);
    openChat();
    ask("Ancienne question privée");
    const signal = request.mock.calls[0]?.[1]?.signal as AbortSignal;
    fireEvent.click(screen.getByRole("button", { name: "Effacer la conversation" }));
    expect(signal.aborted).toBe(true);
    expect(screen.getByRole("textbox")).toBeEnabled();
    await act(async () => first.resolve(reply("Ancienne réponse à ignorer.")));
    expect(screen.queryByText("Ancienne réponse à ignorer.")).not.toBeInTheDocument();
    ask("Quels sont vos services ?");
    await screen.findByText("Nouvelle réponse.");
    expect(request.mock.calls[1]?.[1]?.body).not.toContain("Ancienne question privée");
  });

  it("ignores a stale rejection without unlocking a newer pending request", async () => {
    const first = deferred<Response>();
    const second = deferred<Response>();
    const request = vi.fn().mockReturnValueOnce(first.promise).mockReturnValueOnce(second.promise);
    vi.stubGlobal("fetch", request);
    render(<AssistantChat locale="fr" />);
    openChat();
    ask("Ancienne question");
    fireEvent.click(screen.getByRole("button", { name: "Effacer la conversation" }));
    ask("Nouvelle question");
    await act(async () => first.reject(new Error("Aborted request")));
    expect(screen.getByRole("textbox")).toBeDisabled();
    expect(screen.queryByText(/rencontre une difficulté/)).not.toBeInTheDocument();
    await act(async () => second.resolve(reply("Réponse actuelle.")));
    expect(screen.getByText("Réponse actuelle.")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeEnabled();
  });

  it("removes a rejected private message and excludes it from later requests", async () => {
    const request = vi.fn()
      .mockResolvedValueOnce(reply("Veuillez ne pas envoyer de données personnelles.", "safety"))
      .mockResolvedValueOnce(reply("Voici les formations IAM."));
    vi.stubGlobal("fetch", request);
    render(<AssistantChat locale="fr" />);
    openChat();
    ask("Mon email est prive@example.com");
    await screen.findByText("Veuillez ne pas envoyer de données personnelles.");
    expect(screen.queryByText("Mon email est prive@example.com")).not.toBeInTheDocument();
    ask("Quelles formations propose IAM ?");
    await screen.findByText("Voici les formations IAM.");
    const body = JSON.parse(String(request.mock.calls[1]?.[1]?.body));
    expect(body.messages).toEqual([{ role: "user", content: "Quelles formations propose IAM ?" }]);
  });

  it("explains rate limits using the server retry delay", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, {
      status: 429,
      headers: { "Retry-After": "45" },
    })));
    render(<AssistantChat locale="fr" />);
    openChat();
    ask("Quels services propose IAM ?");
    expect(await screen.findByText(/Réessayez dans 45 secondes/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contacter l’IAM" })).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeEnabled();
  });

  it("times out stalled requests, aborts the fetch and permits a fresh question", async () => {
    vi.useFakeTimers();
    const stalled = deferred<Response>();
    const request = vi.fn().mockReturnValueOnce(stalled.promise).mockResolvedValueOnce(reply("Reprise correcte."));
    vi.stubGlobal("fetch", request);
    render(<AssistantChat locale="fr" />);
    openChat();
    ask("Question lente");
    await act(async () => vi.advanceTimersByTimeAsync(25000));
    expect((request.mock.calls[0]?.[1]?.signal as AbortSignal).aborted).toBe(true);
    expect(screen.getByText(/La réponse prend trop de temps/)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeEnabled();
    await act(async () => ask("Quels services propose IAM ?"));
    expect(screen.getByText("Reprise correcte.")).toBeInTheDocument();
    expect(request.mock.calls[1]?.[1]?.body).not.toContain("Question lente");
  });
});

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  ExternalLink,
  MessageCircle,
  RotateCcw,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { localizePath, type Locale } from "@/lib/content";
import type { AssistantSource } from "@/lib/assistant-knowledge";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: AssistantSource[];
  mode?: "ai" | "local" | "safety";
  includeInHistory?: boolean;
};

type AssistantResponse = {
  answer?: string;
  error?: string;
  sources?: AssistantSource[];
  mode?: "ai" | "local" | "safety";
};

const labels = {
  fr: {
    launcher: "Ouvrir l’Assistant IAM",
    close: "Fermer l’Assistant IAM",
    title: "Assistant IAM",
    status: "Pilote documentaire",
    welcome:
      "Bonjour, je peux vous orienter dans les contenus de l’IAM : services, formations, priorités, partenariats et informations pratiques.",
    disclaimer:
      "Information institutionnelle uniquement, aucun conseil médical.",
    privacy:
      "Ne partagez aucune donnée personnelle, médicale ou concernant un patient.",
    placeholder: "Posez votre question sur l’IAM...",
    send: "Envoyer la question",
    clear: "Effacer la conversation",
    sources: "Sources IAM",
    thinking: "Je consulte les contenus IAM...",
    error:
      "Le service rencontre une difficulté. Réessayez ou utilisez la page Contact.",
    timeout:
      "La réponse prend trop de temps. Vous pouvez réessayer ou contacter l’IAM.",
    rateLimit: (seconds: number) =>
      `Vous avez atteint la limite de questions. Réessayez dans ${seconds} secondes ou contactez l’IAM.`,
    remaining: "caractères disponibles",
    suggestions: [
      "Quels services propose l’IAM ?",
      "Quelles formations sont disponibles ?",
      "Comment devenir partenaire ?",
    ],
    mode: {
      ai: "Réponse assistée",
      local: "Base IAM",
      safety: "Réponse de sécurité",
    },
  },
  en: {
    launcher: "Open IAM Assistant",
    close: "Close IAM Assistant",
    title: "IAM Assistant",
    status: "Documentary pilot",
    welcome:
      "Hello, I can guide you through IAM content: services, courses, priorities, partnerships and practical information.",
    disclaimer: "Institutional information only, no medical advice.",
    privacy: "Do not share personal, medical or patient information.",
    placeholder: "Ask a question about IAM...",
    send: "Send question",
    clear: "Clear conversation",
    sources: "IAM sources",
    thinking: "I am checking IAM content...",
    error:
      "The service encountered a problem. Please try again or use the Contact page.",
    timeout:
      "The answer is taking too long. Please try again or contact IAM.",
    rateLimit: (seconds: number) =>
      `You have reached the question limit. Try again in ${seconds} seconds or contact IAM.`,
    remaining: "characters available",
    suggestions: [
      "What services does IAM provide?",
      "What training courses are available?",
      "How can I become a partner?",
    ],
    mode: {
      ai: "Assisted answer",
      local: "IAM knowledge",
      safety: "Safety answer",
    },
  },
} as const;

function messageId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
}

function initialMessage(locale: Locale): ChatMessage {
  return {
    id: "welcome",
    role: "assistant",
    content: labels[locale].welcome,
    mode: "local",
    includeInHistory: false,
  };
}

export function AssistantChat({ locale }: { locale: Locale }) {
  const text = labels[locale];
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    initialMessage(locale),
  ]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const restoreLauncherRef = useRef(false);
  const navigationRef = useRef<{
    from: string | null;
    samePage: boolean;
    hash: string;
  } | null>(null);
  const requestRef = useRef<{
    controller: AbortController;
    timeout: number | undefined;
  } | null>(null);

  const close = () => {
    navigationRef.current = null;
    restoreLauncherRef.current = true;
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      navigationRef.current = null;
      restoreLauncherRef.current = true;
      setOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (open) inputRef.current?.focus();
      else if (restoreLauncherRef.current) {
        launcherRef.current?.focus();
        restoreLauncherRef.current = false;
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    const navigation = navigationRef.current;
    if (open || !navigation) return;
    if (!navigation.samePage && pathname === navigation.from) return;
    const frame = window.requestAnimationFrame(() => {
      const target =
        (navigation.hash && document.getElementById(navigation.hash)) ||
        document.querySelector<HTMLElement>("main");
      if (target) {
        if (!target.hasAttribute("tabindex")) {
          target.setAttribute("tabindex", "-1");
          target.addEventListener("blur", () => target.removeAttribute("tabindex"), {
            once: true,
          });
        }
        target.focus({ preventScroll: true });
      }
      navigationRef.current = null;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open, pathname]);

  useEffect(() => () => {
    const request = requestRef.current;
    requestRef.current = null;
    if (request) {
      window.clearTimeout(request.timeout);
      request.controller.abort();
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => {
      if (logRef.current)
        logRef.current.scrollTop = logRef.current.scrollHeight;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [messages, open, pending]);

  const clearConversation = () => {
    const request = requestRef.current;
    requestRef.current = null;
    if (request) {
      window.clearTimeout(request.timeout);
      request.controller.abort();
    }
    setPending(false);
    setMessages([initialMessage(locale)]);
    setDraft("");
    window.requestAnimationFrame(() => inputRef.current?.focus());
  };

  const navigateToSource = (path: string) => {
    const destination = new URL(path, window.location.href);
    navigationRef.current = {
      from: pathname,
      samePage: destination.pathname === window.location.pathname,
      hash: decodeURIComponent(destination.hash.slice(1)),
    };
    restoreLauncherRef.current = false;
    setOpen(false);
  };

  const ask = async (question: string) => {
    const content = question.trim();
    if (!content || requestRef.current) return;

    const userMessage: ChatMessage = {
      id: messageId(),
      role: "user",
      content,
      includeInHistory: false,
    };
    const requestMessages = [
      ...messages.filter((message) => message.includeInHistory !== false),
      userMessage,
    ]
      .map(({ role, content: messageContent }) => ({
        role,
        content: messageContent.slice(0, role === "user" ? 500 : 1200),
      }))
      .slice(-8);
    setMessages((current) => [...current, userMessage]);
    setDraft("");
    setPending(true);
    const request = {
      controller: new AbortController(),
      timeout: undefined as number | undefined,
    };
    requestRef.current = request;
    let timedOut = false;
    let failureMessage: string = text.error;

    try {
      const result = await Promise.race([
        (async () => {
          const response = await fetch("/api/assistant", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ locale, messages: requestMessages }),
            signal: request.controller.signal,
          });
          if (response.status === 429) {
            const retryAfter = response.headers?.get("Retry-After");
            const seconds = retryAfter && /^\d+$/.test(retryAfter)
              ? Number(retryAfter)
              : Math.ceil(((Date.parse(retryAfter ?? "") || Date.now() + 60000) - Date.now()) / 1000);
            failureMessage = text.rateLimit(Math.max(1, Math.ceil(seconds)));
          }
          if (!response.ok) throw new Error("Assistant request failed");
          return (await response.json()) as AssistantResponse;
        })(),
        new Promise<never>((_, reject) => {
          request.timeout = window.setTimeout(() => {
            timedOut = true;
            request.controller.abort();
            reject(new Error("Assistant request timed out"));
          }, 25000);
        }),
      ]);
      if (requestRef.current !== request) return;
      const answer = result.answer;
      if (!answer) throw new Error("Assistant response is empty");
      setMessages((current) => [
        ...current.flatMap((message) => {
          if (message.id !== userMessage.id) return [message];
          return result.mode === "safety"
            ? []
            : [{ ...message, includeInHistory: true }];
        }),
        {
          id: messageId(),
          role: "assistant",
          content: answer,
          sources: result.sources ?? [],
          mode: result.mode ?? "local",
          includeInHistory: result.mode !== "safety",
        },
      ]);
    } catch {
      if (requestRef.current !== request) return;
      setMessages((current) => [
        ...current,
        {
          id: messageId(),
          role: "assistant",
          content: timedOut ? text.timeout : failureMessage,
          sources: [
            {
              title: locale === "fr" ? "Contacter l’IAM" : "Contact IAM",
              path: localizePath(locale, "/contact"),
            },
          ],
          mode: "safety",
          includeInHistory: false,
        },
      ]);
    } finally {
      window.clearTimeout(request.timeout);
      if (requestRef.current === request) {
        requestRef.current = null;
        setPending(false);
      }
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void ask(draft);
  };

  const handleInputKeyDown = (
    event: ReactKeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      void ask(draft);
    }
  };

  return (
    <aside className={`iam-assistant${open ? " iam-assistant--open" : ""}`}>
      {open ? (
        <section
          className="iam-assistant__panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="iam-assistant-title"
          aria-describedby="iam-assistant-disclaimer"
        >
          <header className="iam-assistant__header">
            <span className="iam-assistant__avatar" aria-hidden="true">
              <Bot />
            </span>
            <div>
              <h2 id="iam-assistant-title">{text.title}</h2>
              <p>
                <span aria-hidden="true" /> {text.status}
              </p>
            </div>
            <button
              className="iam-assistant__header-button"
              type="button"
              aria-label={text.clear}
              onClick={clearConversation}
            >
              <RotateCcw aria-hidden="true" />
            </button>
            <button
              className="iam-assistant__header-button"
              type="button"
              aria-label={text.close}
              onClick={close}
            >
              <X aria-hidden="true" />
            </button>
          </header>

          <div className="iam-assistant__body" ref={logRef}>
          <div className="iam-assistant__safety" id="iam-assistant-disclaimer">
            <ShieldCheck aria-hidden="true" />
            <span>{text.disclaimer}</span>
          </div>

          <div
            className="iam-assistant__log"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((message) => (
              <article
                className={`iam-assistant__message iam-assistant__message--${message.role}`}
                key={message.id}
              >
                <p>{message.content}</p>
                {message.role === "assistant" && message.mode ? (
                  <small>{text.mode[message.mode]}</small>
                ) : null}
                {message.sources?.length ? (
                  <div className="iam-assistant__sources">
                    <strong>{text.sources}</strong>
                    {message.sources.map((source) => (
                      <Link
                        href={source.path}
                        key={`${message.id}-${source.path}`}
                        onNavigate={() => navigateToSource(source.path)}
                      >
                        {source.title}
                        <ExternalLink aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
            {pending ? (
              <div className="iam-assistant__typing" role="status">
                <span />
                <span />
                <span />
                <span className="sr-only">{text.thinking}</span>
              </div>
            ) : null}
          </div>

          {messages.length === 1 ? (
            <div className="iam-assistant__suggestions">
              {text.suggestions.map((suggestion) => (
                <button
                  type="button"
                  key={suggestion}
                  onClick={() => void ask(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          ) : null}
          </div>

          <form className="iam-assistant__form" onSubmit={submit}>
            <label className="sr-only" htmlFor="iam-assistant-input">
              {text.placeholder}
            </label>
            <div className="iam-assistant__composer">
              <textarea
                id="iam-assistant-input"
                ref={inputRef}
                value={draft}
                maxLength={500}
                rows={1}
                placeholder={text.placeholder}
                aria-describedby="iam-assistant-privacy"
                disabled={pending}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={handleInputKeyDown}
              />
              <button
                type="submit"
                aria-label={text.send}
                disabled={pending || draft.trim().length === 0}
              >
                <Send aria-hidden="true" />
              </button>
            </div>
            <div className="iam-assistant__privacy">
              <p id="iam-assistant-privacy">{text.privacy}</p>
              <span>
                {500 - draft.length} {text.remaining}
              </span>
              <Link
                href={localizePath(locale, "/confidentialite")}
                onNavigate={() => navigateToSource(localizePath(locale, "/confidentialite"))}
              >
                {locale === "fr" ? "Confidentialité" : "Privacy"}
              </Link>
            </div>
          </form>
        </section>
      ) : (
        <button
          className="iam-assistant__launcher"
          type="button"
          aria-label={text.launcher}
          ref={launcherRef}
          onClick={() => setOpen(true)}
        >
          <MessageCircle aria-hidden="true" />
          <span>{text.title}</span>
        </button>
      )}
    </aside>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: Record<string, unknown>,
      ) => string;
      remove: (id: string) => void;
    };
  }
}

export function TurnstileField() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!siteKey || !container.current) return;
    const render = () => {
      if (!window.turnstile || !container.current || widget.current) return;
      widget.current = window.turnstile.render(container.current, {
        sitekey: siteKey,
        callback: (value: string) => setToken(value),
        "expired-callback": () => setToken(""),
        theme: "light",
      });
    };
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-iam-turnstile="true"]',
    );
    if (existing) {
      existing.addEventListener("load", render);
      render();
    } else {
      const script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.dataset.iamTurnstile = "true";
      script.addEventListener("load", render);
      document.head.append(script);
    }
    return () => {
      existing?.removeEventListener("load", render);
      if (widget.current && window.turnstile)
        window.turnstile.remove(widget.current);
    };
  }, [siteKey]);

  if (!siteKey) return null;
  return (
    <>
      <div ref={container} className="turnstile" />
      <input type="hidden" name="turnstileToken" value={token} />
    </>
  );
}

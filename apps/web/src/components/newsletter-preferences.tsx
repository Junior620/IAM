"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { localizePath } from "@/lib/content";

const labels = {
  fr: [
    ["alerts", "Alertes"],
    ["research", "Recherche"],
    ["industry", "Industrie"],
    ["training", "Formation"],
    ["philanthropy", "Philanthropie"],
    ["institutional", "Vie institutionnelle"],
  ],
  en: [
    ["alerts", "Alerts"],
    ["research", "Research"],
    ["industry", "Industry"],
    ["training", "Training"],
    ["philanthropy", "Philanthropy"],
    ["institutional", "Institutional news"],
  ],
} as const;

export function NewsletterPreferences({
  locale,
  token,
}: {
  locale: "fr" | "en";
  token: string;
}) {
  const [state, setState] = useState<
    "idle" | "sending" | "saved" | "unsubscribed" | "error"
  >("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/newsletter/preferences", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        token,
        interests: form.getAll("interests"),
        unsubscribe: false,
      }),
    });
    setState(response.ok ? "saved" : "error");
  }
  async function unsubscribe() {
    setState("sending");
    const response = await fetch("/api/newsletter/preferences", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        token,
        interests: ["institutional"],
        unsubscribe: true,
      }),
    });
    setState(response.ok ? "unsubscribed" : "error");
  }
  const english = locale === "en";
  return (
    <form className="card preference-form" onSubmit={submit}>
      <fieldset disabled={state === "sending"}>
        <legend>
          {english
            ? "Topics you wish to receive"
            : "Thèmes que vous souhaitez recevoir"}
        </legend>
        <div className="check-grid">
          {labels[locale].map(([value, label]) => (
            <label key={value}>
              <input
                type="checkbox"
                name="interests"
                value={value}
                defaultChecked
              />{" "}
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="button-row">
        <button
          className="button button--primary"
          disabled={state === "sending"}
        >
          {english ? "Save preferences" : "Enregistrer"}
        </button>
        <button
          className="button button--ghost"
          type="button"
          onClick={unsubscribe}
          disabled={state === "sending"}
        >
          {english ? "Unsubscribe" : "Se désabonner"}
        </button>
      </div>
      <p className="preference-form__privacy">
        <Link href={localizePath(locale, "/confidentialite")}>
          {english ? "Privacy policy" : "Politique de confidentialité"}
        </Link>
      </p>
      <p aria-live="polite">
        {state === "saved"
          ? english
            ? "Preferences saved."
            : "Préférences enregistrées."
          : state === "unsubscribed"
            ? english
              ? "You have been unsubscribed."
              : "Votre désabonnement est confirmé."
            : state === "error"
              ? english
                ? "This link is invalid or the service is unavailable."
                : "Ce lien est invalide ou le service est indisponible."
              : ""}
      </p>
    </form>
  );
}

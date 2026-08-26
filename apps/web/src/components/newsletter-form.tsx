"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { localizePath, type Locale } from "@/lib/content";
import { TurnstileField } from "./turnstile";

const topics = {
  fr: [
    ["alerts", "Alertes pharmaceutiques"],
    ["research", "Recherche et plantes médicinales"],
    ["industry", "Industrie et réglementation"],
    ["training", "Formations et événements"],
    ["philanthropy", "Philanthropie et jeunesse"],
    ["institutional", "Actualités institutionnelles"],
  ],
  en: [
    ["alerts", "Pharmaceutical alerts"],
    ["research", "Research and medicinal plants"],
    ["industry", "Industry and regulation"],
    ["training", "Training and events"],
    ["philanthropy", "Philanthropy and youth"],
    ["institutional", "Institutional news"],
  ],
} as const;

export function NewsletterForm({
  locale,
  compact = false,
}: {
  locale: Locale;
  compact?: boolean;
}) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    const form = new FormData(event.currentTarget);
    const payload = {
      locale,
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      email: form.get("email"),
      country: form.get("country"),
      profile: form.get("profile"),
      interests: form.getAll("interests"),
      consent: form.get("consent") === "on",
      website: form.get("website"),
      turnstileToken: form.get("turnstileToken") || undefined,
    };
    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        message?: string;
        error?: string;
      };
      setMessage(result.message ?? result.error ?? "");
      setState(response.ok ? "success" : "error");
      if (response.ok) event.currentTarget.reset();
    } catch {
      setMessage(
        locale === "fr"
          ? "Le service est momentanément indisponible."
          : "The service is temporarily unavailable.",
      );
      setState("error");
    }
  }
  if (state === "success")
    return (
      <div className="form-success" role="status">
        <CheckCircle2 aria-hidden="true" />
        <strong>
          {locale === "fr" ? "Vérifiez votre boîte email" : "Check your inbox"}
        </strong>
        <p>{message}</p>
      </div>
    );
  return (
    <form
      className={`newsletter-form${compact ? " newsletter-form--compact" : ""}`}
      onSubmit={submit}
      noValidate
    >
      <div className="form-grid">
        <label>
          <span>{locale === "fr" ? "Prénom" : "First name"}</span>
          <input
            name="firstName"
            required
            minLength={2}
            autoComplete="given-name"
          />
        </label>
        <label>
          <span>
            {locale === "fr" ? "Nom (facultatif)" : "Last name (optional)"}
          </span>
          <input name="lastName" autoComplete="family-name" />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label>
          <span>{locale === "fr" ? "Pays" : "Country"}</span>
          <input name="country" required autoComplete="country-name" />
        </label>
        <label className="form-grid__wide">
          <span>
            {locale === "fr" ? "Profil professionnel" : "Professional profile"}
          </span>
          <select name="profile" required defaultValue="">
            <option value="" disabled>
              {locale === "fr" ? "Sélectionner" : "Select"}
            </option>
            <option>
              {locale === "fr"
                ? "Professionnel de santé"
                : "Health professional"}
            </option>
            <option>{locale === "fr" ? "Chercheur" : "Researcher"}</option>
            <option>
              {locale === "fr" ? "Institution publique" : "Public institution"}
            </option>
            <option>{locale === "fr" ? "Industrie" : "Industry"}</option>
            <option>
              {locale === "fr" ? "Société civile" : "Civil society"}
            </option>
          </select>
        </label>
      </div>
      {!compact && (
        <fieldset>
          <legend>{locale === "fr" ? "Centres d’intérêt" : "Interests"}</legend>
          <div className="topic-grid">
            {topics[locale].map(([value, label]) => (
              <label className="check-option" key={value}>
                <input type="checkbox" name="interests" value={value} />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}
      {compact && (
        <input type="hidden" name="interests" value="institutional" />
      )}
      <p className="form-privacy-note">
        {locale === "fr"
          ? "L’adresse est utilisée par Resend pour envoyer la confirmation et les thèmes sélectionnés. L’inscription n’est activée qu’après confirmation par e-mail."
          : "The address is used through Resend to send confirmation and selected topics. Subscription is only activated after email confirmation."}{" "}
        <Link href={localizePath(locale, "/confidentialite")}>
          {locale === "fr" ? "Politique de confidentialité" : "Privacy policy"}
        </Link>
      </p>
      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>
          {locale === "fr"
            ? "J’accepte de recevoir les communications sélectionnées et je peux me désabonner à tout moment."
            : "I agree to receive the selected communications and can unsubscribe at any time."}
        </span>
      </label>
      <label className="honeypot" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <TurnstileField />
      {state === "error" && (
        <p className="form-error" role="alert">
          {message}
        </p>
      )}
      <button
        className="button button--light"
        disabled={state === "loading"}
        type="submit"
      >
        {state === "loading" && (
          <LoaderCircle className="spin" aria-hidden="true" size={18} />
        )}
        {locale === "fr" ? "Demander l’inscription" : "Request subscription"}
      </button>
    </form>
  );
}

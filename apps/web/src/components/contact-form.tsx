"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { localizePath, type Locale } from "@/lib/content";
import { TurnstileField } from "./turnstile";

export function ContactForm({
  locale,
  type = "contact",
}: {
  locale: Locale;
  type?: string;
}) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch(`/api/forms/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          type,
          locale,
          consent: form.get("consent") === "on",
        }),
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
          {locale === "fr" ? "Demande transmise" : "Request sent"}
        </strong>
        <p>{message}</p>
      </div>
    );
  return (
    <form className="contact-form" onSubmit={submit} noValidate>
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
          <span>{locale === "fr" ? "Nom" : "Last name"}</span>
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
            {locale === "fr"
              ? "Organisation (facultatif)"
              : "Organisation (optional)"}
          </span>
          <input name="organization" autoComplete="organization" />
        </label>
        <label className="form-grid__wide">
          <span>{locale === "fr" ? "Votre demande" : "Your request"}</span>
          <textarea name="message" required minLength={20} rows={7} />
        </label>
      </div>
      <aside
        className="form-privacy-note"
        aria-label={locale === "fr" ? "Confidentialité" : "Privacy"}
      >
        <p>
          {locale === "fr"
            ? "Les informations transmises sont utilisées uniquement pour traiter votre demande."
            : "The information submitted is used only to process your request."}{" "}
          <Link href={localizePath(locale, "/confidentialite")}>
            {locale === "fr"
              ? "Consultez notre Politique de confidentialité."
              : "Read our Privacy policy."}
          </Link>
        </p>
        <p>
          <strong>{locale === "fr" ? "Important :" : "Important:"}</strong>{" "}
          {locale === "fr"
            ? "ne transmettez aucune donnée de santé, information sur un patient, médicament utilisé, symptôme, effet indésirable ou urgence. Ce formulaire ne fournit pas d’avis médical et n’est pas un canal de pharmacovigilance."
            : "do not submit health data, patient information, medicines used, symptoms, adverse events or emergencies. This form does not provide medical advice and is not a pharmacovigilance channel."}
        </p>
      </aside>
      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>
          {locale === "fr"
            ? "Je confirme avoir lu cette information avant d’envoyer ma demande."
            : "I confirm that I have read this information before sending my request."}
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
        className="button button--primary"
        disabled={state === "loading"}
        type="submit"
      >
        {state === "loading" && (
          <LoaderCircle className="spin" aria-hidden="true" size={18} />
        )}
        {locale === "fr" ? "Envoyer la demande" : "Send request"}
      </button>
    </form>
  );
}

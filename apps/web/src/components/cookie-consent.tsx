"use client";

import Link from "next/link";
import { Cookie, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { localizePath, type Locale } from "@/lib/content";

const CONSENT_COOKIE = "iam_cookie_consent";
const CONSENT_STORAGE = "iam-cookie-consent-v1";
const CONSENT_EVENT = "iam:cookie-consent-change";
const SETTINGS_EVENT = "iam:open-cookie-settings";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

type ConsentPreferences = {
  necessary: true;
  audience: boolean;
  externalMedia: boolean;
  marketing: boolean;
  version: 1;
  savedAt: string;
};

type ConsentView = "loading" | "banner" | "settings" | "hidden";

const defaultPreferences = (): ConsentPreferences => ({
  necessary: true,
  audience: false,
  externalMedia: false,
  marketing: false,
  version: 1,
  savedAt: "",
});

function isConsentPreferences(value: unknown): value is ConsentPreferences {
  if (!value || typeof value !== "object") return false;
  const consent = value as Partial<ConsentPreferences>;
  return (
    consent.necessary === true &&
    typeof consent.audience === "boolean" &&
    typeof consent.externalMedia === "boolean" &&
    typeof consent.marketing === "boolean" &&
    consent.version === 1 &&
    typeof consent.savedAt === "string"
  );
}

function readConsent(): ConsentPreferences | null {
  const stored = window.localStorage.getItem(CONSENT_STORAGE);
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${CONSENT_COOKIE}=`))
    ?.slice(CONSENT_COOKIE.length + 1);

  for (const candidate of [
    stored,
    cookie ? decodeURIComponent(cookie) : null,
  ]) {
    if (!candidate) continue;
    try {
      const parsed: unknown = JSON.parse(candidate);
      if (isConsentPreferences(parsed)) return parsed;
    } catch {
      continue;
    }
  }
  return null;
}

function applyConsent(consent: ConsentPreferences) {
  document.documentElement.dataset.cookieAudience = consent.audience
    ? "granted"
    : "denied";
  document.documentElement.dataset.cookieExternalMedia = consent.externalMedia
    ? "granted"
    : "denied";
  document.documentElement.dataset.cookieMarketing = consent.marketing
    ? "granted"
    : "denied";
}

function storeConsent(consent: ConsentPreferences) {
  const serialized = JSON.stringify(consent);
  window.localStorage.setItem(CONSENT_STORAGE, serialized);
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(serialized)}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
  applyConsent(consent);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
}

const labels = {
  fr: {
    title: "Votre vie privée, votre choix",
    description:
      "Nous utilisons uniquement les technologies nécessaires au fonctionnement du site. Vous pouvez aussi autoriser séparément les futurs services de mesure d’audience, les contenus externes et les communications personnalisées.",
    policy: "Consulter la politique de cookies",
    accept: "Tout accepter",
    reject: "Tout refuser",
    customise: "Personnaliser",
    settingsTitle: "Personnaliser mes cookies",
    settingsIntro:
      "Choisissez les catégories que vous autorisez. Les services optionnels restent bloqués avant votre accord et aucun outil publicitaire ou statistique n’est actuellement actif.",
    close: "Fermer les préférences",
    necessaryTitle: "Strictement nécessaires",
    necessaryText:
      "Sécurité, fonctionnement du site et mémorisation de votre choix. Cette catégorie ne peut pas être désactivée.",
    audienceTitle: "Mesure d’audience",
    audienceText:
      "Autorise une mesure anonyme de la fréquentation si un outil conforme est ajouté ultérieurement.",
    mediaTitle: "Contenus externes",
    mediaText:
      "Autorise le chargement de lecteurs vidéo, cartes ou autres contenus provenant de services tiers.",
    marketingTitle: "Communications personnalisées",
    marketingText:
      "Autorise les technologies de personnalisation ou de campagne si elles sont ajoutées ultérieurement.",
    save: "Enregistrer mes choix",
  },
  en: {
    title: "Your privacy, your choice",
    description:
      "We only use technologies required for the website to operate. You can separately authorise future audience measurement, external content and personalised communication services.",
    policy: "Read the cookie policy",
    accept: "Accept all",
    reject: "Reject all",
    customise: "Customise",
    settingsTitle: "Customise my cookies",
    settingsIntro:
      "Choose the categories you allow. Optional services remain blocked before your consent, and no advertising or analytics tool is currently active.",
    close: "Close preferences",
    necessaryTitle: "Strictly necessary",
    necessaryText:
      "Security, website operation and storage of your choice. This category cannot be disabled.",
    audienceTitle: "Audience measurement",
    audienceText:
      "Allows anonymous traffic measurement if a compliant tool is added in the future.",
    mediaTitle: "External content",
    mediaText:
      "Allows video players, maps or other content supplied by third-party services to load.",
    marketingTitle: "Personalised communications",
    marketingText:
      "Allows personalisation or campaign technologies if they are added in the future.",
    save: "Save my choices",
  },
} as const;

export function CookieConsent({ locale }: { locale: Locale }) {
  const text = labels[locale];
  const [view, setView] = useState<ConsentView>("loading");
  const [hasSavedChoice, setHasSavedChoice] = useState(false);
  const [preferences, setPreferences] =
    useState<ConsentPreferences>(defaultPreferences);

  useEffect(() => {
    const stored = readConsent();
    if (stored) {
      applyConsent(stored);
    }

    const openSettings = () => {
      const current = readConsent();
      setPreferences(current ?? defaultPreferences());
      setHasSavedChoice(Boolean(current));
      setView("settings");
    };

    const handleLink = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a");
      if (!(link instanceof HTMLAnchorElement)) return;
      const destination = new URL(link.href, window.location.href);
      if (!destination.pathname.endsWith("/cookies")) return;
      if (destination.hash !== "#gestion") return;
      event.preventDefault();
      openSettings();
    };

    window.addEventListener(SETTINGS_EVENT, openSettings);
    document.addEventListener("click", handleLink);

    const animationFrame = window.requestAnimationFrame(() => {
      if (stored) {
        setPreferences(stored);
        setHasSavedChoice(true);
      }
      if (
        window.location.pathname.endsWith("/cookies") &&
        window.location.hash === "#gestion"
      ) {
        openSettings();
      } else {
        setView(stored ? "hidden" : "banner");
      }
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener(SETTINGS_EVENT, openSettings);
      document.removeEventListener("click", handleLink);
    };
  }, []);

  useEffect(() => {
    if (view !== "settings") return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setView(hasSavedChoice ? "hidden" : "banner");
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [hasSavedChoice, view]);

  const save = (next: ConsentPreferences) => {
    const completed = { ...next, savedAt: new Date().toISOString() };
    storeConsent(completed);
    setPreferences(completed);
    setHasSavedChoice(true);
    setView("hidden");
  };

  const acceptAll = () =>
    save({
      ...defaultPreferences(),
      audience: true,
      externalMedia: true,
      marketing: true,
    });

  const rejectAll = () => save(defaultPreferences());

  if (view === "loading" || view === "hidden") return null;

  return (
    <>
      {view === "banner" ? (
        <section
          className="cookie-consent"
          aria-labelledby="cookie-consent-title"
        >
          <div className="cookie-consent__icon" aria-hidden="true">
            <Cookie />
          </div>
          <div className="cookie-consent__copy">
            <h2 id="cookie-consent-title">{text.title}</h2>
            <p>{text.description}</p>
            <Link href={localizePath(locale, "/cookies")} prefetch={false}>
              {text.policy}
            </Link>
          </div>
          <div className="cookie-consent__actions">
            <button
              className="cookie-button cookie-button--primary"
              type="button"
              onClick={acceptAll}
            >
              {text.accept}
            </button>
            <button className="cookie-button" type="button" onClick={rejectAll}>
              {text.reject}
            </button>
            <button
              className="cookie-button cookie-button--text"
              type="button"
              onClick={() => setView("settings")}
            >
              {text.customise}
            </button>
          </div>
        </section>
      ) : null}

      {view === "settings" ? (
        <div className="cookie-settings-backdrop">
          <section
            className="cookie-settings"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-title"
            aria-describedby="cookie-settings-description"
          >
            <header className="cookie-settings__header">
              <div>
                <span className="cookie-settings__eyebrow">
                  <ShieldCheck aria-hidden="true" /> IAM
                </span>
                <h2 id="cookie-settings-title">{text.settingsTitle}</h2>
              </div>
              <button
                className="cookie-settings__close"
                type="button"
                aria-label={text.close}
                onClick={() => setView(hasSavedChoice ? "hidden" : "banner")}
              >
                <X aria-hidden="true" />
              </button>
            </header>
            <p
              className="cookie-settings__intro"
              id="cookie-settings-description"
            >
              {text.settingsIntro}
            </p>

            <div className="cookie-settings__choices">
              <label className="cookie-choice cookie-choice--locked">
                <span>
                  <strong>{text.necessaryTitle}</strong>
                  <small>{text.necessaryText}</small>
                </span>
                <input type="checkbox" checked disabled readOnly />
              </label>
              <label className="cookie-choice">
                <span>
                  <strong>{text.audienceTitle}</strong>
                  <small>{text.audienceText}</small>
                </span>
                <input
                  type="checkbox"
                  checked={preferences.audience}
                  onChange={(event) =>
                    setPreferences((current) => ({
                      ...current,
                      audience: event.target.checked,
                    }))
                  }
                />
              </label>
              <label className="cookie-choice">
                <span>
                  <strong>{text.mediaTitle}</strong>
                  <small>{text.mediaText}</small>
                </span>
                <input
                  type="checkbox"
                  checked={preferences.externalMedia}
                  onChange={(event) =>
                    setPreferences((current) => ({
                      ...current,
                      externalMedia: event.target.checked,
                    }))
                  }
                />
              </label>
              <label className="cookie-choice">
                <span>
                  <strong>{text.marketingTitle}</strong>
                  <small>{text.marketingText}</small>
                </span>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(event) =>
                    setPreferences((current) => ({
                      ...current,
                      marketing: event.target.checked,
                    }))
                  }
                />
              </label>
            </div>

            <footer className="cookie-settings__footer">
              <Link href={localizePath(locale, "/cookies")} prefetch={false}>
                {text.policy}
              </Link>
              <div>
                <button
                  className="cookie-button"
                  type="button"
                  onClick={rejectAll}
                >
                  {text.reject}
                </button>
                <button
                  className="cookie-button cookie-button--primary"
                  type="button"
                  onClick={() => save(preferences)}
                >
                  {text.save}
                </button>
              </div>
            </footer>
          </section>
        </div>
      ) : null}
    </>
  );
}

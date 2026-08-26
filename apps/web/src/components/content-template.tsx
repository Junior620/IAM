import type { Locale } from "@iam/contracts";
import { EmptyState, VerifiedState } from "./feedback";
import { MedicalDisclaimer } from "./medical-disclaimer";
import { Container } from "./ui";

export type TemplateKind =
  | "institutional"
  | "pillar"
  | "program"
  | "project"
  | "publication"
  | "news"
  | "event"
  | "course"
  | "profile"
  | "partner"
  | "country"
  | "alert"
  | "campaign";
export type TemplateDocument = {
  kind: TemplateKind;
  title: string;
  eyebrow: string;
  summary: string;
  verifiedAt?: string;
  sourceTitle?: string;
  sourceUrl?: string;
  body?: React.ReactNode;
};

function heroVariantForKind(kind: TemplateKind) {
  if (["partner", "campaign"].includes(kind)) return "participate";
  if (["pillar", "program", "project", "country", "alert"].includes(kind)) {
    return "priorities";
  }
  if (["publication", "news", "event", "course"].includes(kind)) {
    return "editorial";
  }
  return "institute";
}

export function ContentTemplate({
  locale,
  document,
}: {
  locale: Locale;
  document: TemplateDocument;
}) {
  const heroVariant = heroVariantForKind(document.kind);
  const safeSourceUrl =
    document.sourceUrl && /^https?:\/\//i.test(document.sourceUrl)
      ? document.sourceUrl
      : undefined;
  const carriesMedicalInformation = [
    "pillar",
    "program",
    "project",
    "publication",
    "news",
    "event",
    "course",
    "alert",
  ].includes(document.kind);

  return (
    <main id="contenu">
      <section
        className={`page-hero page-hero--with-image page-hero--${heroVariant}`}
      >
        <Container>
          <p className="eyebrow">{document.eyebrow}</p>
          <h1>{document.title}</h1>
          <p>{document.summary}</p>
        </Container>
      </section>
      <section className="section">
        <Container className="narrow">
          {carriesMedicalInformation ? (
            <MedicalDisclaimer locale={locale} />
          ) : null}
          {document.verifiedAt && document.sourceTitle ? (
            <VerifiedState>
              {locale === "fr"
                ? `Vérifié le ${document.verifiedAt} · `
                : `Verified on ${document.verifiedAt} · `}
              {safeSourceUrl ? (
                <a href={safeSourceUrl} rel="noreferrer" target="_blank">
                  {document.sourceTitle}
                </a>
              ) : (
                document.sourceTitle
              )}
            </VerifiedState>
          ) : null}
          {document.body ? (
            <div className="editorial-prose">{document.body}</div>
          ) : (
            <EmptyState
              title={
                locale === "fr"
                  ? "Publication sous contrôle éditorial"
                  : "Editorially controlled publishing"
              }
            >
              <p>
                {locale === "fr"
                  ? "Le contenu sera visible après approbation, vérification et ajout des sources requises."
                  : "Content will appear after approval, verification and addition of the required sources."}
              </p>
            </EmptyState>
          )}
        </Container>
      </section>
    </main>
  );
}

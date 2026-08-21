type EmailProps = {
  firstName: string;
  actionUrl: string;
  locale?: "fr" | "en";
};

const palette = { navy: "#0B1830", emerald: "#0F6B5C", warm: "#F7F4EC" };

function Frame({
  preview,
  children,
}: {
  preview: string;
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head />
      <body
        style={{
          margin: 0,
          background: palette.warm,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "none", maxHeight: 0, overflow: "hidden" }}>
          {preview}
        </div>
        <div
          style={{
            margin: "40px auto",
            maxWidth: 620,
            background: "#fff",
            padding: 36,
          }}
        >
          <p
            style={{
              color: palette.emerald,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            IAM
          </p>
          {children}
          <p style={{ color: "#5c6470", fontSize: 12, marginTop: 40 }}>
            Institut Africain du Médicament · Communication institutionnelle
          </p>
        </div>
      </body>
    </html>
  );
}

export function ConfirmationEmail({
  firstName,
  actionUrl,
  locale = "fr",
}: EmailProps) {
  const english = locale === "en";
  return (
    <Frame
      preview={
        english ? "Confirm your subscription" : "Confirmez votre inscription"
      }
    >
      <h1 style={{ color: palette.navy }}>
        {english
          ? `Hello ${firstName}, confirm your subscription`
          : `Bonjour ${firstName}, confirmez votre inscription`}
      </h1>
      <p>
        {english
          ? "One final step is required to receive IAM Pharmaceutical Intelligence."
          : "Une dernière étape est nécessaire pour recevoir IAM Pharmaceutical Intelligence."}
      </p>
      <div style={{ margin: "28px 0" }}>
        <a
          href={actionUrl}
          style={{
            background: palette.emerald,
            color: "#fff",
            padding: "14px 22px",
            borderRadius: 8,
          }}
        >
          {english ? "Confirm my subscription" : "Confirmer mon inscription"}
        </a>
      </div>
    </Frame>
  );
}

export function WelcomeEmail({
  firstName,
  actionUrl,
  locale = "fr",
}: EmailProps) {
  const english = locale === "en";
  return (
    <Frame
      preview={
        english
          ? "Welcome to IAM Pharmaceutical Intelligence"
          : "Bienvenue dans IAM Pharmaceutical Intelligence"
      }
    >
      <h1 style={{ color: palette.navy }}>
        {english ? `Welcome, ${firstName}` : `Bienvenue, ${firstName}`}
      </h1>
      <p>
        {english
          ? "Your subscription is confirmed. You can update your preferences at any time."
          : "Votre inscription est confirmée. Vous pouvez modifier vos préférences à tout moment."}
      </p>
      <a href={actionUrl} style={{ color: palette.emerald }}>
        {english ? "Manage my preferences" : "Gérer mes préférences"}
      </a>
    </Frame>
  );
}

export function InstitutionalEmail({
  title,
  excerpt,
  actionUrl,
  actionLabel,
}: {
  title: string;
  excerpt: string;
  actionUrl: string;
  actionLabel: string;
}) {
  return (
    <Frame preview={title}>
      <h1 style={{ color: palette.navy }}>{title}</h1>
      <p>{excerpt}</p>
      <a
        href={actionUrl}
        style={{
          background: palette.emerald,
          color: "#fff",
          padding: "14px 22px",
          borderRadius: 8,
        }}
      >
        {actionLabel}
      </a>
    </Frame>
  );
}

export function EditorialNewsletterEmail(props: {
  title: string;
  excerpt: string;
  actionUrl: string;
  locale?: "fr" | "en";
}) {
  const english = props.locale === "en";
  return (
    <InstitutionalEmail
      title={props.title}
      excerpt={props.excerpt}
      actionUrl={props.actionUrl}
      actionLabel={english ? "Read the issue" : "Lire le numéro"}
    />
  );
}

export function CriticalAlertEmail(props: {
  title: string;
  excerpt: string;
  actionUrl: string;
  locale?: "fr" | "en";
}) {
  const english = props.locale === "en";
  return (
    <InstitutionalEmail
      title={props.title}
      excerpt={props.excerpt}
      actionUrl={props.actionUrl}
      actionLabel={
        english ? "Read the official alert" : "Consulter l’alerte officielle"
      }
    />
  );
}

export function EventInvitationEmail(props: {
  title: string;
  excerpt: string;
  actionUrl: string;
  locale?: "fr" | "en";
}) {
  const english = props.locale === "en";
  return (
    <InstitutionalEmail
      title={props.title}
      excerpt={props.excerpt}
      actionUrl={props.actionUrl}
      actionLabel={english ? "View the event" : "Voir l’événement"}
    />
  );
}

export function PartnershipCallEmail(props: {
  title: string;
  excerpt: string;
  actionUrl: string;
  locale?: "fr" | "en";
}) {
  const english = props.locale === "en";
  return (
    <InstitutionalEmail
      title={props.title}
      excerpt={props.excerpt}
      actionUrl={props.actionUrl}
      actionLabel={
        english ? "Explore the partnership" : "Explorer le partenariat"
      }
    />
  );
}

export function YouthCampaignEmail(props: {
  title: string;
  excerpt: string;
  actionUrl: string;
  locale?: "fr" | "en";
}) {
  const english = props.locale === "en";
  return (
    <InstitutionalEmail
      title={props.title}
      excerpt={props.excerpt}
      actionUrl={props.actionUrl}
      actionLabel={english ? "Discover the campaign" : "Découvrir la campagne"}
    />
  );
}

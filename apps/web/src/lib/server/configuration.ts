export class ServiceNotConfiguredError extends Error {
  constructor(service: string) {
    super(`${service} is not configured`);
    this.name = "ServiceNotConfiguredError";
  }
}

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  );
}

export function publicError(locale: "fr" | "en", status = 503) {
  return Response.json(
    {
      error:
        locale === "en"
          ? "This service is not configured yet. No information was sent."
          : "Ce service n’est pas encore configuré. Aucune information n’a été envoyée.",
    },
    { status },
  );
}

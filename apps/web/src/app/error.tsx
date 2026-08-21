"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="not-found">
      <p className="eyebrow">IAM</p>
      <h1>Une erreur est survenue.</h1>
      <p>
        Le contenu reste protégé. Vous pouvez réessayer sans perdre de données.
      </p>
      <button className="button button--primary" onClick={reset}>
        Réessayer
      </button>
    </main>
  );
}

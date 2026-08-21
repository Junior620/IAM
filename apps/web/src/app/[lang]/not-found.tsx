import Link from "next/link";

export default function NotFound() {
  return (
    <main id="contenu" className="not-found">
      <p className="eyebrow">404</p>
      <h1>Cette page n’est pas publiée.</h1>
      <p>
        Le contenu demandé est absent, désactivé ou en attente de validation.
      </p>
      <Link className="button button--primary" href="/">
        Revenir à l’accueil
      </Link>
    </main>
  );
}

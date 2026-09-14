# Plateforme internationale de l’Institut Africain du Médicament

Monorepo bilingue prêt à connecter, construit avec Next.js 16, React 19, TypeScript strict, Tailwind CSS 4, Sanity Studio, Resend et React Email. Le français est publié sans préfixe ; l’anglais vit sous `/en`.

La règle produit est volontairement stricte : aucune métrique, présence pays, gouvernance, personne, organisation partenaire ou histoire d’impact non documentée n’est rendue publique. Le site fonctionne sans secret ; les contenus CMS absents sont masqués et les services transactionnels répondent par une erreur explicite sans enregistrer de donnée.

## Démarrage

Prérequis : Node.js 22+, pnpm 10+.

```bash
pnpm install
pnpm dev
```

Le site est disponible sur `http://localhost:3000`. Pour le Studio :

```bash
pnpm dev:studio
```

Copier `.env.example` vers `.env.local` uniquement lorsque des identifiants officiels sont disponibles. Ne jamais utiliser de compte personnel ou d’adresse de démonstration en production.

## Organisation

```text
apps/
  web/       Next.js, routes, SEO, formulaires, recherche, tests E2E
  studio/    Sanity Studio, workflow et schémas éditoriaux
packages/
  contracts/ Types, interfaces et validations Zod partagés
  emails/    Emails React bilingues
docs/        Gouvernance éditoriale, migration et lancement
```

Le proxy Next réécrit les routes françaises publiques vers le segment interne `/fr` et conserve les URL publiques sans préfixe. Les routes anglaises utilisent `/en`. Les canonicals, alternates `hreflang`, sitemap, robots, Open Graph et manifeste sont générés par l’application.

## Commandes de qualité

```bash
pnpm format
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm --filter @iam/web test:e2e:install
pnpm test:e2e
pnpm --filter @iam/web exec lhci autorun
```

Les seuils Lighthouse CI sont 90 en performance, 95 en accessibilité, 95 en bonnes pratiques et 95 en SEO.

Lighthouse CI mesure les accueils FR et EN avec le profil desktop. Les URL de
l’antivirus Kaspersky sont bloquées pendant l’audit afin qu’une injection locale
ne fausse pas les scores de l’application ; le HTTPS reste imposé par la cible
Vercel et la politique CSP de production. Les scénarios Playwright et axe couvrent
séparément les parcours et l’accessibilité aux formats mobiles.

## Services externes

| Service                         | Usage                              | Comportement sans configuration                                                |
| ------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------ |
| Sanity                          | Contenus, Studio, prévisualisation | Contenu éditorial local approuvé uniquement ; données dynamiques invisibles    |
| Resend                          | Formulaires et newsletter          | Réponse `503`, aucune donnée envoyée                                           |
| Upstash Redis                   | Limitation et jetons double opt-in | Service transactionnel indisponible en production                              |
| Cloudflare Turnstile            | Anti-spam                          | Widget absent sans clé ; vérification obligatoire en production lorsqu’activée |
| OpenAI                          | Assistant documentaire optionnel   | Réponses locales IAM, aucune donnée transmise à OpenAI                         |
| Stripe / Paystack / Flutterwave | Paiements futurs                   | Adaptateur désactivé ; CTA vers le formulaire philanthropique                  |

L’Assistant IAM répond à partir d’une base documentaire locale et des contenus Sanity approuvés. Pour activer les réponses générées, définir `OPENAI_API_KEY` et `OPENAI_ASSISTANT_MODEL` dans les variables serveur Vercel. En production, Upstash doit aussi être configuré afin de limiter les requêtes et de maîtriser les coûts. Les appels utilisent l’API Responses avec `store: false`. Ne jamais préfixer la clé avec `NEXT_PUBLIC_`.

## Sanity

Renseigner `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`, `NEXT_PUBLIC_SANITY_PROJECT_ID` et les tokens nécessaires. Puis :

```bash
pnpm --filter @iam/studio schema:extract
pnpm --filter @iam/studio typegen
pnpm --filter @iam/studio build
```

La page `/montreal` est contrôlée par `siteSettings.montrealEnabled`. Désactivée, elle répond `404`, reste absente du sitemap et n’est visible qu’en Draft Mode.

## Déploiement

`apps/web` est compatible Vercel et `apps/studio` se déploie séparément sur Sanity. Pour Vercel, importer le dépôt, sélectionner `apps/web` comme **Root Directory** et conserver l’accès aux packages partagés situés hors de ce dossier. Le changement de domaine, les DNS, le projet Vercel, le projet Sanity et les identifiants marchands restent à créer avec les comptes officiels IAM. Les redirections du sous-domaine Wix doivent aussi être configurées côté Wix ou sur un domaine contrôlé.

Documents clés : [déploiement Vercel](docs/vercel-deployment.md), [guide éditorial](docs/editorial-guide.md), [matrice de migration](docs/migration-matrix.md), [inventaire manquant](docs/missing-content.md), [checklist de lancement](docs/launch-checklist.md) et [phase 2](docs/phase-2.md).

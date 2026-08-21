# Déploiement Vercel

Le site public Next.js se déploie comme un projet Vercel distinct à partir du
monorepo. Le Studio Sanity conserve son propre cycle de déploiement.

## Import du dépôt

1. Dans Vercel, importer `Junior620/IAM` depuis GitHub.
2. Définir **Root Directory** sur `apps/web`.
3. Conserver le preset **Next.js** et les commandes détectées automatiquement.
4. Vérifier que **Include source files outside of the Root Directory in the
   Build Step** est activé afin que `packages/contracts` et `packages/emails`
   soient disponibles.
5. Sélectionner Node.js 22 et `main` comme branche de production.

Le verrou `pnpm-lock.yaml` situé à la racine permet à Vercel de détecter pnpm.
Le fichier `apps/web/vercel.json` fixe uniquement le preset Next.js ; les
commandes d’installation, de build et le répertoire de sortie restent gérés par
l’intégration native Vercel.

## Premier déploiement sans services externes

Le build fonctionne sans secret. Avant la première mise en production, définir
au minimum :

```text
NEXT_PUBLIC_SITE_URL=https://votre-domaine-officiel
DONATIONS_ENABLED=false
```

Sans Sanity, Resend, Redis ou Turnstile, les contenus dynamiques restent masqués
et les formulaires transactionnels échouent proprement. Ne jamais renseigner de
clé personnelle ou de valeur de démonstration en production.

## Variables à activer avec les comptes officiels

Copier les noms depuis `.env.example` dans les environnements Vercel
**Production**, **Preview** et **Development**, selon le périmètre souhaité :

- Sanity : projet, dataset, URL du Studio, jeton de lecture et secret de
  revalidation ;
- Resend : clé API, expéditeur vérifié, webhook, destinataires et Topics ;
- Upstash Redis : URL REST et jeton ;
- Cloudflare Turnstile : clés publique et secrète ;
- paiements : rester désactivés jusqu’à validation juridique et marchande.

Les valeurs publiques `NEXT_PUBLIC_*` sont intégrées au bundle pendant le build.
Toute modification exige donc un nouveau déploiement.

## Domaine et mise en production

1. Ajouter le domaine officiel dans **Project Settings → Domains**.
2. Appliquer les enregistrements DNS fournis par Vercel.
3. Remplacer `NEXT_PUBLIC_SITE_URL` par l’URL canonique en HTTPS et redéployer.
4. Vérifier `/robots.txt`, `/sitemap.xml`, les canonicals et `hreflang`.
5. Tester les formulaires configurés, les redirections Wix et les routes FR/EN.
6. Conserver le domaine temporaire `.vercel.app` uniquement pour la recette.

Chaque push sur `main` déclenchera ensuite un déploiement de production une fois
le dépôt GitHub relié au projet Vercel. Les autres branches produiront des URLs
de prévisualisation.

## Contrôle avant bascule

```bash
pnpm install --frozen-lockfile
pnpm format
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

La checklist complète reste disponible dans `docs/launch-checklist.md`.

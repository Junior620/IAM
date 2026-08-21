# Checklist de lancement

## Institutionnel et juridique

- [ ] Statut, mandat, dénomination et numéro d’enregistrement vérifiés.
- [ ] Chronologie 2008/2009/2017 arbitrée et sourcée.
- [ ] Gouvernance, conseil scientifique et mandats documentés.
- [ ] Distinction IAM/AMA validée juridiquement.
- [ ] Mentions légales, confidentialité, cookies et accessibilité approuvées.
- [ ] Domaine et comptes techniques détenus par l’IAM.

## Contenus

- [ ] Tous les documents publics sont `approved` ; les éléments factuels sont `verified`.
- [ ] Chaque métrique comporte valeur, unité, période, source et date de vérification.
- [ ] Chaque pays public est relié à un contenu vérifié.
- [ ] Chaque partenaire possède accord, rôle, programme et autorisation de marque.
- [ ] Chaque média possède fichier source, crédit, droit et texte alternatif.
- [ ] Consentements valides pour témoignages, ambassadeurs et personnes identifiables.
- [ ] Traductions anglaises relues et correctement reliées.

## Services

- [ ] Projet Sanity, dataset, rôles, sauvegarde et CORS configurés.
- [ ] Draft Mode et webhook de revalidation testés avec secrets officiels.
- [ ] Resend vérifié ; SPF, DKIM et DMARC valides.
- [ ] Six Topics Resend créés et identifiants renseignés.
- [ ] Redis et limite de requêtes testés.
- [ ] Turnstile testé sur tous les formulaires.
- [ ] Adresses de routage et réponses automatiques approuvées.
- [ ] Double opt-in, préférences et désabonnement testés de bout en bout.
- [ ] Paiements laissés désactivés jusqu’à la validation juridique et marchande.

## Technique et qualité

- [ ] `pnpm install --frozen-lockfile`, format, lint, typecheck, tests et build réussissent.
- [ ] Projet Vercel relié à GitHub avec `apps/web` comme Root Directory, Node.js 22 et accès aux packages partagés.
- [ ] `NEXT_PUBLIC_SITE_URL` correspond au domaine HTTPS final dans l’environnement Production.
- [ ] Playwright et axe réussissent en français et anglais.
- [ ] Navigation clavier, focus, menu mobile, formulaires et messages d’erreur testés.
- [ ] Contrôle visuel à 320, 375, 768, 1024 et 1440 px.
- [ ] Lighthouse atteint 90/95/95/95 ou tout écart est documenté.
- [ ] Canonicals, `hreflang`, Open Graph, sitemap et robots vérifiés sur le domaine final.
- [ ] Liens internes, téléchargements et redirections vérifiés.
- [ ] Monitoring d’erreurs, sauvegarde et procédure d’incident définis.

## Bascule

- [ ] Export et sauvegarde finale du site Wix.
- [ ] DNS, domaine Vercel et certificats vérifiés.
- [ ] Redirections configurées sur le domaine source/Wix.
- [ ] Fenêtre de lancement, responsables et plan de retour arrière définis.
- [ ] Test après bascule sur mobile et réseau lent.
- [ ] Montréal reste désactivé sauf décision explicite.

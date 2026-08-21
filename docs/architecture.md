# Architecture et contrats

## Flux de contenu public

Sanity fournit des documents localisés. Les requêtes publiques exigent `editorialStatus == "approved"` et, pour les contenus factuels, `verificationStatus == "verified"`. Les sources, dates de vérification, droits et consentements sont contrôlés dans le Studio. Le rendu serveur masque toute donnée absente.

## Flux transactionnel

- Les formulaires passent par Zod, honeypot, Turnstile et limitation Redis, puis sont routés par Resend.
- Aucune soumission n’est enregistrée dans Sanity.
- La newsletter stocke temporairement la demande dans Redis, envoie un lien unique, puis crée/met à jour le contact Resend après confirmation.
- Un jeton distinct permet de modifier les Topics ou de se désabonner sans exposer l’adresse email dans l’URL.
- Les webhooks Resend sont vérifiés avec leur signature Svix.

## Interfaces partagées

`ContentRepository`, `MailProvider`, `RateLimiter` et `DonationProvider` isolent le frontend des fournisseurs. Les paiements restent implémentés sous forme d’adaptateur explicitement non opérationnel tant que le cadre légal et les comptes ne sont pas validés.

## Sécurité

Les secrets sont exclusivement serveur. Draft Mode exige un secret, les chemins de retour sont validés et les webhooks de revalidation utilisent un jeton Bearer. Les réponses publiques ne divulguent ni configuration interne ni donnée personnelle.

# Guide éditorial et de vérification

## Principe

Le site distingue une promesse institutionnelle, qui peut expliquer une ambition, d’une affirmation factuelle, qui doit être prouvée. Une information n’est jamais rendue crédible par sa seule présence dans l’ancien site.

## Cycle de publication

1. `draft` — rédaction, import historique ou document incomplet.
2. `inReview` — relecture métier, juridique, scientifique et linguistique selon le contenu.
3. `approved` — contenu validé pour publication.
4. `archived` — contenu conservé dans le CMS mais retiré des parcours publics.

Les entités factuelles utilisent aussi `verificationStatus` : `draft`, `verified` ou `archived`. Une métrique, un pays, un partenaire, un profil, une alerte ou une histoire n’est publiable qu’avec `editorialStatus=approved`, `verificationStatus=verified`, une date de vérification et au moins une source normalisée.

## Source normalisée

Chaque source comporte un titre, une URL HTTPS, un éditeur, une date de publication si connue et une date de consultation. Une capture isolée ou un lien vers une page d’accueil ne suffit pas pour prouver un chiffre. Pour les agréments, statuts, nominations et partenariats, joindre aussi le document officiel au dossier interne de validation.

## Localisation

Chaque langue est un document distinct avec son propre slug et une référence `translationOf`. Une traduction n’est proposée dans le sélecteur que lorsqu’elle existe et a franchi le même workflow. Ne jamais publier une traduction automatique non relue comme version officielle.

## Chiffres, personnes, partenaires et pays

- Indiquer la période, l’unité, le périmètre et la source de chaque métrique.
- Ne pas agréger des chiffres issus de périodes ou périmètres différents.
- Vérifier la fonction, l’orthographe, le mandat et le consentement avant de publier un profil.
- Relier chaque partenaire au programme, à la nature de la contribution et à une preuve de l’accord.
- N’activer un pays sur la carte qu’en présence d’un programme ou projet vérifié.

## Médias et témoignages

Tout média exige : fichier source, crédit, détenteur des droits, périmètre d’utilisation, date d’expiration éventuelle et texte alternatif. Une personne identifiable exige un consentement valide. Les récits de bénéficiaires ne contiennent aucune donnée médicale inutile et peuvent être anonymisés.

## Alertes pharmaceutiques

Une alerte cite l’autorité compétente, la date et la source officielle. Le site transmet une information institutionnelle : il ne pose aucun diagnostic et ne donne aucun conseil médical individualisé. En cas d’urgence, orienter vers les services d’urgence et les autorités sanitaires du pays concerné.

## Vocabulaire

- Distinguer l’Institut Africain du Médicament (IAM) de l’Agence africaine du médicament (AMA).
- Employer « médicament falsifié » et « produit médical de qualité inférieure » avec précision.
- Réserver « impact » à un résultat mesuré ; utiliser « activité » ou « ambition » autrement.
- Ne pas qualifier un cours de « certifiant » sans cadre de certification validé.

## Contrôle avant approbation

Le relecteur vérifie exactitude, sources, droits, consentements, liens, langue, résumé SEO, date de vérification et absence de données personnelles. Les actions de validation du schéma Sanity bloquent les contenus incomplets ; le contrôle humain reste obligatoire.

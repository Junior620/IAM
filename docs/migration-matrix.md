# Matrice détaillée de migration

| Source historique      | Destination                                | Statut initial                | Transformation                                                                   | Conditions de publication                                |
| ---------------------- | ------------------------------------------ | ----------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Accueil                | `/`                                        | Réécrit                       | Nouvelle proposition de valeur, huit piliers, architecture de preuve et services | Aucun chiffre, partenaire ou pays sans source            |
| À propos               | `/institut/a-propos`                       | Structure prête               | Histoire, statut, mandat, mission et distinction IAM/AMA                         | Documents juridiques et chronologie validée              |
| Notre méthodologie     | `/institut/notre-approche`                 | Structure prête               | Quatre phases historiques à réviser dans un modèle de méthode                    | Terminologie et propriétaires de méthode validés         |
| Nos services           | `/institut/nos-services` et `/priorites/*` | Restructuré                   | Séparation des missions, expertises, programmes et prestations                   | Programmes réels reliés à leurs preuves                  |
| Nos formations         | `/academie`                                | Catalogue vide contrôlé       | Modèles cours, formateur, dates et inscription                                   | Seules les sessions effectivement ouvertes sont visibles |
| Galerie                | `/actualites-medias/galerie`               | Structure prête               | Médias reliés à événement, crédit, droit et consentement                         | Droits et textes alternatifs complets                    |
| Contact                | `/contact`                                 | Implémenté, connexion requise | Formulaire validé, consentement, anti-spam, limitation et routage                | Adresses officielles, Resend, Redis et Turnstile         |
| Fondateur              | `/institut/gouvernance`                    | Brouillon CMS                 | Dépersonnalisation du récit et fiche documentée                                  | Nomination, mandat, biographie et portrait autorisé      |
| Équipe                 | `/institut/equipe`                         | Brouillon CMS                 | Profils structurés et triés par rôle                                             | Fonction, consentement et source vérifiés                |
| Partenaires            | `/partenariats`                            | Aucun logo public             | Fiche partenariat et contribution par programme                                  | Accord, marque autorisée et résultats vérifiés           |
| Actualités historiques | `/actualites-medias/*`                     | À inventorier                 | Migration avec auteur, date, catégorie et source                                 | Pertinence, exactitude et droits médias                  |
| Appels à projets       | `/programmes/appels-a-projets/*`           | Modèle CMS                    | Dates, éligibilité, documents et contact                                         | Appel officiellement ouvert                              |
| Alertes                | `/alertes/*`                               | Modèle CMS                    | Types spécifiques, urgence, autorité et source                                   | Validation réglementaire et date de fin                  |

## Redirections applicatives

| Ancienne route      | Nouvelle route               | Code |
| ------------------- | ---------------------------- | ---- |
| `/a-propos-de-nous` | `/institut/a-propos`         | 308  |
| `/à-propos-de-nous` | `/institut/a-propos`         | 308  |
| `/nos-services`     | `/institut/nos-services`     | 308  |
| `/nos-formations`   | `/academie`                  | 308  |
| `/galerie`          | `/actualites-medias/galerie` | 308  |
| `/contact-5`        | `/contact`                   | 308  |

Les variantes supplémentaires relevées dans les statistiques Wix doivent être ajoutées au type `redirect` puis répliquées dans la configuration Next au moment de la bascule. Une application Next déployée sur un nouveau domaine ne peut pas imposer une redirection depuis l’ancien sous-domaine Wix : celle-ci nécessite une modification Wix ou la maîtrise du domaine source.

## Procédure d’import

1. Exporter pages, médias et URL Wix sans publier.
2. Dédupliquer et classer chaque élément : conserver, réécrire, archiver ou supprimer.
3. Créer les documents français en `draft`, avec marqueur interne « Document requis » si nécessaire.
4. Ajouter sources, droits, consentements et date de vérification.
5. Faire valider le français, puis créer la traduction anglaise reliée.
6. Tester la nouvelle route et sa redirection avant le changement DNS.

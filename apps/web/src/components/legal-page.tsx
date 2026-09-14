import Link from "next/link";
import {
  Accessibility,
  Cookie as CookieIcon,
  FileCheck2,
  Scale,
  ShieldCheck,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/lib/content";
import { localizePath } from "@/lib/content";
import { Container } from "./ui";

export const legalPagePaths = [
  "/mentions-legales",
  "/confidentialite",
  "/cookies",
  "/conditions-utilisation",
  "/avertissement-medical",
  "/accessibilite",
] as const;

export type LegalPagePath = (typeof legalPagePaths)[number];

type LegalLink = {
  label: string;
  href: string;
};

type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  links?: LegalLink[];
  notice?: string;
};

type LegalDocument = {
  eyebrow: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  updated: string;
  sections: LegalSection[];
};

const incompleteFr = "[INFORMATION À COMPLÉTER PAR L’IAM]";
const incompleteEn = "[INFORMATION TO BE COMPLETED BY IAM]";

const documents: Record<LegalPagePath, Record<Locale, LegalDocument>> = {
  "/mentions-legales": {
    fr: {
      eyebrow: "Informations légales",
      title: "Mentions légales",
      summary:
        "Identification de l’éditeur, informations d’hébergement et règles applicables à l’utilisation des contenus du site.",
      icon: Scale,
      updated: "26 août 2026",
      sections: [
        {
          id: "editeur",
          title: "Éditeur du site",
          paragraphs: [
            "Le présent site est édité par l’Institut Africain du Médicament (IAM), établi à Bonamoussadi, Bloc 24, en face de la Perception, Douala, Cameroun, BP 5426 Douala.",
          ],
          bullets: [
            "Forme juridique et statut exact : " + incompleteFr,
            "Immatriculation : RC DLA / 2017 / B / 71",
            "Numéro contribuable : M011712585175S",
            "Téléphones : +237 696 21 68 09 et +237 233 47 10 65",
            "Courriels : institutafricaindumedicament@gmail.com et iamqualite@gmail.com",
            "Propriétaire juridique du site : " + incompleteFr,
          ],
        },
        {
          id: "publication",
          title: "Direction de la publication",
          paragraphs: [
            "Directeur ou directrice de la publication : " + incompleteFr,
            "Responsable éditorial et coordonnées professionnelles : " +
              incompleteFr,
          ],
          notice:
            "Ces informations doivent être confirmées par l’IAM avant toute validation juridique de cette page.",
        },
        {
          id: "hebergement",
          title: "Hébergement et exploitation technique",
          paragraphs: [
            "Le projet est configuré pour un déploiement sur la plateforme Vercel. L’entité contractuelle exacte, son adresse, la région d’hébergement effectivement choisie et le titulaire du compte doivent être confirmés.",
          ],
          bullets: [
            "Fournisseur technique identifié : Vercel",
            "Entité contractuelle et adresse de l’hébergeur : " + incompleteFr,
            "Région d’hébergement et de traitement : " + incompleteFr,
          ],
          links: [
            {
              label: "Informations légales de Vercel",
              href: "https://vercel.com/legal",
            },
          ],
        },
        {
          id: "propriete",
          title: "Propriété intellectuelle et crédits",
          paragraphs: [
            "Les textes, logos, photographies, documents, marques et publications restent protégés selon les droits de leurs titulaires respectifs. Leur présence sur ce site ne transfère aucun droit au visiteur et ne permet pas d’en déduire que l’IAM en est propriétaire.",
            "Toute reproduction, adaptation ou diffusion doit reposer sur une autorisation ou une exception légale applicable. Les crédits, licences et autorisations relatifs à chaque visuel ou contenu partenaire doivent être documentés dans le système éditorial.",
          ],
          bullets: [
            "Titularité consolidée des textes, du logo et des photographies : " +
              incompleteFr,
            "Crédits et licences manquants pour les médias historiques : " +
              incompleteFr,
          ],
        },
        {
          id: "responsabilite",
          title: "Responsabilité et liens externes",
          paragraphs: [
            "L’IAM recherche l’exactitude et la mise à jour des informations publiées, sans garantir l’absence absolue d’erreur ni la disponibilité continue du site. Les contenus externes restent sous la responsabilité de leurs éditeurs.",
            "Les informations médicales et pharmaceutiques sont soumises à l’avertissement médical du site.",
          ],
          links: [
            {
              label: "Lire l’avertissement médical",
              href: "/avertissement-medical",
            },
          ],
        },
        {
          id: "droit",
          title: "Droit applicable et juridiction",
          paragraphs: [
            "Le pays d’établissement identifié est le Cameroun. La détermination précise du droit applicable et de la juridiction compétente doit tenir compte de la nature de l’organisation, des services proposés et des règles impératives applicables aux visiteurs concernés.",
            "Clause de droit applicable et juridiction compétente : " +
              incompleteFr,
          ],
        },
        {
          id: "distinction",
          title: "Distinction institutionnelle",
          paragraphs: [
            "L’Institut Africain du Médicament (IAM) est présenté sur ce site comme une organisation distincte de l’Agence africaine du médicament (AMA). Aucun lien institutionnel avec l’AMA ne doit être présumé sans source officielle.",
          ],
        },
      ],
    },
    en: {
      eyebrow: "Legal information",
      title: "Legal notice",
      summary:
        "Publisher identification, hosting information and rules governing the use of website content.",
      icon: Scale,
      updated: "26 August 2026",
      sections: [
        {
          id: "publisher",
          title: "Website publisher",
          paragraphs: [
            "This website is published by the African Institute of Medicine (IAM), located in Bonamoussadi, Block 24, opposite the Perception office, Douala, Cameroon, P.O. Box 5426 Douala.",
          ],
          bullets: [
            "Exact legal form and status: " + incompleteEn,
            "Registration: RC DLA / 2017 / B / 71",
            "Taxpayer number: M011712585175S",
            "Telephone: +237 696 21 68 09 and +237 233 47 10 65",
            "Email: institutafricaindumedicament@gmail.com and iamqualite@gmail.com",
            "Legal owner of the website: " + incompleteEn,
          ],
        },
        {
          id: "publication",
          title: "Publication management",
          paragraphs: [
            "Publication director: " + incompleteEn,
            "Editorial lead and professional contact details: " + incompleteEn,
          ],
          notice:
            "IAM must confirm this information before this page receives legal approval.",
        },
        {
          id: "hosting",
          title: "Hosting and technical operation",
          paragraphs: [
            "The project is configured for deployment on Vercel. The exact contracting entity, its address, the hosting region effectively selected and the account holder must be confirmed.",
          ],
          bullets: [
            "Identified technical provider: Vercel",
            "Contracting entity and hosting address: " + incompleteEn,
            "Hosting and processing region: " + incompleteEn,
          ],
          links: [
            {
              label: "Vercel legal information",
              href: "https://vercel.com/legal",
            },
          ],
        },
        {
          id: "intellectual-property",
          title: "Intellectual property and credits",
          paragraphs: [
            "Texts, logos, photographs, documents, trademarks and publications remain protected under the rights of their respective owners. Their presence on this website does not transfer any right to a visitor and does not establish that IAM owns them.",
            "Any reproduction, adaptation or distribution must rely on permission or an applicable legal exception. Credits, licences and permissions for each visual or partner contribution must be documented in the editorial system.",
          ],
          bullets: [
            "Consolidated ownership of texts, logo and photographs: " +
              incompleteEn,
            "Missing credits and licences for historical media: " +
              incompleteEn,
          ],
        },
        {
          id: "liability",
          title: "Liability and external links",
          paragraphs: [
            "IAM seeks to publish accurate and current information but cannot guarantee that every item is error-free or that the website will remain continuously available. External content remains the responsibility of its publisher.",
            "Medical and pharmaceutical information is subject to the website’s medical disclaimer.",
          ],
          links: [
            {
              label: "Read the medical disclaimer",
              href: "/avertissement-medical",
            },
          ],
        },
        {
          id: "law",
          title: "Applicable law and jurisdiction",
          paragraphs: [
            "The identified country of establishment is Cameroon. The applicable law and competent courts must be determined in light of IAM’s legal form, the services offered and mandatory rules protecting the people concerned.",
            "Applicable law and jurisdiction clause: " + incompleteEn,
          ],
        },
        {
          id: "distinction",
          title: "Institutional distinction",
          paragraphs: [
            "The African Institute of Medicine (IAM) is presented on this website as an organisation distinct from the African Medicines Agency (AMA). No institutional relationship with the AMA should be inferred without an official source.",
          ],
        },
      ],
    },
  },
  "/confidentialite": {
    fr: {
      eyebrow: "Protection des données",
      title: "Politique de confidentialité",
      summary:
        "Une information transparente sur les données traitées par le site, leurs finalités, leurs destinataires et vos droits.",
      icon: ShieldCheck,
      updated: "4 septembre 2026",
      sections: [
        {
          id: "portee",
          title: "Portée et responsable du traitement",
          paragraphs: [
            "Cette politique couvre le site public de l’Institut Africain du Médicament (IAM), ses formulaires de contact, sa newsletter et ses interfaces éditoriales publiques.",
            "Le responsable du traitement est l’entité juridique exploitant l’IAM. Sa forme juridique exacte et l’identité de son représentant doivent être confirmées : " +
              incompleteFr,
          ],
          bullets: [
            "Contact général : institutafricaindumedicament@gmail.com",
            "Contact dédié à la protection des données ou DPO, s’il existe : " +
              incompleteFr,
          ],
        },
        {
          id: "donnees",
          title: "Données effectivement traitées",
          bullets: [
            "Formulaires : prénom, nom facultatif, adresse e-mail, pays, organisation facultative, type de demande et contenu du message.",
            "Newsletter : prénom, nom facultatif, adresse e-mail, pays, profil professionnel, langue et thèmes choisis.",
            "Sécurité : adresse IP ou empreinte pseudonymisée, résultat du contrôle anti-robot et données techniques minimales nécessaires à la prévention des abus.",
            "Navigation : journaux techniques susceptibles d’être produits par l’hébergeur ; aucun outil d’analytics ou pixel marketing n’a été détecté dans le code audité.",
            "Recherche interne : les mots saisis peuvent apparaître dans l’URL et les journaux techniques ; n’y saisissez aucune donnée personnelle ou médicale.",
            "Assistant IAM : langue, question et maximum de huit messages récents transmis volontairement. La conversation n’est pas enregistrée dans une base de données par le site.",
          ],
        },
        {
          id: "sante",
          title: "Données de santé et données sensibles",
          paragraphs: [
            "Les formulaires publics et l’Assistant IAM ne sont pas conçus pour recueillir des symptômes, diagnostics, traitements, médicaments utilisés, résultats médicaux, données génétiques, biométriques ou identifiants de patients.",
            "Ne transmettez aucune donnée de santé, information sur un effet indésirable, donnée de patient ni situation urgente par ces interfaces. L’assistant bloque localement les demandes médicales personnelles identifiables avant tout appel à un fournisseur d’intelligence artificielle.",
          ],
          notice:
            "Ce site ne met actuellement à disposition aucun parcours de pharmacovigilance et ne doit pas être utilisé pour un signalement médical urgent.",
        },
        {
          id: "finalites",
          title: "Finalités et fondements",
          bullets: [
            "Répondre aux demandes et assurer leur suivi : mesures précontractuelles, mission institutionnelle ou intérêt légitime selon le contexte. Cette qualification juridique reste à valider.",
            "Envoyer la newsletter sélectionnée : consentement explicite, confirmé par double opt-in et retirable à tout moment.",
            "Répondre aux questions documentaires sur l’IAM et orienter vers les contenus du site : action volontaire du visiteur et intérêt légitime lié à l’information institutionnelle, sous réserve de validation juridique.",
            "Sécuriser le site, prévenir le spam et limiter les abus : intérêt légitime et sécurité du service, sous réserve du droit applicable.",
            "Respecter les obligations légales ou réglementaires applicables à l’IAM.",
          ],
        },
        {
          id: "destinataires",
          title: "Destinataires et prestataires",
          paragraphs: [
            "L’accès doit être limité aux équipes IAM habilitées et aux prestataires nécessaires à l’exploitation. Aucun usage publicitaire des messages ou des données de santé n’est prévu.",
          ],
          bullets: [
            "Vercel : hébergement et journaux techniques.",
            "Resend : acheminement des messages, confirmations et gestion des contacts newsletter.",
            "Upstash : limitation de débit, données temporaires d’inscription et jetons de préférences.",
            "Cloudflare Turnstile : contrôle anti-robot sur les formulaires.",
            "Sanity : contenu éditorial public et médias ; les messages des formulaires ne sont pas stockés dans Sanity.",
            "OpenAI : génération optionnelle des réponses de l’Assistant IAM uniquement lorsque le service est configuré. Sans configuration, l’assistant utilise exclusivement sa base documentaire locale.",
          ],
          links: [
            {
              label: "Vercel, Data Processing Addendum",
              href: "https://vercel.com/legal/dpa",
            },
            {
              label: "Resend, Data Processing Addendum",
              href: "https://resend.com/legal/dpa",
            },
            {
              label: "Sanity, Data Processing Addendum",
              href: "https://www.sanity.io/legal/dpa",
            },
            {
              label: "Upstash, Data Processing Addendum",
              href: "https://upstash.com/trust/dpa.pdf",
            },
            {
              label: "Documentation Cloudflare Turnstile",
              href: "https://developers.cloudflare.com/turnstile/",
            },
            {
              label: "OpenAI, contrôles et conservation des données API",
              href: "https://developers.openai.com/api/docs/guides/your-data",
            },
          ],
        },
        {
          id: "conservation",
          title: "Conservation",
          bullets: [
            "Inscription newsletter non confirmée : 24 heures dans Upstash.",
            "Jeton de gestion des préférences : 180 jours dans Upstash.",
            "Contact newsletter confirmé : jusqu’au désabonnement ou à la suppression nécessaire, sous réserve de la politique de conservation à formaliser.",
            "Conversation avec l’Assistant IAM : conservée uniquement dans la mémoire de la page ouverte et effacée au rechargement. Lorsque OpenAI est configuré, le paramètre store est désactivé ; les journaux de contrôle des abus du fournisseur peuvent néanmoins être conservés jusqu’à 30 jours par défaut selon sa documentation.",
            "Messages de contact, copies dans les boîtes e-mail et journaux des fournisseurs : durées exactes " +
              incompleteFr,
          ],
          notice:
            "L’IAM doit adopter un registre de conservation précisant les durées, responsables et mécanismes de suppression.",
        },
        {
          id: "transferts",
          title: "Transferts internationaux",
          paragraphs: [
            "Les fournisseurs techniques peuvent traiter des données dans plusieurs pays. L’entité contractuelle, les régions activées, la liste des sous-traitants et les garanties de transfert doivent être vérifiées dans chaque compte fournisseur.",
            "Garanties contractuelles effectivement activées pour l’IAM : " +
              incompleteFr,
          ],
        },
        {
          id: "droits",
          title: "Vos droits",
          paragraphs: [
            "Selon le droit applicable, vous pouvez demander l’accès, la rectification, l’effacement, la limitation, l’opposition et, lorsque les conditions sont remplies, la portabilité. Vous pouvez retirer votre consentement à la newsletter sans remettre en cause les traitements antérieurs.",
            "Pour exercer un droit, écrivez à institutafricaindumedicament@gmail.com en décrivant votre demande. Une preuve d’identité ne doit être demandée qu’en cas de doute raisonnable et de manière proportionnée.",
            "Autorité de protection des données compétente et coordonnées : " +
              incompleteFr,
          ],
        },
        {
          id: "mineurs",
          title: "Protection des mineurs",
          paragraphs: [
            "Les formulaires et la newsletter ne sont pas destinés à collecter directement les données de mineurs. Un mineur ne doit pas transmettre de donnée personnelle ou médicale sans l’intervention d’un représentant légal lorsque celle-ci est requise.",
            "Toute publication représentant un mineur doit être assortie d’une autorisation documentée, limitée et révocable selon le droit applicable.",
          ],
        },
        {
          id: "securite",
          title: "Mesures de sécurité",
          paragraphs: [
            "Le site applique notamment HTTPS en production, validation côté serveur, limitation de débit, champ anti-spam, Turnstile, règles de sécurité du navigateur et séparation des secrets dans des variables d’environnement. Aucune mesure ne garantit un risque nul.",
            "Les incidents doivent faire l’objet d’une procédure interne de détection, qualification, notification et documentation : " +
              incompleteFr,
          ],
        },
        {
          id: "juridictions",
          title: "Cadres juridiques",
          paragraphs: [
            "L’IAM est établi au Cameroun. La loi camerounaise n° 2024/017 du 23 décembre 2024 relative à la protection des données à caractère personnel doit être prise en compte selon son champ d’application.",
            "Le RGPD peut s’appliquer dans certaines situations prévues par son champ territorial, notamment lorsque des personnes situées dans l’Espace économique européen sont ciblées ou suivies. Cette politique ne constitue ni une certification RGPD, ni une certification HIPAA.",
          ],
          links: [
            {
              label: "Texte officiel camerounais, Présidence de la République",
              href: "https://www.prc.cm/files/2b/9f/21/1055fa3c2251b4c4248fd301f584daaf.pdf",
            },
            {
              label: "Règlement général sur la protection des données, EUR-Lex",
              href: "https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32016R0679",
            },
          ],
        },
      ],
    },
    en: {
      eyebrow: "Data protection",
      title: "Privacy policy",
      summary:
        "Transparent information about the data processed by the website, its purposes, recipients and your rights.",
      icon: ShieldCheck,
      updated: "4 September 2026",
      sections: [
        {
          id: "scope",
          title: "Scope and controller",
          paragraphs: [
            "This policy covers the public website of the African Institute of Medicine (IAM), its contact forms, newsletter and public editorial interfaces.",
            "The controller is the legal entity operating IAM. Its exact legal form and representative must be confirmed: " +
              incompleteEn,
          ],
          bullets: [
            "General contact: institutafricaindumedicament@gmail.com",
            "Dedicated data protection contact or DPO, if appointed: " +
              incompleteEn,
          ],
        },
        {
          id: "data",
          title: "Data actually processed",
          bullets: [
            "Forms: first name, optional last name, email address, country, optional organisation, request type and message content.",
            "Newsletter: first name, optional last name, email address, country, professional profile, language and selected topics.",
            "Security: IP address or pseudonymised fingerprint, anti-bot result and minimal technical data required to prevent abuse.",
            "Navigation: technical logs that may be produced by the hosting provider; no analytics tool or marketing pixel was found in the audited code.",
            "Internal search: entered words may appear in the URL and technical logs; do not enter personal or medical data.",
            "IAM Assistant: language, question and no more than eight recent messages submitted voluntarily. The conversation is not stored in a database by the website.",
          ],
        },
        {
          id: "health-data",
          title: "Health and sensitive data",
          paragraphs: [
            "Public forms and IAM Assistant are not designed to collect symptoms, diagnoses, treatments, medicines used, medical results, genetic or biometric data, or patient identifiers.",
            "Do not send health data, adverse-event information, patient data or urgent situations through these interfaces. The assistant locally blocks identifiable personal medical requests before any call to an artificial-intelligence provider.",
          ],
          notice:
            "This website currently provides no pharmacovigilance reporting pathway and must not be used for urgent medical reporting.",
        },
        {
          id: "purposes",
          title: "Purposes and legal grounds",
          bullets: [
            "Responding to and following up requests: pre-contractual steps, institutional mission or legitimate interests depending on context. The legal qualification remains to be reviewed.",
            "Sending the selected newsletter: explicit consent confirmed by double opt-in and withdrawable at any time.",
            "Answering documentary questions about IAM and directing visitors to website content: voluntary visitor action and legitimate interest in institutional information, subject to legal review.",
            "Securing the website, preventing spam and limiting abuse: legitimate interests and service security, subject to applicable law.",
            "Complying with legal or regulatory duties applicable to IAM.",
          ],
        },
        {
          id: "recipients",
          title: "Recipients and providers",
          paragraphs: [
            "Access must be restricted to authorised IAM staff and providers required for operation. No advertising use of messages or health data is planned.",
          ],
          bullets: [
            "Vercel: hosting and technical logs.",
            "Resend: message delivery, confirmations and newsletter contacts.",
            "Upstash: rate limiting, temporary subscription data and preference tokens.",
            "Cloudflare Turnstile: anti-bot checks on forms.",
            "Sanity: public editorial content and media; form messages are not stored in Sanity.",
            "OpenAI: optional generation of IAM Assistant answers only when the service is configured. Without configuration, the assistant uses its local documentary knowledge only.",
          ],
          links: [
            {
              label: "Vercel, Data Processing Addendum",
              href: "https://vercel.com/legal/dpa",
            },
            {
              label: "Resend, Data Processing Addendum",
              href: "https://resend.com/legal/dpa",
            },
            {
              label: "Sanity, Data Processing Addendum",
              href: "https://www.sanity.io/legal/dpa",
            },
            {
              label: "Upstash, Data Processing Addendum",
              href: "https://upstash.com/trust/dpa.pdf",
            },
            {
              label: "Cloudflare Turnstile documentation",
              href: "https://developers.cloudflare.com/turnstile/",
            },
            {
              label: "OpenAI API data controls and retention",
              href: "https://developers.openai.com/api/docs/guides/your-data",
            },
          ],
        },
        {
          id: "retention",
          title: "Retention",
          bullets: [
            "Unconfirmed newsletter subscription: 24 hours in Upstash.",
            "Preference-management token: 180 days in Upstash.",
            "Confirmed newsletter contact: until unsubscribe or necessary deletion, subject to a formal retention policy.",
            "IAM Assistant conversation: retained only in the memory of the open page and cleared on reload. When OpenAI is configured, the store parameter is disabled; provider abuse-monitoring logs may nevertheless be retained for up to 30 days by default according to its documentation.",
            "Contact messages, mailbox copies and provider logs: exact periods " +
              incompleteEn,
          ],
          notice:
            "IAM must adopt a retention schedule defining periods, owners and deletion mechanisms.",
        },
        {
          id: "transfers",
          title: "International transfers",
          paragraphs: [
            "Technical providers may process data in several countries. The contracting entity, enabled regions, subprocessor list and transfer safeguards must be checked in each provider account.",
            "Contractual safeguards effectively activated for IAM: " +
              incompleteEn,
          ],
        },
        {
          id: "rights",
          title: "Your rights",
          paragraphs: [
            "Depending on applicable law, you may request access, rectification, erasure, restriction and objection and, where conditions are met, portability. You may withdraw newsletter consent without affecting prior processing.",
            "To exercise a right, email institutafricaindumedicament@gmail.com and describe your request. Identity evidence should only be requested where there is reasonable doubt and in a proportionate manner.",
            "Competent data protection authority and contact details: " +
              incompleteEn,
          ],
        },
        {
          id: "children",
          title: "Children",
          paragraphs: [
            "The forms and newsletter are not intended to collect data directly from children. A child should not submit personal or medical data without a legal representative where required.",
            "Any publication depicting a child must have documented, limited and revocable permission under applicable law.",
          ],
        },
        {
          id: "security",
          title: "Security measures",
          paragraphs: [
            "The website uses HTTPS in production, server-side validation, rate limiting, an anti-spam field, Turnstile, browser security rules and environment-variable secret separation. No measure guarantees zero risk.",
            "Incidents require an internal detection, assessment, notification and documentation process: " +
              incompleteEn,
          ],
        },
        {
          id: "laws",
          title: "Legal frameworks",
          paragraphs: [
            "IAM is established in Cameroon. Cameroon Law No. 2024/017 of 23 December 2024 on personal data protection should be considered within its applicable scope.",
            "The GDPR may apply in circumstances defined by its territorial scope, including where people in the European Economic Area are targeted or monitored. This policy is neither a GDPR certification nor a HIPAA certification.",
          ],
          links: [
            {
              label: "Official Cameroon text, Presidency of the Republic",
              href: "https://www.prc.cm/files/9b/df/2c/e818fedc7d5568778f884ea2886bea7d.pdf",
            },
            {
              label: "General Data Protection Regulation, EUR-Lex",
              href: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679",
            },
          ],
        },
      ],
    },
  },
  "/cookies": {
    fr: {
      eyebrow: "Cookies et services techniques",
      title: "Politique de cookies",
      summary:
        "Les mécanismes techniques réellement détectés sont présentés sans inventaire fictif ni consentement trompeur.",
      icon: CookieIcon,
      updated: "26 août 2026",
      sections: [
        {
          id: "definition",
          title: "Qu’est-ce qu’un cookie ?",
          paragraphs: [
            "Un cookie est une petite information enregistrée ou lue par un navigateur. Des technologies proches, comme des jetons ou identifiants techniques, peuvent remplir une fonction similaire.",
          ],
        },
        {
          id: "audit",
          title: "Résultat de l’audit du site",
          paragraphs: [
            "Aucun Google Analytics, Google Tag Manager, Meta Pixel, outil publicitaire, lecteur vidéo tiers, carte interactive ou widget social n’a été détecté dans le code public audité.",
            "Aucun cookie statistique ou publicitaire propre au site n’est actuellement configuré. Le bandeau permet néanmoins au visiteur d’anticiper ses préférences et bloque par défaut toute future catégorie optionnelle.",
          ],
        },
        {
          id: "necessaires",
          title: "Services strictement nécessaires",
          bullets: [
            "Cloudflare Turnstile est chargé uniquement sur les pages comportant un formulaire lorsque sa clé publique est configurée. Il analyse des signaux techniques pour distinguer les visiteurs humains des robots. Les noms et durées de cookies ou jetons éventuels dépendent de la configuration Cloudflare et doivent être confirmés dans le compte IAM.",
            "Le mode d’aperçu Next.js utilise un cookie technique réservé aux éditeurs autorisés. Il ne concerne pas la navigation publique ordinaire.",
            "Vercel et les infrastructures réseau peuvent traiter des journaux techniques nécessaires à la livraison et à la sécurité du site.",
            "Le cookie iam_cookie_consent et l’enregistrement local associé mémorisent les catégories choisies pendant 180 jours. Ils sont strictement nécessaires au respect durable de la décision du visiteur.",
          ],
          links: [
            {
              label: "Documentation Cloudflare Turnstile",
              href: "https://developers.cloudflare.com/turnstile/",
            },
          ],
        },
        {
          id: "categories",
          title: "Catégories actuellement actives",
          bullets: [
            "Nécessaires : actifs uniquement lorsque requis pour la sécurité, l’édition autorisée ou la fourniture du site.",
            "Préférences de consentement : actives après le premier choix afin de ne pas redemander la décision à chaque visite.",
            "Statistiques : inactifs.",
            "Marketing : inactifs.",
          ],
        },
        {
          id: "gestion",
          title: "Gérer mes cookies",
          paragraphs: [
            "Le bandeau permet de tout accepter, de tout refuser ou de personnaliser les catégories optionnelles. Le refus est aussi simple que l’acceptation et aucun choix n’est présélectionné.",
            "Vous pouvez rouvrir le panneau à tout moment avec le lien Gérer mes cookies situé dans le pied de page. La suppression des données du navigateur réinitialise la préférence et fera réapparaître le bandeau.",
          ],
          notice:
            "Configuration exacte de Turnstile, durées techniques et éventuelle prévalidation Cloudflare : " +
            incompleteFr,
        },
      ],
    },
    en: {
      eyebrow: "Cookies and technical services",
      title: "Cookie policy",
      summary:
        "Technical mechanisms actually found in the project are described without a fictional inventory or misleading consent.",
      icon: CookieIcon,
      updated: "26 August 2026",
      sections: [
        {
          id: "definition",
          title: "What is a cookie?",
          paragraphs: [
            "A cookie is a small item of information stored or read by a browser. Similar technologies, such as tokens or technical identifiers, may serve the same purpose.",
          ],
        },
        {
          id: "audit",
          title: "Website audit result",
          paragraphs: [
            "No Google Analytics, Google Tag Manager, Meta Pixel, advertising tool, third-party video player, interactive map or social widget was found in the audited public code.",
            "No first-party analytics or advertising cookie is currently configured. The banner nevertheless allows visitors to set preferences in advance and blocks every future optional category by default.",
          ],
        },
        {
          id: "necessary",
          title: "Strictly necessary services",
          bullets: [
            "Cloudflare Turnstile loads only on pages containing a form when its public key is configured. It analyses technical signals to distinguish people from bots. Any cookie or token names and durations depend on Cloudflare configuration and must be confirmed in the IAM account.",
            "Next.js draft mode uses a technical cookie reserved for authorised editors. It does not concern ordinary public browsing.",
            "Vercel and network infrastructure may process technical logs required to deliver and secure the website.",
            "The iam_cookie_consent cookie and its related local record store selected categories for 180 days. They are strictly necessary to respect the visitor’s decision over time.",
          ],
          links: [
            {
              label: "Cloudflare Turnstile documentation",
              href: "https://developers.cloudflare.com/turnstile/",
            },
          ],
        },
        {
          id: "categories",
          title: "Categories currently active",
          bullets: [
            "Necessary: active only where required for security, authorised editing or website delivery.",
            "Consent preferences: active after the first choice so that visitors are not asked again on every visit.",
            "Statistics: inactive.",
            "Marketing: inactive.",
          ],
        },
        {
          id: "gestion",
          title: "Manage my cookies",
          paragraphs: [
            "The banner lets you accept all, reject all or customise optional categories. Refusal is as easy as acceptance and no optional choice is preselected.",
            "You can reopen the panel at any time using the Manage my cookies link in the footer. Clearing browser data resets the preference and makes the banner appear again.",
          ],
          notice:
            "Exact Turnstile configuration, technical durations and possible Cloudflare pre-clearance: " +
            incompleteEn,
        },
      ],
    },
  },
  "/conditions-utilisation": {
    fr: {
      eyebrow: "Cadre d’utilisation",
      title: "Conditions générales d’utilisation",
      summary:
        "Règles d’accès et d’utilisation du site institutionnel de l’IAM, sans conditions commerciales ni vente en ligne.",
      icon: FileCheck2,
      updated: "26 août 2026",
      sections: [
        {
          id: "objet",
          title: "Objet et acceptation",
          paragraphs: [
            "Le site présente l’IAM, ses priorités, contenus, formations, actualités, projets et possibilités de coopération. Il ne constitue pas une boutique en ligne et aucun paiement public n’est activé.",
            "L’accès et l’utilisation du site impliquent le respect des présentes conditions et des lois applicables.",
          ],
        },
        {
          id: "acces",
          title: "Accès et disponibilité",
          paragraphs: [
            "L’accès est en principe libre, hors fonctions éditoriales ou administratives protégées. Le site peut être interrompu pour maintenance, sécurité, mise à jour ou cause indépendante de l’IAM.",
          ],
        },
        {
          id: "usage",
          title: "Utilisation autorisée",
          bullets: [
            "Utiliser le site de façon loyale et conforme à sa finalité institutionnelle.",
            "Ne pas contourner les mesures de sécurité, automatiser des envois abusifs, introduire de code malveillant ou perturber le service.",
            "Ne pas usurper l’identité d’une personne ou transmettre des contenus illicites, trompeurs ou portant atteinte aux droits d’autrui.",
            "Ne pas transmettre de donnée médicale, de patient ou d’effet indésirable par les formulaires publics.",
          ],
        },
        {
          id: "contenus",
          title: "Contenus, sources et avertissement médical",
          paragraphs: [
            "Les contenus scientifiques et pharmaceutiques ont une finalité informative. Les dates, sources et niveaux de validation sont affichés lorsqu’ils sont disponibles. Une information peut évoluer avec les connaissances et les règles applicables.",
            "Aucun contenu ne remplace un avis médical personnalisé, un diagnostic ou une prescription.",
          ],
          links: [
            {
              label: "Avertissement médical complet",
              href: "/avertissement-medical",
            },
          ],
        },
        {
          id: "liens",
          title: "Liens et services externes",
          paragraphs: [
            "Les liens externes sont fournis à titre informatif. L’IAM ne contrôle pas en permanence leur contenu, disponibilité, accessibilité ou politique de confidentialité.",
          ],
        },
        {
          id: "propriete",
          title: "Propriété intellectuelle",
          paragraphs: [
            "Les droits attachés aux contenus appartiennent à leurs titulaires respectifs. La consultation du site ne vaut ni licence générale ni transfert de droits. Les conditions de réutilisation d’un document scientifique peuvent être précisées sur sa fiche.",
          ],
        },
        {
          id: "responsabilite",
          title: "Responsabilité et sécurité",
          paragraphs: [
            "Chaque utilisateur reste responsable de son équipement, de ses décisions et des informations qu’il transmet. L’IAM ne peut être tenu responsable d’un usage détourné, d’une incompatibilité locale ou d’un événement extérieur raisonnablement incontrôlable, sous réserve des règles impératives applicables.",
            "Toute vulnérabilité présumée doit être signalée de manière responsable à institutafricaindumedicament@gmail.com, sans exploitation ni divulgation de données.",
          ],
        },
        {
          id: "evolution",
          title: "Évolution des services et des conditions",
          paragraphs: [
            "Les services et ces conditions peuvent évoluer. La date de mise à jour est indiquée en tête de page. Les changements importants devraient être signalés de manière proportionnée.",
          ],
        },
        {
          id: "droit",
          title: "Droit applicable et contact",
          paragraphs: [
            "Droit applicable et juridiction compétente : " + incompleteFr,
            "Pour toute question : institutafricaindumedicament@gmail.com.",
          ],
        },
      ],
    },
    en: {
      eyebrow: "Terms of use",
      title: "Website terms of use",
      summary:
        "Rules governing access to and use of IAM’s institutional website, without commercial sales terms.",
      icon: FileCheck2,
      updated: "26 August 2026",
      sections: [
        {
          id: "purpose",
          title: "Purpose and acceptance",
          paragraphs: [
            "The website presents IAM, its priorities, content, training, news, projects and cooperation opportunities. It is not an online shop and no public payment flow is enabled.",
            "Accessing and using the website requires compliance with these terms and applicable law.",
          ],
        },
        {
          id: "access",
          title: "Access and availability",
          paragraphs: [
            "Access is generally public, except for protected editorial or administrative functions. The website may be interrupted for maintenance, security, updates or reasons beyond IAM’s control.",
          ],
        },
        {
          id: "use",
          title: "Permitted use",
          bullets: [
            "Use the website fairly and consistently with its institutional purpose.",
            "Do not bypass security, automate abusive submissions, introduce malicious code or disrupt the service.",
            "Do not impersonate anyone or submit illegal, misleading or rights-infringing material.",
            "Do not submit medical, patient or adverse-event data through public forms.",
          ],
        },
        {
          id: "content",
          title: "Content, sources and medical disclaimer",
          paragraphs: [
            "Scientific and pharmaceutical content is informational. Dates, sources and validation levels are displayed when available. Information can change as knowledge and applicable rules evolve.",
            "No content replaces personalised medical advice, diagnosis or prescription.",
          ],
          links: [
            {
              label: "Full medical disclaimer",
              href: "/avertissement-medical",
            },
          ],
        },
        {
          id: "links",
          title: "External links and services",
          paragraphs: [
            "External links are provided for information. IAM does not continuously control their content, availability, accessibility or privacy practices.",
          ],
        },
        {
          id: "intellectual-property",
          title: "Intellectual property",
          paragraphs: [
            "Rights in content remain with their respective owners. Viewing the website grants no general licence or transfer of rights. Reuse terms for a scientific document may be stated on its own page.",
          ],
        },
        {
          id: "liability",
          title: "Liability and security",
          paragraphs: [
            "Each user remains responsible for their equipment, decisions and information submitted. IAM cannot be held liable for misuse, local incompatibility or events reasonably outside its control, subject to mandatory law.",
            "Report suspected vulnerabilities responsibly to institutafricaindumedicament@gmail.com without exploiting them or disclosing data.",
          ],
        },
        {
          id: "changes",
          title: "Changes to services and terms",
          paragraphs: [
            "Services and these terms may change. The update date appears at the top of the page. Material changes should be communicated proportionately.",
          ],
        },
        {
          id: "law",
          title: "Applicable law and contact",
          paragraphs: [
            "Applicable law and competent jurisdiction: " + incompleteEn,
            "Questions: institutafricaindumedicament@gmail.com.",
          ],
        },
      ],
    },
  },
  "/avertissement-medical": {
    fr: {
      eyebrow: "Information médicale responsable",
      title: "Avertissement médical",
      summary:
        "Le contenu scientifique et pharmaceutique informe ; il ne remplace jamais l’évaluation d’un professionnel de santé qualifié.",
      icon: Stethoscope,
      updated: "26 août 2026",
      sections: [
        {
          id: "finalite",
          title: "Finalité des contenus",
          paragraphs: [
            "Les informations publiées sont principalement institutionnelles, pédagogiques, scientifiques ou professionnelles. Elles sont générales et ne tiennent pas compte de la situation individuelle d’une personne.",
          ],
        },
        {
          id: "limites",
          title: "Ni diagnostic, ni prescription",
          bullets: [
            "Le site ne fournit pas de diagnostic médical.",
            "Le site ne délivre pas de prescription et ne recommande pas un traitement individualisé.",
            "Il ne faut pas commencer, interrompre ou modifier un médicament sur la seule base d’un contenu du site.",
            "Toute décision concernant un symptôme, une maladie, un traitement ou un médicament doit être discutée avec un professionnel de santé qualifié.",
          ],
        },
        {
          id: "urgence",
          title: "Urgences et pharmacovigilance",
          paragraphs: [
            "En cas d’urgence, contactez immédiatement les services d’urgence ou une structure de santé compétente dans votre pays.",
            "Les formulaires généraux du site ne constituent pas un canal de pharmacovigilance. Ne les utilisez pas pour transmettre un effet indésirable, une erreur médicamenteuse, un dossier patient ou une donnée médicale sensible. Utilisez les dispositifs officiels de votre pays ou contactez un professionnel de santé.",
          ],
          notice:
            "L’IAM ne publie pas actuellement de destinataire officiel de pharmacovigilance validé sur ce site ; aucun canal ne doit être inventé.",
        },
        {
          id: "sources",
          title: "Sources, dates et évolution des connaissances",
          paragraphs: [
            "Les contenus scientifiques devraient indiquer leur source, leur date, leur contexte et leur niveau de vérification. Les connaissances, recommandations et cadres réglementaires peuvent évoluer après publication.",
            "L’absence d’une source ou d’une date doit être considérée comme une limite éditoriale et corrigée avant validation du contenu.",
          ],
        },
        {
          id: "publicite",
          title: "Information sur les médicaments",
          paragraphs: [
            "Les pages ne doivent pas être interprétées comme une publicité ou une promotion destinée au public pour un médicament, une molécule ou un dispositif. Toute communication partenaire doit distinguer clairement information scientifique, contenu institutionnel et éventuel contenu sponsorisé.",
          ],
        },
        {
          id: "responsabilite",
          title: "Responsabilité éditoriale",
          paragraphs: [
            "L’IAM met en œuvre un processus de validation des sources dans son système éditorial. Une erreur ou une information obsolète peut néanmoins subsister. Les demandes de correction peuvent être adressées à iamqualite@gmail.com.",
          ],
        },
      ],
    },
    en: {
      eyebrow: "Responsible medical information",
      title: "Medical disclaimer",
      summary:
        "Scientific and pharmaceutical content informs; it never replaces assessment by a qualified healthcare professional.",
      icon: Stethoscope,
      updated: "26 August 2026",
      sections: [
        {
          id: "purpose",
          title: "Purpose of content",
          paragraphs: [
            "Published information is primarily institutional, educational, scientific or professional. It is general and does not take account of any individual’s circumstances.",
          ],
        },
        {
          id: "limits",
          title: "Neither diagnosis nor prescription",
          bullets: [
            "The website does not provide a medical diagnosis.",
            "The website does not issue prescriptions or recommend individual treatment.",
            "Do not start, stop or change a medicine solely because of website content.",
            "Discuss decisions about symptoms, disease, treatment or medicines with a qualified healthcare professional.",
          ],
        },
        {
          id: "emergency",
          title: "Emergencies and pharmacovigilance",
          paragraphs: [
            "In an emergency, immediately contact emergency services or an appropriate healthcare facility in your country.",
            "The website’s general forms are not a pharmacovigilance channel. Do not use them to send an adverse event, medication error, patient record or sensitive medical data. Use official reporting arrangements in your country or contact a healthcare professional.",
          ],
          notice:
            "IAM does not currently publish a validated official pharmacovigilance recipient on this website; no reporting channel should be invented.",
        },
        {
          id: "sources",
          title: "Sources, dates and evolving knowledge",
          paragraphs: [
            "Scientific content should state its source, date, context and verification status. Knowledge, recommendations and regulatory frameworks may change after publication.",
            "A missing source or date is an editorial limitation and should be corrected before content approval.",
          ],
        },
        {
          id: "advertising",
          title: "Medicines information",
          paragraphs: [
            "Pages must not be interpreted as public advertising or promotion of a medicine, molecule or device. Partner communications must clearly distinguish scientific information, institutional content and any sponsored content.",
          ],
        },
        {
          id: "editorial",
          title: "Editorial responsibility",
          paragraphs: [
            "IAM uses a source-validation workflow in its editorial system. Errors or outdated information may nevertheless remain. Correction requests may be sent to iamqualite@gmail.com.",
          ],
        },
      ],
    },
  },
  "/accessibilite": {
    fr: {
      eyebrow: "Accès pour toutes et tous",
      title: "Déclaration d’accessibilité",
      summary:
        "État transparent des mesures déjà présentes, des limites connues et du processus d’amélioration continue.",
      icon: Accessibility,
      updated: "26 août 2026",
      sections: [
        {
          id: "statut",
          title: "État de conformité",
          paragraphs: [
            "Aucun audit exhaustif et indépendant au regard des WCAG ou d’un référentiel national n’a encore été réalisé. L’IAM ne déclare donc pas le site intégralement conforme.",
            "Statut prudent à ce stade : conformité partielle à confirmer par un audit formel portant sur l’ensemble des pages, contenus du CMS et parcours interactifs.",
          ],
          notice:
            "Référentiel légal ou contractuel retenu et niveau cible : " +
            incompleteFr,
        },
        {
          id: "mesures",
          title: "Mesures déjà intégrées",
          bullets: [
            "Lien d’évitement vers le contenu principal.",
            "Structure sémantique avec titres, navigation, contenu principal et pied de page.",
            "Labels visibles pour les champs de formulaire et messages d’état annoncés.",
            "Navigation clavier et indicateurs de focus visibles.",
            "Textes alternatifs prévus pour les images éditoriales et option de réduction des animations.",
            "Mise en page responsive et taille de zones interactives adaptée aux écrans tactiles.",
          ],
        },
        {
          id: "limites",
          title: "Limites connues ou à vérifier",
          bullets: [
            "Contrastes et zoom à vérifier sur chaque combinaison de visuel et texte provenant du CMS.",
            "Qualité descriptive des textes alternatifs des photographies historiques.",
            "Ordre des titres et libellés des contenus ajoutés par les équipes éditoriales.",
            "Comportement des services tiers, notamment Cloudflare Turnstile.",
            "Tests complets avec lecteurs d’écran, navigation clavier, zoom 200 % et plusieurs navigateurs mobiles.",
          ],
        },
        {
          id: "contact",
          title: "Signaler une difficulté",
          paragraphs: [
            "Si vous ne pouvez pas accéder à un contenu ou utiliser une fonction, écrivez à institutafricaindumedicament@gmail.com en indiquant la page concernée, le problème rencontré et, si possible, votre navigateur ou technologie d’assistance.",
            "Délai cible de réponse et procédure d’escalade : " + incompleteFr,
          ],
        },
        {
          id: "amelioration",
          title: "Plan d’amélioration",
          bullets: [
            "Réaliser un audit d’accessibilité formel et documenté.",
            "Corriger les non-conformités par niveau de gravité.",
            "Former les contributeurs aux titres, liens, tableaux et alternatives textuelles.",
            "Retester les parcours clés après chaque évolution majeure.",
          ],
        },
      ],
    },
    en: {
      eyebrow: "Access for everyone",
      title: "Accessibility statement",
      summary:
        "A transparent account of existing measures, known limitations and the continuous improvement process.",
      icon: Accessibility,
      updated: "26 August 2026",
      sections: [
        {
          id: "status",
          title: "Conformance status",
          paragraphs: [
            "No comprehensive independent audit against WCAG or a national standard has yet been completed. IAM therefore does not claim that the website is fully conformant.",
            "Prudent current status: partial conformance, to be confirmed by a formal audit covering all pages, CMS content and interactive journeys.",
          ],
          notice:
            "Selected legal or contractual standard and target level: " +
            incompleteEn,
        },
        {
          id: "measures",
          title: "Measures already included",
          bullets: [
            "Skip link to main content.",
            "Semantic structure with headings, navigation, main content and footer.",
            "Visible form labels and announced status messages.",
            "Keyboard navigation and visible focus indicators.",
            "Text alternatives planned for editorial images and reduced-motion support.",
            "Responsive layout and touch-friendly interactive targets.",
          ],
        },
        {
          id: "limitations",
          title: "Known or unverified limitations",
          bullets: [
            "Contrast and zoom for every CMS image-and-text combination.",
            "Descriptive quality of alternative text for historical photographs.",
            "Heading order and labels in content added by editors.",
            "Behaviour of third-party services, particularly Cloudflare Turnstile.",
            "Complete testing with screen readers, keyboard navigation, 200% zoom and several mobile browsers.",
          ],
        },
        {
          id: "contact",
          title: "Report a problem",
          paragraphs: [
            "If you cannot access content or use a feature, email institutafricaindumedicament@gmail.com with the page, the problem and, where possible, your browser or assistive technology.",
            "Target response time and escalation procedure: " + incompleteEn,
          ],
        },
        {
          id: "improvement",
          title: "Improvement plan",
          bullets: [
            "Conduct a formal, documented accessibility audit.",
            "Remediate findings according to severity.",
            "Train contributors on headings, links, tables and text alternatives.",
            "Retest key journeys after each major release.",
          ],
        },
      ],
    },
  },
};

export function isLegalPagePath(path: string): path is LegalPagePath {
  return legalPagePaths.includes(path as LegalPagePath);
}

export function getLegalPageMetadata(path: LegalPagePath, locale: Locale) {
  const document = documents[path][locale];
  return { title: document.title, description: document.summary };
}

function LegalHref({ locale, link }: { locale: Locale; link: LegalLink }) {
  if (link.href.startsWith("/")) {
    return <Link href={localizePath(locale, link.href)}>{link.label}</Link>;
  }
  return (
    <a href={link.href} rel="noreferrer" target="_blank">
      {link.label}
    </a>
  );
}

export function LegalPage({
  locale,
  path,
}: {
  locale: Locale;
  path: LegalPagePath;
}) {
  const document = documents[path][locale];
  const Icon = document.icon;
  const isVerifiedText = (value: string) =>
    !value.includes(incompleteFr) && !value.includes(incompleteEn);
  const sections = document.sections
    .map((section) => ({
      ...section,
      paragraphs: section.paragraphs?.filter(isVerifiedText),
      bullets: section.bullets?.filter(isVerifiedText),
      notice:
        section.notice && isVerifiedText(section.notice)
          ? section.notice
          : undefined,
    }))
    .filter(
      (section) =>
        Boolean(section.paragraphs?.length) ||
        Boolean(section.bullets?.length) ||
        Boolean(section.links?.length) ||
        Boolean(section.notice),
    );
  const updatedIso = path === "/confidentialite" ? "2026-09-04" : "2026-08-26";
  return (
    <main id="contenu" className="legal-page">
      <section className="legal-hero">
        <Container>
          <div className="breadcrumb">
            <Link href={localizePath(locale, "/")}>
              {locale === "fr" ? "Accueil" : "Home"}
            </Link>
            <span aria-hidden="true">/</span>
            <span>{document.title}</span>
          </div>
          <div className="legal-hero__grid">
            <div>
              <p className="eyebrow">{document.eyebrow}</p>
              <h1>{document.title}</h1>
              <p>{document.summary}</p>
              <p className="legal-updated">
                {locale === "fr" ? "Dernière mise à jour" : "Last updated"} :{" "}
                <time dateTime={updatedIso}>{document.updated}</time>
              </p>
            </div>
            <div className="legal-hero__icon" aria-hidden="true">
              <Icon />
              <span>IAM / LEGAL</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="section legal-body">
        <Container className="legal-layout">
          <nav
            className="legal-toc"
            aria-label={locale === "fr" ? "Sommaire" : "Contents"}
          >
            <strong>{locale === "fr" ? "Sommaire" : "Contents"}</strong>
            <ol>
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="legal-document">
            {sections.map((section) => (
              <section
                id={section.id}
                key={section.id}
                className="legal-section"
              >
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
                {section.links ? (
                  <ul className="legal-links">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <LegalHref locale={locale} link={link} />
                      </li>
                    ))}
                  </ul>
                ) : null}
                {section.notice ? (
                  <p className="legal-notice">{section.notice}</p>
                ) : null}
              </section>
            ))}
          </article>
        </Container>
      </section>
    </main>
  );
}

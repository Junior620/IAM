import NextLink from "next/link";
import Image from "next/image";
import type { ComponentProps } from "react";
import {
  Building2,
  ChevronDown,
  Languages,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldAlert,
} from "lucide-react";
import { copy, localizePath, navItems, type Locale } from "@/lib/content";
import { MobileMenu } from "./mobile-menu";
import { Container } from "./ui";

function Link(props: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={false} {...props} />;
}

export function Brand({ locale }: { locale: Locale }) {
  return (
    <Link
      aria-label={
        locale === "fr"
          ? "Institut Africain du Médicament — accueil"
          : "African Institute of Medicine — home"
      }
      className="brand"
      href={localizePath(locale, "/")}
    >
      <Image
        className="brand__logo"
        src="/images/brand/iam-logo-official.png"
        alt=""
        width={642}
        height={374}
        priority
      />
    </Link>
  );
}

export function Header({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const otherLocale = locale === "fr" ? "en" : "fr";
  return (
    <>
      <a className="skip-link" href="#contenu">
        {locale === "fr" ? "Aller au contenu" : "Skip to content"}
      </a>
      <div className="utility-bar">
        <Container className="utility-bar__inner">
          <Link href={localizePath(locale, "/alertes")}>
            <ShieldAlert aria-hidden="true" size={14} />
            {t.utility.alert}
          </Link>
          <nav
            aria-label={
              locale === "fr" ? "Navigation utilitaire" : "Utility navigation"
            }
          >
            <Link href={localizePath(locale, "/recherche")}>
              <Search aria-hidden="true" size={14} />
              {t.utility.search}
            </Link>
            <Link href={localizePath(locale, "/newsletter")}>
              <Mail aria-hidden="true" size={14} />
              {t.utility.newsletter}
            </Link>
            <Link href={localizePath(locale, "/contact")}>
              {t.utility.contact}
            </Link>
            <Link href={localizePath(otherLocale, "/")} hrefLang={otherLocale}>
              <Languages aria-hidden="true" size={14} />
              {otherLocale.toUpperCase()}
            </Link>
          </nav>
        </Container>
      </div>
      <header className="site-header">
        <Container className="site-header__inner">
          <Brand locale={locale} />
          <nav
            className="desktop-nav"
            aria-label={
              locale === "fr" ? "Navigation principale" : "Main navigation"
            }
          >
            {navItems.map((item) =>
              item.path === "/institut" ? (
                <div className="desktop-nav__item" key={item.path}>
                  <Link
                    className="desktop-nav__trigger"
                    href={localizePath(locale, item.path)}
                  >
                    {item[locale]}
                    <ChevronDown aria-hidden="true" size={14} />
                  </Link>
                  <div className="desktop-nav__submenu">
                    <Link href={localizePath(locale, "/institut/a-propos")}>
                      <strong>
                        {locale === "fr" ? "À propos de nous" : "About us"}
                      </strong>
                      <span>
                        {locale === "fr"
                          ? "Mission, histoire et raison d’être"
                          : "Mission, history and purpose"}
                      </span>
                    </Link>
                    <Link
                      href={localizePath(locale, "/institut/mission-vision")}
                    >
                      <strong>
                        {locale === "fr"
                          ? "Mission et vision"
                          : "Mission and vision"}
                      </strong>
                      <span>
                        {locale === "fr"
                          ? "Cap stratégique et principes d’action"
                          : "Strategic direction and operating principles"}
                      </span>
                    </Link>
                    <Link href={localizePath(locale, "/institut/nos-services")}>
                      <strong>
                        {locale === "fr" ? "Nos services" : "Our services"}
                      </strong>
                      <span>
                        {locale === "fr"
                          ? "Expertises et domaines d’intervention"
                          : "Expertise and areas of intervention"}
                      </span>
                    </Link>
                    <Link href={localizePath(locale, "/institut")}>
                      <strong>
                        {locale === "fr"
                          ? "L’espace institutionnel"
                          : "Institutional area"}
                      </strong>
                      <span>
                        {locale === "fr"
                          ? "Mandat, gouvernance et transparence"
                          : "Mandate, governance and transparency"}
                      </span>
                    </Link>
                    <Link
                      href={localizePath(locale, "/institut/notre-approche")}
                    >
                      <strong>
                        {locale === "fr" ? "Notre approche" : "Our approach"}
                      </strong>
                      <span>
                        {locale === "fr"
                          ? "Méthode et principes d’action"
                          : "Method and operating principles"}
                      </span>
                    </Link>
                  </div>
                </div>
              ) : item.path === "/actualites-medias" ? (
                <div className="desktop-nav__item" key={item.path}>
                  <Link
                    className="desktop-nav__trigger"
                    href={localizePath(locale, item.path)}
                  >
                    {item[locale]}
                    <ChevronDown aria-hidden="true" size={14} />
                  </Link>
                  <div className="desktop-nav__submenu desktop-nav__submenu--right">
                    <Link href={localizePath(locale, "/actualites-medias")}>
                      <strong>
                        {locale === "fr"
                          ? "Actualités & médias"
                          : "News & media"}
                      </strong>
                      <span>
                        {locale === "fr"
                          ? "Informations, événements et ressources"
                          : "Updates, events and resources"}
                      </span>
                    </Link>
                    <Link
                      href={localizePath(locale, "/actualites-medias/galerie")}
                    >
                      <strong>
                        {locale === "fr"
                          ? "Galerie & photothèque"
                          : "Gallery & photo library"}
                      </strong>
                      <span>
                        {locale === "fr"
                          ? "Les archives visuelles de l’Institut"
                          : "The Institute’s visual archive"}
                      </span>
                    </Link>
                  </div>
                </div>
              ) : (
                <Link key={item.path} href={localizePath(locale, item.path)}>
                  {item[locale]}
                </Link>
              ),
            )}
          </nav>
          <Link
            className="support-link"
            href={localizePath(locale, "/partenariats#soutenir")}
          >
            {t.utility.support}
          </Link>
          <MobileMenu label={t.common.menu}>
            <div className="mobile-menu__group">
              <span>{locale === "fr" ? "L’Institut" : "The Institute"}</span>
              <Link href={localizePath(locale, "/institut/a-propos")}>
                {locale === "fr" ? "À propos de nous" : "About us"}
              </Link>
              <Link href={localizePath(locale, "/institut/mission-vision")}>
                {locale === "fr" ? "Mission et vision" : "Mission and vision"}
              </Link>
              <Link href={localizePath(locale, "/institut/nos-services")}>
                {locale === "fr" ? "Nos services" : "Our services"}
              </Link>
              <Link href={localizePath(locale, "/institut")}>
                {locale === "fr"
                  ? "L’espace institutionnel"
                  : "Institutional area"}
              </Link>
              <Link href={localizePath(locale, "/institut/notre-approche")}>
                {locale === "fr" ? "Notre approche" : "Our approach"}
              </Link>
            </div>
            <div className="mobile-menu__group">
              <span>
                {locale === "fr" ? "Actualités & médias" : "News & media"}
              </span>
              <Link href={localizePath(locale, "/actualites-medias")}>
                {locale === "fr" ? "Toutes les actualités" : "All news"}
              </Link>
              <Link href={localizePath(locale, "/actualites-medias/galerie")}>
                {locale === "fr"
                  ? "Galerie & photothèque"
                  : "Gallery & photo library"}
              </Link>
            </div>
            {navItems
              .filter(
                (item) =>
                  item.path !== "/institut" &&
                  item.path !== "/actualites-medias" &&
                  item.path !== "/partenariats",
              )
              .map((item) => (
                <Link key={item.path} href={localizePath(locale, item.path)}>
                  {item[locale]}
                </Link>
              ))}
            <div className="mobile-menu__group">
              <span>{locale === "fr" ? "Partenariats" : "Partnerships"}</span>
              <Link href={localizePath(locale, "/partenariats")}>
                {t.hero.partner}
              </Link>
              <Link href={localizePath(locale, "/partenariats/anna-snijder")}>
                Anna Snijder × IAM
              </Link>
            </div>
            <Link href={localizePath(locale, "/contact")}>
              {t.utility.contact}
            </Link>
          </MobileMenu>
        </Container>
      </header>
    </>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <footer className="footer">
      <Container>
        <div className="footer__top">
          <p>
            {locale === "fr"
              ? "Coopération pharmaceutique, scientifique et institutionnelle pour la disponibilité, la sécurité, l’innovation et l’accessibilité des médicaments en Afrique."
              : "Pharmaceutical, scientific and institutional cooperation for the availability, safety, innovation and accessibility of medicines in Africa."}
          </p>
        </div>
        <section
          className="footer__contact"
          aria-labelledby={`footer-contact-${locale}`}
        >
          <h2 id={`footer-contact-${locale}`}>
            {locale === "fr"
              ? "Coordonnées institutionnelles"
              : "Institutional contact details"}
          </h2>
          <div className="footer__contact-grid">
            <div>
              <MapPin aria-hidden="true" />
              <div>
                <h3>{locale === "fr" ? "Adresse" : "Address"}</h3>
                <address>
                  {locale === "fr"
                    ? "Bonamoussadi, Bloc 24, en face de la Perception, Douala — Cameroun"
                    : "Bonamoussadi, Block 24, opposite the Tax Office, Douala — Cameroon"}
                </address>
                <p>
                  {locale === "fr"
                    ? "Boîte postale : 5426 Douala, Cameroun"
                    : "P.O. Box 5426, Douala, Cameroon"}
                </p>
              </div>
            </div>
            <div>
              <Phone aria-hidden="true" />
              <div>
                <h3>{locale === "fr" ? "Téléphone" : "Phone"}</h3>
                <a href="tel:+237696216809">+237 696 21 68 09</a>
                <a href="tel:+237233471065">+237 233 47 10 65</a>
              </div>
            </div>
            <div>
              <Mail aria-hidden="true" />
              <div>
                <h3>Email</h3>
                <a href="mailto:institutafricaindumedicament@gmail.com">
                  institutafricaindumedicament@gmail.com
                </a>
                <a href="mailto:iamqualite@gmail.com">iamqualite@gmail.com</a>
              </div>
            </div>
            <div>
              <Building2 aria-hidden="true" />
              <div>
                <h3>{locale === "fr" ? "Identification" : "Registration"}</h3>
                <p>RC DLA / 2017 / B / 71</p>
                <p>
                  {locale === "fr" ? "Contribuable" : "Taxpayer"} :{" "}
                  M011712585175S
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="footer__grid">
          <div>
            <h2>{locale === "fr" ? "Explorer" : "Explore"}</h2>
            {navItems.slice(0, 4).map((item) => (
              <Link key={item.path} href={localizePath(locale, item.path)}>
                {item[locale]}
              </Link>
            ))}
          </div>
          <div>
            <h2>{locale === "fr" ? "Agir" : "Act"}</h2>
            <Link href={localizePath(locale, "/alertes")}>
              {t.utility.alert}
            </Link>
            <Link href={localizePath(locale, "/participer")}>
              {locale === "fr" ? "Participer" : "Get involved"}
            </Link>
            <Link href={localizePath(locale, "/partenariats")}>
              {t.hero.partner}
            </Link>
            <Link href={localizePath(locale, "/partenariats/anna-snijder")}>
              Anna Snijder × IAM
            </Link>
            <Link href={localizePath(locale, "/contact")}>
              {t.utility.contact}
            </Link>
          </div>
          <div>
            <h2>{locale === "fr" ? "Confiance" : "Trust"}</h2>
            <Link href={localizePath(locale, "/institut/a-propos")}>
              {locale === "fr" ? "À propos de nous" : "About us"}
            </Link>
            <Link href={localizePath(locale, "/institut/mission-vision")}>
              {locale === "fr" ? "Mission et vision" : "Mission and vision"}
            </Link>
            <Link href={localizePath(locale, "/institut")}>
              {locale === "fr" ? "Gouvernance" : "Governance"}
            </Link>
            <Link href={localizePath(locale, "/institut")}>
              {locale === "fr" ? "Transparence" : "Transparency"}
            </Link>
            <Link href={localizePath(locale, "/accessibilite")}>
              {locale === "fr" ? "Accessibilité" : "Accessibility"}
            </Link>
          </div>
          <div>
            <h2>{locale === "fr" ? "À savoir" : "Important"}</h2>
            <p>
              {locale === "fr"
                ? "L’Institut Africain du Médicament (IAM) est distinct de l’Agence africaine du médicament (AMA). Le statut juridique détaillé de l’IAM sera publié après validation documentaire."
                : "The African Institute of Medicine (IAM) is distinct from the African Medicines Agency (AMA). IAM’s detailed legal status will be published after documentary validation."}
            </p>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} IAM</span>
          <span>
            {locale === "fr"
              ? "Données vérifiées · Confidentialité · Mentions légales"
              : "Verified data · Privacy · Legal information"}
          </span>
        </div>
      </Container>
    </footer>
  );
}

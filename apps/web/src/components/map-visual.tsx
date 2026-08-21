import Image from "next/image";
import { BadgeCheck, CircleDot, Database, MapPinned } from "lucide-react";
import type { Locale } from "@/lib/content";

export function AfricaDataVisual({ locale }: { locale: Locale }) {
  return (
    <figure className="africa-visual">
      <Image
        className="africa-visual__image"
        src="/images/home-africa-presence.webp"
        alt={
          locale === "fr"
            ? "Des pharmaciens préparent la coordination de programmes devant une carte de l’Afrique"
            : "Pharmacists coordinate programmes in front of a map of Africa"
        }
        fill
        sizes="(max-width: 820px) 100vw, 58vw"
      />
      <figcaption className="africa-visual__caption">
        <strong>
          {locale === "fr"
            ? "Coordonner à partir de données vérifiées"
            : "Coordination grounded in verified data"}
        </strong>
        <span>
          {locale === "fr"
            ? "Les territoires ne sont affichés qu’après validation éditoriale."
            : "Territories are only displayed after editorial approval."}
        </span>
      </figcaption>
      <ul className="map-legend">
        <li>
          <MapPinned aria-hidden="true" size={18} />
          <span>
            {locale === "fr" ? "Territoire documenté" : "Documented territory"}
          </span>
        </li>
        <li>
          <Database aria-hidden="true" size={18} />
          <span>
            {locale === "fr" ? "Source et mise à jour" : "Source and update"}
          </span>
        </li>
        <li>
          <BadgeCheck aria-hidden="true" size={18} />
          <span>
            {locale === "fr" ? "Validation éditoriale" : "Editorial approval"}
          </span>
        </li>
        <li>
          <CircleDot aria-hidden="true" size={18} />
          <span>
            {locale === "fr"
              ? "Programme ou institution reliée"
              : "Linked programme or institution"}
          </span>
        </li>
      </ul>
    </figure>
  );
}

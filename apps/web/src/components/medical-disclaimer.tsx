import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import type { Locale } from "@/lib/content";
import { localizePath } from "@/lib/content";

export function MedicalDisclaimer({ locale }: { locale: Locale }) {
  return (
    <aside
      className="medical-disclaimer"
      aria-labelledby={`medical-disclaimer-${locale}`}
    >
      <ShieldAlert aria-hidden="true" />
      <div>
        <h2 id={`medical-disclaimer-${locale}`}>
          {locale === "fr" ? "Information médicale" : "Medical information"}
        </h2>
        <p>
          {locale === "fr"
            ? "Ce contenu est informatif et institutionnel. Il ne constitue ni un diagnostic, ni une prescription, ni un avis médical personnalisé. Ne modifiez jamais un traitement sans consulter un professionnel de santé qualifié. Ce site n’est pas un service d’urgence ni un canal de pharmacovigilance."
            : "This content is informational and institutional. It is not a diagnosis, prescription or personalised medical advice. Never change treatment without consulting a qualified healthcare professional. This website is neither an emergency service nor a pharmacovigilance reporting channel."}
        </p>
        <Link href={localizePath(locale, "/avertissement-medical")}>
          {locale === "fr"
            ? "Lire l’avertissement médical complet"
            : "Read the full medical disclaimer"}
        </Link>
      </div>
    </aside>
  );
}

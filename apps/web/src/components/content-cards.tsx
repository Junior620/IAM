import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Database,
  MapPin,
} from "lucide-react";
import type { ReactNode } from "react";

type CardProps = {
  eyebrow: string;
  title: string;
  summary: string;
  href: string;
  meta?: string;
};

function ContentCard({
  eyebrow,
  title,
  summary,
  href,
  meta,
  icon,
}: CardProps & { icon?: ReactNode }) {
  return (
    <article className="content-card">
      {icon}
      <p className="eyebrow">{eyebrow}</p>
      <h3>
        <Link href={href}>{title}</Link>
      </h3>
      <p>{summary}</p>
      {meta ? <small>{meta}</small> : null}
      <Link className="card-link" href={href}>
        <span className="sr-only">{title}</span>
        <ArrowRight aria-hidden="true" />
      </Link>
    </article>
  );
}

export function ProjectCard(props: CardProps) {
  return <ContentCard {...props} icon={<MapPin aria-hidden="true" />} />;
}
export function PublicationCard(props: CardProps) {
  return <ContentCard {...props} icon={<BadgeCheck aria-hidden="true" />} />;
}
export function EventCard(props: CardProps) {
  return <ContentCard {...props} icon={<CalendarDays aria-hidden="true" />} />;
}
export function CourseCard(props: CardProps) {
  return <ContentCard {...props} />;
}
export function ProfileCard(props: CardProps) {
  return <ContentCard {...props} />;
}
export function PartnerCard(props: CardProps) {
  return <ContentCard {...props} />;
}
export function DataCard(props: CardProps) {
  return <ContentCard {...props} icon={<Database aria-hidden="true" />} />;
}

export function ImpactMetric({
  value,
  unit,
  period,
  source,
}: {
  value: string;
  unit: string;
  period: string;
  source: string;
}) {
  return (
    <figure className="impact-metric">
      <strong>{value}</strong>
      <span>{unit}</span>
      <figcaption>
        {period} · {source}
      </figcaption>
    </figure>
  );
}

export function AlertRibbon({
  level,
  title,
  href,
}: {
  level: string;
  title: string;
  href: string;
}) {
  return (
    <Link className="alert-ribbon" href={href}>
      <strong>{level}</strong>
      <span>{title}</span>
      <ArrowRight aria-hidden="true" />
    </Link>
  );
}

export function Timeline({
  items,
}: {
  items: { date: string; title: string; source: string }[];
}) {
  return (
    <ol className="timeline">
      {items.map((item) => (
        <li key={`${item.date}-${item.title}`}>
          <time>{item.date}</time>
          <strong>{item.title}</strong>
          <small>{item.source}</small>
        </li>
      ))}
    </ol>
  );
}

export function Quote({
  children,
  attribution,
}: {
  children: ReactNode;
  attribution: string;
}) {
  return (
    <figure className="quote">
      <blockquote>{children}</blockquote>
      <figcaption>{attribution}</figcaption>
    </figure>
  );
}

export const Testimonial = Quote;

export function LogoCloud({ children }: { children: ReactNode }) {
  return (
    <div className="logo-cloud" aria-label="Verified partners">
      {children}
    </div>
  );
}

export function DonationCTA({
  title,
  summary,
  href,
  label,
}: {
  title: string;
  summary: string;
  href: string;
  label: string;
}) {
  return (
    <aside className="donation-cta">
      <h2>{title}</h2>
      <p>{summary}</p>
      <Link className="button button--primary" href={href}>
        {label}
        <ArrowRight aria-hidden="true" />
      </Link>
    </aside>
  );
}

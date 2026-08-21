import Link from "next/link";
import { ArrowUpRight, Check, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`container ${className}`}>{children}</div>;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light";
  className?: string;
}) {
  return (
    <Link
      className={`button button--${variant} ${className}`}
      href={href}
      prefetch={false}
    >
      {children}
      <ArrowUpRight aria-hidden="true" size={17} />
    </Link>
  );
}

export function Badge({
  children,
  tone = "emerald",
}: {
  children: ReactNode;
  tone?: string;
}) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}

export function SectionHeader({
  eyebrow,
  title,
  summary,
  invert = false,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  invert?: boolean;
}) {
  return (
    <header
      className={`section-header${invert ? " section-header--invert" : ""}`}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{summary}</p>
    </header>
  );
}

export function IconTile({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <div className="icon-tile">
      <span>
        <Icon aria-hidden="true" size={20} />
      </span>
      {children}
    </div>
  );
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="checklist">
      {items.map((item) => (
        <li key={item}>
          <Check aria-hidden="true" size={17} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function DividerLabel({ children }: { children: ReactNode }) {
  return (
    <div className="divider-label">
      <span>{children}</span>
    </div>
  );
}

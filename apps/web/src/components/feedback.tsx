import { AlertTriangle, BadgeCheck, CircleOff } from "lucide-react";
import type { ReactNode } from "react";

export function Alert({
  title,
  children,
  tone = "info",
}: {
  title: string;
  children: ReactNode;
  tone?: "info" | "warning" | "critical";
}) {
  return (
    <aside
      className={`system-alert system-alert--${tone}`}
      role={tone === "critical" ? "alert" : "status"}
    >
      <AlertTriangle aria-hidden="true" />
      <div>
        <strong>{title}</strong>
        <div>{children}</div>
      </div>
    </aside>
  );
}

export function EmptyState({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="empty-state">
      <CircleOff aria-hidden="true" />
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
}

export function ErrorState({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="empty-state" role="alert">
      <AlertTriangle aria-hidden="true" />
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
}

export function VerifiedState({ children }: { children: ReactNode }) {
  return (
    <span className="verified-state">
      <BadgeCheck aria-hidden="true" />
      {children}
    </span>
  );
}

export function Skeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="skeleton" aria-label="Loading">
      {Array.from({ length: lines }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}

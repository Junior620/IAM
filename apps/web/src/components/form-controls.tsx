import type { ComponentProps, ReactNode } from "react";

export function FormField({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="form-field">
      <span>{label}</span>
      {children}
      {hint ? <small>{hint}</small> : null}
      {error ? (
        <small className="form-error" role="alert">
          {error}
        </small>
      ) : null}
    </label>
  );
}

export function Input(props: ComponentProps<"input">) {
  return <input {...props} />;
}
export function Select(props: ComponentProps<"select">) {
  return <select {...props} />;
}
export function Checkbox(props: ComponentProps<"input">) {
  return <input type="checkbox" {...props} />;
}
export function Textarea(props: ComponentProps<"textarea">) {
  return <textarea {...props} />;
}

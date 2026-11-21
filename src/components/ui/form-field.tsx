import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  as?: "input" | "textarea";
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
};

export function FormField({ id, label, hint, error, as = "input", inputProps, textareaProps }: FormFieldProps) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  const controlClass = `mt-2 min-h-12 w-full rounded-xl border bg-white px-4 py-3 text-ink placeholder:text-muted/75 ${error ? "border-error-border" : "border-navy/20"}`;

  return (
    <div>
      <label className="block text-sm font-bold text-navy" htmlFor={id}>{label}</label>
      {as === "textarea" ? (
        <textarea className={`${controlClass} min-h-32`} id={id} aria-describedby={describedBy} aria-invalid={Boolean(error)} {...textareaProps} />
      ) : (
        <input className={controlClass} id={id} aria-describedby={describedBy} aria-invalid={Boolean(error)} {...inputProps} />
      )}
      {hint && <p className="mt-2 text-sm text-muted" id={`${id}-hint`}>{hint}</p>}
      {error && <p className="mt-2 text-sm font-semibold text-error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}

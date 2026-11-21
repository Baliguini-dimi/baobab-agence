import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "quiet";
};

const variants = {
  primary: "bg-coral text-navy-deep hover:bg-coral-hover",
  secondary: "border border-navy/20 bg-transparent text-navy hover:bg-navy/5",
  quiet: "bg-transparent text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy",
};

export function Button({ variant = "primary", type = "button", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-12 items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      type={type}
      {...props}
    />
  );
}

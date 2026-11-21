import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: "primary" | "secondary" };

export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonLinkProps) {
  const style = variant === "primary"
    ? "bg-coral text-navy-deep hover:bg-coral-hover"
    : "border border-navy/25 bg-paper/40 text-navy hover:bg-paper";
  return <Link className={`inline-flex min-h-12 items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition-[transform,opacity] ${style} ${className}`} {...props} />;
}

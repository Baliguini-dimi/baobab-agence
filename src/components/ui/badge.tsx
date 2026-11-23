import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "accent" | "navy";
};

const tones = {
  neutral: "bg-stone text-navy",
  accent: "bg-accent text-navy",
  navy: "bg-navy text-cream",
};

export function Badge({ tone = "neutral", className = "", ...props }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${tones[tone]} ${className}`} {...props} />
  );
}

import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "div";
  padded?: boolean;
};

export function Card({ as: Element = "article", padded = true, className = "", ...props }: CardProps) {
  return (
    <Element
      className={`rounded-2xl border border-navy/8 bg-white shadow-card ${padded ? "p-6 md:p-8" : ""} ${className}`}
      {...props}
    />
  );
}

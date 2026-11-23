import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "div";
  padded?: boolean;
};

export function Card({ as: Element = "article", padded = true, className = "", ...props }: CardProps) {
  const classes = "rounded-md border border-navy/12 bg-white shadow-card " + (padded ? "p-6 md:p-8 " : "") + className;
  return <Element className={classes} {...props} />;
}

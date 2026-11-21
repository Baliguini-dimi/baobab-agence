import type { ReactNode } from "react";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4";
  eyebrow?: string;
  number?: string;
  children: ReactNode;
  className?: string;
};

const sizes = {
  h1: "text-4xl sm:text-5xl md:text-6xl",
  h2: "text-3xl sm:text-4xl",
  h3: "text-2xl sm:text-3xl",
  h4: "text-xl sm:text-2xl",
};

export function Heading({ as: Element = "h2", eyebrow, number, children, className = "" }: HeadingProps) {
  return (
    <div className="text-left">
      {(eyebrow || number) && (
        <div className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-muted">
          {number && <span className="font-display text-lg tracking-normal text-navy">{number}</span>}
          {eyebrow && <span>{eyebrow}</span>}
        </div>
      )}
      <Element className={`font-display font-extrabold leading-[1.05] tracking-[-0.055em] text-navy ${sizes[Element]} ${className}`}>
        {children}
      </Element>
    </div>
  );
}

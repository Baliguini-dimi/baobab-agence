import type { HTMLAttributes } from "react";

type SectionProps = HTMLAttributes<HTMLElement> & {
  tone?: "paper" | "cream" | "navy";
  width?: "normal" | "wide";
};

const tones = {
  paper: "bg-paper text-ink",
  cream: "bg-cream text-ink",
  navy: "bg-navy text-cream",
};

export function Section({ tone = "paper", width = "normal", className = "", children, ...props }: SectionProps) {
  return (
    <section className={`px-5 py-16 sm:px-8 md:py-24 ${tones[tone]} ${className}`} {...props}>
      <div className={`mx-auto w-full ${width === "wide" ? "max-w-7xl" : "max-w-5xl"}`}>
        {children}
      </div>
    </section>
  );
}

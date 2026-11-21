type LogoProps = {
  tone?: "light" | "dark";
  className?: string;
};

/** Temporary text wordmark. Replace this component with the approved SVG asset later. */
export function Logo({ tone = "dark", className = "" }: LogoProps) {
  const toneClass = tone === "light" ? "text-cream" : "text-navy";

  return (
    <span
      className={`inline-flex items-center font-display text-xl font-extrabold tracking-[-0.06em] ${toneClass} ${className}`}
      aria-label="Baobab"
    >
      Baobab
    </span>
  );
}

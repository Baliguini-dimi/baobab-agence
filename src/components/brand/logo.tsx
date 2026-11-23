type LogoProps = {
  tone?: "light" | "dark";
  className?: string;
  decorative?: boolean;
};

/** The two-tone SVG is a brand mark, kept outside the Next image optimizer. */
export function Logo({ tone = "dark", className = "", decorative = false }: LogoProps) {
  const src = tone === "light"
    ? "/brand/baobab-logo-horizontal-sombre.svg"
    : "/brand/baobab-logo-horizontal-clair.svg";

  // eslint-disable-next-line @next/next/no-img-element -- Brand SVGs are served directly with fixed dimensions.
  return <img
    alt={decorative ? "" : "Baobab"}
    aria-hidden={decorative ? true : undefined}
    className={`brand-logo ${className}`}
    height={50}
    src={src}
    width={160}
  />;
}

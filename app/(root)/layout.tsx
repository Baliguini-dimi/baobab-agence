import type { Metadata } from "next";
import { bodyFont, displayFont } from "@/app/fonts";
import "@/styles/tokens.css";

export const metadata: Metadata = {
  title: "Baobab",
  robots: { index: false, follow: false },
};

export default function RootRedirectLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>{children}</body>
    </html>
  );
}

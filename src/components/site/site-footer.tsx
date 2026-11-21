import Link from "next/link";
import type { Locale } from "@/content/schema";
import { Logo } from "@/components/brand/logo";
import type { SocialLink } from "@/config/contact";
import { SocialLinks } from "@/components/site/social-links";

type FooterCopy = {
  footerNote: string; legal: string; privacy: string; cookies: string; equipment: string; copyright: string;
};

export function SiteFooter({ locale, copy, email, socials }: {
  locale: Locale;
  copy: FooterCopy;
  email: string | null;
  socials: SocialLink[];
}) {
  return (
    <footer className="bg-navy-deep px-5 py-12 text-cream sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-[1fr_auto]">
        <div><Logo tone="light" /><p className="mt-4 max-w-lg text-sm leading-6 text-cream/75">{copy.footerNote}</p>{email && <a className="mt-4 inline-block text-sm underline underline-offset-4" href={`mailto:${email}`}>{email}</a>}</div>
        <nav aria-label={locale === "fr" ? "Informations et réseaux" : "Information and social links"} className="flex flex-col gap-3 text-sm sm:items-end">
          <Link href={`/${locale}/mentions-legales`}>{copy.legal}</Link>
          <Link href={`/${locale}/confidentialite`}>{copy.privacy}</Link>
          <Link href={`/${locale}/cookies`}>{copy.cookies}</Link>
          <Link href={`/${locale}/equipements`}>{copy.equipment}</Link>
          <SocialLinks className="sm:justify-end" label={locale === "fr" ? "Réseaux sociaux" : "Social media"} links={socials} />
        </nav>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-cream/15 pt-5 text-xs text-cream/65">© {new Date().getFullYear()} {copy.copyright}</div>
    </footer>
  );
}

import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Locale } from "@/content/schema";
import { locales } from "@/content/schema";
import { agencyContact, getMapDestination, getWhatsAppUrl } from "@/config/contact";
import { ContactForm, MapEmbed } from "@/components/site/contact-controls";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { ButtonLink } from "@/components/ui/button-link";
import messagesFr from "@/messages/fr.json";
import messagesEn from "@/messages/en.json";
import { pageMetadata } from "@/lib/seo";

const dictionaries = { fr: messagesFr, en: messagesEn };

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const isFrench = locale === "fr";
  return pageMetadata({
    locale,
    title: isFrench ? "Contact et devis à Abidjan" : "Contact and quotes in Abidjan",
    description: isFrench
      ? "Contactez Baobab pour un devis : agence numérique à Dokui, Abobo, Abidjan. Téléphone, email et itinéraire."
      : "Contact Baobab for a quote: digital agency in Dokui, Abobo, Abidjan. Phone, email and directions.",
    frPath: "/fr/contact",
    enPath: "/en/contact",
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!locales.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;
  const dict = dictionaries[locale];
  const copy = dict.contact;
  const homeCopy = dict.home;
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const encodedDestination = encodeURIComponent(getMapDestination());
  const googleDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodedDestination}`;
  const wazeDirections = `https://waze.com/ul?q=${encodedDestination}&navigate=yes`;
  const whatsapp = getWhatsAppUrl();

  return <>
    <SiteHeader locale={locale} copy={homeCopy} page="contact" address={agencyContact.address} phone={agencyContact.phone} email={agencyContact.email} socials={agencyContact.socialLinks} />
    <main>
      <section className="bg-cream px-5 py-14 sm:px-8 md:py-20"><div className="mx-auto max-w-7xl"><Heading as="h1" eyebrow={copy.eyebrow}>{copy.title}</Heading><p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{copy.subtitle}</p></div></section>
      <section className="px-5 py-14 sm:px-8 md:py-20"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_.9fr]">
        <Card><h2 className="font-display text-2xl font-extrabold text-navy">{copy.formTitle}</h2><p className="mb-6 mt-2 text-sm text-muted">{copy.formIntro}</p><ContactForm copy={copy} locale={locale} nonce={nonce} /></Card>
        <div className="grid content-start gap-6"><Card><h2 className="font-display text-2xl font-extrabold text-navy">{copy.locationTitle}</h2><p className="mt-4 text-lg font-semibold text-navy">{agencyContact.address}</p>
          {agencyContact.latitude === null && <p className="mt-2 text-sm text-muted">{copy.mapNote}</p>}
          <div className="mt-5"><MapEmbed copy={copy} query={getMapDestination()} /></div>
          <div className="mt-4 flex flex-wrap gap-3"><a className="text-sm font-bold text-navy underline decoration-coral decoration-2 underline-offset-4" href={googleDirections} rel="noreferrer" target="_blank">{copy.googleMaps} · {copy.directions} ↗</a><a className="text-sm font-bold text-navy underline decoration-coral decoration-2 underline-offset-4" href={wazeDirections} rel="noreferrer" target="_blank">Waze · {copy.directions} ↗</a></div>
          {whatsapp && <ButtonLink className="mt-5" href={whatsapp} rel="noreferrer" target="_blank" variant="secondary">{copy.whatsapp} ↗</ButtonLink>}
        </Card>
        <Card><h2 className="font-display text-xl font-extrabold text-navy">{copy.directContact}</h2><dl className="mt-4 grid gap-3 text-sm"><div><dt className="font-semibold text-muted">{copy.email}</dt><dd>{agencyContact.email ? <a className="text-navy underline" href={`mailto:${agencyContact.email}`}>{agencyContact.email}</a> : copy.notProvided}</dd></div><div><dt className="font-semibold text-muted">{homeCopy.phone}</dt><dd>{agencyContact.phone ? <a className="text-navy underline" href={`tel:${agencyContact.phone}`}>{agencyContact.phone}</a> : copy.notProvided}</dd></div><div><dt className="font-semibold text-muted">{copy.hours}</dt><dd>{agencyContact.hours ?? copy.notProvided}</dd></div><div><dt className="font-semibold text-muted">{copy.timeZone}</dt><dd>{agencyContact.timeZone}</dd></div></dl></Card></div>
      </div></section>
    </main>
    <SiteFooter locale={locale} copy={homeCopy} email={agencyContact.email} socials={agencyContact.socialLinks} />
  </>;
}

"use client";

import { useState } from "react";
import Link from "next/link";
import frenchMessages from "@/messages/fr.json";
import englishMessages from "@/messages/en.json";
import { Logo } from "@/components/brand/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { Heading } from "@/components/ui/heading";
import { Modal } from "@/components/ui/modal";
import { Section } from "@/components/ui/section";
import { Tabs, type TabItem } from "@/components/ui/tabs";

const swatches = [
  { token: "navy", className: "bg-navy" },
  { token: "navy-deep", className: "bg-navy-deep" },
  { token: "cream", className: "bg-cream" },
  { token: "paper", className: "bg-paper" },
  { token: "stone", className: "bg-stone" },
  { token: "coral", className: "bg-coral" },
] as const;

type Widen<T> = { [Key in keyof T]: T[Key] extends string ? string : Widen<T[Key]> };
type DemoCopy = Widen<typeof frenchMessages.designSystem>;

export default function DesignSystemDemo({ locale }: { locale: "fr" | "en" }) {
  const [modalOpen, setModalOpen] = useState(false);
  const t: DemoCopy = locale === "en" ? englishMessages.designSystem : frenchMessages.designSystem;
  const openModal = () => setModalOpen(true);
  const tabItems: TabItem[] = [
    { id: "components", label: t.components, content: <ComponentSamples t={t} onOpen={openModal} /> },
    { id: "interactions", label: t.interactions, content: <InteractionSamples t={t} onOpen={openModal} /> },
    { id: "form", label: t.form, content: <FormField id="demo-email-tab" label={t.fieldLabel} hint={t.fieldHint} inputProps={{ type: "email", placeholder: t.fieldPlaceholder }} /> },
  ];

  return (
    <main>
      <header className="border-b border-navy/10 bg-paper px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Logo />
          <nav className="flex items-center gap-2" aria-label={locale === "en" ? "Language selection" : "Sélection de langue"}>
            <Link className={`rounded-lg px-3 py-2 text-sm font-bold ${locale === "fr" ? "bg-navy text-cream" : "text-navy hover:bg-stone"}`} href="/fr/design-system" lang="fr">FR</Link>
            <Link className={`rounded-lg px-3 py-2 text-sm font-bold ${locale === "en" ? "bg-navy text-cream" : "text-navy hover:bg-stone"}`} href="/en/design-system" lang="en">EN</Link>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-navy px-5 py-16 text-cream sm:px-8 md:py-24">
        <div aria-hidden="true" className="baobab-pattern pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-cream/75">{t.eyebrow}</p>
            <h1 className="font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.065em] text-cream sm:text-6xl lg:text-7xl">{t.heroTitle}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/85">{t.heroBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="inline-flex min-h-12 items-center justify-center rounded-xl bg-coral px-5 py-3 text-sm font-bold text-navy-deep hover:bg-coral-hover" href="#components">{t.mainAction}</a>
              <button className="inline-flex min-h-12 items-center justify-center rounded-xl border border-cream/35 px-5 py-3 text-sm font-bold text-cream hover:bg-cream/10" onClick={openModal} type="button">{t.secondaryAction}</button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:justify-self-end">
            <div aria-hidden="true" className="absolute -bottom-4 -left-4 h-full w-full rounded-[2rem] bg-coral" />
            <div className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/15 bg-cream p-7 text-navy shadow-card sm:p-9">
              <span className="font-display text-sm font-extrabold uppercase tracking-[0.18em]">{t.brandLine}</span>
              <span aria-hidden="true" className="self-center font-display text-[8rem] font-extrabold leading-none tracking-[-0.1em] text-navy/10 sm:text-[10rem]">B</span>
              <div className="flex items-end justify-between gap-4">
                <p className="max-w-52 font-display text-xl font-extrabold leading-tight tracking-tight">{t.visualCaption}</p>
                <span className="font-display text-5xl font-extrabold tracking-[-0.08em] text-coral-hover">01</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section id="palette" tone="paper" width="wide">
        <Heading eyebrow={t.palette} number="01">{t.paletteHeadline}</Heading>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {swatches.map((swatch) => (
            <Card className="overflow-hidden p-0" key={swatch.token}>
              <div className={`h-24 border-b border-navy/10 ${swatch.className}`} />
              <div className="flex items-start justify-between gap-3 p-5">
                <div><h3 className="font-bold text-navy">{t.swatches[swatch.token]}</h3><code className="mt-1 block text-xs text-muted">--color-{swatch.token}</code></div>
                <span className="font-mono text-xs text-muted">{"var(--color-" + swatch.token + ")"}</span>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-cream p-6"><p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{t.contrastHeading}</p><p className="mt-2 font-semibold text-ink">{t.contrastBody}</p><p className="mt-1 text-sm text-muted">{t.contrastNote}</p></div>
          <div className="rounded-2xl bg-coral p-6 text-navy-deep"><p className="text-xs font-bold uppercase tracking-[0.14em]">{t.actionHeading}</p><p className="mt-2 font-semibold">{t.actionBody}</p><p className="mt-1 text-sm">{t.actionNote}</p></div>
        </div>
      </Section>

      <Section tone="cream" width="wide">
        <Heading eyebrow={t.typography} number="02">{t.headingSample}</Heading>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card><p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-muted">{t.displayFontLabel}</p><p className="font-display text-4xl font-extrabold leading-none tracking-[-0.06em] text-navy sm:text-5xl">Aa Bb 0123</p><p className="mt-4 text-sm text-muted">{t.displayFontNote}</p></Card>
          <Card><p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-muted">{t.bodyFontLabel}</p><p className="max-w-xl text-lg leading-8 text-ink">{t.bodySample}</p><p className="mt-4 text-sm text-muted">{t.bodyFontNote}</p></Card>
        </div>
      </Section>

      <Section id="components" width="wide">
        <Heading eyebrow={t.elements} number="03">{t.elementsHeadline}</Heading>
        <div className="mt-8 rounded-3xl border border-navy/10 bg-white p-5 shadow-card sm:p-8">
          <Tabs items={tabItems} label={t.elements} />
        </div>
      </Section>

      <Section tone="navy" width="wide">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-cream/70">{t.footer}</p><h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-cream">Baobab</h2></div>
          <div className="flex flex-wrap items-center gap-6"><Logo tone="light" /><span className="text-sm text-cream/70">{t.logoNote}</span></div>
        </div>
      </Section>

      <Modal closeLabel={t.close} open={modalOpen} onClose={() => setModalOpen(false)} title={t.modalTitle}>
        <p className="leading-7 text-muted">{t.modalBody}</p>
        <div className="mt-6"><Button onClick={() => setModalOpen(false)}>{t.close}</Button></div>
      </Modal>
    </main>
  );
}

function ComponentSamples({ t, onOpen }: { t: DemoCopy; onOpen: () => void }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{t.components}</p>
        <div className="mt-5 flex flex-wrap items-center gap-3"><Button>{t.mainAction}</Button><Button variant="secondary">{t.secondaryAction}</Button><Badge tone="coral">2026</Badge><Badge>Baobab</Badge><Badge tone="navy">Abidjan</Badge></div>
      </Card>
      <Card className="relative mt-3">
        <span aria-hidden="true" className="absolute -right-3 -top-3 -z-10 h-full w-full rounded-2xl bg-coral/55" />
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{t.cardLabel}</p>
        <h3 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-navy">{t.cardTitle}</h3>
        <p className="mt-3 leading-7 text-muted">{t.cardBody}</p>
      </Card>
      <Card>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{t.form}</p>
        <div className="mt-4"><FormField id="demo-email" label={t.fieldLabel} hint={t.fieldHint} inputProps={{ type: "email", placeholder: t.fieldPlaceholder }} /></div>
      </Card>
      <div className="flex flex-wrap items-center gap-4"><Button onClick={onOpen}>{t.open}</Button><p className="outlined-demo-number font-display text-5xl font-extrabold tracking-[-0.08em] text-transparent">02</p></div>
    </div>
  );
}

function InteractionSamples({ t, onOpen }: { t: DemoCopy; onOpen: () => void }) {
  return <div className="flex flex-wrap items-center gap-4"><Button onClick={onOpen}>{t.open}</Button><p className="text-sm text-muted">{t.modalBody}</p></div>;
}

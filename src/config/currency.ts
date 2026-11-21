/**
 * Indicative public conversion only; XOF is the quoted price currency.
 * BCEAO reference rate: 596.8700 XOF per USD on 2026-11-20.
 */
export const usdReference = {
  xofPerUsd: 596.87,
  date: "2026-11-20",
  displayDateFr: "20 novembre 2026",
  displayDateEn: "20 November 2026",
  sourceUrl: "https://downloads.bceao.int/index.php/fr/cours/cours-de-reference-des-principales-devises-contre-Franc-CFA",
} as const;

export function formatIndicativeUsd(amountXof: number) {
  const usd = Math.round(amountXof / usdReference.xofPerUsd);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(usd);
}

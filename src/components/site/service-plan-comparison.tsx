import { formatIndicativeUsd, usdReference } from "@/config/currency";
import type { Locale, ServicePlanCatalog } from "@/content/schema";

export function ServicePlanComparison({ catalog, locale }: { catalog: ServicePlanCatalog; locale: Locale }) {
  const labels = catalog.featureLabels[locale];
  const notIncluded = locale === "fr" ? "Non inclus" : "Not included";
  const tableLabel = locale === "fr" ? "Comparatif des formules de présence en ligne" : "Online presence plan comparison";
  const scrollHint = locale === "fr"
    ? "Faites défiler le tableau horizontalement sur petit écran."
    : "Scroll the table horizontally on narrow screens.";
  const priceDate = locale === "fr" ? usdReference.displayDateFr : usdReference.displayDateEn;

  return <div className="mt-8">
    <p className="mb-3 text-sm text-muted md:hidden">{scrollHint}</p>
    <div aria-label={tableLabel} className="plan-table-scroll" role="region" tabIndex={0}>
      <table className="plan-table">
        <caption className="sr-only">{tableLabel}</caption>
        <thead><tr>
          <th scope="col">{locale === "fr" ? "Inclus" : "Included"}</th>
          {catalog.plans.map((plan) => <th scope="col" key={plan.id}>
            <span className="plan-name">{plan.translations[locale].name}</span>
            <span className="plan-price">{new Intl.NumberFormat(locale === "fr" ? "fr-CI" : "en-US").format(plan.amountXof)} {locale === "fr" ? "FCFA" : "XOF"} HT</span>
            <span className="plan-price-detail">≈ {formatIndicativeUsd(plan.amountXof)} USD / {locale === "fr" ? "mois" : "month"}</span>
          </th>)}
        </tr></thead>
        <tbody>{catalog.featureKeys.map((key) => <tr key={key}>
          <th scope="row">{labels[key]}</th>
          {catalog.plans.map((plan) => <td key={plan.id}>{plan.translations[locale].features[key] ?? <span className="not-included">{notIncluded}</span>}</td>)}
        </tr>)}</tbody>
      </table>
    </div>
    <ul className="mt-5 grid gap-2 text-sm leading-6 text-muted">{catalog.terms[locale].map((term) => <li key={term}>• {term}</li>)}</ul>
    <p className="mt-3 text-xs text-muted">{locale === "fr" ? "Équivalent USD indicatif au taux de référence du " : "Indicative USD conversion using the reference rate dated "}{priceDate}. {locale === "fr" ? "Le tarif FCFA HT prévaut." : "The XOF price excluding tax takes precedence."}</p>
  </div>;
}

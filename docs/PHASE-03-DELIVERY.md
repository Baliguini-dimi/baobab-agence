# Phase 3 — pages clés et animations

## Pages livrées

- `/fr` et `/en` : accueil localisé, raccourcis, faits validés, offres et tarifs, schéma IA, couverture médiatique, présence en ligne, aperçu éditorial des réalisations, blog et pied de page.
- `/fr/contact` et `/en/contact` : formulaire prototype sans envoi ni stockage, liens téléphone/email/WhatsApp, itinéraires Google Maps et Waze, et carte intégrée chargée uniquement après clic.
- Les pages localisées héritent de `noindex, nofollow` et exposent les alternates `hreflang` français/anglais.

## Contenu et coordonnées

- Les offres et leurs prix restent dans `src/content/data/offers.json` et utilisent `getOffers()`.
- Les réalisations, articles et témoignages sont lus via leurs fonctions d’accès. La section témoignages reste absente tant qu’aucun témoignage publié et autorisé n’existe.
- Le taux USD indicatif et sa date sont centralisés dans `src/config/currency.ts`; le prix en FCFA HT reste prioritaire.
- Les coordonnées fournies sont centralisées dans `src/config/contact.ts`. Les horaires d’ouverture et liens des réseaux ne sont pas renseignés. Les icônes sociales sont visibles comme espaces réservés sans lien.
- Le repère GPS saisi depuis le lien partagé est `5.4040088, -4.0008089`.

## Mouvement et garde-fous

- Révélations au défilement, parallaxe légère, bandeau incliné, schéma IA, badge tournant, cartes réactives et onglets avec changements de panneau animés.
- Les animations utilisent `transform` et `opacity`, sont limitées à 300–700 ms sauf les boucles décoratives lentes, et sont réduites via `prefers-reduced-motion`.
- Aucun compteur quantitatif n’est appliqué : les faits disponibles ne justifient pas un compteur sans déformer leur sens.
- Aucun client, résultat, témoignage ou visuel de réalisation n’a été inventé.

## Validation

- `npm run lint` : réussi.
- `npm run build` : réussi, pages FR/EN pré-générées.
- Réponses HTTP locales : `/fr`, `/en`, `/fr/contact`, `/en/contact` renvoient 200, contiennent `noindex`; les pages contact contiennent les liens et coordonnées fournis. La carte n’est pas dans le HTML initial.
- Revue visuelle navigateur non effectuée dans cette phase.

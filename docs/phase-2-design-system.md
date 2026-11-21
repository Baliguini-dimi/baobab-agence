# Phase 2 — Système visuel proposé

La proposition est volontairement éditoriale : marine institutionnel, surfaces crème/papier, gris doux et accent corail. La maquette emploie un bloc décalé, un motif discret, des numéros, des cartes à ombre douce et un logo provisoire uniquement textuel.

## Palette à valider

| Token | Valeur | Usage proposé |
| --- | --- | --- |
| `navy` | `#102B46` | Couleur dominante, titres et fonds institutionnels |
| `navy-deep` | `#0A1D30` | Fonds profonds et texte sur corail |
| `cream` | `#F5F0E6` | Fonds chauds |
| `paper` | `#FFFCF6` | Fond principal |
| `stone` | `#E9EDF0` | Surfaces grises et badges |
| `stone-deep` | `#D4DCE3` | Séparateurs et variations grises |
| `coral` | `#F47A63` | Boutons et détails, avec texte foncé |
| `coral-hover` | `#DE604B` | État de survol des boutons |
| `ink` | `#14202B` | Texte courant |
| `muted` | `#526273` | Texte secondaire |

Contrastes calculés pour les paires principales : marine sur crème `12.70:1`, encre sur papier `16.13:1`, secondaire sur crème `5.51:1`, texte marine profond sur corail `6.34:1` et focus sur papier `7.19:1`. Elles dépassent le seuil WCAG AA de texte courant. L’accent corail ne sert pas de texte courant sur les fonds clairs.

Tous les tokens couleur, typographiques, ombres et le motif sont centralisés dans `src/styles/tokens.css`. Le fichier importe Tailwind CSS 4 et expose ses variables à Tailwind via `@theme`; cela garde les valeurs visuelles dans un seul fichier sans configuration JavaScript séparée.

## Composants inclus

`Button`, `Card`, `Section`, `Heading`, `Badge`, `Tabs`, `Modal`, `FormField` et le mot-symbole provisoire `Logo`. Tabs accepte les flèches gauche/droite; Modal s’appuie sur `<dialog>` natif. Les composants évitent d’imposer une API de marque ou un logo final.

## Démonstration

La page `/fr/design-system` et sa version anglaise `/en/design-system` montrent la palette, les polices Manrope et Inter chargées via `next/font`, les boutons, badges, cartes, tabs, fenêtre modale et champ de formulaire. La racine redirige vers `/fr` sans géolocalisation; pendant cette phase de démonstration, `/fr` et `/en` redirigent vers la page du système visuel. Les deux racines de layout gardent `noindex, nofollow`.

Cette étape ajoute la fondation Next.js 16 et Tailwind CSS 4 afin que la démo soit exécutable. Aucun déploiement ni push n’a lieu dans cette phase.

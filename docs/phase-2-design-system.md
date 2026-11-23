# Phase 2 - Systeme visuel adopte

Direction visuelle éditoriale : marine institutionnel, surfaces crème et papier, gris doux et accent orange. Le baobab est le symbole de marque.

## Palette de marque

| Token | Valeur | Usage |
| --- | --- | --- |
| `navy` | `#102A43` | Titres, navigation et fonds identitaires |
| `navy-deep` | `#0A1D30` | Fonds sombres, notamment la barre haute et le pied de page |
| `cream` | `#F8F3E8` | Fonds chauds et logo clair sur marine |
| `paper` | `#FFFCF6` | Fond principal |
| `stone` | `#E9EDF0` | Surfaces grises |
| `stone-deep` | `#D4DCE3` | Séparateurs |
| `accent` | `#F17620` | Boutons pleins et petits détails |
| `accent-hover` | `#F88431` | Survol des boutons |
| `ink` | `#14202B` | Texte courant |
| `muted` | `#526273` | Texte secondaire |

## Contrastes WCAG calculés

- Texte marine `#102A43` sur crème `#F8F3E8` : **13,23:1** (AA/AAA).
- Texte marine sur orange `#F17620` : **5,13:1** (AA). Le bouton utilise ce couple de couleurs.
- Texte navy-deep `#0A1D30` sur orange : **5,97:1** (AA).
- Orange sur crème : **2,58:1**. Il ne convient pas au texte ni aux filets fins sur crème.
- Indicateur actif du header : filet marine sur crème, **13,23:1**, au-dessus du seuil non textuel de 3:1.
- Focus `#145B83` sur crème : **6,65:1**. Logo crème sur marine deep : **15,41:1**.

Les tokens couleur, typographiques et les ombres sont centralises dans `src/styles/tokens.css`, exposes a Tailwind CSS 4 par `@theme`. Les alias `coral` gardent intacte la classe existante du bouton de formulaire ; ils pointent vers l accent orange. Le composant et la logique du formulaire ne sont pas modifies dans cette phase.

## Composants et typographie

Composants partages : `Button`, `Card`, `Section`, `Heading`, `Badge`, `Tabs`, `Modal`, `FormField` et `Logo`. Plus Jakarta Sans est chargee avec `next/font`.

## Logo, icônes et partage

Les six fichiers fournis par le propriétaire sont conservés dans `public/brand/`. La version claire est marine/orange ; la version sombre est crème/orange. Les versions horizontales combinent les tracés d'origine avec `clipPath` sans en modifier la géométrie. Le composant de marque charge le SVG avec `<img>` et des dimensions explicites.

Les variantes monochrome et symbole seul sont fournies. `app/icon.svg` est simplifie pour rester lisible a 16 px ; `app/favicon.ico` comporte les tailles 16, 32 et 48 px. Les PNG sont `app/apple-icon.png` (180), `app/icon1.png` (192) et `app/icon2.png` (512).

L'image `public/brand/baobab-partage-1200x630.png` alimente Open Graph et Twitter. `SITE_URL` configure `metadataBase` et les valeurs `og:url` absolues ; `VERCEL_URL` est utilisé en Preview quand `SITE_URL` n'est pas défini.

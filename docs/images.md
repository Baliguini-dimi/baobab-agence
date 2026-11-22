# Registre des images Baobab

Mis à jour le 22 novembre 2026. Ce registre suit les fichiers joints à la demande et les emplacements de l’inventaire source. Les six JPG supplémentaires présents dans le dossier Downloads mais non joints à la demande ne sont pas intégrés.

## Règles de publication

- Les images fournies sont des maquettes générées par IA. Elles servent à l’aperçu de développement uniquement ; elles ne prouvent ni l’existence des locaux, ni la composition de l’équipe, ni une prestation réalisée.
- `BAOBAB_PREVIEW_MOCKUPS=false` par défaut. Dans une Preview Vercel ou en développement seulement, cette variable serveur affiche les visuels ayant une destination confirmée : hero, illustrations de travail, exemples de couverture média et interfaces de démonstration. Le hero n’affiche plus de légende ; les autres légendes précisent qu’il s’agit d’illustrations, sans les présenter comme l’équipe ou des prestations réalisées par Baobab.
- Chaque image a `origine = générée`, `accord de publication = à obtenir` et `publiable = non`. Ne pas activer la variable sur un site public.
- Les JPG sources restent hors dépôt. Les WebP sont réencodés sans métadonnées. Les originaux vérifiés ne contenaient aucun champ EXIF.
- Le composant `next/image` réserve les dimensions intrinsèques. Le hero est chargé en différé : il n’est pas préchargé, puisque le titre reste l’élément LCP sur mobile.

## Fichiers préparés

| Fichier WebP | Source | Description honnête / alt FR | Alt EN | Destination envisagée | Dimensions / ratio | Origine | Accord | Publiable | Limites |
|---|---|---|---|---|---|---|---|---|---|
| `public/images/mockups/hero-equipe-travail.webp` | `photo_2026-11-22_15-29-15.jpg` | Quatre personnes travaillent autour d’une table avec des ordinateurs portables dans un bureau lumineux. | Four people work around a table with laptops in a bright office. | Hero de l’accueil (Preview seulement) | 1280 × 853 · 3:2 · 83 580 octets | générée | à obtenir | non | Ne pas interpréter comme une photo de l’équipe réelle. |
| `public/images/mockups/equipe-en-action.webp` | `photo_2026-11-22_15-29-14.jpg` | Des personnes échangent autour d’un ordinateur dans un bureau lumineux. | People discuss around a computer in a bright office. | À propos / équipe en action | 1280 × 853 · 3:2 · 72 812 octets | générée | à obtenir | non | Ne pas présenter comme l’équipe réelle de Baobab. |
| `public/images/mockups/equipe-groupe.webp` | `photo_2026-11-22_15-29-12.jpg` | Un groupe de personnes pose dans un bureau lumineux. | A group of people pose in a bright office. | Équipe | 1280 × 720 · 16:9 · 71 018 octets | générée | à obtenir | non | Identités et appartenance à l’équipe non confirmées. |
| `public/images/mockups/portrait-candidat-15-29-11.webp` | `photo_2026-11-22_15-29-11.jpg` | Portrait d’un homme assis dans un bureau, portant une chemise bleu marine. | Portrait of a man seated in an office, wearing a navy shirt. | Portrait candidat, rôle à confirmer | 1024 × 1280 · 4:5 · 38 548 octets | générée | à obtenir | non | Aucun nom ni rôle attribué. |
| `public/images/mockups/portrait-candidat-15-29-10.webp` | `photo_2026-11-22_15-29-10.jpg` | Portrait d’un homme assis dans un bureau, portant une chemise bleu marine. | Portrait of a man seated in an office, wearing a navy shirt. | Portrait candidat, rôle à confirmer | 1024 × 1280 · 4:5 · 37 482 octets | générée | à obtenir | non | Aucun nom ni rôle attribué. |
| `public/images/mockups/portrait-candidat-15-29-09.webp` | `photo_2026-11-22_15-29-09.jpg` | Portrait d’un homme en costume bleu, assis dans un bureau. | Portrait of a man in a navy suit, seated in an office. | Portrait candidat, rôle à confirmer | 819 × 1024 · 4:5 · 39 026 octets | générée | à obtenir | non | Recadré au centre sur le visage ; aucun nom ni rôle attribué. |
| `public/images/mockups/portrait-candidat-15-29-07.webp` | `photo_2026-11-22_15-29-07.jpg` | Portrait d’un homme portant des lunettes et un polo noir, assis dans un bureau. | Portrait of a man wearing glasses and a black polo, seated in an office. | Portrait candidat, rôle à confirmer | 1024 × 1280 · 4:5 · 38 640 octets | générée | à obtenir | non | Aucun nom ni rôle attribué. |
| `public/images/mockups/couverture-mariage.webp` | `photo_2026-11-22_15-29-02.jpg` | Un photographe prend une photo d’un couple lors d’une cérémonie traditionnelle. | A photographer takes a picture of a couple at a traditional ceremony. | Couverture médiatique | 1280 × 853 · 3:2 · 76 338 octets | générée | à obtenir | non | Scène illustrative, pas une couverture réalisée par Baobab. |
| `public/images/mockups/couverture-studio.webp` | `photo_2026-11-22_15-29-00.jpg` | Un photographe réalise le portrait d’une femme dans un studio équipé d’éclairages. | A photographer takes a woman’s portrait in a studio with lighting equipment. | Couverture médiatique | 1280 × 853 · 3:2 · 67 772 octets | générée | à obtenir | non | Scène illustrative, pas une séance réalisée par Baobab. |
| `public/images/mockups/projet-bankflow-demo.webp` | `photo_2026-11-22_15-28-58.jpg` | Un ordinateur et un téléphone affichent une interface fictive de suivi bancaire. | A laptop and a phone display a fictional banking dashboard. | Démonstration de solution numérique | 1280 × 801 · 16:10 · 79 980 octets | générée | à obtenir | non | Données et produit fictifs ; ne pas appeler projet client. |
| `public/images/mockups/projet-mediatheque-demo.webp` | `photo_2026-11-22_15-28-54.jpg` | Un ordinateur et un téléphone affichent une interface fictive de médiathèque. | A laptop and a phone display a fictional media library interface. | Démonstration de solution numérique | 1280 × 801 · 16:10 · 77 102 octets | générée | à obtenir | non | Données et produit fictifs ; ne pas appeler projet client. |
| `public/images/mockups/projet-smartcampus-demo.webp` | `photo_2026-11-22_15-28-52.jpg` | Un ordinateur et un téléphone affichent une interface fictive de campus. | A laptop and a phone display a fictional campus interface. | Démonstration de solution numérique | 1280 × 801 · 16:10 · 74 442 octets | générée | à obtenir | non | Données et produit fictifs ; ne pas appeler projet client. |

## Emplacements de l’inventaire sans image intégrée

| Emplacement | État | Fichier / source | Usage avant publication |
|---|---|---|---|
| Vue d’ensemble du bureau | absent du lot retenu | — | Fournir une photo réelle autorisée ; l’image d’extérieur `15-28-50` est explicitement exclue et fictive. |
| Fondateur | rôle non attribué | portraits candidats ci-dessus | Confirmer la source et le rôle ; obtenir l’accord écrit avant publication. |
| Responsables 01 à 03 | rôles non attribués | portraits candidats ci-dessus | Confirmer les correspondances et les fonctions ; obtenir chaque accord écrit. |
| Portrait pris pendant un événement | absent du lot retenu | `15-28-59` écarté | Fournir une photo réelle autorisée. |
| Équipe audiovisuelle en tournage | absent du lot retenu | `15-29-06` exclu | Fournir une photo réelle autorisée ; le fichier exclu ne sera pas intégré. |
| Extérieur des locaux | absent du lot retenu | `15-28-50` exclu | Fournir une photo réelle des locaux après vérification sur place. |

## Sources écartées à la demande

| Fichier source | Description | Emplacement prévu | Format source | Origine | Accord | Publiable | Décision |
|---|---|---|---|---|---|---|---|
| `photo_2026-11-22_15-29-06.jpg` | Interview filmée avec microphones et caméra. | Couverture médiatique | 1280 × 720 · 16:9 | générée | à obtenir | non | Exclus explicitement ; aucun fichier dérivé copié. |
| `photo_2026-11-22_15-28-50.jpg` | Façade fictive portant une enseigne Baobab. | Contact / locaux | 1280 × 853 · 3:2 | générée | à obtenir | non | Exclue explicitement ; ne représente pas les locaux réels. |
| `photo_2026-11-22_15-28-59.jpg` | Photographe et couple lors d’un événement extérieur. | Couverture médiatique | 1280 × 853 · 3:2 | générée | à obtenir | non | Rejetée ; aucun fichier dérivé copié. |

## Traitement et performance

Les fichiers intégrés respectent les limites demandées : hero ≤ 120 Ko, autres visuels ≤ 80 Ko, portraits ≤ 40 Ko. Le portrait `15-29-09` a été recadré en 4:5 centré sur le visage. Le hero utilise des dimensions intrinsèques 1280 × 853, `sizes` adapté à la grille desktop/mobile, `loading="lazy"` et aucun préchargement. Next.js sert AVIF ou WebP selon l’en-tête `Accept`.

Les interfaces de démonstration sont visibles sur l’accueil, les scènes de travail sur l’accueil et À propos, et les exemples de couverture sur la page Couverture médiatique, uniquement lorsque `BAOBAB_PREVIEW_MOCKUPS=true` dans Preview/développement. Les quatre portraits restent préparés mais masqués tant que les personnes, rôles et correspondances ne sont pas confirmés.

### Lighthouse mobile sur la Preview `/fr`

Mesure locale Lighthouse 13.6.0 / Chrome, simulation mobile, après le déploiement de la galerie (22 novembre 2026) :

| Passage | Performance | LCP | CLS |
|---|---:|---:|---:|
| 1 | 77 | 3 195 ms | 0 |
| 2 | 92 | 2 255 ms | 0 |
| 3 | 92 | 2 369 ms | 0 |
| Médiane | **92** | **2 369 ms** | **0** |

Les médianes satisfont les seuils demandés (LCP < 2,5 s, CLS 0, performance ≥ 85), malgré une variabilité notable du premier passage. L’API PageSpeed Insights a répondu 429 ; il s’agit donc de Lighthouse local sur l’URL publique de Preview, pas d’un rapport PSI.

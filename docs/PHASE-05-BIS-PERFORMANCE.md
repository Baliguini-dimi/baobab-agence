# Phase 5 bis — Performance de l’accueil FR

## Résumé exécutif

- Le candidat LCP est le H1 du hero (« Des solutions numériques qui font grandir vos idées. »), et non l’illustration: elle est dessinée en SVG inline et aucune image raster n’est chargée sur l’accueil.
- Le problème est principalement le délai de rendu sur le thread principal; le TTFB seul ne l’explique pas.
- Les optimisations d’animation ont été appliquées sans toucher à la CSP. Trois mesures locales après changement ne montrent pas de gain LCP statistiquement convaincant et restent au-dessus de 2,5 s.
- Les mesures demandées sur Preview Vercel sont bloquées: l’API Vercel répond 403. Aucun push de branche n’a été autorisé dans cette étape.
- L’INP n’est pas mesurable par ces passages Lighthouse de laboratoire. Le mesurer après lancement avec données terrain, par exemple CrUX ou une collecte RUM déclenchée après consentement.

## Diagnostic LCP

Lighthouse 12.8.2 sur Chrome en émulation mobile identifie le même élément pour les trois passages avant et après: le H1 du hero. L’illustration est un SVG intégré au HTML (pas de requête image à prioriser ni de dimensions d’image à ajuster). Les deux fichiers de polices auto-hébergés `next/font` sont déjà préchargés à priorité haute; la CSS est un fichier local de 9,5 Ko. Les scripts du document sont asynchrones et à priorité basse. Aucun script tiers ne se charge sur l’accueil; le script Turnstile est limité au formulaire de contact via `afterInteractive`.

Sur les traces, le retard se situe après le premier octet: la phase de rendu représente environ 84 % du LCP dans le détail Lighthouse. Une mesure montre un long blocage de 713 ms attribué au document; une autre relève 622 ms dans un chunk Next.js d’environ 72 Ko, juste avant la peinture LCP. TBT médian est autour de 0,8–0,9 s. Ces valeurs et la variabilité du TTFB (environ 55–521 ms avant changement) indiquent que l’hydratation et le travail de rendu sont des causes à traiter en priorité; la CSP ajoute un rendu serveur dynamique, mais ne suffit pas à expliquer tout le délai.

Le H1 était enveloppé dans un composant de reveal dont l’opacité dépendait de l’initialisation client. Cette dépendance a été retirée du contenu critique. Les reveals secondaires sont maintenant des enveloppes serveur, observées par un unique `IntersectionObserver` client. Cette réduction n’a pas produit d’amélioration LCP mesurable dans les trois passages locaux; elle simplifie toutefois les observateurs et élimine l’attente d’animation du H1.

## Mesures avant / après

Lighthouse 12.8.2, Chrome, mode mobile par défaut, serveur Next.js local en production, URL `http://127.0.0.1:3005/fr`. Les trois passages ont été effectués avant et après les changements; médiane calculée sur trois valeurs.

| Mesure | Avant (médiane) | Après (médiane) | Lecture |
| --- | ---: | ---: | --- |
| Performance | 74/100 | 72/100 | Variation labo; pas de gain confirmé |
| LCP | 3,029 ms | 3,105 ms | +76 ms; objectif < 2,500 ms non atteint |
| FCP | 1,451 ms | 981 ms | Amélioration médiane; dispersion importante |
| TBT | 817 ms | 907 ms | +90 ms; TBT est seulement un indicateur labo |
| CLS | 0 | 0 | Stable |
| INP | Non mesuré | Non mesuré | Nécessite des interactions/données terrain |

Après changement, LCP varie de 2,883 à 3,145 ms. Les passages avant varient de 2,914 à 3,035 ms. Avec seulement trois échantillons et un TTFB très variable, ce petit écart ne prouve ni une régression stable ni un gain. La cible reste manquée.

**Aucun passage Vercel Preview n’a été effectué.** Le partage d’accès Vercel a répondu `403 forbidden`; une approbation de lien à usage unique est nécessaire. En outre, les règles du dépôt demandent un accord avant tout push. Les nombres ci-dessus sont donc exclusivement locaux, et ne remplacent pas la médiane de trois mesures Preview demandée.

## CSP: options chiffrées

Le layout localisé appelle `connection()` et lit les en-têtes afin d’ajouter le nonce au JSON-LD. Au build, les six motifs localisés (`/[locale]`, `/[locale]/[section]`, `/[locale]/[section]/[slug]`, contact, cookies, design-system) sont marqués dynamiques (`ƒ`). Les ressources de contenu sont locales et le site n’a pas besoin de rendu par visiteur pour l’accueil.

| Option | Sécurité et architecture | Ordre de grandeur mesuré/attendu | Coût et réserve |
| --- | --- | --- | --- |
| **A — pages prérendues, CSP sans nonce** | Supprimer le nonce sur les routes publiques, prérendre les URL FR/EN et conserver une politique sans `unsafe-inline`. Une approche à base de SRI/hachages doit couvrir les scripts Next.js et les blocs JSON-LD; conserver `frame-ancestors 'none'`, les sources Google Maps dans `frame-src` uniquement, et les domaines Turnstile strictement nécessaires. | Bénéfice principal: HTML prérendu et cacheable au CDN pour les six motifs localisés au lieu d’un rendu par requête. Dans les mesures locales, le TTFB dynamique médian était 64 ms (un passage à 521 ms); même un gain de 64 ms ne ferait passer le LCP médian que d’environ 3,03 s à 2,97 s. Le seuil < 2,5 s dépend encore du retard de rendu. Ce n’est pas une mesure Vercel. | Changement CSP et de stratégie de rendu à valider; Next.js documente SRI comme expérimental. Il faut générer/valider les hachages des JSON-LD et vérifier le comportement Preview, formulaire et scripts. Aucun changement de ce type n’a été appliqué. |
| **B — nonce conservé, optimisation du rendu** | Conserver CSP actuelle et le rendu dynamique; enlever le reveal du H1 et mutualiser l’observateur des reveals. Aucun droit d’exécution inline supplémentaire et aucune réduction de sécurité. | Le TTFB médian de laboratoire reste une faible part du LCP (~64 ms au passage de référence, avec variance); la trace montre jusqu’à 622 ms de tâche longue dans un chunk Next.js et un délai de peinture supérieur à 2,5 s. Les changements exécutés n’ont pas baissé le LCP médian local (3,029 s → 3,105 s). | La cible LCP exige une optimisation supplémentaire du chemin client/hydratation. Une vérification de trois passages Preview reste à faire quand l’accès Vercel et l’autorisation de publier la branche seront disponibles. |

**Recommandation: B pour l’instant**, car elle préserve la défense CSP stricte sans exception et supprime déjà le reveal du texte critique. Les mesures montrent que le nonce n’est pas la seule cause et que retirer le nonce ne suffirait probablement pas à récupérer les ~605 ms manquants. Si les trois mesures Preview montrent ensuite un TTFB dominant, préparer A comme changement séparé, avec validation complète de SRI/JSON-LD et accord préalable. L’option A n’est pas appliquée.

## Optimisations et limites

- H1 et CTA du hero rendus visibles sans attendre l’IntersectionObserver; le reveal décoratif du hero reste inchangé.
- Les wrappers ScrollReveal sont rendus côté serveur; un observer partagé prend en charge les reveals sur l’accueil.
- `next/font` utilise déjà `preload` par défaut pour Manrope et Inter; le HTML confirme les deux préchargements haute priorité. Aucun faux réglage de priorité d’image n’a été ajouté en l’absence d’image LCP.
- Les scripts Next sont livrés en `async` avec faible priorité. Turnstile ne se trouve pas sur l’accueil et est déjà différé après interaction sur le formulaire. Pas de script tiers à déplacer sur cette page.
- Aucun changement à `proxy.ts`, aux directives CSP, aux nonces, aux headers de sécurité ou à l’indexation.
- Lighthouse de laboratoire ne mesure pas INP. Après consentement et mise en ligne, surveiller CrUX (s’il y a assez de trafic) ou intégrer une solution RUM conforme au consentement, puis évaluer le 75e percentile mobile. Compléter par de vrais essais tactiles et clavier.

## Vérifications

- `npm run build`: réussi après modifications; les routes localisées restent dynamiques (`ƒ`), sans changement de politique CSP.
- `npm run lint`: réussi.
- Lighthouse mobile local: trois passages avant, trois après; éléments LCP et métriques inscrits ci-dessus.
- Mesures Preview Vercel: en attente d’accès Vercel et de l’accord de publication de cette branche.
- INP terrain: non disponible avant déploiement/visites réelles.

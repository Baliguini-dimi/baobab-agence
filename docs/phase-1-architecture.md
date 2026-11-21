# Phase 1 — Architecture et contenu

## Périmètre

- Next.js App Router, TypeScript et Tailwind CSS, prévu pour Vercel.
- Routes explicites `/fr/...` et `/en/...`; la racine mène à `/fr` sans détection du pays.
- Textes d’interface dans `src/messages/fr.json` et `src/messages/en.json`.
- Contenus éditoriaux chargés par des fonctions typées depuis `src/content/data/`.
- Chaque contenu publié contient ses champs français et anglais.
- `robots` et métadonnées globales en `noindex, nofollow` pendant le prototype.
- Aucun vrai client, avis, résultat, adresse de contact ni secret n’est ajouté.
- Pas de charte graphique, d’animations, d’intégration Supabase ou de formulaire connecté dans cette phase.

## Routes prévues

Sous `app/[locale]/` :

| Chemin | Contenu |
| --- | --- |
| `/` | Accueil |
| `/solutions-numeriques` | Solutions numériques |
| `/ia-automatisation` | IA et automatisation |
| `/presence-en-ligne` | Présence en ligne |
| `/couverture-mediatique` | Couverture médiatique |
| `/realisations` et `/realisations/[slug]` | Liste et détail des réalisations |
| `/a-propos` | Agence et équipe |
| `/blog` et `/blog/[slug]` | Liste et détail des articles |
| `/faq` | Questions fréquentes |
| `/contact` | Informations et demande de contact |
| `/mentions-legales` | Mentions légales |
| `/confidentialite` | Confidentialité |
| `/cookies` | Cookies |
| `/equipements` | Annonce « bientôt disponible » |

Les slugs localisés sont distincts pour chaque langue. Le sélecteur passe à l’URL traduite correspondante quand elle existe; sinon il mène à la page d’accueil de la langue choisie. Les métadonnées de chaque page exposent `hreflang` `fr` et `en` et une URL canonique localisée. Aucun middleware de géolocalisation n’est prévu.

## Arborescence cible

```text
app/
  [locale]/
    layout.tsx
    page.tsx
    solutions-numeriques/page.tsx
    ia-automatisation/page.tsx
    presence-en-ligne/page.tsx
    couverture-mediatique/page.tsx
    realisations/page.tsx
    realisations/[slug]/page.tsx
    a-propos/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx
    faq/page.tsx
    contact/page.tsx
    mentions-legales/page.tsx
    confidentialite/page.tsx
    cookies/page.tsx
    equipements/page.tsx
  robots.ts
src/
  components/             # composants partagés sans choix visuel imposé
  content/
    data/                  # JSON ou MDX local, champs FR et EN
    queries.ts             # API de lecture à conserver lors du changement de source
    schema.ts              # contrats TypeScript du contenu
  i18n/                    # locales, validation et sélection des messages
  messages/fr.json
  messages/en.json
  lib/                     # utilitaires indépendants de l’interface
```

## Modèle de contenu

Les types sont dans `src/content/schema.ts`. Les identifiants sont des chaînes stables; ils pourront être remplacés par des UUID Supabase sans faire dépendre l’interface de la source de données. Les traductions sont des champs FR/EN explicites. La structure relationnelle cible sépare chaque entité de ses traductions.

Une réalisation impose une classification `client`, `demo` ou `academique` et les quatre sections demandées. Pour une réalisation client, `writtenConsent` indique la présence de l’accord écrit; `clientName` reste absent et `anonymized` vaut `true` si l’accord ne permet pas d’identifier le client. Le statut `client` ne vaut donc jamais preuve d’autorisation à afficher un nom.

Les fichiers de données commencent vides afin de ne pas fabriquer de réalisations, articles, avis, offres détaillées ou membres d’équipe. Les intitulés fournis par Baobab pourront être saisis ensuite dans les fichiers sans modifier les composants consommateurs.

## Contrat d’accès aux données

`src/content/queries.ts` fournit `getProjects`, `getProjectBySlug`, `getPosts`, `getPostBySlug`, `getTestimonials`, `getOffers` et `getTeam`. Les appels reçoivent la locale et les composants ne lisent jamais directement les fichiers. L’implémentation locale est la source de phase 1; une implémentation Supabase pourra reprendre le même contrat.

## Migration Supabase proposée

1. Créer les tables `projects`, `project_translations`, `posts`, `post_translations`, `testimonials`, `testimonial_translations`, `offers`, `offer_translations`, `team_members` et `team_member_translations`.
2. Mettre les identifiants en UUID, les relations en clés étrangères, les champs FR/EN dans une table de traduction par entité avec une contrainte unique `(entity_id, locale)`.
3. Ajouter à `projects` une contrainte SQL sur `classification`; stocker l’accord écrit et l’anonymisation dans des champs séparés. Ne publier un nom de client que si l’autorisation le permet.
4. Importer les JSON validés avec leurs identifiants stables, en préservant les deux langues et les slugs localisés; conserver le JSON comme sauvegarde de migration.
5. Ajouter une implémentation `SupabaseContentRepository` côté serveur puis basculer les fonctions de requête via configuration serveur. Garder les signatures et formes de retour utilisées par les pages.
6. Ajouter RLS en lecture publique limitée aux contenus publiés et réserver les écritures à un rôle éditorial authentifié; garder les clés privées exclusivement dans les variables d’environnement Vercel.
7. Comparer les décomptes et contenus des deux sources, puis basculer. Ce prototype reste `noindex` tant que la publication n’est pas validée.

## Hors périmètre de cette phase

Direction artistique, composants visuels définitifs, animations, contenu commercial rédigé, témoignages, données réelles, collecte de cookies, intégration de formulaire, schéma SQL appliqué, compte Supabase et déploiement/push.

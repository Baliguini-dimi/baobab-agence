# Baobab — site vitrine

Site bilingue français/anglais pour l'agence numérique Baobab, construit avec Next.js App Router, TypeScript et Tailwind CSS. Les pages publiques sont sous `/fr` et `/en`; le contenu éditorial passe par une couche d'accès afin de pouvoir remplacer les fichiers locaux par Supabase ultérieurement.

## Prérequis

- Node.js `>=20.9.0` (minimum requis par Next.js 16)
- npm

## Installation locale

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Ouvre `http://localhost:3000/fr`. Les variables de `.env.local` sont locales et ignorées par Git. Ne colle jamais de clé ou mot de passe dans le code, un commit, une issue ou une pull request.

## Variables d'environnement

Toutes les variables possibles sont listées, sans valeur, dans [.env.example](.env.example).

| Variable | Usage |
| --- | --- |
| `SITE_URL` | Origine canonique HTTPS, à renseigner quand le domaine officiel sera choisi. Sur Vercel, l'URL de déploiement sert de repli si cette variable est absente. |
| `SITE_INDEXING_ENABLED` | `false` par défaut : ajoute le noindex et garde le sitemap vide. Ne passer à `true` qu'après validation de lancement. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Clé publique du widget Turnstile, si le fournisseur est configuré. |
| `TURNSTILE_SECRET_KEY`, `TURNSTILE_EXPECTED_HOSTNAME` | Vérification Turnstile côté serveur. |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `RATE_LIMIT_HASH_SECRET` | Limitation de débit distribuée côté serveur. |
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_TO_EMAIL` | Envoi des formulaires côté serveur. |
| `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | Réservées à une éventuelle activation future de Supabase. Ne jamais exposer la clé `service_role` au client. |

Les clés et services de formulaire ne sont pas configurés pour le prototype. Sans leur configuration valide, les soumissions ne doivent pas être considérées comme un canal de contact opérationnel.

## Commandes

```powershell
npm run dev       # serveur local
npm run lint      # ESLint
npm run build     # build de production
npm run start     # sert le build de production
npm audit         # vérifie les vulnérabilités npm connues
```

## Publication Vercel

1. Lier le dépôt GitHub au projet Vercel avec la branche de production `main`.
2. Activer une prévisualisation pour chaque pull request; garder les déploiements de preview non indexables.
3. Définir les variables d'environnement par environnement Vercel sans commiter les valeurs.
4. Garder `SITE_INDEXING_ENABLED=false` sur les previews et tant que le lancement n'est pas validé.
5. Quand le domaine sera choisi, définir `SITE_URL` sur son origine canonique HTTPS dans l'environnement de production.
6. Tester une URL de preview et ses formulaires avant tout partage public.

Le dépôt ne contient aucune donnée réelle de client ni contenu client présumé publiable. Les projets, articles, témoignages et profils d'équipe sont filtrés par la couche d'accès et restent vides tant qu'ils ne sont pas validés.

## Structure

- `app/`: routes localisées, métadonnées, endpoints
- `src/content/`: schémas, données locales et fonctions d'accès au contenu
- `src/messages/`: textes d'interface français et anglais
- `src/config/`: coordonnées, tarifs et valeurs de configuration publiques
- `src/components/`: marque, site, animations et composants UI
- `supabase/migrations/`: migrations préparées, non appliquées au prototype
- `docs/`: décisions et rapports de phase

Consulter [docs/PHASE-06-DEPLOYMENT.md](docs/PHASE-06-DEPLOYMENT.md) avant de connecter le dépôt ou d'activer l'indexation.

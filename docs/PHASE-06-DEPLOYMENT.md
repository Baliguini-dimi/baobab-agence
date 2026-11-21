# Phase 6 — Déploiement

## État actuel

| Contrôle | État | Observation / action |
| --- | --- | --- |
| Dépôt GitHub dédié | ✅ Initialisé | `Baliguini-dimi/baobab-agence` existe. Le commit Phase 5 `88e80e3` a initialisé `main` avec l'accord exceptionnel de l'utilisateur. |
| Branche par phase | ✅ Locale | `phase/06-deploiement` est créée depuis le commit Phase 5; son commit documentaire `0e81448` reste local. |
| Protection de `main` | ⏳ En attente | À activer dans GitHub Settings: PR obligatoire, force-push et suppression désactivés. Le compte propriétaire doit pouvoir satisfaire la règle. |
| Pull request Phase 6 | ⏳ Non publiée | La branche Phase 6 ne sera poussée qu'après vérification de la protection de `main`. |
| Vercel | ⏳ Autorisation non effective | L'API de projets a répondu 403 malgré le premier accord. Un nouveau lien d'approbation à usage unique doit être utilisé; aucun projet ni déploiement n'a été créé. |
| Aperçus par pull request | ⏳ À vérifier | Après liaison du dépôt au projet Vercel, vérifier qu'une PR génère un déploiement Preview non indexable. |
| Indexation prototype | ✅ Configurée par défaut | `SITE_INDEXING_ENABLED=false`; pages en `noindex,nofollow`, sitemap vide. Ne pas activer avant la checklist de lancement public. |
| Domaine officiel | ⏳ À définir | `SITE_URL` reste vide dans `.env.example`; définir l'origine canonique HTTPS après choix du domaine. |
| Données et secrets | ✅ Vérifiés localement | `.env.local` est ignoré par Git, `.env.example` ne contient aucune valeur secrète, aucune vraie donnée client n'est publiée. |
| Installation et commandes | ✅ Documentées | Voir le README racine. |

## Checklist de prévisualisation

- [x] Utiliser la branche `phase/06-deploiement`; ne pas pousser directement sur `main`.
- [x] Garder `SITE_INDEXING_ENABLED=false` par défaut.
- [x] Garder les variables secrètes vides dans le dépôt.
- [x] Ne pas importer de données client réelles.
- [x] Initialiser `main` avec le seul commit Phase 5 autorisé `88e80e3`.
- [ ] Protéger `main` et vérifier la règle dans GitHub.
- [ ] Approuver l'accès Vercel via un lien actif et vérifier les projets/plans.
- [ ] Publier la branche Phase 6 et créer sa pull request vers `main`.
- [ ] Lier Vercel au dépôt et vérifier le build Preview déclenché par une PR.
- [ ] Tester le noindex sur l'URL Vercel Preview (métadonnées HTML et robots).
- [ ] Vérifier que les formulaires sont présentés comme prototype tant que Turnstile, Upstash et Resend ne sont pas configurés/testés.
- [ ] Exécuter build, lint et vérifications smoke sur l'URL Preview.

## Checklist de lancement public

- [ ] Passer Vercel en Pro avant tout usage commercial/public du site. Le plan Hobby gratuit est officiellement réservé à un usage personnel/non commercial: [tarifs Vercel](https://vercel.com/pricing), [plan Hobby](https://vercel.com/docs/plans/hobby).
- [ ] Si le contenu en production dépend de Supabase, choisir le plan payant approprié et confirmer les besoins de sauvegarde/disponibilité avant activation. Le prototype actuel n'utilise pas Supabase: [tarifs Supabase](https://supabase.com/pricing).
- [ ] Choisir le domaine; configurer `SITE_URL`, DNS, certificat HTTPS et redirections vers une origine canonique.
- [ ] Compléter et approuver les mentions légales, politique de confidentialité et coordonnées de publication.
- [ ] Tester les formulaires (validation client/serveur, honeypot, Turnstile, limitation de débit, envoi Resend, erreurs et absence de fuite de données).
- [ ] Réaliser l'audit sécurité final et vérifier les dépendances.
- [ ] Refaire Lighthouse mobile sur l'origine finale, corriger le LCP de 3,1 s observé et vérifier les objectifs Web Vitals. L'INP n'a pas encore été mesuré sur des interactions réelles.
- [ ] Effectuer les essais clavier, contraste et lecteur d'écran sur le site déployé.
- [ ] Remplacer le logo texte provisoire par le logo SVG final et ses versions/favicons validés.
- [ ] Créer/valider la fiche Google Business Profile et vérifier l'adresse et la zone desservie avant publication.
- [ ] Configurer Google Search Console, vérifier le domaine, soumettre le sitemap et suivre l'indexation après ouverture.
- [ ] Vérifier JSON-LD, canonicals, hreflang, Open Graph et cartes de partage.
- [ ] Publier uniquement des témoignages/réalisations ayant reçu les autorisations écrites nécessaires.
- [ ] Après validation de tous les points, passer `SITE_INDEXING_ENABLED=true` en production puis revérifier robots.txt, sitemap et meta robots.

## Tâches restantes

1. Activer et vérifier la protection de `main` dans GitHub Settings.
2. Terminer l'approbation Vercel via un lien à usage unique encore valide; l'accès demeure refusé par l'API après le premier accord.
3. Après les deux vérifications, pousser uniquement la branche Phase 6, ouvrir sa PR et vérifier la Preview Vercel.
4. Définir le domaine officiel avant de renseigner `SITE_URL`.
5. Traiter les points de lancement public avant de retirer le noindex.

## Vérifications locales

- `npm run lint`: réussi.
- `npm run build`: réussi sur la phase précédente; cette phase ne modifie que la documentation.
- `main` distant pointe sur `88e80e3` (initialisation autorisée).
- Le commit Phase 6 `0e81448` et sa branche restent locaux; aucun déploiement Vercel ni domaine n'a été configuré.

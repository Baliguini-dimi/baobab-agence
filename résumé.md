# Baobab, site vitrine de l'agence : résumé du projet

> **À lire en premier** par tout développeur ou outil d'IA qui reprend ce projet.
> Dernière mise à jour : 22 novembre 2026. Mets à jour ce fichier à la fin de chaque phase (voir « Règles de mise à jour »).
> Ce fichier décrit l'état connu du projet. Si le code et ce fichier se contredisent, **le code fait foi** : signale l'écart au propriétaire au lieu de deviner.

---

## 1. En une phrase

Site vitrine bilingue (français et anglais) de **Baobab**, agence numérique fondée en 2026 à Abidjan, destiné à présenter ses offres, rassurer les visiteurs et générer des demandes de devis.

## 2. Pourquoi ce projet existe

- Baobab est une agence récente (2026), d'une dizaine de personnes avec des prestataires externes et des sous-traitants. Elle n'avait **aucune présence en ligne**.
- Le propriétaire (Dimitri Baliguini, GitHub `Baliguini-dimi`) a un portfolio personnel existant. L'agence est un **projet séparé** : nouveau dépôt, nouveau projet Vercel, future base Supabase distincte. Le portfolio ne doit **jamais** être modifié depuis ce dépôt. Plus tard, le portfolio ne fera qu'un lien « Services » vers le site de l'agence.
- L'inspiration de départ était le site d'un concurrent ivoirien (Dominium). **Aucun texte, image, chiffre, logo, palette ni motif visuel de Dominium ne doit être repris.** Les motifs qui y ressemblaient (parallélogramme, badge rotatif, bandeau incliné, numéros en contour, fausse fenêtre de navigateur) ont été volontairement retirés.

## 3. Identité et informations d'entreprise

| Élément | Valeur |
|---|---|
| Nom | Baobab (logo provisoire en texte, pas de logo définitif) |
| Fondée | 2026 |
| Équipe | « Une dizaine de personnes, avec des prestataires » (ne jamais préciser un chiffre exact) |
| Adresse | Dokui, Abobo, Abidjan, Côte d'Ivoire. Repère : à côté de la pharmacie Les 4 Saisons (carrefour du lycée Adama Sanogo) |
| GPS utilisé | 5.4040088, -4.0008089 (**à revérifier** sur place : le propriétaire doit comparer le repère affiché avec sa position réelle) |
| Téléphone | +225 07 79 91 74 47 |
| Email | `dbaliguini@gmail.com` (**provisoire**, à remplacer par un email professionnel ; garder dans une variable de configuration) |
| Horaires | Lundi au vendredi 08h00-17h00, samedi 08h00-12h00, dimanche fermé |
| Réseaux sociaux | Pas encore d'URL : les liens sont masqués |
| Domaine | Pas encore choisi. Adresse provisoire : `baobab-agence.vercel.app` |

**Ne pas confondre** Dokui à Abobo (adresse réelle) avec Plateau Dokui à Cocody. Ne jamais écrire « Cocody » ou « Plateau » pour l'adresse de l'agence.

## 4. Offres et prix affichés

Priorités commerciales : (1) solutions numériques, (2) IA et automatisation pour entreprises et administrations, (3) gestion de présence en ligne, (4) couverture médiatique. La **vente d'équipements est en phase 2** (pas de page, pas de lien).

Cibles : fintech, startups, PME, petits commerces, institutions et administrations, écoles, ONG et organismes, clients d'événements ponctuels.

| Offre | Prix « à partir de » (FCFA HT) |
|---|---|
| Site vitrine | 150 000 |
| Site + blog | 300 000 |
| E-commerce | 700 000 |
| Application mobile | 1 200 000 |
| Logiciel métier | 1 250 000 |
| Chatbot IA | 200 000 |
| Community management (par mois) | 150 000 / 300 000 / 600 000 |
| Couverture médiatique | 50 000 |

- Le **FCFA HT est la référence** (devise du contrat). Le dollar est **indicatif**, calculé au taux BCEAO du 20 novembre 2026 : **596,87 FCFA pour 1 USD**. À revoir périodiquement.
- **Paiement en 3 fois** affiché seulement pour les projets de plus de 700 000 FCFA. Échéancier proposé (non publié) : 40 % à la signature, 30 % à mi-parcours, 30 % à la livraison.
- Formules de présence en ligne (publiées, voir la page dédiée) : **Démarrage** (150 000), **Suivi** (300 000), **Complet** (600 000). Budget publicitaire non inclus, déplacements hors Abidjan en supplément, **durée minimale d'engagement à définir** (non affichée).
- Ne jamais inventer d'offre, de prix, de délai ou de promesse (« réponse sous 24 h », etc.).

## 5. Règles de contenu (très importantes)

1. **N'invente rien** : pas de client, d'avis, de chiffre (« 200+ projets »), d'année d'expérience, de membre d'équipe, de réalisation.
2. Les **témoignages** et les **réalisations** restent masqués (pages en 404, absentes du menu et du sitemap) tant qu'il n'y a pas de contenu réel et autorisé.
3. Chaque réalisation porte un **statut obligatoire** : `client` (accord écrit de publication), `demo` (démo ou produit Baobab) ou `academique`. Sans accord écrit, un projet client est **anonymisé**.
4. Les dépôts GitHub du propriétaire (bankflow, smartcampus-saas, mediatheque, BudgetTrak, etc.) sont des **démos, prototypes ou projets académiques** d'après leurs README. Ne jamais les présenter comme des projets livrés à des clients sans confirmation écrite du propriétaire.
5. L'exemple de conversation WhatsApp (cacao en poudre) sur l'accueil est **fictif** et doit rester présenté comme tel.
6. Aucune image de banque de photos ni image générée par IA dans le site public. Exception de prototype : les visuels de `docs/images.md` peuvent apparaître dans la Preview noindex si `BAOBAB_PREVIEW_MOCKUPS=true`; ils sont réservés aux essais privés, ne prouvent ni l’équipe, ni les locaux, ni une réalisation, et restent désactivés en production. Aucune image dont l’accord de publication est « à obtenir » ne peut être publiée.

## 6. Stack technique

- **Stack** : Next.js 16.4.6 (App Router), React 19.3.1, TypeScript, Tailwind CSS 4.3.5, `next/font` avec Plus Jakarta Sans.
- **Langues** : français (défaut) et anglais, routes `/fr` et `/en`, sélecteur de langue, `hreflang`, pas de redirection automatique selon le pays. Textes dans des fichiers de traduction.
- **Contenu** : interface derrière `src/content/queries.ts` et types bilingues dans `src/content/schema.ts`. Les projets, articles, témoignages et l’équipe sont des collections JSON vides ; offres et formules sont dans des fichiers JSON locaux.
- Les offres/prix sont dans `src/content/data/offers.json` ; les formules `Démarrage`, `Suivi`, `Complet` et leurs inclusions sont dans `src/content/data/presence-plans.json`. Une implémentation Supabase pourra remplacer le dépôt local sans réécrire l’interface.
- **Design tokens** : `src/styles/tokens.css` (couleurs, polices, ombres, motifs, modifiables en un seul endroit).
- **Formulaires** : validation Zod côté client et serveur, honeypot, Cloudflare Turnstile (vérifié côté serveur, hôte et action contrôlés), limitation Upstash (5 demandes par 10 minutes), envoi par Resend en texte brut, contrôle d'origine et de taille. **Tant que les variables d'environnement ne sont pas configurées, l'envoi reste fermé** (message « formulaire temporairement indisponible »). Les réponses de l'API ne renvoient ni les champs soumis ni les détails des fournisseurs.
- **En-têtes de sécurité** (dans le proxy) : CSP avec **nonce par requête, sans `unsafe-inline`** ; Google Maps autorisé uniquement en `frame-src` ; HSTS uniquement en HTTPS de production ; X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors.
  - **Conséquence connue** : le nonce impose le rendu dynamique des pages localisées (pas de pré-rendu statique, cache CDN réduit). Décision prise : **conserver le nonce** (option B) et optimiser autrement.
- **Supabase** : migration **préparée mais non appliquée** (RLS sur toutes les tables applicatives, lecture publique limitée au contenu publié, écriture réservée aux administrateurs avec authentification à double facteur, bucket privé limité à 5 Mo et aux images JPEG/PNG/WebP/AVIF). **À valider en staging** avant tout usage. Jamais de clé `service_role` côté client.
- **Cookies** : bannière de consentement qui mémorise le choix. **Aucun outil d'audience ou de publicité n'est installé.**
- **Secrets** : uniquement en variables d’environnement. `.env.example` contient 14 variables ; `SITE_INDEXING_ENABLED=false` fixe le noindex par défaut, les autres valeurs sont vides et aucun secret n’est fourni. Aucun secret ne doit entrer dans le dépôt ni dans son historique.
- **Dépendances** : le dernier `npm audit` documenté ne signalait aucune vulnérabilité ; relancer avant publication. Dependabot est configuré pour npm et GitHub Actions (hebdomadaire). La configuration est sur `main`, mais l’activation effective des alertes/PR n’a pas été recontrôlée.
- **Hébergement** : Vercel (offre gratuite Hobby pour le **prototype privé**, en `noindex`). **Aucun script de tests** dans le dépôt : les contrôles sont `npm run lint`, `npm run build` et `git diff --check`.

## 7. Direction artistique

- Ambiance : africaine contemporaine mêlée à créative et média, sobre, éditoriale, rassurante pour institutions et fintech. Le baobab symbolise l'enracinement et la croissance.
- Palette actuellement implémentée dans `src/styles/tokens.css` : marine `#102B46`, marine foncé `#0A1D30`, crème `#F5F0E6`, papier `#FFFCF6`, gris `#E9EDF0`, corail `#F47A63`, corail foncé `#DE604B`. Les tokens sont centralisés dans ce fichier.
- **Le corail sert uniquement aux boutons et petits détails** (jamais de texte corail sur fond crème, jamais de grande surface corail). Texte foncé sur fond corail.
- Contraste WCAG AA exigé. Header : rapports calculés crème sur marine foncé 15,02:1, marine sur crème 12,70:1, marine foncé sur corail 6,34:1, filet corail sur crème 3,14:1.
- Formes : filets fins de 1 px, cartes à bordure fine, rayons de 4 à 8 px, peu d'ombres. Motif de **cernes de baobab** en SVG (signature discrète).
- Mise en page : accueil structuré (hero, offres, à propos, méthode, exemple IA, appel à l'action, pied de page) ; pages internes en colonnes éditoriales à filets, **pas de piles de cartes numérotées**. FAQ en `<details>` accessibles. Tableau comparatif des formules de présence en ligne.
- H1 d'accueil validé : FR « Des solutions numériques utiles aux entreprises et aux institutions d'Abidjan. » / EN « Useful digital solutions for businesses and institutions in Abidjan. »
- Titres validés : « Ce que nous construisons », « Une équipe basée à Abidjan », « Comment nous travaillons », étapes « Écouter / Cadrer / Construire / Livrer » (EN : What we build / A team based in Abidjan / How we work / Listen / Define the scope / Build / Deliver). Appel à l'action final : « Entreprise, institution, école ou ONG : parlons de votre besoin. »
- Header : barre supérieure marine (coordonnées et horaires, masquée au défilement), panneau logo marine, navigation crème, bouton corail ; en mobile, header marine de 56 px, bandeau « Appeler », menu hamburger accessible (focus, Échap).
- Aucune photographie réelle de l’agence n’est encore fournie : l’illustration SVG du baobab reste l’accueil par défaut ; en Preview/développement, `BAOBAB_PREVIEW_MOCKUPS=true` montre le hero, des illustrations de travail, des scènes de couverture et trois interfaces fictives. Les portraits restent masqués tant que leurs rôles ne sont pas confirmés.
- Carte Google Maps **chargée seulement au clic**, avec liens Google Maps, Waze et WhatsApp.

## 8. Règles de motion et de performance

- Animations en CSS, **transform, opacity, clip-path** (et `stroke-dashoffset` seulement si la mesure le permet), **une seule fois, jamais en boucle**, 400 à 700 ms, pas de rebond. Pas de 3D, pas de particules, pas de bibliothèque d'animation lourde.
- **Le contenu est visible par défaut** : une animation ne doit jamais être nécessaire pour afficher un titre (un bug de titres invisibles est venu d'un état caché par défaut ; il a été corrigé). `prefers-reduced-motion` est respecté.
- Le H1 du hero est l'élément LCP : pas d'animation dessus.
- Seuils à tenir sur la Preview (Lighthouse mobile, 3 passages, médiane) : **LCP sous 2,5 s, CLS 0, performance d'au moins 85**.
- Dernière mesure vérifiée sur la Preview `/fr` (Lighthouse mobile, 3 passages, 22 novembre 2026, PR #7) : Performance **91 / 88 / 86** (médiane **88**), LCP **1 243 / 1 155 / 1 330 ms** (médiane **1 243 ms**), CLS **0 / 0 / 0** (médiane **0**). Mesures de laboratoire variables, distinctes des données terrain.
- **INP non mesurable en laboratoire** : à suivre avec des données réelles après le lancement.
- L'API PageSpeed Insights a déjà renvoyé une erreur 429 (quota) : utiliser Lighthouse en local sur la Preview publique.

## 9. Environnement et flux de travail

- Dépôt GitHub privé : `Baliguini-dimi/baobab-agence`. Dossier local : `D:/Projet Ecole/baobab-agence`.
- **Branches et PR** : une branche `phase/*` par phase et une PR. Les pushes vers `phase/*` sont autorisés pour la phase demandée ; jamais de push sur `main`, jamais de force-push. Le propriétaire fusionne lui-même les PR. Base habituelle `main` ; une PR peut cibler une autre branche seulement si le propriétaire le demande explicitement (comme la PR #7 empilée sur #6).
- **Ne jamais demander ni utiliser d'accès au compte Vercel** (liens d'autorisation refusés par le propriétaire, qui gère Vercel lui-même).
- Pour que les outils de mesure accèdent aux previews, la « Vercel Authentication » des previews est désactivée **pendant le prototype seulement** (site en `noindex`, aucune donnée réelle). À réactiver si du contenu confidentiel est ajouté.
- Valider chaque phase avec le propriétaire avant la suivante. Poser les questions au lieu de supposer.

## 10. Ce qui a été fait

| Phase | Contenu | Commit / PR |
|---|---|---|
| 1 | Architecture, routes, schéma TypeScript, couche de contenu, plan Supabase, traductions FR/EN | `4dfa2da` |
| 2 | Design system, tokens, composants de base, page de démonstration | `bc020eb` |
| 3 | Accueil et Contact FR/EN, offres, tarifs, coordonnées, carte au clic | `c7763fc` |
| 4 | Formulaires, CSP à nonce, en-têtes, variables d’environnement, Dependabot, migration Supabase préparée, cookies | `92744f2` |
| 5 | SEO localisé, metadata, JSON-LD, `robots.txt`, `sitemap.xml` | `88e80e3` (`origin/main`) |
| 5 bis | Optimisations de performance, nonce conservée | PR #4, `2bb82b9` |
| 6 | README et checklist de déploiement | PR #5, `0dcc1f3` |
| 3 bis | Direction artistique, accueil redessiné, H1 FR/EN, formules en ligne, archives vides masquées | PR #6, `8fc70a9` |
| 3 ter à 3 septies | Titres et pages éditoriales, motion CSS, corrections mobile, formulaire sujet/type fusionné (sécurité conservée), header distinctif | PR #7, dernier commit `fa1a9aa` |
| Images (prototype) | Visuels convertis en WebP, emplacements Preview pour hero, travail, couverture et interfaces de démonstration derrière `BAOBAB_PREVIEW_MOCKUPS`, registre des images ; rôles des portraits non attribués | Branche `phase/images-privees` |

### État Git et des PR, vérifié le 22 novembre 2026

> Une indication précédente disait que #4 et #5 étaient fusionnées. Au contrôle GitHub de cette date, elles apparaissent encore ouvertes (`merged: false`) et `origin/main` est au commit `88e80e3`, sans les commits `2bb82b9` ou `0dcc1f3`. Le dépôt distant est l’état observable ; reconfirmer avec le propriétaire si son tableau de bord diffère.

| PR | Branche | État GitHub observé |
|---|---|---|
| #4 | `phase/05-bis-performance` | Ouverte, sans conflit (`mergeable_state: clean`) |
| #5 | `phase/06-deploiement` | Ouverte, sans conflit (`mergeable_state: clean`) |
| #6 | `phase/03-bis-direction-artistique` | Ouverte, sans conflit (`mergeable_state: clean`) |
| #7 | `phase/03-quater-mobile-desktop` (base = branche #6) | Ouverte, sans conflit (`mergeable_state: clean`) |

Le checkout décrit est `phase/03-bis-direction-artistique`, `HEAD` = `8fc70a9`, propre et synchronisé. Le commit `fa1a9aa` de la PR #7 contient le header serveur final et ses corrections antérieures ; ces changements ne sont pas dans le checkout #6 avant intégration de #7.

Le 22 novembre, `git merge origin/main` dans la branche #6 a répondu `Already up to date` : `main` était déjà ancêtre de #6, aucun conflit de page d’accueil n’existait et aucun commit de merge n’a été créé. `npm run lint` et `npm run build` ont réussi ; le push a répondu `Everything up-to-date`. `main` n’a pas été modifiée.

`clean` signifie qu’aucun conflit n’est détecté ; cela ne signifie pas que la PR est fusionnée. Lire les diffs et commits de #6/#7 avant de reprendre une tâche pour ne pas dupliquer leur travail.

Fichiers de reference presents dans le checkout #6 : `docs/phase-1-architecture.md`, `docs/phase-2-design-system.md`, `docs/PHASE-03-DELIVERY.md`, `docs/PHASE-04-SECURITY.md` et `docs/PHASE-05-SEO-PERFORMANCE.md`. Le `README.md` et `docs/PHASE-06-DEPLOYMENT.md` sont dans la branche de la PR #5 ; `docs/PHASE-05-BIS-PERFORMANCE.md` est dans celle de la PR #4. Ces fichiers ne sont pas encore integres au checkout actuel.

## 11. Ce qui reste à faire

**Contenu et marque (dépend du propriétaire)**
- [x] Visuels préparés pour une Preview de test avec `next/image`; registre `docs/images.md`. L’option `BAOBAB_PREVIEW_MOCKUPS` reste désactivée par défaut ; lorsqu’elle vaut `true`, les illustrations de travail, scènes média et démonstrations d’interfaces sont aussi visibles. Le hero n’affiche plus la mention de génération demandée retirée par le propriétaire.
- [ ] Remplacer les maquettes par des photos réelles autorisées avant tout lancement public. Les correspondances fondateur/responsables restent à confirmer ; aucun nom ou rôle n’est associé aux portraits.
- [ ] Photos réelles : équipe, portraits, bureau, équipe en action, extérieur du bureau, projets, médias. Accords écrits nécessaires pour les personnes reconnaissables.
- [ ] Logo définitif en SVG (versions claire, sombre, icône seule), favicon, image de partage 1200 × 630.
- [ ] Tableau des projets réalisés : client, secteur, date, accord écrit, ce qu'on peut montrer, statut (client, démo, académique).
- [ ] Témoignages réels avec autorisation écrite.
- [ ] Email professionnel, URL des réseaux sociaux, vérification du point GPS.
- [ ] Définir la durée minimale d'engagement des formules de présence en ligne et l'échéancier du paiement en 3 fois.
- [ ] Mentions légales, confidentialité et cookies : textes définitifs relus par un juriste (loi ivoirienne n° 2013-450, ARTCI).
- [ ] Relecture humaine des traductions anglaises.

**Technique**
- [ ] Après validation du propriétaire, décider puis fusionner les PR #4, #5, #6 et #7. Au 22 novembre, toutes sont ouvertes et sans conflit détecté ; #7 cible la branche #6. Recontrôler statut, base et Preview après chaque fusion.
- [ ] Phase 3 : pages Réalisations et Blog (contenu réel d'abord), page équipe, galerie média.
- [ ] Créer les comptes Turnstile, Upstash et Resend, renseigner les variables d'environnement, tester le formulaire de bout en bout.
- [ ] Si le besoin de contenu dynamique est confirmé, créer un projet Supabase séparé du portfolio, appliquer la migration **en staging**, tester RLS/MFA/Storage puis brancher la couche de contenu. La migration actuelle est préparée, non appliquée.
- [ ] Brancher un outil de mesure respectueux de la vie privée avec consentement (après décision).
- [ ] Accessibilité : audit clavier et lecteur d'écran complet.
- [ ] Page « Équipements » (phase 2 commerciale) : plus tard.
- [ ] Intégrer le lien « Services » dans le portfolio (projet séparé).

**Avant le lancement public (checklist)**
- [ ] Domaine choisi (vérifier `.ci` et `.com`) et connecté, HTTPS.
- [ ] **Hébergement commercial** : l'offre Vercel Hobby est **non commerciale** ; au lancement, passer en Vercel Pro ou migrer vers un hébergeur qui autorise l'usage commercial gratuit (Netlify, Cloudflare Pages, à vérifier sur leurs pages officielles). Ne pas lancer publiquement sur Hobby.
- [ ] **Supabase payant** dès que le contenu public en dépend (le plan gratuit met le projet en pause après une semaine d'inactivité).
- [ ] Retirer le `noindex` : variable d'environnement `SITE_INDEXING_ENABLED` (`false` par défaut). Quand elle passe à `true` : pages indexables, `robots.txt` autorise, sitemap déclaré. **Ne jamais la mettre à `true` sans validation du propriétaire et checklist complète** (contenu réel, coordonnées réelles, pages légales, aucun texte factice, aucun identifiant de démonstration).
- [ ] Google Search Console (sitemap), Bing Webmaster Tools, fiche Google Business Profile (adresse Dokui, Abobo, cohérente partout).
- [ ] Audit sécurité, audit Lighthouse, test des formulaires, relecture juridique.
- [ ] Le portfolio personnel doit aussi être vérifié pour l'indexation (`site:` dans Google, absence de `noindex`), séparément.

## 12. Photos attendues (rappel)

Équipe en plan large, portraits individuels au même cadrage (nom et rôle), fondateur, bureau (ensemble et détails), équipe en action, extérieur du bureau, projets (ordinateur, téléphone, détail), couverture média (photos d'événements, courtes vidéos avec image de couverture, drone si disponible), exemples de visuels de présence en ligne, une capture d'un assistant IA en conversation. Formats : originaux JPG/PNG, au moins 2 400 px de large, jamais compressés par WhatsApp ; portraits 4:5, projets 16:10, héros 3:2. Accord de publication écrit de chaque personne visible.

## 13. Pièges déjà rencontrés (ne pas les refaire)

- **Titres invisibles** : un état « caché par défaut » dépendant d'un script a laissé des sections vides. Le contenu doit être visible sans JavaScript.
- **Flèches ↗ rendues en emoji sur iOS** : utiliser des icônes SVG.
- **Numéro de téléphone** : toujours formaté `+225 07 79 91 74 47`, lien `tel:+2250779917447`.
- **Redondances** : « USD » répété, note de conversion BCEAO affichée plusieurs fois, « Fondée en 2026 » répété.
- **Formules génériques de type IA** (« font grandir vos idées », « Plus de temps pour l'essentiel ») : à éviter.
- **Mots-clés bourrés dans un texte visible** : placer les mots-clés dans title, meta et titres naturels.
- **Instruction contradictoire** : ne pas interdire de toucher aux formulaires tout en demandant de les modifier ; la sécurité du formulaire (validation serveur, honeypot, Turnstile, limitation, origine) doit rester intacte à chaque modification.
- **Identifiants de démonstration** présents dans les README publics d'autres dépôts du propriétaire (bankflow, smartcampus-saas) : à retirer et à changer ; ne jamais en reprendre ici.

## 14. Règles pour un outil d'IA qui reprend le projet

1. Lis ce fichier en entier, puis `git status`, `git log --oneline -10` et l'état des PR avant toute action.
2. **Ne modifie pas la CSP, Supabase ni la sécurité des formulaires** sans demande explicite et validation du propriétaire.
3. Travaille sur une branche `phase/*`, un commit par étape ; lint et build avant le push. Pousse uniquement sur la branche phase et ouvre une PR. La base est `main` sauf empilement explicitement demandé. Ne pousse jamais sur `main`, ne force-push pas et ne fusionne pas : le propriétaire fusionne.
4. N'invente aucune donnée d'entreprise (voir section 5). Si une information manque, laisse le champ vide ou masqué et pose la question.
5. Ne copie rien d'un site concurrent.
6. Après chaque mesure de performance, indique clairement ce qui est mesuré (environnement, nombre de passages, médiane) et ne présente jamais un meilleur score isolé comme représentatif.
7. Avant d'activer l'indexation ou de créer des comptes de production, demande la validation du propriétaire.
8. En cas de doute entre deux options, expose-les avec leurs conséquences au lieu de choisir seul.

## 15. Règles de mise à jour de ce fichier

- Mets à jour les sections 3, 4, 10 et 11 à la fin de chaque phase ou décision. Vérifie les PR et le dépôt en direct ; un statut ancien dans ce fichier ne fait pas foi.
- Coche ou retire les tâches terminées ; ajoute la date et le commit.
- Ne supprime pas l'historique : ajoute une ligne au journal ci-dessous.

## 16. Journal des changements

| Date | Changement |
|---|---|
| 2026-11-22 | Document source fourni par le propriétaire : phases 1 à 3 septies, stack, principes et tâches restantes. |
| 2026-11-22 | Création de `résumé.md` à la racine ; contenu, commits, branches, statuts GitHub et mesures Lighthouse recoupés avec le dépôt. |
| 2026-11-22 | Phase images prototype : 12 visuels du lot joint préparés en WebP sans métadonnées, hero activable uniquement par variable serveur et légendé comme maquette IA, registre `docs/images.md`; les images générées restent interdites de publication. |
| 2026-11-22 | Révision Preview images : retrait de la mention visible sous le hero ; intégration des illustrations de travail, des exemples média et des trois interfaces fictives. Portraits gardés masqués faute de correspondances validées. |

# Phase 5 — Référencement et performance

## Mesures Lighthouse mobile

Audits exécutés localement sur `/fr` en production mode avec Lighthouse 12.8.2 et Chrome headless. Les deux mesures utilisent la même machine et la même URL (`127.0.0.1:3005/fr`). Elles sont indicatives: elles ne remplacent pas les données terrain d'un déploiement Vercel.

| Mesure | Avant | Après | Cible / lecture |
| --- | ---: | ---: | --- |
| Performance | 70 | 71 | Léger progrès au score total; résultats labo variables |
| Accessibilité | 96 | 96 | Aucun recul; audit à compléter manuellement |
| Bonnes pratiques | 96 | 96 | Stable |
| SEO | 40 | 66 | Métadonnées réparées; score pénalisé par le noindex prototype |
| FCP | 1,0 s | 1,6 s | Résultat final de laboratoire, variable d'une exécution à l'autre |
| LCP | 2,9 s | 3,1 s | Encore au-dessus de la cible 2,5 s; à améliorer |
| TBT | 1 260 ms | 920 ms | En baisse, mais encore élevé; TBT est un indicateur de laboratoire, pas INP |
| CLS | 0 | 0 | Dans la cible 0,1 |
| INP | Non disponible | Non disponible | Aucune interaction utilisateur mesurée par ce run Lighthouse |

Les cibles Web Vitals se vérifient au 75e percentile des visites réelles, séparément pour mobile et ordinateur. LCP ≤ 2,5 s, INP ≤ 200 ms et CLS ≤ 0,1 sont les seuils « bon » documentés par web.dev: https://web.dev/articles/vitals.

## Corrections apportées

- Ajout de titres distincts, descriptions, canoniques, Open Graph et `hreflang` FR/EN sur l'accueil, les pages services, contact, cookies, design system, contenu et détails.
- Ajout du réglage `SITE_INDEXING_ENABLED=false` par défaut et de `SITE_URL` dans `.env.example`. Les pages légales incomplètes et la page équipements restent non indexables.
- Génération de `robots.txt` et `sitemap.xml` via les conventions Next.js. Le sitemap reste vide tant que l'indexation est désactivée ou que l'origine canonique n'est pas configurée; il inclut ensuite les URLs publiées FR/EN avec leurs alternatives linguistiques.
- Création de pages de service localisées pour les solutions numériques, IA et automatisation, présence en ligne et couverture médiatique. Le contenu cite naturellement « agence web à Abobo » et « agence digitale à Abidjan » sans créer de pages villes artificielles.
- Ajout de données structurées Organization, LocalBusiness, Service, FAQPage, Article (uniquement pour les articles publiés) et BreadcrumbList. Coordonnées horaires omises car les horaires d'ouverture n'ont pas été fournis. Aucune note ni donnée de client inventée.
- Ajout des vues détail projet et article depuis le dépôt de contenu typé; seules les entrées publiées sont retournées par la couche d'accès existante.
- Aucun fichier image photo/raster n'est actuellement utilisé. L'illustration d'accueil est une image vectorielle intégrée; il n'y a pas d'images raster à convertir ou à charger via `next/image` pour ce prototype. Les contenus prévoient un texte alternatif lorsqu'une image de projet est ajoutée.
- Les scripts JSON-LD reçoivent le nonce CSP et échappent le caractère `<` avant sérialisation.

## Limites et risques restants

- **Performance non conforme partout**: le dernier LCP mesuré (3,1 s) dépasse la cible. Le score Performance varie entre 71 et 79 sur les exécutions postérieures, ce qui indique une variabilité de laboratoire. Un audit sur URL Vercel et des données terrain seront nécessaires avant de conclure.
- **INP non mesuré**: valider sur un déploiement instrumenté (CrUX/RUM) et avec interactions réelles. Ne pas déduire l'INP du TBT.
- **Domaine de production**: définir `SITE_URL` avec l'origine HTTPS canonique; vérifier `VERCEL_URL` et ses effets sur prévisualisations avant lancement.
- **Indexation**: conserver `SITE_INDEXING_ENABLED=false` pour le prototype. Ne passer à `true` qu'après validation du domaine, du contenu légal et de la politique de confidentialité.
- **Sitemap**: contient uniquement les pages générales et contenus publiés; il n'inclut pas les pages légales en attente de validation, les cookies ni les équipements non lancés.
- **Images**: quand des images réelles et autorisées seront fournies, les intégrer avec `next/image`, dimensions intrinsèques, alt vérifié, formats AVIF/WebP et chargement différé hors écran.
- **Données d'entreprise**: aucune plage d'ouverture n'est publiée; l'email et les numéros proviennent des coordonnées indiquées par le propriétaire. Vérifier qu'ils sont prêts à être publiés avant lancement.
- **Validation enrichie Google**: les données JSON-LD sont émises selon Schema.org, mais n'ont pas été soumises au Rich Results Test de Google.
- **Accessibilité**: le score Lighthouse est 96. Les tests clavier et lecteur d'écran, le contraste sur l'ensemble des états interactifs et les différentes pages restent à effectuer manuellement.

## Checklist avant activation de l'indexation

- [ ] `SITE_URL` défini avec l'URL HTTPS officielle et canonique.
- [ ] `SITE_INDEXING_ENABLED=false` conservé jusqu'à la validation de lancement.
- [ ] Vérifier un `<title>`, une description, un seul H1, canonical et hreflang uniques sur chaque URL publique.
- [ ] Valider les adresses alternatives FR/EN et le sitemap après configuration du domaine.
- [ ] Compléter et faire vérifier mentions légales et confidentialité.
- [ ] Confirmer par écrit le droit de publier chaque réalisation et témoignage avant activation dans le contenu.
- [ ] Valider LocalBusiness (adresse, GPS, téléphone, email); ajouter les horaires seulement après confirmation.
- [ ] Exécuter le test Google Rich Results sur les pages FAQ, article et service.
- [ ] Refaire Lighthouse mobile sur le domaine Vercel; viser LCP < 2,5 s, CLS < 0,1 et analyser les tâches longues qui contribuent au TBT.
- [ ] Mesurer INP avec des interactions représentatives et, après lancement, surveiller le 75e percentile des données terrain.
- [ ] Tester navigation clavier, focus visibles, zoom, contrastes et lecteurs d'écran.
- [ ] Vérifier `next/image`, dimensions et textes alternatifs à chaque ajout d'image.
- [ ] Confirmer que les pages légales et de confidentialité sont approuvées avant tout passage public indexable.

## Vérifications effectuées

- Build de production Next.js: réussi; routes FR/EN, robots et sitemap générés.
- ESLint: réussi.
- Lighthouse mobile avant/après: exécuté sur l'accueil FR.
- Requêtes HTTP locales: accueil FR/EN, contact, quatre services, FAQ, mentions légales, confidentialité, équipements, `robots.txt` et `sitemap.xml` renvoient 200.
- `robots.txt` permet le crawl afin que les moteurs puissent lire le meta `noindex`; les pages portent `noindex,nofollow` par défaut.

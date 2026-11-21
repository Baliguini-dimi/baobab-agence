# Phase 4 — sécurité et données

## Mesures préparées

### Formulaires

- `src/lib/forms/schema.ts` partage les schémas Zod entre navigateur et serveur, avec types d’intention, limites de longueur et champs normalisés.
- `POST /api/forms` vérifie l’origine, le type et la taille du corps, limite la lecture à 16 Ko, puis valide les champs côté serveur.
- Le honeypot est traité sans envoi. Cloudflare Turnstile est vérifié depuis le serveur avec Siteverify; le résultat doit correspondre à l’hôte et à l’action du formulaire.
- Upstash applique une limite glissante de 5 demandes par IP pseudonymisée HMAC sur 10 minutes. Les erreurs Upstash échouent fermées.
- Resend n’est appelé qu’après validation. Les messages sont en texte brut, les erreurs du fournisseur et les données de formulaire ne sont jamais renvoyées dans la réponse API.
- Aucune demande n’est conservée dans une base. Les champs soumis sont transmis par email à Baobab via Resend.

### En-têtes et CSP

- `proxy.ts` ajoute une CSP par requête avec nonce aléatoire, sans `unsafe-inline`; `style-src-attr 'none'` est également appliqué.
- Google Maps est listé uniquement dans `frame-src`. Cloudflare Turnstile est permis uniquement pour son script, ses frames et ses connexions nécessaires.
- La politique inclut `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, ainsi que HSTS (requêtes HTTPS en production), `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` et `X-Frame-Options`.
- Les pages localisées sont rendues dynamiquement pour émettre un nonce CSP par réponse. Cela réduit les bénéfices de cache statique/CDN et consomme des exécutions de fonction Vercel.

### Secrets et dépendances

- `.env.example` contient les noms de variables uniquement, toutes sans valeur. `.gitignore` exclut `.env*` et autorise seulement `.env.example`.
- Aucun fichier `.env`/clé n’a été trouvé dans les chemins de l’historique Git parcouru. Une recherche de motifs courants de clés dans les blobs historiques n’a rien détecté.
- Les secrets Turnstile, Upstash, Resend et Supabase ne sont lus que côté serveur. Le code client n’utilise que la clé publique Turnstile.
- `npm audit` a été exécuté après l’ajout des dépendances : zéro vulnérabilité signalée. Dependabot suit chaque semaine npm et GitHub Actions; les alertes version-update ne seront actives qu’une fois cette configuration sur la branche par défaut du dépôt distant.

### Préparation Supabase (non activée)

- `supabase/migrations/20261121000000_baobab_content_security.sql` crée les tables bilingues projets, articles, offres, prix, témoignages, équipe et administrateurs.
- RLS est activé pour chaque table applicative. Les privilèges anon/authenticated sont révoqués puis limités; le public lit uniquement le contenu publié. Les écritures sont réservées à un compte administrateur authentifié avec `aal2`.
- Le projet client doit exiger l’enrôlement MFA et la migration doit être testée en staging. La ligne du premier administrateur doit être créée manuellement après enrôlement MFA, via un canal opérateur sûr.
- La migration garde Storage privé, limite les médias à 5 Mo et aux types JPEG, PNG, WebP et AVIF. La lecture RLS ne s’ouvre que pour les médias attachés à du contenu publié/autorisé; les opérations d’écriture exigent un administrateur `aal2`.
- Aucune dépendance Supabase cliente n’est ajoutée, aucune variable n’est renseignée et la migration n’a pas été appliquée. La clé `service_role` n’est jamais importée dans l’application.

### Cookies

- La bannière permet de refuser ou d’accepter les cookies facultatifs et mémorise le choix dans un cookie de préférence `SameSite=Lax`.
- Aucun outil de mesure d’audience ou de publicité n’est chargé dans le prototype, quel que soit le choix. La page `/fr/cookies` et sa version anglaise documentent ce comportement.
- Le widget Turnstile peut utiliser des technologies nécessaires à la protection anti-robot; cela est indiqué dans l’information cookies.

## Risques et prérequis restants

- Sans clés de service, le formulaire reste désactivé et l’API répond de façon générique. Il faut créer des clés séparées pour développement/production, configurer l’hôte Turnstile, les identifiants Upstash, et un domaine expéditeur vérifié chez Resend dans les variables Vercel.
- La limite IP s’appuie sur les en-têtes proxy Vercel; une migration vers un autre hébergeur exige de revoir la source IP de confiance. L’adresse IP n’est conservée que sous forme HMAC comme identifiant de limite, mais Upstash traite encore les requêtes de limite.
- Les limites Storage contrôlent MIME déclaré et taille; tout futur flux d’upload devra aussi vérifier le type réel du fichier avant de le publier et définir une politique de modération/antivirus adaptée.
- La CSP nonce rend les pages localisées dynamiques au lieu d’être pré-générées. Vérifier les limites d’exécution et le comportement de cache du plan Vercel gratuit avant publication.
- Les migrations, politiques Storage et exigences MFA n’ont pas été exécutées contre un projet Supabase. Une revue et les contrôles staging ci-dessous restent nécessaires avant activation.
- L’acceptation cookies est enregistrée, mais aucun suivi facultatif n’existe encore à activer. Tout ajout futur doit lire ce choix avant de charger un script ou de poser un cookie facultatif.
- Dependabot ne peut ouvrir de PR qu’après présence du fichier sur la branche par défaut distante; aucun push n’a été fait.

## Vérifications effectuées

- `npm run lint` : réussi.
- `npm run build` : réussi; les pages localisées sont dynamiques pour émettre un nonce CSP à chaque requête.
- `npm audit --audit-level=low` : zéro vulnérabilité signalée après l’ajout des dépendances.
- L’historique Git a été parcouru pour les noms de fichiers `.env` et des motifs courants de clés; aucun fichier `.env` ni motif correspondant trouvé. L’exemple d’environnement contient 12 variables sans aucune valeur.
- Les intégrations Cloudflare, Upstash, Resend et Supabase ne sont pas configurées; les contrôles d’intégration de la checklist restent à effectuer avec des secrets et comptes de staging.

## Checklist de tests avant activation ou publication

### Formulaires

- [ ] Champs vides, emails mal formés, champs trop longs et JSON invalide sont rejetés côté client **et** côté serveur.
- [ ] Types de contenu inattendus, corps de plus de 16 Ko, origine absente ou autre origine sont rejetés.
- [ ] Honeypot rempli ne déclenche ni Turnstile ni envoi email et ne révèle pas le résultat anti-bot au bot.
- [ ] Token Turnstile absent, forgé, expiré, rejoué, hostname différent ou action différente est rejeté; les échecs de Siteverify échouent fermés.
- [ ] Plus de 5 demandes par IP pseudonymisée sur 10 minutes renvoient une réponse générique 429; Upstash indisponible n’envoie aucun email.
- [ ] Resend reçoit un texte brut après validation; erreurs Resend sans détail interne; aucune donnée de formulaire/secret n’apparaît dans la réponse, l’URL ou les journaux.
- [ ] Configurations d’environnement incomplètes désactivent l’envoi; les clés ne sont pas visibles dans les bundles client.

### En-têtes, navigateur et cookies

- [ ] Vérifier CSP/nonce distincts par réponse; aucune directive `unsafe-inline` en production et `unsafe-eval` seulement en développement.
- [ ] Vérifier que `www.google.com`/Maps n’apparaît que dans `frame-src`, et que l’iframe Maps n’est ajoutée au DOM qu’après clic.
- [ ] Vérifier `frame-ancestors`, HSTS sur HTTPS, `nosniff`, Referrer-Policy et Permissions-Policy sur toutes les routes.
- [ ] Refuser le suivi : le cookie indique `essential`, aucun traceur/cookie facultatif ne se charge; accepter mémorise le choix sans charger de traceur existant.
- [ ] Vérifier navigation clavier, lecteurs d’écran et messages localisés FR/EN du widget et de la bannière.

### Supabase (staging uniquement, migration pas encore exécutée)

- [ ] Contrôler dans `pg_class` que chaque table applicative et `storage.objects` a RLS activé; aucune table exposée sans RLS.
- [ ] `anon` peut lire les projets/articles/offres publiés uniquement; il ne peut insérer, modifier, supprimer, ni lire les brouillons.
- [ ] Utilisateur authentifié non administrateur ne peut modifier le contenu; publication reste filtrée.
- [ ] Admin sans `aal2` ne peut lire l’entrée d’administration ni écrire; admin MFA `aal2` peut gérer le contenu.
- [ ] Un projet client sans consentement écrit ne peut publier un nom; témoignage sans consentement et profil équipe sans approbation ne peuvent publier.
- [ ] Bucket privé bloque les uploads non administrateur, types non permis et fichiers >5 Mo; les médias brouillon sont invisibles au public.
- [ ] La clé `service_role` n’apparaît ni dans les variables `NEXT_PUBLIC_*`, ni dans le client, et n’est pas utilisée pour les lectures publiques.

### Dépendances et historique

- [ ] Rejouer `npm audit` avant chaque mise en production et traiter toute vulnérabilité.
- [ ] Après intégration sur la branche par défaut distante, vérifier que Dependabot ouvre des PR npm et GitHub Actions.
- [ ] Scanner le dépôt et tout l’historique avant publication; si un vrai secret a déjà été commité, le révoquer/faire tourner, puis nettoyer l’historique selon la procédure du dépôt.

## Références techniques

- [Next.js — Content Security Policy et nonces](https://nextjs.org/docs/app/guides/content-security-policy)
- [Vercel — en-têtes de requête et IP de forwarding](https://vercel.com/docs/headers/request-headers)
- [Cloudflare — validation serveur Turnstile](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
- [Upstash — SDK TypeScript Ratelimit](https://upstash.com/docs/redis/sdks/ratelimit-ts/gettingstarted)
- [Resend — Next.js App Router](https://resend.com/nextjs)
- [Supabase — RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [MFA](https://supabase.com/docs/guides/auth/auth-mfa), [Storage access control](https://supabase.com/docs/guides/storage/security/access-control), [limites de téléversement](https://supabase.com/docs/guides/storage/uploads/file-limits)
- [GitHub — configuration Dependabot](https://docs.github.com/en/code-security/concepts/supply-chain-security/about-the-dependabot-yml-file)

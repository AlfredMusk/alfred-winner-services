> ARCHIVE — refonte non retenue pour le moment. Le 18 octobre 2026, Alfred a demandé le retour au modèle déjà en ligne. Les résultats ci-dessous concernent la prévisualisation Premium archivée, pas le rendu local actuel.

# AWS Premium Corporate 2026 — revue de développement

18 octobre 2026. Branche `codex/aws-premium-2026`. Prévisualisations locales : http://localhost:3100/fr (Fast Refresh) et http://localhost:8787/fr (Worker OpenNext). Aucune publication, aucun DNS, aucun compte ou forfait modifié pendant cette refonte.

## Diagnostic initial et décisions

- Base Next.js 16 App Router / React 19, Tailwind 4, FR/EN et OpenNext existante conservée. Les correctifs de sécurité de la phase précédente sont préservés.
- La page répétait des listes textuelles et des cadres proches ; portfolio sans aperçus ni filtres. Recomposition complète avec rythme clair/sombre, titrage plus affirmé et six cartes de projets.
- « 1 Issue » local reproduit : React development tente `eval` pour ses outils de débogage, interdit par la CSP. `unsafe-eval` autorisé uniquement lorsque NODE_ENV=development ; absent du build de production, vérification par headers prévue dans les tests finaux.
- Images livrées via le chemin de transformation Next/OpenNext, sans binding Cloudflare Images. Des variantes WebP statiques sont maintenant générées localement et sélectionnées avec un loader Next.js ; aucun service payant nécessaire et aucun calcul d'image par visite.
- Pas de migration vinext : la documentation Cloudflare recommande cette piste pour les nouveaux projets, tout en maintenant son guide OpenNext pour les applications existantes. Notre build OpenNext fonctionne ; aucune justification à une migration risquée dans cette phase.

## Direction visuelle et implémentation

- Police variable Manrope auto-hébergée par next/font ; bleu nuit #061d38, bleu AWS et surfaces gris bleuté. Tokens, grilles, typographie, boutons et états dans `src/app/premium.css`.
- Header conservant son fonctionnement accessible et son logo, surface translucide discrète, état actif lisible. Sélecteur FR/EN avec libellé accessible contenant les sigles visibles.
- Hero en diptyque, titre expressif, hiérarchie des deux CTA, carousel existant, liens vers les trois univers. Aucun bouton Pause visible ajouté. Mouvement réduit respecté ; animation d'entrée sans cacher le contenu principal.
- Trois piliers en cartes éditoriales ; méthode en timeline sur fond bleu nuit, verticale sur mobile et horizontale sur desktop. Contenu toujours accessible sans animation.
- Expertises en compositions alternées, compétences en listes, CTA avec présélection du service. À propos, vision et fondateur recomposés en conservant les informations réelles.
- Portfolio : six projets conservés, quatre filtres React, détails natifs `<details>` accessibles au clavier. Aperçus CSS identifiés « Aperçu conceptuel » : aucune capture produit, technologie, URL ou référence client inventée. Les statuts exacts de réalisation restent à documenter avec le propriétaire ; les quatre axes non explicitement expérimentaux restent appelés « Axe de projet ».
- Contact : sept champs et flux serveur conservés, nouvelle présentation, coordonnées cliquables et lien de confidentialité. Footer : activités, réseaux fournis, informations légales, année calculée au rendu, correction du débordement email à 320 px.

### Comprendre le code

Les sections, titres, listes et liens sont du HTML sémantique rendu par React sur le serveur. CSS Grid répartit l'espace selon la largeur disponible ; les media queries passent des colonnes à une pile mobile. Seuls le menu, le carousel, le formulaire et les filtres du portfolio nécessitent un état React. Les filtres changent la liste visible, tandis que `<details>` gère l'ouverture des descriptions sans logique JavaScript supplémentaire. Les animations CSS respectent `prefers-reduced-motion`.

## Images et coût Cloudflare

`npm run images:prepare` génère 64 variantes à partir de huit images déjà utilisées, en conservant tous les originaux. Le loader renvoie un fichier statique adapté à la taille et au DPR, sans `/cdn-cgi/image` ni `/_next/image`. `sharp` est une dépendance de développement explicite, pas une nouvelle dépendance du navigateur. Les huit JPG sources non suivis à la racine n'ont pas été modifiés.

## Sécurité et confidentialité

Voir `docs/security-privacy-audit-2026.md` et `docs/aws-premium-2026.md` pour les preuves et limites de la phase précédente. Audit npm production : 0 alerte connue ; cinq alertes hautes restent dans l'outillage de développement. Validation serveur, lecture bornée, honeypot, contrôle d'origine et limite Worker par IP préparés. Le secret Gmail demeure absent du Worker de production ; aucun email réel envoyé pendant cette refonte. Le test SMTP Cloudflare reste nécessaire avant publication.

Cloudflare RUM est configuré avec exclusion UE dans la configuration précédemment lue ; aucun pixel publicitaire ou stockage applicatif ajouté. Pas de bannière artificielle. La politique préparée décrit RUM ; durées de conservation, accès à la boîte et transferts demandent une validation humaine/juridique. Aucun changement de production dans cette refonte.

## Validation

Les résultats définitifs des tests et les limitations sont consignés ci-dessous après exécution. Une mesure Lighthouse de laboratoire n'est pas une mesure terrain : INP nécessite des interactions représentatives et des données de visiteurs. Le serveur Worker local ne bénéficie pas de toute la compression/CDN Cloudflare de production.

Première mesure mobile FR : Performance 77, Accessibilité 97, Best Practices 100, SEO 100. Corrections guidées par ce rapport : variantes d'images, animation d'entrée sans opacité initiale, contraste des eyebrows, nom accessible FR/EN.

Mesure corrigée mobile FR : Performance 94, Accessibilité 100, Best Practices 100, SEO 100 ; LCP 3,0 s, CLS 0, TBT 50 ms. L'objectif LCP ≤ 2,5 s n'est donc pas encore atteint sur cette mesure locale ; à recontrôler dans une prévisualisation Cloudflare isolée avant toute affirmation terrain.

## Fichiers principaux

- `src/app/premium.css`, `globals.css`, `[locale]/layout.tsx`, `[locale]/page.tsx`.
- `Navbar.tsx`, `Footer.tsx`, `Hero.tsx`, `HeroMedia.tsx`, `Approach.tsx`, `Method.tsx`, `Expertises.tsx`, `Projets.tsx`, `Apropos.tsx`, `Vision.tsx`, `Fondateur.tsx`, `CtaFinal.tsx`, `Contact.tsx`.
- `src/i18n/dictionaries.ts`, `src/lib/image-loader.ts`, `next.config.ts`, `scripts/prepare-images.mjs`, variantes WebP et package/lock.

## Avant publication

1. Validation visuelle de la refonte FR/EN par Alfred.
2. Configuration privée de `GMAIL_APP_PASSWORD` dans un environnement Cloudflare de test autorisé ; test réel avec réception, sept champs et Reply-To. Ne jamais saisir le secret dans le chat ou Git.
3. Validation des informations légales manquantes et des vrais assets/statuts de portfolio.
4. Vérification GitHub des règles de branche et préparation d'une prévisualisation isolée si autorisée ; aucune route de production dans cet environnement.
5. Autorisation explicite avant fusion, push susceptible de publier ou déploiement officiel. Version stable précédente disponible pour rollback ; ne jamais forcer un push.

Référence : https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/

### Résultats finaux exécutés

| Mesure locale | Performance | Accessibilité | Best Practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| FR mobile | 94 | 100 | 100 | 100 | 3,0 s | 0 | 50 ms |
| EN mobile | 94 | 100 | 100 | 100 | 3,0 s | 0 | 90 ms |
| FR desktop | 100 | 100 | 100 | 100 | 0,8 s | 0 | 0 ms |

- `npm run lint`, `npm run typecheck`, `git diff --check`, build Next.js/OpenNext et dry-run Wrangler : PASS.
- Suite Playwright ajoutée (`tests/premium.spec.ts`, configuration strictement locale) : **9 tests réussis**, 26,8 s. Commande : lancer `npm run preview` dans un terminal, puis `npm run test:e2e` dans un autre. Google Chrome local nécessaire ; aucun destinataire réel contacté.
- FR/EN aux sept largeurs : aucun overflow, un seul h1, toutes les images chargées. Filtres 6 → 2 Finance → 1 IA → 6, ouverture des détails au clavier, menu mobile et Échap : PASS.
- Défaut réel découvert puis corrigé : ancien mapping `software-ia → option 2` présélectionnait Immobilier. Les trois services en FR/EN sélectionnent maintenant l'option attendue ; régression couverte par Playwright.
- Carousel observé 0 → 1 → 0 ; préférence de mouvement réduit = image stable : PASS.
- Métadonnées : canonical FR sur domaine officiel www, alternates fr/en/x-default, pages légales 200, robots/sitemap 200, route inconnue 404. Aucun lien d'ancre cassé trouvé.
- CSP production locale ne contient pas `unsafe-eval` ; l'indicateur Next « Issue » n'est plus présent en développement. Aucune erreur JavaScript capturée pendant les parcours.
- API locale : origine interdite 403, type incorrect 415, JSON incorrect 400, corps > 32 Ko 413, honeypot 400, secret absent 503 ; treizième requête dans la fenêtre = 429. Aucun faux succès ni email réellement envoyé.
- Aucun nom de secret Gmail ni adresse Gmail serveur trouvé dans les bundles statiques du client (recherche ciblée ; pas une preuve exhaustive de l'historique Git).
- Résumé machine : `docs/premium-2026-qa.json`. INP terrain non mesuré. Le test de réception réelle et le LCP mobile cible restent ouverts avant publication.

Git : aucun commit/push/fusion de cette phase. Les modifications préexistantes sont conservées, ainsi que les huit JPG non suivis à la racine. Aucun processus ALFRED AI TRADER touché.

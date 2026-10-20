# Projets — simplification du 20 octobre 2026

Historique consulté : 490a1a9 (grille éditoriale d'origine), 5997df1 (retour au
modèle sobre et descriptions précisées), état publié ede1363.

La structure validée est conservée : liste sémantique, numérotation, deux colonnes,
séparateurs, titres bleus, aucun grand visuel ni carte, invitation #contact existante.

Le bloc « Conception de sites web modernes / Modern web design » est retiré.
Sa seule réalisation directement prouvée dans ce dépôt était le propre site AWS,
que le propriétaire ne souhaite plus présenter ici. Aucun projet de remplacement.

Cinq entrées déclarées et documentées dans les dictionnaires historiques restent :
tourisme, fitness, analyse de marchés expérimentale, interface multi-actifs et
expérimentations IA/automatisation. Descriptions raccourcies, statut de projet ou
expérimentation explicite. Aucun client, livraison commerciale, résultat ou stack
non prouvé ajouté. Le développement web reste représenté par tourisme et fitness.

Les textes historiques constituent les informations fournies par le propriétaire,
pas des preuves indépendantes des fonctionnalités ou de l'avancement. Les limites
de preuve détaillées dans projects-editorial-details-2026.md restent valables.
Aucun accès ni modification d'ALFRED AI TRADER. Les captures techniques ou démos
nécessaires à une future étude de cas ne sont pas inventées.

## Prépublication

La première preview a révélé une erreur de paramètres de compilation : canonical
absent, robots noindex et sitemap vide. L'état publié précédent présentait la même
anomalie. Aucune modification de src/lib/seo.ts n'est nécessaire : le build doit
recevoir les valeurs publiques déjà définies pour la production.

Commande de compilation appliquée avant upload :

```sh
AWS_SITE_URL=https://www.alfredwinnerservices.com AWS_DEPLOYMENT_ENV=production AWS_INDEXING_ENABLED=true npx opennextjs-cloudflare build
```

Ne pas se fier uniquement aux variables runtime du Worker pour les métadonnées
SSG : vérifier canonical, indexability, robots et six URLs du sitemap dans le build
puis dans la preview et sur le domaine après publication. La preview conserve son
X-Robots-Tag noindex, indépendamment du build destiné au domaine public.

## Publication et validation

- Commit applicatif : 12fed15, poussé sur main et codex/aws-premium-2026.
- Worker publié à 100 % : 681396f1-b5ea-4631-8592-c98bb88d66d8,
  tag git-12fed15, avec les variables SEO de production appliquées au build.
- La preview 027002e6, compilée sans ces variables, n'a jamais été publiée.
- Lint/TypeScript/build Next/OpenNext et scan des secrets : PASS.
- Preview corrigée puis production : Chrome et WebKit, 14 formats FR/EN chacun,
  clavier, persistance entre pages/langues/onglets, ancienne version et stockage
  bloqué : PASS. Aucun débordement ni collision bannière/WhatsApp détecté dans
  ces mesures. Pas de test matériel iPhone/Android annoncé.
- Bannière FR mesurée : 131px à 320px, 110px à 375px, 89px à 430px,
  72px à 768px, 70px à 1440px. Ancien panneau environ 268px à 375px.
- Footer : liens accessibles au-dessus de la bannière et aucune réserve résiduelle
  après fermeture, contrôlés à 320/375/430/768/1440px.
- Régression publique FR/EN à 375/768/1440 : cinq entrées, CTA, images chargées,
  menus et navigation, quatre pages légales, 404, canonical/hreflang, robots,
  sitemap et reduced-motion PASS. Aucune erreur console/pageerror ou ressource
  en échec sur ces parcours.
- Canonical officiel, meta indexable, robots Allow et sitemap avec six URLs
  effectivement confirmés sur le domaine public après publication. HTTPS valide,
  TLS 1.3 négocié, HSTS conservé. Aucun DNS ni secret changé.
- Hero, Navbar, grille CSS Projets, Contact, API de contact et Footer inchangés
  (comparaison Git avec ede1363). Seul le positionnement/contrôle de collision
  WhatsApp est adapté à la nouvelle bannière.
- Site officiel ouvert dans Chrome et inspecté dans le navigateur Codex.
- Versions précédentes conservées pour rollback ; la version eaba6efa comporte
  l'ancienne anomalie SEO et n'est pas à privilégier pour rétablir l'indexabilité.

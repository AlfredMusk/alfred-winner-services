# AWS — publication du 19 octobre 2026

## Version publiée

- Site : https://www.alfredwinnerservices.com/fr et /en.
- Hébergement : Cloudflare Workers + OpenNext, Worker existant `alfred-winner-services`.
- Code Git : `e0c080d`, synchronisé sur `main` et `codex/aws-premium-2026`.
- Version Worker : `48569e67-717e-4c3e-b261-e09fe315ba6d`, tag `git-e0c080d`, trafic 100 %, publication 08:05 UTC.
- Hero et six blocs Projets validés conservés. Aucun nouveau redesign.
- Aucun changement DNS/MX, aucun service payant activé. Huit JPG sources non suivis préservés.

## Contrôles exécutés

- Lint, TypeScript, build Next.js 16.4.2 / OpenNext 1.20.12 : PASS.
- Tests Gmail API : huit PASS, couvrant erreurs, redirections fournisseur refusées, MIME UTF-8 et validation. Les tests unitaires ne simulent pas une livraison réelle.
- Playwright local FR/EN : neuf largeurs de 320 à 1920px PASS.
- Playwright production : FR/EN à 375, 768, 1440px PASS ; images, menus, CTA, liens sociaux/contact, quatre pages légales, réduction du mouvement, canonical, alternates, robots, sitemap et 404 vérifiés. Zéro erreur JavaScript/console et zéro ressource en échec sur ces parcours.
- HTTPS officiel 200 ; apex → www 301 avec chemin/query conservés ; www racine → /fr 307, sans boucle. Aucun noindex sur les pages publiques ; previews non indexables.
- Formulaire public testé une fois : HTTP 200, `livraison=envoye`, confirmation visible et réception INBOX Gmail confirmée. Identifiant `AWS-PRODUCTION-RELEASE-1792397136749`, message `1a15331e5187fd1c`. Sept champs et Reply-To vérifiés dans le message reçu.
- Lighthouse mobile production : FR 82/100/100/100 ; EN 81/100/100/100 (Performance/Accessibilité/Best Practices/SEO). CLS 0, LCP 4,3s FR et 4,5s EN. Mesures labo ponctuelles, pas garantie terrain ; performance perfectible sans bloquer cette release.
- Audit npm : zéro vulnérabilité de production connue lors du contrôle. Cinq alertes hautes d'outillage dev restantes, non corrigibles sans rétrogradation incompatible ; aucun `audit fix --force`.
- Aucun secret ajouté à Git ni au bundle statique.

## Corrections techniques

- WebP statiques redimensionnés, sans transformation payante au runtime.
- Cache SSG officiel OpenNext : `staticAssetsIncrementalCache` + interception. HTML/RSC préconstruits distribués par ASSETS, sans R2/KV/DO supplémentaire. Huit requêtes preview répétées 200/cache HIT ; contrôles publics PASS après publication. Correction des erreurs de ressources Free constatées dans la preview précédente.
- Footer : débordement email à 320px corrigé ; contraste méthode corrigé ; préchargement de navigation superflu désactivé.
- CSP compatible avec le beacon Cloudflare versionné, aucun unsafe-eval en production. HSTS 30 jours, nosniff, frame DENY, referrer/permissions présents.
- Anti-spam : validation serveur, Origin, honeypot, délai, limites par empreinte d'email et Worker 12 POST/minute/IP.
- Gmail API HTTPS actif, secrets serveur chiffrés. SMTP historique non sélectionné ; mot de passe existant inchangé. Application OAuth en production et consentement propriétaire obtenu ; application non vérifiée par Google, jeton révocable. Voir `gmail-api-setup.md`.

## Exploitation et publication suivante

GitHub seul ne publie pas automatiquement le Worker : pipeline manuel constaté.
Exécuter les contrôles, construire OpenNext, utiliser `opennextjs-cloudflare upload`
pour peupler le cache statique et préparer une version identifiable par commit,
tester la preview, puis publier la version exacte après autorisation. Ne pas
utiliser un simple upload Wrangler sans étape de peuplement du cache SSG.

Retour arrière : version précédente `dc1adbb5-40f5-4e00-99be-f76eb346da54`.
Attention : elle rétablit l'ancien code et l'ancien formulaire SMTP défaillant ;
elle ne constitue donc pas une solution de restauration du formulaire. Conserver
également la version courante validée pour revenir après de futures modifications.
Ne pas changer les domaines, secrets ou DNS pendant un rollback sans nécessité.

## Limites restantes

Aucune anomalie critique constatée sur les parcours testés. Les quotas Workers
Free restent limités ; cette validation n'est pas un test de charge ni une
promesse de gratuité illimitée. Surveiller consommation et erreurs de formulaire.
La vérification Google de l'application OAuth demeure distincte de sa publication.
Les validations juridiques, droits d'images et politiques de conservation restent
sous responsabilité du propriétaire ; aucun résultat de conformité absolue annoncé.

# AWS — préparation de publication du 19 octobre 2026

## Version courante

Le Hero et les six blocs éditoriaux Projets validés sont conservés. Les anciens rapports Premium décrivent des prototypes historiques, pas cette version. Huit JPG sources non suivis sont conservés hors commit.

Infrastructure active : Cloudflare Workers + OpenNext, projet `alfred-winner-services`, domaines apex et www existants. Aucun changement DNS/MX, aucune activation payante. Production stable post-ajout du secret Gmail : `dc1adbb5-40f5-4e00-99be-f76eb346da54`. La mise à jour du code n'est pas encore publiée.

## Contrôles exécutés

- Lint, TypeScript, build Next.js 16.4.2 et OpenNext 1.20.12 : PASS.
- Playwright FR/EN aux largeurs 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920 : PASS. Images, menus, CTA, contacts externes (URLs), pages légales, 404, responsive et réduction du mouvement vérifiés. Aucun débordement horizontal, pageerror, console error ou ressource en échec sur ces parcours locaux.
- Canonical, alternates, robots et sitemap : PASS dans le build local configuré avec le domaine officiel.
- Logique du Worker : 21 contrôles PASS avec handler Next simulé. Redirections apex/ancien hôte vers www avec chemins/query, domaine officiel sans boucle, aperçu noindex et refus anti-spam vérifiés. Adaptation réelle à vérifier après publication.
- API : limites/validation/Origin/honeypot/taille/délai/refus sans configuration et rate limiting vérifiés localement, aucun succès simulé.
- Gmail API : six tests unitaires de protocole/erreurs PASS, avec identifiants factices. Aucun test unitaire ne vaut preuve d'envoi.
- Lighthouse mobile local FR/EN : Performance 88, Accessibilité 100, Best Practices 100, SEO 100. CLS 0 ; LCP 3,7 s FR et 3,8 s EN. Mesures labo, pas terrain ; à recontrôler sur le domaine publié.
- Audit npm : 0 vulnérabilité de production connue ; 5 alertes hautes d'outillage dev non corrigibles sans rétrogradation incompatible lors de la vérification. Aucun audit fix --force.

## Corrections de release

- Images WebP statiques redimensionnées, sans transformation payante au runtime ; originaux conservés.
- Footer : débordement email à 320px corrigé ; contrastes des numéros méthode corrigés ; préchargement de navigation superflu désactivé.
- CSP : chemin beacon Cloudflare officiel/versionné ; aucun unsafe-eval en production. HSTS 30 jours, autres en-têtes existants conservés.
- Limite Worker contact 12 POST/minute/IP, complément à la validation serveur et à la limite par empreinte d'email.
- API Gmail HTTPS préparée derrière activation explicite, SMTP historique conservé. Aucun changement des champs visibles.

## Blocage restant

Secret Gmail SMTP présent, mais connexions 465 et 587 refusées depuis Worker avant authentification (`ESOCKET`, étape `CONN`). Aucun email reçu confirmé.

Gmail API autorisée par le propriétaire : client dédié créé, portée d'envoi uniquement déclarée, nouveau secret stocké localement hors Git. Passage de l'application OAuth en production et consentement personnel encore attendus. Ne pas publier une configuration reposant sur un refresh token de test expirant après sept jours. Après autorisation, provisionner les secrets Worker, tester l'envoi/réception réelle avec sept champs et Reply-To, puis publier.

## Publication et rollback

Push GitHub seul ne publie pas le Worker (pipeline manuel constaté). Publier une version identifiable par commit, conserver les deux domaines existants et les secrets, puis vérifier réellement FR/EN, redirects, assets, SEO, HTTPS et contact. Si régression, revenir à la version Worker stable consignée ci-dessus en tenant compte des secrets conservés. Aucun déploiement du domaine officiel avant levée du blocage contact.

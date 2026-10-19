> Décision du 18 octobre 2026 : retour au modèle visuel en production. Refonte Premium sauvegardée hors du dépôt ; correctifs techniques conservés.

# AWS Premium 2026 — état technique et publication

État au 18 octobre 2026. Cette branche est une prévisualisation locale ; aucun changement de cette phase n'est publié sur le domaine officiel.

## Architecture constatée

- Source : dépôt Git, branche de travail `codex/aws-premium-2026` créée depuis `codex/cloudflare-restore`.
- Application : Next.js 16 App Router, pages FR/EN pré-rendues lorsque possible, `/api/contact` côté serveur.
- Production active : Worker Cloudflare `alfred-winner-services` avec OpenNext. Wrangler affiche des déploiements existants ; le domaine officiel reste sur la version publiée antérieurement.
- `wrangler.jsonc` déclare les variables publiques, les assets et une limite Cloudflare de 12 requêtes POST contact par minute et par IP. Les assets statiques sont distribués séparément du code Worker.
- Aucun workflow GitHub Actions dans le dépôt. Le déploiement actuel est manuel via Wrangler ; **un push GitHub seul ne publie pas la production**. À revalider dans le tableau de bord Cloudflare (éventuelle intégration Git externe).
- `netlify.toml` est conservé uniquement pour le 301 de l'ancien sous-domaine technique : un test HTTP public confirme `netlify.app/fr` → `www.alfredwinnerservices.com/fr`. Il ne sert pas au déploiement Cloudflare et ne justifie aucun nouvel hébergement Netlify.
- Tableau de bord du 18 octobre 2026 : zone `alfredwinnerservices.com` en **Free Plan**, **Workers Free** actif, aucun moyen de paiement enregistré. Environ 1,33 k requêtes de zone / 24 h, 37 Mo transférés, 0 erreur 5xx ; environ 1,05 k invocations Worker / 24 h, 0 erreur et 0 dépassement CPU/mémoire signalé. Les valeurs fluctuent et ne remplacent pas une surveillance continue. Le P90 CPU affiché côté Worker (~341 ms) mérite un suivi, même si aucun dépassement n'est signalé ; ne pas inférer une facturation ou un échec à partir de cette seule métrique.
- La version Worker de production lue dans Cloudflare est `64af91b9` (déploiement manuel Wrangler) ; aucune intégration Git de déploiement automatique n'est indiquée dans le tableau de bord.

## Sécurité et dépendances

- Next.js 16.4.2, React 19.2.8, OpenNext Cloudflare 1.20.12, Wrangler 4.151.1. OpenNext documente la prise en charge des versions mineures et correctives de Next.js 16.
- `npm audit --omit=dev` : 0 vulnérabilité connue. `npm audit` complet : 5 alertes hautes dans l'outillage de développement (`@next/eslint-plugin-next`, `eslint-config-next`, `braces`, `fast-glob`, `micromatch`). Aucune correction compatible disponible dans les versions actuelles ; ne pas appliquer `npm audit fix --force` qui rétrograde l'outillage.
- En-têtes : CSP existante, Referrer-Policy, Permissions-Policy, X-Content-Type-Options, X-Frame-Options et HSTS `max-age=2592000` dans la branche, aligné sur le réglage Cloudflare actif. La CSP autorise encore les scripts/styles en ligne pour la compatibilité Next.js ; un durcissement par nonce demanderait une validation approfondie du rendu statique et n'est pas inclus dans cette phase.
- Formulaire : validation serveur, liste des services dérivée des dictionnaires, contrôle d'origine, limite du corps JSON **pendant sa lecture**, honeypot, délai minimum, limite locale par empreinte d'email et limite Cloudflare par IP préparée dans le Worker. Les limites Cloudflare sont distribuées par localisation et peuvent compter ensemble des utilisateurs derrière une même IP ; surveiller les 429 après publication. Une règle WAF gratuite 5 POST/10 s/IP a été validée dans l'interface mais **non déployée** car la publication de cette phase exige l'accord du propriétaire.
- SMTP Gmail : destination `krodi2001@gmail.com`, expéditeur authentifié sur ce compte, `Reply-To` fourni par le visiteur. `GMAIL_APP_PASSWORD` est **absent** de la liste des secrets du Worker de production ; la route renvoie 503 lorsque ce secret manque. Aucun email de cette phase n'a été envoyé ni reçu.
- Pour activer le formulaire : Cloudflare Dashboard → Workers & Pages → `alfred-winner-services` → Settings → Variables and Secrets → ajouter `GMAIL_APP_PASSWORD` en **Secret** dans l'environnement de production. Le propriétaire saisit lui-même la valeur ; ne jamais la transmettre en chat, l'ajouter au code ou la commiter. Ensuite publier une version validée et faire un test réel avec accusé de réception côté boîte mail. Vérifier la compatibilité SMTP sortante de Cloudflare lors de ce test ; ne pas présumer d'une livraison effective.

## Quotas et coûts à surveiller

La documentation [Cloudflare Workers Free](https://developers.cloudflare.com/workers/platform/pricing/) annonce 100 000 requêtes Worker par jour. Les [limites d'exécution](https://developers.cloudflare.com/workers/platform/limits/) indiquent 10 ms de CPU par requête gratuite et 128 Mo de mémoire par isolate. Les [requêtes d'assets statiques](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/) sont gratuites et illimitées, sous réserve des limites de taille et de nombre d'assets. Les routes dynamiques et le formulaire consomment des invocations ; le pré-rendu FR/EN et les assets statiques limitent cette consommation. Forfait et usage du compte confirmés ci-dessus ; aucun service payant n'a été activé.

## Validation puis publication

1. Terminer la revue visuelle de la **navigation seulement** sur l'aperçu local, FR/EN et mobile/tablette/desktop. Obtenir la validation explicite de cette section avant de commencer le Hero.
2. Vérifier `npm run lint`, `npm run typecheck`, `npm run build`, `npx opennextjs-cloudflare build`, `npx wrangler deploy --dry-run`, puis les routes et en-têtes dans `npx opennextjs-cloudflare preview`.
3. Créer un commit logique sur la branche dédiée. Préparer une prévisualisation Cloudflare isolée seulement après revue de son coût et de son routage. Aucun déploiement de cette branche vers `alfred-winner-services` pour la seule prévisualisation.
4. Avant publication, vérifier les variables et secrets du Worker, les métriques CPU, le formulaire réel, SEO, FR/EN, responsive et absence de régression. Relever la version Cloudflare stable actuelle.
5. Après autorisation explicite du propriétaire, publier le commit approuvé sur le Worker officiel. Contrôler `/`, `/fr`, `/en`, légales, assets, console, API contact et réception de l'email. En cas de régression, utiliser le rollback de déploiement Cloudflare vers la version stable relevée, puis recontrôler le site.

Références : [OpenNext Cloudflare](https://opennext.js.org/cloudflare), [Cloudflare rate limiting](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/), [Cloudflare Workers limits](https://developers.cloudflare.com/workers/platform/limits/).

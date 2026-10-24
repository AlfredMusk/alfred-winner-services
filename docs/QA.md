# Régression AWS — commandes et périmètre

Node 24, npm et OpenSSL sont nécessaires. Les navigateurs sont ceux de Playwright.

```sh
npm ci
npx playwright install chromium firefox webkit
npm run lint
npm run typecheck
npm test
npm run build:qa
npm run test:e2e
npm run build:cloudflare
npm audit
```

Sous Linux, installer les bibliothèques navigateur avec `npx playwright install --with-deps chromium firefox webkit`.

Les tests E2E attendent un build avec les métadonnées du domaine officiel. Le serveur QA est exclusivement local, sur **127.0.0.1:3100**. Il refuse de réutiliser un serveur existant : arrêter personnellement un éventuel serveur AWS de développement avant la suite. Ne jamais toucher aux ports 3000–3002.

Le serveur QA utilise le build Next et un certificat HTTPS éphémère : Safari applique réellement `upgrade-insecure-requests`, même en local. L'exception de certificat dans Playwright ne concerne que cette URL loopback ; aucune protection du site, CSP, TLS Cloudflare ou navigateur personnel n'est modifiée. La clé temporaire n'entre jamais dans Git. `npm start`, l'architecture de production et le Worker restent inchangés.

## Ce qui est testé

- 25 tests Node : véritable logique des handlers, validation, payloads, limites, origine, honeypot, erreurs Gmail/SMTP, MIME/Reply-To, routage Worker, rate limiter, dictionnaires et assets Git.
- Suite navigateur FR/EN sur Chromium, Firefox et WebKit mobile : pages, métadonnées, six projets, images, menus/clavier, changement de langue avec chemin/query/ancre, présélection des trois services, ancres et coordonnées.
- Dix largeurs : 320, 375, 390, 393, 430, 768, 1024, 1280, 1440 et 1920 px ; captures et contrôle d'overflow.
- Axe WCAG 2 A/AA, 2.1 AA et 2.2 AA sur accueil et confidentialité ; contrôle automatisé, pas certification ni remplacement d'un audit humain.
- Trois cycles du carousel, géométrie stable après l'animation d'entrée et réduction des mouvements.
- Notice informative : fermeture, persistance, stockage indisponible, absence de cookies applicatifs. Ce n'est pas une CMP : aucun consentement publicitaire n'est fabriqué.
- Formulaire : erreurs, réponse fournisseur simulée, succès explicitement confirmé par le mock, timeout et possibilité de réessayer.

Les transports de messagerie sont **simulés** dans les tests ; les secrets du serveur E2E sont explicitement vides. Aucun test ne transmet d'email réel. Un test positif ne prouve donc ni la délivrabilité Gmail ni une réception en boîte. Tester une livraison réelle séparément, avec autorisation et une adresse contrôlée.

Les artefacts `test-results/` et `playwright-report/` sont locaux/ignorés. Ouvrir le rapport avec `npx playwright show-report`. Les traces/captures d'échec contiennent exclusivement les données fictives locales.

## GitHub et publication

`.github/workflows/quality.yml` vérifie chaque PR, main et branche codex : audit, lint, types, tests Node, build Next, trois moteurs navigateur, build OpenNext. Un échec rend le job rouge ; rendre ce job obligatoire dans les protections de branche reste une action d'administration, non réalisée ici.

Ce workflow ne possède aucun secret et **ne déploie pas**. Après contrôles et validation : publier uniquement un commit identifiable avec l'outillage Cloudflare déjà configuré. Ne jamais déployer un répertoire contenant des changements de code non relus.

Avant publication, enregistrer `npx wrangler deployments status`. Conserver l'identifiant de la version précédente ; en cas de régression, utiliser `npx wrangler rollback <version-id>` après vérification de la cible. Les versions de secrets doivent rester compatibles. Aucun changement DNS n'est nécessaire.

## Maintenance des dépendances

L'override `miniflare > undici ^7.30.1` remplace la version transitive vulnérable dans la même version majeure. Il est couvert par le build OpenNext. Le supprimer lorsque Wrangler/Miniflare intègre naturellement une version corrigée. Ne pas utiliser `npm audit fix --force` pour rétrograder OpenNext ou Wrangler.

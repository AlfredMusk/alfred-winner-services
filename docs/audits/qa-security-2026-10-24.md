# AWS — QA, sécurité et non-régression — 24 octobre 2026

## A. Architecture et périmètre

Site vitrine Next.js 16.4.3, React 19.2.8, TypeScript, Tailwind 4. App Router ; accueil FR/EN et deux pages légales par langue générés statiquement, racine redirigée vers FR, 404 localisée. Aucune fonctionnalité de compte utilisateur ni base de données métier.

OpenNext Cloudflare 1.20.13, Wrangler 4.152.0, Worker `alfred-winner-services`, ressources statiques et cache précompilé. Le wrapper Worker assure les redirections de domaine et le rate limiting distribué. `/api/contact` utilise Gmail API HTTPS/OAuth en production ; le chemin SMTP historique est conservé mais non sélectionné. Liens externes WhatsApp, Facebook et LinkedIn ; Cloudflare Web Analytics injecté observé sur le site publié.

Sources, routes, dictionnaires, composants, CSS, configuration Next/OpenNext/Worker et dépendances inspectés. Design, contenus, photographies, navigation et DNS préservés. Huit JPG originaux non suivis et changements/documentation antérieurs conservés hors de ces commits.

## B. Défauts établis

| Gravité | Observation et cause | Impact / correction |
|---|---|---|
| Important | `npm audit` initial : 7 entrées, dont 3 high et 4 moderate, aucune critical ; certaines entrées sont la propagation d'une même dépendance | Nodemailer, body-parser, Zod et Undici corrigés ; cela ne prouve pas une exploitation du site. Une partie touche seulement l'outillage. |
| Mineur | `<visitor@example.com>` accepté avec HTTP 200 dans un test de la véritable route, transport simulé | Le validateur acceptait des délimiteurs de boîte ; validation partagée client/serveur désormais limitée à une adresse seule. Pas d'exfiltration ou envoi arbitraire démontré. |
| Important pour la fiabilité | Le client n'avait aucun timeout : un fetch suspendu pouvait conserver le formulaire en cours d'envoi | AbortController 30 s, erreur existante puis possibilité de réessayer. Scénario réseau suspendu couvert. |
| Important pour la maintenance | Pas de suite navigateur ni de workflow de régression ; tests Gmail isolés seulement | Playwright multi-moteurs, intégration route/Worker, contrats FR/EN et CI sans secret ni déploiement automatique. |

Le serveur de test HTTP provoquait des erreurs Safari car la CSP exige HTTPS. Le harness QA utilise désormais HTTPS local ; la CSP de production reste inchangée. Les captures haute densité du simulateur iPhone ont été ramenées à l'échelle CSS, avec un budget de 90 s pour les dix viewports et deux audits axe. Ces corrections concernent les tests, pas des défauts du site publié.

## C. Modifications

- `src/lib/contact.ts` : validateur partagé de boîte unique.
- `src/app/api/contact/route.ts` : utilisation du validateur, destinataire et transport inchangés.
- `src/components/sections/Contact.tsx` : même validation et timeout ; aucune modification visuelle ou de texte.
- `package.json`, `package-lock.json` : mises à jour compatibles et outils de test ; `next typegen` avant TypeScript pour les checkouts neufs.
- `eslint.config.mjs` : exclusion des rapports générés, sans exclusion du code ni des tests.
- `playwright.config.ts`, `tests/e2e/site.spec.ts`, `scripts/start-qa-server.mjs` : tests navigateur et serveur HTTPS loopback exclusivement QA.
- `scripts/test-{module-loader,contact-route,cloudflare-worker,site-contracts}.mjs` : tests de la logique TypeScript réelle, dépendances externes explicitement simulées.
- `.github/workflows/quality.yml`, `docs/QA.md`, présent rapport et entrée propre du journal.

## D. Vérifications

Lint, TypeScript, build Next et build OpenNext : PASS. Tests Node : 25/25. Suite Playwright complète : 42/42, aucun test ignoré, aucune reprise ni test flaky dans le dernier passage. npm audit : zéro alerte. Résultats structurés dans `qa-results-2026-10-24.json`.

Couverture : 25 tests Node ; 42 scénarios Playwright sur Chromium, Firefox et WebKit mobile. FR/EN ; 320/375/390/393/430/768/1024/1280/1440/1920 px ; pages, images réellement chargées, six projets, canonical, menu/clavier/Escape, changement de langue avec query/ancre, présélection des trois services, liens de contact, confidentialité avec stockage bloqué, carousel trois cycles et mouvement réduit, formulaire et timeout, 404, méthodes API et en-têtes.

Axe analyse l'accueil et la page de confidentialité aux règles WCAG 2 A/AA, 2.1 AA et 2.2 AA. Les captures desktop/mobile ont été inspectées. Cela ne couvre pas tous les lecteurs d'écran, appareils physiques ou navigateurs possibles.

Tests API : origine, Content-Type, JSON invalide, tailles, champs obligatoires, injection d'en-tête, délimiteurs email, valeurs FR/EN, honeypot, soumission trop rapide, limites, erreurs provider et absence de configuration, identité de réponse, absence de faux succès. Le wrapper Worker échoue en 503 sans binding de limitation et renvoie 429 quand sa limite est atteinte.

**Aucun email réel n'a été envoyé pendant cet audit.** Les tests Gmail/SMTP utilisent des mocks et ne confirment pas une réception en boîte. La présence des noms de secrets Cloudflare a été vérifiée, pas leurs valeurs ; Gmail API n'a pas été réautorisé.

## E. Sécurité et limites

Audit npm final : **0 vulnérabilité connue** à la date du contrôle, toutes dépendances incluses. Correctifs compatibles, sans `audit fix --force`. Override limité à Miniflare → Undici 7.30.1 ; retirer lorsque la dépendance amont l'intègre naturellement.

Sources officielles : [Nodemailer](https://github.com/advisories/GHSA-8c8m-p3m8-cjg8), [body-parser](https://github.com/advisories/GHSA-27r3-jxmh-p828), [Zod](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5), [Undici](https://github.com/advisories/GHSA-xjj6-f33q-929c).

HTTPS public, HSTS 30 jours, nosniff, DENY, Referrer-Policy, Permissions-Policy et CSP contrôlés. Pas de `unsafe-eval` en production. `unsafe-inline` reste autorisé pour les scripts/styles Next statiques : restriction résiduelle connue, aucun faux niveau de protection annoncé. Ne pas imposer des nonces sans mesurer l'effet sur le rendu statique et le coût Worker.

Analyse des fichiers Git pour signatures de clés privées, tokens GitHub, clés Google et secrets OAuth : aucun résultat ; aucun export `.env`/OAuth suivi. C'est une recherche ciblée, pas une preuve exhaustive de l'historique ni une certification. Secrets serveur seulement ; aucun nouveau secret créé, lu ou publié.

La notice de confidentialité n'est pas un consentement publicitaire. Elle mémorise uniquement sa fermeture. Aucun cookie applicatif n'est créé dans les tests. Cloudflare Web Analytics est observé en production et décrit en FR/EN ; aucun Google Analytics ou Meta Pixel n'est observé. Sa qualification juridique et l'éligibilité à une exemption doivent rester validées par le responsable du traitement selon les régions concernées. Ajouter une CMP et bloquer les traceurs avant consentement si des outils qui l'exigent sont ajoutés.

Pas de test d'intrusion, de saturation du rate limiter public, ni de modification des règles Cloudflare, des accès ou protections de branche. Lighthouse 13.5.0, build HTTPS local FR/mobile : performance 77, accessibilité 100, bonnes pratiques 100, SEO 100 ; LCP simulé 4,0 s, CLS 0,011 et TBT 160 ms. Le score de performance est à améliorer, notamment le rendu du Hero et les images ; aucune refonte ou dégradation des photos validées n’est imposée ici. Le test Lighthouse public a échoué avec NO_FCP et ne permet aucune note de production. Les Core Web Vitals terrain/INP ne peuvent pas être certifiés par un test laboratoire. Les protections contre tous les abus ne sont pas garanties ; le honeypot et le délai ne remplacent pas le limiteur distribué.

## F. Publication et retour arrière

Branche dédiée : `codex/qa-hardening-2026-10-24`. Aucun force push. Pipeline ajouté : audit, lint, types, tests, build Next, E2E et build OpenNext. Job bloquant en cas d'échec ; protection de branche inchangée. Aucun secret de déploiement ajouté à GitHub.

Version Cloudflare stable avant intervention : `2508cfa9-9f5a-4aac-b5c6-2ca368f3582d`, tag `git-82fcad1`. Retour arrière documenté via Wrangler vers cette version après vérification. Domaine et DNS inchangés.

URL contrôlée : https://www.alfredwinnerservices.com/fr et /en. Contrôle public initial curl : six pages en 200, racine vers FR, 404 réelle, GET API 405, robots autorisé, sitemap six URL officielles et canonical exacts. Python urllib recevait 403, alors que curl et navigateur réel accédaient au site ; aucune protection n'a été désactivée.

Chrome personnel n'est pas exposé par la connexion navigateur disponible ; tests Chromium exécutés et vérification visuelle dans le navigateur Codex. Ne pas confondre ces deux environnements.

## G. Conclusion bornée

La version est consolidée pour les parcours vérifiés. La livraison réelle d'un email, la conformité juridique et les métriques terrain restent des validations distinctes ; aucune certification de sécurité ou absence absolue de bugs n'est revendiquée.

## Relevé de clôture

À compléter après les derniers contrôles et opérations Git/Cloudflare.

# AWS — performances mobiles, formulaire réel et CSP

## Périmètre

Suite de l'audit QA du 24 octobre 2026, sur `codex/performance-csp-2026-10-24`. Design, textes, photos sources, recadrages, dimensions, animations, destinations du formulaire, DNS et secrets conservés. Aucun service payant activé.

## Performance : comparaison contrôlée

Lighthouse 13.5.0 / même Chrome, profil mobile et build Next de production sur HTTPS local. Passages séquentiels sans compilation ni autres tests en parallèle. Le 77/100 historique ne doit pas être attribué directement aux changements : la nouvelle référence isolée, avant modification, atteignait déjà 90.

| Mesure | Audit précédent | Référence isolée avant | Après |
|---|---:|---:|---:|
| Performance mobile | 77 | 90 | **91, 91, 91 en FR ; 91 en EN** |
| Accessibilité / bonnes pratiques / SEO | 100 / 100 / 100 | 100 / 100 / 100 | 100 / 100 / 100 |
| Volume mesuré FR | — | 529 KiB | 504 KiB |
| LCP simulé | 4,0 s | 3,5 s | 3,5 s |
| TBT | 160 ms | 90 ms | 80–90 ms |
| CLS | 0,011 | 0,011 | 0,011 FR ; 0,009 EN |

Les mêmes photographies possèdent désormais des variantes AVIF, qualité 70, aux dimensions existantes. Les PNG/JPG originaux et les WebP déjà présents sont inchangés. Logos en WebP conservés. Les largeurs annoncées par Next sont alignées sur les variantes pré-calculées. Pas de transformation payante ou serveur par requête.

Les variantes photo comparables passent de 1 155 082 à 1 006 712 octets, soit environ **12,8 %** de moins. Le poids total d'une page baisse d'environ 5 %, pas de 13 %. Les images AVIF sont testées sur Chromium, Firefox et WebKit ; aucune promesse pour des navigateurs anciens non pris en charge par Next.

Le seuil demandé est atteint dans les quatre mesures laboratoire. Ce n'est pas une garantie universelle de score : réseau, appareil, charge CPU et script Analytics injecté en production peuvent changer le résultat. Le LCP simulé reste au-dessus de 2,5 s ; les Core Web Vitals terrain ne sont pas validés par ce test. Animations et transitions sont conservées.

## CSP

Avant : scripts et styles inline largement autorisés ; images depuis tout hôte HTTPS.

Après :

- `script-src-attr 'none'` bloque les gestionnaires HTML comme `onclick="…"`. Les événements React restent fonctionnels.
- `style-src 'self'` et `style-src-elem 'self'` en production bloquent les blocs `<style>` injectés ; les feuilles CSS compilées restent autorisées.
- `style-src-attr 'unsafe-inline'` reste nécessaire aux styles React/Next (images fill, positionnement, opacité du slider et notice).
- `img-src 'self' data: blob:` limite les images aux ressources utilisées par AWS ; plus d'autorisation HTTPS générale.
- `script-src 'unsafe-inline'` reste nécessaire au bootstrap/RSC statique de la configuration actuelle. Il n'est **pas supprimé ni présenté comme supprimé**. Pas de `unsafe-eval` en production.
- La souplesse des styles en développement reste limitée à `NODE_ENV=development` pour Fast Refresh.

Les nonces imposeraient un rendu dynamique et compromettraient la stratégie de cache actuelle. Le SRI est expérimental et ne constitue pas à lui seul une autorisation des scripts inline App Router. Aucun montage fragile sur les fichiers internes de build n'a été ajouté.

Références : [Next CSP](https://nextjs.org/docs/app/guides/content-security-policy), [script-src-attr](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src-attr), [style-src-elem](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src-elem).

## Tests

Les **67 tests existants** ont été rejoués : 25 tests Node et 42 scénarios navigateur. Trois nouveaux passages (un par moteur) vérifient effectivement le blocage des handlers inline, des styles injectés et d'une image distante. Bilan : **70/70**, sans test ignoré ni reprise dans le dernier passage local.

Responsive 320–1920 px, FR/EN, formulaires simulés, erreurs/timeouts, clavier, langues, confidentialité, images AVIF, carousel sur trois cycles et mouvement réduit : PASS. Lint, types, builds Next et OpenNext : PASS. npm audit : zéro alerte connue au contrôle. Résultats et mesures dans `performance-csp-results-2026-10-24.json`.

La vérification automatisée des abus reste locale : origine, JSON, tailles, injection, champs, honeypot, temporisation, limitation email et limitation Cloudflare. Aucun test de saturation n'est réalisé sur le site public.

## Formulaire réel et publication

Le propriétaire a explicitement autorisé **un seul envoi** vers `krodi2001@gmail.com`. Les sept champs seront remplis avec des données AWS de test et un identifiant unique `AWS-QA-20261024-PERF-CSP`. Aucun prospect n'est contacté. Aucune modification du destinataire ou des secrets.

État de la publication et preuve de réception : à compléter après la CI et le test unique. Une réponse HTTP positive seule ne sera pas assimilée à une réception en boîte.

## Fichiers

- `next.config.ts` : tailles des variantes et CSP.
- `scripts/prepare-images.mjs`, `src/lib/image-variants.json`, nouveaux AVIF sous `public/images/` : compression des mêmes photos.
- `tests/e2e/site.spec.ts` : trois passages de sécurité supplémentaires.
- Présent rapport, preuves JSON et entrée propre du journal.

Les changements de journal antérieurs et les huit JPG non suivis restent hors de ces commits. Aucun dépôt, port ou processus ALFRED AI TRADER n'est modifié.

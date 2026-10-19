Site corporate bilingue d'Alfred Winner Services. Next.js 16.4.2, React 19, TypeScript strict et Tailwind CSS 4.

## Développement

Depuis ce repository :

```bash
npm run dev
```

Ouvrir [http://localhost:3100/fr](http://localhost:3100/fr) ou [la version anglaise](http://localhost:3100/en). Le port AWS est **3100**. Ne pas intervenir sur les processus ou ports d'ALFRED AI TRADER.

Les pages vivent dans `src/app/[locale]/`, les sections dans `src/components/sections/` et les textes FR/EN dans `src/i18n/dictionaries.ts`. Lire `AGENTS.md` et `travaux réalisés.md` avant modification.

## Contrôles locaux

```bash
npm run lint
npm run build
npm run typecheck
```

Le build génère les types des routes. `npm run start` sert le build de production sur 3100, après libération du serveur **AWS uniquement**. Montserrat est téléchargée par `next/font` pendant le build puis servie localement.

## Hébergement Cloudflare Workers

La production utilise Workers + OpenNext, car le formulaire `/api/contact`
requiert un runtime serveur. `npm run preview` construit puis sert le Worker
localement avec Wrangler ; `npm run deploy` construit et déploie après connexion
Cloudflare. `cloudflare-worker.ts` porte les redirections d’hôte et de langue.
Le domaine officiel est rattaché au Worker existant ; les variables publiques sont
dans `wrangler.jsonc`. La version autorisée a été publiée le 19 octobre 2026.
Le formulaire utilise Gmail API avec trois secrets serveur chiffrés ; aucun secret
ne doit être committé. Voir `docs/production-release-2026.md` pour la version active.
Voir `docs/aws-premium-2026.md` pour les quotas, les vérifications et le rollback.

## Avant publication

- **Contact** : `/api/contact` valide puis utilise le transport serveur explicitement configuré, vers le Gmail AWS. Transport HTTPS Gmail API actif et réception réelle vérifiée en production. SMTP historique conservé mais non sélectionné. Aucun faux succès. Voir `docs/gmail-api-setup.md`.
- Vérifier la cohérence des textes FR/EN des mentions légales et de confidentialité avec l'hébergement Cloudflare actif.
- Confirmer les droits des images fournies et l'origine des visuels Hero : voir `ASSETS_SOURCES.md`.
- Conserver `AWS_SITE_URL` sur l'origine HTTPS officielle confirmée, sans chemin, paramètres ou identifiants.
- Pour activer l'indexation au **build de production public** : `AWS_DEPLOYMENT_ENV=production` et `AWS_INDEXING_ENABLED=true`. Sans ces valeurs, les pages restent `noindex`, le sitemap reste vide et les robots sont bloqués. Refaire le build après changement.
- Vérifier le compte WhatsApp correspondant au numéro configuré dans `src/lib/contact.ts`. Aucun message de test n'est envoyé automatiquement.
- Les URLs sociales absentes laissent les icônes non interactives. Les configurer uniquement avec les vraies URLs officielles.

Ne jamais versionner de secret : les fichiers `.env*` sont ignorés par Git.

## Formulaire — Gmail API en production

`CONTACT_EMAIL_TRANSPORT=gmail-api` sélectionne le transport HTTPS côté serveur.
Secrets Cloudflare : `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`.
Voir `docs/gmail-api-setup.md` pour le provisionnement sécurisé. L'ancien
`GMAIL_APP_PASSWORD` est conservé, mais SMTP n'est pas utilisé en production.

Destination : `krodi2001@gmail.com`. Email public : `contact@alfredwinnerservices.com`.
Reply-To : adresse validée du visiteur. Aucun OAuth demandé aux visiteurs.
Les origines autorisées sont les deux domaines HTTPS officiels dans `wrangler.jsonc`.

Anti-spam : validation serveur, honeypot, tailles limitées, Origin, délai minimal,
limite par empreinte d'email et limite Worker 12 POST/minute/IP. Ces limites ne
constituent pas une garantie contre tout spam distribué.

Le succès exige un ID de message Gmail ; une réception réelle a également été
vérifiée le 19 octobre 2026. Une erreur réseau après acceptation peut laisser un
résultat incertain : vérifier la boîte avant de répéter un test. Aucun nouvel essai
automatique ni garantie de livraison exactement une fois.

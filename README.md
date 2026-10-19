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
dans `wrangler.jsonc`. `GMAIL_APP_PASSWORD` doit être ajouté comme secret du Worker
dans Cloudflare, sans jamais le committer. La branche Premium 2026 reste en
prévisualisation locale tant que sa publication n'est pas explicitement validée.
Voir `docs/aws-premium-2026.md` pour les quotas, les vérifications et le rollback.

## Avant publication

- **Contact** : `/api/contact` valide puis utilise le transport serveur explicitement configuré, vers le Gmail AWS. SMTP historique conservé ; transport HTTPS Gmail API préparé mais non activé tant que son autorisation et sa réception réelle ne sont pas vérifiées. Aucun faux succès. Voir `docs/gmail-api-setup.md`.
- Vérifier la cohérence des textes FR/EN des mentions légales et de confidentialité avec l'hébergement Cloudflare actif.
- Confirmer les droits des images fournies et l'origine des visuels Hero : voir `ASSETS_SOURCES.md`.
- Conserver `AWS_SITE_URL` sur l'origine HTTPS officielle confirmée, sans chemin, paramètres ou identifiants.
- Pour activer l'indexation au **build de production public** : `AWS_DEPLOYMENT_ENV=production` et `AWS_INDEXING_ENABLED=true`. Sans ces valeurs, les pages restent `noindex`, le sitemap reste vide et les robots sont bloqués. Refaire le build après changement.
- Vérifier le compte WhatsApp correspondant au numéro configuré dans `src/lib/contact.ts`. Aucun message de test n'est envoyé automatiquement.
- Les URLs sociales absentes laissent les icônes non interactives. Les configurer uniquement avec les vraies URLs officielles.

Ne jamais versionner de secret : les fichiers `.env*` sont ignorés par Git.

## Formulaire — configuration Gmail SMTP

Serveur Node.js uniquement, Nodemailer, SMTP TLS `smtp.gmail.com:465`.
Expéditeur et destinataire : `krodi2001@gmail.com`. Reply-To : email validé du visiteur.

Secret à définir dans `.env.local` (ignoré par Git) pour le développement, puis
comme secret du Worker Cloudflare du bon environnement. L'origine autorisée
locale peut être définie séparément :

```dotenv
GMAIL_APP_PASSWORD=REMPLACER_PAR_LE_MOT_DE_PASSE_APPLICATION_GOOGLE
CONTACT_ALLOWED_ORIGINS=http://localhost:3100
```

Ne jamais utiliser le mot de passe habituel du compte, un préfixe `NEXT_PUBLIC_`,
ni partager le secret dans le chat. Créer un mot de passe d'application depuis
le compte Google `krodi2001@gmail.com`, après activation de la validation en deux
étapes, si cette fonctionnalité est disponible :
https://support.google.com/accounts/answer/185833

En production, `CONTACT_ALLOWED_ORIGINS` est déjà défini dans `wrangler.jsonc`
avec les origines HTTPS officielles.
Plusieurs origines autorisées peuvent être séparées par des virgules, sans slash
final. Définir explicitement les URLs Preview si les tests y sont souhaités.
Les POST sans origine ou provenant d'une autre origine sont refusés.
Redémarrer le serveur local après configuration ; sur l’hébergeur, redéployer après
modification des variables. Aucun secret n'est nécessaire au build client.

Anti-spam : honeypot, tailles et valeurs autorisées, contrôle Origin,
limite de trois tentatives SMTP par email sur dix minutes **par instance**.
Une limite Cloudflare supplémentaire de 12 POST par minute et par IP est déclarée
dans `wrangler.jsonc` pour la branche Premium 2026. La limite mémoire n'est pas
distribuée ; la limite Cloudflare est distribuée par localisation, donc aucune des
deux ne garantit seule l'arrêt de tout spam. Le délai client est un
signal complémentaire contournable, pas une protection suffisante.

Les champs sont conservés lors d'une erreur. Le bouton bloque la soumission
simultanée. Une erreur réseau après acceptation SMTP peut rendre le résultat
incertain : vérifier la boîte avant de répéter un test ; pas de garantie
exactement-une-fois. Le succès signifie acceptation SMTP, pas arrivée garantie
en boîte principale. Vérifier les sept champs, Reply-To, FR/EN, échecs et spam
par réception réelle Gmail avant de lever le BLOCKER. Gmail peut imposer des
quotas ou bloquer les connexions SMTP ; valider aussi depuis Cloudflare.

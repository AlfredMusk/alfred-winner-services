Site corporate bilingue d'Alfred Winner Services. Next.js 16.3.5, React 19, TypeScript strict et Tailwind CSS 4.

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

## Avant publication

- **Contact** : `/api/contact` valide puis envoie via SMTP Gmail vers `krodi2001@gmail.com`. Sans configuration ou en cas de refus SMTP, le formulaire affiche une erreur, jamais un faux succès. La réception réelle reste à vérifier avant production. Voir la configuration ci-dessous.
- Confirmer l'hébergeur et compléter les textes FR/EN des mentions légales et de confidentialité.
- Confirmer les droits des images fournies et l'origine des visuels Hero : voir `ASSETS_SOURCES.md`.
- Configurer `AWS_SITE_URL` avec l'origine HTTPS officielle confirmée, sans chemin, paramètres ou identifiants. Aucune URL de production n'est inventée dans le code.
- Pour activer l'indexation au **build de production public** : `AWS_DEPLOYMENT_ENV=production` et `AWS_INDEXING_ENABLED=true`. Sans ces valeurs, les pages restent `noindex`, le sitemap reste vide et les robots sont bloqués. Refaire le build après changement.
- Vérifier le compte WhatsApp correspondant au numéro configuré dans `src/lib/contact.ts`. Aucun message de test n'est envoyé automatiquement.
- Les URLs sociales absentes laissent les icônes non interactives. Les configurer uniquement avec les vraies URLs officielles.

Ne jamais versionner de secret : les fichiers `.env*` sont ignorés par Git.

## Formulaire — configuration Gmail SMTP

Serveur Node.js uniquement, Nodemailer, SMTP TLS `smtp.gmail.com:465`.
Expéditeur et destinataire : `krodi2001@gmail.com`. Reply-To : email validé du visiteur.

Variables privées à définir dans `.env.local` (ignoré par Git), puis dans les
variables Vercel du bon environnement :

```dotenv
GMAIL_APP_PASSWORD=REMPLACER_PAR_LE_MOT_DE_PASSE_APPLICATION_GOOGLE
CONTACT_ALLOWED_ORIGINS=http://localhost:3100
```

Ne jamais utiliser le mot de passe habituel du compte, un préfixe `NEXT_PUBLIC_`,
ni partager le secret dans le chat. Créer un mot de passe d'application depuis
le compte Google `krodi2001@gmail.com`, après activation de la validation en deux
étapes, si cette fonctionnalité est disponible :
https://support.google.com/accounts/answer/185833

En production, remplacer l'origine locale par l'origine HTTPS exacte du site.
Plusieurs origines autorisées peuvent être séparées par des virgules, sans slash
final. Définir explicitement les URLs Preview si les tests y sont souhaités.
Les POST sans origine ou provenant d'une autre origine sont refusés.
Redémarrer le serveur local après configuration ; sur Vercel, redéployer après
modification des variables. Aucun secret n'est nécessaire au build client.

Anti-spam : honeypot, tailles et valeurs autorisées, contrôle Origin,
limite de trois tentatives SMTP par email sur dix minutes **par instance**.
Cette limite mémoire n'est pas distribuée et peut être contournée avec d'autres
emails ou après redémarrage. Avant production, ajouter une limite WAF Vercel
sur POST `/api/contact`, avec quotas/coûts à vérifier. Le délai client est un
signal complémentaire contournable, pas une protection suffisante.

Les champs sont conservés lors d'une erreur. Le bouton bloque la soumission
simultanée. Une erreur réseau après acceptation SMTP peut rendre le résultat
incertain : vérifier la boîte avant de répéter un test ; pas de garantie
exactement-une-fois. Le succès signifie acceptation SMTP, pas arrivée garantie
en boîte principale. Vérifier les sept champs, Reply-To, FR/EN, échecs et spam
par réception réelle Gmail avant de lever le BLOCKER. Gmail peut imposer des
quotas ou bloquer les connexions SMTP ; valider aussi depuis Vercel.

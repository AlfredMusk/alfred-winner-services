# Gmail API — configuration serveur AWS

État : code préparé, pas activé en production. SMTP Gmail échoue depuis le Worker avant authentification (ESOCKET, étape CONN), sur 465 et 587. Aucun envoi/réception confirmé.

## Google

- Projet dédié : AWS Website Contact (`airy-parsec-512106-h7`).
- API : Gmail API activée.
- Client Web créé : AWS Contact — Cloudflare Server.
- Callback de provisionnement local uniquement : `http://localhost:8765/oauth2/callback`.
- Portée déclarée : `https://www.googleapis.com/auth/gmail.send` uniquement. Aucune lecture, suppression ou gestion de boîte Gmail.
- Secret initial non récupérable. Le propriétaire a généré un second secret ; celui-ci est sauvegardé localement dans le répertoire privé ignoré `.wrangler/gmail-setup/`, sans valeur affichée. Aucun secret supprimé/rotation effectuée. Ne jamais coller de secret dans le chat ou le dépôt.
- Autorisation OAuth personnelle du propriétaire encore à effectuer. Ne pas demander aux visiteurs du site de se connecter à Google.
- État de publication actuellement Test : ne pas qualifier cette configuration de production fiable. Les refresh tokens des applications externes en Test utilisant cette portée expirent après sept jours ; configurer et vérifier l'état de production approprié avant validation finale. Ne pas contourner les contrôles/avertissements Google.

## Cloudflare

Secrets à provisionner exclusivement côté serveur, après autorisation OAuth :

- `GMAIL_CLIENT_ID`
- `GMAIL_CLIENT_SECRET`
- `GMAIL_REFRESH_TOKEN`

Variable d'activation : `CONTACT_EMAIL_TRANSPORT=gmail-api`.

Le code conserve SMTP par défaut tant que le transport API n'est pas explicitement activé. Ne pas supprimer/changer `GMAIL_APP_PASSWORD` pendant le provisionnement. Ne pas activer le transport API sans les trois secrets.

Le transport HTTPS renouvelle le jeton via Google, construit un message MIME UTF-8, fixe la destination Gmail AWS et utilise l'adresse du visiteur comme Reply-To. Aucun jeton/réponse fournisseur/contenu de projet n'est journalisé. Aucun succès sans ID de message retourné par Gmail. Cet ID signifie acceptation par l'API, pas réception en boîte.

## Validation avant publication

1. Conserver les exports/tokens hors Git, permissions locales restreintes.
2. Autoriser uniquement le compte Gmail propriétaire ; vérifier la portée consentie.
3. Stocker les trois secrets dans une version de prévisualisation Worker, sans publier la nouvelle interface.
4. Tester une seule demande clairement identifiée avec les sept champs.
5. Vérifier HTTP 200, réception réelle et Reply-To ; aucun mock n'est une preuve d'envoi.
6. Vérifier la durée de validité OAuth et la procédure de révocation/réautorisation.
7. Publier uniquement après réussite réelle et contrôles de release.

Provisionnement local : `node scripts/authorize-gmail.mjs`, après création et sauvegarde privées du client Web. Le script génère l'URL Google dans le répertoire privé, vérifie state + PKCE S256, échange le code via HTTPS et sauvegarde uniquement les secrets serveur nécessaires. Le propriétaire doit personnellement accorder le consentement Google. Aucun endpoint de provisionnement ajouté au site public.

Tests de protocole / erreurs (sans envoi réel) : `npm run test:gmail-api`.

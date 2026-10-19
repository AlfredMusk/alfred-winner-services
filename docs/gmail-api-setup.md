# Gmail API — configuration serveur AWS

État au 19 octobre 2026 : Gmail API actif en production Cloudflare. Test réel sur le domaine officiel : HTTP 200, réception INBOX confirmée, sept champs et Reply-To vérifiés. SMTP 465/587 échouait avant authentification ; il reste conservé mais non sélectionné.

## Google

- Projet dédié : AWS Website Contact (`airy-parsec-512106-h7`).
- API : Gmail API activée.
- Client Web créé : AWS Contact — Cloudflare Server.
- Callback de provisionnement local uniquement : `http://localhost:8765/oauth2/callback`.
- Portée déclarée : `https://www.googleapis.com/auth/gmail.send` uniquement. Aucune lecture, suppression ou gestion de boîte Gmail.
- Secret initial non récupérable. Le propriétaire a généré un second secret ; celui-ci est sauvegardé localement dans le répertoire privé ignoré `.wrangler/gmail-setup/`, sans valeur affichée. Aucun secret supprimé/rotation effectuée. Ne jamais coller de secret dans le chat ou le dépôt.
- Autorisation OAuth personnelle du propriétaire effectuée pour la portée d’envoi uniquement. Ne pas demander aux visiteurs du site de se connecter à Google.
- Application OAuth passée en production et consentement accordé. L’application n’est pas vérifiée par Google : ne pas confondre publication et vérification Google. Le jeton peut être révoqué ou invalidé ; surveiller les erreurs et réautoriser personnellement si nécessaire. Le statut Production évite l’expiration propre au mode Test, sans garantir une validité illimitée.

## Cloudflare

Secrets provisionnés côté serveur, type `secret_text`, après autorisation OAuth :

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

## Résultat de production

Version Worker `48569e67-717e-4c3e-b261-e09fe315ba6d`, code `e0c080d`.
Test `AWS-PRODUCTION-RELEASE-1792397136749`, message Gmail `1a15331e5187fd1c`,
présent dans INBOX. Les sept champs et le Reply-To ont été lus et vérifiés.
Aucun identifiant ni contenu privé de demande client n'est versionné.

En cas de révocation : reprendre le script local avec le même compte et la même
portée, faire accorder le consentement personnellement, reprovisionner uniquement
les secrets serveur puis tester en preview avant publication. Ne jamais coller
un secret dans le chat. Les exports locaux restent hors Git, permissions restreintes.

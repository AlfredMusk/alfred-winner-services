# Notice de confidentialité et de sécurité

Notice informative non modale, FR/EN, partagée dans le layout ; aucun consentement
marketing n'est recueilli. Le lien permanent du footer mène à
`/[locale]/confidentialite#privacy-security`.

`localStorage` contient uniquement `aws:privacy-notice:dismissed` avec la version
`2026-10-19.1` après fermeture ou choix « En savoir plus ». Aucun identifiant de
visiteur, date, donnée de formulaire ni consentement n'est enregistré. La valeur
reste jusqu'à suppression des données par le visiteur/navigateur ou remplacement
lors d'une nouvelle version ; aucune expiration artificielle ne fait réapparaître
le panneau régulièrement. Même origine = même préférence FR/EN et entre pages.
Les événements storage synchronisent les autres onglets. Sans stockage autorisé,
la fermeture fonctionne en mémoire et peut être perdue au rechargement.

Une évolution significative de la politique exige d'incrémenter
`PRIVACY_NOTICE_VERSION` dans `src/lib/privacy-notice.ts`. Ce numéro n'est pas
une preuve de consentement. Ne pas le changer pour une simple modification visuelle.

Avant tout ajout de traceurs soumis au consentement : remplacer la notice par une
CMP effective, bloquer ces traceurs avant décision et offrir acceptation/refus/
personnalisation/retrait équivalents. Aucun mécanisme ne peut découvrir et intégrer
magiquement tous les futurs traceurs ; cette vérification fait partie de chaque
ajout d'intégration. Ne pas réutiliser la fermeture comme autorisation marketing.

Panneau fixe, sans overlay ni autofocus, titre accessible, lien natif, fermeture
44×44, focus remis au contenu sans défilement à la fermeture. Les petits écrans
et zones sûres sont pris en compte ; panneau défilable si hauteur réduite.

La politique décrit seulement les protections constatées, sans garantie absolue.
Aucune modification du Hero, de la navbar, des projets ou du formulaire.

## Publication vérifiée — 19 octobre 2026

- Commit fonctionnel : `9d543b5`, message `feat: add visible privacy and security notice`.
- GitHub main et branche synchronisés ; Worker `eaba6efa-b917-48bd-bda4-5658c4d4c165`,
  tag `git-9d543b5`, publié à 100 % après validation de la preview.
- Lint, TypeScript, build Next.js/OpenNext et scan des secrets : PASS.
- Chrome local + preview + domaine public : 14 formats FR/EN, 320 à 1440px,
  incluant paysage. WebKit : mêmes 14 contrôles réussis en preview et production.
- Fermeture clavier/tactile, persistance après reload/navigation/changement de
  langue, anciennes versions, synchronisation onglets et stockage bloqué : PASS.
- Contenu H1 immobile à la fermeture ; panneau sans collision avec WhatsApp,
  aucune erreur JavaScript observée. Titres/noms accessibles contrôlés ; pas de
  certification complète ni de test humain VoiceOver annoncé.
- WebKit en émulation iPhone 13 : toucher/fermeture/rechargement/lien footer FR/EN
  PASS sur le domaine public. Aucun appareil Safari/iPhone physique testé.
- Racine apex 301 vers www ; FR/EN/politique/robots/sitemap 200, cache HIT.
  Secret Gmail toujours secret_text ; formulaire et SMTP inchangés.
- Production consultée dans Chrome et dans le navigateur Codex.
- Retour arrière disponible : Worker `48569e67-717e-4c3e-b261-e09fe315ba6d`.

## 20 octobre 2026 — bannière compacte

Le panneau est remplacé par une bannière horizontale, ancrée à 12px du bas
plus la safe area. Texte court FR/EN fourni par le propriétaire, sans promesse
absolue de sécurité ni nouvelle demande de consentement. Apparition/disparition
180ms, supprimées en mouvement réduit. Bouton de fermeture 44×44.

La version de mémorisation reste 2026-10-19.1 : une modification visuelle ne doit
pas réafficher l'information aux visiteurs qui l'ont déjà fermée. Aucun nouveau
traceur ni préférence marketing ajouté. Le lien permanent du footer est conservé.

Une réserve de fin de page permet de faire défiler le footer au-dessus de la
bannière. Sa hauteur mesurée ajuste aussi l'espace de WhatsApp ; les animations
de position du bouton sont exclues pour éviter une collision pendant le déplacement.
Le contrôle invisible couvrant la photo Hero ne doit pas masquer WhatsApp ; les
protections existantes contre les collisions avec les textes/champs sont conservées.

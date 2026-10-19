> **Panneau retiré le 19 octobre 2026 à la demande du propriétaire.** Ce document conserve l’audit historique ; le rendu actuel et les qualifications retenues sont décrits dans `projects-credibility-2026.md`. La capture demeure archivée hors interface.

# Projets — présentation éditoriale et découverte — 19 octobre 2026

## Audit et sources

- Source des six noms, catégories, descriptions et de leur ordre : dictionnaire FR/EN existant (`src/i18n/dictionaries.ts`).
- Inspection des assets et documents décrite dans `projects-showcase-2026.md` ; les photographies d'activités et illustrations ne prouvent pas les fonctionnalités d'une application.
- Projet 05 : code du site institutionnel AWS présent dans ce dépôt, stack vérifiée dans package.json, site public vérifié lors de la phase précédente. Capture authentique d'octobre 2026, archivée dans `docs/projects-assets/aws-site-officiel.webp`, réutilisée à l'identique dans `public/images/projets/` pour le panneau uniquement (67 336 octets, 1440×650 WebP).
- Aucun client externe, chiffre commercial, résultat financier ou maturité produit ajouté.
- Aucun accès au projet ALFRED AI TRADER : seuls les textes déjà présents dans ce site ont été consultés.

## Qualification par réalisation

| Réalisation | Informations disponibles | Présentation retenue | Informations encore nécessaires |
|---|---|---|---|
| Tourisme | Nom, catégorie, objectif de découverte touristique en Côte d'Ivoire | Texte en deux phrases ; aucun panneau | Capture, fonctionnalités implémentées, stack, avancement et démo autorisée |
| Fitness | Nom, catégorie, présentation des services et identité numérique | Texte en deux phrases ; aucun panneau | Capture, fonctionnalités implémentées, stack, avancement et démo autorisée |
| Analyse de marchés | Description de logiciel expérimental combinant analyse, automatisation et IA | Expérimentation conservée ; aucun panneau, aucune performance revendiquée | Preuves des fonctions, capture expurgée des données sensibles, stack, avancement et démo autorisée |
| Multi-actifs | Objectif de suivi/organisation/visualisation de données | Texte en deux phrases ; aucun panneau | Preuves des fonctions, capture non confidentielle, stack, avancement et démo autorisée |
| Conception web | Exemple réel : site AWS, source et capture publique disponibles | Un panneau documenté : site de l'entreprise, pas une référence client externe | Autres réalisations non documentées ; pas d'affirmation sur l'envoi SMTP |
| IA | Description existante d'expérimentations logicielles/automatisations/agents | Expérimentation conservée ; aucun panneau | Solutions précises, preuves des fonctions, capture, stack, maturité et démo autorisée |

Aucune mention publique « statut à confirmer », aucune capture inventée ni rubrique vide. Les descriptions ont été précisées exclusivement à partir des objectifs déjà documentés.

## Réalisation

- Grille éditoriale inchangée : six blocs, mêmes noms/catégories/ordre, mêmes séparateurs et styles ; deux colonnes dès 768px, une avant.
- Un déclencheur natif « Découvrir la réalisation » / « Discover the project » pour l'exemple web suffisamment documenté.
- `dialog.showModal()` : arrière-plan inert natif, focus initial sur la fermeture, boucle Tab/Shift+Tab explicite, Escape natif, retour du focus, blocage/restauration du scroll body et compensation de scrollbar.
- Dialogue blanc AWS, image proportionnelle, fermeture visible pendant le défilement, animation 180ms désactivée avec reduced-motion.
- Client limité au dialogue ; grille rendue serveur. Déclencheur désactivé sans JavaScript ; six textes et lien de contact restent disponibles.
- Invitation discrète sous la grille vers `#contact`, bouton du design system existant. Aucun nouveau formulaire.
- Tous les textes FR/EN centralisés dans le dictionnaire existant, uniquement les blocs `projets`. Suppression de l'ancien module parallèle de libellés `projects/project-data.ts`.
- Aucune dépendance ajoutée ; aucune modification Hero/Navbar/services/apropos/footer/formulaire/configuration.

## Publication

Aucune publication, aucun commit/push, aucune configuration d'hébergement ou de sécurité modifiée. Validation visuelle attendue.

## Vérifications exécutées

- Lint, TypeScript et build de production après correction : PASS.
- Playwright Chrome, FR/EN × 320/375/390/768/1024/1440/1920 : six projets et ordre, grille 1/2 colonnes et 6/3 rangées, absence d'overflow section/dialogue, pas de grand visuel dans la grille : PASS.
- Dialogue natif modal : ouverture clavier, boucle Tab/Shift+Tab, Escape, bouton de fermeture, retour du focus, blocage/restauration du scroll body : PASS.
- Capture réellement chargée, lien officiel réellement ouvert en nouvel onglet sécurisé ; invitation #contact réellement cliquée : PASS. Aucun envoi de formulaire effectué.
- Reduced-motion et six textes disponibles sans JavaScript : PASS. Sans JavaScript, le panneau interactif est désactivé ; le lien de contact reste utilisable.
- Aucune erreur console/pageerror observée pendant les tests finaux.
- Un défaut de boucle de focus vers l'interface du navigateur a été détecté et corrigé avant la passe finale.
- Contrôle d'intégrité : Hero/HeroMedia/styles Hero, Navbar, Footer, Contact, Expertises, Apropos, page, next.config, wrangler et package.json inchangés ; dictionnaire hors blocs projets identique.
- Captures desktop/mobile et aperçu du panneau examinés. Pas de Lighthouse ni de mesure terrain des Core Web Vitals dans cette phase.

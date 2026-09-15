---
name: aws-frontend-section
description: Construire UNE seule section Front-End du site ALFRED WINNER SERVICES (Navbar, Hero, Notre Univers, Expertises, Contact, Footer...). A utiliser des que l'utilisateur demande de coder, construire ou modifier une section visuelle de la homepage AWS. Impose le cycle analyser -> expliquer -> coder -> preview -> responsive -> tester -> attendre validation. Ne construit jamais deux sections a la suite.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# AWS — Construction d'une section

UNE section par execution. Jamais deux.

## 0. Verifier le scope

Lire `travaux réalisés.md`. Confirmer que la section demandee est bien
la suivante et que la precedente a ete VALIDEE par l'utilisateur.
Sinon : le dire et s'arreter.

## 1. ANALYSER

- Role de la section dans le parcours visiteur.
- Contenu reellement disponible (ne rien inventer : placeholder sinon).
- Assets necessaires — signaler ceux qui manquent AVANT de coder.
- Structure HTML semantique visee (`<header>`, `<section>`, `<nav>`, `<h1>`...).

## 2. EXPLIQUER (avant le code)

  OBJECTIVE / CONCEPT / FILES / ACTION

Expliquer le concept Front-End en jeu : HTML semantique sous-jacent au JSX,
CSS sous-jacent aux classes Tailwind, logique Flexbox/Grid, etat React si present.

## 3. CODER

- Un composant par fichier dans `src/components/`.
- Mobile-first : styles de base pour mobile, puis `sm: md: lg: xl: 2xl:`.
- Fichiers lisibles. Pas de generation massive.
- Pas de dependance nouvelle sans justification et accord.

## 4. PREVIEW

Le serveur tourne sur http://localhost:3100 (Fast Refresh).
Ouvrir la page et montrer le resultat.

## 5. RESPONSIVE

Invoquer le skill `aws-responsive-qa`.

## 6. TESTER

Invoquer le skill `aws-quality-gate`.

## 7. S'ARRETER

Presenter : RESULT / TEST / NEXT.
Puis ATTENDRE la validation explicite de l'utilisateur
(ex : `NAVBAR VALIDEE — GO HERO`).

Ne pas commiter avant validation. Ne pas enchainer.

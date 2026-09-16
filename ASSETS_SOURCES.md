# Sources des visuels — Alfred Winner Services

Ce fichier existe pour permettre un audit de licence avant mise en ligne.
Chaque asset externe (non produit par AWS) y figure, avec sa source exacte.

---

## qui-sommes-nous.jpg (V2)

- **Fichier** : `public/images/apropos/qui-sommes-nous.jpg`
- **Section** : Qui sommes-nous
- **Source** : Pexels
- **URL originale** : https://www.pexels.com/photo/automated-glass-bottle-production-line-36423811/
- **Auteur** : Keegan Checks
- **Localisation** : Dar es Salaam, Tanzanie (géolocalisation confirmée
  par Pexels) — Afrique de l'Est, contexte industriel réel.
- **Licence** : Pexels License (gratuite, usage commercial autorisé,
  attribution non obligatoire) — https://www.pexels.com/license/
- **Date d'accès** : 16 septembre 2026
- **Résolution d'origine** : 6000×4000 — téléchargée en 1800px de large
- **Usage éditorial** : chaîne de production automatisée (bouteilles en
  verre), aucun visage, aucune marque tierce lisible dans le cadrage
  retenu. Illustre "structure, production, création de valeur" — ne
  représente PAS un site AWS réel, PAS une activité AWS documentée.
- **Historique des choix** :
  1. Discussion d'équipe (Mikhail Nilov) — remplacée : trop "reunion
     humaine generique".
  2. Couloir de baies serveurs (Brett Sayles) — bon choix technique mais
     pas specifiquement africain ; remplacee sur demande explicite d'une
     direction "entreprise/infrastructure africaine".
  3. Candidat un temps envisage (Christina Morillo, "Engineer Holding
     Laptop") — ECARTE : metadonnees EXIF portant la mention
     "© Mike Ngo Photography. All Rights Reserved.", en contradiction
     avec la licence Pexels affichee sur la page. Ecarte par prudence.
  4. Un autre candidat (usine de bouteilles, Dar es Salaam, meme photographe/
     serie) montrait une palette sous plastique portant la marque lisible
     "KIOO LIMITED" — ECARTE : afficher la marque d'une entreprise tierce
     sur la section institutionnelle d'AWS aurait pu laisser croire a un
     lien qui n'existe pas.
  5. Retenu : la meme serie, cadrage sur la ligne de bouteilles et la
     buse d'injection seule — aucune marque lisible, aucun visage.

## software-ia.jpg (V2)

- **Fichier** : `public/images/expertises/software-ia.jpg`
- **Section** : Nos expertises — pôle Innover (Software & IA)
- **Source** : Pexels
- **URL originale** : https://www.pexels.com/photo/hands-typing-on-a-laptop-computer-5385526/
- **Auteur/Studio** : TREEDEO.ST
- **Licence** : Pexels License (gratuite, usage commercial autorisé,
  attribution non obligatoire) — https://www.pexels.com/license/
- **Date d'accès** : 16 septembre 2026
- **Résolution d'origine** : 7952×5304 — téléchargée en 1600px de large
- **Usage éditorial** : cadrage mains + clavier + écran de code, peau
  foncée, aucun visage. Remplace une premiere photo (Mizuno K,
  vue en plongee sur une epaule, moins ciblee sur le detail
  mains/clavier/code demande explicitement). Ne représente PAS un
  développeur AWS identifié.

---

## Règle appliquée pour chaque asset

1. Recherche sur une bibliothèque à licence claire (Pexels/Unsplash) —
   jamais un hotlink direct depuis Pinterest, qui n'est pas lui-même une
   source de licence.
2. Téléchargement local dans `public/images/`, jamais de lien externe
   dans le code de production.
3. Alt text neutre, jamais de mention d'AWS, d'un client ou d'un employé
   si l'image n'en montre pas réellement un.
4. Aucune photo de personne n'est présentée comme le fondateur, un
   employé ou un client AWS sauf confirmation explicite d'Alfred.
5. Verification systematique des metadonnees EXIF (`file <image>`) avant
   integration : un champ copyright incoherent avec la licence affichee
   disqualifie l'image, meme si la composition est bonne.
6. Aucune marque ou nom d'entreprise tierce lisible dans le cadrage
   retenu, pour eviter toute confusion d'affiliation.

## Passe Premium V3 — aucune nouvelle image

Cette passe (palette, micro-interactions, separation realisations /
concepts) n'a introduit AUCUN nouveau fichier image.

- Les deux photographies validees restent inchangees :
  `qui-sommes-nous.jpg` et `software-ia.jpg` (sources et licences
  documentees plus haut).
- Les trois cartes "solutions en developpement" utilisent des
  pictogrammes vectoriels dessines dans le projet
  (`src/components/ui/icones.tsx`), pas des visuels tiers : aucune
  question de droits, aucune capture d'ecran presentee comme un produit
  existant.
- Le slot media du fondateur reste un aplat neutre. Pas de portrait
  genere, pas de modele stock, aucune silhouette humaine suggeree —
  en attente de la photographie originale d'Alfred.

# Sources des visuels — Alfred Winner Services

Ce fichier existe pour permettre un audit de licence avant mise en ligne.
Chaque asset externe (non produit par AWS) y figure, avec sa source exacte.

---

## qui-sommes-nous-v3.jpg (V2)

- **Fichier** : `public/images/apropos/qui-sommes-nous-v3.jpg`
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

## software-ia-v3.jpg (V2)

- **Fichier** : `public/images/expertises/software-ia-v3.jpg`
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
  `qui-sommes-nous-v3.jpg` et `software-ia-v3.jpg` (sources et licences
  documentees plus haut).
- Les trois cartes "solutions en developpement" utilisent des
  pictogrammes vectoriels dessines dans le projet
  (`src/components/ui/icones.tsx`), pas des visuels tiers : aucune
  question de droits, aucune capture d'ecran presentee comme un produit
  existant.
- Le slot media du fondateur reste un aplat neutre. Pas de portrait
  genere, pas de modele stock, aucune silhouette humaine suggeree —
  en attente de la photographie originale d'Alfred.

## Passe "Correction Premium Globale" — renommage anti-cache (pas de nouvelle photo)

Diagnostic complet avant toute decision :

1. Alfred a signale que "Qui sommes-nous" montrait encore la photo de
   reunion d'equipe rejetee, et que "Software & IA" montrait encore la
   photo d'une personne non-africaine — deux images pourtant deja
   remplacees lors d'une passe precedente.
2. Verification sur disque (lecture directe des octets) : les deux
   fichiers contenaient bien les bonnes images (ligne de production de
   bouteilles ; mains sur un clavier). Confirme par taille de fichier,
   dimensions et lecture visuelle directe.
3. Verification serveur : une requete fraiche (cache: 'no-store',
   parametre d'URL variable) vers `/images/.../*.jpg` ET vers la route
   `/_next/image` renvoie systematiquement les bons octets (verifie par
   echantillonnage de pixel apres decodage canvas), avec l'en-tete
   `x-nextjs-cache: MISS`.
4. Verification du rendu reel : le `<img>` tel qu'affiche dans la page
   peignait pourtant l'ANCIENNE image, meme apres un rechargement complet
   et un changement de parametre d'URL cote client. Un remplacement du
   `src` par un blob genere a partir d'un fetch non-cache a immediatement
   fait apparaitre la bonne image — preuve que seul un cache HTTP
   (navigateur ou proxy intermediaire) retenait une reponse perimee sur
   ce chemin d'URL exact, independamment du contenu reel du fichier.
5. Cause racine : les deux images ont ete remplacees plusieurs fois au
   meme chemin de fichier (`qui-sommes-nous.jpg`, `software-ia.jpg`)
   sans jamais changer de nom ni porter de parametre de version. Un
   navigateur qui a visite le site TOT dans le projet peut donc avoir
   mis en cache la toute premiere version (la photo de reunion rejetee
   pour "Qui sommes-nous", verifiee comme le tout premier candidat dans
   l'historique ci-dessus) et continuer a l'afficher indefiniment, sans
   jamais revalider, meme apres un rafraichissement standard.

Correction appliquee : RENOMMAGE des deux fichiers plutot que remplacement
de leur contenu (deja correct) —
  `qui-sommes-nous.jpg` -> `qui-sommes-nous-v3.jpg`
  `software-ia.jpg` -> `software-ia-v3.jpg`
Toutes les references mises a jour (`Apropos.tsx`, `dictionaries.ts`).
Un nouveau nom de fichier ne peut pas etre servi depuis un ancien cache :
chaque navigateur, y compris celui d'Alfred, est garanti de recharger
les bons octets au prochain chargement de la page, sans action manuelle
de sa part (pas besoin de vider son cache).

## Passe "Cohérence visuelle" — trois nouvelles images (remplacement + fin des doublons)

Contexte : la photo de bouteilles (qui-sommes-nous-v3.jpg) ne correspondait
pas au texte de la section ("capital, actifs, technologie, structuration") ;
les images Investir et Construire étaient un doublon exact des photos du
Hero. Recherche menée sur Pexels avec plusieurs candidats évalués et
REJETÉS avant ces trois choix — détail ci-dessous, par transparence.

### qui-sommes-nous-v4.jpg

- **Fichier** : `public/images/apropos/qui-sommes-nous-v4.jpg`
- **Section** : Qui sommes-nous
- **Source** : Pexels — https://www.pexels.com/photo/aerial-view-of-flyover-roads-and-highways-on-a-metropolitan-area-7381781/
- **Auteur** : Silvere Meya
- **Licence** : Pexels License (gratuite, usage commercial autorisé)
- **Date d'accès** : 16 septembre 2026
- **Lieu confirmé par Pexels** : Abidjan, Côte d'Ivoire
- **Traitement** : recadrage (1800×1350 -> 933×700) sur la boucle de
  l'échangeur, pour deux raisons : composition plus dynamique, ET
  exclusion d'une enseigne "HYUNDAI" lisible présente dans le cadrage
  large d'origine (prudence identique à la règle déjà appliquée sur
  les images precedentes : aucune marque tierce lisible dans le cadrage
  retenu).
- **Usage éditorial** : infrastructure routière moderne à Abidjan,
  aucun visage, illustre "structuration, capital, création de valeur".
  Ne représente PAS un site ou projet AWS réel.

### finance-v4.jpg

- **Fichier** : `public/images/expertises/finance-v4.jpg`
- **Section** : Nos expertises — pôle Investir (Bourse & Finance)
- **Source** : Pexels — https://www.pexels.com/photo/person-in-black-long-sleeve-polo-shirt-working-on-a-wooden-table-6694481/
- **Auteur** : Tima Miroshnichenko
- **Licence** : Pexels License
- **Date d'accès** : 16 septembre 2026
- **Traitement** : recadrage (1800×1200 -> 1050×900) sur la partie
  droite du cadrage original. Raison : le cadrage complet montrait deux
  fois le logo "Qlik" (éditeur de logiciel tiers) sur des impressions —
  écarté par la même règle que "aucune marque tierce lisible". Le
  recadrage isole les mains et des graphiques génériques (barres,
  pourcentages), sans aucune marque visible.
- **Usage éditorial** : mains à la peau foncée consultant des documents
  et graphiques financiers, aucun visage. Illustre "analyse, données,
  technologies appliquées aux actifs" sans jamais suggérer une gestion
  de portefeuille réglementée. Ne représente PAS un employé AWS.
- **Candidats écartés avant ce choix** : plusieurs photos "trader multi-
  écrans" (crédit photographe "AlphaTradeZone", légende
  "Cryptocurrency market analysis") écartées — trop proches du cliché
  crypto/trading explicitement interdit par le cahier des charges, et
  identité africaine de la personne non confirmée.

### immobilier-v4.jpg

- **Fichier** : `public/images/expertises/immobilier-v4.jpg`
- **Section** : Nos expertises — pôle Construire (Immobilier)
- **Source** : Pexels — https://www.pexels.com/photo/residential-buildings-by-water-in-city-18435332/
- **Auteur** : Jean Marc Bonnel
- **Licence** : Pexels License
- **Date d'accès** : 16 septembre 2026
- **Lieu confirmé par Pexels** : Abidjan, Côte d'Ivoire
- **Traitement** : recadrage (1800×1477 -> 933×700) sur la portion
  droite du skyline. Raison : le cadrage complet montrait en trés grand
  le logo "BNI" (Banque Nationale d'Investissement, établissement
  financier ivoirien réel) au sommet de la tour la plus visible de la
  composition — DISQUALIFIANT au sens de la règle déjà en vigueur sur ce
  projet (aucune marque tierce lisible, a fortiori une banque reelle qui
  pourrait laisser croire a un partenariat inexistant). Le recadrage
  retient un immeuble moderne en cours de finition (grue encore visible
  en toiture) sans aucune enseigne lisible.
- **Usage éditorial** : architecture urbaine moderne, grue de chantier,
  illustre "immobilier, construction, actif, développement". Ne
  représente PAS un projet ou une réalisation AWS.
- **Candidats écartés avant ce choix** : le même skyline sans recadrage
  (logo BNI trop visible) ; un ouvrier sur chantier à Kaduna, Nigeria
  (tags Pexels "Child Labor/Child Labour" côté du sujet — écarté par
  précaution, sans aucune verification possible de l'âge réel de la
  personne) ; un ouvrier à Kampala, Ouganda (écarté : deux enseignes
  commerciales lisibles en arrière-plan, "MISS SHEE STUDIO" et "CRSC")..

### software-ia-v3.jpg — inchangée

Conservée telle quelle : verifiee une nouvelle fois contre les criteres
du present brief (identite africaine credible, logiciel visible, aucun
cliche futuriste) — toujours conforme, aucun remplacement necessaire.

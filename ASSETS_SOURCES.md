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

## krodi-krotchaman-fondateur.jpg — photo du fondateur (pas une image de banque)

- **Fichier** : `public/images/fondateur/krodi-krotchaman-fondateur.jpg`
- **Section** : Fondateur
- **Source** : fournie directement par Alfred (Krodi Krotchaman Alfred
  Donald) via la conversation — PAS une banque d'images, aucune licence
  tierce a documenter.
- **Historique** : deux versions precedentes avaient ete REFUSEES —
  elles montraient des traits caracteristiques d'un traitement par IA
  (texture de peau, fond de studio generique), en contradiction directe
  avec la consigne "ne genere pas mon portrait, ne mets aucun modele
  stock" et avec l'interdiction explicite d'une fausse photographie du
  CEO.
- **Verification effectuee sur CETTE photo avant integration** :
  1. Lecture directe de l'image (pas seulement des metadonnees) :
     scene coherente, environnement reel (piscine en rooftop, immeubles
     d'Abidjan, panneau publicitaire Nissan lisible en arriere-plan),
     aucun artefact typique d'une generation (mains anatomiquement
     correctes, texte d'arriere-plan flou mais non "en bouillie",
     aucune texture de peau synthetique).
  2. Metadonnees EXIF lues (`file` + `strings`) : manufacturer=Apple,
     model=iPhone 11 Pro, software=13.5.1, datetime=2021:07:17 15:01:05
     — coherent avec une vraie photo prise au telephone, pas avec un
     export d'outil de generation d'image.
  3. Recherche de mentions de copyright/outils IA dans les metadonnees
     (`strings CHEF.jpg | grep -i copyright/artist/midjourney/...`) :
     seule occurrence = "Copyright Apple Inc., 2017", un gabarit XMP
     standard present sur toutes les photos iPhone (schema de
     metadonnees d'Apple, pas une revendication sur le contenu) — rien
     d'anormal.
  -> Conclusion : photographie authentique. Integree.
- **Traitement** : redimensionnee (3024×4032 -> 1050×1400, format deja
  natif 3:4) et compressee pour le web. AUCUN recadrage de cadrage :
  la mise en scene (costume, chapeau, lunettes, MacBook, terrasse)
  est une decision personnelle d'Alfred, conservee telle quelle.
- **Date d'integration** : 16 septembre 2026.

## Images du Hero — finance-markets.jpg et real-estate.jpg (PENDING ALFRED)

Ces deux images n'avaient jamais de fiche dans ce document. Recherche de
provenance menee avant toute conclusion (voir travaux realises.md,
entree [HERO] PHASE 2, 2026-09-15) :

- **Fichiers** : `public/images/hero/finance-markets.jpg` (1448×1086),
  `public/images/hero/real-estate.jpg` (1536×864).
- **Origine consignee** : "2 imgs fournies par l'utilisateur, jamais
  remplacees" — fournies par Alfred, pas puisees dans une banque
  d'images par Claude Code. Ce n'est donc pas un oubli de documentation
  au sens ou les autres photos (Pexels) en ont une.
- **Verification technique effectuee** (meme methode que pour la photo
  du fondateur) : aucune donnee EXIF d'appareil (ni fabricant, ni
  modele, ni date de prise de vue) dans les deux fichiers — a comparer
  avec `krodi-krotchaman-fondateur.jpg`, qui porte des EXIF iPhone 11
  Pro complets. Cette absence ne prouve rien a elle seule (un export ou
  une compression peut retirer les EXIF), mais elle retire aussi la
  preuve inverse.
- **Constat visuel qui appelle une decision d'Alfred** :
  `finance-markets.jpg` montre, sur l'etagere du bureau, trois ouvrages
  empiles portant exactement les mots **"INVESTIR" / "CONSTRUIRE" /
  "INNOVER"** — la signature de marque AWS elle-meme — ainsi qu'une
  tasse "UN MEILLEUR MOI CHAQUE JOUR" et une affiche "DISCIPLINE BATIT
  LA LIBERTE". Aucune bibliotheque de photographies de stock ne produit
  par coincidence des ouvrages portant la signature exacte d'une
  entreprise. Le meme cadrage montre en arriere-plan un immeuble
  portant l'enseigne lisible **"NSIA"**, groupe financier panafricain
  reel, non affilie a AWS.
- **Ce que cela signifie, sans le trancher** : ce faisceau d'indices
  (props sur mesure a la marque, absence totale d'EXIF, enseigne d'une
  entreprise tierce reelle dans un cadrage par ailleurs sans point
  d'ancrage geographique verifiable) rend plausible une image generee
  ou composite plutot qu'une photographie prise telle quelle. Ce n'est
  pas une certitude — je n'ai pas d'outil de detection IA fiable — mais
  le doute est raisonnable et je ne le tranche pas seul : le Hero est
  une section verrouillee, et le cahier des charges actuel comme les
  precedents interdisent explicitement une image qui laisserait croire
  a un bureau ou une activite AWS fictifs.
- **Action prise** : AUCUNE. Les deux images restent en place (le Hero
  n'est pas modifie sans presenter la raison, conformement au perimetre
  de cette passe). Signale a Alfred en tete de rapport.

## robotique-automatisation.mp4 + robotique-poster.jpg — media secondaire Innover

- **Fichiers** : `public/videos/robotique-automatisation.mp4`,
  `public/images/expertises/robotique-poster.jpg`.
- **Section** : Nos expertises — pôle Innover (Software & IA), media
  secondaire en superposition sur la photo principale (mains/clavier).
- **Source** : Pexels — https://www.pexels.com/video/advanced-robotics-in-automated-factory-32386590/
- **Auteur** : Usman AbdulrasheedGambo
- **Licence** : Pexels License (gratuite, usage commercial autorisé)
- **Date d'accès** : 16 septembre 2026
- **Original** : 3840×2160 (4K), 11s, ~28 Mo — beaucoup trop lourd pour
  le web tel quel.
- **Traitement** : reencodee localement avec ffmpeg — 1280px de large,
  8s (coupee), H.264 /  yuv420p, AUCUNE piste audio (decorative,
  jamais entendue), faststart pour la lecture progressive. Resultat :
  ~1,04 Mo (au lieu de 28 Mo). Poster genere depuis une image de la
  video elle-meme (aucun cadre vide avant chargement du JS).
- **Verification avant integration** : description originale ("Robotic
  arm assembling components in a modern factory setting") conforme au
  contenu reel (verifie par extraction d'image, pas seulement lu) ;
  aucune marque tierce lisible dans le cadrage retenu ; aucun visage.
- **Usage editorial** : illustre "robotique et automatisation" comme
  DIRECTION D'INNOVATION du pole Innover — jamais presentee comme un
  systeme qu'AWS possede, a construit ou a livre. Legende visible en
  permanence sous la composition (pas seulement au survol, pour rester
  lisible sur mobile/tactile) : "Robotique & automatisation —
  illustration technologique, pas une réalisation AWS."
- **Comportement** : `<video>` muted/loop/playsInline, lecture pilotee
  par JavaScript UNIQUEMENT pour respecter prefers-reduced-motion (un
  attribut autoplay HTML ne peut pas etre recalcule depuis une media
  query CSS) — sans JS ou en attendant l'hydratation, seul le `poster`
  (une vraie image fixe) s'affiche, jamais un cadre vide. Voir
  `src/components/ui/VideoRobotique.tsx`.

## qui-sommes-nous-v5.jpg — Qui sommes-nous
- **Remplace** : qui-sommes-nous-v4.jpg (un échangeur autoroutier générique,
  jugé incapable de raconter la section sans le texte — retiré du repo).
- **Section** : Qui sommes-nous.
- **Source** : Pexels — https://www.pexels.com/photo/waterfront-buildings-in-a-city-5642426/
- **Auteur** : Don. Leslie-hamed Bagou (photographe ivorien, Abidjan)
- **Licence** : Pexels License (gratuite, usage commercial autorisé)
- **Date d'accès** : 17 septembre 2026
- **Original** : 2835×3780 (portrait). Recadré en 4:3 (1920×1440) puis
  redimensionné à 1300×975 avec sips — conserve la bande de skyline et le
  ciel dramatique, retire l'excédent de ciel en haut.
- **Lieu réel confirmé** : Abidjan, Côte d'Ivoire (métadonnée Pexels), vue
  du Plateau depuis la lagune.
- **Vérification avant integration** : verifie a resolution complete
  qu'aucun texte/enseigne n'est lisible dans le cadrage retenu (un autre
  candidat — une vue plus rapprochee du Plateau — a ete ECARTE precisement
  parce que l'enseigne "BNI" (Banque Nationale d'Investissement, une
  institution financiere reelle non affiliee) y etait grande et parfaitement
  lisible : meme risque de confusion que celui deja identifie sur
  finance-markets.jpg du Hero. Cette version-ci est prise a plus grande
  distance, aucune enseigne n'y est dechiffrable).
- **Usage éditorial** : ancrage local reel (la ville ou AWS opere), a la
  place d'une infrastructure generique interchangeable.

## finance-v5.jpg — Bourse & Finance (pôle Investir)
- **Remplace** : finance-v4.jpg (mains sur documents financiers, jugé
  "trop générique" — retiré du repo).
- **Section** : Nos expertises — pôle Investir.
- **Source** : Pexels — https://www.pexels.com/photo/man-in-blue-dress-shirt-making-a-business-presetation-9301494/
- **Auteur** : Mikhail Nilov
- **Licence** : Pexels License (gratuite, usage commercial autorisé)
- **Date d'accès** : 17 septembre 2026
- **Original** : 3572×5359 (portrait). Recadré en 4:3 (1920×1440, conserve
  visage/attire + graphiques + geste de la main) puis redimensionné à
  1300×975 avec sips.
- **Description Pexels** : "Professional analyzing graphs on a screen in
  an office. Business meeting concept."
- **Vérification avant intégration** : les données du tableau de bord à
  l'écran (villes russes, chiffres) sont un jeu de démonstration factice
  du logiciel photographié, pas une donnée réelle attribuée à AWS —
  utilisées uniquement comme texture visuelle de "graphiques/analyse",
  jamais lues comme un chiffre AWS. Aucun logo/marque tierce lisible.
- **Choix éditorial** : montre une analyse de marché/données concrète,
  évite les clichés écartés par le cahier des charges (bitcoin, liasses de
  billets, voiture de luxe, salle de marché factice, hologrammes).

## immobilier-v5.jpg — Immobilier (pôle Construire)
- **Remplace** : immobilier-v4.jpg (skyline distante et générique,
  explicitement relevée comme un point faible — retiré du repo).
- **Section** : Nos expertises — pôle Construire.
- **Source** : Pexels — https://www.pexels.com/photo/aerial-view-of-high-rise-construction-in-lagos-38511754/
- **Auteur** : Taiwo Samson
- **Licence** : Pexels License (gratuite, usage commercial autorisé)
- **Date d'accès** : 17 septembre 2026
- **Original** : 4096×3072 (déjà 4:3 exact). Redimensionné à 1300×975 avec
  sips, aucun recadrage nécessaire.
- **Lieu réel confirmé** : Lagos, Nigeria (métadonnée Pexels, tag "Real
  Estate Development").
- **Vérification avant intégration** : enseignes visibles sur la clôture
  de chantier au pied de la tour verifiees a pleine resolution — illisibles
  (motif/logo flou, aucun texte dechiffrable), sans commune mesure avec le
  cas "BNI" ecarte pour l'image Qui-sommes-nous ci-dessus.
- **Choix éditorial** : montre un actif immobilier réellement EN COURS DE
  CONSTRUCTION (grues actives, structure inachevée visible), plus narratif
  qu'une skyline finie et distante — Afrique de l'Ouest, cohérent avec
  l'identité régionale d'AWS.

## qui-sommes-nous-v6.jpg — Qui sommes-nous
- **Remplace** : qui-sommes-nous-v5.jpg (vue de la lagune/Plateau d'Abidjan
  — une "jolie ville" mais qui ne racontait pas assez la convergence
  capital+actifs+technologie annoncée par le texte ; retiré du repo).
- **Section** : Qui sommes-nous.
- **Source** : Pexels — https://www.pexels.com/photo/software-engineer-standing-beside-server-racks-1181354/
- **Auteure (page Pexels)** : Christina Morillo — projet #WOCinTech Chat
  (initiative connue et documentee de photographie de stock authentique
  mettant en scene des femmes de couleur dans la tech, publiee sous
  licence Pexels gratuite).
- **Licence** : Pexels License (gratuite, usage commercial autorisé).
- **Date d'accès** : 17 septembre 2026.
- **Note de transparence** : les metadonnees EXIF du fichier telecharge
  portent un champ "copyright: © Mike Ngo Photography. All Rights
  Reserved." — Mike Ngo est le photographe qui a realise la seance pour
  le projet #WOCinTech Chat que Christina Morillo a ensuite publiee sur
  Pexels sous licence libre ; c'est cette publication Pexels (License:
  Free, verifiee sur la page) qui gouverne l'usage ici, le champ EXIF
  etant un residu de metadonnee de prise de vue, pas une revendication
  de droits actuelle sur la plateforme de diffusion.
- **Original** : 5644×3768 (~3:2). Recadré à la main en 4:3 EXACT
  (1200×900 dans l'image source pleine resolution) puis redimensionné à
  1300×975 avec sips.
- **Recadrage — raison precise** : le cadrage original incluait, en bas
  de l'image, un long bandeau visible de logos de sponsors/exposants
  (Dell, HP, Intel, NetApp, Schneider Electric, EMC, Emerson, Emulex...)
  signalant sans ambiguite un salon professionnel / stand d'exposition —
  un risque de confusion de marque bien plus net que les cas deja
  ecartes plus tot dans ce projet (enseigne BNI, signature "NSIA").
  Le recadrage retient uniquement la partie superieure de la photo
  (la professionnelle + les baies de serveurs), EXCLUANT entierement ce
  bandeau de logos. Les inscriptions "APC" visibles sur l'equipement de
  refroidissement/alimentation sont conservees : un marquage d'usine sur
  du materiel reel, incidental et attendu (meme registre que le logo
  Apple deja accepte sur l'image Software/IA), pas un mur de sponsors.
- **Vérification avant intégration** : contenu réel confirmé par
  inspection à pleine résolution (pas seulement la vignette) ; plusieurs
  candidats compares avant ce choix (voir journal) : une photo
  industrielle generique (Visen Group, Venezuela), deux photos "concept
  photography" en gros plan sur des mains (panumas nikhomkhai, sans
  visage), et une seconde photo de la meme serie #WOCinTech (portrait
  souriant face camera) jugee moins forte narrativement (pose plutot
  qu'execution active).
- **Usage éditorial** : illustre reellement "technologie + infrastructure
  + execution" — une professionnelle gerant activement une infrastructure
  serveur reelle — sans jamais suggerer qu'il s'agit d'un bureau, d'une
  employee ou d'une infrastructure appartenant a AWS.

## software-ia-v4.jpg — Software & IA (pôle Innover)
- **Remplace** : software-ia-v3.jpg (mains sur clavier, jugé générique)
  PUIS un diptyque photo+vidéo robotique (robotique-automatisation.mp4 +
  robotique-poster.jpg) intégré lors d'une passe précédente — jugé
  gadget/trop chargé à la relecture ("pas de robotique caricaturale, pas
  d'image qui surcharge"). Les deux anciens fichiers vidéo/poster ont été
  retirés du dépôt (plus aucune référence dans le code) ; conservé ici
  comme trace : robotique-automatisation.mp4 provenait de Pexels (Usman
  AbdulrasheedGambo, Pexels License) — retrait pour raison éditoriale
  (simplification demandée), pas pour un problème de licence.
- **Section** : Nos expertises — pôle Innover (Software & IA).
- **Source** : Pexels — https://www.pexels.com/photo/man-working-with-computers-19805877/
- **Auteur** : Naboth Otieno (développeur, photographe de sa propre
  pratique — bio Pexels : "Hello, I am Naboth. And I develop websites.").
- **Licence** : Pexels License (gratuite, usage commercial autorisé).
- **Date d'accès** : 17 septembre 2026.
- **Original** : 5944×3963 (~3:2). Recadré en 4:3 (1706×1280) puis
  redimensionné à 1300×975 avec sips — recadrage symétrique très léger,
  aucune perte de sujet (développeur et écrans de code intacts).
- **Vérification avant intégration** : contenu réel confirmé à pleine
  résolution — code visible à l'écran (éditeur de type VS Code), logos
  de marque limités à un marquage "hp" incidental sur le matériel
  (même registre que le logo Apple déjà accepté ailleurs sur ce site),
  aucune enseigne ni mur de sponsors.
- **Usage éditorial** : une seule photographie, cohérente avec le texte
  (logiciel, développement) — remplace une composition à deux médias
  jugée trop chargée.

## immobilier-v6.jpg — Immobilier (pôle Construire)
- **Remplace** : immobilier-v5.jpg (chantier de Lagos, sourcé sur Pexels).
- **Section** : Nos expertises — pôle Construire.
- **Source** : fournie directement par le fondateur (Alfred), via le chat.
- **Auteur / licence** : non documentés par une plateforme tierce — image
  transmise par le client final pour usage sur son propre site. Pas de
  recherche externe effectuée (consigne explicite : "utilise l'image que
  je joins, ne cherche pas une autre image").
- **Date d'intégration** : 17 septembre 2026.
- **Traitement** : recadrée en 4:3 (687×515, légère perte de largeur
  seulement) avec sips. Résolution source modeste (736px de large) —
  non recompressée à une taille superieure pour eviter tout flou
  artificiel.
- **Vérification avant intégration** : photo réelle d'un professionnel du
  BTP casque en main face à un chantier actif (grues, tours en
  construction) — cohérente avec le texte, aucune enseigne ni marque
  tierce genante.
- **Usage éditorial** : illustration générique du secteur immobilier/
  construction, jamais présentée comme un chantier ou un projet AWS.

## software-ia-v5.jpg — Software & IA (pôle Innover)
- **Remplace** : software-ia-v4.jpg (développeur, sourcé sur Pexels).
- **Section** : Nos expertises — pôle Innover (Software & IA).
- **Source** : fournie directement par le fondateur (Alfred), via le chat.
- **Auteur / licence** : non documentés par une plateforme tierce — image
  transmise par le client final pour usage sur son propre site.
- **Date d'intégration** : 17 septembre 2026.
- **Traitement** : recadrée en 4:3 (736×552) avec sips, résolution
  source modeste (736px de large) conservée telle quelle.
- **Point d'attention signalé avant intégration** : l'écran du second
  ordinateur portable affiche une machine virtuelle "Kali Linux" et une
  page de l'outil "HackTricks" (base de connaissances de test
  d'intrusion), sans rapport direct avec le texte de la section (sites
  web, applications, logiciels sur mesure, automatisation, IA — pas de
  test d'intrusion). Signalé explicitement au fondateur (risque qu'un
  visiteur familier de ces outils associe AWS à des activités de
  hacking/pentest) ; approuvé explicitement malgré ce signalement
  ("Traites les deux images j'approuve").
- **Usage éditorial** : illustration générique du développement logiciel,
  jamais présentée comme un projet ou un outil AWS.

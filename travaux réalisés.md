# ALFRED WINNER SERVICES — JOURNAL

PROJET: site vitrine corporate AWS
DOSSIER: /Users/mac/Documents/MES PROJETS WEB/ALFRED WINNER SERVICES
STACK: Next.js 16 + React 19 + TypeScript 5 + Tailwind 4 + ESLint 9
DEV PORT: 3100 (3000/3001/3002 pris par ALFRED AI TRADER)

---

## [PHASE 0] ENVIRONNEMENT & OUTILS — DONE 2026-09-15

DONE:
- workspace verifie: projet etait dans dossier du bot trading -> deplace
- dossier renomme: espace final invisible supprime
- node v24.18.0 OK (ligne LTS)
- npm 11.16.0 OK
- git 2.54.0 OK
- create-next-app lance: TypeScript + App Router + Tailwind + ESLint + src/
- 359 paquets installes, 0 vulnerabilite
- port dev fixe a 3100 dans package.json
- git init, branche main, 1er commit

FILES:
- package.json
- tsconfig.json
- next.config.ts
- postcss.config.mjs
- eslint.config.mjs
- .gitignore
- .claude/launch.json
- src/app/layout.tsx
- src/app/page.tsx
- src/app/globals.css
- public/*.svg
- logo.png (a deplacer vers public/ plus tard)

TEST:
- npm run build -> OK (Turbopack, 10.4s)
- npx tsc --noEmit -> OK 0 erreur
- npm run lint -> OK (prouve avec fichier piege <img>)
- npm run dev -> HTTP 200 sur localhost:3100
- navigateur -> page Next.js par defaut affichee

PIEGES RENCONTRES:
- create-next-app refuse nom dossier avec majuscules/espaces (regle npm)
  -> genere dans dossier temp, fichiers deplaces ensuite
  -> package.json name = alfred-winner-services (URL-friendly)
- tsc seul echoue avant 1er build (type LayoutProps genere par Next dans .next/types)
  -> lancer build avant typecheck

WARNINGS OUVERTS:
- eslint 9.39.5 marque fin de support (latest = 10.10.0) -> decision a prendre
- unrs-resolver postinstall bloque par npm allow-scripts -> lint marche quand meme
- react 19.2.8 installe (latest = 19.3.0) -> pin du template Next

NEXT:
- PHASE 1 discovery / cahier des charges

---

## [PHASE 1] GOVERNANCE + DISCOVERY — DONE 2026-09-15

### A. GOUVERNANCE

DONE:
- AGENTS.md : contrat commun ecrit SOUS le bloc auto-genere par Next
- CLAUDE.md : regles de comportement Claude Code
- 3 skills projet crees dans .claude/skills/
- audit MCP fait -> AUCUN MCP installe, outils natifs suffisent

PREUVE (lue dans node_modules/next/dist/server/lib/generate-agent-files.js):
- next dev ne reecrit QUE le bloc entre <!-- BEGIN/END:nextjs-agent-rules -->
- upsertAgentRulesBlock preserve le texte avant ET apres les marqueurs
- CLAUDE.md = 'skipped' tant que AGENTS.md existe et porte le bloc
- CLAUDE.md n'est ecrase QUE si AGENTS.md ET CLAUDE.md sont absents tous les deux
=> NE JAMAIS supprimer AGENTS.md

SKILLS:
- .claude/skills/aws-frontend-section/SKILL.md  (1 section a la fois)
- .claude/skills/aws-responsive-qa/SKILL.md     (5 tailles ecran)
- .claude/skills/aws-quality-gate/SKILL.md      (controle avant validation)
- format verifie sur skills officiels : frontmatter name + description
- valide par: claude plugin validate .claude/skills -> Validation passed
- ATTENTION: les skills projet sont charges au DEMARRAGE de session
  -> actifs a la prochaine session, pas dans celle qui les a crees

MCP:
- claude mcp list -> aucun serveur configure
- teste et prouve que le natif suffit:
  resize 375x812 OK / screenshot OK / exec JS OK / console OK / reseau OK
  overflow mesure: scrollWidth 375 = viewport 375 -> pas de debordement
- Fast Refresh confirme actif ([HMR] connected)
=> RECOMMANDATION: n'installer aucun MCP

### B. DISCOVERY

ETUDE ACIM (structure seulement, rien copie):
- nav courte: 6 items, Contact PAS dans la nav (section en bas)
- AUCUN <h1> sur la page -> defaut SEO/a11y, NE PAS reproduire
- 26 sections, homepage longue
- methode nommee en 4 temps: Design -> Build -> Grow -> Innovate
- ancrage local martele: "a Abidjan", "conçue ici - pas importee"
- expertises en 2 etages: "Les fondations" / "La valeur metier"
- 0 formulaire de contact
- 0 lien tel: -> impossible d'appeler en 1 tap sur mobile
- 6 liens WhatsApp -> WhatsApp = canal de conversion principal
- pas de switch FR/EN
- CTA formules a la 1re personne du visiteur:
  "Construire l'avenir de mon metier", "Parlons de votre projet"

CE QU'ON GARDE (principe, pas copie):
- nav courte
- methode nommee en 3 temps -> INVESTIR / CONSTRUIRE / INNOVER
- ancrage Abidjan assume
- CTA formules du point de vue du visiteur

CE QU'ON FAIT MIEUX:
- un <h1> unique dans le Hero
- liens tel: et WhatsApp cliquables
- formulaire de contact reel
- preparation FR/EN des le depart

AUDIENCES:
1. investisseur / particulier interesse par les marches
2. acheteur ou vendeur de terrain / bien immobilier
3. dirigeant PME cherchant site, app ou automatisation IA
4. partenaire / recruteur qui verifie la credibilite

CTA PRINCIPAL: WhatsApp (canal reel en Cote d'Ivoire)
CTA SECONDAIRES: appel tel, email, formulaire, ancre vers univers

ARCHITECTURE HOME - VERDICT:
- KEEP: Navbar, Hero, Notre Univers, Qui sommes-nous, Expertises,
        Vision, Fondateur, CTA final, Contact, Footer
- MODIFY: "Pourquoi AWS" fusionne dans "Notre Univers" (redondant)
          "Methode AWS" = INVESTIR/CONSTRUIRE/INNOVER (3 temps)
          "Projets & Realisations" -> placeholder, rien a montrer encore
- REMOVE (pour l'instant): Chiffres cles, Clients & Partenaires,
          Clients/Secteurs -> AUCUNE donnee reelle, ne pas inventer
- ADD: bandeau contact rapide (tel + WhatsApp) visible sur mobile
       mentions legales dans le footer

### C. TESTS

- npm run typecheck -> OK
- npm run lint -> OK
- npm run build -> OK
- localhost:3100 -> HTTP 200
- git propre apres commit

### D. BLOQUANTS POUR LA SUITE

- aucune photo reelle fournie (hero, finance, immobilier, software, fondateur)
- aucun projet/realisation documente
- pas de texte "Qui sommes-nous" valide par l'utilisateur
- email pro et domaine pas encore choisis (krodi2001@gmail.com provisoire)
- statut juridique / annee de creation non confirmes

NEXT:
- PHASE 2 CONTENU (textes reels, aucune invention)

---

## [NAVBAR] — BLOQUE EN ATTENTE DU LOGO HORIZONTAL — 2026-09-15

DONE:
- logo deplace: logo.png -> public/images/brand/logo.png (git mv, 990339 octets intacts)
- servi OK: http://localhost:3100/images/brand/logo.png -> 200
- logo analyse au pixel (canvas)

MESURES LOGO OFFICIEL (1448x1086, sans alpha, fond rgb 254,254,254):
- embleme circulaire : y 38 -> 692   (654 px)
- mot-symbole AWS    : y 702 -> 928  (226 px)
- baseline           : y 958 -> 1000 (42 px)
- boite de contenu   : x 138 -> 1308, y 38 -> 1000

BLOCAGE PROUVE:
- lockup VERTICAL, ratio 4:3 -> inutilisable en navbar horizontale
- a 48px de haut (navbar 72px), facteur 0.044
  -> baseline = 1.9px = illisible
- baseline lisible (9px) exigerait logo 233px -> navbar 260px -> exclu

DECISION UTILISATEUR:
- fournir une version HORIZONTALE du logo
- NE PAS decouper l'embleme
- NE PAS utiliser de faux logo temporaire
- NAVBAR NON CONSTRUITE, en attente

VERIFIE:
- aucune version horizontale sur la machine
- ~/Downloads/logo.png = meme fichier (990339 octets)

NEXT:
- reception du logo horizontal (SVG de preference)
- puis construction navbar

---

## [NAVBAR] — PRETE POUR REVUE UTILISATEUR — 2026-09-15

DONE:
- symbole navbar SVG cree (611 octets) : anneau + fleche ascendante
- logo officiel PRESERVE intact (public/images/brand/logo.png, 990339 octets)
- mot "AWS" en vrai texte HTML, pas en image
- tokens de marque dans globals.css (couleurs extraites du logo)
- navbar desktop : marque / navigation / FR|EN / CTA
- dropdown "Nos services" avec 01 02 03
- menu mobile React (useState), burger 44x44
- sticky + ombre discrete au scroll
- page.tsx = echafaudage neutre temporaire (PAS le Hero)

DECISION LOGO:
- wordmark en HTML et non en paths SVG
- raisons : herite de la typo du site, net a tout zoom,
  selectionnable, lu par les lecteurs d'ecran
- convertible en fichier unique fige si demande

CORRECTIONS FAITES EN COURS DE ROUTE:
1. globals.css imposait font-family Arial -> annulait Geist chargee
   dans layout.tsx. Corrige en var(--font-geist-sans).
2. bloc prefers-color-scheme dark du template retire :
   sinon page noire sous navbar blanche. Site volontairement clair.
3. lang="en" -> lang="fr" dans layout.tsx (a11y + SEO)
4. justify-between ne centrait pas la nav (ecart 92px) car les blocs
   lateraux ont des largeurs differentes -> grid 1fr auto 1fr
5. BUG survol/clic : onMouseEnter ouvrait, puis le clic togglait et
   refermait aussitot. Corrige avec useRef (pinnedRef) qui memorise
   si le menu a ete ouvert par un clic, sans provoquer de re-rendu.
6. BUG grid : nav en display:none sur mobile libere sa cellule, le
   groupe droit s'y placait automatiquement -> burger au MILIEU de
   l'ecran. Corrige par placement explicite col-start-1/2/3.
7. DEBORDEMENT a 1024px : grid 1fr auto 1fr force les 2 colonnes
   laterales a la largeur de la plus large (280px pour langue+CTA
   contre 103px pour la marque) = 1062px requis pour 960 dispo.
   Corrige : flex justify-between sous 1280px, grid a partir de xl.

TEST:
- 375  OK  pas d'overflow, burger 44x44 colle a droite, menu 8 liens,
            aucune cible tactile < 44px
- 768  OK  pas d'overflow, burger a droite (744 = bord attendu)
- 1024 OK  pas d'overflow, CTA finit a 992 = limite exacte
           nav decalee de 93px du centre (compromis assume)
- 1440 OK  pas d'overflow, centrage nav ecart 0
- clavier OK  Tab -> Entree ouvre -> Tab atteint les items -> Echap ferme
- focus OK    anneau 3px sur tous les elements focalisables
- bouton EN desactive : non focalisable (correct)
- console OK  aucune erreur
- typecheck OK / lint OK / build OK
- aucune dependance ajoutee
- aucun console.log
- motion-reduce present (5 occurrences)

CONNU / NORMAL:
- h1 absent : il appartiendra au Hero, pas encore construit
- liens en ancres (#projets, #contact...) : sections pas encore creees
- EN desactive : i18n pas encore en place

NEXT:
- USER REVIEW -> attendre "NAVBAR VALIDEE"

---

## [NAVBAR] REVISION LOGO — FIDELITE AU LOGO OFFICIEL — 2026-09-15

DEMANDE UTILISATEUR:
- le logo navbar doit ressembler TEXTUELLEMENT au logo officiel
- le symbole abstrait (anneau + fleche) s'eloignait trop de l'identite

FAIT:
- aws-symbol.svg SUPPRIME (symbole abstrait, abandonne)
- 2 decoupes faites DANS le fichier officiel avec sips
  -> aucune reinterpretation, ce sont les pixels d'origine

MESURES (canvas, sur logo.png 1448x1086):
- embleme    : x 394->1087, y 38->690   (694 x 653, ratio 1.063)
- mot AWS    : x 265->1180, y 704->927  (916 x 224, ratio 4.09)
- baseline   : x 137->1309, y 960->1001 (non utilisee en navbar)

DECOUPES:
- aws-emblem.png   : sips -c 665 706 --cropOffset 32 388  puis -Z 240
                     -> 240x226, 70403 octets
- aws-wordmark.png : sips -c 236 928 --cropOffset 698 259 puis resampleHeight 120
                     -> 472x120, 68447 octets
- logo.png officiel INTACT : 990339 octets

PIEGE RENCONTRE:
- 1er essai en carre 700x700 mordait sur le haut des lettres AWS
- l'embleme est plus LARGE (694) que HAUT (653) : un carre qui
  l'englobe deborde forcement sur le mot-symbole en dessous
- corrige : decoupe rectangulaire au plus juste + 6px de marge

COMPOSITION NAVBAR:
- lockup vertical d'origine reassemble a l'HORIZONTALE
- embleme h-9 (36px) mobile / h-11 (44px) desktop
- mot-symbole h-5 (20px) mobile / h-6 (24px) desktop
- marque totale : 149px de large en desktop
- nom accessible du lien porte par un span sr-only

VERIFIE:
- fond des decoupes rgb(254,254,254) vs navbar rgb(255,255,255)
  -> ecart 1/255, aucun rectangle visible
- densite servie 3.14x (120x113 pour 38x36 affiches) -> net sur Retina
- next/image optimise bien (service via /_next/image)

TEST APRES REVISION:
- 375  OK  burger a 359 = bord exact, pas d'overflow
- 768  OK  burger a 744 = bord exact, pas d'overflow
- 1024 OK  marque finit 181 / nav demarre 216 -> pas de chevauchement
           CTA finit a 992 = limite exacte, pas d'overflow
- 1440 OK  centrage nav ecart 0, pas d'overflow
- dropdown OK / console OK / typecheck OK / lint OK / build OK

NEXT:
- USER REVIEW -> attendre "NAVBAR VALIDEE"

---

## [NAVBAR] POLISH PASS 01 — 2026-09-15

### TYPOGRAPHIE
- ACIM inspecte techniquement, PAS devine
- leur <link> charge : fonts.googleapis.com/css?family=Montserrat:100..900
- leur CSS de theme ne s'applique pas dans l'apercu (d'ou "Times" en
  computed) mais le link est sans ambiguite -> Montserrat
- Montserrat = SIL Open Font License 1.1 -> libre d'usage commercial
- AUCUN fichier proprietaire recupere
- chargee via next/font/google : telechargee au BUILD, servie depuis
  notre domaine -> 0 requete vers Google cote visiteur (verifie)
- police variable : 1 seul fichier pour toutes les graisses
- Geist + Geist Mono retirees (2 polices en moins)

### BLEU ACCESSIBLE — NOUVEAU TOKEN
- #0082DC sur blanc = 4.02 -> ECHOUE le seuil AA de 4.5 pour du texte
- calcul de candidats -> #0076C8 = 4.75 PASSE, 4% plus sombre seulement
- --color-aws-blue      #0082dc : graphiques uniquement
- --color-aws-blue-text #0076c8 : tout le texte et les traits

### HOVER + UNDERLINE
- texte gris -> bleu, transition 200ms
- trait ::after, origin-left, scale-x 0 -> 1, 200ms
- meme rendu en focus-visible (clavier) qu'en hover (souris)

### PIEGE TAILWIND RENCONTRE
- text-aws-ink et text-aws-blue-text ont la MEME specificite CSS
- la derniere classe ecrite dans className ne gagne PAS : c'est l'ordre
  de la feuille generee qui tranche, et il nous echappe
- symptome : "Accueil" actif restait gris (rgb 28,42,61) alors que
  font-weight passait bien a 600
- correction : navLinkBase SANS couleur + navLinkIdle / navLinkOpen /
  navLinkActive qui portent chacun la leur. Jamais les deux ensemble.
- hover:text-... gagne toujours (classe + pseudo-classe = plus specifique)

### PIEGE MESURE
- des evenements mouseover/mouseenter synthetiques ne declenchent PAS
  le :hover CSS, qui depend de la position reelle du pointeur
- verification faite autrement : lecture du CSS compile + focus-visible
  force, qui produit exactement le meme rendu visuel

### TAILWIND V4 — BONNE SURPRISE
- toutes les regles hover: sont emises dans @media (hover: hover)
  -> sur ecran tactile le survol ne s'applique pas du tout
- les regles focus-visible: sont HORS de ce media query
  -> le clavier garde son retour partout
- scale-x utilise la propriete CSS `scale`, pas `transform`
  (transitionProperty = transform, translate, scale, rotate)

### ETAT ACTIF (≠ HOVER)
- Accueil : aria-current="page" + bleu + font-semibold + trait permanent
- la graisse evite de reposer sur la seule couleur (daltonisme)
- dropdown ouvert : bleu + trait, mais SANS changement de graisse
  (sinon le bouton s'elargirait a l'ouverture)

### FR / EN
- FR : pastille bg-aws-blue/10, texte bleu, semibold
- EN : gris, hover -> bleu + fond bleu tres leger
- disabled remplace par aria-disabled : EN reste atteignable au clavier
  et annonce son indisponibilite au lieu de disparaitre du parcours

### CTA
- design conserve, hover ajoute : #001a3f (plus profond),
  ombre 0 4px 14px rgba(0,36,84,.22), fleche +2px via group-hover

### ESPACEMENT
- 1440 : marges 112/112 symetriques, centrage nav ecart 0, hauteur 81px
- items nav espaces de 8px a partir de xl (4px en dessous)
- REGRESSION TROUVEE : Montserrat plus large que Geist -> a 1024 le CTA
  finissait a 1008 pour une limite a 992 (marge 16 au lieu de 32)
  corrige : texte nav 14px sous 1280 / 15px au-dela,
            gap actions 16px sous 1280 / 20px au-dela,
            CTA px-4 sous 1280 / px-5 au-dela
  resultat 1024 : marges 32 / 30 -> 2px d'ecart, imperceptible

### TEST
HOVER TEXTE BLEU ........ PASS  (regle CSS verifiee + focus-visible identique)
UNDERLINE BLEU .......... PASS  (scale 0 -> 1, 200ms, origin-left)
NOS SERVICES ............ PASS  (bouton + chevron rgb(0,118,200), trait deroule)
TYPOGRAPHIE ............. PASS  (Montserrat, 0 requete Google)
FR/EN ................... PASS  (pastille FR, hover EN, EN focalisable)
CTA ..................... PASS  (fond #001a3f, ombre, fleche +2px)
FOCUS KEYBOARD .......... PASS  (21 focalisables, outline 3px partout)
375px ................... PASS  (pas d'overflow, 0 cible < 44px, menu 8 liens)
768px ................... PASS  (pas d'overflow, burger a 744 = bord)
1024px .................. PASS  (pas d'overflow, marges 32/30)
1440px .................. PASS  (marges 112/112, centrage 0)
CONSOLE ................. PASS  (aucune erreur)
LINT .................... PASS
TYPECHECK ............... PASS
BUILD ................... PASS
DEPENDANCES AJOUTEES .... AUCUNE

NEXT:
- USER REVIEW -> attendre "NAVBAR VALIDEE"

---

## [NAVBAR] FINAL POLISH — 2026-09-15

### TYPOGRAPHIE — ACIM INSPECTE DANS SON CSS
Le CSS de theme d'ACIM ne s'applique pas dans l'apercu (computed = Times).
Contourne : fetch des 11 feuilles de style, 644 Ko lus, 0 bloquee.

ACIM FONT:   Montserrat        (font-family:"Montserrat", Sans-serif)
WEIGHT:      non declare sur la nav -> herite du body
SIZE:        13px
COLOR:       #000000 (noir pur)
PADDING:     0 15px
LETTER-SP:   aucun sur la nav
LINE-HEIGHT: aucun sur la nav
HOVER:       color: var(--e-global-color-primary) — COULEUR SEULE
             pas d'underline, pas de fond
SOURCE:      fonts.googleapis.com/css?family=Montserrat:100..900
REUSABLE:    OUI — SIL Open Font License 1.1, usage commercial libre
AWS DECISION: on gardait deja Montserrat. L'ecart venait du TRAITEMENT :
             j'etais en 14/15px dans un gris-bleu adouci #1c2a3d,
             eux en 13px noir pur -> rendu plus net chez eux.
             Corrige : 13px (14px a partir de 1280), couleur navy #002454,
             graisse 500, aucun letter-spacing. Pas de bold general.

### SUPPRESSIONS (moins d'UI, plus de precision)
- TOUS les underlines supprimes : repos, hover, actif
- verifie : content du ::after = "none", 0 classe after: dans le fichier
- pastille de fond du FR supprimee
- bouton EN separe supprime

### HOVER FINAL
- couleur seule, 200ms, rien d'autre
- "Nos services" : texte ET chevron bleus ensemble (stroke=currentColor)
- dropdown ouvert : bleu conserve, sans changement de graisse

### ETAT ACTIF (≠ HOVER)
- Accueil : aria-current="page" + bleu + font-semibold
- la graisse evite de dependre de la seule couleur

### FR | EN
- FR bleu semibold / separateur | a 20% d'opacite / EN gris 55%
- hover EN -> bleu, 200ms
- aria-disabled (pas disabled) : EN reste atteignable au clavier
- bascule future : echanger les classes actif/inactif, rien d'autre

### DROPDOWN
- structure conservee (validee)
- hover : texte bleu + fond #f2f7fd tres pale

### CTA
- INCHANGE (deja valide) : navy plein, hover #001a3f, fleche +2px
- hierarchie respectee : pastille pleine > texte bleu des hovers

### LOGO
- INCHANGE. Verifie seulement :
  hauteur 44px, centre Y 40 vs centre navbar 41 -> 1px d'ecart
  (du a la bordure basse), alignement correct

### PIEGES DE MESURE RENCONTRES
- focus({focusVisible:true}) ne declenche PAS :focus-visible si la
  derniere interaction etait une souris -> teste avec de VRAIES touches Tab
- outlineWidth vaut 3px meme sans focus : c'est outlineStyle qui prouve
  l'anneau (none -> solid)

### TEST
FONT ................ PASS  Montserrat 13px/14px navy 500
BLUE HOVER .......... PASS  rgb(0,118,200), couleur seule
NO UNDERLINE ........ PASS  ::after content = none partout
DROPDOWN ............ PASS  texte + chevron bleus, fond pale
FR | EN ............. PASS  separateur 20%, EN focalisable
CTA ................. PASS  inchange
KEYBOARD ............ PASS  vraies touches Tab, outlineStyle solid
375px ............... PASS  pas d'overflow, 0 cible < 44px
768px ............... PASS  burger a 744 = bord exact
1024px .............. PASS  marges 32/32 SYMETRIQUES (etait 30/32)
1440px .............. PASS  marges 112/112, centrage 0, navbar 81px
CONSOLE ............. PASS
LINT ................ PASS
TYPECHECK ........... PASS
BUILD ............... PASS
DEPENDANCES ......... AUCUNE

NEXT:
- USER REVIEW -> attendre "NAVBAR VALIDEE"

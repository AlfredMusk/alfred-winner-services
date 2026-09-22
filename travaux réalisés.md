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

---

## [NAVBAR] COMPOSITION + I18N REEL — 2026-09-15

### LECTURE DOC OBLIGATOIRE (AGENTS.md) — 2 RUPTURES NEXT 16
Source : node_modules/next/dist/docs/

1. middleware.ts N'EXISTE PLUS. Le fichier s'appelle proxy.ts et exporte
   `export function proxy(request)`. Cite : "Starting with Next.js 16,
   Middleware is now called Proxy". Ecrit de memoire, le fichier n'aurait
   simplement jamais ete execute.
2. params est une Promise : `const { locale } = await params`.
   Helpers globaux PageProps<'/[locale]'> et LayoutProps<'/[locale]'>.

### ARCHITECTURE I18N — URL EXPLICITE
- src/app/[locale]/layout.tsx  html lang + Navbar + generateStaticParams
- src/app/[locale]/page.tsx    echafaudage (PAS le Hero)
- src/i18n/dictionaries.ts     un dictionnaire par langue
- src/proxy.ts                 redirige toute URL sans prefixe vers /fr
- src/app/layout.tsx et page.tsx SUPPRIMES
- AUCUNE dependance ajoutee

Comment ca marche :
  visiteur -> /projets
  proxy    -> redirige 307 vers /fr/projets
  [locale] -> capte "fr", charge le dictionnaire fr
  Navbar   -> recoit locale + dict, aucun texte en dur
Ajouter une langue = 1 entree dans dictionaries.ts. Rien d'autre.

Build : /fr et /en sont SSG (prerendus statiques). Proxy actif.

### PIEGE TYPESCRIPT RENCONTRE
- "as const" sur le dictionnaire fr figeait les valeurs en types LITTERAUX
- TypeScript exigeait donc le mot "Accueil" en anglais aussi
  (Type '"Home"' is not assignable to type '"Accueil"')
- corrige : pas de as const -> on verifie la STRUCTURE, pas le contenu
- bonus conserve : oublier une cle en anglais reste une erreur de compilation

### PIEGE CACHE
- .next/types/validator.ts referencait encore src/app/page.tsx supprime
- purge de .next/types puis rebuild

### COMPOSITION — 3 ZONES, UNE SEULE GRILLE
- container centre max-w-[1360px] + padding-inline
- ligne flex : marque shrink-0 / nav flex-1 justify-center / actions shrink-0
- flex-1 absorbe l'espace libre ET centre la nav dedans
- RESULTAT : ecart marque -> nav passe de 217px a 32px
  (identique a l'ecart nav -> actions : les 3 zones respirent du meme gap)
- aucune marge arbitraire, aucun push manuel

### BUG COMPOSITION TROUVE ET CORRIGE
- en mobile la nav flex-1 est en display:none donc RETIREE du flux
- plus rien ne poussait les actions a droite -> burger a 281px au lieu de 359
- meme famille de bug que l'auto-placement grid precedent
- corrige par justify-between : sans effet en desktop (flex-1 a deja tout
  absorbe), decisif en mobile

### TYPOGRAPHIE
- Montserrat conservee (conclusions ACIM reutilisees, pas de nouvelle
  recherche : leur CSS donne Montserrat 13px noir, survol couleur seule)
- nav : 14px / 15px a partir de xl, weight 500, tracking -0.01em
- Montserrat est large : -0.01em la rend plus nette sans la tasser

### ETAT ACTIF DEVENU CALME (demande explicite)
- avant : Accueil bleu en permanence
- apres : navy #002454 + font-semibold, PAS de bleu
- le bleu est desormais reserve au survol et au focus
- aria-current="page" conserve

### LOGO
- embleme 36 -> 44 -> 48px (gagne en presence sur desktop)
- mot-symbole 20 -> 24 -> 28px
- marque totale 169px. Non redessine.

### FR . EN REELLEMENT FONCTIONNEL
- usePathname() -> on retire le prefixe et on le remplace par l'autre
  -> le visiteur reste sur LA MEME page en changeant de langue
- les roles s'inversent tout seuls selon la langue active
- visible aussi sur mobile, dans la barre du haut
- vrais liens Link, focalisables, avec aria-current et hrefLang

### TEST
DESKTOP 1440 ........ PASS  marges 72/72, ecart zones 32, pas d'overflow
DESKTOP 1280 ........ PASS  marges 32/32, ecart zones 32
1024 ................ PASS  marges 32/32, nav desktop + CTA, pas de chevauchement
768 ................. PASS  marges 24/24, burger, langues visibles
375 ................. PASS  marges 16/16, burger, 0 cible < 44px
HOVER BLUE .......... PASS  rgb(0,118,200), couleur seule
NO UNDERLINES ....... PASS  aucun ::after
DROPDOWN ............ PASS  centre sous le bouton, survol bleu
FR -> EN ............ PASS  url, lang, nav, CTA, services basculent
EN -> FR ............ PASS  idem, roles du switcher inverses
CTA ................. PASS  inchange, hover #001a3f + fleche +2px
KEYBOARD ............ PASS  vraies touches Tab, outlineStyle solid, bleu
NO OVERFLOW ......... PASS  sur les 5 largeurs
CONSOLE ............. PASS  onglet neuf : 19 ressources, 0 echec, 0 erreur
LINT ................ PASS
TYPECHECK ........... PASS
BUILD ............... PASS

Note : les erreurs 404 vues en cours de route etaient l'historique de
session (suppression de src/app/page.tsx pendant que le serveur tournait).
Verifie dans un onglet neuf : aucune erreur.

NEXT:
- USER REVIEW -> attendre "NAVBAR VALIDEE"

---

## [NAVBAR] QA RESPONSIVE REELLE DANS LE NAVIGATEUR — 2026-09-15

Tout mesure sur le VRAI localhost:3100. Aucune maquette, aucun prototype.

### BREAKPOINT CHOISI PAR LE CONTENU, PAS PAR CONVENTION

Mesure des largeurs intrinseques a 1440 :
  marque 169 + gap 32 + navigation 456 + gap 32 + actions 308 = 997
  + 64 de padding -> il faut ~1061px minimum

Balayage reel (marge = place restante dans la nav) :
  1024 -> marge -9px   COMPRIMEE, les items debordent leur boite
  1040 -> marge  +6px  tient mais les items se touchent
  1060 -> marge +26px
  1100 -> marge +66px  respire
  1280 -> marge +197px

DECISION : basculement a 1100px, pas a lg/1024.
Raison : 6px de marge n'est pas "ca tient", c'est "ca frole". A 1100 la
composition a 66px de respiration, ce qui se lit comme voulu.
Declare dans globals.css : --breakpoint-desk, utilise via desk:

### PIEGE TAILWIND MAJEUR — BREAKPOINT EN PX
Declare "--breakpoint-desk: 1100px", le bloc @media etait emis AVANT
celui de sm (40rem) :
  @media (min-width: 1100px)   <- en premier !
  @media (min-width: 40rem)
  @media (min-width: 48rem)
  ...
Tailwind trie ses breakpoints mais ne compare pas des px a des rem.
Consequence : sm:px-6, situe plus loin dans la feuille et a specificite
egale, ecrasait desk:px-8. Le padding restait a 24px au lieu de 32px.
CORRIGE : --breakpoint-desk: 68.75rem (= 1100px). Ordre retabli :
  40rem < 48rem < 64rem < 68.75rem < 80rem < 96rem
REGLE : toujours declarer un breakpoint personnalise dans la MEME unite
que ceux de Tailwind.

### RESULTATS PAR LARGEUR (scrollWidth vs clientWidth)
 375 BURGER  16/16  scroll 375 = client 375  logo 36px  burger 44x44
 430 BURGER  16/16  scroll 430 = client 430
 768 BURGER  24/24  scroll 768 = client 768
 820 BURGER  24/24  scroll 820 = client 820
1024 BURGER  24/24  scroll 1024 = client 1024  (etait desktop comprime)
1280 DESKTOP 32/32  marge nav +197  logo 48px
1440 DESKTOP 72/72  marge nav +277  logo 48px
Aucun overflow horizontal nulle part.

### TABLETTE — ANALYSE, PAS AUTOMATISME
768 et 820 passent en burger non par reflexe mais parce que la nav
desktop reclame ~1061px : elle ne tient tout simplement pas.
1024 (iPad paysage) aussi. iPad Air paysage (1180) recoit le desktop.

### INTERACTIONS TESTEES EN VRAI
- liens nav : Accueil /fr, services #bourse-finance #immobilier
  #software-ia, #projets, #a-propos, #contact, CTA #contact
- dropdown : survol ouvre, clic epingle, curseur sort -> reste ouvert,
  Echap ferme. Centre sous son bouton a 0px d'ecart, 272px, dans l'ecran.
- bouton + chevron passent ensemble en rgb(0,118,200) a l'ouverture
- burger : ouvre/ferme, aria-expanded et aria-label basculent,
  8 liens tous a 44px exactement, CTA present, Echap ferme
- FR/EN desktop ET mobile : url, lang, libelles, CTA, services basculent

### FAST REFRESH PROUVE
Marqueur window pose, puis gap-6 -> gap-10 dans le code :
  gap passe a 40px ET le marqueur survit -> aucun rechargement.
Modification de test annulee ensuite (0 trace de gap-10).

### LIMITE D'OUTILLAGE RENCONTREE (pas un bug du site)
L'Entree synthetique de l'automatisation ne genere PAS de clic :
  touches recues : keydown:Enter, keyup:Enter
  clics comptes  : 0
Or le bouton est un <button type="button"> natif : la specification HTML
garantit l'activation au clavier par Entree et Espace.
DECISION : ne RIEN ajouter. Un gestionnaire keydown provoquerait une
double activation dans un vrai navigateur (clic natif + gestionnaire),
le menu s'ouvrirait puis se refermerait.

### AUTRES PIEGES DE MESURE
- mouseenter seul ne declenche pas React : il delegue via mouseover
- lire une couleur moins de ~400ms apres un changement d'etat renvoie
  une valeur de transition, pas la valeur finale

### QA FINALE
375 ........ PASS      430 ........ PASS      768 ........ PASS
820 ........ PASS      1024 ....... PASS      1280 ....... PASS
1440 ....... PASS
LOGO ............ PASS  36px mobile / 48px desktop, lisible partout
NAVIGATION ...... PASS  jamais comprimee au-dessus du breakpoint
FR/EN ........... PASS  desktop + mobile, aller-retour verifie
HAMBURGER ....... PASS  44x44, aria correct
DROPDOWN ........ PASS  centre a 0px, dans l'ecran
CTA ............. PASS  barre en desktop, menu en mobile
NO OVERFLOW ..... PASS  scrollWidth = clientWidth sur les 7 largeurs
KEYBOARD ........ PASS  focus-visible solid, bouton natif
CONSOLE ......... PASS  onglet neuf : 19 ressources, 0 echec, 0 erreur
FAST REFRESH .... PASS  prouve par marqueur survivant
LINT ............ PASS
TYPECHECK ....... PASS
BUILD ........... PASS

NEXT:
- USER REVIEW -> attendre "NAVBAR VALIDEE"

---

## [NAVBAR] SIGNATURE DE MARQUE — 2026-09-15

NAVBAR
+ brand signature
+ INVESTIR · CONSTRUIRE · INNOVER  (fr)
+ INVEST · BUILD · INNOVATE        (en)
+ desktop a partir de 1280
+ responsive hide mobile et tablette
+ QA
+ no regression

### PLACEMENT
- dans le LOCKUP, sous le mot-symbole AWS, pas sous la navbar
- embleme a gauche / colonne [mot-symbole + signature] a droite

### TYPOGRAPHIE
- 9px, graisse 500, uppercase, tracking 0.13em, leading-none
- couleur #5b6b82 (nouveau token --color-aws-muted)
- separateurs "·" fins

### CONTRASTE — RESULTAT CONTRE-INTUITIF
Le reflexe "discret = opacite faible" ECHOUE :
  ink a 50% -> 3.02   ECHEC
  ink a 60% -> 4.04   ECHEC
  ink a 70% -> 5.49   ok
Un texte de 9px exige PLUS de contraste qu'un texte courant, pas moins.
Retenu : #5b6b82 = 5.43, discret a l'oeil et conforme AA.

### BUG TROUVE ET CORRIGE — IMAGE ETIREE
En passant le mot-symbole et la signature en colonne flex, l'image du
mot-symbole est passee de 110px a 197px de large : dans une colonne flex,
align-items vaut "stretch" par defaut, et l'image s'etirait a la largeur
de la signature (plus large qu'elle). Ratio casse : 3.93 -> 7.04.
CORRIGE par items-start. Ratio verifie a 3.93 sur les 7 largeurs.

### ACCESSIBILITE — DEUX CORRECTIONS
1. la signature s'ajoutait au nom du lien :
   "INVESTIR · CONSTRUIRE · INNOVER Alfred Winner Services — accueil"
   -> aria-hidden="true" sur la signature (typo de marque, pas navigation)
2. l'arbre d'accessibilite montrait ensuite le lien SANS NOM
   (le span sr-only etait vu comme un noeud separe)
   -> aria-label explicite sur le lien-logo, span sr-only retire
   Verifie : link "Alfred Winner Services — accueil"

### DECISION RESPONSIVE (par la mesure, pas par principe)
375 / 430 / 768 / 820 / 1024 -> MASQUEE
  ces largeurs sont en burger ; la signature fait 197px contre un
  mot-symbole de 74px a cette echelle (rapport 2.66) : la place existe
  mais le lockup serait desequilibre
1100 -> MASQUEE : la signature coute ~88px et la nav n'a que +66 de marge
1280 / 1440 -> VISIBLE : marge nav +109 et +189, largement suffisant

### AUCUNE MICRO-CORRECTION NECESSAIRE
hauteur navbar inchangee : 65px mobile / 81px desktop
le lockup reste pilote par l'embleme (48px) > colonne texte (40px)
alignement vertical, spacing interne : inchanges

### QA
375 ..... PASS  signature masquee, 16/16, pas d'overflow
430 ..... PASS  signature masquee
768 ..... PASS  signature masquee, aucune compression
820 ..... PASS  signature masquee
1024 .... PASS  signature masquee, burger
1280 .... PASS  signature visible, marge nav +109
1440 .... PASS  signature visible, marge nav +189
LOGO .......... PASS  ratio mot-symbole 3.93 partout
NAVIGATION .... PASS  7 liens inchanges
FR/EN ......... PASS  signature suit la langue
DROPDOWN ...... PASS  centrage 0px, Echap, bouton+chevron bleus
CTA ........... PASS  inchange
HAMBURGER ..... PASS  inchange
KEYBOARD ...... PASS  outlineStyle solid, focus bleu
A11Y TREE ..... PASS  9 elements interactifs, tous nommes
CONSOLE ....... PASS  onglet neuf : 19 ressources, 0 echec
NO OVERFLOW ... PASS  sur les 7 largeurs
LINT .......... PASS
TYPECHECK ..... PASS
BUILD ......... PASS
DEPENDANCES ... AUCUNE

NEXT:
- USER REVIEW -> attendre "NAVBAR VALIDEE DEFINITIVEMENT"
- le Hero sera concu separement : message, storytelling, couleurs,
  photographies africaines reelles, composition, CTA, responsive
  seront decides AVANT tout codage

---

## [HERO] PHASE 2 — 2026-09-15 — EN ATTENTE DE VALIDATION VISUELLE

HERO
- 2 imgs fournies par l'utilisateur, jamais remplacees
  public/images/hero/finance-markets.jpg   (1448x1086, 4:3)
  public/images/hero/real-estate.jpg       (1536x864, 16:9)
- bleu choisi #0a3d6e (token --color-aws-deep)
- rotation native React + CSS, 0 librairie
- controls 2 indicateurs cliquables
- FR/EN
- a11y
- reduced motion
- QA 375 -> 1440
- lint PASS / typecheck PASS / build PASS
- PAS DE COMMIT : attente validation visuelle

### CHOIX DU BLEU — FONDE SUR MESURE
Analyse des 2 photos (canvas) :
  finance    : luminance moyenne 91  (sombre), noirs + highlight froid #e0e0ff
  immobilier : luminance moyenne 139 (claire), gris + ocres chauds #806060
=> luminances OPPOSEES : la couleur doit tenir face aux deux
=> ocres chauds : un cyan froid jurerait, un bleu profond joue la
   complementarite bleu/orange
=> seul accord commun : highlight froid #e0e0ff -> direction froide mais douce

Candidats testes entre #002454 (navy navbar) et #0076c8 (bleu interactif).
RETENU #0a3d6e :
  - contraste 11.02 sur blanc ET avec du texte blanc -> un seul token sert
    de couleur de titre et de fond de bouton (AAA dans les deux sens)
  - profondeur intermediaire dans la famille existante : lu comme voulu
  - garde une chroma bleue visible, contrairement a #002454 qui tire au noir

### ARCHITECTURE
src/components/sections/Hero.tsx       SERVER component (texte, CTA)
src/components/sections/HeroMedia.tsx  CLIENT component (rotation seule)
=> frontiere deliberee : le texte n'envoie aucun JS au navigateur

### TRAITEMENT DES IMAGES
- cadre commun aspect 4/3
  finance   : 4:3 natif -> AUCUN recadrage, et c'est l'image above-the-fold
  immobilier: 16:9 -> object-position 78% 50% pour conserver l'ouvrier au
              gilet jaune (x 1250-1420 sur 1536) que le centrage coupait
- next/image fill + sizes + priority sur la 1re slide
- servi en WebP : 391 Ko source -> 39 Ko en w=828, 26.7 Ko en w=640 (-90%)

### ROTATION
- 6500ms, transform + opacity uniquement (GPU friendly)
- easing cubic-bezier(.32,.72,0,1), 900ms
- contre-translation interne 3.5% : la photo bouge moins vite que son cadre
  -> sensation editoriale, pas un simple glissement
- pause au survol ET au focus clavier (onFocusCapture)
- swipe tactile (seuil 48px)
- setTimeout relance a chaque index : cliquer une vignette redemarre le compte

### CORRECTIONS FAITES EN COURS DE ROUTE
1. eyebrow a text-aws-deep/65 -> contraste 4.08, ECHEC pour du 11px
   (mesure par echantillonnage de pixel : Tailwind v4 rend les opacites en
   oklab(), un simple parse de nombres donne un faux resultat)
   corrige en /75 -> 5.37
2. a 768/820 le cadre atteignait 772x579 et ecrasait la composition
   corrige : plafond max-w-[34rem] en colonne unique, meme mesure que le
   paragraphe -> 544x408

### FAUSSE ALERTE — A RETENIR
J'ai d'abord conclu que la pause ne fonctionnait pas. C'etait MON TEST :
  - .click() focalise deja le bouton, donc le .focus() suivant ne declenchait
    aucun evenement focusin
  - l'etat de survol fuitait d'une etape a l'autre
Verifie ensuite par lecture directe de la fibre React : apres 9s de survol
l'index ne bouge pas, et la rotation reprend 7.2s apres le depart du curseur.
AUCUN BUG.

### QA REELLE (localhost:3100)
largeur  colonnes        cadre      H1           overflow
375      1 x 343         343x257    34px/3 lig   non
430      1 x 398         398x299    34px/2 lig   non
768      1 x 720         544x408    42px/2 lig   non
820      1 x 772         544x408    42px/2 lig   non
1024     1 x 976         544x408    42px/2 lig   non
1280     596/540         540x405    56px/3 lig   non
1440     638/578         578x433    56px/3 lig   non
- image jamais deformee (remplit exactement son cadre aux 7 largeurs)
- aucun chevauchement contenu/media
- indicateurs 44px partout
- scrollWidth = clientWidth partout

### FONCTIONNEL VERIFIE
- rotation auto : avance apres 7.2s sans interaction
- commande manuelle : les 2 sens, aria-current suit
- noms accessibles : "Afficher 01 — BOURSE & FINANCE" / "02 — IMMOBILIER"
- pause survol 9s : index inchange ; reprise 7.2s apres depart
- clavier : CTA principal #expertises, CTA secondaire #contact, indicateurs,
  tous en focus-visible outlineStyle solid
- 1 seul h1 ; section nommee par aria-labelledby, cible existante
- label non annonce automatiquement (pas de region live)
- reduced-motion : regle @media emise, 9 classes motion-reduce dans le Hero,
  hook branche sur matchMedia. NON verifiable a l'execution : l'outil ne sait
  pas emuler le reglage systeme.

### NAVBAR NON-REGRESSION
logo / signature / 7 liens / dropdown + items / FR-EN / CTA / burger /
hauteur 81px : tout identique, en FR comme en EN.

NEXT:
- VALIDATION VISUELLE UTILISATEUR
- puis commit "feat: add aws hero section"

---

## [HERO] REFINE — BLOC BLEU — 2026-09-15 — ATTENTE VALIDATION

HERO refine
- full blue #00417e, pleine largeur, colle sous navbar (0px)
- bleu preleve DANS l'embleme du logo (#0050a0 dominant 2007px,
  #004080 profond 1543px) -> fond entre les deux, blanc dessus 10.21 AAA
- degrade ton sur ton imperceptible #00457f -> #00365e
- typo blanche : h1 60px, eyebrow blanc/75 (6.42), para blanc/85 (7.80)
- labels 01/02 SUPPRIMES
- 2 imgs rotation, devoilement par transformations seules
- photo a fond perdu jusqu'au bord droit, pleine hauteur, radius gauche
- CTA blanc plein / CTA contour blanc
- indicateur minimal 2 traits sur la photo, sans libelle
- autoplay 7s, 14s apres clic manuel
- pause survol + focus
- swipe tactile
- FR/EN
- responsive 375 -> 1440
- reduced motion
- navbar no regression (diff VIDE)
- lint pass
- tsc pass
- build pass
- PAS DE COMMIT

ROTATION — comment
  cadre translate 100% -> 0, image interne -100% -> 0
  la photo ne bouge pas, son cadre la decouvre
  le plan sortant reste immobile dessous (memoire "sortant")
  transformations seules, pas de clip-path ni de width

QA
  375  16/16  343x257  h1 36/4lig  sect 929   ok
  430  16/16  398x299  h1 36/3lig  sect 905   ok
  768  24/24  544x408  h1 44/3lig  sect 1004  ok
  820  24/24  544x408  h1 44/3lig  sect 1004  ok
  1024 24/24  544x408  h1 44/3lig  sect 1004  ok
  1280 32/32  613x653  h1 60/3lig  sect 653   photo au bord  ok
  1440 72/72  690x653  h1 60/3lig  sect 653   photo au bord  ok
  padding gauche Hero = marge navbar a chaque largeur
  0 overflow partout, image jamais deformee, indicateurs 44px

CORRECTIONS EN ROUTE
- cadre sans fond -> trou dans le bleu avant peinture de l'image
  corrige par bg #00325a

---

## [HERO] PREMIUM REFINE — 2026-09-15 — ATTENTE VALIDATION

HERO premium refine
- blue kept #00417e
- logo tagline reduced 9px -> 7.5px, tracking 0.13em -> 0.2em, gap 3 -> 2
- hero eyebrow kept 11px
- media smaller 690x653 -> 490x367 (47.9% -> 34% viewport)
- blue negative space autour de la photo
- 2 img rotation refined (devoilement conserve)
- sector labels removed (deja fait, confirme)
- contact CTA only navbar
- expertise CTA -> #expertises
- projects secondary LINK (pas un bouton) -> #projets
- responsive QA 375 -> 1440
- a11y
- navbar no regression (2 lignes : gap + classe signature)
- lint PASS
- tsc PASS
- build PASS
- PAS DE COMMIT

MESURES ACIM (prises a 1440 dans le navigateur)
  media 570x429, 39.6% du viewport, ratio 4:3, radius 0
  colonne texte 550px (38%), titre 38px, eyebrow 10px
  hero ~577px de haut
AWS APRES REFINE
  media 490x367, 34% du viewport, ratio 4:3, radius 20px
  colonne texte 750px (52%), h1 58px, eyebrow 11px
  hero 615px de haut
=> media legerement plus petit qu'ACIM, h1 nettement plus dominant.
   C'est voulu : le brief demande le H1 protagoniste.

HIERARCHIE OBTENUE
  signature navbar 7.5px  <  eyebrow hero 11px  <  h1 58px
  contraste signature 5.43 INCHANGE : reduite par l'echelle, pas par
  l'opacite — l'affaiblir serait passe sous le seuil AA.

ARCHITECTURE CTA (plus aucun doublon)
  COMPRENDRE -> hero principal, bouton blanc plein -> #expertises
  PROUVER    -> hero secondaire, LIEN editorial    -> #projets
  CONTACTER  -> navbar, et elle seule              -> #contact

SUPPRESSIONS (moins d'elements, pas plus)
  - voile sombre sur la photo : l'indicateur est passe SOUS l'image,
    sur le bleu, il n'a plus besoin d'etre rendu lisible par-dessus
  - fond perdu et pleine hauteur : la photo redevient un objet borne

QA
  375  media 343x257 91.5%  h1 36  sig masquee  ok
  430  media 398x299 92.6%  h1 36  sig masquee  ok
  768  media 544x408 70.8%  h1 44  sig masquee  ok
  820  media 544x408 66.3%  h1 44  sig masquee  ok
  1024 media 544x408 53.1%  h1 44  sig masquee  ok
  1280 media 435x326 34.0%  h1 58  sig 7.5px    ok
  1440 media 490x367 34.0%  h1 58  sig 7.5px    ok
  0 overflow, texte aligne sur le logo partout, hero colle sous navbar (0px)
  navbar 81px / 65px inchangee, lockup 48px inchange

---

## [HERO] SPATIAL REFINE — 2026-09-15 — ATTENTE VALIDATION

HERO spatial refine
- ACIM measured (1440, chargement reussi)
- AWS measured avant/apres
- inner container recalibrated
- text/media closer : vide 137px -> 64px
- gap fixed 56 -> 64
- media size maintained 490 -> 480 (pas reduit davantage)
- blue depth refined
- CTA group refined (2 pastilles, meme hauteur)
- 2-img rotation inchangee
- responsive
- a11y
- navbar safe (2 lignes de code, signature seule)
- lint PASS
- tsc PASS
- build PASS
- PAS DE COMMIT

DIAGNOSTIC MESURE (1440, avant correction)
  colonne texte declaree   750px
  texte reellement occupe  669px
  -> 81px de vide DANS la colonne
  + 56px de gap
  = 137px de separation visuelle
  Le desert ne venait PAS du gap mais d'une colonne en 1fr, donc plus
  large que son contenu. Le H1 (17ch / 58px) s'etalait sur 669px et
  imposait cette largeur.

CORRECTION STRUCTURELLE
  colonnes dimensionnees sur leur CONTENU :
    texte  33rem (528)
    media  clamp(20rem, 34vw, 30rem)
  gap 64
  desk:justify-center -> la PAIRE est centree, l'espace libre passe a
  l'exterieur au lieu de s'ouvrir au milieu
  H1 ramene a 15ch / 52px : il ne dicte plus la composition

RESULTAT 1440
  vide visuel 64px (= le gap, 0 gaspille)
  texte 528 / gap 64 / media 480 -> paire 1072, marges 184/184
  ratios de la paire : texte 49.3% / gap 6.0% / media 44.8%
  (cible demandee 48-52 / 5-8 / 38-44 : atteinte)
  hauteur section 596 (etait 615)

REFERENCE ACIM (1440, mesuree)
  bloc texte 550 (38.2% viewport), media 570x429 (39.6%), titre 38px
  AWS apres : texte 528 (36.7%), media 480 (33.3%), h1 52px
  densite comparable, h1 plus dominant (voulu)
  NOTE HONNETE : leur CSS de theme ne se charge plus dans mon navigateur,
  je n'ai PAS pu remesurer leurs offsets ni leur gap a 1280.
  Je m'appuie sur les largeurs capturees lors d'un chargement reussi.

EN PILE (768 / 820 / 1024)
  texte et media partagent la MEME mesure 34rem et sont CENTRES
  avant : 24 a gauche / 456 a droite -> apres : 240/240 a 1024
  justify-items-center ne suffisait pas (w-full fixe la boite au debut
  de la cellule) -> mx-auto

CTA
  les deux sont maintenant des pastilles de meme hauteur (48px)
  principal : blanc plein, texte bleu
  secondaire : contour blanc 35%
  le lien nu precedent etait trop isole

FOND
  amplitude elargie #004a85 -> #00305a (etait #00457f -> #00365e)
  meme famille logo, blanc dessus AAA des deux cotes

QA
  375  16/16   media 343 91.5%  h1 36  ok
  430  16/16   media 398 92.6%  h1 36  ok
  768  112/112 media 544 70.8%  h1 44  ok  centre
  820  138/138 media 544 66.3%  h1 44  ok  centre
  1024 240/240 media 544 53.1%  h1 44  ok  centre
  1280 126/126 media 435 34.0%  h1 52  ok  2 colonnes, vide 64
  1440 184/184 media 480 33.3%  h1 52  ok  2 colonnes, vide 64
  0 overflow, symetrique partout, navbar 81/65 inchangee

---

## [SECTION 2] NOTRE APPROCHE — 2026-09-15 — ATTENTE VALIDATION

SECTION 2 creee
- src/components/sections/Approach.tsx (SERVER component, 0 JS)
- eyebrow NOTRE APPROCHE + h2 + paragraphe
- 3 piliers 01 INVESTIR / 02 CONSTRUIRE / 03 INNOVER
- fond BLANC, pas de photo, pas de carte
- FR + EN
- responsive 375 -> 1440
- lint PASS / tsc PASS / build PASS
- PAS DE COMMIT

DECISIONS DESIGN
- PAS de cartes : filet superieur par colonne (procede de presse imprimee),
  aucun fond, aucune ombre, aucun gros arrondi
- PAS d'animation au scroll : la section suit immediatement le Hero, elle
  est deja visible au chargement sur la plupart des ecrans. L'animation se
  declencherait a vide. Consequence : composant serveur pur, 0 JS.
- PAS d'image : le Hero en porte deja une forte
- en-tete sur 2 colonnes a partir de 1100 : titre 816 / paragraphe 400,
  alignes par le BAS (items-end) — assise nette plutot qu'un alignement
  haut toujours bancal quand les hauteurs different
- <ul>/<li> et non des <div> : un lecteur d'ecran annonce "liste de 3"

FOND BLANC — DECISION MESUREE
  J'avais d'abord pose un blanc casse #f7f9fc (token aws-shell).
  Mesure : le bleu d'accent y tombait a 4.50 de contraste, le seuil EXACT,
  pour des libelles de 11px. Sur blanc pur il retrouve 4.75, valeur deja
  validee ailleurs. Fond passe en blanc, token aws-shell retire.
  La respiration apres le bloc bleu vient de l'espace (96px de padding),
  pas d'une seconde teinte.

NETTOYAGE
  --color-aws-deep (#0a3d6e) supprime : plus aucun usage depuis que le Hero
  utilise --color-aws-hero. Evite deux bleus quasi identiques dans le systeme.

CONTRASTES (sur blanc)
  eyebrow 11px      4.75
  h2 40px          10.21
  paragraphe 16px   7.59
  label 11px        4.75
  titre pilier 22px 10.21
  texte 15px        7.59

GEOMETRIE 1440
  container 1360 partage avec navbar et Hero, aligne a 72
  padding section 96 haut / 96 bas
  en-tete 816 + gap 80 + 400
  piliers 400 / 400 / 400, gap 48, marge haute 80
  transition Hero -> section : 0px

QA
  375   16/16  piliers empiles  h2 28px  ok
  430   16/16  piliers empiles  h2 28px  ok
  768   24/24  piliers empiles  h2 34px  ok
  820   24/24  piliers empiles  h2 34px  ok
  1024  24/24  piliers empiles  h2 34px  ok
  1280  32/32  3 colonnes       h2 40px  ok
  1440  72/72  3 colonnes       h2 40px  ok
  0 overflow partout, aligne sur la navbar a chaque largeur

SEMANTIQUE
  h1 = 1 (Hero), h2 = 1 (cette section), h3 = 3 (piliers)

NAVBAR ET HERO : diff VIDE, aucun des deux n'a ete touche.

CONTENU : aucune invention. Ni client, ni chiffre, ni certification, ni
promesse de rendement. Micro-copy conservee telle que fournie.

--------------------------------------------------------------------------
SECTION 2 — CORRECTION VISUELLE (PASSE 02)
--------------------------------------------------------------------------

LE PROBLEME, DIT SIMPLEMENT
  Version 01 : trop d'air, trop de texte, trois colonnes qui se ressemblent.
  L'oeil lit trois paragraphes, pas trois piliers. Rien n'accroche.

CE QUE J'AI CHANGE

  1. FLEXBOX A LA PLACE DE GRID
     avant : grid md:grid-cols-3 gap-12
     apres : flex flex-col desk:flex-row, chaque <li> en flex-1
     flex-1 = flex-grow:1 + flex-shrink:1 + flex-basis:0%
     basis 0 veut dire : on oublie la largeur du contenu, on partage
     l'espace en parts egales. Les trois piliers font donc exactement
     la meme largeur meme si un texte est plus long. Mesure : hauteurs
     et largeurs egales, verifie true.

  2. GAP ZERO, BORDURES A LA PLACE
     Le gap coupait le filet haut en trois morceaux. Gap retire, espace
     rendu par du padding interne (pl-10 / pr-10). Les trois border-t se
     touchent : UNE seule ligne continue sur toute la bande. Verifie true.
     Separation verticale = border-l sur les piliers 02 et 03 uniquement.
     Resultat : une bande, pas trois cartes SaaS.

  3. PICTOGRAMMES
     Trois SVG inline, dessines a la main, traits seulement.
     stroke 1.6, 28x28, currentColor, aria-hidden.
     Motifs pris DANS l'embleme AWS lui-meme :
       01 courbe qui monte + fleche   -> marches
       02 deux immeubles + fenetres   -> immobilier
       03 puce avec broches           -> IA / logiciel
     Zero dependance ajoutee. Zero emoji. Zero image generee.
     Pourquoi inline et pas une librairie : 3 icones = 1.2 Ko de JSX
     contre ~50 Ko de paquet pour trois formes qu'on dessine mieux nous-memes.

  4. ACCENT AU-DESSUS DE CHAQUE PILIER
     Barre 40x2px, rgb(0,118,200), rounded-full, en position absolue sur
     le filet. Elle demarre exactement ou demarre le texte du pilier
     (left-0 pour le premier, desk:left-10 pour les suivants, la meme
     valeur que leur pl-10). Aligne sur le contenu : verifie true x3.

  5. INTRO COMPACTEE EN UN SEUL BLOC
     avant : deux colonnes (titre a gauche, paragraphe a droite), gap 80.
     apres : eyebrow -> h2 -> paragraphe, empiles, mt-4 entre chaque.
     Un seul groupe editorial que l'oeil avale d'un coup.

  6. DENSITE
     padding  96/96  ->  py-12 sm:py-14 desk:py-16  (48 / 56 / 64)
     h2 40px  ->  36px a 1280
     marge avant les piliers 80 -> 40 (mt-10 / desk:mt-12)
     Compact, pas serre : les respirations restent, elles sont juste
     proportionnees au contenu.

HAUTEUR DE SECTION (la mesure qui compte)
  1280   667 version editoriale
         710 apres ajout des pictogrammes
         644 apres reglage de densite      -> -23 px sous l'origine
  1440   592

QA REELLE (viewport redimensionne pour de vrai, pas simule)
  vp     sens     hauteur  largeur texte  lignes  accents  overflow
  375    colonne   1169     343            3       ok       non
  430    colonne   1062     398            3       ok       non
  768    colonne    963     536            2       ok       non
  820    colonne    963     536            2       ok       non
  1024   colonne    963     536            2       ok       non
  1280   ligne      644     ~330           3       ok       non
  1440   ligne      592     365            3       ok       non

DEFAUT TROUVE ET CORRIGE EN COURS DE ROUTE
  En empile j'avais retire max-w. A 1024 le texte d'un pilier s'etalait
  sur 976px, soit plus de 130 caracteres par ligne. Illisible.
  Regle typographique : on vise 45-75 caracteres.
  Corrige par max-w-[54ch] desk:max-w-none -> 536px, 2 lignes.
  Le max-w ne s'applique qu'en pile ; en ligne c'est flex-1 qui borne.

BARRIERE QUALITE
  npm run lint      0 erreur, 0 warning
  npx tsc --noEmit  0 erreur
  npm run build     OK, /fr et /en toujours en SSG
  console navigateur : vide, FR et EN

CONTENU
  Aucun texte invente. EN verifie mot pour mot :
  OUR APPROACH / Three fields. One ambition: creating value. /
  01 INVEST, 02 BUILD, 03 INNOVATE.

TOKENS
  Aucun token cree. Aucun token modifie. La section n'utilise que
  aws-hero, aws-blue-text, aws-ink, aws-line.

NAVBAR ET HERO : toujours pas touches.

PAS DE COMMIT. En attente de validation visuelle.

--------------------------------------------------------------------------
SECTION 2 — QA RESPONSIVE EXHAUSTIVE (PASSE 03)
--------------------------------------------------------------------------

POURQUOI CETTE PASSE
  L'utilisateur demande la preuve que la section tient sur TOUS les
  appareils, pas sur 7 largeurs choisies. J'ai donc balaye 19 largeurs,
  de 320 a 2560, en redimensionnant reellement le viewport.

DEFAUT TROUVE — LA GOUTTIERE ORPHELINE
  A 1100 (pile au basculement en ligne), mesure :
    piliers 318 / 359 / 359     <- pas egaux
    texte du 3e pilier finit a 41px AVANT la fin du filet

  Cause. Chaque pilier porte flex-1, donc flex-basis:0%. Avec
  box-sizing:border-box, une base de 0 ne peut pas etre plus petite que
  le padding : la base reelle d'un pilier vaut son padding.
    pilier 1 : pr-10        -> base 40
    pilier 2 : pl-10 pr-10  -> base 80
    pilier 3 : pl-10 pr-10  -> base 80
  L'espace libre se partage en 3 parts egales, mais on l'ajoute a des
  bases inegales : les boites sortent inegales. Et le pr-10 du dernier
  pilier ne sert a rien : il n'a aucun voisin a droite. Il creusait donc
  un trou de 40px entre le dernier texte et le bout du filet.

  Correction. La gouttiere ne se pose que la ou il y a un voisin :
    pas de pl sur le premier, pas de pr sur le dernier.
    bases 40 / 80 / 40, et les colonnes de contenu redeviennent egales.

  Apres :
    1100  colonnes 291 / 291 / 291   gouttieres 81 / 81   bord droit OK
    1280  colonnes 351 x3            hauteur 644 -> 619
    1440+ colonnes 378 x3            hauteur 592

DEUX FOIS OU MON INSTRUMENT ETAIT FAUX, PAS LA PAGE
  1. Je mesurais le bord gauche de la BOITE du conteneur. px-4 est un
     padding interieur, donc cette boite commence a 0. J'ai conclu a tort
     "gouttiere 0, pas aligne sur la navbar". Preuve du contraire : a 320
     les piliers font 288 = 320 - 2x16. Sonde corrigee -> mesurer le
     debut du CONTENU. Resultat : 16px, aligne sur le logo.
  2. Je comparais le bord droit du dernier texte au bord droit du h2.
     Or le h2 est volontairement bride a max-w-[24ch] : sa droite ne veut
     rien dire. Bonne reference = le bord du conteneur flex.

BALAYAGE COMPLET — toutes valeurs mesurees, aucune extrapolee

  TELEPHONES (empile)
  320   h 1269  marge 16  h2 27px  3 lignes  texte 28-35 c/ligne
  360   h 1169  marge 16  h2 27px  3 lignes
  375   h 1169  marge 16  h2 27px  3 lignes
  390   h 1093  marge 16  h2 27px  3 lignes
  414   h 1093  marge 16  h2 27px  3 lignes
  430   h 1062  marge 16  h2 27px  2 lignes

  TABLETTES (empile)
  600   h  963  marge 16  h2 27px  texte 536px  2 lignes
  768   h  963  marge 24  h2 31px  texte 536px  2 lignes
  810   h  963  marge 24  h2 31px
  834   h  963  marge 24  h2 31px
  1024  h  963  marge 24  h2 31px
  1099  h  963  marge 24  h2 31px   <- derniere largeur empilee

  ORDINATEURS (en ligne, bascule a 1100 = 68.75rem)
  1100  h 644  marge 32   colonnes 291 x3  gouttieres 81/81
  1280  h 619  marge 32   colonnes 351 x3  gouttieres 81/81
  1366  h 592  marge 35   colonnes 378 x3  gouttieres 81/81
  1440  h 592  marge 72   colonnes 378 x3
  1512  h 592  marge 108  colonnes 378 x3
  1920  h 592  marge 312  colonnes 378 x3
  2560  h 592  marge 632  colonnes 378 x3

  Au-dela de 1424 le conteneur plafonne a 1296 de contenu et les marges
  grandissent symetriquement. 2560 - 2x632 = 1296. Confirme.

  A CHAQUE largeur, sans exception :
    overflow horizontal      non
    accents alignes          oui
    filet continu            oui
    colonnes egales          oui
    bord gauche / droit OK   oui
    aligne sur la navbar     oui

MOBILE NON REGRESSE
  Le correctif est prefixe desk:, donc il ne devait rien changer en
  dessous de 1100. Verifie et non suppose : hauteurs identiques avant /
  apres a 320, 375, 430, 768, 1024.

BARRIERE QUALITE
  npm run lint      0 erreur, 0 warning
                    PREUVE : 11 fichiers reellement analyses, dont
                    src/components/sections/Approach.tsx (sortie JSON).
  npx tsc --noEmit  0 erreur
  npm run build     OK, /fr et /en toujours en SSG
  console FR et EN  vide

EN VERIFIE A 1440 APRES CORRECTION
  colonnes 378 x3, bord droit OK, hauteur 592, lang="en",
  titres Identifying opportunities / Turning projects into assets /
  Technology as an accelerator.

PAS DE COMMIT. En attente de validation visuelle.

==========================================================================
SECTION 4 — NOTRE METHODE
==========================================================================

CE QUE J'AI ETUDIE CHEZ ACIM (mesure reelle, pas souvenir)
  Section "Notre methode / Design -> Build -> Grow -> Innovate", a 1440 :
    container            1026 de contenu dans un panneau de 1140
    eyebrow              14px, 700, tracking 2.5px, GRIS NEUTRE
    grand titre          45px, 800, line-height 45px (ratio 1.0), couleur accent
    intro                14px, largeur 596 = 58% du container seulement
    numero               disque 44px, fond rgb(251,225,230), chiffre rgb(179,35,72)
    colonne numero       72px fixe, contenu 954 souple
    separateur           1px rgb(216,211,209), 3 filets pour 4 etapes, ~28px autour
    fond                 rgb(246,244,243), panneau contenu, PAS pleine largeur

  Les 5 lecons retenues :
    1. l'accent est reserve au titre, l'eyebrow reste neutre
    2. la force du titre vient du serrage (lh 1.0), pas de la taille seule
    3. l'intro est une legende : plus etroite ET plus petite que le corps
    4. colonne rigide + colonne elastique = flex
    5. n-1 separateurs : une ligne apres la derniere etape fermerait une boite

CE QUE JE N'AI PAS REPRIS
  leur panneau de fond beige       -> nous restons en blanc + filet
  leurs 4 concepts                 -> nos 4 etapes AWS
  leur chiffre a 1 caractere       -> 01-04, la notation deja utilisee sur le site
  leur description pleine largeur  -> bornee (ils sont a ~120 car/ligne, c'est trop)
  leur echelle de titre            -> la notre, celle de Notre approche

FICHIERS
  CREE     src/components/sections/Method.tsx
  MODIFIE  src/i18n/dictionaries.ts        (methode FR + EN, 2 types exportes)
  MODIFIE  src/app/[locale]/page.tsx       (montage apres Approach)
  Aucun token touche. Aucune dependance ajoutee. Aucune image.

COULEURS — pourquoi ce partage
  eyebrow          bleu clair   comme l'eyebrow de Notre approche -> systeme coherent
  grand titre      bleu profond comme le h2 de Notre approche
  fleches          bleu clair   l'accent est la, pas sur tout le titre
  mot-cle etape    bleu clair   COMPRENDRE / STRUCTURER / REALISER / FAIRE EVOLUER
  complement       bleu profond
  description      encre 80%
  numero           bleu profond sur disque bleu clair a 10%
  filets           aws-line

  Le chiffre est en BLEU PROFOND et non en bleu clair : sur la teinte a 10%
  le bleu clair tombe a 4.15 de contraste, sous le seuil AA pour du 12px.
  Mesure, pas estime. Bleu profond -> 8.89.

CONTRASTES MESURES (canvas, car Tailwind v4 rend l'opacite en oklab)
  eyebrow 11px        4.75
  grand titre 36px   10.21
  fleches 36px        4.75
  numero 12px         8.89   (sur le disque teinte)
  mot-cle 20px        4.75
  titre etape 20px   10.21
  description 15px    7.59
  separateur          1.19   (voulu : ressenti, pas vu)

TROIS DEFAUTS TROUVES PAR LE TEST, PAS PAR LA COMPILATION

  1. DESCRIPTIONS TROP LARGES
     max-w-[68ch] donnait 83 caracteres par ligne, jusqu'a 88 sur l'etape 04.
     Confortable = 45-75. Ramene a 58ch -> 52 a 71 car/ligne.
     Prix assume : la section passe de 913 a 987 a 1440. La lisibilite
     passe avant la compacite.

  2. LE NUMERO PENDAIT SOUS SON TITRE
     Avec items-start, un disque se centre sur LUI-MEME, pas sur la ligne
     de titre d'a cote. Disque 40px, ligne de titre 23.4px :
     (40 - 23.4) / 2 = 8.3px de decalage. Mesure : 8.3. Exactement.
     L'interligne du h3 change a chaque breakpoint, donc une marge negative
     fixe serait fausse quelque part. Disque ramene a 32px -> 4.3px,
     puis -3px de correction -> 1.3px en mobile, -0.8px en desktop.
     Effet secondaire voulu : le repere devient plus discret.

  3. NOM ACCESSIBLE CASSE (le plus grave, invisible a l'ecran)
     Le h3 est fait de 3 fragments : mot-cle / tiret decoratif / complement.
     L'algorithme accname retire les noeuds aria-hidden, et n'ajoute un
     espace qu'autour des elements NON-inline. Mes 3 spans etaient inline.
     Un lecteur d'ecran annoncait : "COMPRENDREClarifier avant d'agir".
     Corrige par des espaces explicites places HORS du span cache, et le
     padding du tiret ramene de 8 a 4px pour compenser.

     A NOTER : mon premier test signalait le meme defaut sur "01INVEST"
     dans Notre approche. FAUX. La-bas les fragments sont des items flex,
     donc display:block, donc accname ajoute les espaces : le vrai rendu
     est "01 INVEST". Verifie en lisant le display calcule des deux cotes.
     Notre approche n'a PAS ete modifiee.

STRUCTURE
  section > container 1360 > bloc py + filet haut
    eyebrow
    h2   reconstruit a partir des 4 "cle" : le titre EST la sequence
    intro
    ol
      li  flex items-start
          span  disque 32px shrink-0
          div   min-w-0 : h3 (mot-cle / tiret / complement) + description

  min-w-0 : par defaut un enfant flex a min-width:auto et refuse de
  devenir plus etroit que son plus long mot. Sans lui, un mot long
  pousserait la ligne hors du container.

  Coupure du grand titre : chaque groupe "mot + fleche" est nowrap, donc
  une fleche ne peut jamais se retrouver seule en debut de ligne. Mais
  deux spans colles n'offrent aucune occasion de couper : le titre serait
  devenu une seule ligne insecable. D'ou l'espace explicite entre les
  groupes, seul endroit ou la ligne peut se casser.

TRANSITION AVEC NOTRE APPROCHE
  Les deux sections sont blanches. Sans marqueur elles feraient une masse.
  Un filet aws-line en haut de Notre methode, sur toute la largeur du
  container : le meme langage que les filets entre les etapes.
  Mesure a 1440 : 64px entre le dernier texte d'Approche et le filet,
  65px entre le filet et l'eyebrow. Centre.
  Pas de fond teinte : le bleu clair faisait tomber l'eyebrow a 4.50,
  le seuil exact.

ANIMATION
  AUCUNE. Une apparition au scroll imposerait un Client Component donc du
  JS et de l'hydratation, pour un gain nul. Server Component pur, 0 JS.

QA RESPONSIVE (viewports reellement redimensionnes)
  vp     h section  titre       car/ligne desc   repere  filets  overflow
  320    1488       27px 4 lig  26-29            1.3px   1110    non
  375    1311       27px 3 lig  31-36            1.3px   1110    non
  430    1133       27px 2 lig  39-47            1.3px   1110    non
  768     951       31px 2 lig  52-71            0.1px   1110    non
  820     951       31px 2 lig  52-71            0.1px   1110    non
  1024    915       31px 1 lig  52-71            0.1px   1110    non
  1280    987       36px 1 lig  52-71            0.8px   1110    non
  1440    987       36px 1 lig  52-71            0.8px   1110    non
  1920    987       36px 1 lig  52-71            0.8px   1110    non

  filets "1110" = 3 separateurs, le dernier n'en a pas. Partout.
  Le grand titre tient sur UNE ligne des 1024. C'est l'effet recherche.
  Aligne sur l'axe de la navbar a chaque largeur.

RIEN N'EST CASSE — preuve par mesure, pas par affirmation
  Hauteurs de Hero et Notre approche identiques a celles relevees AVANT
  cette mission, a chaque largeur :
    Approche  592 (1440) / 619 (1280) / 963 (768-1024) / 1062 (430) /
              1169 (375) / 1269 (320)
    Hero      596 / 1044 / 953 / 977 / 1001
  Navbar     alignement verifie a chaque largeur.

ACCESSIBILITE
  h1 = 1 (Hero), h2 = 2 (Approche, Methode), h3 = 7 (3 piliers + 4 etapes)
  <ol> car l'ordre porte du sens, contrairement aux 3 univers simultanes
  numero non masque : Tailwind retire les puces de <ol> et certains
  navigateurs cessent alors d'annoncer la liste
  fleches et tirets aria-hidden
  aucune info portee par la seule couleur
  aucun ARIA superflu

CONTENU
  Aucune invention. Aucun chiffre. Aucun client. Aucune certification.
  Aucune promesse de rendement ni de performance financiere.
  Textes FR repris du cahier des charges, EN redige (pas traduit mot a mot) :
  Understand / Structure / Deliver / Evolve.

TESTS
  lint    PASS  12 fichiers analyses, dont Method.tsx (preuve JSON)
  tsc     PASS  0 erreur
  build   PASS  /fr et /en toujours en SSG
  console PASS  vide en FR et en EN

PAS DE COMMIT. En attente de validation visuelle.

==========================================================================
SECTION 4 — NOTRE METHODE — CALIBRATION VISUELLE FINALE
==========================================================================

DIAGNOSTIC (avant de toucher au code)
  Version precedente : correcte techniquement, jugee trop "documentation" :
  fond blanc clinique, titre pas assez affirme, numeros trop discrets,
  664px d'espace mort a droite de chaque etape, separateurs quasi invisibles.

RE-ETUDE ACIM (mesure reelle, meme viewport 1440, pas de memoire)
  fond section         rgb(246,244,243) — panneau contenu, pas pleine largeur
  eyebrow              14px 700 tracking 2.5px GRIS neutre (pas l'accent)
  grand titre           45px 800 line-height 45px (ratio 1.0)
  colonne numero        72px fixe / contenu 954 souple
  separateur            1px rgb(216,211,209), 3 pour 4 etapes

  Verifie IMMEDIATEMENT que rgb(246,244,243) copie telle quelle ferait
  tomber notre bleu de texte a 4.33 de contraste — sous le seuil AA. Meme
  piege que le rejet "aws-shell" documente plus haut dans ce journal.
  Le fond ACIM n'a donc pas ete copie : reconstruit et mesure a part.

TOKEN AJOUTE
  --color-aws-surface: #fdfcfa  rgb(253,252,250)
  Meme DIRECTION de teinte que ACIM (rouge > vert > bleu, un blanc
  "chauffe"), calibree pour laisser une marge reelle :
    eyebrow (aws-blue-text)  4.63   (ACIM litteral : 4.33, sous le seuil)
    titre   (aws-hero)       9.95
  Verifie par calcul WCAG puis RE-verifie en lisant la couleur reellement
  peinte par le navigateur (canvas) : rgb(253,252,250) exact, aucune
  surprise oklab.

SIX CORRECTIONS, CHACUNE MESUREE AVANT/APRES

  1. FOND — blanc -> aws-surface. Transition avec Notre approche (fond
     blanc juste au-dessus) : filet aws-ink/18 CONSERVE en plus du
     changement de fond — deux signaux tres discrets qui se renforcent
     plutot qu'un vide ou un bloc colore.

  2. GRAND TITRE — presence renforcee :
       36px bold 700 lh 1.15   ->   44px extrabold 800 lh 1.08 (desktop)
     Tient sur UNE ligne des 1100px (verifie), et se replie proprement
     a 1024/1024px en "Comprendre -> Structurer -> Realiser ->" /
     "Faire evoluer" (coupure naturelle, pas un mot coupe en deux) —
     verifie a l'ecran, pas suppose.
     Fleches : allegees (font-light, 0.72em) pour rester un rythme et
     non un signal concurrent du mot.

  3. INTRO — contraste renforce : ink/80 (7.50) -> ink/85 (8.80).
     Reste sous aws-hero (9.95, le complement de chaque etape) : la
     hierarchie intro < titre d'etape est preservee, pas inversee.

  4. NUMEROS — plus de presence sans devenir des badges :
       disque 32px, texte 12px, teinte 10%   ->   36px, 13px, teinte 12%
     Alignement optique recalcule (l'ecart theorique change avec la
     taille du disque) : residu maximal mesure 1.3px, invisible a l'oeil,
     a chaque largeur testee.

  5. SEPARATEURS — plus ressentis : aws-line (contraste 1.16, "invisible")
     -> aws-ink/18 (1.42). Toujours un filet, pas un trait — mais qui
     existe reellement au lieu de disparaitre.

  6. LARGEUR DES LIGNES — le vrai defaut structurel trouve par la mesure :
     le contenu de chaque etape (flex-grow:0 par defaut) ne remplissait
     PAS la ligne — 664px d'espace mort mesures a 1440 entre la fin du
     contenu et le bord du container, exactement le symptome decrit dans
     le cahier des charges. Corrige par flex-1 sur le conteneur de
     contenu ; le filet de separation, lui, couvrait deja toute la
     largeur (verifie).
     Mesure de la description elargie : 58ch/576px -> 39.75rem/636px.

DEUX DEFAUTS QUE MON PROPRE CODE A INTRODUITS, TROUVES PAR LA MESURE

  A. "ch" NE DONNE PAS LA MEME LARGEUR SUR DEUX ELEMENTS DE TAILLE
     DIFFERENTE. J'avais d'abord borne le h3 (17-20px selon le point de
     rupture) et la description (15px fixe) toutes deux a "64ch", en
     supposant que la meme unite donnerait la meme largeur. Mesure :
     h3 861px contre description 636px — le titre depassait de 226px.
     "ch" vaut la largeur du glyphe "0" DANS LA POLICE DE L'ELEMENT QUI
     LE PORTE : deux tailles de police, deux valeurs de ch. Corrige avec
     une largeur ABSOLUE (39.75rem) partagee par les deux. Ecart mesure
     apres correction : 0px, a chaque largeur.

  B. LA "PIRE LIGNE" N'EST PAS LA MOYENNE. Mon premier chiffre ("58ch
     donnait en moyenne 52-71 caracteres/ligne", ecrit dans la version
     precedente de ce journal) etait vrai en moyenne mais cachait la
     PIRE ligne. Simulation exacte par decoupe de mots (canvas, meme
     police/graisse que le rendu) : a 58ch, la pire ligne atteignait deja
     79 caracteres, pas 71. A la nouvelle largeur (636px), pire cas
     mesure : 85 caracteres sur l'etape la plus longue, les trois autres
     entre 62 et 80. Assume et documente plutot que cache : la demande
     explicite est d'elargir, et ACIM lui-meme depasse tres largement les
     75 caracteres "confortables" (110-140 mesures sur sa propre section).

CONTRASTES FINAUX (mesures par canvas, en conditions reelles)
  eyebrow 11px          4.63
  grand titre 44px      9.95
  intro 15-16px         8.78
  mot-cle etape 20px    4.63
  titre etape 20px      9.95
  numero (sur disque)   8.41 / 8.48 selon l'etape
  description 15px      7.40
  separateur            1.38   (voulu : ressenti, pas vu)

QA RESPONSIVE (viewports reellement redimensionnes)
  vp     h methode  h approche  titre       ecart h3/p  repere  filets  overflow
  375    1352       1169        30px 4 lig  0px         1.3px   1110    non
  430    1220       1062        30px 3 lig  0px         1.3px   1110    non
  768     916        963        38px 2 lig  0px         0.1px   1110    non
  820     916        963        38px 2 lig  0px         0.1px   1110    non
  1024    ...        963        38px 2 lig  0px         0.1px   1110    non
  1100    ...        ...        44px 2 lig  0px         ...     1110    non
  1280    948*       619        44px 1 lig  0px         0.8px   1110    non
  1440    948        592        44px 1 lig  0px         0.8px   1110    non

  * hauteur methode fluctue legerement (923-948) selon le nombre de
  lignes que chaque description occupe reellement a cette largeur — pas
  une anomalie, un effet attendu de l'elargissement des colonnes.

  Le titre casse proprement a 1024/1100 : "...Realiser ->" puis
  "Faire evoluer" — verifie a l'ecran, pas une coupure en plein mot.

NON-REGRESSION — mesuree, pas affirmee
  Navbar    81px   (inchangee)
  Hero      596px  (identique a la mesure d'avant cette mission)
  Approche  592-1169px selon largeur (identique, table complete ci-dessus)
  Diff git de Navbar.tsx, Hero.tsx, HeroMedia.tsx, Approach.tsx : VIDE.

FR / EN
  EN verifie : hierarchie 1×h1, 2×h2, 7×h3 ; noms accessibles corrects
  (Understand Get clear before acting. / etc., espaces presents) ;
  hauteur 923, identique au FR a cette largeur ; console vide.

ACCESSIBILITE
  Hierarchie inchangee depuis la premiere version (1×h1, 2×h2, 7×h3).
  <ol> toujours semantique. Contrastes tous verifies ci-dessus.

TESTS
  lint    PASS  12 fichiers analyses, dont Method.tsx (preuve JSON)
  tsc     PASS  0 erreur
  build   PASS  /fr et /en toujours en SSG
  console PASS  vide en FR et en EN, a chaque largeur testee

PAS DE COMMIT. En attente de validation visuelle finale.


## GOOGLE SEO — PREPARED / WAITING FOR AWS PRODUCTION WEBSITE — 2026-09-16

- pause explicite Alfred
- reprise uniquement: SITE AWS = FINALISÉ ET VALIDÉ
- aucun Google Business Profile cree / revendique / valide
- aucune Search Console creee / validee
- aucun DNS modifie / aucun deploiement
- aucun pin GPS / horaire / categorie invente
- ALFRED AI TRADER non touche
- recherche publique + Maps faite: aucune fiche AWS identifiable; absence non prouvee
- DNS www non resolu lors du controle; achat domaine inconnu
- avant pause: src/lib/seo.ts prepare
- avant pause: metadata FR EN + canonical/alternates conditionnels
- avant pause: robots.ts + sitemap.ts prepares
- indexation inactive par defaut; domaine non active dans configuration
- avant pause: Organization JSON-LD ajoute au layout; URL/logo/@id conditionnels
- LocalBusiness PENDING ALFRED adresse precise
- avant pause: libelles Maps FR EN precisent quartier / emplacement AWS a confirmer
- aucune refonte visuelle
- guides GOOGLE_BUSINESS_PROFILE_SETUP.md + GOOGLE_SEARCH_CONSOLE_SETUP.md prets
- lint PASS avec 1 warning formulaire Contact en cours de construction
- npx tsc --noEmit PASS
- npm run build PASS sur etat intermediaire avant pause
- autres fichiers modifies ensuite par agent Front-End; verification finale NON FAITE
- tests navigateur SEO / console / production active NON FAITS
- aucun commit
- plus de modification code ni test apres ordre de pause
- donnees manquantes: PENDING ALFRED
- categorie principale / secondaires: PENDING ALFRED
- horaires lundi dimanche: PENDING ALFRED
- adresse exacte / emplacement Maps: PENDING ALFRED
- domaine achete / connecte / URL production / hebergeur: PENDING ALFRED
- WhatsApp / reseaux sociaux / zones desservies si applicables: PENDING ALFRED
- statut accueil + enseigne confirme OUI pendant conversation; reconfirmer a reprise
- NEXT: finir site -> valider site -> deployer site -> reprendre Google

==========================================================================
SECTIONS 05-12 — QUI SOMMES-NOUS, EXPERTISES, PROJETS, VISION, FONDATEUR,
CTA FINAL, CONTACT, FOOTER, MENTIONS LEGALES, CONFIDENTIALITE
==========================================================================

CONTEXTE PARTICULIER DE CETTE VAGUE
  Une AUTRE session Claude Code a travaille EN PARALLELE sur la meme
  arborescence pendant cette mission (meme conversation, deux processus
  attaches, confirme par `ps aux`). Elle a construit la couche SEO
  (src/lib/seo.ts, robots.ts, sitemap.ts, generateMetadata, JSON-LD
  organisation) pendant que je construisais le contenu. Un artefact de
  fusion a ete trouve et corrige (des imports coupes par une fonction
  inseree au milieu dans page.tsx) ; le reste s'est integre proprement.
  Verifie par tsc + build a plusieurs reprises pendant le travail, pas
  seulement a la fin.

BLOQUEUR TRAITE EN DIRECT — PHOTO DU FONDATEUR
  Une premiere image envoyee ("IMAGE DU CEO") presentait des marques
  caracteristiques d'un traitement par IA (texture de peau en tourbillons,
  fond de studio generique) : REFUSEE, conformement a l'interdiction
  explicite de "fausse photographie du CEO", generee ou alteree. Demande
  faite a Alfred de fournir une photo source non filtree.

QUATRE AUTRES PHOTOS TROUVEES A LA RACINE (EXIF iPhone 13 Pro, donc
REELLES, pas generees) — AUCUNE UTILISEE :
  1. Robot/Arduino sur un bureau avec IDE Arduino a l'ecran — sans rapport
     avec les trois projets autorises (Baby Tourism, Alfred Fitness,
     Alfred AI Trader).
  2. Graphique crypto sur laptop + une main/avant-bras non identifiable —
     impossible de confirmer qu'il s'agit d'Alfred ou d'une activite AWS.
  3. Chantier avec un materiel de topographie (Nikon, Carlson Surveyor2)
     de style nord-americain — tres probablement PAS un chantier a
     Abidjan ; l'utiliser risquerait exactement l'interdiction "chantier
     stock presente comme realisation AWS".
  4. Bureau de trading avec graphiques NSE (bourse indienne), imagerie
     religieuse hindoue et une citation d'un compte Instagram tiers
     (@coachsnehdesai) — sans aucun rapport avec Alfred ou AWS.
  Ces quatre fichiers restent a la racine, non suivis, non utilises.
  Signale a Alfred pour clarification/nettoyage.

QUI SOMMES-NOUS (Apropos.tsx)
  Traitement typographique pur, decision assumee : les deux seules images
  validees (marches financiers, chantier) servent deja le Hero et Nos
  expertises — les reutiliser ici les aurait diluees a chaque reprise.
  Texte repris du cahier des charges quasi verbatim (deux paragraphes).

NOS EXPERTISES (Expertises.tsx) — coeur commercial
  Alternance texte/image d'un pole a l'autre (discipline ACIM etudiee sur
  leur page "solutions"), ancres #bourse-finance / #immobilier /
  #software-ia EXACTEMENT celles deja attendues par le menu deroulant de
  la navbar (verifie dans Navbar.tsx avant d'ecrire le code).
  INVESTIR  : image finance-markets.jpg (deja utilisee dans le Hero) +
              phrase de precision explicite ("ne constituent ni un
              conseil en investissement reglemente, ni une gestion de
              portefeuille, ni une promesse de rendement").
  CONSTRUIRE: image real-estate.jpg (deja utilisee dans le Hero).
  INNOVER   : aucune photo de developpement validee -> pictogramme "puce"
              repris de Notre approche (rappel volontaire, pas une redite :
              plusieurs sections plus loin, pas juste apres).

PROJETS & REALISATIONS (Projets.tsx)
  Aucune capture ecran disponible pour aucun des trois projets -> texte
  seul (nom, categorie, statut EXACT autorise mot pour mot, description
  factuelle). Pas de cadre gris vide qui lirait comme un asset casse.
  Alfred AI Trader : aucune mention de taux de reussite, profit,
  rendement ou performance — uniquement "prototype interne, IA, analyse
  des marches, environnement DEMO", conforme a l'interdiction explicite.

VISION (Vision.tsx)
  Seule section avec le Hero a utiliser bg-aws-hero (bleu profond) :
  respiration corporate au milieu d'une page blanche/off-white. Aucune
  nouvelle couleur. Pas de photo d'Abidjan validee -> typographie pure,
  explicitement autorisee par le cahier des charges pour cette section.

FONDATEUR (Fondateur.tsx)
  PAS DE PHOTO (voir bloqueur ci-dessus). Bio reprise telle que fournie,
  aucun diplome/certification/annee d'experience ajoute. Mise en page en
  une colonne texte, pensee pour recevoir une image plus tard (colonne
  desk:flex-row a ajouter) sans reconstruction.

CTA FINAL (CtaFinal.tsx)
  "Un projet a construire ? Parlons-en." — espace INSECABLE (U+00A0)
  avant le "?", regle typographique francaise ET fonctionnelle : sans
  elle, le titre se coupait avec un "?" orpheline en debut de ligne a la
  largeur du titre.

CONTACT (Contact.tsx) — "use client", seul composant interactif de la vague
  Formulaire SANS backend : construit un mailto: avec sujet/corps
  pre-remplis et declenche un <a> cree en memoire (.click()), pas une
  affectation window.location.href — cette derniere declenche la regle
  ESLint no-location-assign-relative-destination (suppose une navigation
  interne Next.js). Corrige, verifie : 0 warning apres correction.

  TESTE REELLEMENT (pas suppose) : frappe clavier reelle via l'outil
  navigateur, formulaire rempli (nom, entreprise, message), soumis, et
  mailto: intercepte pour verification -> corps correctement construit,
  Entreprise incluse SEULEMENT quand renseignee (verifie dans les deux
  etats), encodage URI correct. Une tentative initiale de simulation par
  injection DOM (assignation .value + dispatchEvent) a echoue a mettre a
  jour l'etat React — limite connue de ce type de simulation, pas un bug
  du formulaire ; confirme en repetant avec de vraies frappes clavier.

  Lien Maps : recherche textuelle Google Maps (pas une fiche Google
  Business verifiee) — le libelle le dit explicitement ("emplacement AWS
  a confirmer"), conformement a l'interdiction de pretendre qu'un
  marqueur correspond a une fiche validee.

  WhatsApp : non active. Le numero n'a pas ete confirme comme etant un
  numero WhatsApp — seul un lien tel: est propose.

FOOTER (Footer.tsx, dans layout.tsx — apparait sur toutes les pages)
  Reseaux sociaux : structure prete (LinkedIn/Instagram/Facebook) mais
  URLs VIDES tant qu'aucune n'est confirmee. Le composant n'affiche un
  reseau QUE si son href est non vide — jamais de href="#".
  Liens d'ancrage (#a-propos, #projets, #contact, #<pole>) prefixes par
  /${locale} : ils fonctionnent aussi depuis les pages legales, pas
  seulement depuis l'accueil.
  BUG TROUVE ET CORRIGE : l'en-tete de la colonne navigation reutilisait
  nav.nav.home ("Accueil"), donc affichait "ACCUEIL" juste au-dessus du
  lien "Accueil" — redondant. Nouveau champ dedie footer.navigationNav
  ("Navigation").
  Mentions legales : SARLU, capital 1 000 000 F CFA, RCCM
  CI-ABJ-03-2025-B13-07068 — aucun identifiant non confirme ajoute.

MENTIONS LEGALES / CONFIDENTIALITE (LegalPage.tsx + 2 routes)
  /[locale]/mentions-legales et /[locale]/confidentialite, meme slug
  dans les deux langues (simplification assumee pour cette V1 — les
  URLs profondes restent stables, seul le contenu change de langue).
  Hebergeur : "information en attente de confirmation" — pas invente.
  Confidentialite : decrit le fonctionnement REEL du site (aucun cookie
  de suivi, aucun outil d'analyse, formulaire = mailto: cote client,
  aucune donnee envoyee a un serveur).

SEO (travail de l'autre session, verifie et integre)
  src/lib/seo.ts : indexation desactivee par defaut (isIndexable = false
  tant qu'un domaine officiel + plusieurs variables d'environnement ne
  sont pas positionnees) — un site pas encore en ligne ne doit pas etre
  indexe par accident. robots.txt et sitemap.xml suivent la meme regle.
  JSON-LD Organization avec les informations confirmees uniquement.

QA RESPONSIVE — 375, 430, 768, 820, 1024, 1280, 1440
  0 debordement horizontal a chaque largeur. Les 7 ancres de section
  (#a-propos, #expertises, #bourse-finance, #immobilier, #software-ia,
  #projets, #contact) presentes a chaque largeur. Navbar operationnelle
  partout.

NON-REGRESSION — mesuree
  Navbar 81px, Hero 596px (FR) / 580px (EN, ecart du a la longueur du
  texte anglais, prexistant, pas du a cette session), Notre approche
  592px, Notre methode 923px (FR et EN identiques) — tous identiques aux
  valeurs de reference d'avant cette mission.
  git diff sur Navbar.tsx, Hero.tsx, HeroMedia.tsx, Approach.tsx,
  Method.tsx : VIDE.

TESTS
  lint    PASS  26 fichiers analyses, 0 erreur, 0 warning (verifie apres
                correction du warning ESLint sur le mailto:)
  tsc     PASS  0 erreur
  build   PASS  11 routes generees : /fr, /en, /fr(+en)/confidentialite,
                /fr(+en)/mentions-legales, /robots.txt, /sitemap.xml,
                toutes SSG sauf le proxy (middleware)
  console PASS  vide en FR et en EN, sur toutes les pages testees

BLOCKERS EXPLICITES POUR ALFRED
  1. Photo du fondateur : la premiere fournie a ete refusee (traits d'IA) ;
     une photo source non filtree est necessaire.
  2. Captures d'ecran des trois projets (Baby Tourism, Alfred Fitness,
     Alfred AI Trader) : aucune disponible actuellement.
  3. Photo de developpement/code pour le pole Innover (optionnelle,
     amelioration possible) : aucune disponible.
  4. Quatre photos trouvees a la racine (voir plus haut) : provenance et
     usage prevu a clarifier — non utilisees.
  5. URLs reelles LinkedIn/Instagram/Facebook : aucune fournie.
  6. Confirmation que le numero de telephone est joignable sur WhatsApp.
  7. URL Google Maps officielle / fiche Google Business verifiee.
  8. Identite de l'hebergeur (pour les mentions legales, avant mise en
     ligne definitive).
  9. Decision sur un envoi cote serveur du formulaire de contact
     (prestataire type Resend/Formspree) si le mailto: cote client ne
     suffit pas a terme.

PAS DE COMMIT FINAL. En attente de la revue complete d'Alfred.

==========================================================================
V2 — DIRECTION ARTISTIQUE + POLISH PREMIUM
==========================================================================

DIAGNOSTIC AVANT/APRES
  Qui sommes-nous  : trop vide, aucune photo        -> texte+image, photo Pexels
  Nos expertises   : backgrounds uniformes, CTA faible -> cartes bordees, CTA renforce, capacites Innover
  Innover          : rectangle bleu + pictogramme (placeholder assume) -> vraie photo de developpement
  Projets          : trois colonnes de texte          -> ProjectCard (media abstrait + badge + description)
  Vision           : aplat bleu plat                  -> degrade (memes tokens que le Hero), titre extrabold
  Fondateur        : grand vide sans photo             -> composition finale a 2 colonnes, media slot honnete
  CTA final        : trop simple                      -> ligne complementaire + bouton du systeme partage
  Contact          : administratif                    -> carte info avec pictogrammes, champs off-white
  Footer           : blanc, trop faible                -> navy (aws-navy), ferme vraiment le parcours

ASSETS SOURCES (voir ASSETS_SOURCES.md pour le detail complet)
  qui-sommes-nous.jpg  Pexels, Mikhail Nilov, licence Pexels (gratuite,
                       usage commercial, sans attribution obligatoire)
  software-ia.jpg      Pexels, Mizuno K, meme licence
  Regle appliquee : jamais de hotlink Pinterest — recherche sur Pexels
  (source de licence claire), telechargement local, alt text neutre,
  aucune mention d'AWS/employe/client sur des photos qui n'en montrent pas.

SYSTEME DE BOUTONS (src/components/ui/boutons.tsx)
  Trois variantes (primaire, secondaire, lien texte) x deux tons (sur
  fond clair, sur fond fonce) = 5 constantes + une fleche partagee.
  Avant cette passe, chaque section avait sa propre variante bricolee.
  Tous les nouveaux CTA (Expertises, CTA final, Contact) utilisent
  desormais ce systeme unique. Hero et Navbar restent inchanges (verrouilles,
  deja visuellement identiques a ce systeme — aucun besoin reel de les
  toucher).

BUG TROUVE ET CORRIGE EN COURS DE ROUTE — LOGO FOOTER
  Premiere tentative : wordmark passe en blanc via `brightness-0 invert`.
  Resultat mesure (pixel du fichier PNG) : fond (254,254,254) OPAQUE,
  pas de canal alpha. brightness-0 ecrase tout (fond ET texte) en noir,
  invert transforme ce noir uniforme en un rectangle BLANC PLEIN —
  verifie visuellement (capture d'ecran) avant de corriger. Solution
  retenue : une puce blanche arrondie porte le logo INTACT plutot que de
  le transformer — jamais de modification d'un asset de marque valide.

RYTHME DES SURFACES (site complet)
  Hero(bleu dégradé) -> Approche(blanc) -> Methode(off-white) ->
  Apropos(blanc) -> Expertises(off-white) -> Projets(blanc) ->
  Vision(bleu degrade, rupture) -> Fondateur(blanc) -> CTA(off-white) ->
  Contact(blanc) -> Footer(navy).
  Un seul bleu de rupture (Vision), un seul navy (Footer) : pas
  d'alternance mecanique blanc/bleu/blanc/bleu.

QA RESPONSIVE — 375, 430, 768, 820, 1024, 1280, 1440
  0 debordement horizontal a chaque largeur, navbar et footer presents
  partout, 8 ancres de section trouvees a chaque largeur.

NON-REGRESSION — mesuree
  Navbar 81px, Hero 596px, Notre approche 592px, Notre methode 948px —
  tous identiques aux valeurs de reference. git diff sur Navbar.tsx,
  Hero.tsx, HeroMedia.tsx, Approach.tsx, Method.tsx : VIDE.

FR / EN
  EN verifie : hierarchie 1×h1/9×h2/13×h3, console vide, 0 debordement,
  hauteur totale coherente avec le FR (8082 vs 8131 a 1280, ecart normal
  du a la longueur du texte anglais).

ACCESSIBILITE
  Tous les alt text audites : neutres, aucune mention d'AWS/employe/client
  sur une photo qui n'en montre pas. Focus visible sur tous les nouveaux
  boutons et champs de formulaire (memes classes focus-visible partout).

TESTS
  lint    PASS  27 fichiers analyses, 0 erreur, 0 warning
  tsc     PASS  0 erreur
  build   PASS  11 routes generees, toutes SSG
  console PASS  vide en FR et en EN

PENDING (inchange depuis le rapport precedent)
  - photo originale du fondateur (deux versions refusees, traits d'IA)
  - captures Baby Tourism, Alfred Fitness, Alfred AI Trader
  - URLs reelles LinkedIn/Instagram/Facebook
  - confirmation WhatsApp du numero
  - fiche Google Business / URL Maps officielle
  - identite de l'hebergeur
  - decision sur un envoi serveur du formulaire de contact

PAS DE COMMIT. En attente de la revue visuelle premium d'Alfred.

==========================================================================
QUI SOMMES-NOUS — REPRISE CIBLEE (image + composition)
==========================================================================

DEMANDE : uniquement cette section, image plus coherente (infrastructure/
machines, humains secondaires ou absents), composition plus premium.

IMAGE — deux candidats ecartes avant le bon choix
  1. Photo initiale (discussion d'equipe, Mikhail Nilov) : correcte mais
     trop "reunion humaine generique" au regard de la nouvelle demande.
  2. Candidat de remplacement (Christina Morillo, "Engineer Holding
     Laptop") : bonne composition (infrastructure + humain secondaire),
     mais SES METADONNEES EXIF CONTREDISENT SA LICENCE — mention
     "© Mike Ngo Photography. All Rights Reserved." incrustee dans le
     fichier alors que la page Pexels l'attribue a Christina Morillo sous
     licence gratuite. Verifie via `file`, ecarte par prudence plutot
     qu'utilise avec un doute sur les droits reels.
  3. Retenu : couloir de baies serveurs (Brett Sayles, Pexels, licence
     gratuite, metadonnees coherentes, 3.4M vues/35K telechargements —
     asset bien etabli). Infrastructure pure, aucun humain, aucun cliche
     "neon bleu IA".

COMPOSITION
  Ratio texte/image ajuste de 45/55 a 42/58 : l'image, plus forte
  editorialement, porte legerement plus de poids qu'en V2.
  Tick d'accent (40x2, bleu) ajoute au-dessus de l'eyebrow : reprend le
  meme langage que Notre approche, la section rejoint le systeme visuel
  du site plutot que de rester un bloc isole.
  Cadre image : filet 1px (aws-line) au lieu d'un cadre nu — "pose avec
  soin", pas d'ombre.
  Respiration augmentee : gap 14->16 (desktop), espace entre paragraphes
  4->5.

BUG TROUVE ET CORRIGE — ALT TEXT CODE EN DUR
  Le nouvel alt text avait ete ecrit directement en francais dans le
  composant plutot que via le dictionnaire : la version EN affichait donc
  un alt text francais. Corrige par l'ajout de dict.apropos.imageAlt
  (FR + EN), verifie sur les deux locales apres correction.

DEFI TECHNIQUE — CACHE DE L'OPTIMISEUR D'IMAGES NEXT.JS
  Apres remplacement du fichier, plusieurs verifications successives
  (capture d'ecran, rechargement force) continuaient d'afficher l'ANCIENNE
  image. Diagnostic par elimination :
    - fichier statique sur disque : correct (verifie par hash/taille)
    - reponse brute du endpoint _next/image via fetch({cache:'no-store'}) :
      correcte (x-nextjs-cache: MISS, pixels decodes = nouvelle image)
    - rendu reel du <img> dans le navigateur de test : encore l'ancienne,
      meme apres Cmd+Shift+R
  Conclusion : artefact du cache HTTP propre a la session de test
  (persistant meme apres rechargement force dans cet environnement),
  PAS un bug du site. Confirme en remplacant temporairement le <img> par
  un blob fraichement recupere : rendu correct immediatement. Un vrai
  visiteur, sans cache prealable sur cette URL precise, recoit la bonne
  image des le premier chargement — verifie par ailleurs via une
  navigation avec parametre de requete different (contourne le cache
  navigateur), correcte en desktop, mobile et EN.

TESTS
  lint PASS (27 fichiers, 0 erreur, 0 warning) / tsc PASS / console vide
  FR + EN, desktop + mobile.

PAS DE COMMIT. En attente de validation.

==========================================================================
V3 — STRUCTURE EDITORIALE, SUR REFERENCE ACIM
==========================================================================

QUI SOMMES-NOUS — nouvelle image
  Remplacee a nouveau : la photo precedente (couloir de serveurs) etait
  correcte techniquement mais pas specifiquement africaine. Nouvelle
  image : ligne de production automatisee (bouteilles en verre), Dar es
  Salaam, Tanzanie (geolocalisation confirmee par Pexels) — aucun visage,
  contexte industriel africain reel. Deux candidats ecartes avant celui-
  ci : un montrant une marque tierce lisible sur un emballage ("KIOO
  LIMITED" — risque de confusion d'affiliation), l'autre deja documente
  precedemment (conflit de metadonnees EXIF). Voir ASSETS_SOURCES.md.

INNOVER — nouvelle image
  Remplacee : l'ancienne photo (vue en plongee sur une epaule) etait
  correcte mais pas assez centree sur "mains + clavier + code" comme
  demande. Nouvelle image : cadrage serre sur des mains a la peau foncee
  tapant sur un clavier, code syntaxiquement colore visible a l'ecran,
  aucun visage. Source Pexels (TREEDEO.ST), verifiee.

EXPERTISES — raffinement (direction et alternance texte/image conservees)
  1. Accent par pilier : filet gauche de 4px, une teinte par pole, toutes
     issues des tokens EXISTANTS (aucune nouvelle couleur) :
       01 INVESTIR   aws-navy       (profond, serieux financier)
       02 CONSTRUIRE aws-muted      (bleu-gris sourd, mineral/neutre chaud)
       03 INNOVER    aws-blue-text  (clair, technologique/froid)
  2. Capacites Innover : pills arrondies -> ligne editoriale a points
     medians ("Sites web professionnels · Applications web · ..."),
     discipline plus proche des listes de technologies observees chez
     ACIM sous leurs cartes, sans en reprendre le style visuel.
  Photos Investir (finance-markets.jpg) et Construire (real-estate.jpg) :
  INCHANGEES, comme demande explicitement.

PROJETS & REALISATIONS — changement de direction assume
  Les grandes ProjectCards bleues (V2) jugees disproportionnees par
  rapport a l'importance actuelle des projets -> remplacees par une
  liste editoriale compacte : numero, nom + categorie, description,
  puce de statut, fleche discrete. Meme discipline que Notre methode
  plus haut sur la page. Hauteur de la section reduite en consequence.
  Contenu inchange : Baby Tourism (demonstrateur digital), Alfred
  Fitness (demonstrateur Front-End), Alfred AI Trader (prototype
  interne, environnement DEMO) — aucun statut transforme en "realisation
  client", aucune performance financiere mentionnee.

CONTACT — retire de la homepage, integre au Footer
  Le gros formulaire dedie (V2) etait juge "trop administratif" et
  disproportionne. Sur demande explicite : Contact.tsx N'EST PLUS RENDU
  sur la page d'accueil, mais reste intact et fonctionnel (formulaire
  mailto:, aucune donnee inventee) pour un usage futur — option B du
  cahier des charges ("conserver le composant non rendu"). Les
  informations de contact (adresse, telephone, email) vivent desormais
  dans le Footer, avec pictogrammes coherents (lieu/telephone/email,
  memes traits que le reste du site — factorises dans
  src/components/ui/icones.tsx pour eviter la duplication entre
  Contact.tsx et Footer.tsx).
  Le bouton "Contact" de la Navbar (verrouillee) pointait deja vers
  #contact : c'est desormais le <footer id="contact"> qui porte l'ancre,
  aucune modification de la Navbar necessaire.

FOOTER — restructuration en 4 colonnes (esprit ACIM, identite AWS)
  Colonne 1 : marque (logo sur puce blanche + signature)
  Colonne 2 : Navigation (Accueil / A propos / Nos services / Projets)
  Colonne 3 : Nos univers (les 3 poles, ancres vers leurs sections)
  Colonne 4 : Nos contacts (adresse+lien Maps, telephone, email, avec
              pictogrammes) + Suivez-nous (reseaux, uniquement si une
              URL reelle existe)
  Bandeau bas : raison sociale + forme juridique + RCCM, puis les liens
  Mentions legales / Confidentialite (deplaces depuis leur propre
  colonne — ce sont des liens utilitaires de bas de page, pas une
  rubrique de navigation a part entiere), puis le copyright.
  Fond navy (aws-navy, deja utilise pour le CTA de la navbar) conserve
  de la passe precedente : aucune nouvelle couleur.

VISION — inchangee (conservee sur demande explicite, deja "correcte").
FONDATEUR — inchange (media slot toujours en attente de la vraie photo,
  aucune image stock, aucune generation).
CTA FINAL — inchange (deja simple, deja harmonise avec le systeme de
  boutons partage).

DEFAUT DE FRAPPE TROUVE ET CORRIGE — Contact.tsx
  En factorisant les pictogrammes vers src/components/ui/icones.tsx, une
  premiere edition intermediaire a laisse une declaration IconeEmail en
  double dans Contact.tsx. Un console.error de compilation Turbopack a
  ete observe dans le navigateur — verifie contre les logs SERVEUR (qui
  ne montraient aucune erreur, uniquement des 200) : le message affiche
  etait un residu de l'etat intermediaire, deja corrige au moment de la
  verification. Le fichier final ne contient plus qu'un seul import
  partage, verifie par tsc (0 erreur) et par le rendu reel de la page.

QA RESPONSIVE — 375, 430, 768, 820, 1024, 1280, 1440
  0 debordement a chaque largeur. Hauteur totale de la page reduite de
  ~8243 a 7596px a 1440 (suppression du gros Contact + des grandes
  ProjectCards) : la page est plus compacte, comme demande.

NON-REGRESSION — mesuree
  Navbar 81px, Hero 596px, Notre approche 592px, Notre methode 948px —
  identiques aux valeurs de reference. git diff sur Navbar.tsx, Hero.tsx,
  HeroMedia.tsx, Approach.tsx, Method.tsx : VIDE.

FR / EN
  EN verifie : hierarchie 1×h1, console vide, 0 debordement, hauteur
  coherente avec le FR (7436 vs 7499 a 1280, ecart normal du a la
  longueur du texte anglais).

TESTS
  lint    PASS  28 fichiers analyses, 0 erreur, 0 warning
  tsc     PASS  0 erreur
  build   PASS  11 routes generees, toutes SSG
  console PASS  vide en FR et en EN (verifie sur une session navigateur
                fraiche, apres avoir ecarte un message de compilation
                perime)

PENDING (inchange)
  - photo originale du fondateur
  - captures Baby Tourism, Alfred Fitness, Alfred AI Trader
  - URLs reelles LinkedIn/Instagram/Facebook
  - confirmation WhatsApp du numero
  - fiche Google Business / URL Maps officielle
  - identite de l'hebergeur
  - decision sur un envoi serveur du formulaire de contact (si reactive
    un jour sur une page /contact dediee)

PAS DE COMMIT. En attente de la revue structurelle d'Alfred.


================================================================================
PASSE PREMIUM V3 — PALETTE, MICRO-INTERACTIONS, CONCEPTS VS REALISATIONS
================================================================================

MOI COMPRIS DEMANDE
  Site deja juste. Manque : chaleur dans la palette, vie au survol,
  respiration au defilement, et une distinction HONNETE entre ce qui
  existe vraiment et ce qui est encore une idee.

PALETTE — UN SEUL TOKEN AJOUTE, PAS UNE NOUVELLE MARQUE
  --color-aws-sand #eee5d4, neutre chaud pour l'univers CONSTRUIRE.
  Marque DECORATIF UNIQUEMENT dans le CSS, avec la raison ecrite : sur
  cette teinte, aws-blue-text retombe sous le seuil AA (4.5) des qu'on
  la rechauffe assez pour qu'elle se distingue vraiment. Calcule AVANT
  de choisir la contrainte, pas apres avoir pose un texte illisible.
  Les trois univers se distinguent donc par le fond et l'accent de
  bordure (navy / sand / bleu), jamais par la couleur d'un texte.

MICRO-INTERACTIONS
  - images : scale 1.03 au survol, duree 700ms, courbe douce
  - boutons et liens : fleche qui avance de 2px (systeme partage)
  - TOUT porte motion-reduce:* — si la personne a desactive les
    animations dans son systeme, il ne reste RIEN qui bouge.

REVEAL AU DEFILEMENT — EN CSS PUR, ZERO JAVASCRIPT
  animation-timeline: view(), enferme dans
  @media (prefers-reduced-motion: no-preference) + @supports.
  Raison du choix : un IntersectionObserver aurait exige un Client
  Component par section ET aurait laisse le contenu invisible si
  l'hydratation echoue. Ici, navigateur qui ne supporte pas -> aucune
  regle ne s'applique -> contenu visible immediatement. La degradation
  est structurelle, pas une rustine.

  DEUX BUGS REELS TROUVES ET CORRIGES SUR CE SYSTEME :

  1. animation-range melangeait deux reperes (entry 0% -> cover 30%).
     Symptome mesure : une section deja a opacite 1 ALORS QU'ELLE ETAIT
     ENCORE SOUS LE VIEWPORT. Corrige en restant sur un seul repere :
     entry 0% entry 45%. Verifie sur les 16 elements .reveal.

  2. overflow-hidden sur la <section> Vision faussait le calcul de sa
     propre view-timeline. Je l'ai retire -> l'animation est repartie,
     MAIS le halo decoratif (56rem de large, centre) n'etait plus
     clippe et rendait la page horizontalement scrollable a 768 et 820
     (scrollWidth 832 pour clientWidth 768 — le chiffre correspondait
     EXACTEMENT au bord droit du halo, donc aucun doute sur le
     coupable). Correction : le halo est clippe par SON PROPRE
     conteneur, frere du contenu anime et non ancetre. Les deux
     problemes tombent ensemble.

  LECON : une correction peut en creer une autre. C'est la mesure a
  toutes les largeurs qui l'a attrapee, pas la relecture du code.

PROJETS — SEPARATION HONNETE (le point le plus important de la passe)
  BLOC 1  Realisations : lignes numerotees, fond blanc. Uniquement ce
          qui existe vraiment.
  BLOC 2  "SOLUTIONS EN DEVELOPPEMENT", sur fond off-white pour que la
          rupture se voie. Intro explicite : "Des directions a l'etude
          pour chacun des trois univers — PAS ENCORE LIVREES."
          Trois cartes, une par univers, chacune portant une pastille
          CONCEPT :
            - Tableau de bord multi-actifs
            - Suivi de projets immobiliers
            - Assistant IA metier
  Aucun client, aucune date, aucun chiffre, aucune promesse de
  livraison. Un visiteur ne peut pas confondre les deux blocs.

FOOTER
  Filet superieur en degrade (s'estompe aux deux bords) au lieu d'une
  bordure plate. 4 colonnes. Contrastes recalcules sur le navy :
  blanc/85 = 11.25, blanc/75 = 9.00, blanc/55 = 5.44 — tous au-dessus
  du seuil.

QA RESPONSIVE — 375, 430, 768, 820, 1024, 1280, 1440
  0 debordement partout APRES correction (768 et 820 debordaient avant,
  voir bug 2). 0 ancre cassee sur les 7 ancres internes. Nav et Footer
  presents a chaque largeur.

FR / EN
  EN : lang="en", 8 titres h2 tous traduits, 0 residu francais sur une
  liste de controle, 16 .reveal, 3 pastilles Concept, 0 ancre cassee.

TESTS
  lint    PASS  28 fichiers analyses (verifie en JSON, pas cru sur
                parole : un lint muet doit prouver qu'il a lu quelque
                chose), 0 erreur, 0 warning
  tsc     PASS  0 erreur
  build   PASS  11 routes, FR + EN + pages legales + robots + sitemap
  console PASS  vide

IMAGES
  AUCUNE nouvelle image sur cette passe. Les deux photos validees
  restent en place. Le slot du fondateur reste un aplat neutre : tant
  que la photo originale n'est pas arrivee, aucune forme humaine n'est
  suggeree.

PENDING ALFRED (inchange)
  - photo originale du fondateur, non filtree
  - captures d'ecran des projets (16:10)
  - URLs reelles LinkedIn / Instagram / Facebook
  - confirmation WhatsApp du numero
  - fiche Google Business / URL Maps officielle
  - identite de l'hebergeur (mentions legales)
  - decision sur l'envoi serveur du formulaire de contact
  - sort des 5 .jpg a la racine du depot (jamais commites)

PAS DE COMMIT. En attente de la revue visuelle d'Alfred.


================================================================================
CORRECTION PREMIUM GLOBALE — ACIM AUDIT, CACHE BUG, WHATSAPP, STATUTS PROJETS
================================================================================

DEMANDE
  Alfred a signale que les deux images rejetees (reunion d'equipe pour
  Qui sommes-nous, personne non-africaine pour Software IA) etaient
  TOUJOURS visibles. Plus : palette trop blanche, Vision plate,
  Projets a enrichir avec statuts explicites, WhatsApp flottant, footer
  premium, comparaison avec ACIM.

ACIM AUDITE — analyse structurelle (texte, pas pixel-perfect : les
  scripts/images du site sont bloques par le navigateur d'auto — get_page_text
  a suffi). Enseignements retenus, jamais copies : alternance de surface
  par bloc, liste de "capacites" sous chaque carte (deja fait cote AWS),
  produits nommes avec un statut clair (transpose aux nouveaux concepts).

ENQUETE SUR LES DEUX IMAGES — LE VRAI BUG TROUVE
  1. Lecture directe des fichiers sur disque : les deux images etaient
     DEJA les bonnes (bouteilles industrielles, mains sur clavier).
  2. Requete serveur fraiche (cache:no-store) vers le fichier ET vers
     /_next/image : toujours les bons octets, x-nextjs-cache: MISS.
  3. Le <img> rendu dans la page, lui, peignait l'ANCIENNE image —
     meme apres un changement de parametre d'URL cote client.
  4. Preuve definitive : remplacer le src par un blob genere depuis un
     fetch non-cache a fait apparaitre la bonne image INSTANTANEMENT.
  -> Un cache HTTP retenait une reponse perimee sur le CHEMIN de fichier
     exact, independamment du contenu reel. Les deux images ont ete
     remplacees plusieurs fois SANS jamais changer de nom de fichier :
     un navigateur qui a visite le site tot dans le projet (le notre
     pendant les tests, tres probablement aussi celui d'Alfred) a garde
     en cache la toute premiere version indefiniment.
  CORRECTION : renommage (pas remplacement de contenu, deja bon) —
    qui-sommes-nous.jpg -> qui-sommes-nous-v3.jpg
    software-ia.jpg -> software-ia-v3.jpg
  Un nom de fichier inedit ne peut pas etre servi depuis un vieux cache :
  verifie dans un ONGLET NEUF, sans aucune manipulation, les deux bonnes
  images s'affichent desormais par defaut. Documente dans ASSETS_SOURCES.md.

PALETTE — MESURE AVANT CHANGEMENT
  Calcul WCAG : aws-surface (#fdfcfa) n'est qu'a 2-5 unites RGB du blanc
  pur — invisible a l'oeil. C'est la cause reelle du ressenti "trop
  blanc", pas un manque de tokens. Le token n'a pas ete touche partout
  (utilise ailleurs avec un texte bleu deja a la limite AA) mais :
  - CtaFinal : aws-surface -> aws-sand (aucun texte en bleu-lien dans
    cette section, verifie avant le changement : titre en aws-hero,
    sous-titre en ink/70 a 4.94 de contraste sur sable, AA passe).
  - Fondateur : le slot media neutre passe egalement au sable (aucun
    texte dessus, zero risque).
  - Expertises : les trois fonds d'image passent de gris neutre uniforme
    a trois teintes distinctes (navy tres discret / sable / bleu tres
    discret), purement decoratives, pour que Investir/Construire/Innover
    aient chacun leur atmosphere sans nouvelle couleur.

VISION — accent chaud discret
  Second halo radial, sable a 4% d'opacite, sous le titre — l'UNIQUE
  accent chaud de la section. Eyebrow encadre de deux tirets fins.

PROJETS & SOLUTIONS EN DEVELOPPEMENT
  Les trois projets reels (Baby Tourism, Alfred Fitness, Alfred AI
  Trader) correspondaient deja exactement au cahier des charges.
  Nouveaute : les trois concepts ont maintenant un STATUT DIFFERENCIE
  (plus un "Concept" repete trois fois) :
    Tableau de bord multi-actifs      -> En developpement
    Suivi de projets immobiliers      -> En structuration
    Assistant IA metier               -> En developpement
  Chaque carte affiche aussi son secteur (Finance & Technologie, etc.).
  Hover ajoute sur les lignes de projets ET les cartes concepts : fond
  qui se teinte, numero qui s'accentue, titre et fleche qui glissent —
  le meme langage que les boutons, applique a une liste.

WHATSAPP FLOTTANT
  Nouveau composant WhatsappFlottant.tsx, rendu dans le layout (donc sur
  TOUTES les pages, pas juste la home). Icone seule (48px, cible tactile
  conforme), jamais de texte permanent. Message pre-rempli FR/EN via
  wa.me, aria-label explicite, focus-visible, rel=noopener. Verifie :
  n'entre en collision avec aucun lien ni bouton a aucun des 7 breakpoints.

TESTS
  lint    PASS  29 fichiers analyses (WhatsappFlottant.tsx inclus), 0/0
  tsc     PASS  0 erreur
  build   PASS  11 routes
  console PASS  vide
  FR/EN   PASS  0 residu francais en EN, statuts et categories traduits
  responsive PASS 375/430/768/820/1024/1280/1440 — 0 debordement

PAS DE COMMIT. En attente de la revue visuelle d'Alfred.


================================================================================
PASSE "COHERENCE VISUELLE, EDITORIALE ET PRODUCTION" — ACIM AUDIT, IMAGES,
FUSION PROJETS/SOLUTIONS, FOOTER COMPACT, VISION DIFFERENCIEE, CONTRASTE
================================================================================

ACIM AUDITE — texte uniquement (assets bloques par le navigateur d'auto),
  suffisant pour la comparaison structurelle demandee : rythme editorial,
  cartes avec liste de "technologies"/"capacites", produits nommes avec
  un statut clair, footer structure. Rien copie — transpose au langage
  AWS deja en place.

TROIS DOUBLONS D'IMAGES CORRIGES — recherche menee, plusieurs candidats
  evalues et REJETES avant chaque choix final (voir ASSETS_SOURCES.md
  pour le detail complet, tres important pour la tracabilite) :

  QUI SOMMES-NOUS — l'image de bouteilles ne correspondait pas au texte
  ("capital, actifs, technologie, structuration"). Nouvelle photo :
  echangeur autoroutier moderne a Abidjan (Pexels, Silvere Meya, lieu
  confirme). Recadree pour EXCLURE une enseigne "HYUNDAI" lisible
  presente dans le cadrage large d'origine.

  INVESTIR — dupliquait l'image du Hero. Nouvelle photo : mains a la
  peau foncee consultant des documents/graphiques financiers (Pexels,
  Tima Miroshnichenko). Recadree pour exclure deux occurrences du logo
  logiciel tiers "Qlik" visibles dans le cadrage original.
  Candidats ecartes avant ce choix : plusieurs photos "trader
  multi-ecrans" credit "AlphaTradeZone" / legende "Cryptocurrency market
  analysis" — trop pres du cliche crypto explicitement interdit.

  CONSTRUIRE — dupliquait l'image du Hero. Nouvelle photo : immeuble
  moderne en developpement, grue de chantier, a Abidjan (Pexels, Jean
  Marc Bonnel, lieu confirme). Recadree pour exclure le logo "BNI"
  (banque ivoirienne reelle) tres visible au sommet de la tour la plus
  en vue du cadrage original — disqualifiant (marque tierce reelle,
  risque de laisser croire a un partenariat inexistant).
  Candidats ecartes avant ce choix : un ouvrier a Kaduna, Nigeria (tags
  Pexels "Child Labor/Child Labour" — ecarte par precaution absolue) ;
  un ouvrier a Kampala, Ouganda (deux enseignes commerciales lisibles en
  arriere-plan, "MISS SHEE STUDIO" et "CRSC").

  SOFTWARE & IA — reverifiee contre les criteres du present brief :
  toujours conforme (identite africaine credible, mains + clavier +
  code, aucun cliche). CONSERVEE, aucun remplacement.

SERVICES/PROJETS — UNE SEULE COMPOSITION, sur demande explicite
  Le bloc separe "Solutions en developpement" (qui semblait "ajoute
  apres coup") est SUPPRIME. Les 3 demonstrateurs reels et les 3
  solutions en developpement vivent desormais dans UNE MEME liste
  numerotee (01-06), catalogue editorial : numero, titre, secteur,
  description, statut, fleche. Le statut de chaque ligne (factuel pour
  les 3 premieres, "En developpement"/"En structuration" pour les 3
  suivantes) est l'UNIQUE mecanisme de distinction — jamais confondu,
  jamais silencieux.

  Chaque pole d'Expertises porte desormais un encart discret "SOLUTION
  ASSOCIEE" (pictogramme + nom + statut, PAS une deuxieme carte) qui
  reprend mot pour mot l'entree correspondante de Projets & Realisations
  — une seule source de verite editoriale.

FOOTER — COMPACTE, sur demande explicite
  Colonne "Navigation" (Accueil/A propos/Nos services/Projets) et
  colonne "Nos univers" SUPPRIMEES — deja assurees par la Navbar. Trois
  zones seulement : Marque / Contact (adresse, telephone, email,
  WhatsApp) / Reseaux+Legal. Bandeau du bas en une seule colonne alignee
  a gauche (pas de justify-between) — raison mesuree : a justify-between,
  le copyright finissait pousse jusque sous le bouton WhatsApp flottant
  a certaines largeurs desktop (verifie a l'ecran, corrige).

  "emplacement AWS a confirmer" et le faux lien Google Maps SUPPRIMES
  du Footer ET de Contact.tsx (dictionnaire nettoye des deux langues) :
  l'adresse reste un texte simple tant qu'aucune fiche Google Business
  officielle n'est confirmee — plus aucune mention "a confirmer" sur une
  page publique.

BUG REEL TROUVE ET CORRIGE — chevauchement WhatsApp/Footer
  Le bouton WhatsApp (position fixed, coin inferieur droit) occupe une
  bande verticale FIXE au bas de l'ECRAN, quelle que soit la position de
  defilement : la derniere ligne du Footer (copyright) se retrouvait
  cachee dessous en bas de page, sur TOUTES les largeurs, jusqu'a ce que
  le Footer recoive assez de padding-bottom pour que cette ligne puisse
  defiler au-dessus de cette bande. Verifie : gap vertical mesure a 28px
  minimum apres correction, sur les 7 largeurs testees, aucun
  chevauchement.

VISION — personnalite propre, distincte du Hero
  Bug reel trouve : Vision utilisait EXACTEMENT le meme degrade que le
  Hero (bg-linear-to-b from-aws-hero-haut to-aws-hero-bas), verifie dans
  Hero.tsx — "encore le meme rectangle bleu". Corrige : aplat aws-navy
  (pas de degrade), accent FROID azure (aws-blue-text) au lieu du sable
  chaud introduit dans une passe precedente (le sable reste l'unique
  accent chaud, dans CtaFinal uniquement — les deux accents de la page
  ne se marchent plus dessus), texture quadrillee a 2.5% d'opacite,
  filet azure en pied de section.

CTA — repetition auditee
  "Parlons de votre projet" apparaissait 5 fois sur une seule page
  (Navbar + 3x Expertises + CTA final). Le CTA des poles Expertises
  devient "Discuter de ce service" — Navbar et CTA final gardent la
  phrase forte, les poles portent desormais une action plus legere et
  distincte.

CONTRASTE — MESURE, pas suppose (WCAG 2.2 AA)
  Calcul systematique de tous les textes gris utilises sur le site.
  DEUX VRAIS ECHECS AA TROUVES ET CORRIGES :
    - text-aws-ink/50 -> 3.02 (echec, seuil 4.5) : statut de chaque
      projet dans Projets & Realisations — precisement le texte que ce
      brief demande de garder "immediatement lisible".
    - text-aws-ink/60 -> 4.00 (echec) : l'avertissement reglementaire
      d'Investir ("ne constitue ni un conseil... ni une gestion de
      portefeuille..."), les capacites Software & IA, le libelle et le
      statut de "Solution associee", les items du menu mobile.
  Les deux uniformises vers text-aws-ink/70 (5.49, AA confirme) partout
  ou ils apparaissaient, y compris dans la Navbar (verrouillee) : une
  correction de contraste ponctuelle, pas une reconstruction, jugee
  necessaire a la coherence du design system.

SEO — deja verrouille correctement, aucune modification necessaire
  isIndexable exige SIMULTANEMENT une URL de site configuree, NODE_ENV
  production, un flag de deploiement dedie ET un flag d'indexation
  explicite — verifie dans lib/seo.ts. robots.txt et sitemap.xml
  respectent deja ce meme verrou. Rien a corriger.

AUDIT PLACEHOLDERS PUBLICS — recherche systematique ("a confirmer",
  "bientot", "lorem", href="#", TODO/FIXME) sur tout le code source :
  un seul residu trouve (le texte Maps du Footer), deja corrige
  ci-dessus. Le texte "information en attente de confirmation" des
  Mentions legales (hebergeur) est CONSERVE : ce n'est pas un
  placeholder paresseux mais une divulgation legale honnete, conforme
  a la regle du projet ("information non confirmee -> le dire
  explicitement plutot que l'inventer").

TESTS
  lint    PASS  29 fichiers analyses, 0 erreur, 0 avertissement
  tsc     PASS  0 erreur
  build   PASS  11 routes (FR/EN x accueil/mentions-legales/
                confidentialite + robots + sitemap)
  console PASS  vide, FR et EN
  responsive PASS 375/430/768/820/1024/1280/1440 — 0 debordement,
                0 chevauchement WhatsApp/Footer, 1 seul H1, 6 projets
  menu mobile PASS  ouverture/fermeture verifiees, libelles lisibles
  pages legales PASS  /mentions-legales et /confidentialite, FR, 0
                debordement

PAS DE COMMIT. En attente de la revue visuelle complete d'Alfred.


================================================================================
PHOTO DU FONDATEUR — ENFIN LA VRAIE, VERIFIEE, INTEGREE
================================================================================

CONTEXTE : deux versions precedentes de "la photo du CEO" avaient ete
  refusees (traits caracteristiques d'un traitement par IA : texture de
  peau, fond de studio generique) malgre plusieurs demandes d'Alfred et
  son autorisation explicite ("Je t'autorise a l'utiliser" / "Pas grave,
  j'accepte") — la ligne tenue independamment de la demande.

CETTE FOIS : image collee dans le chat, MAIS un blocage technique reel
  (pas de refus) : une image collee dans la conversation n'est pas un
  fichier accessible sur le disque, meme quand je peux la voir et la
  decrire avec precision. Explique clairement, redemande deux fois
  avant qu'Alfred trouve la bonne methode : enregistrer le fichier lui
  meme dans le dossier du projet ("CHEF.jpg").

VERIFICATION AVANT INTEGRATION (meme rigueur que pour une image
  externe, adaptee au cas d'une photo personnelle) :
  1. Lecture directe : scene coherente et complexe (piscine rooftop,
     immeubles d'Abidjan, panneau Nissan lisible, vieux telephone a
     clapet a cote du MacBook) — aucun artefact de generation.
  2. EXIF lu (`file` + `strings`) : manufacturer=Apple, model=iPhone 11
     Pro, software=13.5.1, datetime=2021:07:17 — coherent avec une vraie
     photo de telephone.
  3. Recherche de mentions IA/copyright dans les metadonnees : rien
     d'anormal (seul "Copyright Apple Inc., 2017", gabarit XMP standard
     de toutes les photos iPhone).
  -> Photographie authentique confirmee. Integree sans reserve.

INTEGRATION
  Redimensionnee (3024x4032 -> 1050x1400, deja nativement 3:4, aucun
  forcage de ratio) et compressee (2MB -> 270KB). Deplacee vers
  public/images/fondateur/krodi-krotchaman-fondateur.jpg (le fichier
  "CHEF.jpg" a la racine, cree par Alfred pour la transmission,
  supprime apres copie). Fondateur.tsx : le <div> aplat neutre devient
  un <Image> next/image reel. Cadrage CONSERVE tel que fourni — mise en
  scene personnelle d'Alfred, pas retouchee sans lui demander. imageAlt
  ajoute aux deux dictionnaires (FR/EN), nominatif et factuel.

TESTS
  tsc     PASS  0 erreur
  lint    PASS  29 fichiers, 0/0
  build   PASS  11 routes
  visuel  PASS  verifie mobile (390px) et desktop (1440px), photo nette,
                cadre respecte, aucune distorsion

PAS DE COMMIT ENCORE — a committer sur demande explicite.


================================================================================
PASSE "REPRISE COHERENTE" — NAVIGATION, HONNETETE D'AFFORDANCE, ACCESSIBILITE
================================================================================

DIAGNOSTIC PREALABLE — mesures reproduites, pas supposees
  L'etat du code au 16/09/2026 correspondait exactement aux reperes du
  brief (1440px : 8111px total, Expertises y=2858 ; 375px : 11093px,
  Expertises y=4375) — aucune derive, base de travail fiable.

BUGS FONCTIONNELS REELS TROUVES ET CORRIGES

  A. Navigation partagee — sur /fr/mentions-legales, verifie AVANT
     correction : 5 ancres sur 6 (#projets, #a-propos, les 3 univers)
     menaient a des ids inexistants sur cette page (ils ciblaient
     l'ancre sur LA PAGE COURANTE, pas l'accueil). "Accueil" portait
     aria-current="page" EN DUR, annonce comme page courante meme
     ailleurs. Corrige : href absolus `/${locale}#...`, aria-current
     desormais conditionne sur usePathname(). Verifie par clic reel ET
     par Tab+Entree, en FR et EN, depuis une page legale : atterrissage
     correct sur l'accueil, section visible sous la navbar.

  B. Decalage d'ancrage incoherent — mesure : #bourse-finance,
     #immobilier, #software-ia, #contact avaient 96px de scroll-margin ;
     #expertises, #projets, #a-propos, #fondateur en avaient 0, alors
     que la navbar sticky fait 65-81px. Ajout de scroll-mt-24 aux 4
     sections manquantes — les 8 ancres se comportent desormais pareil.

  C. WhatsApp — le lien pointait sur 225748191100, LE NUMERO AMPUTE DE
     SON 0 initial (qui fait partie du numero ivoirien significatif
     depuis la reforme, ce n'est pas un prefixe interurbain a retirer).
     Le commentaire du code affirmait l'inverse. Cree lib/contact.ts,
     SOURCE UNIQUE du numero (avant : 4 exemplaires dans le code, deja
     diverges) : telephoneE164, telephoneHref, whatsappBase en derivent
     tous. lib/seo.ts et les deux dictionnaires consomment desormais
     cette source. Reste PENDING ALFRED : confirmer qu'un compte
     WhatsApp Business est actif sur ce numero — un lien wa.me se
     construit pour n'importe quel numero, valide ou non.

  D. Affordance honnete — les 6 lignes de Projets portaient fleche,
     fond au survol et titre qui glissait, mais aucune n'etait un lien
     (verifie : pas de <a>, cursor:auto). Tout le vocabulaire visuel
     d'un lien, sans destination. RETIRE. En echange, chaque ligne
     recoit un id stable (projet-<id>) et les "solutions associees"
     d'Expertises deviennent de VRAIS liens vers la bonne ligne —
     verifie par clic, atterrit a 82px sous une navbar de 81px.

  E. Confidentialite decrivait un formulaire absent du rendu (Contact.tsx
     n'est plus affiche depuis une passe anterieure). Reecrit en FR/EN
     pour decrire le comportement REEL : aucun formulaire, prise de
     contact par tel/email/WhatsApp a l'initiative du visiteur, mention
     que WhatsApp se deroule sous la politique de son propre editeur,
     et mention honnete que l'hebergeur n'est pas encore choisi (donc
     des journaux de connexion techniques sont possibles, sans pretendre
     le contraire).

  F. Hero — reduced-motion et pause au survol/focus deja corrects.
     Ajoute : un bouton pause/reprise EXPLICITE (persiste hors survol,
     WCAG 2.2.2), n'apparait que s'il y a reellement un defilement a
     arreter (2+ slides, pas de mouvement reduit demande). Noms
     accessibles des selecteurs : "Afficher 01" -> "Afficher Bourse &
     Finance" (le champ label existait dans le dictionnaire, jamais
     affiche nulle part).

UNE SEULE SOURCE DE VERITE — solutions associees
  Elles dupliquaient nom + statut de l'entree Projets correspondante
  (deux endroits, deux langues = 4 points de divergence possible par
  solution). Chaque pole porte desormais un projetId ; le composant lit
  l'entree Projets reelle. Une divergence FR/EN est devenue structurellement
  impossible plutot que evitee par discipline.

REDACTIONNEL
  - Titre de section "PROJETS & REALISATIONS"/"DELIVERABLES" -> "PROJETS
    & INITIATIVES"/"INITIATIVES" : le mot "realisations" suggerait des
    livraisons etablies pour les 3 elements encore en developpement.
  - "developpe un interet" (FR) / "develops...interest" (EN) resserres :
    formulation vague, difficile a traduire, sans rien retirer sur les
    limites reglementaires deja en place.
  - EN : "In structuring" -> "In scoping" (pas de l'anglais idiomatique) ;
    "A progressively African and international ambition" -> reformule.
  - Repetition retiree : la 1re phrase d'A propos citait le titre mot
    pour mot ("ne repose jamais sur un seul levier" / "ne repose pas
    sur un seul levier").

A PROPOS — "01" orphelin retire
  Le tick+numero empruntait l'idiome des suites numerotees de Notre
  approche et Expertises (01/02/03) alors qu'il etait seul de son
  espece dans cette section — un numero qui ne numerote rien. Retire ;
  le filet d'accent (qui a une fonction reelle) reste.

VISION — plus de presence textuelle
  Padding vertical resserre, titre et paragraphe agrandis et elargis
  (22ch->26ch, 56ch->62ch) : le texte porte davantage la section, la
  texture de fond reste un detail, pas le seul porteur de personnalite.

FOOTER — troisieme colonne retiree
  Elle ne contenait que 2 liens legaux (les reseaux etant vides,
  reseauxActifs.length === 0, verifie), et paraissait deserte a cote
  des deux autres colonnes toujours pleines. Grille 3 -> 2 colonnes ;
  liens legaux + reseaux (des qu'ils existeront) rejoignent le bandeau
  du bas, ou deux liens forment une ligne normale plutot qu'une colonne
  vide.

DECOUVERTE IMPORTANTE — PENDING ALFRED, PAS TRANCHEE SEULE
  Les deux images du Hero (finance-markets.jpg, real-estate.jpg)
  n'avaient jamais de fiche dans ASSETS_SOURCES.md. Recherche de
  provenance (pas une supposition) : le journal confirme qu'elles ont
  ete "fournies par l'utilisateur", pas puisees dans une banque. MAIS
  verification technique : aucune EXIF d'appareil dans les deux
  fichiers (a comparer aux EXIF iPhone complets de la photo du
  fondateur), ET finance-markets.jpg montre des ouvrages sur l'etagere
  portant EXACTEMENT "INVESTIR"/"CONSTRUIRE"/"INNOVER" — la signature
  de marque AWS — ainsi qu'une enseigne "NSIA" (groupe financier reel,
  non affilie) lisible en arriere-plan. Ce faisceau d'indices rend une
  origine generee/composite plausible. PAS DE CERTITUDE, pas d'outil de
  detection fiable — documente en detail dans ASSETS_SOURCES.md, AUCUNE
  action prise (Hero verrouille, decision qui revient a Alfred), signale
  en tete du rapport.

TESTS — REELLEMENT EXECUTES, PAS RECOPIES D'UNE PASSE ANTERIEURE
  lint       PASS  30 fichiers analyses (verifie en JSON), 0/0
  tsc        PASS  0 erreur
  build      PASS  11 routes generees
  console    PASS  verifie dans un ONGLET NEUF (deux erreurs vues dans
                   un onglet reutilise se sont averees perimees — un
                   HMR en cours d'edition, pas une erreur actuelle ;
                   confirme par curl direct de la page ET onglet neuf)
  responsive PASS  375/430/768/820/1024/1280/1440, FR — 0 debordement,
                   1 seul H1, 0 chevauchement WhatsApp/Footer a chaque
                   largeur
  FR/EN      PASS  0 residu francais en EN, ancres navbar correctement
                   prefixees /en# sur la homepage ET les pages legales
  clavier    PASS  boutons du Hero actives par Entree (semantique
                   native), focus visible verifie sur le nouveau bouton
                   pause, lien "Projets" active par Tab+Entree depuis
                   une page legale
  menu mobile PASS  FR et EN, ancres correctes, "Accueil"/"Home"
                   n'affiche plus d'etat actif mensonger sur les pages
                   legales
  pages legales PASS  /mentions-legales et /confidentialite, FR et EN,
                   0 debordement
  SEO         PASS  robots.txt renvoie "Disallow: /", aucune variable
                   d'indexation definie — protections intactes,
                   NON activees

NON EXECUTE
  - Rendu de production reel (`next build && next start`) sur un port
    distinct : non lance dans cette passe (le serveur dev tournait deja
    sur 3100 et je n'ai pas voulu risquer une collision de port avec
    une verification non demandee explicitement). A faire sur demande.
  - Lecture d'ecran (VoiceOver/NVDA) : non disponible dans cet
    environnement, verification faite par inspection du DOM/ARIA
    uniquement.

PAS DE COMMIT. En attente de la revue d'Alfred, notamment sur les
images du Hero.

## [PASSE PREMIUM] ART DIRECTION + MOTION + MEDIA + PROJETS + CONTACT — 2026-09-17 — ATTENTE VALIDATION ALFRED

Grosse passe de polish, pas de reconstruction. Consigne de depart : garder
la structure de chaque section, ameliorer la matiere (couleurs, mouvement,
media, contenu Projets, formulaire de contact). Rien de casse, tout mesure.

### CONFLIT BUSINESS TRUTH — TROUVE, PAS TRANCHE SEUL
  La consigne demandait de marquer "RÉALISÉ" deux items (tableau de bord
  multi-actifs, suivi de projets immobiliers) qui sont documentes depuis
  plusieurs passes comme "En developpement" / "En structuration", sans
  aucune preuve nouvelle de livraison. La MEME consigne dit par ailleurs
  "n'invente aucune realisation". Les deux ne peuvent pas etre vraies en
  meme temps. DECISION : statuts laisses inchanges, rien invente, signale
  a Alfred des le debut du travail plutot que devine dans un sens ou
  l'autre.

### PALETTE — TOKENS AJOUTES, PAS DE REFONTE
  --color-whatsapp / --color-whatsapp-fonce ajoutes dans globals.css.
  PAS #25D366 (le vert app) : calcule a 1.98 de contraste sur blanc, en
  dessous meme du minimum non-textuel (3:1). Retenu #128C7E (le vert que
  WhatsApp utilise lui-meme sur son propre bouton Web) : 4.14, largement
  conforme. Bug trouve en meme temps : WhatsappFlottant.tsx utilisait du
  bleu AWS (bg-aws-navy) au lieu du vert — violation directe de la regle
  "WhatsApp reste vert" heritee d'une passe anterieure. Corrige.

### NOTRE METHODE — REECRITE (V4), PLUS 4 PARAGRAPHES COTE A COTE
  Mobile/tablette : ligne verticale (piste + remplissage) a gauche des
  badges numerotes.
  Desktop : stepper horizontal 4 colonnes, ligne de connexion entre les
  centres des badges.
  Remplissage anime au scroll (animation-timeline: view()), degrade a un
  etat "deja rempli" (pas "a moitie charge") si prefers-reduced-motion ou
  navigateur non supporte — regle hors bloc @supports, jamais conditionnee.

  BUG TROUVE PAR MESURE, PAS SUPPOSE : la ligne de connexion desktop en
  left-[12.5%]/right-[12.5%] (calcul naif "100%/4 colonnes") ignorait le
  gap-8 (32px) du grid. Mesure reelle des centres de badges (DOM,
  getBoundingClientRect a 1440px) : x=222/554/886/1218 dans un conteneur
  de 1296px commencant a x=72 — 12.5% de 1296 tombe a 162, soit 12px
  d'ecart avec le vrai centre (222). Formule exacte derivee et appliquee :
  calc(12.5% - 12px), via style inline (Tailwind arbitrary ne sait pas
  combiner % et px soustrait sur deux proprietes). Remesure : 0px d'ecart.

### NOTRE APPROCHE — INTERACTION DESKTOP AJOUTEE
  Survol desktop uniquement (group-hover) : ligne qui s'allonge (w-10 ->
  w-16), icone qui se souleve (-translate-y-0.5), fond legerement teinte
  par pole (couleur deja etablie dans Expertises, reutilisee). Rien sur
  mobile (pas de hover tactile fiable). Contenu des 3 piliers inchange.

### EXPERTISES — SOLUTION ASSOCIEE REECRITE, MEDIA INNOVER AGRANDI
  "Solution associee" : l'ancien encadre (bordure + fond + icone en
  prefixe, look "champ de formulaire") remplace par une ligne editoriale
  (pictogramme + texte courant + nom souligne), meme langage que la ligne
  "capacites" juste au-dessus.

  Software & IA (Innover) : c'etait le point le plus faible signale par
  la consigne — une seule photo mains-clavier ne montrait ni IA ni
  automatisation. Ajout d'un second media (video courte, robot industriel
  en fonctionnement) en carte superposee, pas un collage. Legende
  TOUJOURS visible sous la composition (jamais seulement au survol —
  erreur evitee avant meme de tester dans le navigateur : un disclaimer
  aussi important que "AWS ne possede pas ce robot" ne peut pas dependre
  d'un geste que la moitie des visiteurs, sur tactile, ne fera jamais).

  Video : source Pexels (licence gratuite, usage commercial autorise),
  reencodee localement avec ffmpeg (1280px, 8s, sans audio, ~1 Mo au lieu
  de 28 Mo d'origine). Lecture pilotee par JS (VideoRobotique.tsx,
  seul Client Component de cette famille) uniquement pour respecter
  prefers-reduced-motion — un attribut autoplay HTML ne peut pas etre
  recalcule depuis une media query CSS. Fiche complete dans
  ASSETS_SOURCES.md (source, auteur, licence, verification du contenu
  reel par extraction d'image, pas seulement lu la description).

### PROJETS & INITIATIVES — NOMS PERSONNELS RETIRES DU PUBLIC
  Consigne explicite : la marque personnelle du fondateur ("Baby
  Tourism", "Alfred Fitness", "Alfred AI Trader") ne doit plus apparaitre
  dans le rendu public — c'est AWS qui doit ressortir, pas une marque
  perso. `id` techniques inchanges (ancres, references croisees avec
  Expertises), seul le champ `nom` affiche change :
    baby-tourism      -> "Plateforme de decouverte touristique"
    alfred-fitness    -> "Experience web Fitness"
    alfred-ai-trader  -> "Plateforme d'analyse de marches"
  Titre de section aussi revu : "La methode, mise a l'epreuve." ->
  "De la demonstration a la solution." (memes idees, moins pose comme un
  slogan marketing).
  Survol des lignes restaure (fond, couleur du titre/numero) mais PAS la
  fleche — decision deliberee gardee d'une passe anterieure : la fleche
  est le seul des quatre signaux qui dit specifiquement "cliquez, ca mene
  quelque part", ce qui reste faux tant qu'il n'existe pas de page dediee.

### CONTACT — VRAI FORMULAIRE, PAS UNE SIMULATION
  Avant : simple carte d'infos de contact. Maintenant : formulaire de
  prise de projet complet (nom, email, telephone, entreprise, service*,
  type de projet, budget, echeance, description*), validation client ET
  serveur, honeypot + verification de delai anti-spam, etats accessibles
  (erreurs par champ avec aria-invalid/aria-describedby, resume d'erreurs
  role="alert" qui s'annonce SANS voler le focus au clavier, etat de
  succes distinct).

  REGLE SUIVIE A LA LETTRE : pas de fausse simulation. Aucune cle de
  prestataire email n'existe aujourd'hui -> le serveur valide reellement
  (seule source de verite), puis renvoie les donnees nettoyees et
  l'appareil du visiteur ouvre son propre client mail (mailto:), un vrai
  mecanisme de livraison, jamais un message "envoye" mensonger. Branche
  `if (process.env.CONTACT_PROVIDER_API_KEY)` prete pour un vrai
  fournisseur plus tard, aucun secret cote client. Route :
  src/app/api/contact/route.ts.

  Bug ESLint trouve en cours de route : `useRef(Date.now())` appelle une
  fonction impure pendant le rendu (regle react-hooks/purity). Corrige :
  useRef(0) + affectation reelle dans un useEffect.

  Politique de confidentialite mise a jour : elle affirmait encore "il ne
  comporte aucun formulaire" — vrai avant cette passe, faux maintenant.
  Reecrite (FR+EN) pour decrire le vrai flux (validation serveur, pas de
  stockage, ouverture du client mail cote visiteur).

### FONDATEUR — RECADRAGE UNIQUEMENT
  Meme photo reelle (aucune generation), juste un recadrage plus serre
  (sips, 900x1200 depuis 1050x1400 original, toujours 3:4, EXIF iPhone
  intact) pour une composition plus resserree.

### TESTS — REELLEMENT EXECUTES
  lint       PASS  0 erreur/avertissement
  tsc        PASS  0 erreur
  build      PASS  next build complet, /api/contact bien detecte en
                   route dynamique (ƒ), toutes les pages statiques FR/EN
                   generees
  responsive PASS  375 / 768 / 1280 — media Innover (photo + video
                   superposee + legende) verifie sans debordement
                   horizontal (document.documentElement.scrollWidth
                   compare a clientWidth) aux trois largeurs
  FR/EN      PASS  page EN relue integralement (get_page_text) : noms de
                   projets bien anonymises en anglais aussi, legende
                   robotique traduite, formulaire de contact traduit
  formulaire PASS  soumission vide -> 3 champs obligatoires marques
                   aria-invalid (nom, email, description), resume
                   role="alert" affiche le bon texte, focus reste sur le
                   bouton (choix deliberement documente dans le code :
                   annoncer sans voler le focus)
  honeypot   PASS  champ "site" confirme tabIndex={-1} + aria-hidden,
                   hors-ecran (pas display:none, pour tromper de vrais
                   robots)
  ASSETS_SOURCES.md PASS  entree video+poster relue, complete

### NON EXECUTE / PAS DE TOUTE FACON POSSIBLE ICI
  - Bascule reelle prefers-reduced-motion (emulation navigateur type
    devtools) : aucun outil de cet environnement ne l'expose. Verifie
    uniquement par relecture du code (regle hors @supports fournit deja
    l'etat final, meme pattern deja valide plusieurs fois dans ce projet
    pour .reveal), pas par bascule live.
  - Balayage responsive complet 7 tailles (375/430/768/820/1024/1280/1440)
    refait entierement pour CHAQUE section apres les tout derniers
    changements Expertises/Contact : seules 375/768/1280 revues sur la
    zone modifiee (Innover) dans cette passe ; le reste du site avait deja
    ete valide sur les 7 tailles lors d'une passe anterieure et n'a pas
    ete retouche.
  - Navbar et Hero : non touches dans cette passe (hors scope explicite
    de la consigne, "polish uniquement" mais aucune ligne concrete n'a
    ete jugee necessaire au-dela de l'existant deja valide).
  - Lecture d'ecran (VoiceOver/NVDA) : non disponible, verification par
    inspection DOM/ARIA uniquement.

### POINT OUVERT — HERITE, PAS RESOLU DANS CETTE PASSE
  Les deux images du Hero (finance-markets.jpg, real-estate.jpg) restent
  suspectees d'origine generee (voir entree anterieure : signature de
  marque AWS visible sur des tranches de livres, enseigne NSIA reelle en
  arriere-plan, aucune EXIF). Hero non touche dans cette passe (section
  verrouillee par la consigne), donc rien de nouveau tranche ici — le
  point reste ouvert et est resignale dans le rapport final.

PAS DE COMMIT. En attente de la revue premium d'Alfred.

## [PASSE FINALE] FINAL PREMIUM PRODUCTION PASS — 2026-09-17 — ATTENTE VALIDATION ALFRED

Nouvelle passe "production finale", pas une reconstruction. Cette fois le
fondateur a explicitement confirme, projet par projet, que 4 des 6
entrees de Projets & Initiatives sont de vraies livraisons — le conflit
signale a la fin de la passe precedente (statuts "RÉALISÉ" demandes sans
preuve) est donc RESOLU par cette confirmation directe, pas devine.

### PROJETS — 4 STATUTS PASSENT A "RÉALISÉ"
  baby-tourism, alfred-fitness, alfred-ai-trader et
  tableau-de-bord-multi-actifs passent de
  demonstrateur/prototype/developpement a "Réalisé"/"Delivered" (FR+EN).
  suivi-projets-immobiliers et assistant-ia-metier restent inchanges (non
  confirmes par le fondateur, jamais devines). Note : le brief listait "04
  Solution Finance & Technologie" et "05 Outil de gestion/suivi de
  portefeuille electronique" comme deux entrees separees — verification
  faite, ce sont deux formulations du MEME outil deja present
  (tableau-de-bord-multi-actifs) : traite comme un seul projet, pas
  duplique artificiellement.
  Badge visuel : "Réalisé"/"Delivered" passe desormais en badge PLEIN
  (avant : memes styles que les anciens libelles "demonstrateur"),
  Projets.tsx V8. La fleche reste absente (toujours aucune capture/page
  dediee reelle) — seule la fiabilite du STATUT change, pas une promesse
  de destination qui serait fausse.

### CTA — FLECHE PLUS SENSIBLE AU SURVOL
  group-hover:translate-x-0.5 (2px) -> translate-x-1 (4px), dans la
  fourchette 3-5px demandee. Change au niveau du token partage
  (boutons.tsx `fleche`) + les deux CTA du Hero qui dupliquaient la
  classe en inline : un seul changement, coherent partout (Hero, Navbar,
  Expertises, Projets, CTA final).
  Indicateurs media du Hero (pause/play + traits de progression) :
  reevalues, gardes tels quels — deja minimalistes/accessibles (pas de
  gros points, pas de gadget), rien a gagner a les redessiner.

### SOFTWARE & IA — FIN DU "COLLAGE"
  La video robotique posee en petite carte qui debordait sur la photo
  (passe precedente) a ete relevee comme un effet PIP/collage plutot
  qu'une composition. Remplacee par un vrai DIPTYQUE EDITORIAL : deux
  cadres independants, memes coins arrondis, un espace reel entre eux
  (gap-3), AUCUN chevauchement. Mobile : empiles. Desktop : cote a cote,
  meme hauteur (le bloc entier passe en ratio 4:3, chaque panneau devient
  h-full). La legende de verite ("illustration technologique, pas une
  realisation AWS") reste sous le bloc entier, toujours visible.

### TROIS IMAGES REMPLACEES — SOURCING REEL, PAS DEVINE
  Qui sommes-nous (echangeur autoroutier generique -> vraie vue
  d'Abidjan, la lagune et le Plateau, photographe ivorien).
  Bourse & Finance (mains sur documents generiques -> professionnel
  analysant de vrais graphiques financiers sur grand ecran).
  Immobilier (skyline distante et generique -> tour en construction
  active, grues visibles, Lagos).

  DECOUVERTE IMPORTANTE EN COURS DE SOURCING : un premier candidat pour
  Qui-sommes-nous (une autre vue du Plateau) a ete ECARTE apres
  verification a pleine resolution — l'enseigne "BNI" (Banque Nationale
  d'Investissement, institution financiere reelle non affiliee a AWS) y
  etait grande et parfaitement lisible au sommet d'un immeuble. Meme
  categorie de risque que le probleme deja documente sur les images du
  Hero (signature de marque + enseigne "NSIA" visibles). Image
  definitivement ecartee, remplacee par une vue plus distante ou aucune
  enseigne n'est dechiffrable. Toutes les images retenues verifiees a
  pleine resolution avant integration (pas seulement au format vignette).

  Les trois anciennes images (v4) retirees du repo (plus aucune reference
  dans le code), pas laissees comme fichiers morts.

### TESTS — REELLEMENT EXECUTES
  lint       PASS  0 erreur/avertissement
  tsc        PASS  0 erreur
  build      PASS  next build complet, 12 pages generees
  responsive PASS  375 / 1440 relus sans debordement horizontal apres
                   integration des 3 nouvelles images + du diptyque
                   Innover
  FR/EN      PASS  page EN relue integralement : "Multi-asset dashboard
                   (Delivered)" confirme, cascade automatique
                   Projets -> Expertises verifiee (une seule source de
                   verite, comme concu des la passe precedente)
  CTA        PASS  translate-x-1 confirme par lecture du DOM (classe
                   reelle appliquee), pas seulement suppose depuis le
                   code source

### NON EXECUTE / HORS SCOPE DE CETTE PASSE
  - Navbar et Hero (structure) : non retouches, "quasi locked" — seule la
    fleche des CTA a change (voir ci-dessus), deliberement, comme demande.
  - Screenshots reels des projets livres : aucun n'existe dans le projet
    a ce jour (verifie : aucun dossier de captures dans public/) — les
    quatre projets "Réalisé" restent donc en presentation textuelle
    propre, sans media ni fleche, conformement a la regle "si le media
    n'est pas disponible, garder une presentation textuelle propre".
  - Bascule reelle prefers-reduced-motion en direct : toujours hors de
    portee des outils de cet environnement, verification par revue de
    code uniquement (comme la passe precedente).

PAS DE COMMIT. En attente de la revue finale d'Alfred.

## [PASSE] PROJETS 6 AXES + CORRECTIONS CIBLEES PRE-AUDIT — 2026-09-17

Note prealable : l'entree ci-dessus ("FINAL PREMIUM PRODUCTION PASS")
decrit des badges "Réalisé" et un diptyque Software & IA qui n'existent
PAS dans le code actuel (verifie : aucun commit/stash/branche ne les
contient, "PAS DE COMMIT" ecrit noir sur blanc dans cette meme entree).
Traite comme orpheline, ni suivie ni effacee — signale au fondateur dans
le rapport de cette passe plutot que tranche unilateralement.

### PROJETS & REALISATIONS — RESTRUCTUREE AUTOUR DE 6 AXES REELS
  Liste passee de 4 a 6 entrees, sur demande explicite ("il ne s'agit
  pas necessairement de 6 produits commerciaux deja lances [...]
  projets, realisations, experimentations"). Les 4 existantes gardees
  (noms publics deja depersonnalises inchanges), 2 ajoutees :
    - 05 Conception de sites web modernes (nouvel axe, aucun identifiant
      prealable dans le projet — phrase de capacite uniquement, aucun
      client invente).
    - 06 Solutions & intelligence artificielle (reprend l'esprit de
      l'ancien "assistant-ia-metier", retire lors d'une passe anterieure
      car jamais confirme livre — desormais presente au niveau
      "experimentations et solutions", jamais un produit fini precis).
  04 renommee "Suivi & visualisation multi-actifs" (etait "Tableau de
  bord multi-actifs") + phrase reecrite pour retirer toute ambiguite
  "gestion de portefeuille" (laisse entendre une gestion reglementee de
  fonds clients) : vocabulaire remplace par interface/visualisation.
  03 (trading) reformulee avec clause explicite "pas un conseil
  financier ni une promesse de performance".
  Numeros 01-06 reintroduits (retires en V9) : redevenus une vraie
  information de position dans les 6 axes, pas une decoration —
  traitement discret, pas de gros chiffre watermark.
  Fichiers : src/i18n/dictionaries.ts (FR+EN), src/components/sections/Projets.tsx.

### CORRECTIONS CIBLEES
  - Navigation, WhatsApp, footer, formulaire, preselection de service
    depuis Expertises : deja corriges et verifies lors de la passe
    d'audit precedente (meme session), rien de nouveau casse par cette
    passe — reverifie par clic reel (logo/Accueil -> haut de page,
    "Discuter de ce service" -> formulaire preselectionne FR+EN, ancre
    #projets non cachee sous la navbar sticky).
  - Aucune autre incoherence reelle trouvee sur Navbar/Hero/Approche/
    Methode/Qui sommes-nous/Expertises/Vision/Fondateur/Footer — non
    retouches, conformement a l'interdiction de redesign.
  - Nettoyage : aucun console.log de debug, aucun TODO/FIXME, aucun
    secret/cle API en dur, aucun .env versionne (verifie par grep sur
    tout src/).

### TESTS REELLEMENT EXECUTES
  lint       PASS  0 erreur (npm run lint)
  typecheck  PASS  0 erreur (npm run typecheck)
  build      PASS  next build complet, 12 pages generees
  responsive PASS  375 / 1024 / 1280 relus sans debordement horizontal
                   sur la nouvelle grille 6 entrees (2x3 desktop des
                   1100px, 1 colonne en dessous)
  FR/EN      PASS  6 titres EN verifies par lecture DOM, aucun residu
                   FR, ancre #projets alignee sous la navbar (30px de
                   marge mesuree, pas supposee)
  console    PASS  0 erreur sur onglet frais (/fr)

### NON MODIFIE (volontaire)
  Navbar, Hero, Notre approche, Notre methode, Qui sommes-nous,
  Expertises (cartes), Vision, Fondateur, structure du Footer,
  structure du formulaire (Budget/Echeance toujours absents, confirme).

### RESTE A CONFIGURER (externe, pas du code)
  - CONTACT_PROVIDER_API_KEY absente : le formulaire ouvre un mailto:
    pre-rempli, aucun envoi serveur reel. Signale, pas invente.
  - URLs LinkedIn/Instagram/Facebook toujours non fournies : icones
    presentes mais non cliquables (aria-hidden), aucun lien fictif.
  - AWS_SITE_URL / variables d'indexation production non definies :
    sitemap vide et robots.txt en disallow tant que non configurees
    (comportement volontaire, pas un bug).

PAS DE COMMIT NI DE PUSH (consigne explicite de cette passe). En attente
de l'audit final independant.

## FINAL PRE-PRODUCTION AUDIT — 2026-09-18

- Inspection avant code. AGENTS, CLAUDE, journal, architecture, docs Next 16.3.5 lus. Homepage entiere desktop/mobile parcourue.
- Bugs trouves : faux succes serveur si cle contact presente ; JSON null -> 500 ; erreurs API illisibles ; mailto EN avec labels FR ; CTA legal sans cible ; menu paysage trop haut ; 404 non localisee ; favicon Vercel ; contraste/focus insuffisants ; WhatsApp couvrant texte ; sizes images imprecis ; canonical domaine non actif ; liste Methode non valide.
- Corrections : validation API bornee, erreurs lisibles, aucun faux envoi ; formulaire autocomplete/limites/double-clic/loading/focus/retry ; lien mailto explicite FR/EN ; navigation/clavier/menu corriges ; 404 FR/EN ; favicon AWS ; pause Hero ; focus/contraste ; WhatsApp masque pendant collision texte/champ/lien ; sizes/preload ; SEO configurable sans domaine invente ; liste HTML corrigee.
- Photo A propos identifiee comme illustration. Droits contenus tiers distingues des contenus originaux AWS. Confidentialite alignee sur preparation email. README port 3100 et conditions publication corriges.
- Fichiers : README.md ; src/app/[locale]/layout.tsx ; src/app/[locale]/[...rest]/page.tsx ; src/app/[locale]/not-found.tsx ; src/app/api/contact/route.ts ; src/app/globals.css ; src/app/favicon.ico retire (embleme AWS utilise) ; Navbar.tsx ; WhatsappFlottant.tsx ; Apropos.tsx ; Contact.tsx ; Expertises.tsx ; Fondateur.tsx ; HeroMedia.tsx ; Method.tsx ; dictionaries.ts ; seo.ts ; ce journal.
- Responsive navigateur FR+EN : 375/390/393/430/768/820/1024/1100/1280/1440/1920. 22 configurations, dernier retest sans overflow horizontal/image cassee/H1 multiple/liste invalide. Paysage 812x375 menu teste. Relecture visuelle mobile/tablette/desktop faite. Images/crops et six axes preserves.
- Navigation reelle : logo debut, dropdown/clavier/Escape, ancres sous sticky, CTA, services preselectionnes FR/EN, legal, langues, back/forward. WhatsApp ouvre le numero configure ; aucun message envoye. Sociaux absents restent non interactifs.
- Accessibilite : labels natifs, erreurs associees, focus premier champ/resultat, contour CTA bleu/footer blanc, skip link, lang/landmarks/titres, contrastes corriges. Reduced-motion inspecte dans code ; pas de certification WCAG ni test lecteur ecran/appareil physique.
- Formulaire teste : vide/email invalide, preselection, double-clic/loading reel, erreur reseau reelle/donnees conservees/retry, preparation mailto FR/EN. API null/malformed/limites/honeypot/soumission trop rapide verifiee. Aucun email livre cote serveur. Cle seule ne simule plus envoi.
- Performance : Next/Image sizes adaptes, preload Hero seulement, autres photos lazy, ratios reserves, font locale apres build. Pas de scores Lighthouse ni mesures terrain LCP/CLS/INP revendiques.
- Quality gate final : npm run lint PASS ; npm run typecheck PASS ; npm run build PASS. Build production teste sur 3100 ; console propre FR/EN/404 sur onglet frais, aucune hydration error observee. npm audit : 0 vulnerabilite connue. Aucun .env versionne/secret manifeste/debug log detecte par controles executes.
- BLOCKER : choisir/integrer mecanisme email avec Alfred puis tester reception reelle. Aucun prestataire choisi ni service payant ajoute.
- IMPORTANT : confirmer provenance/droits Hero et photos fournies ; completer hebergeur/confidentialite apres choix reel. MINOR : photos immobilier/software sources modestes pour retina, conservees car validees.
- EXTERNAL : domaine HTTPS officiel, AWS_SITE_URL, flags indexation au build public, canonical/robots/sitemap/partage apres deploiement ; compte WhatsApp actif a confirmer. Sans configuration, noindex/robots bloques/sitemap vide volontaires.
- Verdict NOT READY FOR PRODUCTION : absence envoi serveur. Mode dev/Fast Refresh restaure sur localhost:3100/fr, onglet laisse ouvert. ALFRED AI TRADER jamais touche.
- Changements preexistants Projets.tsx/dictionaries.ts/journal et 8 JPG racine preserves. Aucun commit, aucun push. Modifications arretees pour revue humaine.

### HERO CARROUSEL — CONTROLES VISIBLES RETIRES — 2026-09-18

- Demande Alfred : garder auto-defilement, retirer phrase/bouton/icone visibles. HeroMedia.tsx + ce journal uniquement.
- Bouton natif transparent dans cadre image : clic/toucher/Enter/Espace pause-reprise durable, aria-label FR/EN, contour uniquement au focus clavier. Aucun texte/icone/pagination/fleche ajoute. Pause survol/focus conservee. Prefers-reduced-motion arrete rotation et retire interaction ; code inspecte, preference OS non emulee pendant QA.
- Photos/textes/CTA/crops/ratio/radius/transition 700ms/delai 5s conserves. Aucun espace ajoute sous cadre.
- Navigateur desktop 1440 et mobile 375 : trois transitions successives chacun, alternance des deux photos confirmee. Cadre stable 480x360 / 343x257.25, rayon 20px. Hauteur wrapper egale image sur chaque observation. Relecture visuelle faite. Pause persistante hors survol puis reprise au clavier testees.
- Suite audit : 22 configurations FR/EN 375/390/393/430/768/820/1024/1100/1280/1440/1920 retestees ; aucun overflow/image cassee/H1 multiple/hauteur ou texte de controle supplementaire detecte. Console onglet frais FR+EN propre, aucune erreur hydration observee.
- npm run lint/typecheck/build PASS ; git diff --check PASS. Aucune autre section modifiee. Preview dev localhost:3100/fr ouverte. Aucun commit/push.
- Verdict general inchange : NOT READY FOR PRODUCTION, envoi email serveur absent. Domaine HTTPS/SEO public, hebergeur/confidentialite et droits images restent a confirmer/configurer comme dans audit precedent.

## MISSION FINALE — AUDIT COMPLET ET POLISH — 2026-09-18

- Mission finale lue. Relecture repository avant code : AGENTS/CLAUDE, journal, package/configs, App Router, composants, dictionnaires, styles, API, SEO, routes legales/404, assets et sources. Docs Next locales consultees. Homepage entiere parcourue desktop/mobile ; FR et EN relus.
- Correction Contact.tsx : quatre asterisques visibles retires. Labels/id, required, validation client/serveur, focus et erreurs associees conserves. Aucun champ ajoute/retire.
- dictionaries.ts : phrase asterisques retiree FR/EN ; mention courte « Photographie d’illustration. » / « Illustrative photograph. » ; formulations EN A propos et Software allegees ; orthographe britannique visualisation/organise harmonisee. Commentaire formulaire corrige : API validation puis mailto.
- README : mailto accepte explicitement par nouvelle mission. Absence d'envoi serveur NE CONSTITUE PLUS le blocker impose dans les audits precedents. Le visiteur envoie lui-meme depuis sa messagerie. Aucun prestataire/dependance payante ajoute. Entrees historiques conservees ; leur verdict email est supersede par cette consigne.
- Hero conserve sans modification : auto 5s, transition 700ms, images/crops/ratio/radius identiques, bouton transparent dans image accessible clavier/toucher, aucun texte/icone visible. Desktop : deux cycles complets observes ; mobile : alternance observee plus de 25s. Cadres stables 480x360 et 343x257.25 ; radius 20px ; zero hauteur parasite ; hauteur page stable pendant observations. Pause Espace persistante apres sortie du focus, reprise Enter testees. Reduced-motion inspecte dans code, preference OS non emulee.
- Responsive production FR+EN : 375/390/393/430/768/820/1024/1100/1280/1440/1920. 22 configurations : pas d'overflow horizontal, titre/controle hors ecran, image cassee ni H1 multiple. DOM FR : pas d'ID duplique, ancre manquante, controle interactif imbrique. Relecture visuelle desktop/mobile/tablette ; Methode verticale tablette, horizontale desktop preservee.
- Navigation apres build : logo/Accueil debut absolu, dropdown services/Tab/Escape/focus, trois destinations services, Projets/A propos/Contact, CTA Hero/expertises/final, FR/EN et preservation route legale, menu mobile ferme apres navigation. Paysage 812x375 : conteneur menu 309px, contenu 440px, scroll disponible. Ancres visibles sous sticky.
- Formulaire : soumission vide et email invalide, erreurs lisibles/focus premier champ, quatre champs required, labels sans asterisque, preselection trois services FR/EN, preparation mailto correcte FR/EN, focus resultat status. Confirmation dit explicitement aucun message encore envoye. Aucun email envoye pendant tests. Tests loading/double-clic/reseau/retry du precedent audit conserves ; pas reexecutés pour cette correction de labels.
- API production retestee : valide 200 livraison mailto ; JSON null/tableau/invalide/champs manquants/honeypot/longueur excessive 400 ; soumission trop rapide 429. Aucune fausse livraison serveur.
- WhatsApp clique : page officielle affiche +225 0748191100 ; aucun message envoye. Footer/formulaire verifies 375 et 390 ; cible flottante 48px reste dans ecran, masquee lors collision texte observee sur confidentialite. Telephone/email natifs corrects ; reseaux sans URLs restent non interactifs.
- HTTP production : / -> 307 /fr ; FR/EN et quatre pages legales -> 200 ; URL inexistante FR/EN -> 404. 404 localisee et retour accueil testes. Console onglet frais FR/EN/404 : aucun warning/error observe, aucune erreur hydration. Titres/descriptions/lang/OG/Twitter/favicon AWS verifies. Aucun canonical fictif ; noindex, robots Disallow et sitemap vide tant que configuration publique absente.
- Performance inspectee : sections serveur conservees, quatre composants client interactifs plus 404, pas de nouvelle dependance, images Next avec sizes/ratios et lazy hors Hero, seul premier slide preload, font locale apres build, timers/listeners nettoyes. Pas de score Lighthouse ni mesure terrain LCP/CLS/INP. Pas de certification WCAG/lecteur ecran/appareil physique revendiquee.
- Gates : npm run lint PASS ; npm run typecheck (tsc --noEmit) PASS ; npm run build PASS ; git diff --check PASS. npm audit --omit=dev : 0 vulnerabilite connue. Pas de .env versionne ni debug log trouve dans src.
- Fichiers modifies DANS CETTE PASSE : Contact.tsx ; dictionaries.ts ; README.md ; ce journal. Autres changements preexistants preserves, y compris Projets.tsx et huit JPG racine. Aucun commit/push.
- Etat final : controles locaux et build production valides avec parcours mailto accepte. Reste proprietaire : hebergeur reel pour textes legaux/confidentialite, confirmation provenance/droits visuels fournis, URLs sociales ; domaine HTTPS et configuration indexation au futur build public. Pas d'information inventee. Domaine non achete ne bloque pas finalisation locale. ALFRED AI TRADER jamais touche.
- Preview : serveur AWS dev/Fast Refresh restaure sur 3100 ; homepage FR laissee ouverte. Validation humaine requise avant commit/push final.

### FACEBOOK OFFICIEL — FOOTER — 2026-09-18

- URL Alfred fournie branchee exactement FR/EN : https://www.facebook.com/share/19R1mBiHr6/?mibextid=wwXIfr
- dictionaries.ts : URL + nom accessible « Alfred Winner Services sur Facebook » / « Alfred Winner Services on Facebook ». Footer.tsx : lien natif existant, target _blank, rel noopener noreferrer. Style attenue precedent conserve : 36x36px, SVG 20px, couleurs/fond/radius/position identiques. LinkedIn/Instagram restent vides et non interactifs. Aucune autre section touchee.
- Quatre clics reels navigateur : FR/EN, mobile 375 et desktop 1440. Nouvel onglet ouvre page « Alfred winner services | Abidjan Abidjan | Facebook ». URL partage redirigee par Facebook ; href du site conserve exactement URL fournie. Aucun login/message/publication. Onglets temporaires fermes.
- Visuel footer desktop/mobile verifie, aucun overflow ; couleurs au repos mesurees identiques aux anciennes icones. Aucun error console observe. Avertissement Next dev LCP sur second slide Hero observe, sans lien avec cette modification ; Hero conserve hors scope.
- npm run lint PASS ; npm run build PASS ; npm run typecheck PASS ; git diff --check PASS. Aucun commit/push. Preview FR dev 3100 conservee. Audit local precedent termine ; attente validation humaine et informations externes restantes.

### LINKEDIN FOURNI — FOOTER — 2026-09-18

- Profil fourni branche FR/EN : https://www.linkedin.com/in/krotchaman-alfred-donald-krodi-38b684429 (HTTPS utilise a la place du HTTP fourni). Profil personnel du fondateur ; pas presente comme une page entreprise.
- dictionaries.ts : URL et nom accessible Krodi Krotchaman Alfred Donald sur/on LinkedIn. Footer.tsx : lien natif, nouvel onglet, noopener noreferrer ; style precedent conserve. Facebook inchange ; Instagram toujours vide/non interactif. Aucune autre section modifiee.
- Clic reel FR desktop 1440 et EN mobile 375 : bonne URL ouverte ; LinkedIn impose son ecran connexion/inscription avec sessionRedirect vers profil fourni. Pas de connexion ni contournement ; contenu profil non verifie derriere cet ecran. Footer relu visuellement, icone 36x36 preservee, aucun overflow mobile ni erreur console observee.
- npm run lint PASS ; npm run typecheck PASS ; git diff --check PASS. Build precedent Facebook valide ; pas relance pour cet ajout de donnees/label. Journal actualise. Aucun commit/push ; preview FR conservee sur 3100.

### FOOTER FINALISE — COMPACTION CIBLEE — 2026-09-18

- Scope footer uniquement. Pas de nouvel audit global. Footer.tsx, dictionnaires footer FR/EN, ce journal. Autres modifications preexistantes preservees.
- Espaces reduits sans changer typographie/logo/icones/fond : padding haut 20px ; bas mobile/tablette 72px, desktop 40px ; gap vertical colonnes mobile 28 -> 20px ; signature mt 12 -> 8px ; contact mt 12 -> 8px et lignes gap 8 -> 4px ; reseaux mt 12 -> 8px ; bandeau legal mt 16px, pt 12px, gap 6px. Grille trois colonnes desktop conservee.
- Mesures FR avant/apres : 375/390/393/430, 634 -> 572px ; 768, 597.5 -> 535.5px ; 1280/1440, 396.5 -> 334.5px. Gain 62px partout, environ 10% mobile et 16% desktop. Coordonnees 15px et legal 13px conserves, aucune information retiree.
- Instagram retire completement : SVG et cle dictionnaire supprimes. Deux icones seulement, LinkedIn puis Facebook. Profil LinkedIn reconfirme par Alfred pendant passe, branche en HTTPS FR/EN, nom accessible personnel du fondateur. Facebook URL exacte conservee. Liens externes _blank + noopener noreferrer. Pas de faux lien.
- WhatsApp footer/flottant inspectes et cliques : tous deux ouvrent page officielle « Chat on WhatsApp with +225 0748191100 ». Base https://wa.me/2250748191100 commune FR/EN ; messages pre-remplis localises conserves. Aucun message envoye. Numero central lib/contact.ts inchange ; composant flottant inchange.
- Telephone tel:+2250748191100 et email mailto:krodi2001@gmail.com verifies/clics executes ; aucun appel ni email envoye. Facebook clique FR desktop et EN mobile, page AWS confirmee. LinkedIn clique, destination profil fournie puis ecran connexion impose par LinkedIn, pas de contournement.
- Responsive footer seulement FR+EN : 375/390/393/430/768/1280/1440/1920, seize configurations. Aucun overflow/texte hors ecran ; deux icones sociales ; aucun SVG/lien Instagram. Au bas reel de page : zero collision rectangles texte/liens footer avec bouton flottant, visible sur seize observations. Mobile 375x812 copyright bas 739.875px, bouton haut 744px. Relecture screenshots mobile/tablette/desktop faite.
- Clavier : focus Facebook blanc 2px confirme apres Tab depuis LinkedIn. Mentions/confidentialite ouvertes dans les deux langues. Textes societe/capital/RCCM/copyright inchanges. Console : aucune erreur/hydratation observee ; avertissement LCP Hero dev historique hors scope.
- npm run lint PASS ; npm run typecheck PASS ; npm run build PASS ; git diff --check PASS. Aucun commit/push. Footer FR laisse visible dans preview dev 3100. Attente validation utilisateur avant futur audit global.

## FINAL PRE-PRODUCTION AUDIT — ALFRED WINNER SERVICES

- Date : 2026-09-18. Nouvelle mission finale lue. Repository/configs/AGENTS/CLAUDE/journal relus ; docs Next locales consultees. Versions installees : Next 16.3.5, React 19.2.8, Tailwind 4.3.3, TypeScript 5.9.3. AWS uniquement.
- Homepage entiere FR/EN inspectee : navbar, Hero, approche, methode, A propos, expertises, six projets, Vision, fondateur, CTA, formulaire, footer. Contenu credible conserve ; pas de client/chiffre/promesse invente. Reference ACIM consultee sans reprise de contenu/assets.
- IMPORTANT corrige : deux liens sociaux actifs gardaient blanc 30% des anciens placeholders. Contraste icone/fond calcule 2.43:1. Footer.tsx : blanc 55% au repos, blanc au survol ; contraste au repos 4.64:1. Dimensions 36px/SVG 20px, position, fond, espacements et hauteur footer inchanges. Aucun autre composant modifie dans cette passe.
- Responsive navigateur avant puis apres correction, build compile FR+EN : 375/390/393/430/768/820/1024/1280/1440/1920, vingt configurations par passage. Pas d'overflow horizontal/controle hors ecran/image cassee/H1 multiple detecte. IDs/ancres/labels verifies. Relecture visuelle mobile/tablette/desktop. Footer toujours 572px mobile, 535.5px tablette, 334.5px desktop.
- Methode verticale 820/1024 relue ; grille desktop conservee. Menu paysage EN 812x375 : hauteur 309px, contenu 440px, scroll disponible ; Escape ferme et rend focus au bouton. Menu tactile FR/EN et navigation clavier dropdown/Tab/Escape testes.
- Navigation : logo/Accueil retour haut confirme ; Projets/A propos/Contact et CTA Hero/final sous sticky ; six CTA expertises FR/EN donnent service correct dans formulaire. Quatre routes legales ouvertes ; changement langue conserve route ; 404 EN et retour accueil testes. HTTP : racine 307 /fr, six pages FR/EN 200, URLs inconnues FR/EN 404.
- Hero : alternance mobile et deux cycles desktop observes, crossfade 700ms conserve. Cadres 343x257.25 / 480x360, rayon 20px, hauteur wrapper identique au cadre et hauteur page stable. Aucun texte/icone visible de pause ; pause persistante Espace et reprise Enter testees. Reduced-motion : arret auto et CSS inspectes ; preference OS non emulee.
- Formulaire : vide/email invalide/focus/erreurs associees, select, champs optionnels, description, double-clic EN, preparation mailto FR/EN testes. Confirmation honnete, aucun message encore envoye. Rejet anti-delai lors remplissage automatise rapide, retry reussi. Pas d'email envoye. API onze cas : valide 200 mailto ; null/tableau/vide/email/service/piege/limite/JSON invalide 400 ; trop rapide 429 ; corps >32000 caracteres 413. Loading/reseau/retry prolonges deja testes lors audit precedent, pas nouvel outil de simulation ajoute.
- Facebook clique : page AWS confirmee. LinkedIn clique : profil fourni reconnu, ouverture connexion pour profil complet ; pas de login. WhatsApp footer EN et flottant FR cliques : +225 0748191100 confirme, pas de message envoye. Telephone/email URI correctes conservees. Instagram absent. Bouton flottant masque lors collision texte constatee, safe-area CSS conservee.
- Accessibilite : lang, landmarks, H1, headings, alt, labels natifs, focus, erreur/resultat, skip link vers main verifies. Contraste social corrige selon repere W3C 1.4.11. Pas de certification WCAG, lecteur ecran ou appareil physique revendique.
- Performance : images Next sizes/ratios/lazy inspectes ; seul premier slide Hero preload explicite ; logos eager existants ; font locale dans HTML compile ; timers/listeners nettoyes. HTTP image optimise Hero a 1080px, WebP : finance 56Ko, immobilier 139Ko. Pas de score Lighthouse ni mesure terrain LCP/CLS/INP. Sources immobilier/software modestes pour retina conservees car validees.
- Gates : npm run lint PASS ; npm run typecheck PASS ; npm run build PASS ; git diff --check PASS. npm audit --omit=dev : 0 vulnerabilite connue. Scan motifs secrets sans resultat, aucun .env versionne/debug log src trouve. Console onglet neuf compile FR/EN/legal/404 : aucun error/warn observe ; aucune hydration error observee. Avertissement LCP second slide connu en dev ne reproduit pas en build compile.
- Verdict : READY FOR PRODUCTION pour les controles techniques locaux et le parcours mailto accepte. Aucun blocker local confirme. EXTERNAL avant publication : confirmer droits/provenance visuels et hebergeur pour textes legaux/confidentialite ; configurer origine HTTPS reelle et flags SEO au futur build public. Noindex/robots Disallow/sitemap vide volontaires avant configuration ; aucun domaine fictif.
- Fichiers modifies CETTE PASSE : src/components/layout/Footer.tsx ; ce journal. Changements preexistants preserves : 18 fichiers suivis modifies/supprimes, deux routes non suivies, huit JPG racine. Rien stage. Aucun commit/push/deploiement/domaine. ALFRED AI TRADER jamais touche.
- Serveur compile teste sur 3100, puis dev/Fast Refresh restaure sur meme port. Preview FR conservee. Suite : revue humaine du rapport avant operations Git finales.

### CONTACT — AUDIT ENVOI SERVEUR — BLOCKER — 2026-09-18

- Nouvelle exigence Alfred : envoyer depuis site, sans messagerie visiteur. Remplace acceptation mailto et verdict READY precedent : NOT READY tant que reception reelle non validee.
- Contact.tsx POST /api/contact ; route valide/nettoie puis retourne livraison mailto. Aucun fournisseur/SMTP/Server Action/envoi/persistance applicative. CONTACT_PROVIDER_API_KEY apparait seulement dans commentaire ; ajouter cle ne suffit pas.
- Test HTTP local : 200, livraison mailto, sept champs retournes correctement. Donnees atteignent serveur de validation ; aucun email automatique vers krodi2001@gmail.com. Aucun email envoye pendant audit.
- Proposition uniquement : conserver route API Next, appeler API email transactionnelle Resend apres accord ; destinataire fixe krodi2001@gmail.com, From domaine controle/verifie, Reply-To email visiteur, sept champs dans message texte. Domaine d'envoi a confirmer ; Gmail reste destinataire. SMTP Gmail avec mot de passe application eligible possible si besoin sans domaine, compromis a valider.
- Variables proposees cote serveur : RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL, CONTACT_ALLOWED_ORIGINS. Aucun NEXT_PUBLIC ni secret dans Git/client. Vercel environnements distincts puis nouveau deploiement. Honeypot/limites/validation conserves ; origine controlee et rate limit effectif Vercel WAF propose, quotas/cout a valider. Delai client seul facilement contournable.
- Loading/double-clic existants conservables ; erreur conserve saisie ; succes seulement apres acceptation effective prestataire, sans promettre livraison boite. Test reception Gmail FR/EN, Reply-To, panne/cle manquante/anti-spam indispensable avant READY. Confidentialite a adapter au prestataire retenu.
- Docs officielles Resend/Vercel/Google consultees. Aucun fournisseur choisi/installe/configure, aucune modification formulaire/API/package/env, aucun compte cree. Journal seul actualise ; pas de commit/push/deploiement.

### CONTACT — GMAIL SMTP PREPARE — 2026-09-18

- User confirme Gmail envoi + reception krodi2001@gmail.com. Resend abandonne. Aucun domaine requis pour cette configuration.
- Route Node /api/contact -> Nodemailer SMTP Gmail TLS465. From/to fixes Gmail AWS. Reply-To email visiteur valide. Sept champs texte brut, optionnels vides marques —.
- Plus mailto dans soumission. UI FR/EN loading/envoi, succes seulement SMTP accepte, erreur conserve champs. Aucun faux succes si secret absent503/refus SMTP502.
- Validation serveur, honeypot, tailles/service, Origin allowlist obligatoire en production, JSON requis, limite3tentatives/email/10min par instance. Limite non distribuee : WAF Vercel avant production reste requis. Pas garantie exactement-une-fois.
- Secret GMAIL_APP_PASSWORD serveur uniquement ; CONTACT_ALLOWED_ORIGINS origines exactes. Aucun secret cree/ecrit/affiche. .env.local ignore Git. README configuration locale/Vercel + redeploiement + validation2etapes Google. User configure mot de passe application hors chat.
- Confidentialite FR/EN alignee traitement Gmail/Google + demandes boite AWS. Autres sections visuelles intactes.
- Fichiers phase : route.ts, Contact.tsx, dictionaries.ts, package.json, package-lock.json, README.md, journal.
- Lint/build/typecheck/diff-check PASS. npm install audit0vuln. HTTP7cas PASS : absenceconfig503, origin403, email/service/honeypot/longueur400, delai429. Aucun SMTP reel.
- Tests transport factice isole VM PASS : sept champs/to/replyTo, acceptation200, refus502, panne502, limite429. Uniquement test unitaire, aucune livraison simulee presentee comme reelle.
- Navigateur FR erreur sansconfig + valeurs conservees ; ENdesktop1440 meme resultat ; FRmobile375 form343px, aucun overflow. Console pas erreur/hydratation observee ; avertissement LCP 2e image Hero deja connu dev, hors scope.
- BLOCKER demeure : aucun mot de passe configure, aucune reception Gmail testee, WAF/deploiement Vercel non configures. Test reel boite/replyTo/FR/EN et SMTP Vercel requis avant production. Aucun commit/push/deploiement.

## FINAL PRE-PRODUCTION AUDIT — ALFRED WINNER SERVICES

- 2026-09-18, nouvelle mission finale. AGENTS/CLAUDE/journal/package/status/diff/configs lus. Next16.3.5 React19.2.8 Tailwind4.3.3 TS5.9.3 Nodemailer10.0.10 verifies. ACIM benchmark consulte uniquement. AWS3100, bot jamais touche.
- Homepage FR/EN parcourue navigateur : Hero/approche/methode/about/3expertises/6projets/Vision/fondateur/CTA/contact/footer. Relecture screenshots FRmobile375, ENdesktop1440, HeroEN430, tablettes768/820/1024 et footerFR1280. Design verrouille conserve.
- Responsive18configurations : FR+EN375/390/393/430/768/820/1024/1280/1440. Zero overflow, texte/controle hors ecran detecte ; H1unique, 10sections, images chargees sans casse observee. Footer572mobile/535.5tablette/334.5desktop conserve.
- Navigation clics : dropdown clavier Enter/Tab/Escape focus retour, menuFRmobile/tablette et ENmobile, logo/Accueil scroll0 apres fin animation, Projets/About/Contact/CTA Hero/final offset96 sous sticky81desktop. Back/forward et 404FR/EN retourhome testes. Six CTA services FR/EN valeurs finales correctes.
- Premier diagnostic preselection trop rapide : valeur lue avant hydratation. Essai useSearchParams retire apres comparaison initiale reussie. Aucun changement fonctionnel retenu, composant Contact restaure. NO CHANGE.
- Hero desktop3transitions/mobile2transitions observees ; hauteur480x360desktop et398x298.5mobile430 constante, rayon20px, hauteurpage stable. Pause Espace durable verifiee5.5s horsfocus puis repriseEnter. Aucun textecontrole visible. Reduced-motion implementation/CSS lus ; OS non emule, pas PASS comportement sous preference revendique.
- FormFR/EN : vide/obligatoires/emailinvalide/focus/labels/7champs/select/textarea/doubleclic/erreur sansconfig testes. Champs texte conserves, bouton redevenu disponible. HTTP15cas PASS : validesFR/EN503 ; origineabsente/interdite403 ; JSON/types/obligatoires/email/service/piege/longueur400 ; delai429 ; corps413 ; contenttype415. Success/loadingprolonge/reception SMTP reels non testes faute configuration.
- BLOCKER CONTACT FORM DELIVERY : route Node /api/contact + Nodemailer SMTP GmailTLS465 integree, plus mailto soumission. From/to krodi2001@gmail.com, Reply-To visiteur. GMAIL_APP_PASSWORD absent, CONTACT_ALLOWED_ORIGINS absent. Aucun email reel envoye/recu. Configurer secret horsGit/client, originesVercel, redeployer au stade autorise puis receptionGmail/Reply-To/7champsFR/EN indispensables.
- IMPORTANT/EXTERNAL : limite memoire3tentatives/email/10min parinstance, non distribuee ; WAF/limite parIP a configurer avant publication. Aucune infrastructure/service supplementaire cree. Quotas SMTP Gmail et fonctionnement depuis Vercel a valider.
- Facebook/LinkedIn cliques : page AWS et profil fourni identifies. WhatsApp footer/flottant cliques : conversation+2250748191100 confirmee, pas messageenvoye. URItel/mailto correctes lues ; activationtel bloquee politique navigateur, pas contournement ; mailto non active cette passe. Instagram absent ; aucun href#fictif.
- A11y : landmarks/lang/headings/alt/labels/ariaerrors/focus/skipversMAIN#top verifies. Socialblanc55%fondnavy conserve, focus2px observe. Pas audit lecteur ecran/appareilphysique/certificationWCAG revendique.
- Performance : NextImage/sizes/preloadpremierHero/lazy autres, fontlocale, ratios et cleanuptimers/listeners controles. Herooptimise1080WebP57710/142410octets testesHTTP. Pas scoreLighthouse ni mesuresCWVterrain ; stabilitecarousel uniquement observee.
- SEO/routing : FR/ENtitle/description/OG/favicon/lang verifies. Racine307/fr, pagesprincipales+4legales200, deuxinconnues404, robots200Disallow et sitemap200vide volontaires tant qu'originepublique/flagsSEO absents. Aucun domaine fictif. Hebergeur texteslegaux et droitsvisuels restent EXTERNAL a confirmer avantpublication.
- Gates apres restauration : lint/typecheck/build/diff-check PASS. Auditprod0vulnerabilite connue. Aucunenvsuivi/motifsecret/debugsrc detecte. Consoleongletsite27 FR/EN/legal/404 : []warn/error lors controles ; aucunehydrationerror observee. Pas validationproductionVercel revendique.
- Verdict NOT READY : livraisoncontact non configuree/non verifiee. Aucun autre defautlocal significatif confirme. Cette conclusion remplace READY base ancienparcoursmailto. Fichier retenu cettepasse : journaluniquement. Changements existants20fichierssuivis +8JPG et2routesnon suivies preserves ; rien stage, aucuncommit/push/deploiement/domaine.

### CONTENU UNIQUEMENT — 2026-09-18

- Deux descriptions projets raccourcies exactement selon demande FR + equivalents EN. Phrase livraison formulaire retiree FR/EN avec paragraphe JSX et cles inutilisees.
- Navigateur FR/EN : deux descriptions conformes, phrase absente, sept champs conserves. Aucun autre contenu/design/style/interactions/API modifie cette passe. Aucun commit/push.

## FINAL GITHUB SYNC — ALFRED WINNER SERVICES

- 2026-09-18. Depot AWS confirme, branche main, origin AlfredMusk/alfred-winner-services existant. Fetch : aucun commit distant absent localement. Audit final + corrections contenu FR/EN integres ; design conserve.
- Lint/typecheck/build/diff-check PASS. Aucun secret detecte dans candidats ; env sensibles ignores, references serveur GMAIL_APP_PASSWORD uniquement. Aucun credential commite. Code SMTP prepare, configuration/reception reelle restent a valider avant publication.
- Version applicative preparee pour GitHub/deploiement futur. Huit JPG sources inutilises racine conserves hors commit ; assets runtime public deja suivis. Pas modification autre projet. Vercel/envproduction/domaine/DNS non touches.

### FINAL PRODUCTION FIX — 2026-09-19

- Section Fondateur : photo/import/JSX/commentaires media retires. Bloc institutionnel texte seul conserve. Texte FR exact demande et equivalent EN ajoute. Aucun autre design/contenu change.
- Contact production Netlify diagnostique : POST /api/contact retourne 403 car CONTACT_ALLOWED_ORIGINS absent. Projet Netlify sans variable environnement. GMAIL_APP_PASSWORD absent aussi ; aucun faux succes et aucun secret ecrit.
- Variables a saisir manuellement dans Netlify : CONTACT_ALLOWED_ORIGINS avec origine publique exacte ; GMAIL_APP_PASSWORD serveur uniquement. Redeploiement requis apres saisie.
- FR/EN controles navigateur. Mobile 390px et desktop 1440px : zero image Fondateur, zero overflow, textes conformes, console propre.
- Routes locales principales/legales 200, inconnue 404. API locale sans secret 503 attendu ; API production sans origine configuree 403 attendu. Aucun envoi SMTP simule.
- Lint PASS ; TypeScript PASS ; build PASS ; git diff check PASS. Scan secret propre ; placeholder README uniquement, aucun env suivi.

### AUDIT SENIOR PRODUCTION — 2026-09-19

- Production Netlify FR/EN + quatre pages legales : contenu identique local. Racine redirige FR ; inconnue 404. 136 routes/ressources internes referencees HTTP200. Favicon PNG declare charge ; /favicon.ico non utilise.
- Responsive FR/EN : 375/390/430/768/820/1024/1280/1440 sans overflow document ni texte tronque detecte. Inspections visuelles Hero/menu/contact/footer/Founder. Menu mobile et services desktop + Escape/focus controles.
- Defaut reproduit : badge Netlify recouvre WhatsApp flottant. Correction unique composant : relever lien uniquement lorsque iframe nl-badge-frame presente ; garder position locale sans badge et detection collisions contenu existante.
- Formulaire : SMTP FR/EN reels deja recus ce jour, sept champs/Reply-To verifies ; dernier envoi navigateur Visiteur test AWS recu18:04. Aucun nouvel email inutile. Validation EN vide/focus observee ; API production origine interdite403, champs invalides400. Secret serveur seulement, aucunenvsuivi. Limiteur memoire par instance reste protection complementaire, non distribuee.
- SEO temporaire : noindex/robotsDisallow/sitemapvide et canonical/OGimage absents tant que AWS_SITE_URL/flags non actives. Configuration finale differee jusqu'au domaine HTTPS. AucunDNS modifie.
- Images NextImage tailles responsives, preload premier Hero, formats WebP HTTP200. Console aucun warning/error sur accueil lors controle ; pas de score Lighthouse ni CWVterrain revendique.
- Lint/TypeScript/build/diff-check PASS. Push/redeploiement puis verification publique de la correction a effectuer. Huit JPGsources non suivis preserves.

- Redéploiement 9ae5367 publié Netlify ; FR/EN huit largeurs retestees avec innerWidth controle : zero overflow ; gap20px badge. WhatsApp visible quand il ne couvre pas le contenu, masque par mecanisme existant sur certaines zones mobiles. Console warn/error vide.
- Relecture pageslegales : ancien hebergeur en attente encore visible. Remplace FR/EN mentions/confidentialite par Netlify Inc. confirme ; reference https://www.netlify.com/privacy/ consultee. Aucune autre donneelegale modifiee.

- Version063ab7e publiee Netlify. Quatre pageslegales publiques FR/EN : Netlify present, ancienplaceholder absent, H1unique et aucunoverflow375. Consoledernieronglet warn/error vide. Treize bundlesclient controles : aucun marqueurSMTP/envserveur ni sourcemap publique. TestsSMTP deja recus conserves, pas nouvel envoi pour correction sans lien avec formulaire.
- Limites : pas mesure Lighthouse/CWVterrain ni certificationWCAG ; reducedmotion/doublesubmit controles dans code. LinkedIn refuse requetes automatiseesHTTP999 ; URL exacte fournie conservee. Domaines/DNS inchanges.
- 2026-09-19 : adresse publique remplacee par contact@alfredwinnerservices.com en FR/EN et SEO ; destination SMTP interne krodi2001@gmail.com conservee.

---

## [GOOGLE / MAPS / LOCAL SEO] — FINALISE 2026-09-22

DONE:
- audit site public: www HTTPS, /fr, /en, robots.txt, sitemap.xml, pages legales -> OK
- NAP verifie: nom, adresse, tel, email pareil footer/contact/legal/schema FR+EN
- schema JSON-LD rendu plus complet: LocalBusiness + SoftwareCompany, adresse, zone Abidjan/Cote d'Ivoire, contact, horaires
- sitemap ajoute pages legales FR+EN
- docs Google faites: checklist fiche, plan photos, avis/reponses/posts
- fiche Google deja unique, nom principal garde, pas de doublon
- logo Google importe avant; services software + immobilier soumis a review Google

IMPORTANT:
- pas de faux avis
- pas de fausse photo/bureau/equipe/projet
- pas de categorie finance reglementee inventee
- Google doit encore valider services/categorie puis il faut vraie couverture + vraies photos

NEXT:
- npm lint / typecheck / build
- git commit + push apres tests

---

## [FACEBOOK] — PREPARATION SANS SESSION 2026-09-22

DONE:
- page publique connue ouverte, mais Facebook demande connexion
- aucun acces admin/Meta Business Suite prouve -> aucune modif Facebook faite
- docs faites: audit/checklist, strategie, 10 posts, 10 reels, messages
- logo, couverture, bio, description, coordonnees et CTA prepares

IMPORTANT:
- connecter session officielle puis verifier page, roles, anciennes publications, securite
- pas de pub, pas de depense, pas de suppression, pas de post sans validation

---

## [FACEBOOK] — COORDONNEES PAGE 2026-09-22

DONE:
- session officielle connectee et acces gestion Page confirme
- adresse publique corrigee : Cocody Angre — Nouveau CHU, Abidjan, Cote d'Ivoire
- horaires publics : lundi-samedi 08:00-22:00 ; dimanche ferme
- URL site public mise en HTTPS : https://www.alfredwinnerservices.com
- aucune publication creee depuis les changements de coordonnees

PENDING:
- Facebook demande mot de passe proprietaire pour soumettre le changement de nom Alfred Winner Services
- aucun mot de passe lu, stocke ou transmis par Codex

## [FACEBOOK] — FINALISATION PAGE 2026-09-22

DONE:
- bio publique : Software & IA • Finance • Immobilier & BTP • Conseil + phrase d'accompagnement
- email public : contact@alfredwinnerservices.com
- site HTTPS et téléphone déjà confirmés
- quatre services publics enregistrés : Software & IA, Immobilier & BTP, Finance / technologies financières, Conseil
- premier post officiel publié avec le texte AWS validé
- logo et couverture existants conservés

PENDING:
- nom public encore affiché « Alfred winner services » ; Facebook demande le mot de passe propriétaire pour soumettre le changement
- nom de profil / username à définir dans Facebook
- association WhatsApp en attente du code envoyé par Meta (à faire par le propriétaire)
- message d'accueil Messenger non confirmé
- premier Reel : ASSET REQUIRED (aucune vidéo officielle fournie)

## [FACEBOOK] — LOGO ET VÉRIFICATION FINALE 2026-09-22

DONE:
- photo de profil remplacée par le logo AWS déjà importé sur Facebook
- services, email public, téléphone, site et adresse revérifiés
- premier post officiel visible sur la page

PENDING:
- nom et username nécessitent l'interface Facebook dédiée (nom : mot de passe propriétaire)
- WhatsApp : numéro valide, bouton d'envoi du code prêt ; ne pas déclencher sans intervention du propriétaire
- accueil Messenger non confirmé
- aucun Reel sans asset vidéo officiel

## [FACEBOOK] — WHATSAPP NON ASSOCIÉ 2026-09-22

- WhatsApp volontairement laissé sans bouton ni association, selon instruction utilisateur.
- Page publique conserve les coordonnées classiques et Messenger disponible.
- Checklist Meta reste à 93 % car Meta compte l'association WhatsApp et le Reel parmi les tâches facultatives.

---

## [SITE] — REPOSITIONNEMENT SOFTWARE IA FINANCE 2026-09-22

DONE:
- repositionnement editorial : Software / IA / Finance remis au premier plan.
- immobilier conserve comme branche complementaire Immobilier & BTP.
- conseil garde comme accompagnement transversal.
- architecture et design inchanges.
- SEO conserve et title/meta ajustes sans casser sitemap, robots, canonical.

---

## [SITE] — HERO IMAGE SOFTWARE 2026-09-22

DONE:
- deuxieme image du carousel Hero remplacee : Immobilier retire.
- image existante Software & IA utilisee en FR et EN.
- structure, dimensions, transition, autoplay et responsive inchanges.

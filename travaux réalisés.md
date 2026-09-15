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

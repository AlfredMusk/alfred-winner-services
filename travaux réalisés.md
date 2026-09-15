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

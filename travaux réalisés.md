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

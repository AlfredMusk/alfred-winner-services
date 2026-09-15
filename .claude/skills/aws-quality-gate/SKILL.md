---
name: aws-quality-gate
description: Controle qualite d'une section du site AWS avant de la soumettre a validation. A utiliser quand une section vient d'etre codee, avant un commit, ou quand l'utilisateur demande de verifier la qualite, l'accessibilite ou de lancer les tests. Verifie TypeScript, lint, HTML semantique, accessibilite de base, console, liens et prefers-reduced-motion.
allowed-tools: Bash, Read, Grep
---

# AWS — Quality gate

A passer AVANT de demander la validation d'une section.

## 1. Chaine automatique

```bash
npm run typecheck && npm run lint && npm run build
```

Les trois doivent passer. `typecheck` echoue avant le premier build :
les types `LayoutProps` / `PageProps` sont generes par Next dans `.next/types/`.
Dans ce cas, lancer `npm run build` d'abord.

## 2. HTML semantique

- [ ] Un seul `<h1>` par page ; hierarchie h1 > h2 > h3 sans saut
- [ ] `<header>` `<nav>` `<main>` `<section>` `<footer>` plutot que `<div>` partout
- [ ] Listes de liens dans `<ul>` / `<li>`
- [ ] `<button>` pour une action, `<a>` pour une navigation — jamais l'inverse

## 3. Accessibilite de base

- [ ] Chaque `<img>` a un `alt` (vide `alt=""` si purement decoratif)
- [ ] Contraste texte/fond suffisant (>= 4.5:1 pour le texte courant)
- [ ] Navigation clavier : Tab atteint tous les elements interactifs
- [ ] Focus visible, jamais `outline: none` sans remplacement
- [ ] `aria-label` sur les boutons icone sans texte
- [ ] `lang` correct sur `<html>` (fr)

## 4. Console

Ouvrir localhost:3100, lire les messages console.
Zero erreur. Zero warning React (cles manquantes, hydratation).
Aucun `console.log` oublie dans le code.

## 5. Liens et interactions

- [ ] Aucun `href="#"` laisse en place sans raison
- [ ] Liens externes : `target="_blank"` + `rel="noopener noreferrer"`
- [ ] Les etats hover / focus / active existent

## 6. Animation

Si la section anime quelque chose :

```css
@media (prefers-reduced-motion: reduce) { /* neutraliser */ }
```

## 7. Performance evidente

- [ ] Images via `next/image`, pas `<img>` brut
- [ ] Pas de dependance ajoutee sans raison
- [ ] Pas de police supplementaire sans decision

## Rapport

Lister PASS / FAIL par point. Un FAIL bloque la validation.
Ne pas annoncer PASS sur un point non reellement verifie.

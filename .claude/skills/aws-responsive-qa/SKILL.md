---
name: aws-responsive-qa
description: Verifier une section du site AWS sur mobile, tablet, laptop, desktop et large desktop. A utiliser apres avoir code ou modifie une section visuelle, ou quand l'utilisateur demande de tester le responsive, de verifier l'affichage mobile, ou signale un debordement/overflow. Controle overflow, spacing, typographie, navigation, images, touch targets, alignement et breakpoints.
allowed-tools: Bash, Read, Grep
---

# AWS — QA responsive

Cible : http://localhost:3100

## Les 5 tailles obligatoires

| Nom     | Largeur x Hauteur | Ce qu'on verifie en priorite          |
|---------|-------------------|---------------------------------------|
| mobile  | 375 x 812         | overflow, menu burger, touch targets  |
| tablet  | 768 x 1024        | bascule 1 colonne -> 2 colonnes       |
| laptop  | 1280 x 800        | largeur de container, lisibilite      |
| desktop | 1440 x 900        | equilibre general                     |
| large   | 1920 x 1080       | contenu qui ne s'etire pas a l'infini |

Outils navigateur : `resize_window` (presets mobile/tablet/desktop ou
width/height personnalises), puis `computer` action `screenshot`.
Recharger la page apres un changement de taille : certains comportements
se decident au chargement.

Remettre le preset `desktop` a la fin.

## Checklist par taille

- [ ] OVERFLOW — aucun scroll horizontal. Verifier :
      `document.documentElement.scrollWidth > window.innerWidth`
- [ ] SPACING — marges laterales >= 16px, pas de contenu colle aux bords
- [ ] TYPOGRAPHY — titres lisibles, pas de texte < 14px, pas de mot coupe
- [ ] NAVIGATION — menu accessible et utilisable a chaque taille
- [ ] IMAGES — pas de deformation, `max-width: 100%`, ratio conserve
- [ ] TOUCH TARGETS — cibles cliquables >= 44x44px sur mobile
- [ ] ALIGNMENT — grilles alignees, pas d'element orphelin
- [ ] BREAKPOINTS — la bascule se fait au bon endroit, sans etat casse entre deux

## Rapport

Une ligne par taille : OK, ou le probleme precis + la correction proposee.
Ne pas declarer OK une taille non reellement observee.

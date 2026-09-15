@AGENTS.md

# CLAUDE CODE — REGLES DE COMPORTEMENT

AGENTS.md (importe ci-dessus) est le contrat commun.
Ce fichier ajoute ce qui est propre a Claude Code.

## AVANT TOUTE MODIFICATION

1. Lire `AGENTS.md`.
2. Lire `travaux réalisés.md` pour savoir ou en est le projet.
3. Identifier la PHASE ACTIVE et rester strictement dans son scope.

## SCOPE DE PHASE

- Ne JAMAIS avancer automatiquement a la phase suivante.
- Ne JAMAIS anticiper une phase future "puisque c'est rapide".
- Attendre une commande explicite de l'utilisateur (ex : `GO PHASE 2`).
- Si une tache demandee sort du scope de la phase : le dire, puis attendre.

## METHODE DE TRAVAIL

- Travailler directement dans le workspace, fichiers visibles.
- Changements petits et verifiables, jamais un gros bloc opaque.
- Expliquer tout changement important (concept avant code).
- Tester apres chaque vraie etape, pas seulement a la fin.
- Montrer les erreurs rencontrees et leur correction, ne pas les masquer.

## PREUVE

Ne rien affirmer sans l'avoir localise dans le code ou prouve par un test.
Un lint qui affiche "0 erreur" doit etre verifie (a-t-il analyse quelque chose ?).
"Rien a faire" est une conclusion valide si elle est demontree.

## ENVIRONNEMENT — INTERDIT

- NE JAMAIS toucher a ALFRED AI TRADER
  (ports 3000/3001/3002, processus `next-server`, `src/server/main.ts`,
   dossier `~/Documents/Codex/2026-09-09/t/outputs/alfred-ai-trader`).
- Ne pas tuer un processus qui n'appartient pas a ce projet.
- Le site AWS reste sur le port 3100.

## CONTENU BUSINESS

Ne jamais inventer clients, chiffres, partenaires, temoignages,
certifications, autorisations ni realisations.
Placeholder explicite + demande de validation si l'info manque.

## DESIGN

- Ne jamais copier ACIM (code, textes, identite, UI).
- Photos reelles prioritaires sur les images generees.
- Preserver performance, responsive et accessibilite a chaque etape.

## FIN D'ETAPE

- Mettre a jour `travaux réalisés.md`.
- Commit Git logique et cible.
- Puis s'arreter et attendre la validation.

## SKILLS DU PROJET

- `aws-frontend-section` : construire UNE section Front-End.
- `aws-responsive-qa`    : verifier une section sur les 5 tailles d'ecran.
- `aws-quality-gate`     : controle qualite avant validation d'une section.

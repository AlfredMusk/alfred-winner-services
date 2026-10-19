# Projets & Réalisations — crédibilité finale — 19 octobre 2026

## Décision et changements

- Grille validée conservée : six blocs, ordre/noms/catégories/numéros, séparateurs et espacements inchangés.
- Suppression du lien « Découvrir la réalisation », du composant ProjectDetails, de ses styles, de ses textes FR/EN et de ses données spécifiques devenus inutilisés. Aucune marge réservée restante.
- Copie publique de la capture supprimée car exclusivement utilisée par ce panneau ; original identique conservé dans `docs/projects-assets/aws-site-officiel.webp`.
- Textes tourisme, fitness et multi-actifs formulés comme projets et objectifs, sans supposer une livraison. Texte conception web précisé comme réalisation interne en ligne avec exemple AWS vérifiable. Descriptions marchés/IA déjà explicites et prudentes : conservées.
- Aucune mention administrative publique, badge ou nouvelle réalisation.
- Invitation de contact existante conservée. La section suivante est Vision, suivie du Fondateur avant le CTA final : aucun double appel immédiatement consécutif. Destination inchangée `#contact`, formulaire non modifié.

## Audit des six projets

| Projet conservé | Preuves dans les ressources | Qualification justifiée | Validation humaine / preuves manquantes |
|---|---|---|---|
| 01 — Plateforme de découverte touristique | Description FR/EN existante, axe tourisme Côte d'Ivoire | Projet documenté au niveau de son objectif ; achèvement non vérifié | Livraison, fonctions développées, capture, démo, éventuel contexte interne/formation |
| 02 — Expérience web Fitness | Description FR/EN, univers services/identité fitness | Projet web, sans référence client ni produit commercial affirmé | Livraison, fonctions, capture, démo et contexte |
| 03 — Plateforme d'analyse de marchés | Texte existant explicitement « logiciel expérimental » | Prototype / expérimentation ; aucune performance financière revendiquée | Fonctions vérifiables, capture non confidentielle, maturité ; aucune inspection du projet AI Trader |
| 04 — Suivi & visualisation multi-actifs | Description FR/EN de suivi/organisation/visualisation | Projet d'interface ; livraison et statut commercial non vérifiés | Fonctions effectives, capture non confidentielle, démo, maturité |
| 05 — Conception de sites web modernes | Source du site AWS, package.json, site public et capture authentique déjà vérifiés | Réalisation interne en ligne : le site institutionnel AWS ; aucune mission client externe affirmée | Autres références éventuelles, droits de présentation ; pas de promesse de fonctionnement SMTP |
| 06 — Solutions & intelligence artificielle | Description existante d'expérimentations logiciel/automatisation/agents | Expérimentations ; pas de produit commercial finalisé affirmé | Solutions précises, fonctions démontrables, capture, démo et maturité |

Les ressources disponibles ne permettent pas de qualifier 01, 02 et 04 comme livraisons achevées. Seul l'exemple du site AWS est directement documenté comme réalisation interne en ligne. Cela ne constitue pas une validation globale de toutes ses fonctions de production.

## Secteurs et éventuelles réalisations supplémentaires

- Software/Web, IA et Finance sont représentés par les six axes existants. La présence d'une catégorie ne prouve ni client ni livraison.
- Immobilier/BTP : photos et textes de secteur disponibles dans `public/images/expertises/`, `docs/google-maps-assets/`, `docs/google-photo-plan.md` et `docs/google-reviews.md` ; ils ne fournissent pas de dossier attribuable à AWS avec rôle précis, périmètre, dates et preuve de réalisation.
- Multiservices/accompagnement : présentation générale dans les textes du site, mais aucun cas concret distinct et vérifiable identifié dans les ressources consultées.
- Aucune réalisation supplémentaire suffisamment documentée identifiée. Aucune nouvelle entrée ajoutée. Les photos génériques/thématiques ne sont pas des preuves de livraison.

## Recommandation

Conserver les six axes pour le moment, sous l'introduction actuelle « projets et expérimentations ». Ne pas les présenter comme six missions clients achevées. Enrichir en priorité leurs preuves, plutôt que multiplier les entrées pour couvrir tous les secteurs.

Une future entrée Immobilier ou Multiservices serait pertinente uniquement avec un projet concret : contexte, rôle exact AWS, périmètre effectivement réalisé, dates, statut, livrables/preuves et autorisation de publication. Ne pas convertir artificiellement une offre de service en réalisation.

## Contrôles

Voir le journal pour les résultats des tests exécutés. Aucun commit, push ou déploiement. Hors section Projets, le contenu et les configurations sont conservés.

### Résultats exécutés

- Playwright Chrome : 14 combinaisons FR/EN × 320/375/390/768/1024/1440/1920. Six blocs/ordre, grille 1 ou 2 colonnes et 6 ou 3 rangées, aucun overflow de section, aucun lien de découverte/panneau/visuel, CTA existant fonctionnel au clavier : PASS.
- Hover séparateur 40→56px, reduced-motion, contenu disponible sans JavaScript, absence d'erreur console/pageerror : PASS.
- Contrastes conservés : titres 9,06:1 ; descriptions 7,65:1 ; catégories 4,75:1, sur fond blanc.
- Empreintes des autres composants/configurations inchangées ; traductions hors Projets identiques ; noms/catégories/IDs conservés.
- Captures desktop et mobile examinées. Lint/TypeScript/build exécutés avec succès ; pas de Lighthouse ni de mesure terrain Core Web Vitals.
- Débordement du footer préexistant à 320px hors périmètre, non modifié.

> **Évolution du 19 octobre :** la grille éditoriale est conservée. Un panneau documenté du site AWS et une invitation de contact sont décrits dans `projects-editorial-details-2026.md`. La capture est réutilisée uniquement dans ce panneau ; les anciens filtres/cartes/placeholders restent supprimés.

> **19 octobre 2026 — présentation catalogue refusée et retirée.**
> La section utilise désormais le modèle éditorial original : six blocs sans cartes, filtres ou illustrations. Ce document conserve l’inventaire des preuves, pas la description du rendu actuel.
> La capture authentique AWS est archivée dans `docs/projects-assets/aws-site-officiel.webp`, hors des ressources publiques. Les cinq captures restent non documentées ; aucune étude de cas n’a été inventée. Seul le lien vérifié du site AWS reste affiché.

# Portfolio AWS — audit et aperçu local — 18 octobre 2026

## Périmètre / preuves

- Six entrées et descriptions : `src/i18n/dictionaries.ts`, blocs `projets` FR/EN. Contenus conservés.
- Inspection `public/`, `docs/google-maps-assets/` et huit JPG racine : photos d'activité, illustrations, logos ; aucune capture attribuable aux cinq applications manquantes. Les JPG restent intacts.
- Aucune URL de démonstration de ces applications dans les ressources du dépôt ; aucun statut de livraison confirmé.
- `docs/expansion-audit.md` décrit les six axes comme expérimentations, sans client cité. Document historique, pas preuve de livraison.
- Site AWS vérifié publiquement : `https://www.alfredwinnerservices.com/fr`, titre « Alfred Winner Services | Software, IA, Finance & Immobilier ». Capture fidèle du 18/10/2026, sans données privées, extraite 1440×650 ; WebP 67 336 octets. Uniquement présentée comme exemple de conception web.
- Aucun accès/modification à ALFRED AI TRADER, aucun processus ou port de ce projet touché.

## Inventaire par projet

| Projet | Preuve disponible | Qualification affichée | Visuel / lien | Manquant |
|---|---|---|---|---|
| Découverte touristique | Description FR/EN existante | Statut à confirmer | Illustration explicitement identifiée | Captures, démonstration, statut, fonctionnalités/stack vérifiées |
| Fitness | Description FR/EN existante | Statut à confirmer | Illustration explicitement identifiée | Captures, démonstration, statut, fonctionnalités/stack vérifiées |
| Analyse de marchés | Texte « logiciel expérimental » | Expérimentation | Illustration explicitement identifiée | Captures, démonstration, fonctions/stack vérifiées ; aucune performance revendiquée |
| Suivi multi-actifs | Description FR/EN existante | Statut à confirmer | Illustration explicitement identifiée | Captures, démonstration, statut, fonctions/stack vérifiées |
| Conception web | Code du site AWS + site public accessible | Exemple en ligne | Capture authentique site AWS ; lien vers son domaine officiel | Autres sites/clients non documentés, non ajoutés |
| Solutions IA | Texte « expérimentations » existant | Expérimentation | Illustration explicitement identifiée | Captures, démonstration, maturité de chaque solution, fonctions/stack vérifiées |

Pas d'étude de cas inventée, pas de faux bouton « découvrir ». Les cartes sans détail documenté restent informatives, sans action fictive. Les illustrations géométriques représentent un état de documentation, jamais une interface produit.

## Implémentation

- Grille HTML `ul/li/article` : une colonne avant 768px, deux ensuite ; six cartes.
- `ProjectCard` réutilisable ; ressources et libellés locaux FR/EN dans `project-data.ts`. Dictionnaires globaux inchangés.
- `locale` passé à Projets depuis la page existante ; aucune nouvelle route.
- Filtres avec boutons natifs, aria-pressed, aria-controls, résultat annoncé via status : Tous 6 ; Web 3 ; Finance 2 ; IA 2. Analyse de marchés appartient à Finance et IA selon sa description.
- IntersectionObserver natif pour apparition douce ; contenu jamais masqué par défaut, visible sans JavaScript ; reduced-motion respecté. Hover 250ms.
- Un seul WebP lazy-loaded, dimensions explicites, object-fit contain pour préserver la capture. Aucun ajout de dépendance, iframe ou vidéo.
- Aucune modification Hero/Navbar/footer/services/contact/traductions globales/configuration.
- Publication, commit et push interdits jusqu'à validation.

## Limites

Les cinq captures manquantes devront être fournies ou issues de démonstrations autorisées pour constituer un portfolio entièrement photographique. Ne pas présenter les placeholders comme des captures réelles. Aucune métrique Core Web Vitals terrain revendiquée.

## Vérifications exécutées

- ESLint, TypeScript et build Next : PASS.
- Playwright Chrome : FR/EN × huit largeurs 320/375/390/768/1024/1280/1440/1920, colonnes, absence d'overflow dans la section, filtres 6/3/2/2, aria-pressed et compteur, Tab/Entrée/Espace : PASS.
- Image chargée, lien officiel sécurisé, aucun href fictif ; contenu disponible sans JavaScript ; reduced-motion : PASS.
- Aucune erreur console ou pageerror observée pendant ces tests.
- Empreintes des fichiers protégés inchangées : Hero/HeroMedia/styles Hero, Navbar, Footer, Contact, Expertises, Apropos, dictionnaires.
- Vérification visuelle desktop/mobile effectuée, captures avant/après locales.
- Pas de Lighthouse ni mesure terrain CWV exécutés pour cette phase ; aucun score revendiqué.
- Le débordement préexistant du footer à 320px reste hors périmètre et inchangé.

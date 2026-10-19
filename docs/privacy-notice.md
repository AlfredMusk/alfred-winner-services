# Notice de confidentialité et de sécurité

Notice informative non modale, FR/EN, partagée dans le layout ; aucun consentement
marketing n'est recueilli. Le lien permanent du footer mène à
`/[locale]/confidentialite#privacy-security`.

`localStorage` contient uniquement `aws:privacy-notice:dismissed` avec la version
`2026-10-19.1` après fermeture ou choix « En savoir plus ». Aucun identifiant de
visiteur, date, donnée de formulaire ni consentement n'est enregistré. La valeur
reste jusqu'à suppression des données par le visiteur/navigateur ou remplacement
lors d'une nouvelle version ; aucune expiration artificielle ne fait réapparaître
le panneau régulièrement. Même origine = même préférence FR/EN et entre pages.
Les événements storage synchronisent les autres onglets. Sans stockage autorisé,
la fermeture fonctionne en mémoire et peut être perdue au rechargement.

Une évolution significative de la politique exige d'incrémenter
`PRIVACY_NOTICE_VERSION` dans `src/lib/privacy-notice.ts`. Ce numéro n'est pas
une preuve de consentement. Ne pas le changer pour une simple modification visuelle.

Avant tout ajout de traceurs soumis au consentement : remplacer la notice par une
CMP effective, bloquer ces traceurs avant décision et offrir acceptation/refus/
personnalisation/retrait équivalents. Aucun mécanisme ne peut découvrir et intégrer
magiquement tous les futurs traceurs ; cette vérification fait partie de chaque
ajout d'intégration. Ne pas réutiliser la fermeture comme autorisation marketing.

Panneau fixe, sans overlay ni autofocus, titre accessible, lien natif, fermeture
44×44, focus remis au contenu sans défilement à la fermeture. Les petits écrans
et zones sûres sont pris en compte ; panneau défilable si hauteur réduite.

La politique décrit seulement les protections constatées, sans garantie absolue.
Aucune modification du Hero, de la navbar, des projets ou du formulaire.

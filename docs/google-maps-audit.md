# Audit Google Maps — Alfred Winner Services

Vérification : 24 septembre 2026 (vue publique, sans connexion Google).

Fiche : https://www.google.com/maps/place/Alfred+Winner+Services/@5.3862285,-3.9827405,17z/data=!3m1!4b1!4m6!3m5!1s0xfc193986209b5b9:0xed59dd362b541a39!8m2!3d5.3862285!4d-3.9827405!16s%2Fg%2F11zxq3xgc4

## État constaté

| Champ | Maps | Site |
| --- | --- | --- |
| Nom | Alfred Winner Services | identique |
| Catégorie | Software company | cohérente avec Facebook |
| Adresse | Nouveau CHU, Angré, Abidjan | Cocody Angré — Nouveau CHU, Abidjan, Côte d'Ivoire |
| Téléphone | 07 48 19 1100 | (+225) 07 48 19 11 00 |
| Site | alfredwinnerservices.com | identique |
| Horaires | lun–sam 8 h–22 h, dimanche fermé | identique (`lib/seo.ts`) |
| Photos | aucune | logo + couverture + 3 photos prêts |
| Description | aucune | proposée ci-dessous |
| Avis | 1 avis, 5,0 (« Perfect », auteur « eze ») | aucun avis affiché sur le site |

Propriété de la fiche : **non confirmée** (bouton « Suggest an edit », vue limitée). Le footer du site ne lie pas Maps tant que ce point n'est pas confirmé.

## Kit visuel — `docs/google-maps-assets/`

| Fichier | Où l'utiliser |
| --- | --- |
| `logo-carre-720x720.png` | Logo de la fiche |
| `maps-couverture-1024x576.jpg` | Photo de couverture de la fiche |
| `photo-software-ia-1200x900.jpg`, `photo-finance-1200x900.jpg`, `photo-immobilier-btp-1200x900.jpg` | Galerie, catégorie « Ajouter des photos » |
| `facebook-couverture-1640x624.jpg` | Couverture de la Page Facebook (même style) |

Les photos de services sont des illustrations, pas des preuves de locaux ou de réalisations. Ajouter dès que possible de vraies photos de l'enseigne, de l'accueil et du bureau.

## Textes prêts à coller (à valider par Alfred)

Description (293 caractères, limite Google 750) :

> Alfred Winner Services (AWS) est une entreprise ivoirienne basée à Abidjan, à Cocody Angré. Elle développe des solutions en Software et Intelligence Artificielle et en technologies financières, et accompagne des projets immobiliers et entrepreneuriaux. INVESTIR · CONSTRUIRE · INNOVER.

Services : Software & IA · Bourse & Finance · Immobilier & BTP (uniquement si le service est réellement fourni).

Réponse à l'avis existant :

> Merci pour votre retour. Toute l'équipe d'Alfred Winner Services reste à votre disposition.

Adresse à saisir : `Cocody Angré — Nouveau CHU, Abidjan, Côte d'Ivoire`. Téléphone : `+225 07 48 19 11 00`.

## Actions d'Alfred (compte Google requis)

1. Ouvrir Google Business Profile et confirmer que la fiche est bien gérée par Alfred (sinon la revendiquer, sans doublon).
2. Modifier le profil : adresse complète, téléphone, description, services.
3. Photos : logo, couverture, puis les trois photos de services.
4. Vérifier l'épingle sur l'entrée réelle du lieu.
5. Répondre à l'avis, puis demander de vrais avis à de vrais clients. Jamais d'avis rédigés à leur place.
6. Une fois la propriété confirmée : relier l'adresse du footer à cette fiche (FR/EN) et étudier `sameAs`.

## Non fait, volontairement

- Connexion à un compte Google : interdite à l'assistant.
- Lien Maps dans le footer : attend la confirmation de propriété (règle du `Footer.tsx`).
- Aucun avis, chiffre ou service inventé.

# Audit expansion AWS — 24 septembre 2026

Base : code du dépôt + site en production `https://www.alfredwinnerservices.com`.

## 1. Existe déjà

- Site one-page FR/EN (Next.js 16, Tailwind 4) : Hero, Approche, Méthode, À propos, Expertises (3 pôles), Projets (6 axes), Vision, Fondateur, CTA final, Contact.
- Pages légales FR/EN (mentions légales, confidentialité), 404 localisée, redirection `/` vers `/fr`.
- Formulaire de contact : nom, email, téléphone, entreprise, service (6 options), type de projet, description ; API `/api/contact` (validation, honeypot, limite de débit par instance, envoi Gmail).
- WhatsApp : bouton flottant + footer, message prérempli unique, mention « Compte vérifié par Meta ».
- SEO : title/description, canonical, hreflang, Open Graph, JSON-LD LocalBusiness, `sameAs` Facebook, sitemap (accueil + légales), robots.
- Sécurité : CSP, HSTS, X-Frame-Options DENY, nosniff, Permissions-Policy (Netlify).
- Production en ligne (www), 301 depuis l'apex, HTTPS, 404 propres.

## 2. Manque réellement

- Pages détaillées par activité (Software & IA, Finance, Immobilier, BTP) : n'existent pas, tout tient dans la home.
- BTP : pas de pôle propre (capacités BTP absentes, seulement Immobilier).
- Demande de devis : pas de budget ni de délai, décision d'Alfred ; WhatsApp = champ « Téléphone / WhatsApp » déjà présent.
- WhatsApp : message unique, pas de message par service.
- FAQ, témoignages, portfolio détaillé (les 6 axes sont des expérimentations, aucun client cité).
- Lien vers Google Maps / fiche Business (propriété non confirmée).
- Suivi des demandes (leads) : uniquement un email, pas de tableau de suivi.

## 3. À améliorer

- Un seul CTA de conversion lourd (formulaire) ; ajouter parcours WhatsApp par service.
- SEO : une seule page indexable par langue ; les mots-clés ciblés (Abidjan, Côte d'Ivoire, IA, BTP) n'ont pas de page dédiée.
- Limite de débit en mémoire (inefficace en serverless) : envisager une règle WAF/hébergeur.
- Photos de services = illustrations : à remplacer par de vraies photos.

## 4. Cinq prochaines actions

1. Pages détaillées par activité (structure `[locale]/services/[slug]`), FR/EN, sans promesse de gains.
2. Formulaire de devis enrichi (service, budget, délai, WhatsApp) + message WhatsApp par service.
3. Pôle BTP dans les expertises (contenu validé par Alfred).
4. FAQ par activité + architecture témoignages/projets (vide tant que rien de réel).
5. Maillage Site, Facebook, WhatsApp, Google Business, formulaire : liens et sameAs une fois la propriété Maps confirmée.

## 5. Fait immédiatement

- `sameAs` Facebook dans le JSON-LD (`src/lib/seo.ts`), sans effet visuel.
- **Bug corrigé (présent en production)** : la liste blanche de services de `/api/contact` était écrite à la main et rejetait « Immobilier & BTP » et « Finance & technologies financières » (et EN). Elle est maintenant dérivée des dictionnaires FR/EN (`route.ts`). Testé : tous les services passent la validation, valeurs inconnues rejetées.
- Devis : budget et délai essayés puis **retirés à la demande d'Alfred** (24/09/2026). Le formulaire reste inchangé côté champs.
- Commentaire obsolète « Vercel » remplacé par « Netlify ».

## 6. Risques

- **Déploiements Netlify gelés** (crédits épuisés) jusqu'au 17/10/2026 : la production ne reflète pas les derniers commits (mention Meta Verified absente en ligne).
- **4 commits locaux non poussés** sur GitHub (`main` en avance de 4).
- Aucune promesse de rendement sur la page Finance.
- Contenu BTP et devis : ne rien inventer (clients, chiffres, certifications).
- Formulaire : dépend de variables d'environnement Gmail non versionnées.
- Aucun changement DNS/domaine, Meta Verified ou paiement sans accord d'Alfred.

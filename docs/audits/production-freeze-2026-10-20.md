# AWS — Audit final et référence stable 2026

Date : 20 octobre 2026. Domaine : https://www.alfredwinnerservices.com.
Périmètre : audit ciblé de la version validée, sans refonte.

## Corrections constatées

- Liens de langue : nom accessible enrichi du libellé visible FR/EN (WCAG 2.5.3).
- Changement de langue : conservation de la query et de l'ancre lors de la navigation client, notamment pour la présélection du service dans Contact.
- Notice : complément de contexte FR/EN réservé aux lecteurs d'écran sur le lien vers la confidentialité. Texte visible, dimensions, fermeture et stockage inchangés.
- JSON-LD : retrait du type inexistant SoftwareCompany, conservation de LocalBusiness. Vérification du vocabulaire officiel : https://schema.org/version/latest/schemaorg-current-https.jsonld ; SoftwareCompany répond HTTP 404.
- Aucun changement de photographie, de style, de description de projet ni de logique d'envoi.

## Infrastructure et sécurité

- Hébergement réellement constaté : Cloudflare Workers + OpenNext, deux domaines personnalisés actifs. Pas Cloudflare Pages.
- Zone Cloudflare active, forfait Free Website. Aucune modification DNS ni service payant.
- TLS 1.3 valide ; certificat Google Trust Services, échéance annoncée 10 janvier 2027. Redirections HTTP→HTTPS et apex→www vérifiées.
- CSP, HSTS (30 jours), anti-clickjacking DENY/frame-ancestors, nosniff, Referrer-Policy et Permissions-Policy constatés sur les réponses publiques. Aucun mixed content observé.
- CSP conserve unsafe-inline pour Next.js statique ; pas de nouvelle promesse de protection absolue.
- Secrets Gmail présents comme bindings secret_text ; aucun contenu affiché. Scan des valeurs configurées dans les fichiers suivis et assets publics : aucune correspondance.
- Fichiers .env, .env.local, .git/config, configuration et sources privées testés : HTTP 404.
- API : rejets réels origine absente/étrangère 403, type 415, JSON invalide/tableau/champs manquants/honeypot 400, corps surdimensionné 413.
- Anti-abus : limite Worker 12 POST/minute/IP, borne de corps 32 Ko, longueurs de champs, honeypot et délai, limite email par instance 3/10 min. Cette dernière n'est pas distribuée ; aucun test de saturation volontaire.
- Accès API aux réglages de zone et rulesets : 403. État détaillé WAF/Bot et TLS minimal du tableau de bord non revalidé pendant cette passe. TLS origine classique non applicable au Worker géré.

## Dépendances

- npm audit --omit=dev : 0 vulnérabilité connue signalée.
- npm audit complet : 5 alertes high de développement, une même chaîne braces → micromatch → fast-glob → plugin/config ESLint Next.
- Avis : https://github.com/advisories/GHSA-vfj7-8cjw-p6xm.
- npm view braces version : 3.0.3, encore concernée. Seul correctif automatique proposé : rétrograder eslint-config-next à 14.2.35, incompatible avec la stratégie Next 16. Pas de force fix ni patch improvisé.
- Reste à surveiller : publication d'un correctif compatible de l'outillage. Ces alertes ne sont pas présentées comme corrigées ni comme des vulnérabilités serveur de production.

## Formulaire réel

- Transport actif : Gmail API HTTPS OAuth, destination krodi2001@gmail.com ; email public contact@alfredwinnerservices.com.
- Un seul test réel depuis le formulaire public, référence AWS-FINAL-20261020-1792515323616.
- Une seule requête POST, HTTP 200 / livraison envoye, état de confirmation observé.
- Réception confirmée via le connecteur Gmail : message 1a15a3d51078323e, label INBOX ; les sept champs et le contenu UTF-8 sont présents.
- En-tête Reply-To vérifié : contact@alfredwinnerservices.com, adresse saisie pour ce test.
- Les huit tests automatisés Gmail couvrent l'acceptation, Unicode/Reply-To, configuration absente, injection, erreurs/redirects OAuth/envoi et absence d'identifiant de confirmation.
- Test navigateur de panne réseau interceptée uniquement : loading, bouton désactivé, une soumission malgré double clic, erreur et réactivation ; aucun succès simulé, aucun email supplémentaire.

## Confidentialité

- Parcours FR/EN et politique : aucun cookie ni stockage local/session/IndexedDB avant fermeture observé.
- Ressource externe observée : Cloudflare Web Analytics ; beacon vers /cdn-cgi/rum. Aucun Google Analytics, Meta Pixel ou publicité observé.
- Notice informative, pas une CMP publicitaire ; fermeture persistante fonctionnelle. Footer accessible malgré la notice aux largeurs 320, 375, 430, 768 et 1440 px.
- L'information publiée mentionne le beacon Cloudflare, Gmail et la nature informative de la notice, en FR/EN.
- Aucun certificat de conformité juridique : durées de conservation réelles de la messagerie, processus d'exercice des droits et obligations locales restent du ressort de l'entreprise.

## Performance — limites explicites

Mesures Lighthouse mobile de laboratoire sur la version avant corrections, pas des données terrain p75 :

| Langue | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| FR | 87 | 100 | 100 | 100 | 3,7 s | 0,011 | 110 ms |
| EN | 81 | 100 | 100 | 92 | 4,2 s | 0 | 100 ms |

- Le score 100 automatisé n'est pas une certification WCAG ; Lighthouse a aussi signalé le libellé de langue et le lien générique anglais.
- Cache OpenNext HIT constaté. Images WebP responsives, dimensions réservées, Hero prioritaire ; images hors écran lazy, polices locales.
- Le LCP mobile simulé dépasse 2,5 s dans ces passages ; aucune prétention que les Core Web Vitals sont tous atteints.
- Données réelles p75 LCP/INP/CLS non disponibles dans cette passe. TBT n'est pas INP. Ne pas conclure à une conformité terrain à partir de Lighthouse.
- Des suggestions de compression et de JS inutilisé existent ; pas de modification risquée de la qualité des photos ou de l'architecture pour gagner un score isolé.

Références : https://web.dev/articles/vitals ; https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/.

## Validation de la version corrigée

- Lint et TypeScript PASS ; build Next.js/OpenNext PASS, pages FR/EN statiques et indexables ; 8 tests Gmail API PASS.
- Prévisualisation puis domaine public : présélection des trois services, conservation query/ancre FR↔EN, validation client et focus des erreurs PASS.
- Responsive Chrome et WebKit : 320, 375, 393, 430, 768, 1024, 1280 (Chrome), 1440 et 1920 px. Aucun overflow détecté. Six projets et grille inchangés.
- Axe automatisé sur les deux langues, avec notice mobile et sans notice desktop : aucune violation détectée dans les règles WCAG A/AA exécutées. Pas un audit humain exhaustif WCAG 2.2 AA.
- Menu et sous-menu, Escape, CTA, focus, tactile et reduced-motion PASS. Contrastes du menu au survol : 4,658:1. Fondu Hero : 18 échantillons sans trou ni déplacement ; cadres et images chargés.
- Comparaison de six captures FR/EN × 375/768/1440 px : dimensions identiques ; différences de pixels 0 à 0,003675 %, sans changement visuel constaté.
- Images, WhatsApp, Facebook, LinkedIn, pages légales, 404, endpoint GET contact (405 attendu), robots, sitemap, canonical/hreflang et Open Graph PASS. Aucun nouveau mail réel envoyé après le test unique confirmé.
- Type JSON-LD LocalBusiness valide constaté dans le build, la prévisualisation et le domaine publié ; anciennes valeurs SoftwareCompany retirées.
- Dernières mesures Lighthouse mobile isolées sur la version publiée (un passage par langue, pas de données terrain) :

| Langue | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| FR | 81 | 100 | 100 | 100 | 4,4 s | 0,011 | 90 ms |
| EN | 81 | 100 | 100 | 100 | 4,5 s | 0,009 | 100 ms |

- Les audits nom accessible/libellé et lien descriptif passent après correction. Le LCP mobile de laboratoire reste un axe d'amélioration ; la variabilité des mesures n'est pas présentée comme une amélioration de performance.
- Aucun secret exposé dans les fichiers suivis/assets publics contrôlés ; aucun changement DNS, règles de sécurité, abonnement ou photographie.

## Release et fichiers

- Commit demandé : acf96fc — chore: final production audit and polish AWS website 2026.
- Correctif JSON-LD complémentaire : 82fcad1 — fix: use valid LocalBusiness structured data type.
- Commits poussés normalement sur origin/main et codex/aws-premium-2026, sans force push.
- Worker publié à 100 % : 2508cfa9-9f5a-4aac-b5c6-2ca368f3582d, tag git-82fcad1. Publication manuelle OpenNext upload → tests preview → Wrangler versions deploy ; le push seul n'est pas présenté comme un pipeline automatique.
- Référence stable précédente conservée : 3209dbba-824b-4c66-8b86-5d5d09377d9a. Retour possible via Wrangler versions deploy de cette version à 100 %, sans toucher aux DNS.
- Fichiers : src/components/layout/Navbar.tsx ; src/components/layout/PrivacyNotice.tsx ; src/i18n/dictionaries.ts ; src/lib/seo.ts ; travaux réalisés.md ; ce rapport.
- Les huit JPG et l'ancien rapport non suivis restent intacts et hors commit.

## Réserves de clôture

- Surveiller un correctif compatible pour les cinq alertes de développement.
- Mesurer les Core Web Vitals terrain au p75 et investiguer le LCP mobile sans remettre en cause le design validé ; aucun objectif terrain déclaré atteint.
- Paramètres détaillés de zone/WAF non vérifiés faute de droits API ; pas de configuration sensible changée.
- Aucun contrôle juridique exhaustif ni test sur appareil iOS physique ; WebKit est une émulation navigateur. Aucun problème fonctionnel bloquant constaté dans les contrôles exécutés.

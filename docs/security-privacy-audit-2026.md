# AWS Premium 2026 — sécurité et confidentialité

État constaté le 18 octobre 2026. Audit non intrusif, sans test de charge en production. Les corrections de code sont sur `codex/aws-premium-2026`, non publiées. La production reste sur le Worker Cloudflare `64af91b9`.

## Décisions et risques prioritaires

| Gravité | Constat vérifié | État / suite |
| --- | --- | --- |
| Élevée (disponibilité du contact) | Aucun secret `GMAIL_APP_PASSWORD` dans la liste du Worker de production. L'API renvoie 503 si absent ; aucune livraison de courrier n'a été confirmée sur Cloudflare. | Le propriétaire doit saisir le secret lui-même dans Cloudflare, puis tester SMTP et réception réelle après publication autorisée. Ne jamais mettre ce secret dans Git ni le chat. |
| Moyenne | Avant correction, HTTP servait le site en 200 et TLS 1.0 était accepté par la configuration de zone. | Cloudflare **Always Use HTTPS** activé : HTTP → HTTPS en 301. Minimum TLS **1.2** ; TLS 1.0/1.1 refusés, 1.2 accepté. Certificats actifs. HSTS **1 mois**, sans sous-domaines ni preload, et `nosniff` activés. Vérifié par requêtes directes sur racine et www. Aucune publication du code. |
| Moyenne | Aucun rate limit WAF actif sur `/api/contact` en production. Le limiteur applicatif en mémoire n'est pas distribué. | Limiteur Worker 12 POST/min/IP préparé et testé localement, publication en attente. Une règle WAF gratuite ciblée `POST /api/contact`, 5 requêtes/10 s/IP, blocage 10 s, a été validée par l'interface mais **annulée avant l'étape « Deploy rule to production »**. Le tableau de bord affiche toujours 0/1 règle. À activer lors de la publication approuvée si la mesure convient à l'usage réel. |
| Moyenne | La politique publique affirmait qu'aucune analyse d'audience n'était utilisée, mais une réponse HTML publique a montré `static.cloudflareinsights.com`. Le tableau de bord confirme Web Analytics/RUM activé avec exclusion des visiteurs de l'UE ; ceci explique la variation d'injection. | Texte FR/EN corrigé dans la branche. La CSP actuelle (`script-src 'self' 'unsafe-inline'`) bloque ce script externe lorsqu'il est injecté. La branche ajoute une autorisation limitée au fichier `beacon.min.js`, conformément à la documentation Cloudflare ; exécution et absence d'erreur CSP à revérifier en prévisualisation/production après publication autorisée. |
| Moyenne (conformité) | Politique de confidentialité sans durée de conservation précise pour les demandes, sans explication complète des transferts éventuels et des modalités de droits ; formalités ivoiriennes non vérifiées. | Ne pas inventer ces informations. Le propriétaire et un conseil juridique doivent confirmer durée, habilitations, destinataires, transferts et formalités, puis approuver les textes FR/EN avant publication. |
| Faible à moyenne | Le corps de `/api/contact` était lu entièrement avant le contrôle de 32 Ko. | Lecture bornée à 32 000 octets dans la branche ; tests locaux 413 pour 33 Ko, 403 origine interdite, 415 type incorrect, 400 JSON malformé. |
| Faible | CSP encore permissive envers les scripts et styles en ligne (`unsafe-inline`). | Durcissement par nonce/hash à préparer après validation de Next.js/OpenNext et du pré-rendu ; pas de changement risqué dans cette phase. |
| Inconnue | Protection de `main`, permissions GitHub et alertes de sécurité non lisibles anonymement (API GitHub 401, `gh` non connecté). | Vérification manuelle dans GitHub Settings → Branches/Rulesets, Actions, Dependabot et Secret scanning. Ne pas créer de jeton Cloudflare large ou permanent. |

## Surface d'attaque et contrôles OWASP

Revue ciblée selon [OWASP Top 10:2025](https://top10.owasp.org/2025/0x00_2025-Introduction/) et [ASVS 5.0](https://owasp.org/projects/asvs/). Il ne s'agit pas d'une certification ni d'une vérification exhaustive de toutes les exigences ASVS.

- **A01 contrôle d'accès** : aucune zone d'administration ni authentification applicative ; `/api/contact` public par nature. Liste d'origines stricte et réponse 403 pour origine absente/inconnue. L'`Origin` n'est pas une authentification ; rate limit et validation restent nécessaires. Pas d'URL distante fournie par le visiteur, donc pas de chemin SSRF observé dans ce flux.
- **A04 cryptographie** : HTTPS valide pour racine et www. Redirection 301 active, TLS 1.2 minimum, TLS 1.3 activé, HSTS prudent de 30 jours. Cloudflare SSL mode **Full** ; surveiller les certificats et éviter toute désactivation HTTPS avant expiration du max-age HSTS.
- **A05 injection** : pas de base SQL ni d'exécution de commandes à partir du formulaire. Validation serveur de type, longueur, email, service en liste blanche ; email Nodemailer en texte brut, `Reply-To` validé sans CR/LF ; accès fichier/URL désactivés dans Nodemailer. JSON-LD statique échappe `<` avant insertion. Aucun `eval` applicatif relevé.
- **A02 configuration** : CSP, `frame-ancestors 'none'`, X-Frame-Options, Referrer-Policy, Permissions-Policy et `nosniff` présents ; `/.env` et `/.git/config` donnent 403 sur requête HEAD publique, sans contenu consulté. Le Worker déployé n'a que le binding ASSETS ; le nouveau rate limiter n'y est pas encore présent.
- **A03 chaîne logicielle** : Next.js 16.4.2, OpenNext Cloudflare 1.20.12, Wrangler 4.151.1 préparés. `npm audit --omit=dev` : 0 alerte ; audit complet : 5 alertes hautes dans l'outillage de développement, sans mise à jour compatible identifiée. Ne pas utiliser `npm audit fix --force` qui rétrograde l'outillage.
- **A09 journalisation** : pas de `console.log` du corps du formulaire dans le code ; messages d'erreur génériques ; journaux Worker Logs & Traces désactivés en production. Les métriques Cloudflare agrégées existent. Si des logs sont activés, exclure nom, email, téléphone, description, mot de passe et corps de requête ; définir accès et rétention.
- **A10 gestion des erreurs** : les erreurs de validation, absence de secret et échec SMTP renvoient des réponses génériques sans pile ni identifiant ; la réception email reste à contrôler au-delà du code HTTP.

## Formulaire et données

Cloudflare en production : protection HTTP DDoS automatique toujours active, Browser Integrity Check activé, Bot Fight Mode désactivé. Aucun WAF custom/managed ni rate limiting de zone actif ; l'activation générale de Bot Fight Mode n'a pas été faite afin d'éviter des challenges indiscriminés. Turnstile n'a pas été ajouté : le formulaire doit d'abord fonctionner réellement et la limite ciblée doit être évaluée ; tout ajout du widget ferait l'objet d'une revue d'accessibilité et de confidentialité.

Sept champs : nom/prénom, email, téléphone/WhatsApp, entreprise, service, type de projet, description. Les champs facultatifs sont téléphone, entreprise et type de projet. Contrôles : validation client et serveur, JSON seulement, taille bornée pendant lecture, longueur par champ, honeypot, délai client indicatif (contournable), limite locale par empreinte d'email. Le Worker de branche ajoute une limite par IP distribuée ; elle n'est **pas** encore en production. Les échecs d'envoi restent génériques ; un 200 signifie acceptation par SMTP, pas preuve de réception en boîte.

Le flux prévu est navigateur → Worker/Route Handler → Gmail SMTP → `krodi2001@gmail.com`, avec `Reply-To` du visiteur. La destination et le secret ne doivent jamais figurer dans le client ; la destination en code serveur n'est pas un secret. L'accès à la boîte AWS, sa durée de conservation, la suppression des demandes et les sauvegardes doivent être décidés et appliqués par le propriétaire. Les limites de compatibilité SMTP sortant Cloudflare nécessitent un essai réel après configuration ; aucun succès n'est simulé.

## Inventaire cookies, scripts, services

| Catégorie | Constat |
| --- | --- |
| Cookies applicatifs | Aucun `Set-Cookie` observé sur FR, EN et pages légales ; aucun appel `cookies()` ni écriture cookie dans `src/`. |
| Cookies de sécurité Cloudflare | Aucun dans les réponses de visite testées. Des cookies nécessaires peuvent apparaître lors d'un challenge de sécurité ; Cloudflare les documente comme tels. |
| Analytics | Cloudflare Web Analytics/RUM activé dans le tableau de bord, en mode « Enable, excluding visitor data in the EU » ; beacon `static.cloudflareinsights.com` observé dans une réponse HTML hors UE. Cloudflare documente l'absence de cookie, localStorage et sessionStorage pour ce beacon ; l'IP réseau est reçue puis écartée au point d'entrée selon sa documentation. La CSP actuelle en production bloque le script ; la branche prévoit sa source précise. Aucun GA/Meta Pixel dans le code. |
| Marketing | Aucun pixel ou iframe marketing dans le code ni dans les réponses inspectées. |
| Stockage navigateur | Aucun `localStorage`, `sessionStorage` ou IndexedDB applicatif trouvé. État du formulaire seulement en mémoire React. |
| Services externes | Cloudflare pour hébergement et mesures ; Gmail/Google pour l'envoi des demandes ; WhatsApp, Facebook, LinkedIn ouverts seulement au clic via liens externes. Pas de widget social embarqué. |

**Bannière de consentement : non ajoutée.** Aucun cookie ou stockage facultatif n'a été constaté. Une bannière sans traceur à contrôler serait décorative. Cette conclusion dépend de la configuration Cloudflare constatée et doit être réévaluée si RUM change, si un pixel/outil marketing est ajouté ou si un conseil juridique demande une autre modalité pour certains visiteurs. Une information transparente sur RUM reste nécessaire ; sa correction FR/EN est préparée dans la branche.

## Textes légaux à valider

Identité, capital, RCCM, adresse, téléphone, email professionnel, directeur de publication et hébergeur Cloudflare sont présents dans les mentions FR/EN ; comparer les éléments d'identité aux documents officiels de l'entreprise avant publication. La politique mentionne les champs du formulaire, Gmail et Cloudflare, mais doit préciser après décision du propriétaire : durée de conservation et suppression, personnes autorisées à accéder à la boîte, transferts hors Côte d'Ivoire et bases/garanties correspondantes, droits d'accès/rectification/opposition/effacement et procédure de réponse, et formalités éventuelles auprès de l'Autorité de protection. Une revue juridique locale est nécessaire avant d'affirmer une conformité complète.

## GitHub, déploiement et maintenance

`.env*`, `.wrangler/`, clés PEM et builds sont ignorés. Recherche de motifs courants de clés dans les fichiers suivis : aucun résultat ; cela ne prouve pas qu'aucun secret n'existe dans l'historique Git ou dans des services externes. Aucun workflow `.github/` suivi ; aucune intégration Git automatique affichée par Cloudflare. `main` et la branche stable existent ; cette phase n'a ni commit ni push. Version stable Worker `64af91b9` relevée pour rollback. Contrôles avant publication : lint, typecheck, Next/OpenNext build, Wrangler dry-run, tests routes/headers et essai du formulaire avec réception réelle. Déploiement officiel seulement après autorisation explicite ; rollback Cloudflare vers la version stable en cas de régression.

Surveillance : certificats, redirection HTTPS, 4xx/5xx, 429, invocations Worker, CPU/mémoire, coût et quota, signalements de spam, renouvellement du domaine, mises à jour des dépendances. Le tableau de bord montre environ 1,05 k invocations Worker et 0 erreur sur 24 h, mais un P90 CPU élevé (~341 ms) à analyser avant de conclure sur la marge du forfait Free. Aucun service payant activé.

## Sources officielles

- [Autorité ivoirienne de protection — obligations du responsable](https://www.autoritedeprotection.ci/obligation-du-responsable-du-traitement/)
- [Loi ivoirienne n°2013-450](https://www.autoritedeprotection.ci/docs/Loi-2013-450.pdf)
- [CNIL — cookies et traceurs](https://www.cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi)
- [Cloudflare — RUM et vie privée](https://developers.cloudflare.com/speed/observatory/rum-beacon/)
- [Cloudflare — cookies de sécurité](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/)
- [Cloudflare Workers — limites](https://developers.cloudflare.com/workers/platform/limits/)
- [Cloudflare — règles de rate limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/)
- [OWASP Top 10:2025](https://top10.owasp.org/2025/0x00_2025-Introduction/)
- [OWASP ASVS 5.0](https://owasp.org/projects/asvs/)

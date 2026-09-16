# AWS — domaine, SEO et Google Search Console

> **PREPARED / WAITING FOR AWS PRODUCTION WEBSITE**
>
> Pause demandée par Alfred le 16 septembre 2026. Ce document est un plan
> préparatoire, pas une instruction d'exécution immédiate. Reprise uniquement
> après le message **SITE AWS = FINALISÉ ET VALIDÉ**. Ne pas activer les variables
> de production ni créer/valider de fiche, propriété Google ou marqueur Maps.
> Toute information manquante reste **PENDING ALFRED**. Les données et le statut
> établissement/zone desservie seront reconfirmés à la reprise.

État au 16 septembre 2026 : aucune propriété créée, aucune validation DNS
effectuée, aucun sitemap soumis. Le test HTTPS de `www.alfredwinnerservices.com`
échoue à la résolution DNS depuis cet environnement. Cela ne prouve pas que
le domaine est disponible à l'achat. Son propriétaire et son état restent à confirmer.

## Activation de production

Après confirmation d'Alfred, achat si nécessaire, connexion au bon hébergeur
et certificat HTTPS valide, configurer **uniquement dans l'environnement de
production** avant le build :

```dotenv
AWS_SITE_URL=https://www.alfredwinnerservices.com
AWS_DEPLOYMENT_ENV=production
AWS_INDEXING_ENABLED=true
```

Ces variables sont des réglages publics, pas des secrets. Elles ne sont pas
activées dans ce dépôt. `src/lib/seo.ts` refuse une origine différente ou une
URL avec chemin, query, port ou credentials. Sans URL confirmée, aucun canonical,
hreflang, URL/logo absolu de l'organisation ni `og:url` n'est émis.

Les pages statiques et routes metadata sont calculées au build : **reconstruire
et redéployer après changement des variables**. Ne pas réutiliser l'artefact
compilé de production pour une preview. En développement/preview/staging :
`AWS_DEPLOYMENT_ENV=preview`, `AWS_INDEXING_ENABLED=false`, et laisser
`AWS_SITE_URL` vide tant que le domaine réel n'est pas validé. Le contrôle
`VERCEL_ENV` protège aussi les previews Vercel si cet hébergeur est retenu.
`NODE_ENV=production` seul n'active jamais l'indexation.

État protégé : meta robots `noindex, follow`, robots.txt `Disallow: /`, sitemap
vide. Pour une preview privée, conserver également la protection d'accès de
l'hébergeur : robots.txt n'est pas une mesure de confidentialité. Un robot
bloqué ne peut pas lire `noindex` ; si une preview est déjà indexée, traiter
sa désindexation séparément avec Search Console, sans ouvrir la production par erreur.

## Redirections et routes

Configurer chez l'hébergeur les redirections permanentes 301/308 de HTTP et de
`alfredwinnerservices.com` vers `https://www.alfredwinnerservices.com`, en
préservant chemin et query. Couvrir les deux noms dans le certificat pour
éviter une erreur TLS avant redirection. Le fournisseur n'est pas connu :
aucune configuration DNS/hébergement n'a été inventée.

La racine `/` redirige déjà vers `/fr` par le proxy de langue. `/fr` et `/en`
doivent chacune rester accessibles en HTTP 200 avec un canonical vers elles-mêmes,
des alternates FR/EN réciproques et `x-default` vers `/fr`. Ne pas canonicaliser
la version anglaise vers la française. Les pages supplémentaires doivent
avoir leurs propres metadata ; ne pas hériter du canonical de l'accueil.
`pageMetadata(locale, chemin, { title, description })` prépare ces métadonnées.

`src/app/sitemap.ts` contient les vraies pages à indexer, sans ancres de sections,
routes internes ni dates de modification artificielles. Ajouter les nouvelles
pages seulement après contrôle des deux versions réellement rendues.

## Propriété Search Console — actions du propriétaire

1. Ouvrir [Search Console](https://search.google.com/search-console) avec le
   compte choisi par Alfred ; ajouter une propriété de type **Domaine**.
2. Saisir `alfredwinnerservices.com`, sans `https://`, `www` ni chemin.
3. Copier exactement l'enregistrement TXT que Google fournit.
4. Alfred ou le propriétaire DNS ajoute cet enregistrement chez le gestionnaire
   DNS réel, à l'emplacement demandé. Ne remplacer aucun enregistrement existant.
   Le champ hôte/racine dépend de ce gestionnaire ; ne pas deviner sa syntaxe.
5. Attendre la propagation puis cliquer sur « Valider ». En cas d'échec, comparer
   la valeur et le nom servis par le DNS aux instructions Google, puis réessayer.
6. Conserver l'enregistrement de vérification après succès.
7. Dans « Sitemaps », soumettre `https://www.alfredwinnerservices.com/sitemap.xml`
   seulement après contrôle de son contenu et de son HTTP 200.
8. Inspecter les URL FR et EN, lancer le test en direct, puis demander
   l'indexation lorsque les contrôles ci-dessous passent.

La propriété Domaine couvre les variantes de protocole et les sous-domaines.
[Types de propriétés](https://support.google.com/webmasters/answer/34592?hl=en),
[validation de propriété](https://support.google.com/webmasters/answer/9008080?hl=en)
et [inspection d'URL](https://support.google.com/webmasters/answer/9012289?hl=en).

## Contrôle après déploiement

- HTTPS valide ; variantes de domaine redirigées sans boucle.
- `/fr`, `/en`, `/robots.txt`, `/sitemap.xml` accessibles ; fausses pages en 404.
- Pages importantes en HTTP 200, sans meta ni en-tête HTTP `noindex`.
- Canonical absolu correct, alternates réciproques, contenu et HTML `lang` FR/EN.
- Sitemap XML valide, uniquement URL canoniques publiques ; images réelles accessibles.
- Organization identique FR/EN, `@id` commun `https://www.alfredwinnerservices.com/#organization`.
- Aucun faux `sameAs`, horaires, avis, pin, agrément ou résultat financier.
- NAP visible cohérent dans Contact et Footer ; lien Maps vers le quartier
  explicitement temporaire jusqu'à disponibilité de la vraie fiche AWS.
- Outils : [Rich Results Test](https://search.google.com/test/rich-results),
  [Schema.org Validator](https://validator.schema.org/), inspection Search Console.
  Un schéma valide ne garantit pas un résultat enrichi.
- Suivre les rapports d'indexation après exploration ; aucun délai ni position garanti.

Références : [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap),
[versions linguistiques](https://developers.google.com/search/docs/specialty/international/localized-versions),
[canonicals et redirections](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

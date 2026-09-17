/* Dictionnaires de langue.

   Principe : une seule source de verite par langue. Les composants ne
   contiennent AUCUN texte en dur — ils recoivent le dictionnaire de la
   langue active. Ajouter une langue = ajouter une entree ici.

   Contrainte technique : ce dictionnaire traverse la frontiere
   Server -> Client Component. Il doit donc rester serialisable :
   uniquement des donnees, jamais de fonction. */

import {
  telephoneAffiche,
  telephoneHref as telHref,
  whatsappBase,
} from "@/lib/contact";

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

const fr = {
  navbar: {
    nav: {
      home: "Accueil",
      services: "Nos services",
      projects: "Projets",
      about: "À propos",
      contact: "Contact",
    },
    services: [
      { num: "01", label: "Bourse & Finance", hash: "bourse-finance" },
      { num: "02", label: "Immobilier", hash: "immobilier" },
      { num: "03", label: "Software & IA", hash: "software-ia" },
    ],
    cta: "Parlons de votre projet",
    /* Signature de marque, sous le mot-symbole AWS.
       Les trois univers : Bourse/Finance, Immobilier, Software & IA. */
    signature: "INVESTIR · CONSTRUIRE · INNOVER",
    a11y: {
      brandHome: "Alfred Winner Services — accueil",
      mainNav: "Navigation principale",
      mobileNav: "Navigation mobile",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      switchToFr: "Afficher le site en français",
      switchToEn: "Afficher le site en anglais",
    },
  },
  hero: {
    eyebrow: "INVESTIR · CONSTRUIRE · INNOVER",
    titre: "Nous transformons les opportunités en valeur.",
    paragraphe:
      "Alfred Winner Services réunit finance, immobilier et technologies numériques pour concevoir, développer et accompagner des projets créateurs de valeur en Côte d'Ivoire et au-delà.",
    ctaPrincipal: "Découvrir nos expertises",
    /* Le contact appartient au CTA de la navbar. Ici le role est de
       PROUVER, pas de convertir : on ne duplique plus la meme action. */
    ctaSecondaire: "Voir nos projets",
    slides: [
      {
        num: "01",
        label: "Bourse & Finance",
        src: "/images/hero/finance-markets.jpg",
        alt: "Analyse des marchés financiers depuis un bureau donnant sur Abidjan",
        position: "50% 50%",
      },
      {
        num: "02",
        label: "Immobilier",
        src: "/images/hero/real-estate.jpg",
        alt: "Ouvriers sur un chantier de construction dans un quartier d'affaires",
        position: "78% 50%",
      },
    ],
    a11y: {
      media: "Univers Alfred Winner Services",
      choisir: "Afficher",
      pause: "Mettre en pause le défilement des images",
      reprendre: "Reprendre le défilement des images",
    },
  },

  /* Section 2 — elle explique COMMENT la valeur annoncee dans le Hero
     est concue. Ce n'est pas encore le catalogue des expertises. */
  approche: {
    eyebrow: "NOTRE APPROCHE",
    titre: "Trois univers. Une même ambition : créer de la valeur.",
    paragraphe:
      "Alfred Winner Services réunit finance, immobilier et technologies numériques autour d'une même vision : identifier les opportunités, structurer des projets solides et développer des solutions capables de créer une valeur durable.",
    piliers: [
      {
        num: "01",
        cle: "INVESTIR",
        titre: "Identifier les opportunités",
        texte:
          "Observer les marchés, comprendre les opportunités et mobiliser les outils financiers et numériques avec méthode.",
      },
      {
        num: "02",
        cle: "CONSTRUIRE",
        titre: "Transformer les projets en actifs",
        texte:
          "Aborder l'immobilier et les projets avec une logique de développement, de structuration et de création de valeur.",
      },
      {
        num: "03",
        cle: "INNOVER",
        titre: "La technologie comme accélérateur",
        texte:
          "Concevoir des sites, applications, logiciels, automatisations et solutions d'intelligence artificielle utiles aux entreprises et aux projets.",
      },
    ],
  },

  /* Section 4 — apres le QUOI (approche), le COMMENT. Une seule methode,
     valable pour les trois univers : finance, immobilier, logiciel.

     Le grand titre de la section n'est PAS stocke ici : il est reconstruit
     a partir des quatre "cle" ci-dessous. Le titre EST la sequence des
     quatre etapes — les separer ouvrirait la porte a une divergence entre
     l'annonce et le detail.

     "cle" est en casse normale, pas en capitales : les capitales sont
     posees par le CSS. Certains lecteurs d'ecran epellent un mot ecrit
     tout en majuscules dans le texte source. */
  methode: {
    eyebrow: "NOTRE MÉTHODE",
    paragraphe:
      "Qu'il s'agisse de finance, d'immobilier ou de technologies numériques, notre méthode reste la même : comprendre le besoin, structurer une réponse cohérente, passer à l'exécution et faire évoluer durablement la valeur créée.",
    etapes: [
      {
        num: "01",
        cle: "Comprendre",
        titre: "Clarifier avant d'agir.",
        texte:
          "Chaque projet commence par l'écoute et l'analyse. Nous cherchons à comprendre le besoin, le contexte, les contraintes et les objectifs avant de définir une direction.",
      },
      {
        num: "02",
        cle: "Structurer",
        titre: "Transformer une idée en plan concret.",
        texte:
          "Nous organisons les priorités, les ressources et les étapes nécessaires afin de construire une approche claire, réaliste et adaptée au projet.",
      },
      {
        num: "03",
        cle: "Réaliser",
        titre: "Passer de la stratégie à l'action.",
        texte:
          "Nous mettons en œuvre la solution avec méthode, transparence et attention portée à la qualité, tout en gardant l'objectif du projet au centre de l'exécution.",
      },
      {
        num: "04",
        cle: "Faire évoluer",
        titre: "Améliorer ce qui crée de la valeur.",
        texte:
          "Un projet ne s'arrête pas à sa livraison. Nous observons, ajustons et faisons évoluer les solutions lorsque cela permet d'en renforcer la pertinence et la valeur dans le temps.",
      },
    ],
  },
  /* Section 5 — Qui sommes-nous. L'image precedente (echangeur
     autoroutier, puis vue de la lagune d'Abidjan) racontait "une ville",
     pas la convergence capital + actifs + technologie que le texte
     annonce — releve a la relecture ("que comprend le visiteur en
     regardant la photo seule ?", reponse : une jolie ville, pas assez
     precis). Remplacee par une photographie qui montre reellement de la
     TECHNOLOGIE en train d'etre operee (infrastructure serveur, geste
     professionnel actif), plus proche du texte. Voir ASSETS_SOURCES.md
     pour la source et la licence. */
  apropos: {
    eyebrow: "QUI SOMMES-NOUS",
    titre: "La valeur ne repose jamais sur un seul levier.",
    paragraphes: [
      "Alfred Winner Services est née d'une conviction simple : capital, actifs et technologie se renforcent mutuellement dès qu'on les travaille ensemble.",
      "AWS réunit ainsi finance, immobilier et solutions numériques autour d'une même ambition : identifier les opportunités, structurer les projets et développer des solutions capables de créer une valeur durable.",
    ],
    imageAlt: "Professionnelle gérant une infrastructure de serveurs informatiques",
  },

  /* Section 6 — Nos expertises. Coeur commercial du site : c'est ici que
     les trois univers, annonces dans le Hero et expliques dans Notre
     approche, deviennent des activites concretes.

     "hash" reprend EXACTEMENT les ancres deja utilisees par le menu
     deroulant de la navbar (#bourse-finance, #immobilier, #software-ia) :
     un lien du menu doit atterrir pile sur le bon pole. */
  expertises: {
    eyebrow: "NOS EXPERTISES",
    titre: "Ce que nous faisons, concrètement.",
    poles: [
      {
        num: "01",
        hash: "bourse-finance",
        cle: "INVESTIR",
        titre: "Bourse & Finance",
        // Reformule pour ne plus commencer par "AWS", ton oriente client
        // plutot que descriptif. La phrase ne dit plus ce que ces
        // activites NE SONT PAS a part (un paragraphe separe qui sonnait
        // comme un avertissement juridique) : la meme idee est integree
        // naturellement en fin de phrase — plus sobre, toujours honnete.
        texte:
          "Des outils technologiques pour lire les marchés financiers et les actifs numériques avec clarté — de l'analyse des données à leur visualisation, pensés pour éclairer la décision plutôt que la dicter.",
        // Retiree sur demande explicite reiteree du fondateur (deux fois :
        // une reformulation plus douce avait ete proposee en alternative
        // a la suppression, refusee la seconde fois — "le premier
        // paragraphe suffit"). Decision du proprietaire de l'entreprise
        // sur un risque qui lui appartient, pas un fait invente par nous.
        precision: null,
        capacites: null,
        image: "/images/expertises/finance-v5.jpg",
        imageAlt: "Professionnel analysant des graphiques financiers sur un grand écran",
      },
      {
        num: "02",
        hash: "immobilier",
        cle: "CONSTRUIRE",
        titre: "Immobilier",
        texte:
          "Du repérage des opportunités foncières à la structuration des projets, jusqu'à leur développement — une approche immobilière pensée pour créer de la valeur durable.",
        precision: null,
        capacites: null,
        image: "/images/expertises/immobilier-v5.jpg",
        imageAlt: "Immeuble de grande hauteur en construction avec grues, vue aérienne",
      },
      {
        num: "03",
        hash: "software-ia",
        cle: "INNOVER",
        titre: "Software & IA",
        texte:
          "Sites web professionnels, applications, logiciels sur mesure : des solutions numériques et des outils d'automatisation et d'intelligence artificielle pensés pour répondre aux besoins réels des entreprises et des projets.",
        precision: null,
        // Capacites reprises mot pour mot du cahier des charges (section
        // "Software & IA suffisamment etablies") : aucune n'est inventee.
        capacites: [
          "Sites web professionnels",
          "Applications web",
          "Logiciels sur mesure",
          "Automatisation",
          "Agents IA",
        ],
        // v3 (mains sur clavier, generique) puis un diptyque photo+video
        // robotique (juge gadget/trop charge a la relecture) : remplaces
        // par une seule photo d'un developpeur reellement au travail,
        // code visible a l'ecran — coherente avec le texte, sans
        // artifice. Voir ASSETS_SOURCES.md.
        image: "/images/expertises/software-ia-v4.jpg",
        imageAlt: "Développeur travaillant sur du code, plusieurs écrans dans un bureau",
      },
    ],
    // Distinct du CTA de la Navbar et du CTA final (meme phrase repetee
    // 5 fois sur une seule page, sinon) : une action plus legere, propre
    // a chaque pole plutot qu'un bouton copie-colle.
    ctaPole: "Discuter de ce service",
  },

  /* Section 7 — Projets & realisations. Objectif : PROUVER, pas affirmer —
     mais sans capture reelle disponible pour aucun des trois projets, la
     preuve visuelle est reportee. Le statut de chaque projet reste celui
     explicitement autorise, mot pour mot, rien de plus.

     UNE SEULE LISTE, sur demande explicite : melanger demonstrateurs
     reels et solutions en developpement dans UNE composition, plutot
     qu'un bloc separe qui semblait "ajoute apres coup". La distinction
     ne repose plus sur deux blocs visuels differents mais sur le champ
     "statut" de CHAQUE ligne, toujours visible : un vrai demonstrateur
     porte un statut factuel ("Demonstrateur digital", "Prototype
     interne — environnement DEMO"), une direction non livree porte
     "En developpement" ou "En structuration" — jamais confondus, jamais
     silencieux. */
  projets: {
    eyebrow: "PROJETS & INITIATIVES",
    // Le titre precedent ("La methode, mise a l'epreuve.") dupliquait le
    // theme de la section Notre methode juste au-dessus. Celui-ci nomme
    // ce que la section montre reellement : des choses a des stades
    // differents, pas une seule "methode" repetee deux fois.
    titre: "De la démonstration à la solution.",
    paragraphe:
      "Des solutions livrées, un outil en développement et un projet en structuration — chacun donnant une forme concrète à l'un des trois univers AWS, chacun à son propre stade, chacun avec un statut clair.",
    // NOMS PUBLICS DEPERSONNALISES : ces trois entrees portaient le nom
    // personnel du fondateur ("Alfred Fitness", "Alfred AI Trader") ou
    // un nom de produit isole ("Baby Tourism") — sur demande explicite,
    // l'entreprise doit rester au premier plan, pas le personal
    // branding. Seul le nom affiche est reformule en description de ce
    // que chaque projet EST.
    //
    // STATUTS "REALISE" — confirmes explicitement par le fondateur (pas
    // une supposition de notre part : la version precedente de cette
    // liste les gardait a "demonstrateur"/"prototype" faute de
    // confirmation, le fondateur a ensuite confirme leur livraison en
    // detail, projet par projet). Les deux items ci-dessous statuts
    // "tableau-de-bord-multi-actifs" couvre a la fois "Solution Finance
    // & Technologie" et "Outil de gestion/suivi de portefeuille
    // electronique" du brief : un seul et meme outil dans ce projet,
    // pas deux projets distincts.
    liste: [
      {
        id: "baby-tourism",
        nom: "Plateforme de découverte touristique",
        categorie: "Digital · Tourisme",
        statut: "Réalisé",
        texte:
          "Plateforme web dédiée à la découverte, à la présentation et à l'expérience touristique.",
      },
      {
        id: "alfred-fitness",
        nom: "Expérience web Fitness",
        categorie: "Web · Fitness",
        statut: "Réalisé",
        texte:
          "Expérience digitale conçue pour présenter une activité fitness, ses services et son univers.",
      },
      {
        id: "alfred-ai-trader",
        nom: "Plateforme d'analyse de marchés",
        categorie: "Finance · Technologie · IA",
        statut: "Réalisé",
        texte:
          "Solution logicielle combinant technologies numériques et analyse des marchés financiers. Un outil technologique, pas un service de conseil réglementé ni une promesse de performance.",
      },
      {
        id: "tableau-de-bord-multi-actifs",
        nom: "Tableau de bord multi-actifs",
        categorie: "Finance & Technologie",
        statut: "Réalisé",
        texte:
          "Tableau de bord numérique pour suivre allocations, historique et visualisations d'un portefeuille multi-actifs. Un outil technologique, pas un service de gestion réglementée ni de conseil financier.",
      },
      {
        id: "suivi-projets-immobiliers",
        nom: "Suivi de projets immobiliers",
        categorie: "Immobilier & Technologie",
        statut: "En structuration",
        texte:
          "Outil pour structurer et suivre opportunités, documents et étapes d'un projet immobilier.",
      },
      {
        id: "assistant-ia-metier",
        nom: "Assistant IA métier",
        categorie: "Software & IA",
        statut: "En développement",
        texte:
          "Agent d'automatisation pensé pour accompagner la recherche d'information et les tâches métier.",
      },
    ],
  },

  /* Section 8 — Vision. Bande pleine largeur au bleu du Hero (aucune
     nouvelle couleur) : une respiration corporate au milieu d'une page
     autrement blanche/off-white, la meme fonction que le "manifeste" que
     beaucoup de sites institutionnels placent avant le closing. */
  vision: {
    eyebrow: "VISION",
    titre: "Une ambition progressivement africaine et internationale.",
    paragraphe:
      "Depuis la Côte d'Ivoire, AWS ambitionne de développer des projets, des actifs et des solutions technologiques capables de créer durablement de la valeur. Le logiciel et l'intelligence artificielle occupent une place croissante dans cette vision.",
  },

  /* Section 9 — Fondateur. Texte repris tel que fourni, sans ajout de
     diplome, certification ou annee d'experience. Aucune photo pour
     l'instant (voir travaux realises.md) : mise en page pensee pour en
     recevoir une des qu'elle sera fournie, sans reconstruction. */
  fondateur: {
    eyebrow: "FONDATEUR",
    nom: "Krodi Krotchaman Alfred Donald",
    titre: "Fondateur & CEO — Alfred Winner Services",
    paragraphes: [
      "Entrepreneur et ingénieur logiciel de formation, Alfred Krodi développe Alfred Winner Services à l'intersection de l'entrepreneuriat, de la technologie, de la finance et de l'immobilier.",
      "Il porte notamment les initiatives numériques et d'intelligence artificielle développées autour de l'écosystème AWS.",
    ],
    imageAlt: "Krodi Krotchaman Alfred Donald, fondateur d'Alfred Winner Services",
  },

  ctaFinal: {
    titre: "Un projet à construire ? Parlons-en.",
    sousTitre: "Comprendre, structurer, réaliser : la même méthode pour chaque projet.",
    cta: "Parlons de votre projet",
  },

  /* Section 11 — Contact. Le formulaire n'appelle aucune API : il ouvre
     le client mail du visiteur avec un message pre-rempli (mailto:). Pas
     de backend, pas de secret, pas de fausse confirmation d'envoi — voir
     travaux realises.md pour la decision et ses limites. */
  contact: {
    eyebrow: "PARLONS DE VOTRE PROJET",
    titre: "Expliquez-nous ce que vous souhaitez construire.",
    sousTitre:
      "Notre objectif est de comprendre votre besoin avant de proposer une direction adaptée.",
    adresseLabel: "Adresse",
    adresse: "Cocody Angré — Nouveau CHU, Abidjan, Côte d'Ivoire",
    telephoneLabel: "Téléphone",
    telephone: telephoneAffiche,
    telephoneHref: telHref,
    emailLabel: "Email",
    email: "krodi2001@gmail.com",
    emailMailtoHref: "mailto:krodi2001@gmail.com",
    // Formulaire de prise de contact structuree ("project intake") —
    // remplace l'ancien formulaire court. Champs marques (*) obligatoires
    // cote client ET serveur (voir src/app/api/contact/route.ts) ; budget
    // et echeance restent facultatifs, sur demande explicite : personne
    // n'est bloque de decrire son projet faute de chiffre precis.
    formulaire: {
      nom: "Nom & prénom",
      email: "Email",
      telephone: "Téléphone / WhatsApp",
      entreprise: "Entreprise",
      service: "Service recherché",
      serviceOptions: [
        "Finance & Technologie",
        "Immobilier",
        "Software & IA",
        "Projet digital",
        "Projet transversal",
        "Autre",
      ],
      typeProjet: "Type de projet",
      budget: "Budget estimatif",
      echeance: "Échéance souhaitée",
      echeanceOptions: [
        "Dès que possible",
        "Dans les 3 prochains mois",
        "Dans les 6 prochains mois",
        "Pas encore définie",
      ],
      description: "Description du projet",
      optionnel: "(facultatif)",
      cta: "Envoyer mon projet",
      // Etats reels, pas une promesse generique : le canal de livraison
      // depend de ce que /api/contact repond (voir ContactForm.tsx).
      envoiEnCours: "Envoi en cours…",
      succesEnvoye:
        "Message envoyé. Nous revenons vers vous rapidement.",
      succesMailto:
        "Votre message est prêt dans votre messagerie — il ne reste qu'à l'envoyer pour qu'il nous parvienne.",
      erreurGenerique:
        "Une erreur est survenue. Vous pouvez réessayer, ou nous écrire directement à krodi2001@gmail.com.",
      erreurValidation: "Merci de corriger les champs signalés ci-dessous.",
      champObligatoire: "Ce champ est obligatoire.",
      champEmailInvalide: "Merci d'indiquer une adresse email valide.",
    },
  },

  /* Bouton WhatsApp — le numero vient de lib/contact.ts, source unique.
     Le canal a ete demande explicitement par Alfred ; reste a confirmer
     qu'un compte WhatsApp est bien ACTIF sur ce numero (un lien wa.me se
     construit pour n'importe quel numero, valide ou non : le format ne
     prouve rien). Aucun message n'a ete envoye pour le verifier. */
  whatsapp: {
    ariaLabel: "Contacter Alfred Winner Services sur WhatsApp",
    href: whatsappBase,
    message:
      "Bonjour Alfred Winner Services, je souhaite discuter d'un projet.",
  },

  /* Footer — reseaux sociaux prets a l'emploi mais VIDES : aucune URL
     officielle confirmee. Le composant n'affiche un reseau que si son
     href est non vide ; ne jamais mettre "#" a la place d'un lien reel. */
  footer: {
    contactsNav: "Contact",
    mentionsLegales: "Mentions légales",
    confidentialite: "Politique de confidentialité",
    reseaux: {
      linkedin: "",
      instagram: "",
      facebook: "",
    },
    raisonSociale: "ALFRED WINNER SERVICES",
    formeJuridique: "SARLU au capital de 1 000 000 F CFA",
    rccm: "RCCM CI-ABJ-03-2025-B13-07068",
    copyright: "© 2026 Alfred Winner Services. Tous droits réservés.",
  },

  /* Pages legales — uniquement des informations confirmees. Tout ce qui
     manque (hebergeur notamment) est signale explicitement dans le texte
     plutot que devine, pour qu'Alfred le voie et le complete avant mise
     en ligne. */
  mentionsLegales: {
    titre: "Mentions légales",
    sections: [
      {
        titre: "Éditeur du site",
        paragraphes: [
          "Alfred Winner Services (AWS), SARLU au capital de 1 000 000 F CFA.",
          "RCCM : CI-ABJ-03-2025-B13-07068.",
          "Adresse : Cocody Angré — Nouveau CHU, Abidjan, Côte d'Ivoire.",
          "Directeur de la publication : Krodi Krotchaman Alfred Donald, Fondateur & CEO.",
          "Contact : (+225) 07 48 19 11 00 — krodi2001@gmail.com.",
        ],
      },
      {
        titre: "Hébergement",
        paragraphes: [
          "Information en attente de confirmation avant mise en ligne définitive.",
        ],
      },
      {
        titre: "Propriété intellectuelle",
        paragraphes: [
          "L'ensemble des éléments du présent site (textes, images, logo, identité visuelle) est la propriété d'Alfred Winner Services, sauf mention contraire, et ne peut être reproduit sans autorisation préalable.",
        ],
      },
    ],
  },
  confidentialite: {
    titre: "Politique de confidentialité",
    sections: [
      {
        titre: "Données collectées",
        paragraphes: [
          "Ce site ne dépose aucun cookie de suivi et n'utilise aucun outil d'analyse d'audience (Google Analytics, Meta Pixel ou équivalent).",
          "Le formulaire de contact envoie les informations que vous saisissez (nom, email, et les autres champs que vous choisissez de remplir) à notre serveur, uniquement pour les valider. Elles n'y sont pas conservées : votre navigateur ouvre ensuite votre propre messagerie avec un message pré-rempli, que vous choisissez ou non d'envoyer depuis votre propre adresse email. Vous pouvez aussi nous contacter directement par téléphone, par email ou par WhatsApp.",
          "Si vous nous contactez par WhatsApp, l'échange se déroule dans cette application, selon les conditions et la politique de confidentialité de son éditeur, indépendantes de ce site.",
          "Comme tout site web, les pages sont servies par un hébergeur susceptible de conserver des journaux de connexion techniques (adresse IP, date, page demandée). L'hébergeur n'étant pas encore arrêté, cette section sera complétée avant la mise en ligne publique.",
        ],
      },
      {
        titre: "Contact",
        paragraphes: [
          "Pour toute question relative à cette politique, vous pouvez écrire à krodi2001@gmail.com.",
        ],
      },
    ],
  },
};

/* Le type est deduit du francais : oublier une cle en anglais devient une
   erreur TypeScript, pas un texte manquant en production.

   Sans "as const" sur l'objet fr, TypeScript deduit "string" pour chaque
   valeur. Avec "as const" il deduisait le type litteral "Accueil", et
   exigeait donc le mot "Accueil" en anglais aussi. On veut verifier la
   STRUCTURE des dictionnaires, pas leur contenu. */
type Dictionary = typeof fr;

const en: Dictionary = {
  navbar: {
    nav: {
      home: "Home",
      services: "Services",
      projects: "Projects",
      about: "About",
      contact: "Contact",
    },
    services: [
      { num: "01", label: "Markets & Finance", hash: "bourse-finance" },
      { num: "02", label: "Real Estate", hash: "immobilier" },
      { num: "03", label: "Software & AI", hash: "software-ia" },
    ],
    cta: "Let's discuss your project",
    signature: "INVEST · BUILD · INNOVATE",
    a11y: {
      brandHome: "Alfred Winner Services — home",
      mainNav: "Main navigation",
      mobileNav: "Mobile navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      switchToFr: "View the site in French",
      switchToEn: "View the site in English",
    },
  },
  hero: {
    eyebrow: "INVEST · BUILD · INNOVATE",
    titre: "We turn opportunities into value.",
    paragraphe:
      "Alfred Winner Services brings together finance, real estate and digital technologies to design, develop and support value-creating projects in Côte d'Ivoire and beyond.",
    ctaPrincipal: "Explore our expertise",
    ctaSecondaire: "View our projects",
    slides: [
      {
        num: "01",
        label: "Markets & Finance",
        src: "/images/hero/finance-markets.jpg",
        alt: "Financial markets analysis from an office overlooking Abidjan",
        position: "50% 50%",
      },
      {
        num: "02",
        label: "Real Estate",
        src: "/images/hero/real-estate.jpg",
        alt: "Workers on a construction site in a business district",
        position: "78% 50%",
      },
    ],
    a11y: {
      media: "Alfred Winner Services business areas",
      choisir: "Show",
      pause: "Pause the image slideshow",
      reprendre: "Resume the image slideshow",
    },
  },

  approche: {
    eyebrow: "OUR APPROACH",
    titre: "Three fields. One ambition: creating value.",
    paragraphe:
      "Alfred Winner Services brings together finance, real estate and digital technologies around a single vision: identifying opportunities, structuring sound projects and developing solutions that create lasting value.",
    piliers: [
      {
        num: "01",
        cle: "INVEST",
        titre: "Identifying opportunities",
        texte:
          "Reading the markets, understanding where the opportunities lie, and applying financial and digital tools with method.",
      },
      {
        num: "02",
        cle: "BUILD",
        titre: "Turning projects into assets",
        texte:
          "Approaching real estate and projects with a logic of development, structuring and value creation.",
      },
      {
        num: "03",
        cle: "INNOVATE",
        titre: "Technology as an accelerator",
        texte:
          "Designing websites, applications, software, automation and artificial intelligence solutions that serve businesses and projects.",
      },
    ],
  },

  methode: {
    eyebrow: "OUR METHOD",
    paragraphe:
      "Whether the work is financial, property-related or digital, our method stays the same: understand the need, structure a coherent response, move to execution, and keep improving the value created over time.",
    etapes: [
      {
        num: "01",
        cle: "Understand",
        titre: "Get clear before acting.",
        texte:
          "Every project starts with listening and analysis. We work to understand the need, the context, the constraints and the objectives before setting a direction.",
      },
      {
        num: "02",
        cle: "Structure",
        titre: "Turn an idea into a concrete plan.",
        texte:
          "We organise the priorities, the resources and the steps required to build an approach that is clear, realistic and suited to the project.",
      },
      {
        num: "03",
        cle: "Deliver",
        titre: "Move from strategy to action.",
        texte:
          "We implement the solution with method, transparency and close attention to quality, keeping the project's objective at the centre of execution.",
      },
      {
        num: "04",
        cle: "Evolve",
        titre: "Improve what creates value.",
        texte:
          "A project does not end at delivery. We observe, adjust and evolve the solutions whenever doing so strengthens their relevance and their value over time.",
      },
    ],
  },
  apropos: {
    eyebrow: "ABOUT US",
    titre: "Value is never built on a single lever.",
    paragraphes: [
      "Alfred Winner Services was founded on a simple conviction: capital, assets and technology reinforce one another once they are worked on together.",
      "AWS brings together finance, real estate and digital solutions around one ambition: identifying opportunities, structuring projects and building solutions capable of creating lasting value.",
    ],
    imageAlt: "Professional managing a server infrastructure rack",
  },

  expertises: {
    eyebrow: "OUR EXPERTISE",
    titre: "What we actually do.",
    poles: [
      {
        num: "01",
        hash: "bourse-finance",
        cle: "INVEST",
        titre: "Markets & Finance",
        texte:
          "Technology built to make sense of financial markets and digital assets with clarity — from data analysis to visualisation, designed to inform decisions rather than dictate them.",
        precision: null,
        capacites: null,
        image: "/images/expertises/finance-v5.jpg",
        imageAlt: "Professional analysing financial charts on a large screen",
      },
      {
        num: "02",
        hash: "immobilier",
        cle: "BUILD",
        titre: "Real Estate",
        texte:
          "From spotting land opportunities to structuring and developing real estate projects — an approach built to create lasting value.",
        precision: null,
        capacites: null,
        image: "/images/expertises/immobilier-v5.jpg",
        imageAlt: "High-rise building under construction with cranes, aerial view",
      },
      {
        num: "03",
        hash: "software-ia",
        cle: "INNOVATE",
        titre: "Software & AI",
        texte:
          "Professional websites, applications and custom software: digital solutions and automation and artificial intelligence tools designed to meet the real needs of businesses and projects.",
        precision: null,
        capacites: [
          "Professional websites",
          "Web applications",
          "Custom software",
          "Automation",
          "AI agents",
        ],
        image: "/images/expertises/software-ia-v4.jpg",
        imageAlt: "Developer working on code, multiple screens in an office",
      },
    ],
    ctaPole: "Discuss this service",
  },

  projets: {
    eyebrow: "PROJECTS & INITIATIVES",
    titre: "From demonstrator to solution.",
    paragraphe:
      "Delivered solutions, a tool in development and a project in scoping — each giving concrete form to one of the three AWS business areas, each at its own stage, each with a stated status.",
    liste: [
      {
        id: "baby-tourism",
        nom: "Tourism discovery platform",
        categorie: "Digital · Tourism",
        statut: "Delivered",
        texte:
          "A web platform dedicated to tourism discovery, presentation and experience.",
      },
      {
        id: "alfred-fitness",
        nom: "Fitness web experience",
        categorie: "Web · Fitness",
        statut: "Delivered",
        texte:
          "A digital experience designed to present a fitness business, its services and its world.",
      },
      {
        id: "alfred-ai-trader",
        nom: "Market analysis platform",
        categorie: "Finance · Technology · AI",
        statut: "Delivered",
        texte:
          "A software solution combining digital technology and financial market analysis. A technology tool, not regulated advice or a performance promise.",
      },
      {
        id: "tableau-de-bord-multi-actifs",
        nom: "Multi-asset dashboard",
        categorie: "Finance & Technology",
        statut: "Delivered",
        texte:
          "A digital dashboard to track allocations, history and visualisations across a multi-asset portfolio. A technology tool, not a regulated portfolio management or advisory service.",
      },
      {
        id: "suivi-projets-immobiliers",
        nom: "Real estate project tracker",
        categorie: "Real Estate & Technology",
        statut: "In scoping",
        texte:
          "A tool to structure and track opportunities, documents and stages of a real estate project.",
      },
      {
        id: "assistant-ia-metier",
        nom: "Business AI assistant",
        categorie: "Software & AI",
        statut: "In development",
        texte:
          "An automation agent designed to support information lookup and business tasks.",
      },
    ],
  },

  vision: {
    eyebrow: "VISION",
    titre: "An ambition growing step by step — Ivorian, African, international.",
    paragraphe:
      "From Côte d'Ivoire, AWS aims to develop projects, assets and technology solutions capable of creating lasting value. Software and artificial intelligence play a growing role in this vision.",
  },

  fondateur: {
    eyebrow: "FOUNDER",
    nom: "Krodi Krotchaman Alfred Donald",
    titre: "Founder & CEO — Alfred Winner Services",
    paragraphes: [
      "An entrepreneur and software engineer by training, Alfred Krodi is building Alfred Winner Services at the intersection of entrepreneurship, technology, finance and real estate.",
      "He leads in particular the digital and artificial intelligence initiatives developed around the AWS ecosystem.",
    ],
    imageAlt: "Krodi Krotchaman Alfred Donald, founder of Alfred Winner Services",
  },

  ctaFinal: {
    titre: "A project to build? Let's talk.",
    sousTitre: "Understand, structure, deliver: the same method for every project.",
    cta: "Let's discuss your project",
  },

  contact: {
    eyebrow: "TELL US ABOUT YOUR PROJECT",
    titre: "Tell us what you want to build.",
    sousTitre:
      "We start by understanding your needs before defining the appropriate direction.",
    adresseLabel: "Address",
    adresse: "Cocody Angré — Nouveau CHU, Abidjan, Côte d'Ivoire",
    telephoneLabel: "Phone",
    telephone: telephoneAffiche,
    telephoneHref: telHref,
    emailLabel: "Email",
    email: "krodi2001@gmail.com",
    emailMailtoHref: "mailto:krodi2001@gmail.com",
    formulaire: {
      nom: "Full name",
      email: "Email",
      telephone: "Phone / WhatsApp",
      entreprise: "Company",
      service: "Service of interest",
      serviceOptions: [
        "Finance & Technology",
        "Real Estate",
        "Software & AI",
        "Digital project",
        "Cross-business project",
        "Other",
      ],
      typeProjet: "Type of project",
      budget: "Estimated budget",
      echeance: "Desired timeline",
      echeanceOptions: [
        "As soon as possible",
        "Within the next 3 months",
        "Within the next 6 months",
        "Not yet defined",
      ],
      description: "Project description",
      optionnel: "(optional)",
      cta: "Submit my project",
      envoiEnCours: "Sending…",
      succesEnvoye: "Message sent. We'll get back to you shortly.",
      succesMailto:
        "Your message is ready in your email app — just send it and it will reach us.",
      erreurGenerique:
        "Something went wrong. You can try again, or write to us directly at krodi2001@gmail.com.",
      erreurValidation: "Please correct the fields flagged below.",
      champObligatoire: "This field is required.",
      champEmailInvalide: "Please provide a valid email address.",
    },
  },

  whatsapp: {
    ariaLabel: "Contact Alfred Winner Services on WhatsApp",
    href: whatsappBase,
    message: "Hello Alfred Winner Services, I'd like to discuss a project.",
  },

  footer: {
    contactsNav: "Contact",
    mentionsLegales: "Legal notice",
    confidentialite: "Privacy policy",
    reseaux: {
      linkedin: "",
      instagram: "",
      facebook: "",
    },
    raisonSociale: "ALFRED WINNER SERVICES",
    formeJuridique: "SARLU with capital of 1,000,000 F CFA",
    rccm: "RCCM CI-ABJ-03-2025-B13-07068",
    copyright: "© 2026 Alfred Winner Services. All rights reserved.",
  },

  mentionsLegales: {
    titre: "Legal notice",
    sections: [
      {
        titre: "Site publisher",
        paragraphes: [
          "Alfred Winner Services (AWS), a SARLU with capital of 1,000,000 F CFA.",
          "RCCM: CI-ABJ-03-2025-B13-07068.",
          "Address: Cocody Angré — Nouveau CHU, Abidjan, Côte d'Ivoire.",
          "Publication director: Krodi Krotchaman Alfred Donald, Founder & CEO.",
          "Contact: (+225) 07 48 19 11 00 — krodi2001@gmail.com.",
        ],
      },
      {
        titre: "Hosting",
        paragraphes: [
          "Information pending confirmation before final launch.",
        ],
      },
      {
        titre: "Intellectual property",
        paragraphes: [
          "All elements of this site (text, images, logo, visual identity) are the property of Alfred Winner Services, unless otherwise stated, and may not be reproduced without prior authorisation.",
        ],
      },
    ],
  },
  confidentialite: {
    titre: "Privacy policy",
    sections: [
      {
        titre: "Data collected",
        paragraphes: [
          "This site does not use any tracking cookies and does not use any audience-measurement tool (Google Analytics, Meta Pixel or equivalent).",
          "The contact form sends the information you enter (name, email, and any other field you choose to fill in) to our server, solely to validate it. It is not stored there: your browser then opens your own email application with a pre-filled message, which you may choose to send from your own email address or not. You can also reach us directly by phone, email or WhatsApp.",
          "If you contact us on WhatsApp, the conversation takes place inside that application, under its publisher's own terms and privacy policy, which are independent of this site.",
          "Like any website, these pages are served by a hosting provider that may keep technical connection logs (IP address, date, page requested). The provider has not been chosen yet; this section will be completed before public launch.",
        ],
      },
      {
        titre: "Contact",
        paragraphes: [
          "For any question about this policy, you can write to krodi2001@gmail.com.",
        ],
      },
    ],
  },
};

const dictionaries = { fr, en } as const;

export type NavbarDictionary = Dictionary["navbar"];
export type HeroDictionary = Dictionary["hero"];
export type HeroSlide = HeroDictionary["slides"][number];
export type ApprocheDictionary = Dictionary["approche"];
export type MethodeDictionary = Dictionary["methode"];
export type MethodeEtape = MethodeDictionary["etapes"][number];
export type AproposDictionary = Dictionary["apropos"];
export type ExpertisesDictionary = Dictionary["expertises"];
export type ExpertisePole = ExpertisesDictionary["poles"][number];
export type ProjetsDictionary = Dictionary["projets"];
export type Projet = ProjetsDictionary["liste"][number];
export type VisionDictionary = Dictionary["vision"];
export type FondateurDictionary = Dictionary["fondateur"];
export type CtaFinalDictionary = Dictionary["ctaFinal"];
export type ContactDictionary = Dictionary["contact"];
export type WhatsappDictionary = Dictionary["whatsapp"];
export type FooterDictionary = Dictionary["footer"];
export type LegalDictionary = Dictionary["mentionsLegales"];

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

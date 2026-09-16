/* Dictionnaires de langue.

   Principe : une seule source de verite par langue. Les composants ne
   contiennent AUCUN texte en dur — ils recoivent le dictionnaire de la
   langue active. Ajouter une langue = ajouter une entree ici.

   Contrainte technique : ce dictionnaire traverse la frontiere
   Server -> Client Component. Il doit donc rester serialisable :
   uniquement des donnees, jamais de fonction. */

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
        label: "BOURSE & FINANCE",
        src: "/images/hero/finance-markets.jpg",
        alt: "Analyse des marchés financiers depuis un bureau donnant sur Abidjan",
        position: "50% 50%",
      },
      {
        num: "02",
        label: "IMMOBILIER",
        src: "/images/hero/real-estate.jpg",
        alt: "Ouvriers sur un chantier de construction dans un quartier d'affaires",
        position: "78% 50%",
      },
    ],
    a11y: {
      media: "Univers Alfred Winner Services",
      choisir: "Afficher",
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
  /* Section 5 — Qui sommes-nous. Traitement typographique pur : les deux
     seuls visuels disponibles (marches financiers, chantier) sont deja
     mobilises ailleurs (Hero, Expertises) — les reutiliser ici aurait dilue
     leur poids a chaque reprise plutot que d'ajouter quelque chose. La
     clarte et la mesure de lecture portent seules la section, dans le
     droit fil de la discipline ACIM (voir Notre approche / Notre methode). */
  apropos: {
    eyebrow: "QUI SOMMES-NOUS",
    titre: "La valeur ne repose jamais sur un seul levier.",
    paragraphes: [
      "Alfred Winner Services est née d'une conviction simple : la création de valeur ne repose pas sur un seul levier. Capital, actifs et technologie peuvent se compléter.",
      "AWS réunit ainsi finance, immobilier et solutions numériques autour d'une même ambition : identifier les opportunités, structurer les projets et développer des solutions capables de créer une valeur durable.",
    ],
    imageAlt: "Ligne de production automatisée dans une usine",
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
        texte:
          "AWS développe un intérêt et des solutions technologiques à l'intersection de la finance et du numérique — technologies et outils appliqués aux marchés financiers et aux actifs numériques.",
        // Precision volontaire : le cahier des charges interdit d'affirmer
        // ou de laisser entendre une gestion de portefeuille, un conseil
        // reglemente ou un rendement. Cette phrase le rend explicite
        // plutot que de laisser un doute.
        precision:
          "Ces activités ne constituent ni un conseil en investissement réglementé, ni une gestion de portefeuille, ni une promesse de rendement.",
        capacites: null,
        image: "/images/hero/finance-markets.jpg",
        imageAlt:
          "Analyse des marchés financiers depuis un bureau donnant sur Abidjan",
      },
      {
        num: "02",
        hash: "immobilier",
        cle: "CONSTRUIRE",
        titre: "Immobilier",
        texte:
          "AWS intervient dans l'univers immobilier : identification de terrains et d'opportunités, structuration de projets immobiliers et accompagnement lié à leur développement.",
        precision: null,
        capacites: null,
        image: "/images/hero/real-estate.jpg",
        imageAlt:
          "Ouvriers sur un chantier de construction dans un quartier d'affaires",
      },
      {
        num: "03",
        hash: "software-ia",
        cle: "INNOVER",
        titre: "Software & IA",
        texte:
          "AWS conçoit des sites web professionnels, des applications et des logiciels sur mesure, ainsi que des solutions d'automatisation et d'intelligence artificielle adaptées aux besoins concrets des entreprises et des projets.",
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
        image: "/images/expertises/software-ia.jpg",
        imageAlt: "Mains sur un clavier d'ordinateur portable, code affiché à l'écran",
      },
    ],
    ctaPole: "Parlons de votre projet",
  },

  /* Section 7 — Projets & realisations. Objectif : PROUVER, pas affirmer —
     mais sans capture reelle disponible pour aucun des trois projets, la
     preuve visuelle est reportee. Le statut de chaque projet reste celui
     explicitement autorise, mot pour mot, rien de plus. */
  projets: {
    eyebrow: "PROJETS & RÉALISATIONS",
    titre: "La méthode, mise à l'épreuve.",
    paragraphe:
      "Trois projets, à des stades différents, qui appliquent la même méthode : comprendre, structurer, réaliser, faire évoluer.",
    liste: [
      {
        nom: "Baby Tourism",
        categorie: "Tourisme",
        statut: "Démonstrateur digital",
        texte:
          "Projet démonstrateur digital autour du tourisme, pensé comme une vitrine numérique.",
      },
      {
        nom: "Alfred Fitness",
        categorie: "Fitness",
        statut: "Démonstrateur Front-End",
        texte:
          "Démonstrateur Front-End explorant une expérience web dédiée au fitness.",
      },
      {
        nom: "Alfred AI Trader",
        categorie: "Technologie & IA",
        statut: "Prototype interne — environnement DEMO",
        texte:
          "Prototype technologique interne combinant intelligence artificielle et analyse des marchés financiers, actuellement en environnement de démonstration.",
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
    eyebrow: "CONTACT",
    titre: "Parlons de votre projet.",
    adresseLabel: "Adresse",
    adresse: "Cocody Angré — Nouveau CHU, Abidjan, Côte d'Ivoire",
    telephoneLabel: "Téléphone",
    telephone: "(+225) 07 48 19 11 00",
    telephoneHref: "tel:+2250748191100",
    emailLabel: "Email",
    email: "krodi2001@gmail.com",
    emailMailtoHref: "mailto:krodi2001@gmail.com",
    // Recherche textuelle Google Maps, pas une fiche officielle verifiee :
    // le cahier des charges interdit de pretendre qu'un marqueur correspond
    // a une fiche Google Business validee tant qu'elle n'est pas confirmee.
    mapsHref: "https://www.google.com/maps/search/?api=1&query=Cocody%20Angr%C3%A9%20%E2%80%94%20Nouveau%20CHU%2C%20Abidjan%2C%20C%C3%B4te%20d%27Ivoire",
    mapsLabel: "Voir le quartier sur Google Maps (emplacement AWS à confirmer)",
    formulaire: {
      nom: "Nom et prénom",
      entreprise: "Entreprise (facultatif)",
      contactPref: "Email ou téléphone",
      service: "Service recherché",
      serviceOptions: [
        "Bourse & Finance",
        "Immobilier",
        "Software & IA",
        "Autre",
      ],
      message: "Message",
      cta: "Envoyer ma demande",
      note: "Ce formulaire ouvre votre messagerie avec les informations déjà remplies : aucune donnée n'est envoyée à un serveur.",
    },
  },

  /* Footer — reseaux sociaux prets a l'emploi mais VIDES : aucune URL
     officielle confirmee. Le composant n'affiche un reseau que si son
     href est non vide ; ne jamais mettre "#" a la place d'un lien reel. */
  footer: {
    navigationNav: "Navigation",
    servicesLabel: "Nos services",
    universNav: "Nos univers",
    contactsNav: "Nos contacts",
    liensLegauxNav: "Informations légales",
    mentionsLegales: "Mentions légales",
    confidentialite: "Politique de confidentialité",
    suivezNous: "Suivez-nous",
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
          "Le formulaire de contact n'envoie aucune donnée à un serveur : il ouvre votre messagerie avec un message pré-rempli, que vous choisissez ou non d'envoyer depuis votre propre adresse email.",
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
        label: "FINANCE & MARKETS",
        src: "/images/hero/finance-markets.jpg",
        alt: "Financial markets analysis from an office overlooking Abidjan",
        position: "50% 50%",
      },
      {
        num: "02",
        label: "REAL ESTATE",
        src: "/images/hero/real-estate.jpg",
        alt: "Workers on a construction site in a business district",
        position: "78% 50%",
      },
    ],
    a11y: {
      media: "Alfred Winner Services business areas",
      choisir: "Show",
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
      "Alfred Winner Services was founded on a simple conviction: value creation does not rest on a single lever. Capital, assets and technology can work together.",
      "AWS brings together finance, real estate and digital solutions around one ambition: identifying opportunities, structuring projects and building solutions capable of creating lasting value.",
    ],
    imageAlt: "Automated production line in a factory",
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
          "AWS develops technology solutions and interest at the intersection of finance and digital — technologies and tools applied to financial markets and digital assets.",
        precision:
          "These activities do not constitute regulated investment advice, portfolio management, or any promise of return.",
        capacites: null,
        image: "/images/hero/finance-markets.jpg",
        imageAlt:
          "Financial markets analysis from an office overlooking Abidjan",
      },
      {
        num: "02",
        hash: "immobilier",
        cle: "BUILD",
        titre: "Real Estate",
        texte:
          "AWS operates in real estate: identifying land and opportunities, structuring property projects and supporting their development.",
        precision: null,
        capacites: null,
        image: "/images/hero/real-estate.jpg",
        imageAlt:
          "Workers on a construction site in a business district",
      },
      {
        num: "03",
        hash: "software-ia",
        cle: "INNOVATE",
        titre: "Software & AI",
        texte:
          "AWS designs professional websites, applications and custom software, along with automation and artificial intelligence solutions suited to the real needs of businesses and projects.",
        precision: null,
        capacites: [
          "Professional websites",
          "Web applications",
          "Custom software",
          "Automation",
          "AI agents",
        ],
        image: "/images/expertises/software-ia.jpg",
        imageAlt: "Hands on a laptop keyboard, code displayed on screen",
      },
    ],
    ctaPole: "Let's discuss your project",
  },

  projets: {
    eyebrow: "PROJECTS",
    titre: "The method, put to the test.",
    paragraphe:
      "Three projects, at different stages, applying the same method: understand, structure, deliver, evolve.",
    liste: [
      {
        nom: "Baby Tourism",
        categorie: "Tourism",
        statut: "Digital demonstrator",
        texte:
          "A digital demonstrator project built around tourism, designed as a digital showcase.",
      },
      {
        nom: "Alfred Fitness",
        categorie: "Fitness",
        statut: "Front-End demonstrator",
        texte:
          "A Front-End demonstrator exploring a web experience dedicated to fitness.",
      },
      {
        nom: "Alfred AI Trader",
        categorie: "Technology & AI",
        statut: "Internal prototype — DEMO environment",
        texte:
          "An internal technology prototype combining artificial intelligence and financial market analysis, currently running in a demonstration environment.",
      },
    ],
  },

  vision: {
    eyebrow: "VISION",
    titre: "A progressively African and international ambition.",
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
  },

  ctaFinal: {
    titre: "A project to build? Let's talk.",
    sousTitre: "Understand, structure, deliver: the same method for every project.",
    cta: "Let's discuss your project",
  },

  contact: {
    eyebrow: "CONTACT",
    titre: "Let's discuss your project.",
    adresseLabel: "Address",
    adresse: "Cocody Angré — Nouveau CHU, Abidjan, Côte d'Ivoire",
    telephoneLabel: "Phone",
    telephone: "(+225) 07 48 19 11 00",
    telephoneHref: "tel:+2250748191100",
    emailLabel: "Email",
    email: "krodi2001@gmail.com",
    emailMailtoHref: "mailto:krodi2001@gmail.com",
    mapsHref: "https://www.google.com/maps/search/?api=1&query=Cocody%20Angr%C3%A9%20%E2%80%94%20Nouveau%20CHU%2C%20Abidjan%2C%20C%C3%B4te%20d%27Ivoire",
    mapsLabel: "View the area on Google Maps (AWS location to be confirmed)",
    formulaire: {
      nom: "Full name",
      entreprise: "Company (optional)",
      contactPref: "Email or phone",
      service: "Service of interest",
      serviceOptions: [
        "Markets & Finance",
        "Real Estate",
        "Software & AI",
        "Other",
      ],
      message: "Message",
      cta: "Send my request",
      note: "This form opens your own email app with the information already filled in: no data is sent to a server.",
    },
  },

  footer: {
    navigationNav: "Navigation",
    servicesLabel: "Our services",
    universNav: "Our business areas",
    contactsNav: "Our contacts",
    liensLegauxNav: "Legal information",
    mentionsLegales: "Legal notice",
    confidentialite: "Privacy policy",
    suivezNous: "Follow us",
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
          "The contact form does not send any data to a server: it opens your own email app with a pre-filled message, which you may choose to send from your own email address or not.",
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
export type FooterDictionary = Dictionary["footer"];
export type LegalDictionary = Dictionary["mentionsLegales"];

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

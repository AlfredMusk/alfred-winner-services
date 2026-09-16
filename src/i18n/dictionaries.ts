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
};

const dictionaries = { fr, en } as const;

export type NavbarDictionary = Dictionary["navbar"];
export type HeroDictionary = Dictionary["hero"];
export type HeroSlide = HeroDictionary["slides"][number];
export type ApprocheDictionary = Dictionary["approche"];
export type MethodeDictionary = Dictionary["methode"];
export type MethodeEtape = MethodeDictionary["etapes"][number];

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

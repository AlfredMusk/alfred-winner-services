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
};

const dictionaries = { fr, en } as const;

export type NavbarDictionary = Dictionary["navbar"];
export type HeroDictionary = Dictionary["hero"];
export type HeroSlide = HeroDictionary["slides"][number];

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

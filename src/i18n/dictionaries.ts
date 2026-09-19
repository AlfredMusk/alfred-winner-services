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
    imageLegende: "Photographie d’illustration.",
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
        // v6 : photo fournie directement par le fondateur (chantier reel,
        // grues + tours en construction). Voir ASSETS_SOURCES.md.
        image: "/images/expertises/immobilier-v6.jpg",
        imageAlt: "Professionnel du BTP casque en main face à un chantier avec grues",
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
        // v5 : photo fournie directement par le fondateur, approuvee
        // explicitement apres qu'un point d'attention ait ete signale
        // (l'un des deux ecrans affiche une machine Kali Linux et une
        // reference a l'outil HackTricks — sans rapport direct avec le
        // texte de la section, qui parle de sites web/apps/logiciels/
        // automatisation/IA, pas de tests d'intrusion). Alt text reste
        // factuel, ne mentionne ni "hacking" ni "penetration testing"
        // pour ne pas suggerer une activite qu'AWS n'exerce pas. Voir
        // ASSETS_SOURCES.md.
        image: "/images/expertises/software-ia-v5.jpg",
        imageAlt: "Développeur travaillant sur deux ordinateurs portables, code affiché à l'écran",
      },
    ],
    // Distinct du CTA de la Navbar et du CTA final (meme phrase repetee
    // 5 fois sur une seule page, sinon) : une action plus legere, propre
    // a chaque pole plutot qu'un bouton copie-colle.
    ctaPole: "Discuter de ce service",
  },

  /* Section 7 — Projets & realisations. V10 — 6 AXES REELS, sur demande
     explicite du fondateur : "il ne s'agit pas necessairement de 6
     produits commerciaux deja lances [...] projets, realisations,
     experimentations ou solutions effectivement travailles". Chaque
     entree reste au niveau "outil technologique / experimentation",
     jamais un statut commercial invente, jamais un chiffre, jamais un
     client. Deux entrees (05, 06) elargissent la liste precedente
     (reduite a 4 lors d'une passe anterieure — voir historique git) :
       - 05 CONCEPTION WEB MODERNE n'a pas d'identifiant prealable dans
         le projet ; aucune preuve inventee, aucun client cite — la
         phrase reste au niveau capacite/discipline, exactement comme
         fournie par le fondateur, sans pretendre a un livrable nomme.
       - 06 SOLUTIONS & INTELLIGENCE ARTIFICIELLE reprend l'esprit de
         l'ancien "assistant-ia-metier" (jamais confirme livre, retire
         lors d'une passe anterieure) mais elargi et desormais au niveau
         "experimentations et solutions", jamais un produit fini precis
         non confirme.
     04 renomme "Suivi & visualisation multi-actifs" (au lieu de
     "Tableau de bord multi-actifs") + phrase retravaillee : le terme
     "gestion de portefeuille" cree une ambiguite reglementaire (laisse
     entendre qu'AWS gere l'argent de clients) — remplace par un
     vocabulaire d'interface/visualisation, jamais de gestion de fonds. */
  projets: {
    eyebrow: "PROJETS & RÉALISATIONS",
    titre: "Des solutions conçues pour des usages concrets.",
    paragraphe:
      "Six axes de projets et d'expérimentations conçus au sein de l'écosystème AWS, du tourisme digital à l'intelligence artificielle.",
    // NOMS PUBLICS DEPERSONNALISES (passe anterieure) : conserves — les
    // noms de marque reels (Baby Tourism, Alfred Fitness, Alfred AI
    // Trader...) donnes en exemple par le fondateur servent a IDENTIFIER
    // le projet, pas a etre affiches tels quels sur la page publique.
    liste: [
      {
        id: "baby-tourism",
        nom: "Plateforme de découverte touristique",
        categorie: "Tourisme · Web · Expérience numérique",
        texte:
          "Plateforme digitale conçue autour de la découverte et de l'expérience touristique en Côte d'Ivoire.",
      },
      {
        id: "alfred-fitness",
        nom: "Expérience web Fitness",
        categorie: "Web · Fitness · Front-end",
        texte:
          "Expérience web moderne développée autour de l'univers du fitness, de ses services et de son identité digitale.",
      },
      {
        id: "alfred-ai-trader",
        nom: "Plateforme d'analyse de marchés",
        categorie: "Finance · Software · IA",
        texte:
          "Logiciel expérimental combinant analyse de marchés, automatisation et intelligence artificielle.",
      },
      {
        id: "tableau-de-bord-multi-actifs",
        nom: "Suivi & visualisation multi-actifs",
        categorie: "Finance · Data · Interface numérique",
        texte:
          "Interface numérique conçue pour organiser, suivre et visualiser des données liées à différents actifs et opérations.",
      },
      {
        id: "conception-web-moderne",
        nom: "Conception de sites web modernes",
        categorie: "Web · UI/UX · Front-end",
        texte:
          "Conception d'interfaces et de sites web modernes, responsives et pensés pour des usages professionnels.",
      },
      {
        id: "solutions-intelligence-artificielle",
        nom: "Solutions & intelligence artificielle",
        categorie: "IA · Automatisation · Software",
        texte:
          "Expérimentations et solutions numériques intégrant intelligence artificielle, automatisation et agents IA pour répondre à des besoins concrets.",
      },
    ],
  },

  /* Section 8 — Vision. Bande pleine largeur au bleu du Hero (aucune
     nouvelle couleur) : une respiration corporate au milieu d'une page
     autrement blanche/off-white, la meme fonction que le "manifeste" que
     beaucoup de sites institutionnels placent avant le closing. */
  vision: {
    eyebrow: "VISION",
    titre: "Ancrée en Côte d'Ivoire. Pensée pour grandir en Afrique et au-delà.",
    paragraphe:
      "Depuis la Côte d'Ivoire, AWS développe des projets, des actifs et des solutions technologiques conçus pour créer durablement de la valeur. Le logiciel et l'intelligence artificielle y occupent une place croissante.",
  },

  /* Section 9 — Fondateur. Presentation institutionnelle sans photo. */
  fondateur: {
    eyebrow: "FONDATEUR",
    nom: "Krodi Krotchaman Alfred Donald",
    titre: "Fondateur & CEO — Alfred Winner Services",
    paragraphes: [
      "Ingénieur logiciel et entrepreneur, Krodi Krotchaman Alfred Donald développe Alfred Winner Services autour d’une vision réunissant technologie, finance et immobilier.",
      "À travers AWS, il pilote des initiatives numériques et des projets orientés vers l’innovation, la création de valeur et le développement de solutions adaptées aux besoins des entreprises et des particuliers.",
    ],
  },

  ctaFinal: {
    titre: "Un projet à construire ? Parlons-en.",
    sousTitre: "Comprendre, structurer, réaliser : la même méthode pour chaque projet.",
    cta: "Parlons de votre projet",
  },

  /* Section 11 — Contact. Validation client/serveur et envoi SMTP Gmail. */
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
    // remplace l'ancien formulaire court. Champs requis valides
    // cote client ET serveur (voir src/app/api/contact/route.ts).
    //
    // Budget et echeance RETIRES (demande explicite) : le premier contact
    // doit porter sur LE PROJET, pas sur l'argent ou le delai — ces deux
    // sujets se discutent une fois le besoin compris, pas avant.
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
      description: "Description du projet",
      cta: "Envoyer mon projet",
      // Succes seulement apres acceptation SMTP de /api/contact.
      envoiEnCours: "Envoi en cours…",
      succesEnvoye:
        "Votre demande a été transmise au service de messagerie. Merci de nous avoir contactés.",
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
    aideLabel: "Besoin d'aide ?",
    href: whatsappBase,
    message:
      "Bonjour Alfred Winner Services, je souhaite discuter d'un projet.",
  },

  /* Footer — Facebook et profil LinkedIn fournis par Alfred.
     Instagram retire sur demande ; jamais de lien fictif. */
  footer: {
    contactsNav: "Contact",
    reseauxNav: "Réseaux",
    facebookLabel: "Alfred Winner Services sur Facebook",
    linkedinLabel: "Krodi Krotchaman Alfred Donald sur LinkedIn",
    mentionsLegales: "Mentions légales",
    confidentialite: "Politique de confidentialité",
    reseaux: {
      linkedin: "https://www.linkedin.com/in/krotchaman-alfred-donald-krodi-38b684429",
      facebook: "https://www.facebook.com/share/19R1mBiHr6/?mibextid=wwXIfr",
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
          "Les contenus originaux d'Alfred Winner Services, son logo et son identité visuelle appartiennent à AWS. Les photographies et autres contenus tiers restent soumis aux droits et licences de leurs titulaires respectifs.",
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
          "Le formulaire transmet votre nom, votre email, le service recherché, la description du projet et les coordonnées ou informations facultatives renseignées à notre serveur pour validation, puis à Gmail (Google) pour envoi à krodi2001@gmail.com. Votre email sert d'adresse de réponse. Le site ne crée pas de base de données de ces demandes ; les messages sont conservés dans la messagerie AWS pour traiter votre demande. Le traitement par Google relève également de sa politique de confidentialité. Pour toute demande concernant vos données ou leur suppression, contactez-nous à cette adresse. Vous pouvez aussi nous contacter par téléphone, par email ou par WhatsApp.",
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
      "Alfred Winner Services was founded on a simple conviction: capital, assets and technology reinforce one another when brought together.",
      "AWS brings together finance, real estate and digital solutions around one ambition: identifying opportunities, structuring projects and building solutions capable of creating lasting value.",
    ],
    imageAlt: "Professional managing a server infrastructure rack",
    imageLegende: "Illustrative photograph.",
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
        image: "/images/expertises/immobilier-v6.jpg",
        imageAlt: "Construction professional holding a helmet, facing a site with cranes",
      },
      {
        num: "03",
        hash: "software-ia",
        cle: "INNOVATE",
        titre: "Software & AI",
        texte:
          "Professional websites, web applications and custom software, with automation and AI tools designed around the needs of businesses and projects.",
        precision: null,
        capacites: [
          "Professional websites",
          "Web applications",
          "Custom software",
          "Automation",
          "AI agents",
        ],
        image: "/images/expertises/software-ia-v5.jpg",
        imageAlt: "Developer working on two laptops, code displayed on screen",
      },
    ],
    ctaPole: "Discuss this service",
  },

  projets: {
    eyebrow: "PROJECTS & DELIVERABLES",
    titre: "Solutions designed for real-world use.",
    paragraphe:
      "Six axes of projects and experiments built within the AWS ecosystem, from digital tourism to artificial intelligence.",
    liste: [
      {
        id: "baby-tourism",
        nom: "Tourism discovery platform",
        categorie: "Tourism · Web · Digital experience",
        texte:
          "A digital platform built around tourism discovery and experience in Côte d'Ivoire.",
      },
      {
        id: "alfred-fitness",
        nom: "Fitness web experience",
        categorie: "Web · Fitness · Front-end",
        texte:
          "A modern web experience built around the fitness world, its services and its digital identity.",
      },
      {
        id: "alfred-ai-trader",
        nom: "Market analysis platform",
        categorie: "Finance · Software · AI",
        texte:
          "Experimental software combining market analysis, automation and artificial intelligence.",
      },
      {
        id: "tableau-de-bord-multi-actifs",
        nom: "Multi-asset tracking & visualisation",
        categorie: "Finance · Data · Digital interface",
        texte:
          "A digital interface designed to organise, track and visualise data linked to different assets and operations.",
      },
      {
        id: "conception-web-moderne",
        nom: "Modern web design",
        categorie: "Web · UI/UX · Front-end",
        texte:
          "Design of modern, responsive websites and interfaces built for professional use.",
      },
      {
        id: "solutions-intelligence-artificielle",
        nom: "AI & intelligent solutions",
        categorie: "AI · Automation · Software",
        texte:
          "Experiments and digital solutions integrating artificial intelligence, automation and AI agents to address real needs.",
      },
    ],
  },

  vision: {
    eyebrow: "VISION",
    titre: "Rooted in Côte d'Ivoire. Built to grow across Africa and beyond.",
    paragraphe:
      "From Côte d'Ivoire, AWS develops projects, assets and technology solutions designed to create lasting value. Software and artificial intelligence play a growing role within it.",
  },

  fondateur: {
    eyebrow: "FOUNDER",
    nom: "Krodi Krotchaman Alfred Donald",
    titre: "Founder & CEO — Alfred Winner Services",
    paragraphes: [
      "A software engineer and entrepreneur, Krodi Krotchaman Alfred Donald is developing Alfred Winner Services around a vision that brings together technology, finance and real estate.",
      "Through AWS, he leads digital initiatives and projects focused on innovation, value creation and the development of solutions tailored to the needs of businesses and individuals.",
    ],
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
      description: "Project description",
      cta: "Submit my project",
      envoiEnCours: "Sending…",
      succesEnvoye: "Your request has been submitted to the email service. Thank you for contacting us.",
      erreurGenerique:
        "Something went wrong. You can try again, or write to us directly at krodi2001@gmail.com.",
      erreurValidation: "Please correct the fields flagged below.",
      champObligatoire: "This field is required.",
      champEmailInvalide: "Please provide a valid email address.",
    },
  },

  whatsapp: {
    ariaLabel: "Contact Alfred Winner Services on WhatsApp",
    aideLabel: "Need help?",
    href: whatsappBase,
    message: "Hello Alfred Winner Services, I'd like to discuss a project.",
  },

  footer: {
    contactsNav: "Contact",
    reseauxNav: "Social",
    facebookLabel: "Alfred Winner Services on Facebook",
    linkedinLabel: "Krodi Krotchaman Alfred Donald on LinkedIn",
    mentionsLegales: "Legal notice",
    confidentialite: "Privacy policy",
    reseaux: {
      linkedin: "https://www.linkedin.com/in/krotchaman-alfred-donald-krodi-38b684429",
      facebook: "https://www.facebook.com/share/19R1mBiHr6/?mibextid=wwXIfr",
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
          "Alfred Winner Services owns its original content, logo and visual identity. Photographs and other third-party content remain subject to the rights and licences of their respective owners.",
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
          "The form sends your name, email, requested service, project description and any optional contact or project details to our server for validation, then to Gmail (Google) for delivery to krodi2001@gmail.com. Your email is used as the reply address. The website does not create a database of these requests; messages are kept in the AWS mailbox to handle your request. Google's processing is also governed by its privacy policy. Contact us at this address for questions about your data or requests for deletion. You can also reach us by phone, email or WhatsApp.",
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

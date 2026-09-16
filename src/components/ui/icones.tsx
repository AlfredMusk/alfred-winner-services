/* Trois pictogrammes de contact, memes traits que le reste du site
   (stroke 1.6, grille 24) — utilises par Contact.tsx (non rendu sur la
   homepage pour l'instant, conserve pour un usage futur) ET par le
   Footer, qui porte desormais les informations de contact. Centralises
   ici pour ne pas les dupliquer entre les deux fichiers. */
const traits = {
  fill: "none" as const,
  stroke: "currentColor" as const,
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconeLieu = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" {...traits}>
    <path d="M12 21s-6.5-5.7-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.3-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.25" />
  </svg>
);

export const IconeTelephone = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" {...traits}>
    <path d="M4.5 4.5h3.2l1.4 4.3-2.1 1.7a12 12 0 0 0 5.6 5.6l1.7-2.1 4.3 1.4v3.2a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3 6.1a1.5 1.5 0 0 1 1.5-1.6Z" />
  </svg>
);

export const IconeEmail = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" {...traits}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
  </svg>
);

/* Trois pictogrammes pour les Solutions en developpement (Projets.tsx).
   Independants de ceux de Notre approche (fichier verrouille, non
   modifie pour eviter d'exposer un export dont la seule raison serait
   la commodite d'une autre section) mais memes traits (stroke 1.6,
   grille 24) : un seul langage graphique percu par le visiteur, meme si
   deux fichiers sources distincts. */
export const IconePortefeuille = (
  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" {...traits}>
    <path d="M3 19V8.5a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" />
    <path d="M7 15.5l2.5-3 2.5 2 3.5-4.5" />
  </svg>
);

export const IconeStructure = (
  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" {...traits}>
    <path d="M4 20V6l6-2.5V20" />
    <path d="M14 20V9l6-1.5V20" />
    <path d="M2.5 20h19" />
    <path d="M7 8.5v1.2M7 13v1.2M17 11.5v1.2M17 16v1.2" />
  </svg>
);

export const IconeAutomatisation = (
  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" {...traits}>
    <rect x="7.75" y="7.75" width="8.5" height="8.5" rx="1.75" />
    <path d="M10.5 3.5v4.25M13.5 3.5v4.25M10.5 16.25v4.25M13.5 16.25v4.25" />
    <path d="M3.5 10.5h4.25M3.5 13.5h4.25M16.25 10.5h4.25M16.25 13.5h4.25" />
  </svg>
);

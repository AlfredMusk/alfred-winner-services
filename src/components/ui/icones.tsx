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

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

/* WhatsApp : marque reconnaissable, donc en trait plein (comme LinkedIn
   et Facebook dans le Footer) plutot que dans le systeme stroke-1.6 des
   pictogrammes fonctionnels — la meme convention que le reste du site
   applique deja aux logos de marque. */
export const IconeWhatsapp = (
  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="currentColor">
    <path d="M12.02 2.5c-5.26 0-9.52 4.26-9.52 9.52 0 1.68.44 3.29 1.28 4.72L2.5 21.5l4.9-1.28a9.47 9.47 0 0 0 4.62 1.18h.01c5.26 0 9.52-4.26 9.52-9.52 0-2.54-.99-4.93-2.79-6.73a9.45 9.45 0 0 0-6.74-2.65Zm0 17.42h-.01a7.9 7.9 0 0 1-4.03-1.1l-.29-.17-2.99.78.8-2.91-.19-.3a7.86 7.86 0 0 1-1.21-4.2c0-4.36 3.55-7.9 7.92-7.9a7.86 7.86 0 0 1 5.6 2.32 7.85 7.85 0 0 1 2.32 5.59c0 4.36-3.55 7.9-7.92 7.9Zm4.34-5.92c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.17-.7-.63-1.18-1.4-1.31-1.64-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.59 4.11 3.64.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
  </svg>
);

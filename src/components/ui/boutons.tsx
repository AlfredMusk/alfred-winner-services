/* SYSTEME DE BOUTONS AWS — trois variantes, un seul langage.

   Avant cette passe, chaque section inventait sa propre variante de CTA
   (rayon different, hauteur differente, fleche traitee differemment).
   Ces trois constantes sont desormais LA source unique : n'importe quel
   bouton du site doit correspondre a l'une des trois, jamais une
   quatrieme variante ad hoc.

   PRIMARY   — fond plein, l'action la plus importante d'une section.
   SECONDARY — contour, une action de meme rang mais secondaire.
   TEXT_LINK — texte + fleche, l'action la plus legere (liens "en savoir
               plus", CTA a l'interieur d'un bloc de contenu).

   Chaque variante existe en deux tons : SUR_CLAIR (fond blanc/off-white)
   et SUR_FONCE (fond bleu/navy) — le meme bouton ne peut pas avoir la
   meme couleur sur les deux types de fond sans perdre son contraste. */

const BASE =
  "group inline-flex items-center justify-center gap-2 rounded-full text-[0.9375rem] font-semibold transition-colors duration-200 motion-reduce:transition-none active:translate-y-px";

export const boutonPrimaireClair =
  `${BASE} min-h-12 bg-aws-hero px-7 text-white hover:bg-aws-hero-bas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aws-hero`;

export const boutonPrimaireFonce =
  `${BASE} min-h-12 bg-white px-7 text-aws-hero hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`;

export const boutonSecondaireClair =
  `${BASE} min-h-12 border border-aws-hero/25 px-7 text-aws-hero hover:border-aws-hero/50 hover:bg-aws-hero/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aws-hero`;

export const boutonSecondaireFonce =
  `${BASE} min-h-12 border border-white/35 px-7 text-white hover:border-white/70 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`;

export const lienTexteClair =
  "group inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-aws-blue-text transition-colors duration-200 hover:text-aws-hero motion-reduce:transition-none";

export const lienTexteFonce =
  "group inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:text-white/70 motion-reduce:transition-none";

/* La fleche : MEME comportement partout ou elle apparait (Hero, Navbar,
   Expertises, Projets, CTA final) — translation de 4px au survol (dans la
   fourchette 3-5px demandee pour un hover qui se sente reellement, pas
   seulement suppose), jamais d'animation au repos, respect de
   prefers-reduced-motion. */
export const fleche = (
  <span
    aria-hidden="true"
    className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
  >
    →
  </span>
);

/* Aucun "use client" : section entierement statique, 0 JavaScript envoye. */
import type { ApprocheDictionary } from "@/i18n/dictionaries";

/* ------------------------------------------------------------------
   PICTOGRAMMES

   Ils ne sortent pas d'une banque d'icones : les trois motifs existent
   DEJA dans l'embleme du logo AWS — une courbe financiere ascendante,
   une maison, une puce "AI". On les redessine en trait, meme grille de
   24, meme epaisseur, meme famille. Trois SVG en ligne : aucune
   dependance ajoutee pour trois icones.

   Clefs par numero et non par libelle : "01" est stable, "INVESTIR"
   devient "INVEST" en anglais.
   ------------------------------------------------------------------ */
const traits = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PICTOGRAMMES: Record<string, React.ReactElement> = {
  /* 01 — la courbe ascendante et sa fleche, comme dans l'embleme */
  "01": (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true" {...traits}>
      <path d="M3 20h18" />
      <path d="M4 15.5l5-5 3.5 3.5L20 6" />
      <path d="M15.5 6H20v4.5" />
    </svg>
  ),
  /* 02 — les volumes batis, echo des barres montantes de l'embleme */
  "02": (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true" {...traits}>
      <path d="M2.5 20.5h19" />
      <path d="M6 20.5V9l5.5-2.5v14" />
      <path d="M11.5 20.5v-7.5L17.5 11v9.5" />
      <path d="M8.4 11.8v1.4M8.4 15.4v1.4M14.4 14.6V16" />
    </svg>
  ),
  /* 03 — la puce, presente telle quelle dans l'embleme */
  "03": (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true" {...traits}>
      <rect x="7.75" y="7.75" width="8.5" height="8.5" rx="1.75" />
      <path d="M10.5 3.5v4.25M13.5 3.5v4.25M10.5 16.25v4.25M13.5 16.25v4.25" />
      <path d="M3.5 10.5h4.25M3.5 13.5h4.25M16.25 10.5h4.25M16.25 13.5h4.25" />
    </svg>
  ),
};

export default function Approach({ dict }: { dict: ApprocheDictionary }) {
  return (
    <section aria-labelledby="approche-titre" className="bg-white">
      {/* Meme container que la navbar et le Hero. */}
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 desk:px-8">
        <div className="py-12 sm:py-14 desk:py-16">

          {/* INTRODUCTION — un seul groupe editorial.
              Le titre et son paragraphe sont empiles et bornes en largeur,
              plutot que renvoyes aux deux extremites de la ligne : ils se
              lisent d'un seul tenant. */}
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-aws-blue-text">
            {dict.eyebrow}
          </p>
          <h2
            id="approche-titre"
            className="mt-4 max-w-[24ch] text-balance text-[1.6875rem] font-bold leading-[1.15] tracking-[-0.02em] text-aws-hero sm:text-[1.9375rem] desk:text-[2.25rem]"
          >
            {dict.titre}
          </h2>
          <p className="mt-4 max-w-[62ch] text-[0.9375rem] leading-[1.65] text-aws-ink/80 desk:text-[1rem]">
            {dict.paragraphe}
          </p>

          {/* LES TROIS PILIERS — une seule bande, pas trois cartes.

              Flexbox : row a partir de 1100, column en dessous.
              Aucun gap entre les colonnes : leurs filets superieurs se
              rejoignent et forment UNE ligne continue en travers de la
              bande. Les separations viennent d'un filet vertical tres
              discret et du padding interne, jamais d'un fond ou d'une
              ombre. Chaque colonne est amorcee par un trait bleu court —
              la ligne d'accent. */}
          <ul className="mt-10 flex flex-col desk:mt-12 desk:flex-row">
            {dict.piliers.map((p, i) => {
              const premier = i === 0;
              const dernier = i === dict.piliers.length - 1;
              // La gouttiere de 40px ne se pose QUE la ou il y a un voisin :
              // pas de pl sur le premier, pas de pr sur le dernier. Sinon le
              // dernier texte s'arreterait avant la fin du filet.
              const marges =
                (premier ? "" : "desk:border-l desk:border-aws-line desk:pl-10 ") +
                (dernier ? "" : "desk:pr-10 ");
              return (
                <li
                  key={p.num}
                  className={
                    "relative flex-1 border-t border-aws-line pt-6 " +
                    (premier ? "" : "mt-10 desk:mt-0 ") +
                    marges
                  }
                >
                  {/* Ligne d'accent : un segment bleu pose sur le filet gris,
                      a l'aplomb du texte de la colonne. */}
                  <span
                    aria-hidden="true"
                    className={
                      "absolute top-0 h-[2px] w-10 rounded-full bg-aws-blue-text " +
                      (premier ? "left-0" : "left-0 desk:left-10")
                    }
                  />

                  <div className="text-aws-blue-text">{PICTOGRAMMES[p.num]}</div>

                  <p className="mt-4 flex items-baseline gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-aws-blue-text">
                    <span className="tabular-nums">{p.num}</span>
                    <span aria-hidden="true" className="text-aws-ink/25">—</span>
                    {p.cle}
                  </p>

                  <h3 className="mt-2.5 text-[1.1875rem] font-semibold leading-snug tracking-[-0.01em] text-aws-hero desk:text-[1.25rem]">
                    {p.titre}
                  </h3>

                  {/* Mesure bornee UNIQUEMENT en pile : en colonne la largeur vient
                      deja du pilier, mais empile le texte s'etalait sur 976px,
                      soit plus de 130 caracteres par ligne. */}
                  <p className="mt-2 max-w-[54ch] text-[0.9375rem] leading-[1.65] text-aws-ink/80 desk:max-w-none">
                    {p.texte}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

import type { ProjetsDictionary, Projet } from "@/i18n/dictionaries";

/* V10 — 6 AXES, numero de retour. La liste est passee de 4 a 6 entrees
   (voir dictionaries.ts) : le numero redevient une information reelle
   (position dans les 6 axes, pas une decoration) et sert aussi de repere
   de lecture rapide sur une grille 2x3 — retire en V9 quand la liste
   n'avait que 4 entrees administratives sans axes, reintroduit ici avec
   un traitement discret (meme echelle que la categorie, pas un gros
   chiffre watermark — la lecon du ghost-numeral d'Approche.tsx
   s'applique aussi ici). Meme filet d'accent que Notre approche/Qui
   sommes-nous, meme langage visuel que le reste du site. */
function CarteProjet({ projet, numero }: { projet: Projet; numero: string }) {
  return (
    <li id={`projet-${projet.id}`} className="reveal group scroll-mt-24">
      <span
        aria-hidden="true"
        className="block h-[2px] w-10 rounded-full bg-aws-blue-text transition-[width] duration-300 motion-reduce:transition-none desk:group-hover:w-16"
      />
      <p className="mt-4 flex items-baseline gap-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-aws-blue-text">
        <span aria-hidden="true" className="tabular-nums text-aws-ink/35">
          {numero}
        </span>
        <span aria-hidden="true" className="text-aws-ink/25">
          —
        </span>
        {projet.categorie}
      </p>
      <h3 className="mt-2 text-[1.1875rem] font-bold leading-snug tracking-[-0.01em] text-aws-hero transition-colors duration-300 motion-reduce:transition-none group-hover:text-aws-navy">
        {projet.nom}
      </h3>
      <p className="mt-2.5 max-w-[42ch] text-[0.9375rem] leading-[1.65] text-aws-ink/80">
        {projet.texte}
      </p>
    </li>
  );
}

export default function Projets({ dict }: { dict: ProjetsDictionary }) {
  return (
    <section id="projets" aria-labelledby="projets-titre" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 desk:px-8">
        <div className="border-t border-aws-line py-12 sm:py-14 desk:py-16">
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-aws-blue-text">
            {dict.eyebrow}
          </p>
          <h2
            id="projets-titre"
            className="mt-4 max-w-[20ch] text-balance text-[1.6875rem] font-bold leading-[1.15] tracking-[-0.02em] text-aws-hero sm:text-[1.9375rem] desk:text-[2.25rem]"
          >
            {dict.titre}
          </h2>
          <p className="mt-4 max-w-[58ch] text-[0.9375rem] leading-[1.65] text-aws-ink/85 desk:text-[1rem]">
            {dict.paragraphe}
          </p>

          {/* 2 colonnes x 3 lignes des le desktop (6 entrees), 1 colonne
              en mobile : la grille existante n'a pas besoin de changer de
              structure, seul le nombre d'entrees passe de 4 a 6. */}
          <ul className="mt-10 grid gap-x-12 gap-y-12 desk:mt-14 desk:grid-cols-2 desk:gap-x-16 desk:gap-y-14">
            {dict.liste.map((projet, i) => (
              <CarteProjet key={projet.id} projet={projet} numero={String(i + 1).padStart(2, "0")} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

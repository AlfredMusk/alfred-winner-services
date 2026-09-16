import type { ProjetsDictionary, Projet } from "@/i18n/dictionaries";
import { fleche } from "@/components/ui/boutons";

/* V3 — changement de direction assume : les grandes ProjectCards bleues
   (V2) occupaient trop d'espace au regard de l'importance actuelle des
   projets. Remplacees par une liste editoriale compacte — numeros,
   typographie, filets, comme Notre methode plus haut sur la page, pas
   des rectangles de couleur. Meme discipline que la distinction
   observee chez ACIM entre "ce qu'ils savent faire" (cartes solutions)
   et "qui ils servent" (liste sobre des secteurs) : ici, AUCUN projet
   n'est presente comme une realisation client — uniquement les trois
   initiatives documentees, avec leur statut exact. */
function LigneProjet({ projet, numero, dernier }: { projet: Projet; numero: string; dernier: boolean }) {
  return (
    <li className={"flex gap-5 py-7 sm:gap-8" + (dernier ? "" : " border-b border-aws-line")}>
      <span
        aria-hidden="true"
        className="w-10 shrink-0 text-[0.8125rem] font-semibold tabular-nums text-aws-ink/35 sm:w-14 sm:text-[0.9375rem]"
      >
        {numero}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-[1.0625rem] font-bold leading-snug text-aws-hero desk:text-[1.1875rem]">
            {projet.nom}
          </h3>
          <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-aws-blue-text">
            {projet.categorie}
          </span>
        </div>
        <p className="mt-2 max-w-[62ch] text-[0.9375rem] leading-[1.65] text-aws-ink/80">
          {projet.texte}
        </p>
        <p className="mt-3 flex items-center gap-2 text-[0.8125rem] font-medium text-aws-ink/50">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-aws-blue-text/60" />
          {projet.statut}
        </p>
      </div>
      <span aria-hidden="true" className="hidden shrink-0 self-center text-aws-ink/25 sm:block">
        {fleche}
      </span>
    </li>
  );
}

export default function Projets({ dict }: { dict: ProjetsDictionary }) {
  return (
    <section id="projets" aria-labelledby="projets-titre" className="bg-white">
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

          <ol className="mt-10 border-t border-aws-line desk:mt-12">
            {dict.liste.map((projet, i) => (
              <LigneProjet
                key={projet.nom}
                projet={projet}
                numero={String(i + 1).padStart(2, "0")}
                dernier={i === dict.liste.length - 1}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

import type { ProjetsDictionary, Projet, Concept } from "@/i18n/dictionaries";
import { fleche } from "@/components/ui/boutons";
import { IconePortefeuille, IconeStructure, IconeAutomatisation } from "@/components/ui/icones";

/* V4 — deux blocs desormais clairement separes, sur demande explicite :
   AWS ne doit jamais melanger "ce qui existe" et "ce qui est a l'etude".
   Le meme risque que celui deja documente pour la section Expertises
   (ne jamais transformer une formulation generale en promesse precise)
   s'applique ici a l'envers : ne jamais transformer une direction future
   en realisation. Chaque concept porte donc un badge "Concept" repete,
   et vit dans un bloc visuellement distinct (fond off-white, grille
   compacte) de la liste des demonstrateurs reels (fond blanc, lignes
   numerotees). */

function LigneProjet({ projet, numero, dernier }: { projet: Projet; numero: string; dernier: boolean }) {
  return (
    <li className={"reveal flex gap-5 py-7 sm:gap-8" + (dernier ? "" : " border-b border-aws-line")}>
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

const ICONES_CONCEPT: Record<string, React.ReactElement> = {
  portefeuille: IconePortefeuille,
  structure: IconeStructure,
  automatisation: IconeAutomatisation,
};

function CarteConcept({ concept }: { concept: Concept }) {
  return (
    <li className="reveal rounded-xl border border-aws-line bg-white p-6">
      <div className="text-aws-blue-text">{ICONES_CONCEPT[concept.icone]}</div>
      <h4 className="mt-3 text-[1rem] font-bold leading-snug text-aws-hero">{concept.titre}</h4>
      <p className="mt-2 text-[0.875rem] leading-[1.6] text-aws-ink/75">{concept.texte}</p>
      <span className="mt-3 inline-flex items-center rounded-full border border-aws-blue-text/30 px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-aws-blue-text">
        {concept.statut}
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

          {/* BLOC 2 — SOLUTIONS EN DEVELOPPEMENT. Rupture de surface
              deliberee (off-white, coins arrondis, grille compacte) :
              le visiteur doit sentir, avant meme de lire, qu'il change
              de registre — de "ce qui existe" a "ce qui est a l'etude". */}
          <div className="reveal mt-14 rounded-2xl bg-aws-surface p-6 sm:p-8 desk:mt-16 desk:p-10">
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-aws-ink/50">
              {dict.concepts.eyebrow}
            </p>
            <p className="mt-2 max-w-[58ch] text-[0.875rem] leading-[1.6] text-aws-ink/70">
              {dict.concepts.intro}
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 desk:grid-cols-3">
              {dict.concepts.items.map((concept) => (
                <CarteConcept key={concept.titre} concept={concept} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

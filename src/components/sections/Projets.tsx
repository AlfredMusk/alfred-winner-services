import type { ProjetsDictionary } from "@/i18n/dictionaries";

/* Aucune capture ecran validee pour aucun des trois projets (voir travaux
   realises.md). Plutot qu'un cadre gris qui lirait comme un asset casse,
   chaque projet est presente en texte seul : nom, categorie, statut EXACT
   (mot pour mot autorise), description factuelle. Rien de plus. */
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

          <ul className="mt-10 flex flex-col desk:mt-12 desk:flex-row">
            {dict.liste.map((projet, i) => {
              const premier = i === 0;
              const dernier = i === dict.liste.length - 1;
              const marges =
                (premier ? "" : "desk:border-l desk:border-aws-line desk:pl-10 ") +
                (dernier ? "" : "desk:pr-10 ");
              return (
                <li
                  key={projet.nom}
                  className={
                    "flex-1 border-t border-aws-line pt-6 " +
                    (premier ? "" : "mt-10 desk:mt-0 ") +
                    marges
                  }
                >
                  <h3 className="text-[1.125rem] font-bold leading-snug text-aws-hero">
                    {projet.nom}
                  </h3>
                  <p className="mt-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-aws-blue-text">
                    {projet.categorie}
                  </p>
                  <span className="mt-3 inline-flex items-center rounded-full bg-aws-line px-3 py-1 text-[0.75rem] font-medium text-aws-ink/80">
                    {projet.statut}
                  </span>
                  <p className="mt-3 max-w-[42ch] text-[0.9375rem] leading-[1.65] text-aws-ink/80">
                    {projet.texte}
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

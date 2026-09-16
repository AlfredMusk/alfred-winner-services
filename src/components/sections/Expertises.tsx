import Image from "next/image";
import type { ExpertisesDictionary, ExpertisePole } from "@/i18n/dictionaries";

/* Le pictogramme "puce IA", identique a celui de Notre approche : Innover
   n'a pas de photographie validee (aucune capture de developpement dans
   les assets), et un cadre vide aurait l'air d'un oubli. Reprendre ce
   motif ici — plusieurs sections plus loin, pas juste apres Notre
   approche — le fait lire comme un rappel volontaire des trois univers,
   pas comme une redite. */
const PICTO_PUCE = (
  <svg
    viewBox="0 0 24 24"
    className="h-16 w-16"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.3}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="7.75" y="7.75" width="8.5" height="8.5" rx="1.75" />
    <path d="M10.5 3.5v4.25M13.5 3.5v4.25M10.5 16.25v4.25M13.5 16.25v4.25" />
    <path d="M3.5 10.5h4.25M3.5 13.5h4.25M16.25 10.5h4.25M16.25 13.5h4.25" />
  </svg>
);

function Pole({ pole, inverse, cta }: { pole: ExpertisePole; inverse: boolean; cta: string }) {
  return (
    <li
      id={pole.hash}
      className="scroll-mt-24 border-t border-aws-line py-12 desk:py-14"
    >
      {/* scroll-mt-24 : les liens de la navbar (#bourse-finance, etc.)
          sautent directement ici. Sans marge de defilement, le contenu
          se retrouverait cache sous la navbar sticky. */}
      <div
        className={
          "flex flex-col gap-8 desk:flex-row desk:items-center desk:gap-16 " +
          (inverse ? "desk:flex-row-reverse" : "")
        }
      >
        <div className="desk:w-1/2">
          <p className="flex items-baseline gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-aws-blue-text">
            <span className="tabular-nums">{pole.num}</span>
            <span aria-hidden="true" className="text-aws-ink/25">
              —
            </span>
            {pole.cle}
          </p>
          <h3 className="mt-2.5 text-[1.375rem] font-bold leading-snug tracking-[-0.01em] text-aws-hero desk:text-[1.625rem]">
            {pole.titre}
          </h3>
          <p className="mt-3 max-w-[58ch] text-[0.9375rem] leading-[1.65] text-aws-ink/85">
            {pole.texte}
          </p>
          {pole.precision && (
            <p className="mt-3 max-w-[58ch] text-[0.8125rem] leading-[1.6] text-aws-ink/60">
              {pole.precision}
            </p>
          )}
          <a
            href="#contact"
            className="group mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-aws-blue-text transition-colors duration-200 hover:text-aws-hero motion-reduce:transition-none"
          >
            {cta}
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
            >
              →
            </span>
          </a>
        </div>

        <div className="desk:w-1/2">
          {pole.image ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-aws-line">
              <Image
                src={pole.image}
                alt={pole.imageAlt ?? ""}
                fill
                sizes="(min-width: 1100px) 44vw, 92vw"
                className="object-cover"
              />
            </div>
          ) : (
            /* Pas de photo : un aplat de couleur porte le pictogramme
               plutot qu'un cadre vide qui lirait comme un asset manquant. */
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-aws-hero text-white/90">
              {PICTO_PUCE}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default function Expertises({ dict }: { dict: ExpertisesDictionary }) {
  return (
    <section id="expertises" aria-labelledby="expertises-titre" className="bg-aws-surface">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 desk:px-8">
        <div className="border-t border-aws-ink/18 py-12 sm:py-14 desk:py-16">
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-aws-blue-text">
            {dict.eyebrow}
          </p>
          <h2
            id="expertises-titre"
            className="mt-4 max-w-[20ch] text-balance text-[1.6875rem] font-extrabold leading-[1.12] tracking-[-0.02em] text-aws-hero sm:text-[1.9375rem] desk:text-[2.25rem]"
          >
            {dict.titre}
          </h2>

          {/* Alternance texte/image d'un pole a l'autre : discipline ACIM
              (alterner casse la monotonie d'une liste repetee trois fois),
              identite AWS (les images sont les notres, deja etablies). */}
          <ul className="mt-2">
            {dict.poles.map((pole, i) => (
              <Pole key={pole.num} pole={pole} inverse={i % 2 === 1} cta={dict.ctaPole} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

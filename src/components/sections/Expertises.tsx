import Image from "next/image";
import type { ExpertisesDictionary, ExpertisePole } from "@/i18n/dictionaries";
import { boutonSecondaireClair, fleche } from "@/components/ui/boutons";

/* V3 — raffinement, pas de reconstruction (la direction alternance
   texte/image + CTA est conservee telle quelle sur demande explicite).

   Deux ajustements :

   1. UN ACCENT PAR PILIER, PAS TROIS COULEURS. Les trois cartes etaient
      visuellement trop uniformes. Un filet gauche de 4px, une teinte
      differente par pole, mais TOUJOURS puisee dans la famille bleue
      existante — jamais une nouvelle couleur, jamais rouge/vert/jaune :
        01 INVESTIR   aws-navy       (le plus profond -> serieux financier)
        02 CONSTRUIRE aws-muted      (bleu-gris sourd -> mineral, neutre chaud)
        03 INNOVER    aws-blue-text  (le plus clair -> technologique, froid)
      Le visiteur percoit une variation, pas un changement de marque.

   2. CAPACITES EN LISTE EDITORIALE, PAS EN PILLS. Les badges arrondis
      ressemblaient a des "features" SaaS. Remplaces par une ligne de
      texte separee par des points medians — la meme discipline que la
      liste de technologies observee chez ACIM sous leurs propres
      cartes, sans en reprendre le style visuel. */
const ACCENTS: Record<string, string> = {
  "01": "border-l-aws-navy",
  "02": "border-l-aws-muted",
  "03": "border-l-aws-blue-text",
};

/* Fond du cadre-image derriere l'object-cover, par pole — trois
   atmospheres distinctes, purement decoratives (aucun texte ne repose
   dessus, donc aucun risque de contraste) :
     01 INVESTIR   lavis navy tres discret  -> froid, financier
     02 CONSTRUIRE aws-sand (deja documente) -> chaud, mineral
     03 INNOVER    lavis bleu-text discret  -> froid, technologique
   Les trois restent dans la famille bleue existante + le sable deja
   approuve : aucune nouvelle couleur introduite. */
const FOND_IMAGE: Record<string, string> = {
  "01": "bg-aws-navy/[0.07]",
  "02": "bg-aws-sand",
  "03": "bg-aws-blue-text/[0.07]",
};

function Pole({
  pole,
  inverse,
  cta,
}: {
  pole: ExpertisePole;
  inverse: boolean;
  cta: string;
}) {
  return (
    <li id={pole.hash} className="reveal scroll-mt-24">
      {/* scroll-mt-24 : les liens de la navbar (#bourse-finance, etc.)
          sautent directement ici, sans se cacher sous la navbar sticky. */}
      <div
        className={`rounded-2xl border border-aws-line border-l-4 bg-white p-6 sm:p-8 desk:p-10 ${ACCENTS[pole.num]}`}
      >
        <div
          className={
            "flex flex-col gap-8 desk:flex-row desk:items-center desk:gap-14 " +
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
              <p className="mt-3 max-w-[58ch] text-[0.8125rem] leading-[1.6] text-aws-ink/70">
                {pole.precision}
              </p>
            )}

            {/* Capacites : uniquement quand elles sont explicitement
                confirmees (voir dictionaries.ts) — jamais une liste
                commerciale devinee pour Investir/Construire. Ligne
                editoriale (points medians), pas des pills. */}
            {pole.capacites && (
              <p className="mt-4 max-w-[58ch] text-[0.8125rem] leading-[1.7] text-aws-ink/70">
                {pole.capacites.join(" · ")}
              </p>
            )}

            <a href="#contact" className={`mt-6 ${boutonSecondaireClair}`}>
              {cta}
              {fleche}
            </a>
          </div>

          <div className="desk:w-1/2">
            {/* Une seule photographie par pole, meme traitement pour les
                trois : le diptyque photo+video du pole Innover (V?) a ete
                retire — jugee gadget/trop chargee a la relecture. Une
                image forte et coherente avec le texte suffit. */}
            <div
              className={`group relative aspect-[4/3] overflow-hidden rounded-xl ${FOND_IMAGE[pole.num]}`}
            >
              <Image
                src={pole.image!}
                alt={pole.imageAlt ?? ""}
                fill
                sizes="(min-width: 1100px) 40vw, 88vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.01] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Expertises({ dict }: { dict: ExpertisesDictionary }) {
  return (
    <section id="expertises" aria-labelledby="expertises-titre" className="scroll-mt-24 bg-aws-surface">
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
              identite AWS (les images sont les notres, deja etablies).
              Gap 24-40px : chaque pole est desormais une carte visible,
              l'espacement remplace le trait qui les separait en V1. */}
          <ul className="mt-8 flex flex-col gap-6 desk:mt-10 desk:gap-8">
            {dict.poles.map((pole, i) => (
              <Pole key={pole.num} pole={pole} inverse={i % 2 === 1} cta={dict.ctaPole} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

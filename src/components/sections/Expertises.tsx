import Image from "next/image";
import type {
  ExpertisesDictionary,
  ExpertisePole,
  Projet,
} from "@/i18n/dictionaries";
import { boutonSecondaireClair, fleche } from "@/components/ui/boutons";
import { IconePortefeuille, IconeStructure, IconeAutomatisation } from "@/components/ui/icones";
import VideoRobotique from "@/components/ui/VideoRobotique";

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

const ICONES_SOLUTION: Record<string, React.ReactElement> = {
  portefeuille: IconePortefeuille,
  structure: IconeStructure,
  automatisation: IconeAutomatisation,
};

function Pole({
  pole,
  inverse,
  cta,
  solutionAssocieeLabel,
  projet,
  robotique,
}: {
  pole: ExpertisePole;
  inverse: boolean;
  cta: string;
  solutionAssocieeLabel: string;
  /* L'entree correspondante de Projets & Initiatives. Le nom et le statut
     ne sont PLUS recopies ici : ils viennent de la, une seule fois, donc
     une divergence FR/EN entre les deux sections est devenue impossible
     par construction. */
  projet: Projet | undefined;
  /* Media secondaire, UNIQUEMENT pour le pole Innover (num === "03") —
     voir le rendu plus bas. undefined pour les deux autres poles. */
  robotique?: { ariaLabel: string; legende: string };
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

            {/* SOLUTION ASSOCIEE — reference editoriale, pas un champ
                d'interface. La version precedente (bordure + fond +
                icone en prefixe) se lisait comme un input ou une carte
                miniature ; retiree au profit d'une ligne simple, dans le
                MEME langage que "capacites" juste au-dessus (petit
                pictogramme suivi de texte courant), qui pointe vers
                Projets & Initiatives (une seule source de verite, jamais
                deux formulations du meme statut). */}
            {projet && (
              <a
                href={`#projet-${projet.id}`}
                className="group/solution mt-4 inline-flex items-baseline gap-2 text-[0.8125rem] leading-[1.6] text-aws-ink/70 transition-colors duration-200 hover:text-aws-hero motion-reduce:transition-none"
              >
                <span className="inline-flex h-4 w-4 shrink-0 translate-y-[3px] items-center justify-center text-aws-blue-text/70 [&>svg]:h-4 [&>svg]:w-4">
                  {ICONES_SOLUTION[pole.solutionAssociee.icone]}
                </span>
                <span>
                  <span className="text-aws-ink/50">{solutionAssocieeLabel} —</span>{" "}
                  <span className="font-semibold text-aws-hero underline decoration-aws-line decoration-1 underline-offset-4 group-hover/solution:decoration-aws-blue-text">
                    {projet.nom}
                  </span>{" "}
                  <span className="text-aws-ink/50">({projet.statut})</span>
                </span>
              </a>
            )}

            <a href="#contact" className={`mt-6 ${boutonSecondaireClair}`}>
              {cta}
              {fleche}
            </a>
          </div>

          <div className="desk:w-1/2">
            {robotique ? (
              /* DIPTYQUE EDITORIAL — deux medias, JAMAIS un chevauchement.
                 La version precedente posait la video en petite carte qui
                 debordait sur la photo ("picture-in-picture") : releve a la
                 relecture comme un effet de collage, pas de composition.
                 Ici, deux cadres INDEPENDANTS, memes coins arrondis, un
                 vrai espace entre eux (gap-3) — la photo (mains/clavier,
                 le geste humain du metier) et la video (automatisation,
                 la direction technologique) se lisent comme deux faits
                 distincts, pas comme un fond + une vignette dessus.

                 Mobile : empiles (chacun son propre ratio 4/3).
                 Desktop : cote a cote, meme hauteur (le bloc entier passe
                 en ratio 4/3, chaque panneau devient h-full — largeur
                 differente, hauteur identique, aucun jeu vertical). */
              <div className="flex flex-col gap-3 desk:aspect-[4/3] desk:flex-row">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-aws-blue-text/[0.07] desk:aspect-auto desk:h-full desk:w-[62%]">
                  <Image
                    src={pole.image!}
                    alt={pole.imageAlt ?? ""}
                    fill
                    sizes="(min-width: 1100px) 25vw, 88vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-aws-line desk:aspect-auto desk:h-full desk:w-[38%]">
                  <VideoRobotique
                    src="/videos/robotique-automatisation.mp4"
                    poster="/images/expertises/robotique-poster.jpg"
                    ariaLabel={robotique.ariaLabel}
                  />
                </div>
              </div>
            ) : (
              <div
                className={`group relative aspect-[4/3] overflow-hidden rounded-xl ${FOND_IMAGE[pole.num]}`}
              >
                <Image
                  src={pole.image!}
                  alt={pole.imageAlt ?? ""}
                  fill
                  sizes="(min-width: 1100px) 40vw, 88vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>
            )}

            {/* Legende TOUJOURS visible, jamais reservee au survol : sur
                tactile, personne ne "survole" rien — une precision aussi
                importante que "AWS ne possede pas ce robot" ne peut pas
                dependre d'un geste que la moitie des visiteurs ne fera
                jamais. */}
            {robotique && (
              <p className="mt-2.5 text-[0.75rem] leading-snug text-aws-ink/70">{robotique.legende}</p>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Expertises({
  dict,
  projets,
}: {
  dict: ExpertisesDictionary;
  projets: readonly Projet[];
}) {
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
              <Pole
                key={pole.num}
                pole={pole}
                inverse={i % 2 === 1}
                cta={dict.ctaPole}
                solutionAssocieeLabel={dict.solutionAssocieeLabel}
                projet={projets.find((p) => p.id === pole.solutionAssociee.projetId)}
                robotique={pole.num === "03" ? dict.robotique : undefined}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

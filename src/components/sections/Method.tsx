/* V4 — REDESIGN DE LA MISE EN SCENE, pas du contenu. Le contenu (les
   quatre etapes) reste exactement le meme — la demande explicite est
   de transformer "quatre paragraphes separes par des filets" en un
   veritable PROCESS visible.

   Deux compositions distinctes, pas une seule comprimee :
     MOBILE  : timeline verticale — une ligne descend le long des
               etapes empilees, la meme lecture naturelle qu'un fil.
     DESKTOP : stepper horizontal — quatre etapes alignees, reliees par
               une ligne commune, qui se lit comme une chaine de
               production plutot que comme un article.

   La ligne se REMPLIT pendant le defilement (voir .methode-ligne-remplie
   dans globals.css) : un seul element porte le timeline scroll-pilote
   (lui-meme), pas un systeme synchronise entre plusieurs enfants. Aucun
   JavaScript — memes garanties que .reveal (voir globals.css) :
   invisible seulement si le navigateur ne peut pas l'animer, jamais si
   le JS echoue ou tarde. */
import { Fragment } from "react";
import type { MethodeDictionary } from "@/i18n/dictionaries";

export default function Method({ dict }: { dict: MethodeDictionary }) {
  const dernierIndex = dict.etapes.length - 1;

  return (
    <section aria-labelledby="methode-titre" className="bg-aws-surface">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 desk:px-8">
        {/* Transition avec Notre approche : fond blanc -> aws-surface,
            filet aws-ink/18 — inchange, deja verifie. */}
        <div className="border-t border-aws-ink/18 py-12 sm:py-14 desk:py-16">
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-aws-blue-text">
            {dict.eyebrow}
          </p>

          {/* Titre reconstruit a partir des quatre etapes — inchange,
              deja verifie (coupure de ligne, fleches decoratives). */}
          <h2
            id="methode-titre"
            className="mt-5 text-[1.875rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-aws-hero sm:text-[2.375rem] desk:text-[2.75rem]"
          >
            {dict.etapes.map((e, i) => (
              <Fragment key={e.num}>
                <span className="whitespace-nowrap">
                  {e.cle}
                  {i < dernierIndex && (
                    <span
                      aria-hidden="true"
                      className="pl-[0.22em] align-[0.02em] text-[0.72em] font-light text-aws-blue-text"
                    >
                      →
                    </span>
                  )}
                </span>
                {i < dernierIndex ? " " : null}
              </Fragment>
            ))}
          </h2>

          <p className="mt-4 max-w-[58ch] text-[0.9375rem] leading-[1.65] text-aws-ink/85 desk:text-[1rem]">
            {dict.paragraphe}
          </p>

          {/* ============ MOBILE / TABLETTE — timeline verticale ============ */}
          <ol className="reveal relative mt-12 desk:hidden">
            {/* Piste : filet fixe, toujours visible — la ligne remplie
                vient par-dessus, jamais a sa place : un navigateur sans
                support d'animation garde une piste coherente. */}
            <div aria-hidden="true" className="absolute left-[19px] top-2 bottom-2 w-px bg-aws-line" />
            <div
              aria-hidden="true"
              className="methode-ligne-remplie absolute left-[19px] top-2 bottom-2 w-px origin-top bg-aws-blue-text"
            />
            {dict.etapes.map((e, i) => (
              <li key={e.num} className={"relative flex gap-5" + (i < dernierIndex ? " pb-10" : "")}>
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-aws-hero text-[0.875rem] font-bold tabular-nums text-white ring-4 ring-aws-surface">
                  {e.num}
                </span>
                <div className="min-w-0 flex-1 pt-1.5">
                  <h3 className="text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em]">
                    <span className="uppercase tracking-[0.04em] text-aws-blue-text">{e.cle}</span>{" "}
                    <span aria-hidden="true" className="px-0.5 text-aws-ink/25">
                      —
                    </span>{" "}
                    <span className="text-aws-hero">{e.titre}</span>
                  </h3>
                  <p className="mt-2 max-w-[39.75rem] text-[0.9375rem] leading-[1.65] text-aws-ink/80">
                    {e.texte}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* ============ DESKTOP — stepper horizontal ============ */}
          <div className="relative mt-16 hidden desk:block">
            {/* Piste + ligne remplie : jointes au CENTRE du 1er et du 4e
                badge d'une grille a 4 colonnes egales (chaque badge est
                lui-meme centre dans sa colonne, cf. items-center
                ci-dessous). PREMIER CALCUL FAUX, CORRIGE PAR MESURE : un
                simple "left-[12.5%]" (100%/4 colonnes / 2) ignorait le
                gap-8 (32px) entre colonnes — verifie a l'ecran, la ligne
                s'arretait 12px avant chaque badge exterieur. gap-8 sur 4
                colonnes retire 3 x 32px de la largeur AVANT de diviser en
                4 : le centre de la 1ere colonne n'est donc pas a 12.5%
                pile, mais 12px de moins — formule exacte a TOUTE largeur
                (verifiee par calcul, pas approximee a une seule valeur) :
                calc(12.5% - 12px), symetrique des deux cotes. top-[19px] =
                la moitie de la hauteur du badge (h-10 = 40px). */}
            <div
              aria-hidden="true"
              className="absolute top-[19px] h-px bg-aws-line"
              style={{ left: "calc(12.5% - 12px)", right: "calc(12.5% - 12px)" }}
            />
            <div
              aria-hidden="true"
              className="methode-ligne-remplie absolute top-[19px] h-px origin-left bg-aws-blue-text"
              style={{ left: "calc(12.5% - 12px)", right: "calc(12.5% - 12px)" }}
            />
            <ol className="reveal relative grid grid-cols-4 gap-8">
              {dict.etapes.map((e) => (
                <li key={e.num} className="flex flex-col items-center text-center">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-aws-hero text-[0.875rem] font-bold tabular-nums text-white ring-4 ring-aws-surface">
                    {e.num}
                  </span>
                  <h3 className="mt-5 max-w-[16rem] text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em] xl:text-[1.1875rem]">
                    <span className="block uppercase tracking-[0.04em] text-aws-blue-text">{e.cle}</span>
                    <span className="text-aws-hero">{e.titre}</span>
                  </h3>
                  <p className="mt-2.5 max-w-[17.5rem] text-[0.875rem] leading-[1.6] text-aws-ink/80 xl:text-[0.9375rem]">
                    {e.texte}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

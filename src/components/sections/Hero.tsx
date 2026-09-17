/* Pas de "use client" : tout ce bloc est rendu sur le serveur.
   Seul <HeroMedia /> est interactif. */
import HeroMedia from "./HeroMedia";
import type { HeroDictionary } from "@/i18n/dictionaries";

export default function Hero({ dict }: { dict: HeroDictionary }) {
  return (
    /* Bloc bleu pleine largeur, colle sous la navbar. Le degrade ton sur ton
       reste imperceptible : il evite juste l'effet "grand aplat". */
    <section
      aria-labelledby="hero-titre"
      className="bg-aws-hero bg-linear-to-b from-aws-hero-haut to-aws-hero-bas"
    >
      {/* EXACTEMENT le meme conteneur que la navbar : l'alignement du texte
          sur le logo est donc garanti par construction, sans calcul. */}
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 desk:px-8">
        {/* CALIBRATION SPATIALE.

            Diagnostic mesure a 1440 sur la version precedente :
              colonne texte declaree   750px
              texte reellement occupe  669px
              -> 81px de vide DANS la colonne
              + 56px de gap
              = 137px de separation visuelle reelle.
            Le desert ne venait donc pas du gap mais d'une colonne texte
            dimensionnee en fraction (1fr), donc plus large que son contenu.

            Correction : les deux colonnes sont dimensionnees sur ce
            qu'elles contiennent (33rem pour le texte, clamp pour le media),
            et justify-center centre la PAIRE dans le container. L'espace
            libre passe ainsi a l'exterieur de la composition au lieu de
            s'ouvrir en son milieu. */}
        <div className="grid items-center gap-11 py-14 sm:py-16 desk:grid-cols-[33rem_clamp(20rem,34vw,30rem)] desk:justify-center desk:gap-16 desk:py-20">

          {/* ---------- GAUCHE : le message ---------- */}
          {/* En pile, texte et photographie partagent la MEME mesure (34rem)
              et le bloc est centre : sans cela, a 1024 la colonne restait
              calee a gauche avec 456px de bleu vide a droite. */}
          <div className="mx-auto w-full max-w-[34rem] desk:mx-0 desk:max-w-none">
            {/* Eyebrow : c'est ICI que la phrase a son role editorial.
                11px contre 7.5px pour la signature du logo. */}
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-white/75">
              {dict.eyebrow}
            </p>

            <h1
              id="hero-titre"
              /* 15ch et 52px : a 17ch/58px le H1 s'etalait sur 669px et
                  imposait une colonne texte de 750. Il reste le
                  protagoniste — ACIM titre a 38px dans 550px, nous a 52px
                  dans 528 — mais il ne dicte plus la composition. */
              className="mt-6 max-w-[15ch] text-balance text-[2.25rem] font-bold leading-[1.05] tracking-[-0.025em] text-white sm:text-[2.75rem] desk:text-[3.25rem]"
            >
              {dict.titre}
            </h1>

            <p className="mt-7 max-w-[31rem] text-[1rem] leading-[1.7] text-white/85 desk:text-[1.0625rem]">
              {dict.paragraphe}
            </p>

            {/* Trois actions, trois roles distincts :
                COMPRENDRE -> ce bouton        (#expertises)
                PROUVER    -> le lien a cote   (#projets)
                CONTACTER  -> le CTA de la navbar, et lui seul.
                Plus aucune duplication du contact. */}
            <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
              {/* PRINCIPAL : blanc plein. Point le plus clair de la section. */}
              <a
                href="#expertises"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-[0.9375rem] font-semibold text-aws-hero transition-[background-color,transform] duration-200 hover:bg-white/90 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
              >
                {dict.ctaPrincipal}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                >
                  →
                </span>
              </a>

              {/* SECONDAIRE : contour blanc discret. Meme hauteur et meme
                  rayon que le principal — ils forment un groupe — mais il
                  reste clairement au second rang : pas de fond plein. */}
              <a
                href="#projets"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/35 px-7 text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:border-white/70 hover:bg-white/10 active:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
              >
                {dict.ctaSecondaire}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                >
                  →
                </span>
              </a>
            </div>
          </div>

          {/* ---------- DROITE : la photographie ---------- */}
          {/* justify-self-end : la photo se cale a droite de sa colonne, donc
              il reste du bleu entre elle et le bord de l'ecran. */}
          <div className="mx-auto w-full max-w-[34rem] desk:mx-0 desk:max-w-none">
            <HeroMedia dict={dict} />
          </div>
        </div>
      </div>
    </section>
  );
}

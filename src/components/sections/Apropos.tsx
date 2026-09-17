/* Server Component pur : texte statique, une image next/image, aucune
   interaction JS (le survol et la revelation au defilement sont geres
   entierement en CSS — voir globals.css). */
import Image from "next/image";
import type { AproposDictionary } from "@/i18n/dictionaries";

/* V4 — composition, pas juste deux colonnes.
   1. Decalage vertical leger (desk:-mt-6 sur l'image) : le texte et
      l'image ne sont plus alignes au pixel pres, ils sont composes —
      une asymetrie choisie, pas un display:grid a deux colonnes egales.
   2. L'accent (tick + numero "01") relie visuellement le texte a
      l'image plutot que de rester un simple ornement au-dessus du
      texte seul.
   3. Survol : un tres leger zoom (scale 1.03) sur l'image, cadre fixe
      (overflow-hidden), transition douce — le meme langage que les
      images d'Expertises. */
export default function Apropos({ dict }: { dict: AproposDictionary }) {
  return (
    <section id="a-propos" aria-labelledby="apropos-titre" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 desk:px-8">
        <div className="border-t border-aws-line py-12 sm:py-14 desk:py-16">
          <div className="flex flex-col gap-10 desk:flex-row desk:items-start desk:gap-16">
            <div className="reveal desk:w-[42%]">
              {/* Le "01" decoratif a ete retire : il empruntait l'idiome des
                  suites numerotees de Notre approche et d'Expertises (01/02/03)
                  alors qu'il etait seul de son espece — un numero qui ne
                  numerote rien. Reste le filet d'accent, qui lui a une
                  fonction : amorcer la colonne de texte. */}
              <span
                aria-hidden="true"
                className="block h-[2px] w-10 rounded-full bg-aws-blue-text"
              />
              <p className="mt-4 text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-aws-blue-text">
                {dict.eyebrow}
              </p>
              <h2
                id="apropos-titre"
                className="mt-4 max-w-[20ch] text-balance text-[1.6875rem] font-bold leading-[1.15] tracking-[-0.02em] text-aws-hero sm:text-[1.9375rem] desk:text-[2.25rem]"
              >
                {dict.titre}
              </h2>
              <div className="mt-6 max-w-[52ch] space-y-5 text-[0.9375rem] leading-[1.65] text-aws-ink/85 desk:text-[1rem]">
                {dict.paragraphes.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            {/* desk:-mt-6 : leger decalage vertical vers le haut — la paire
                cesse d'etre deux colonnes alignees au pixel pres pour
                devenir une composition. */}
            <div className="reveal desk:mt-[-1.5rem] desk:w-[58%]">
              {/* Ratio 4:3, coherent avec les deux images du Hero deja
                  validees. Cadre : un filet 1px (aws-line), pas d'ombre —
                  la photo se sent "posee avec soin", pas decoree.
                  group + overflow-hidden : le conteneur reste fixe, seule
                  l'image a l'interieur s'agrandit tres legerement. */}
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-aws-line bg-aws-surface">
                <Image
                  src="/images/apropos/qui-sommes-nous-v5.jpg"
                  alt={dict.imageAlt}
                  fill
                  sizes="(min-width: 1100px) 55vw, 92vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

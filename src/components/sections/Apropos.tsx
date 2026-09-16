/* Server Component pur : texte statique, une image next/image, aucune
   interaction. */
import Image from "next/image";
import type { AproposDictionary } from "@/i18n/dictionaries";

/* V3 — reprise sur demande explicite : l'image devait se rapprocher de
   l'infrastructure/des machines plutot que d'une scene humaine generique
   (voir ASSETS_SOURCES.md pour l'historique complet, y compris un
   candidat ecarte pour un conflit de droits detecte dans ses metadonnees
   EXIF). Le couloir de baies serveurs retenu porte "structure, systeme,
   organisation" sans mise en scene de personnes — coherent avec
   l'ambition d'AWS (finance + immobilier + numerique) sans jamais
   pretendre montrer un site reel d'AWS.

   Petit tick d'accent (40x2, meme langage que Notre approche) au-dessus
   de l'eyebrow : la section rejoint ainsi le meme systeme visuel que le
   reste du site plutot que de rester un bloc texte+image isole. */
export default function Apropos({ dict }: { dict: AproposDictionary }) {
  return (
    <section id="a-propos" aria-labelledby="apropos-titre" className="bg-white">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 desk:px-8">
        <div className="border-t border-aws-line py-12 sm:py-14 desk:py-16">
          {/* Colonne texte 42% / image 58% a partir de desk : l'image,
              desormais plus forte editorialement, porte un peu plus de
              poids qu'en V2 sans dominer le propos — toujours un
              equilibre choisi, pas un 50/50 mecanique. */}
          <div className="flex flex-col gap-10 desk:flex-row desk:items-center desk:gap-16">
            <div className="desk:w-[42%]">
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

            <div className="desk:w-[58%]">
              {/* Ratio 4:3, coherent avec les deux images du Hero deja
                  validees. Cadre : un filet 1px (aws-line), pas d'ombre —
                  la photo se sent "posee avec soin", pas decoree. */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-aws-line bg-aws-surface">
                <Image
                  src="/images/apropos/qui-sommes-nous.jpg"
                  alt={dict.imageAlt}
                  fill
                  sizes="(min-width: 1100px) 55vw, 92vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

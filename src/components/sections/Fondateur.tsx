import type { FondateurDictionary } from "@/i18n/dictionaries";

/* V2 — composition FINALE construite maintenant (photo + texte), pour
   qu'aucune refonte ne soit necessaire quand la vraie photo arrivera.

   PAS DE PHOTO pour l'instant — voir travaux realises.md. Deux versions
   recues montraient des traits caracteristiques d'un traitement par IA
   (texture de peau, fond de studio generique) : le cahier des charges
   interdit explicitement une "fausse photographie du CEO", generee ou
   alteree, et cette ligne est tenue independamment de toute demande.

   Le slot media est un aplat abstrait (memes tokens que le reste du
   site), PAS une silhouette generique presentee comme un portrait :
   personne ne doit pouvoir croire, meme un instant, qu'il s'agit
   d'Alfred. Le jour ou la photo source arrive : le <div> media est
   remplace par un <Image>, le reste de la section ne change pas. */
export default function Fondateur({ dict }: { dict: FondateurDictionary }) {
  return (
    <section id="fondateur" aria-labelledby="fondateur-titre" className="bg-white">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 desk:px-8">
        <div className="border-t border-aws-line py-12 sm:py-14 desk:py-16">
          <div className="flex flex-col gap-8 desk:flex-row desk:items-center desk:gap-14">
            {/* MEDIA SLOT — ratio portrait 3:4, meme famille visuelle que
                les autres slots en attente (Projets) : un degrade sobre,
                aucune forme humaine suggeree. */}
            <div className="desk:w-[32%] desk:shrink-0">
              <div className="aspect-[3/4] max-w-[20rem] rounded-2xl border border-aws-line bg-aws-surface mx-auto desk:mx-0" />
            </div>

            <div className="desk:flex-1">
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-aws-blue-text">
                {dict.eyebrow}
              </p>
              <h2
                id="fondateur-titre"
                className="mt-4 text-[1.375rem] font-bold leading-snug tracking-[-0.01em] text-aws-hero desk:text-[1.625rem]"
              >
                {dict.nom}
              </h2>
              <p className="mt-1.5 text-[0.9375rem] font-medium text-aws-ink/70">
                {dict.titre}
              </p>

              <div className="mt-5 max-w-[58ch] space-y-4 text-[0.9375rem] leading-[1.65] text-aws-ink/85 desk:text-[1rem]">
                {dict.paragraphes.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

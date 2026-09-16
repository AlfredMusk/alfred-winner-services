import type { VisionDictionary } from "@/i18n/dictionaries";

/* Seule section, avec le Hero, a utiliser le bleu profond plutot que le
   blanc/off-white : une respiration corporate au milieu d'une page
   sinon claire, comme un "manifeste" institutionnel. Meme token que le
   Hero (aws-hero) — aucune nouvelle couleur. Pas de photo d'Abidjan
   validee : traitement typographique pur, explicitement autorise par le
   cahier des charges pour cette section. */
export default function Vision({ dict }: { dict: VisionDictionary }) {
  return (
    <section aria-labelledby="vision-titre" className="bg-aws-hero">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 desk:px-8">
        <div className="py-16 text-center sm:py-20 desk:py-24">
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-white/75">
            {dict.eyebrow}
          </p>
          <h2
            id="vision-titre"
            className="mx-auto mt-5 max-w-[24ch] text-balance text-[1.75rem] font-bold leading-[1.2] tracking-[-0.015em] text-white sm:text-[2.125rem] desk:text-[2.5rem]"
          >
            {dict.titre}
          </h2>
          <p className="mx-auto mt-5 max-w-[58ch] text-[0.9375rem] leading-[1.7] text-white/85 desk:text-[1.0625rem]">
            {dict.paragraphe}
          </p>
        </div>
      </div>
    </section>
  );
}

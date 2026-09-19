import type { FondateurDictionary } from "@/i18n/dictionaries";

export default function Fondateur({ dict }: { dict: FondateurDictionary }) {
  return (
    <section id="fondateur" aria-labelledby="fondateur-titre" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 desk:px-8">
        <div className="border-t border-aws-line py-12 sm:py-14 desk:py-20">
          <div className="reveal max-w-[58rem]">
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
    </section>
  );
}

import type { CtaFinalDictionary } from "@/i18n/dictionaries";

/* Transition courte vers Contact : une phrase, un CTA, rien d'autre.
   Fond off-white (comme Notre methode / Nos expertises) pour distinguer
   ce palier de la bande bleue de Vision juste au-dessus. */
export default function CtaFinal({ dict }: { dict: CtaFinalDictionary }) {
  return (
    <section aria-labelledby="cta-final-titre" className="bg-aws-surface">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 desk:px-8">
        <div className="flex flex-col items-center gap-6 py-14 text-center sm:py-16 desk:py-20">
          <h2
            id="cta-final-titre"
            className="max-w-[20ch] text-balance text-[1.5rem] font-bold leading-[1.2] tracking-[-0.015em] text-aws-hero sm:text-[1.75rem] desk:text-[2rem]"
          >
            {dict.titre}
          </h2>
          <a
            href="#contact"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-aws-hero px-8 text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:bg-aws-hero-bas active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aws-hero motion-reduce:transition-none"
          >
            {dict.cta}
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

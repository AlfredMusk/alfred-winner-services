import type { CtaFinalDictionary } from "@/i18n/dictionaries";
import { boutonPrimaireClair, fleche } from "@/components/ui/boutons";

/* V2 — la version precedente etait jugee trop simple, "ajoutee apres
   coup". Renforce ici par : une ligne complementaire courte (pas un
   second paragraphe), le bouton du systeme partage (boutonPrimaireClair,
   le meme langage que partout ailleurs), et un peu plus de presence
   typographique — sans devenir une bannière publicitaire : pas de fond
   colore supplementaire, pas de carte flottante, la surface off-white
   deja en place suffit a distinguer ce palier. */
export default function CtaFinal({ dict }: { dict: CtaFinalDictionary }) {
  return (
    <section aria-labelledby="cta-final-titre" className="bg-aws-surface">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 desk:px-8">
        <div className="flex flex-col items-center gap-3 py-16 text-center sm:py-20 desk:py-24">
          <h2
            id="cta-final-titre"
            className="max-w-[18ch] text-balance text-[1.75rem] font-extrabold leading-[1.15] tracking-[-0.02em] text-aws-hero sm:text-[2.125rem] desk:text-[2.5rem]"
          >
            {dict.titre}
          </h2>
          <p className="max-w-[42ch] text-[0.9375rem] leading-[1.6] text-aws-ink/70 desk:text-[1rem]">
            {dict.sousTitre}
          </p>
          <a href="#contact" className={`mt-4 ${boutonPrimaireClair}`}>
            {dict.cta}
            {fleche}
          </a>
        </div>
      </div>
    </section>
  );
}

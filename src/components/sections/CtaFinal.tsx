import type { CtaFinalDictionary } from "@/i18n/dictionaries";
import { boutonPrimaireClair, fleche } from "@/components/ui/boutons";

/* V2 — la version precedente etait jugee trop simple, "ajoutee apres
   coup". Renforce ici par : une ligne complementaire courte (pas un
   second paragraphe), le bouton du systeme partage (boutonPrimaireClair,
   le meme langage que partout ailleurs), et un peu plus de presence
   typographique — sans devenir une bannière publicitaire : pas de fond
   colore supplementaire, pas de carte flottante, la surface off-white
   deja en place suffit a distinguer ce palier.

   V4 — py resserre (96 -> 80px en desktop) : la section qui precede
   directement le Footer ne doit pas etre "un enorme espace blanc",
   juste une transition nette vers la surface sombre qui suit.

   V5 — PREMIUM : aws-surface remplace par aws-sand. Mesure avant
   changement : aws-surface (#fdfcfa) n'est qu'a 2-5 unites RGB du blanc
   pur, une difference invisible a l'oeil — c'est la cause reelle du
   ressenti "le site est trop blanc", pas un manque de tokens. Cette
   section n'a AUCUN texte en aws-blue-text (le seul token dont le
   contraste devient tendu sur un fond chaud) : titre en aws-hero,
   sous-titre en ink/70 (verifie : 4.94 sur sable, AA passe), bouton a
   fond plein independant du fond de section. Candidate ideale pour un
   vrai ton chaud, mesurable, juste avant le Footer navy. */
export default function CtaFinal({ dict }: { dict: CtaFinalDictionary }) {
  return (
    <section aria-labelledby="cta-final-titre" className="bg-aws-sand">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 desk:px-8">
        <div className="reveal flex flex-col items-center gap-3 py-14 text-center sm:py-16 desk:py-20">
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

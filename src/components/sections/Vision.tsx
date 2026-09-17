import type { VisionDictionary } from "@/i18n/dictionaries";

/* V6 — PERSONNALITE PROPRE, distincte du Hero : le Hero et Vision
   partageaient litteralement le meme degrade (aws-hero-haut ->
   aws-hero-bas), verifie dans Hero.tsx — Vision se lisait comme "encore
   le meme rectangle bleu". Corrige en donnant a Vision son propre
   langage, toujours dans la famille de marque :

     - APLAT navy (aws-navy, le meme que le Footer), PAS un degrade —
       une respiration statique et grave plutot qu'une repetition du
       mouvement du Hero.
     - Accent FROID (aws-blue-text, "azure") au lieu du sable chaud
       utilise ailleurs (CtaFinal) : Vision reste dans le registre
       "navy + azure", pas "navy + chaud" — les deux accents de la
       page ne se marchent plus dessus.
     - Texture tres subtile : un quadrillage de lignes fines a 2.5%
       d'opacite, immobile — "on le sent, on ne le remarque pas".
     - Filet azure en pied de section : une rupture graphique nette
       avec ce qui suit (Fondateur, blanc), pas une simple fin de
       degrade qui se dilue. */
export default function Vision({ dict }: { dict: VisionDictionary }) {
  return (
    <section aria-labelledby="vision-titre" className="relative bg-aws-navy">
      {/* Texture + halo clippes par leur PROPRE conteneur, pas la
          <section> : mettre overflow-hidden sur la section fausserait
          le calcul de animation-timeline: view() du bloc .reveal
          qu'elle contient (mesure et corrige lors d'une passe
          precedente — voir travaux realises.md). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 text-aws-blue-text opacity-[0.05]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 1px, transparent 44px)",
          }}
        />
        <div className="vision-halo absolute left-1/2 top-0 h-[36rem] w-[56rem] rounded-full bg-aws-blue-text/[0.08] blur-3xl" />
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-aws-blue-text/40" />
      {/* Le texte occupe desormais davantage la section : padding vertical
          resserre, titre et paragraphe plus larges et plus presents. La
          personnalite de la section doit venir de ce qui est ECRIT, pas
          d'une texture de fond qui la porterait seule. */}
      <div className="relative mx-auto max-w-[1360px] px-4 sm:px-6 desk:px-8">
        <div className="reveal py-16 text-center sm:py-20 desk:py-24">
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-aws-blue-text/50" />
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-white/75">
              {dict.eyebrow}
            </p>
            <span aria-hidden="true" className="h-px w-8 bg-aws-blue-text/50" />
          </div>
          <h2
            id="vision-titre"
            className="mx-auto mt-5 max-w-[26ch] text-balance text-[1.875rem] font-extrabold leading-[1.12] tracking-[-0.015em] text-white sm:text-[2.375rem] desk:text-[3rem]"
          >
            {dict.titre}
          </h2>
          <p className="mx-auto mt-6 max-w-[62ch] text-[1rem] leading-[1.7] text-white/85 desk:text-[1.125rem]">
            {dict.paragraphe}
          </p>
        </div>
      </div>
    </section>
  );
}

import type { VisionDictionary } from "@/i18n/dictionaries";

/* Seule section, avec le Hero, a utiliser le bleu profond plutot que le
   blanc/off-white : une respiration corporate au milieu d'une page
   sinon claire, comme un "manifeste" institutionnel. Memes tokens que le
   Hero (le degrade aws-hero-haut -> aws-hero-bas, pas un aplat) —
   aucune nouvelle couleur, juste la meme profondeur que le Hero plutot
   qu'un bleu plat. Pas de photo d'Abidjan validee : traitement
   typographique pur, explicitement autorise par le cahier des charges
   pour cette section.

   V2 — polish, pas de reconstruction : degrade au lieu de l'aplat, titre
   en extrabold (coherent avec le renforcement deja fait sur Notre
   methode) pour que la rupture porte davantage.

   V4 — profondeur supplementaire : un halo radial tres doux (blanc a 6%
   d'opacite, non anime) derriere le titre, comme une lumiere qui vient
   de loin plutot qu'un degrade lineaire supplementaire. Volontairement
   discret — "pas de gradient spectaculaire" — visible seulement parce
   qu'on le cherche, pas parce qu'il s'impose. */
export default function Vision({ dict }: { dict: VisionDictionary }) {
  return (
    <section
      aria-labelledby="vision-titre"
      className="relative bg-linear-to-b from-aws-hero-haut to-aws-hero-bas"
    >
      {/* Le halo est clippe par SON PROPRE conteneur, pas par la <section>.
          Raison mesuree : mettre overflow-hidden sur la section faussait le
          calcul de animation-timeline: view() du bloc .reveal qu'elle
          contient (une section revelee avant d'entrer dans le viewport) ;
          mais sans aucun clipping, le halo (56rem de large, centre)
          depassait de 64px a 768px de large et rendait la page
          horizontalement scrollable. Ce conteneur intermediaire resout les
          deux : il clippe le halo, et comme il est un FRERE du contenu
          revele — pas un ancetre — il ne touche pas son animation. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[36rem] w-[56rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-white/[0.06] blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-[1360px] px-4 sm:px-6 desk:px-8">
        <div className="reveal py-16 text-center sm:py-20 desk:py-24">
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-white/75">
            {dict.eyebrow}
          </p>
          <h2
            id="vision-titre"
            className="mx-auto mt-5 max-w-[22ch] text-balance text-[1.75rem] font-extrabold leading-[1.15] tracking-[-0.015em] text-white sm:text-[2.125rem] desk:text-[2.75rem]"
          >
            {dict.titre}
          </h2>
          <p className="mx-auto mt-6 max-w-[56ch] text-[0.9375rem] leading-[1.7] text-white/85 desk:text-[1.0625rem]">
            {dict.paragraphe}
          </p>
        </div>
      </div>
    </section>
  );
}

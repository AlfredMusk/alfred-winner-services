/* Server Component pur : texte statique, aucune interaction. */
import type { AproposDictionary } from "@/i18n/dictionaries";

/* Traitement typographique volontaire, sans photo : les deux seules images
   validees (marches financiers, chantier) servent deja le Hero et vont
   servir Nos expertises plus bas — les reutiliser ici les aurait diluees a
   chaque reprise plutot que d'ajouter quelque chose. La clarte et la
   mesure de lecture portent seules la section, dans la discipline ACIM
   deja appliquee a Notre approche et Notre methode. */
export default function Apropos({ dict }: { dict: AproposDictionary }) {
  return (
    <section id="a-propos" aria-labelledby="apropos-titre" className="bg-white">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 desk:px-8">
        <div className="border-t border-aws-line py-12 sm:py-14 desk:py-16">
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-aws-blue-text">
            {dict.eyebrow}
          </p>

          {/* Mesure bornee a 20ch : une phrase-choc courte, pas un H2 qui
              s'etale. Reprend l'echelle de Notre approche (pas celle,
              renforcee, de Notre methode qui n'a pas de suite immediate
              a porter). */}
          <h2
            id="apropos-titre"
            className="mt-4 max-w-[20ch] text-balance text-[1.6875rem] font-bold leading-[1.15] tracking-[-0.02em] text-aws-hero sm:text-[1.9375rem] desk:text-[2.25rem]"
          >
            {dict.titre}
          </h2>

          <div className="mt-6 max-w-[62ch] space-y-4 text-[0.9375rem] leading-[1.65] text-aws-ink/85 desk:text-[1rem]">
            {dict.paragraphes.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

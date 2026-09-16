import type { FondateurDictionary } from "@/i18n/dictionaries";

/* PAS DE PHOTO pour l'instant — voir travaux realises.md.
   La photo recue a l'analyse presentait des traits caracteristiques d'un
   traitement par IA (texture de peau, fond de studio generique) : le
   cahier des charges interdit explicitement une "fausse photographie du
   CEO", generee ou alteree. Demande faite a Alfred de fournir une photo
   source non filtree.

   Mise en page pensee pour ce cas : bloc texte centre, mesure de lecture
   confortable. Le jour ou la photo arrive, il suffit d'ajouter une
   colonne image a cote (desk:flex-row) sans reconstruire la section. */
export default function Fondateur({ dict }: { dict: FondateurDictionary }) {
  return (
    <section id="fondateur" aria-labelledby="fondateur-titre" className="bg-white">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 desk:px-8">
        <div className="border-t border-aws-line py-12 sm:py-14 desk:py-16">
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-aws-blue-text">
            {dict.eyebrow}
          </p>

          <div className="mt-6 max-w-[62ch]">
            <h2
              id="fondateur-titre"
              className="text-[1.375rem] font-bold leading-snug tracking-[-0.01em] text-aws-hero desk:text-[1.625rem]"
            >
              {dict.nom}
            </h2>
            <p className="mt-1.5 text-[0.9375rem] font-medium text-aws-ink/70">
              {dict.titre}
            </p>

            <div className="mt-5 space-y-4 text-[0.9375rem] leading-[1.65] text-aws-ink/85 desk:text-[1rem]">
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

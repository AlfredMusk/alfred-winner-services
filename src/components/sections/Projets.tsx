import type { ProjetsDictionary, Projet } from "@/i18n/dictionaries";

/* V9 — D'UNE LISTE ADMINISTRATIVE A UN PORTFOLIO. Retire d'un coup :
   les gros numeros 01-06 (ne portaient aucune information — une seule
   colonne de texte n'a pas besoin d'un index), les badges de statut
   ("Realise"/"En structuration"/...) et la ligne separatrice horizontale
   qui empilait tout en une seule liste verticale, "administrative".

   A la place : une VRAIE grille editoriale (2 colonnes des le desktop,
   1 sur mobile), chaque entree amorcee par le meme filet d'accent que
   Notre approche/Qui sommes-nous — le meme langage visuel que le reste
   du site, pas un composant a part.

   Pourquoi seulement 4 entrees et pas 6 : voir dictionaries.ts. Les deux
   projets jamais confirmes comme livres (suivi immobilier, assistant IA
   metier) ne sont plus dans cette liste — un statut supprime SANS
   supprimer aussi le projet aurait fait passer un outil non confirme
   pour une realisation, dans une section qui s'appelle desormais
   "Realisations". */
function CarteProjet({ projet }: { projet: Projet }) {
  return (
    <li id={`projet-${projet.id}`} className="reveal group scroll-mt-24">
      <span
        aria-hidden="true"
        className="block h-[2px] w-10 rounded-full bg-aws-blue-text transition-[width] duration-300 motion-reduce:transition-none desk:group-hover:w-16"
      />
      <p className="mt-4 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-aws-blue-text">
        {projet.categorie}
      </p>
      <h3 className="mt-2 text-[1.1875rem] font-bold leading-snug tracking-[-0.01em] text-aws-hero transition-colors duration-300 motion-reduce:transition-none group-hover:text-aws-navy">
        {projet.nom}
      </h3>
      <p className="mt-2.5 max-w-[42ch] text-[0.9375rem] leading-[1.65] text-aws-ink/80">
        {projet.texte}
      </p>
    </li>
  );
}

export default function Projets({ dict }: { dict: ProjetsDictionary }) {
  return (
    <section id="projets" aria-labelledby="projets-titre" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 desk:px-8">
        <div className="border-t border-aws-line py-12 sm:py-14 desk:py-16">
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-aws-blue-text">
            {dict.eyebrow}
          </p>
          <h2
            id="projets-titre"
            className="mt-4 max-w-[20ch] text-balance text-[1.6875rem] font-bold leading-[1.15] tracking-[-0.02em] text-aws-hero sm:text-[1.9375rem] desk:text-[2.25rem]"
          >
            {dict.titre}
          </h2>
          <p className="mt-4 max-w-[58ch] text-[0.9375rem] leading-[1.65] text-aws-ink/85 desk:text-[1rem]">
            {dict.paragraphe}
          </p>

          <ul className="mt-10 grid gap-x-12 gap-y-12 desk:mt-14 desk:grid-cols-2 desk:gap-x-16 desk:gap-y-14">
            {dict.liste.map((projet) => (
              <CarteProjet key={projet.id} projet={projet} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

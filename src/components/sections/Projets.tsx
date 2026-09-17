import type { ProjetsDictionary, Projet } from "@/i18n/dictionaries";

/* V8 — QUATRE PROJETS PASSENT A "REALISE". Le fondateur a confirme
   explicitement (projet par projet, avec description) que quatre des
   six entrees sont des livraisons reelles, pas des demonstrateurs —
   voir dictionaries.ts pour la note de confirmation. Le badge PLEIN
   (aws-hero) marque desormais "Realise"/"Delivered" ; le badge CONTOUR
   (muted) reste pour ce qui est encore en developpement/structuration
   (suivi-projets-immobiliers, assistant-ia-metier — statuts inchanges,
   non confirmes, jamais inventes).

   V7 — TOUJOURS HONNETE. La passe precedente (V6) avait retire toute
   l'affordance de lien (fleche, fond au survol, titre qui glisse) parce
   qu'aucune ligne ne mene reellement quelque part — une fleche qui ne
   navigue nulle part est un mensonge d'interface. Cette demande revient
   ("hover: surface, titre, fleche, statut"), donc ARBITRAGE EXPLICITE :
   le survol redevient vivant (fond teinte, titre qui gagne en
   contraste, statut qui s'accentue) car RIEN de tout cela ne promet une
   destination — mais LA FLECHE NE REVIENT PAS, elle est le seul des
   quatre signaux qui dit specifiquement "cliquez, ça mene quelque
   part". Un projet "Realise" reste un projet SANS capture d'ecran reelle
   ni page dediee aujourd'hui : la fleche resterait un mensonge, le
   statut "Realise" seul, non. Le jour ou une vraie capture/demo existe
   pour une ligne donnee, cette ligne (et uniquement elle) pourra
   redevenir un vrai lien avec sa fleche et sa vignette. */

const STATUTS_LIVRES = new Set(["Réalisé", "Delivered"]);

function LigneProjet({ projet, numero, dernier }: { projet: Projet; numero: string; dernier: boolean }) {
  const livre = STATUTS_LIVRES.has(projet.statut);
  return (
    <li
      id={`projet-${projet.id}`}
      className={
        "reveal group -mx-4 flex scroll-mt-24 gap-5 rounded-xl px-4 py-7 transition-colors duration-300 hover:bg-aws-surface sm:gap-8" +
        (dernier ? "" : " border-b border-aws-line")
      }
    >
      <span
        aria-hidden="true"
        className="text-[1.375rem] font-light leading-none tabular-nums text-aws-ink/20 transition-colors duration-300 group-hover:text-aws-blue-text/60 sm:text-[1.625rem] desk:w-14"
      >
        {numero}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-[1.0625rem] font-bold leading-snug text-aws-hero transition-colors duration-300 group-hover:text-aws-navy desk:text-[1.1875rem]">
            {projet.nom}
          </h3>
          <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-aws-blue-text">
            {projet.categorie}
          </span>
        </div>
        <p className="mt-2 max-w-[62ch] text-[0.9375rem] leading-[1.65] text-aws-ink/80">
          {projet.texte}
        </p>
        <span
          className={
            "mt-3 inline-flex items-center rounded-full px-2.5 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.04em] transition-colors duration-300 " +
            (livre
              ? "bg-aws-hero/[0.08] text-aws-hero group-hover:bg-aws-hero/[0.12]"
              : "border border-aws-ink/25 text-aws-ink/65 group-hover:border-aws-blue-text/40 group-hover:text-aws-blue-text")
          }
        >
          {projet.statut}
        </span>
      </div>
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

          <ol className="mt-10 border-t border-aws-line desk:mt-12">
            {dict.liste.map((projet, i) => (
              <LigneProjet
                key={projet.id}
                projet={projet}
                numero={String(i + 1).padStart(2, "0")}
                dernier={i === dict.liste.length - 1}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

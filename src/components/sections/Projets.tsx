import type { Locale, ProjetsDictionary, Projet } from "@/i18n/dictionaries";
import styles from "./projects/Projects.module.css";
import { boutonPrimaireClair } from "@/components/ui/boutons";

function CarteProjet({ projet, numero }: { projet: Projet; numero: string }) {
  return (
    <li id={`projet-${projet.id}`} className={styles.project}>
      <span
        aria-hidden="true"
        className={styles.separator}
      />
      <p className="mt-4 flex items-baseline gap-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-aws-blue-text">
        <span aria-hidden="true" className={styles.number}>
          {numero}
        </span>
        <span aria-hidden="true" className={styles.dash}>
          —
        </span>
        {projet.categorie}
      </p>
      <h3 className={styles.title}>
        {projet.nom}
      </h3>
      <p className={styles.description}>
        {projet.texte}
      </p>
    </li>
  );
}

export default function Projets({ dict }: { dict: ProjetsDictionary; locale: Locale }) {
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

          <ul className={styles.grid}>
            {dict.liste.map((projet, i) => (
              <CarteProjet key={projet.id} projet={projet} numero={String(i + 1).padStart(2, "0")} />
            ))}
          </ul>
          <div className={styles.invitation}>
            <div>
              <h3>{dict.invitation.titre}</h3>
              <p>{dict.invitation.description}</p>
            </div>
            <a href="#contact" className={boutonPrimaireClair}>
              {dict.invitation.cta}<span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

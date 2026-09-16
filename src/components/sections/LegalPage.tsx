import type { LegalDictionary } from "@/i18n/dictionaries";

/* Rendu partage pour Mentions legales et Politique de confidentialite :
   meme structure editoriale (titre + sections titrees + paragraphes),
   seul le contenu change. Evite de dupliquer la mise en page deux fois
   pour deux pages qui n'ont, structurellement, rien de different. */
export default function LegalPage({ dict }: { dict: LegalDictionary }) {
  return (
    <section aria-labelledby="legal-titre" className="bg-white">
      <div className="mx-auto max-w-[860px] px-4 sm:px-6 desk:px-8">
        <div className="border-t border-aws-line py-12 sm:py-14 desk:py-16">
          <h1
            id="legal-titre"
            className="text-[1.6875rem] font-bold leading-[1.15] tracking-[-0.02em] text-aws-hero sm:text-[1.9375rem] desk:text-[2.25rem]"
          >
            {dict.titre}
          </h1>

          <div className="mt-10 space-y-10">
            {dict.sections.map((section) => (
              <div key={section.titre}>
                <h2 className="text-[1.0625rem] font-semibold text-aws-hero desk:text-[1.1875rem]">
                  {section.titre}
                </h2>
                <div className="mt-3 space-y-3 text-[0.9375rem] leading-[1.65] text-aws-ink/85">
                  {section.paragraphes.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

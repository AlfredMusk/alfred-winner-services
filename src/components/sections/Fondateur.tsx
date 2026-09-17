import Image from "next/image";
import type { FondateurDictionary } from "@/i18n/dictionaries";

/* V3 — VRAIE PHOTO integree. Deux versions recues auparavant montraient
   des traits caracteristiques d'un traitement par IA (texture de peau,
   fond de studio generique) et avaient ete refusees sur ce fondement.
   Celle-ci est differente : EXIF verifie (iPhone 11 Pro, 17 juillet
   2021, aucune trace de generation), donc une vraie photographie —
   voir ASSETS_SOURCES.md pour le detail complet de cette verification.

   Cadrage CONSERVE tel que fourni (deja en 3:4, aucun recadrage force) :
   c'est un choix de mise en scene personnelle d'Alfred, pas a moi de le
   retoucher sans le lui demander.

   V4 — EQUILIBRE PHOTO/TEXTE corrige : le cadre photo portait un
   max-w-[20rem] fixe meme a l'interieur de sa colonne desk:w-[32%], qui
   depasse largement 20rem a partir de ~1280px de large — la photo
   restait donc petite au milieu d'une colonne trop grande pour elle,
   creant l'espace blanc desequilibre signale. Le cap ne s'applique plus
   qu'en pile mobile/tablette (ou la colonne n'existe pas encore) ; en
   ligne desktop, la photo remplit sa colonne. */
export default function Fondateur({ dict }: { dict: FondateurDictionary }) {
  return (
    <section id="fondateur" aria-labelledby="fondateur-titre" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 desk:px-8">
        <div className="border-t border-aws-line py-12 sm:py-14 desk:py-20">
          <div className="flex flex-col gap-8 desk:flex-row desk:items-center desk:gap-14">
            {/* MEDIA — ratio portrait 3:4, meme cadre (filet aws-line,
                coins arrondis) que le reste du site. Reveal INDEPENDANT
                du texte (reveal vs reveal-decale) : photo et contenu
                apparaissent avec un leger decalage plutot qu'un seul
                bloc qui se devoile d'un coup. */}
            <div className="reveal desk:w-[32%] desk:shrink-0">
              <div className="relative aspect-[3/4] w-full max-w-[20rem] overflow-hidden rounded-2xl border border-aws-line bg-aws-surface mx-auto desk:mx-0 desk:max-w-none">
                <Image
                  src="/images/fondateur/krodi-krotchaman-fondateur.jpg"
                  alt={dict.imageAlt}
                  fill
                  sizes="(min-width: 1100px) 20rem, 60vw"
                  className="object-cover"
                  priority={false}
                />
              </div>
            </div>

            <div className="reveal-decale desk:flex-1">
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-aws-blue-text">
                {dict.eyebrow}
              </p>
              <h2
                id="fondateur-titre"
                className="mt-4 text-[1.375rem] font-bold leading-snug tracking-[-0.01em] text-aws-hero desk:text-[1.625rem]"
              >
                {dict.nom}
              </h2>
              <p className="mt-1.5 text-[0.9375rem] font-medium text-aws-ink/70">
                {dict.titre}
              </p>

              <div className="mt-5 max-w-[58ch] space-y-4 text-[0.9375rem] leading-[1.65] text-aws-ink/85 desk:text-[1rem]">
                {dict.paragraphes.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

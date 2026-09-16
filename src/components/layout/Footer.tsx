import type { Locale, FooterDictionary, NavbarDictionary, ExpertisesDictionary } from "@/i18n/dictionaries";
import Image from "next/image";

/* Server Component pur : aucune interaction, donc aucune raison d'envoyer
   du JavaScript au client pour un footer. */

const RESEAUX_ICONES: Record<"linkedin" | "instagram" | "facebook", React.ReactElement> = {
  linkedin: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="currentColor">
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.5a1.97 1.97 0 1 0 0 3.94 1.97 1.97 0 0 0 0-3.94ZM20.44 20h-3.37v-5.9c0-1.41-.03-3.22-1.96-3.22-1.97 0-2.27 1.54-2.27 3.12V20H9.47V8.5h3.24v1.57h.05c.45-.85 1.56-1.75 3.21-1.75 3.43 0 4.06 2.26 4.06 5.2V20Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="currentColor">
      <path d="M14.5 8.5h2.25V5.13C16.36 5.09 15.19 5 13.83 5c-2.83 0-4.77 1.78-4.77 5.04V13H6v3.75h3.06V22h3.63v-5.25h2.94l.47-3.75h-3.41v-2.55c0-1.08.29-1.95 1.81-1.95Z" />
    </svg>
  ),
};

export default function Footer({
  locale,
  dict,
  nav,
  expertises,
}: {
  locale: Locale;
  dict: FooterDictionary;
  nav: NavbarDictionary;
  expertises: ExpertisesDictionary;
}) {
  const reseauxActifs = (Object.entries(dict.reseaux) as [keyof typeof RESEAUX_ICONES, string][]).filter(
    ([, href]) => href,
  );

  return (
    <footer className="border-t border-aws-line bg-white">
      <div className="mx-auto max-w-[1360px] px-4 py-12 sm:px-6 sm:py-14 desk:px-8 desk:py-16">
        <div className="grid gap-10 desk:grid-cols-[1.2fr_1fr_1fr_1fr] desk:gap-8">
          {/* MARQUE */}
          <div>
            <a href={`/${locale}`} aria-label={nav.a11y.brandHome} className="inline-flex items-center gap-2">
              <Image
                src="/images/brand/aws-emblem.png"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <Image
                src="/images/brand/aws-wordmark.png"
                alt="Alfred Winner Services"
                width={118}
                height={30}
                className="h-[26px] w-auto"
              />
            </a>
            <p
              aria-hidden="true"
              className="mt-3 text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-aws-muted"
            >
              {nav.signature}
            </p>
          </div>

          {/* NAVIGATION */}
          <nav aria-label={nav.a11y.mainNav}>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-aws-ink/50">
              {dict.navigationNav}
            </p>
            <ul className="mt-3 space-y-2.5">
              <li>
                <a href={`/${locale}`} className="text-[0.9375rem] text-aws-ink/80 hover:text-aws-blue-text">
                  {nav.nav.home}
                </a>
              </li>
              <li>
                <a href={`/${locale}#a-propos`} className="text-[0.9375rem] text-aws-ink/80 hover:text-aws-blue-text">
                  {nav.nav.about}
                </a>
              </li>
              <li>
                <a href={`/${locale}#projets`} className="text-[0.9375rem] text-aws-ink/80 hover:text-aws-blue-text">
                  {nav.nav.projects}
                </a>
              </li>
              <li>
                <a href={`/${locale}#contact`} className="text-[0.9375rem] text-aws-ink/80 hover:text-aws-blue-text">
                  {nav.nav.contact}
                </a>
              </li>
            </ul>
          </nav>

          {/* TROIS UNIVERS */}
          <div>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-aws-ink/50">
              {dict.universNav}
            </p>
            <ul className="mt-3 space-y-2.5">
              {expertises.poles.map((pole) => (
                <li key={pole.hash}>
                  <a
                    href={`/${locale}#${pole.hash}`}
                    className="text-[0.9375rem] text-aws-ink/80 hover:text-aws-blue-text"
                  >
                    {pole.cle} — {pole.titre}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT + LEGAL */}
          <div>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-aws-ink/50">
              {dict.liensLegauxNav}
            </p>
            <ul className="mt-3 space-y-2.5">
              <li>
                <a
                  href={`/${locale}/mentions-legales`}
                  className="text-[0.9375rem] text-aws-ink/80 hover:text-aws-blue-text"
                >
                  {dict.mentionsLegales}
                </a>
              </li>
              <li>
                <a
                  href={`/${locale}/confidentialite`}
                  className="text-[0.9375rem] text-aws-ink/80 hover:text-aws-blue-text"
                >
                  {dict.confidentialite}
                </a>
              </li>
            </ul>

            {/* Reseaux : uniquement s'ils existent reellement. Aucun
                href="#" ni faux profil — voir travaux realises.md. */}
            {reseauxActifs.length > 0 && (
              <>
                <p className="mt-6 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-aws-ink/50">
                  {dict.suivezNous}
                </p>
                <div className="mt-3 flex gap-3">
                  {reseauxActifs.map(([reseau, href]) => (
                    <a
                      key={reseau}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-aws-line text-aws-hero transition-colors hover:bg-aws-blue-text hover:text-white"
                      aria-label={reseau}
                    >
                      {RESEAUX_ICONES[reseau]}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* BANDEAU LEGAL — informations confirmees uniquement. */}
        <div className="mt-10 border-t border-aws-line pt-6 desk:mt-12">
          <p className="text-[0.8125rem] leading-[1.6] text-aws-ink/60">
            {dict.raisonSociale} — {dict.formeJuridique} — {dict.rccm}
          </p>
          <p className="mt-2 text-[0.8125rem] text-aws-ink/50">{dict.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

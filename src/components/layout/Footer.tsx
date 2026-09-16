import type {
  Locale,
  FooterDictionary,
  NavbarDictionary,
  ExpertisesDictionary,
  ContactDictionary,
} from "@/i18n/dictionaries";
import Image from "next/image";
import { IconeLieu, IconeTelephone, IconeEmail } from "@/components/ui/icones";

/* Server Component pur : aucune interaction, donc aucune raison d'envoyer
   du JavaScript au client pour un footer.

   V3 — structure editoriale, sur demande explicite : les informations de
   contact quittent la homepage (plus de gros formulaire dedie) et
   rejoignent le Footer, dans l'esprit ACIM observe sur leur propre site
   (identite, informations legales, contacts, reseaux, tout au meme
   endroit, sans grande section separee). Le bouton "Contact" de la
   Navbar (verrouillee, non modifiee) pointe deja vers #contact : c'est
   desormais CETTE colonne qui porte l'ancre.

   Quatre colonnes : marque / navigation / univers / contacts — plutot
   que l'ancien decoupage marque / navigation / univers / liens legaux,
   les liens legaux redescendent dans le bandeau du bas avec le
   copyright, pour laisser sa propre colonne aux contacts. */

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
  contact,
}: {
  locale: Locale;
  dict: FooterDictionary;
  nav: NavbarDictionary;
  expertises: ExpertisesDictionary;
  contact: ContactDictionary;
}) {
  const reseauxActifs = (Object.entries(dict.reseaux) as [keyof typeof RESEAUX_ICONES, string][]).filter(
    ([, href]) => href,
  );
  const lienBase = "text-[0.9375rem] text-white/85 transition-colors hover:text-white";
  const titreColonne = "text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-white/75";
  const iconeContact = "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white";

  return (
    <footer id="contact" className="scroll-mt-24 bg-aws-navy">
      <div className="mx-auto max-w-[1360px] px-4 py-12 sm:px-6 sm:py-14 desk:px-8 desk:py-16">
        <div className="grid gap-10 desk:grid-cols-[1fr_1fr_1fr_1.1fr] desk:gap-8">
          {/* MARQUE — les deux fichiers logo sont des PNG a fond blanc
              opaque (verifie pixel par pixel, pas de canal alpha) : une
              puce blanche porte le logo intact plutot que de le
              transformer par filtre (un essai brightness-0 invert avait
              produit un rectangle blanc plein — voir travaux realises.md). */}
          <div>
            <a
              href={`/${locale}`}
              aria-label={nav.a11y.brandHome}
              className="inline-flex items-center gap-2.5 rounded-xl bg-white px-3 py-2"
            >
              <Image src="/images/brand/aws-emblem.png" alt="" width={28} height={28} className="h-7 w-7" />
              <Image
                src="/images/brand/aws-wordmark.png"
                alt="Alfred Winner Services"
                width={118}
                height={30}
                className="h-[22px] w-auto"
              />
            </a>
            <p
              aria-hidden="true"
              className="mt-3 text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white/55"
            >
              {nav.signature}
            </p>
          </div>

          {/* NAVIGATION */}
          <nav aria-label={nav.a11y.mainNav}>
            <p className={titreColonne}>{dict.navigationNav}</p>
            <ul className="mt-3 space-y-2.5">
              <li>
                <a href={`/${locale}`} className={lienBase}>
                  {nav.nav.home}
                </a>
              </li>
              <li>
                <a href={`/${locale}#a-propos`} className={lienBase}>
                  {nav.nav.about}
                </a>
              </li>
              <li>
                <a href={`/${locale}#expertises`} className={lienBase}>
                  {dict.servicesLabel}
                </a>
              </li>
              <li>
                <a href={`/${locale}#projets`} className={lienBase}>
                  {nav.nav.projects}
                </a>
              </li>
            </ul>
          </nav>

          {/* TROIS UNIVERS */}
          <div>
            <p className={titreColonne}>{dict.universNav}</p>
            <ul className="mt-3 space-y-2.5">
              {expertises.poles.map((pole) => (
                <li key={pole.hash}>
                  <a href={`/${locale}#${pole.hash}`} className={lienBase}>
                    {pole.cle} — {pole.titre}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* NOS CONTACTS — reprend le dictionnaire "contact" existant
              (Contact.tsx n'est plus rendu sur la homepage, mais son
              contenu i18n reste la source de verite pour ces valeurs :
              une seule adresse, un seul numero, un seul email a
              maintenir). */}
          <div>
            <p className={titreColonne}>{dict.contactsNav}</p>
            <ul className="mt-3 space-y-4">
              <li className="flex gap-3">
                <span className={iconeContact}>{IconeLieu}</span>
                <div>
                  <p className="text-[0.9375rem] leading-[1.5] text-white/85">{contact.adresse}</p>
                  <a
                    href={contact.mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-[0.8125rem] font-medium text-white/60 hover:text-white"
                  >
                    {contact.mapsLabel} →
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <span className={iconeContact}>{IconeTelephone}</span>
                <a href={contact.telephoneHref} className={`${lienBase} pt-1.5`}>
                  {contact.telephone}
                </a>
              </li>
              <li className="flex gap-3">
                <span className={iconeContact}>{IconeEmail}</span>
                <a href={contact.emailMailtoHref} className={`${lienBase} pt-1.5`}>
                  {contact.email}
                </a>
              </li>
            </ul>

            {/* Reseaux : uniquement s'ils existent reellement. Aucun
                href="#" ni faux profil — voir travaux realises.md. */}
            {reseauxActifs.length > 0 && (
              <>
                <p className={`mt-6 ${titreColonne}`}>{dict.suivezNous}</p>
                <div className="mt-3 flex gap-3">
                  {reseauxActifs.map(([reseau, href]) => (
                    <a
                      key={reseau}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
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

        {/* BANDEAU LEGAL — informations confirmees uniquement. Les liens
            "Mentions legales" / "Confidentialite" vivent ici (et non plus
            dans leur propre colonne) : ce sont des liens utilitaires de
            bas de page, pas une rubrique de navigation a part entiere.
            Separateur white/15 : le meme "ressenti, pas remarque" que les
            filets clairs ailleurs sur le site, transpose au fond sombre. */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between desk:mt-12">
          <p className="text-[0.8125rem] leading-[1.6] text-white/70">
            {dict.raisonSociale} — {dict.formeJuridique} — {dict.rccm}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.8125rem]">
            <a href={`/${locale}/mentions-legales`} className="text-white/60 hover:text-white">
              {dict.mentionsLegales}
            </a>
            <a href={`/${locale}/confidentialite`} className="text-white/60 hover:text-white">
              {dict.confidentialite}
            </a>
          </div>
        </div>
        <p className="mt-3 text-[0.8125rem] text-white/55">{dict.copyright}</p>
      </div>
    </footer>
  );
}

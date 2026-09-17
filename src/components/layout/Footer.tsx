import type {
  Locale,
  FooterDictionary,
  NavbarDictionary,
  ContactDictionary,
  WhatsappDictionary,
} from "@/i18n/dictionaries";
import Image from "next/image";
import { IconeLieu, IconeTelephone, IconeEmail, IconeWhatsapp } from "@/components/ui/icones";

/* Server Component pur : aucune interaction, donc aucune raison d'envoyer
   du JavaScript au client pour un footer.

   V5 — COMPACT + 3 COLONNES, sur demande explicite ("le footer doit
   FERMER la page, pas devenir une nouvelle section pleine hauteur").
   Inspiration structurelle ACIM (discipline, densite d'info) sans en
   copier le contenu ni le design. Trois zones cote a cote des le
   breakpoint desk, empilees avant :

     1. MARQUE — logo + signature, rien d'autre.
     2. CONTACT — adresse, telephone, email, WhatsApp.
     3. RESEAUX — LinkedIn / Instagram / Facebook, icones toujours
        presentes (structure prete), mais seules celles dont l'URL est
        confirmee sont cliquables (voir plus bas).

   Bandeau du bas : liens legaux + identite legale + copyright,
   compacts, sans repeter les reseaux.

   V6 — encore resserre sur demande explicite (padding/gaps -10 a -15%
   supplementaires) : clearance avec le bouton WhatsApp flottant
   RE-VERIFIEE par mesure reelle des rectangles de texte (pas seulement
   des boites), a 375 et 1440, page defilee jusqu'au vrai bas du
   document. */

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
  contact,
  whatsapp,
}: {
  locale: Locale;
  dict: FooterDictionary;
  nav: NavbarDictionary;
  contact: ContactDictionary;
  whatsapp: WhatsappDictionary;
}) {
  const reseauxListe = Object.entries(dict.reseaux) as [keyof typeof RESEAUX_ICONES, string][];
  const lienBase = "text-[0.9375rem] text-white/85 transition-colors hover:text-white";
  const titreColonne = "text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-white/75";
  const iconeContact = "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white";
  const iconeReseau = "flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 hover:text-white";
  const whatsappHref = `${whatsapp.href}?text=${encodeURIComponent(whatsapp.message)}`;

  /* L'ancre #contact vit desormais sur la section Contact.tsx (le
     formulaire), pas ici : "Parlons de votre projet" (Navbar, CTA
     final, Expertises) doit amener a une ACTION reelle — remplir le
     formulaire — plutot qu'a une simple liste de coordonnees. Le
     Footer garde les memes coordonnees, juste sans porter l'ancre. */
  return (
    <footer className="bg-aws-navy">
      {/* Filet superieur en degrade : un detail graphique discret plutot
          qu'une bordure plate, pour que le Footer se sente dessine et
          non juste "un rectangle bleu pose en bas de page". S'estompe
          aux deux extremites — jamais une ligne dure d'un bord a l'autre. */}
      <div
        aria-hidden="true"
        className="h-px bg-linear-to-r from-transparent via-aws-blue-text/50 to-transparent"
      />
      {/* pb superieur a pt : le bouton WhatsApp flottant (fixed, coin
          inferieur droit) occupe une bande verticale fixe au bas de
          l'ECRAN, quelle que soit la position de defilement — la derniere
          ligne du Footer doit donc disposer d'assez d'espace en dessous
          d'elle pour qu'on puisse la faire defiler AU-DESSUS de cette
          bande. Verifie a l'ecran : sans cette marge, le copyright reste
          coince sous le bouton meme en bas de page, quel que soit
          l'alignement horizontal du texte. */}
      <div className="mx-auto max-w-[1360px] px-4 pt-6 pb-20 sm:px-6 sm:pt-6 sm:pb-20 desk:px-8 desk:pt-7 desk:pb-16">
        <div className="reveal grid gap-7 desk:grid-cols-[1fr_1.3fr_0.9fr] desk:gap-7">
          {/* ZONE 1 — MARQUE. Les deux fichiers logo sont des PNG a fond
              blanc opaque (verifie pixel par pixel, pas de canal alpha) :
              une puce blanche porte le logo intact plutot que de le
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

          {/* ZONE 2 — CONTACT. L'adresse reste un texte simple : tant
              qu'aucune fiche Google Business officielle n'est confirmee,
              aucun lien Maps n'est affiche (et surtout aucune mention
              "a confirmer" sur une page publique). */}
          <div>
            <p className={titreColonne}>{dict.contactsNav}</p>
            <ul className="mt-3 space-y-2">
              <li className="flex gap-3">
                <span className={iconeContact}>{IconeLieu}</span>
                <p className="pt-1.5 text-[0.9375rem] leading-[1.5] text-white/85">{contact.adresse}</p>
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
              {/* WhatsApp porte SON propre vert (icone + libelle), pas le
                  style bleu/blanc des trois autres lignes : regle explicite
                  du cahier des charges — WhatsApp doit rester identifiable
                  comme WhatsApp, jamais absorbe dans l'identite AWS. */}
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-whatsapp text-white">
                  {IconeWhatsapp}
                </span>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pt-1.5 text-[0.9375rem] font-medium text-white/85 transition-colors hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* ZONE 3 — RESEAUX. Structure prete pour les trois reseaux,
              mais AUCUNE URL officielle n'est confirmee aujourd'hui : une
              icone sans href reel n'est jamais rendue comme un <a> (pas
              de href="#", pas de faux profil). Elle reste visible, en
              placeholder attenue et non interactif (aria-hidden, pas de
              focus), pour que la colonne garde sa place et que la vraie
              URL puisse etre branchee plus tard sans rien reconstruire. */}
          <div>
            <p className={titreColonne}>{dict.reseauxNav}</p>
            <ul className="mt-3 flex gap-2.5">
              {reseauxListe.map(([reseau, href]) =>
                href ? (
                  <li key={reseau}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={iconeReseau}
                      aria-label={reseau}
                    >
                      {RESEAUX_ICONES[reseau]}
                    </a>
                  </li>
                ) : (
                  <li key={reseau} aria-hidden="true">
                    <span className={`${iconeReseau} text-white/30 hover:bg-white/10 hover:text-white/30`}>
                      {RESEAUX_ICONES[reseau]}
                    </span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* BANDEAU LEGAL — compact, toujours en colonne (pas de
            justify-between) : le bouton WhatsApp flottant occupe le coin
            inferieur droit sur TOUTE la hauteur de la page, copyright
            inclus. Un bandeau justify-between aurait pousse cette ligne
            jusque sous le bouton a certaines largeurs — verifie a
            l'ecran, corrige en gardant les deux lignes alignees a
            gauche, qui ne rencontrent jamais ce coin. Separateur
            white/15 : le meme "ressenti, pas remarque" que les filets
            clairs ailleurs sur le site. */}
        <div className="mt-5 flex flex-col gap-2 border-t border-white/15 pt-3.5 text-[0.8125rem] desk:mt-6">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href={`/${locale}/mentions-legales`} className="text-white/85 hover:text-white">
              {dict.mentionsLegales}
            </a>
            <a href={`/${locale}/confidentialite`} className="text-white/85 hover:text-white">
              {dict.confidentialite}
            </a>
          </div>
          <p className="text-white/60">
            {dict.raisonSociale} — {dict.formeJuridique} — {dict.rccm}
          </p>
          <p className="text-white/50">{dict.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

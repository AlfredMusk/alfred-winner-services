"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale, NavbarDictionary } from "@/i18n/dictionaries";
import { locales } from "@/i18n/dictionaries";

/* ------------------------------------------------------------------
   STYLES

   Typographie calee sur la reference ACIM (relevee dans leur CSS :
   Montserrat, quasi noir, aucun letter-spacing, survol = couleur seule).
   On resserre legerement le tracking : Montserrat est large, -0.01em
   la rend plus nette sans la tasser.

   Aucun underline nulle part : ni au repos, ni au survol, ni en actif.
   ------------------------------------------------------------------ */

const navLinkBase =
  "rounded-md px-3 py-2 text-[0.875rem] font-medium tracking-[-0.01em] xl:text-[0.9375rem] " +
  "transition-colors duration-200 hover:text-aws-blue-text focus-visible:text-aws-blue-text " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aws-blue " +
  "motion-reduce:transition-none";

/* Piege Tailwind : deux classes de couleur ont la MEME specificite, c'est
   l'ordre de la feuille generee qui tranche, pas l'ordre ecrit. On ne les
   empile donc jamais — une couleur par etat.

   ACTIF reste volontairement CALME : navy un peu plus dense et graisse
   superieure, pas de bleu permanent. Le bleu est reserve au survol. */
const navLinkIdle = "text-aws-ink";
const navLinkActive = "text-aws-navy font-semibold";
const navLinkOpen = "text-aws-blue-text";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aws-blue";

const mobileLink =
  "flex min-h-11 items-center rounded-lg px-1 text-[0.9375rem] font-medium text-aws-ink " +
  "transition-colors duration-200 hover:text-aws-blue-text focus-visible:text-aws-blue-text " +
  `${focusRing} motion-reduce:transition-none`;

type Props = { locale: Locale; dict: NavbarDictionary };

export default function Navbar({ locale, dict }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  /* useRef et non useState : "le menu a-t-il ete ouvert par un clic ?"
     ne doit pas provoquer de re-rendu. Sans cela, survoler puis cliquer
     refermait le menu aussitot. */
  const pinnedRef = useRef(false);

  const links = [
    { label: dict.nav.projects, href: "#projets" },
    { label: dict.nav.about, href: "#a-propos" },
    { label: dict.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        pinnedRef.current = false;
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!servicesOpen) return;
    const onDown = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        pinnedRef.current = false;
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [servicesOpen]);

  return (
    <header
      className={
        "sticky top-0 z-50 bg-white transition-shadow duration-200 motion-reduce:transition-none " +
        (scrolled
          ? "border-b border-aws-line shadow-[0_1px_4px_rgba(0,36,84,0.07)]"
          : "border-b border-transparent")
      }
    >
      {/* Container centre : max-width + padding-inline. Les trois zones
          vivent dans CE cadre, elles ne sont jamais poussees par des marges. */}
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 desk:px-8">
        {/* Une seule ligne flex, trois zones :
            - marque   : shrink-0, garde sa largeur naturelle
            - nav      : flex-1, absorbe TOUT l'espace libre et centre son
                         contenu dedans. C'est ce qui rapproche la nav du
                         logo : l'espace n'est plus reparti aux extremites.
            - actions  : shrink-0, colle a droite
            gap gere la respiration entre zones, aucune marge arbitraire. */}
        {/* justify-between est indispensable EN MOBILE : la nav en flex-1
            est alors en display:none, donc retiree du flux, et plus rien ne
            pousse le groupe d'actions vers la droite. En desktop il n'a aucun
            effet, le flex-1 ayant deja absorbe tout l'espace libre. */}
        <div className="flex h-16 items-center justify-between gap-6 desk:h-20 desk:gap-8">

          {/* ---------- ZONE 1 : marque ---------- */}
          {/* aria-label explicite plutot qu'un span sr-only : le lien ne
              contient que des images decoratives et la signature masquee aux
              lecteurs d'ecran. Sans lui, son nom accessible dependait du
              calcul par le texte descendant — un lien-logo doit etre nomme
              sans ambiguite. */}
          <Link
            href={`/${locale}`}
            aria-label={dict.a11y.brandHome}
            className={`flex shrink-0 items-center gap-2 rounded-lg ${focusRing}`}
          >
            <Image
              src="/images/brand/aws-emblem.png"
              alt=""
              width={240}
              height={226}
              priority
              className="h-9 w-auto desk:h-11 xl:h-12"
            />
            {/* Le mot-symbole et la signature forment une colonne : la
                signature appartient au LOCKUP, pas a la navbar. */}
            {/* items-start est INDISPENSABLE : dans une colonne flex,
                align-items vaut "stretch" par defaut, et l'image du
                mot-symbole etait etiree a la largeur de la signature,
                donc deformee. */}
            <span className="flex flex-col items-start gap-[2px]">
              <Image
                src="/images/brand/aws-wordmark.png"
                alt=""
                width={472}
                height={120}
                priority
                className="h-5 w-auto desk:h-6 xl:h-7"
              />
              {/* Micro-typographie : petite, espacee, desaturee. Elle se
                  decouvre APRES le logo et ne le concurrence jamais.
                  Masquee sous 1280px : elle mesure environ 2x la largeur du
                  mot-symbole et comprimerait la navigation. */}
              {/* MICRO-SIGNATURE. La meme phrase sert d'eyebrow dans le Hero
                  juste en dessous : ici elle doit donc rester derriere.
                  On la rend discrete par l'ECHELLE (7.5px au lieu de 9) et un
                  interlettrage plus large, PAS par une opacite plus faible :
                  #5b6b82 est deja a 5.43 de contraste, l'affaiblir la ferait
                  passer sous le seuil. Hierarchie obtenue :
                  signature 7.5px < eyebrow Hero 11px < H1 58px.

                  aria-hidden : c'est une typographie de marque, pas une
                  information de navigation. */}
              <span
                aria-hidden="true"
                className="hidden text-[0.46875rem] font-medium uppercase leading-none tracking-[0.2em] text-aws-muted xl:block"
              >
                {dict.signature}
              </span>
            </span>
          </Link>

          {/* ---------- ZONE 2 : navigation ---------- */}
          <nav
            aria-label={dict.a11y.mainNav}
            className="hidden flex-1 items-center justify-center gap-0.5 desk:flex xl:gap-1"
          >
            <NavHome locale={locale} label={dict.nav.home} />

            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => {
                if (!pinnedRef.current) setServicesOpen(false);
              }}
            >
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
                onClick={() => {
                  const willClose = servicesOpen && pinnedRef.current;
                  pinnedRef.current = !willClose;
                  setServicesOpen(!willClose);
                }}
                className={
                  `${navLinkBase} inline-flex items-center gap-1.5 ` +
                  (servicesOpen ? navLinkOpen : navLinkIdle)
                }
              >
                {dict.nav.services}
                {/* stroke="currentColor" : le chevron herite de la couleur
                    du texte, il devient donc bleu en meme temps que lui. */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 10 6"
                  className={
                    "h-1.5 w-2.5 transition-transform duration-200 motion-reduce:transition-none " +
                    (servicesOpen ? "rotate-180" : "")
                  }
                >
                  <path
                    d="M1 1l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* pt-3 fait le pont : sans lui le curseur quitte la zone
                  entre le bouton et le panneau, et le menu clignote. */}
              <div
                id="services-menu"
                hidden={!servicesOpen}
                className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
              >
                <ul className="w-[17rem] rounded-xl border border-aws-line bg-white p-2 shadow-[0_8px_28px_rgba(0,36,84,0.10)]">
                  {dict.services.map((s) => (
                    <li key={s.hash}>
                      <a
                        href={`#${s.hash}`}
                        onClick={() => {
                          pinnedRef.current = false;
                          setServicesOpen(false);
                        }}
                        className={`flex items-baseline gap-3 rounded-lg px-3 py-2.5 text-[0.9375rem] text-aws-ink transition-colors duration-200 hover:bg-[#f2f7fd] hover:text-aws-blue-text motion-reduce:transition-none ${focusRing}`}
                      >
                        <span className="w-4 shrink-0 text-[0.6875rem] font-semibold tabular-nums text-aws-blue">
                          {s.num}
                        </span>
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {links.map((l) => (
              <a key={l.href} href={l.href} className={`${navLinkBase} ${navLinkIdle}`}>
                {l.label}
              </a>
            ))}
          </nav>

          {/* ---------- ZONE 3 : langues + CTA + burger ---------- */}
          <div className="flex shrink-0 items-center gap-3 sm:gap-4 desk:gap-5">
            <LangSwitch locale={locale} dict={dict} />

            <a
              href="#contact"
              className={`group hidden items-center gap-2 rounded-full bg-aws-navy px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#001a3f] hover:shadow-[0_4px_14px_rgba(0,36,84,0.22)] motion-reduce:transition-none desk:inline-flex xl:px-5 ${focusRing}`}
            >
              {dict.cta}
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
              >
                →
              </span>
            </a>

            {/* h-11 w-11 = 44x44px, cible tactile minimale recommandee */}
            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? dict.a11y.closeMenu : dict.a11y.openMenu}
              onClick={() => setMobileOpen((v) => !v)}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-lg text-aws-navy desk:hidden ${focusRing}`}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              >
                {mobileOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ---------- Panneau mobile ---------- */}
      <div
        id="mobile-menu"
        hidden={!mobileOpen}
        className="border-t border-aws-line bg-white desk:hidden"
      >
        <nav
          aria-label={dict.a11y.mobileNav}
          className="mx-auto max-w-[1360px] px-4 py-4 sm:px-6"
        >
          <ul className="flex flex-col">
            <li>
              <Link
                href={`/${locale}`}
                aria-current="page"
                className={`${mobileLink} font-semibold`}
                onClick={() => setMobileOpen(false)}
              >
                {dict.nav.home}
              </Link>
            </li>
            <li>
              <span className="block px-1 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-aws-ink/50">
                {dict.nav.services}
              </span>
              <ul className="flex flex-col border-l border-aws-line pl-3">
                {dict.services.map((s) => (
                  <li key={s.hash}>
                    <a
                      href={`#${s.hash}`}
                      className={mobileLink}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="mr-2 text-[0.6875rem] font-semibold tabular-nums text-aws-blue">
                        {s.num}
                      </span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={mobileLink} onClick={() => setMobileOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className={`group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-aws-navy px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#001a3f] motion-reduce:transition-none ${focusRing}`}
          >
            {dict.cta}
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
            >
              →
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}

/* "Accueil" est la page courante : aria-current le dit aux lecteurs
   d'ecran, et le style reste sobre — navy dense + graisse, pas de bleu. */
function NavHome({ locale, label }: { locale: Locale; label: string }) {
  return (
    <Link
      href={`/${locale}`}
      aria-current="page"
      className={`${navLinkBase} ${navLinkActive}`}
    >
      {label}
    </Link>
  );
}

/* ------------------------------------------------------------------
   FR · EN — reellement fonctionnel

   usePathname() donne le chemin courant, ex "/fr" ou "/fr/projets".
   On retire le prefixe de langue puis on le remplace par l'autre :
   le visiteur reste donc sur LA MEME page en changeant de langue.
   ------------------------------------------------------------------ */
function LangSwitch({ locale, dict }: { locale: Locale; dict: NavbarDictionary }) {
  const pathname = usePathname() ?? `/${locale}`;
  const sansLangue = pathname.replace(/^\/(fr|en)(?=\/|$)/, "");
  const hrefPour = (l: Locale) => `/${l}${sansLangue}`;

  const actif = "font-semibold text-aws-blue-text";
  const inactif =
    "font-medium text-aws-ink/60 transition-colors duration-200 hover:text-aws-blue-text " +
    `focus-visible:text-aws-blue-text ${focusRing} motion-reduce:transition-none`;

  return (
    <div className="flex items-center gap-1.5 text-[0.8125rem]">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && (
            <span aria-hidden="true" className="select-none text-aws-ink/25">
              ·
            </span>
          )}
          <Link
            href={hrefPour(l)}
            hrefLang={l}
            aria-current={l === locale ? "true" : undefined}
            aria-label={l === "fr" ? dict.a11y.switchToFr : dict.a11y.switchToEn}
            className={`rounded px-0.5 ${l === locale ? actif : inactif}`}
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}

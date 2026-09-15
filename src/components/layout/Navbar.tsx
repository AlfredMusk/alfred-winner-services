// 'use client' : ce composant utilise useState / useEffect, donc il doit
// s'executer dans le navigateur. Par defaut, tout composant Next.js App Router
// est un Server Component et n'a acces ni a l'etat ni aux evenements.
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* Les donnees de navigation sont sorties du JSX : une seule source de verite,
   reutilisee par le menu desktop ET le menu mobile. */
const SERVICES = [
  { num: "01", label: "Bourse & Finance", href: "#bourse-finance" },
  { num: "02", label: "Immobilier", href: "#immobilier" },
  { num: "03", label: "Software & IA", href: "#software-ia" },
];

const LINKS = [
  { label: "Projets", href: "#projets" },
  { label: "À propos", href: "#a-propos" },
  { label: "Contact", href: "#contact" },
];

/* Styles partages. Extraits en constantes pour eviter de repeter
   quinze classes Tailwind a chaque lien. */
/* Lien de navigation desktop.

   Typographie calee sur la reference ACIM, relevee dans leur CSS :
   Montserrat, 13px, quasi noir, aucun letter-spacing, et un survol
   qui ne change QUE la couleur. On garde 13px jusqu'a 1279 et on
   passe a 14px au-dela, ou la place ne manque plus.

   Plus aucun underline : ni au repos, ni au survol, ni en actif.
   Le focus clavier, lui, conserve son propre indicateur — le survol
   concerne la souris et ne doit jamais servir de seul repere. */
const navLinkBase =
  "rounded-md px-3 py-2 text-[0.8125rem] font-medium xl:text-[0.875rem] " +
  "transition-colors duration-200 hover:text-aws-blue-text focus-visible:text-aws-blue-text " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aws-blue " +
  "motion-reduce:transition-none";

/* Piege Tailwind : la derniere classe ecrite ne gagne PAS. text-aws-navy et
   text-aws-blue-text ont la meme specificite, c'est l'ordre de la feuille
   generee qui tranche. On ne les empile donc jamais : une couleur par etat.
   (hover:text-... gagne toujours : classe + pseudo-classe.)

   ACTIF n'est PAS HOVER :
   HOVER = "ce que la souris survole", transitoire.
   ACTIF = "ou je me trouve", permanent, et marque aussi par la graisse
   pour ne pas dependre de la seule couleur. */
const navLinkIdle = "text-aws-navy";
const navLinkOpen = "text-aws-blue-text";
const navLinkActive = "text-aws-blue-text font-semibold";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aws-blue";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  /* useRef plutot que useState : "le menu a-t-il ete ouvert par un clic ?"
     ne doit PAS declencher de re-rendu, c'est une simple memoire interne.
     Sans cela, survoler puis cliquer refermait le menu aussitot. */
  const pinnedRef = useRef(false);

  /* Ombre discrete uniquement une fois la page defilee. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Echap ferme le dropdown et le menu mobile : attendu au clavier. */
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

  /* Un clic hors du dropdown le referme. */
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
      {/* max-w-7xl + mx-auto = container centre ; px-* = respiration laterale */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Deux strategies de layout selon la largeur disponible :

            - jusqu'a 1279px : flex + justify-between. Chaque bloc prend sa
              largeur naturelle et ils sont pousses aux extremites. La nav
              n'est pas parfaitement centree, mais tout tient.

            - a partir de 1280px (xl) : grid-cols-[1fr_auto_1fr]. Les deux
              colonnes laterales recoivent la MEME part de l'espace restant,
              donc la colonne du milieu tombe exactement au centre de l'ecran.

            Pourquoi pas la grille partout ? Parce qu'elle force les deux cotes
            a la largeur du plus large : la marque fait 103px mais le groupe
            langue+CTA en fait 280. A 1024px cela demandait 1062px pour 960
            disponibles — le CTA sortait de l'ecran. */}
        <div className="flex h-16 items-center justify-between gap-6 lg:h-20 xl:grid xl:grid-cols-[1fr_auto_1fr]">

          {/* ---------- GAUCHE : marque ---------- */}
          <a href="#top" className={`col-start-1 flex shrink-0 items-center gap-2 justify-self-start rounded-lg ${focusRing}`}>
            {/* Embleme et mot-symbole DECOUPES dans le logo officiel.
                Aucune reinterpretation : ce sont les pixels d'origine.
                Le lockup vertical d'origine est reassemble a l'horizontale. */}
            <Image
              src="/images/brand/aws-emblem.png"
              alt=""
              width={240}
              height={226}
              priority
              className="h-9 w-auto lg:h-11"
            />
            <Image
              src="/images/brand/aws-wordmark.png"
              alt=""
              width={472}
              height={120}
              priority
              className="h-5 w-auto lg:h-6"
            />
            {/* Le logo est une image : ce texte donne au lien son nom accessible. */}
            <span className="sr-only">Alfred Winner Services — accueil</span>
          </a>

          {/* ---------- CENTRE : navigation (desktop) ---------- */}
          {/* hidden = display:none ; lg:flex = redevient flex a partir de 1024px */}
          <nav aria-label="Navigation principale" className="col-start-2 hidden items-center gap-1 justify-self-center lg:flex xl:gap-2">
            {/* aria-current="page" dit a un lecteur d'ecran "vous etes ici".
                La couleur seule ne suffirait pas. */}
            <a href="#top" aria-current="page" className={`${navLinkBase} ${navLinkActive}`}>
              Accueil
            </a>

            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => {
                /* On ne referme au survol que si l'utilisateur n'a pas
                   explicitement "epingle" le menu par un clic. */
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
                  /* Dropdown ouvert : etat bleu, mais SANS changer la graisse,
                     sinon le bouton s'elargirait a l'ouverture. Le chevron
                     suit tout seul, il est dessine en stroke="currentColor". */
                  (servicesOpen ? navLinkOpen : navLinkIdle)
                }
              >
                Nos services
                <svg
                  aria-hidden="true"
                  viewBox="0 0 10 6"
                  className={
                    "h-1.5 w-2.5 transition-transform duration-200 motion-reduce:transition-none " +
                    (servicesOpen ? "rotate-180" : "")
                  }
                >
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5"
                        fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* pt-3 sert de pont : sans lui, le curseur quitte la zone
                  entre le bouton et le panneau, et le menu clignote. */}
              <div id="services-menu" hidden={!servicesOpen} className="absolute left-0 top-full pt-3">
                <ul className="w-64 rounded-xl border border-aws-line bg-white p-2 shadow-lg shadow-aws-navy/5">
                  {SERVICES.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        onClick={() => {
                          pinnedRef.current = false;
                          setServicesOpen(false);
                        }}
                        className={`flex items-baseline gap-3 rounded-lg px-3 py-2.5 text-[0.9375rem] text-aws-ink transition-colors hover:bg-[#f2f7fd] hover:text-aws-blue-text motion-reduce:transition-none ${focusRing}`}
                      >
                        <span className="text-[0.6875rem] font-semibold tabular-nums text-aws-blue">
                          {s.num}
                        </span>
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className={`${navLinkBase} ${navLinkIdle}`}>{l.label}</a>
            ))}
          </nav>

          {/* ---------- DROITE : langue + CTA (desktop) + bouton (mobile) ---------- */}
          <div className="col-start-3 flex items-center justify-self-end">
            <div className="hidden shrink-0 items-center gap-4 lg:flex xl:gap-5">
              <LangSwitch />
              <a
                href="#contact"
                className={`group inline-flex items-center gap-2 rounded-full bg-aws-navy px-4 py-2.5 text-sm font-semibold text-white transition-all xl:px-5 duration-200 hover:bg-[#001a3f] hover:shadow-[0_4px_14px_rgba(0,36,84,0.22)] motion-reduce:transition-none ${focusRing}`}
              >
                Parlons de votre projet
                {/* group-hover : l'enfant reagit au survol du PARENT.
                    translate-x-0.5 = 2px, juste assez pour se remarquer. */}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                >
                  →
                </span>
              </a>
            </div>

            {/* ---------- Bouton menu (mobile) ---------- */}
            {/* h-11 w-11 = 44x44px, la cible tactile minimale recommandee */}
            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setMobileOpen((v) => !v)}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-lg text-aws-navy lg:hidden ${focusRing}`}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none"
                   stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
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
      <div id="mobile-menu" hidden={!mobileOpen} className="border-t border-aws-line bg-white lg:hidden">
        <nav aria-label="Navigation mobile" className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <ul className="flex flex-col">
            <li>
              <a
                href="#top"
                aria-current="page"
                className={`${mobileLink} font-semibold text-aws-blue-text`}  /* actif */
                onClick={() => setMobileOpen(false)}
              >
                Accueil
              </a>
            </li>
            <li>
              <span className="block px-1 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-aws-ink/50">
                Nos services
              </span>
              <ul className="flex flex-col border-l border-aws-line pl-3">
                {SERVICES.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} className={`${mobileLink} ${navLinkIdle}`} onClick={() => setMobileOpen(false)}>
                      <span className="mr-2 text-[0.6875rem] font-semibold tabular-nums text-aws-blue">
                        {s.num}
                      </span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={`${mobileLink} ${navLinkIdle}`} onClick={() => setMobileOpen(false)}>{l.label}</a>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-aws-line pt-5">
            <LangSwitch />
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className={`group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-aws-navy px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#001a3f] motion-reduce:transition-none ${focusRing}`}
            >
              Parlons de votre projet
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
              >
                →
              </span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

const mobileLink =
  "flex min-h-11 items-center rounded-lg px-1 text-[0.9375rem] font-medium " +
  "transition-colors duration-200 hover:text-aws-blue-text focus-visible:text-aws-blue-text " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aws-blue " +
  "motion-reduce:transition-none";

/* FR / EN : interface visuelle uniquement, l'i18n n'existe pas encore.
   EN porte aria-disabled plutot que disabled : il reste atteignable au
   clavier et annonce sa propre indisponibilite, au lieu de disparaitre
   silencieusement du parcours. Quand l'anglais sera reellement en place,
   il suffira d'echanger les deux styles. */
function LangSwitch() {
  /* Le jour ou l'anglais existera, il suffira d'echanger les deux classes :
     actif = font-semibold text-aws-blue-text, inactif = text-aws-ink/55. */
  const actif = "font-semibold text-aws-blue-text";
  const inactif =
    "font-normal text-aws-ink/55 transition-colors duration-200 hover:text-aws-blue-text " +
    "focus-visible:text-aws-blue-text focus-visible:outline-2 focus-visible:outline-offset-2 " +
    "focus-visible:outline-aws-blue motion-reduce:transition-none";
  return (
    <div className="flex items-center gap-1.5 text-[0.8125rem]">
      <span aria-current="true" className={actif}>FR</span>
      <span aria-hidden="true" className="select-none text-aws-ink/20">|</span>
      <button type="button" aria-disabled="true" title="Version anglaise à venir" className={`cursor-default ${inactif}`}>
        EN
      </button>
    </div>
  );
}

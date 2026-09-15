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
const navLink =
  "rounded-lg px-3 py-2 text-[0.9375rem] text-aws-ink transition-colors " +
  "hover:text-aws-navy focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-aws-blue motion-reduce:transition-none";

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
          <a href="#top" className={`col-start-1 flex shrink-0 items-center gap-2.5 justify-self-start rounded-lg ${focusRing}`}>
            <Image
              src="/images/brand/aws-symbol.svg"
              alt=""
              width={40}
              height={40}
              priority
              className="h-8 w-8 lg:h-10 lg:w-10"
            />
            <span className="text-[1.375rem] font-bold leading-none tracking-tight text-aws-navy lg:text-2xl">
              AWS
            </span>
            {/* Texte reserve aux lecteurs d'ecran : "AWS" seul est ambigu a l'oral. */}
            <span className="sr-only">Alfred Winner Services — accueil</span>
          </a>

          {/* ---------- CENTRE : navigation (desktop) ---------- */}
          {/* hidden = display:none ; lg:flex = redevient flex a partir de 1024px */}
          <nav aria-label="Navigation principale" className="col-start-2 hidden items-center gap-1 justify-self-center lg:flex">
            <a href="#top" className={navLink}>Accueil</a>

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
                className={`${navLink} inline-flex items-center gap-1.5`}
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
                        className={`flex items-baseline gap-3 rounded-lg px-3 py-2.5 text-[0.9375rem] text-aws-ink transition-colors hover:bg-[#f4f8fd] hover:text-aws-navy motion-reduce:transition-none ${focusRing}`}
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
              <a key={l.href} href={l.href} className={navLink}>{l.label}</a>
            ))}
          </nav>

          {/* ---------- DROITE : langue + CTA (desktop) + bouton (mobile) ---------- */}
          <div className="col-start-3 flex items-center justify-self-end">
            <div className="hidden shrink-0 items-center gap-5 lg:flex">
              <LangSwitch />
              <a
                href="#contact"
                className={`inline-flex items-center gap-2 rounded-full bg-aws-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-aws-navy-soft motion-reduce:transition-none ${focusRing}`}
              >
                Parlons de votre projet
                <span aria-hidden="true">→</span>
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
              <a href="#top" className={mobileLink} onClick={() => setMobileOpen(false)}>Accueil</a>
            </li>
            <li>
              <span className="block px-1 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-aws-ink/50">
                Nos services
              </span>
              <ul className="flex flex-col border-l border-aws-line pl-3">
                {SERVICES.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} className={mobileLink} onClick={() => setMobileOpen(false)}>
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
                <a href={l.href} className={mobileLink} onClick={() => setMobileOpen(false)}>{l.label}</a>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-aws-line pt-5">
            <LangSwitch />
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-aws-navy px-5 py-3 text-sm font-semibold text-white ${focusRing}`}
            >
              Parlons de votre projet
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

const mobileLink =
  "flex min-h-11 items-center rounded-lg px-1 text-[0.9375rem] text-aws-ink " +
  "hover:text-aws-navy focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-aws-blue";

/* FR / EN visuel uniquement : l'anglais n'existe pas encore.
   Le bouton est desactive plutot que de simuler un lien qui ne mene nulle part. */
function LangSwitch() {
  return (
    <div className="flex items-center gap-1.5 text-sm">
      <span aria-current="true" className="font-semibold text-aws-navy">FR</span>
      <span aria-hidden="true" className="text-aws-line">|</span>
      <button
        type="button"
        disabled
        title="Version anglaise à venir"
        className="cursor-not-allowed text-aws-ink/35"
      >
        EN
      </button>
    </div>
  );
}

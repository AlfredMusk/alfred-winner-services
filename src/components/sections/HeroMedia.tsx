/* Seul le media a besoin d'etat : c'est le SEUL morceau du Hero qui part en
   Client Component. Le texte reste rendu sur le serveur. */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { HeroDictionary } from "@/i18n/dictionaries";

const DUREE = 7000;            // rotation automatique : lent, on a le temps de regarder
const DUREE_APRES_CLIC = 14000; // apres une action manuelle, on laisse largement respirer
const DUREE_TRANSITION = 1000;  // doit rester >= la transition CSS

function useMouvementReduit() {
  const [reduit, setReduit] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const maj = () => setReduit(mq.matches);
    maj();
    mq.addEventListener("change", maj);
    return () => mq.removeEventListener("change", maj);
  }, []);
  return reduit;
}

export default function HeroMedia({ dict }: { dict: HeroDictionary }) {
  const { slides } = dict;
  const [index, setIndex] = useState(0);
  /* Le plan qui s'en va reste immobile pendant que le nouveau se devoile
     par-dessus. Sans cette memoire, il glisserait en meme temps et le
     devoilement perdrait sa nettete. */
  const [sortant, setSortant] = useState<number | null>(null);
  const [enPause, setEnPause] = useState(false);
  const [manuel, setManuel] = useState(false);
  const mouvementReduit = useMouvementReduit();
  const toucheX = useRef<number | null>(null);

  const allerA = useCallback(
    (i: number, parClic = false) => {
      const n = (i + slides.length) % slides.length;
      setIndex((courant) => {
        if (n === courant) return courant;
        setSortant(courant);
        return n;
      });
      if (parClic) setManuel(true);
    },
    [slides.length],
  );

  /* On libere le plan sortant une fois la transition finie. */
  useEffect(() => {
    if (sortant === null) return;
    const t = setTimeout(() => setSortant(null), DUREE_TRANSITION);
    return () => clearTimeout(t);
  }, [sortant, index]);

  /* Rotation automatique. Le delai est rallonge apres une action manuelle :
     l'image choisie ne disparait pas sous le nez de l'utilisateur. */
  useEffect(() => {
    if (mouvementReduit || enPause || slides.length < 2) return;
    const t = setTimeout(
      () => {
        setManuel(false);
        allerA(index + 1);
      },
      manuel ? DUREE_APRES_CLIC : DUREE,
    );
    return () => clearTimeout(t);
  }, [index, enPause, manuel, mouvementReduit, slides.length, allerA]);

  return (
    <div
      /* La photographie est un OBJET borne, pas un aplat qui remplit sa
         colonne : c'est ce qui laisse du bleu autour d'elle. */
      className="w-full max-w-[34rem] desk:max-w-none"
      onMouseEnter={() => setEnPause(true)}
      onMouseLeave={() => setEnPause(false)}
      onFocusCapture={() => setEnPause(true)}
      onBlurCapture={() => setEnPause(false)}
    >
      <div
        /* Ratio 4:3 partout — c'est le ratio natif de la photo Finance,
           qui s'affiche donc sans aucun recadrage. Radius sobre sur les
           quatre cotes. Fond de secours legerement plus profond que la
           section : l'emplacement se lit avant que l'image ne peigne. */
        className="relative aspect-4/3 w-full overflow-hidden rounded-[1.25rem] bg-[#00325a]"
        onTouchStart={(e) => (toucheX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (toucheX.current === null) return;
          const delta = e.changedTouches[0].clientX - toucheX.current;
          if (Math.abs(delta) > 48) allerA(index + (delta < 0 ? 1 : -1), true);
          toucheX.current = null;
        }}
      >
        {slides.map((s, i) => {
          const actif = i === index;
          const immobile = i === sortant;
          /* DEVOILEMENT par transformations seules, donc compose par le GPU.
             Le cadre glisse de 100% a 0 tandis que l'image, a l'interieur,
             fait le trajet inverse : la photographie ne bouge donc pas d'un
             pixel, c'est son cadre qui la decouvre. Plus riche qu'un fondu,
             et sans animer ni width ni clip-path. */
          const cadre = actif || immobile ? "0%" : "100%";
          const interne = actif || immobile ? "0%" : "-100%";
          return (
            <div
              key={s.num}
              aria-hidden={!actif}
              className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"
              style={{
                transform: `translate3d(${cadre},0,0)`,
                zIndex: actif ? 20 : immobile ? 10 : 0,
              }}
            >
              <div
                className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"
                style={{ transform: `translate3d(${interne},0,0)` }}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1100px) 48vw, 92vw"
                  style={{ objectPosition: s.position }}
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}

      </div>

      {/* Indicateur SOUS la photographie, sur le bleu. Le voile sombre qui
          servait a le rendre lisible par-dessus l'image devient inutile :
          un element decoratif de moins. Aucun libelle sectoriel. */}
      <div className="mt-4 flex items-center justify-end gap-1">
          {slides.map((s, i) => (
            <button
              key={s.num}
              type="button"
              onClick={() => allerA(i, true)}
              aria-label={`${dict.a11y.choisir} ${s.num}`}
              aria-current={i === index ? "true" : undefined}
              /* Cible tactile de 44px, alors que le trait ne fait que 2px. */
              className="group flex h-11 items-center px-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span
                className={
                  "h-[2px] rounded-full transition-all duration-500 motion-reduce:transition-none " +
                  (i === index ? "w-12 bg-white" : "w-5 bg-white/45 group-hover:bg-white/80")
                }
              />
            </button>
          ))}
      </div>
    </div>
  );
}

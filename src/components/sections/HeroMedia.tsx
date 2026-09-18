"use client";

/* Le texte reste sur le serveur. L'image est la zone de pause/reprise :
   aucun controle visible ajoute, bouton natif accessible au clavier/toucher. */
import { useEffect, useState } from "react";
import Image from "next/image";
import type { HeroDictionary } from "@/i18n/dictionaries";

const DUREE = 5000; // chaque photo reste visible 5s avant de ceder la place

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
  /* Pause temporaire au survol/focus, independante du choix utilisateur. */
  const [enPause, setEnPause] = useState(false);
  const [pauseDemandee, setPauseDemandee] = useState(false);
  const mouvementReduit = useMouvementReduit();

  /* Sous mouvement reduit, aucune rotation automatique : la premiere
     photo reste affichee — "afficher eventuellement une seule image"
     est ici le comportement par defaut, pas un cas particulier gere. */
  useEffect(() => {
    if (mouvementReduit || enPause || pauseDemandee || slides.length < 2) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), DUREE);
    return () => clearTimeout(t);
  }, [index, enPause, pauseDemandee, mouvementReduit, slides.length]);

  return (
    <div
      className="w-full max-w-[34rem] desk:max-w-none"
      onMouseEnter={() => setEnPause(true)}
      onMouseLeave={() => setEnPause(false)}
      onFocusCapture={() => setEnPause(true)}
      onBlurCapture={() => setEnPause(false)}
    >
      {/* Ratio 4:3 partout, radius sobre. Fond de secours legerement plus
          profond que la section : l'emplacement se lit avant que l'image
          ne peigne. */}
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-[1.25rem] bg-[#00325a]">
        {slides.map((s, i) => (
          <div
            key={s.num}
            aria-hidden={i !== index}
            /* CROSSFADE editorial : opacite + zoom quasi imperceptible
               (1.012 -> 1). 700ms : assez rapide pour suivre un rythme de
               5s par photo, assez lent pour rester une transition, jamais
               un effet "carousel". */
            className={
              "absolute inset-0 transition-[opacity,transform] duration-[700ms] ease-out motion-reduce:transition-none " +
              (i === index ? "opacity-100 scale-100" : "opacity-0 scale-[1.012]")
            }
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              preload={i === 0}
              sizes="(min-width: 1412px) 480px, (min-width: 1100px) 34vw, (min-width: 592px) 544px, calc(100vw - 32px)"
              style={{ objectPosition: s.position }}
              className="object-cover"
            />
          </div>
        ))}
        {!mouvementReduit && slides.length > 1 && (
          <button
            type="button"
            aria-label={pauseDemandee ? dict.a11y.reprendre : dict.a11y.pause}
            onClick={() => setPauseDemandee((pause) => !pause)}
            className="absolute inset-0 cursor-default rounded-[inherit] border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
          />
        )}
      </div>
    </div>
  );
}

"use client";

/* Seul le media a besoin d'etat : c'est le SEUL morceau du Hero qui part en
   Client Component. Le texte reste rendu sur le serveur.

   V3 — PLUS AUCUN CONTROLE VISIBLE SUR L'IMAGE. Le bouton pause/play
   (V2, integre au coin du cadre) a ete retire sur demande explicite :
   "le visiteur ne doit voir que la photo". Le mecanisme d'arret reste,
   mais entierement silencieux — survol et focus mettent en pause sans
   qu'aucun symbole n'apparaisse jamais a l'ecran. Sous mouvement reduit,
   aucune rotation n'a jamais lieu (voir plus bas), ce qui couvre le cas
   ou un visiteur a besoin d'arreter le defilement sans dependre d'un
   controle pointeur. */
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
  /* Pause silencieuse au survol/focus — aucun bouton, aucune icone :
     seul le defilement s'arrete, rien ne change a l'ecran. */
  const [enPause, setEnPause] = useState(false);
  const mouvementReduit = useMouvementReduit();

  /* Sous mouvement reduit, aucune rotation automatique : la premiere
     photo reste affichee — "afficher eventuellement une seule image"
     est ici le comportement par defaut, pas un cas particulier gere. */
  useEffect(() => {
    if (mouvementReduit || enPause || slides.length < 2) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), DUREE);
    return () => clearTimeout(t);
  }, [index, enPause, mouvementReduit, slides.length]);

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
              priority={i === 0}
              sizes="(min-width: 1100px) 48vw, 92vw"
              style={{ objectPosition: s.position }}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

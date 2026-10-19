"use client";

/* Le texte reste sur le serveur. L'image est la zone de pause/reprise :
   aucun controle visible ajoute, bouton natif accessible au clavier/toucher. */
import { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import Image from "next/image";
import type { HeroDictionary } from "@/i18n/dictionaries";

const DUREE = 7000; // Rythme calme ; fondu CSS de 700 ms.

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
  const [pageMasquee, setPageMasquee] = useState(false);
  const [pauseDemandee, setPauseDemandee] = useState(false);
  const mouvementReduit = useMouvementReduit();

  useEffect(() => {
    const maj = () => setPageMasquee(document.hidden);
    maj();
    document.addEventListener("visibilitychange", maj);
    return () => document.removeEventListener("visibilitychange", maj);
  }, []);

  /* Sous mouvement reduit, aucune rotation automatique : la premiere
     photo reste affichee — "afficher eventuellement une seule image"
     est ici le comportement par defaut, pas un cas particulier gere. */
  useEffect(() => {
    if (pageMasquee || mouvementReduit || enPause || pauseDemandee || slides.length < 2) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), DUREE);
    return () => clearTimeout(t);
  }, [index, pageMasquee, enPause, pauseDemandee, mouvementReduit, slides.length]);

  return (
    <div className={styles.scene}
      onMouseEnter={() => setEnPause(true)}
      onMouseLeave={() => setEnPause(false)}
      onFocusCapture={() => setEnPause(true)}
      onBlurCapture={() => setEnPause(false)}>
        <div className={styles.stage}>
          {slides.map((s, i) => (
            <div key={s.num} aria-hidden={i !== index} className={styles.slide}
              style={{ opacity: i === index ? 1 : 0 }}>
              <Image src={s.src} alt={s.alt} fill fetchPriority={i === 0 ? "high" : "low"}
                loading="eager"
                sizes="(min-width: 1360px) 616px, (min-width: 1024px) 46vw, (min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)"
                style={{ objectPosition: i === 0 ? s.position : "50% 65%" }}
                className={styles.photo} />
            </div>
          ))}
          {!mouvementReduit && slides.length > 1 && (
            <button type="button" className={styles.pause}
              aria-label={pauseDemandee ? dict.a11y.reprendre : dict.a11y.pause}
              onClick={() => setPauseDemandee((pause) => !pause)} />
          )}
        </div>

    </div>
  );
}

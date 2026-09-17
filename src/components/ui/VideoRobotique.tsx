"use client";

/* Seul Client Component de cette famille de sections, pour une seule
   raison technique : l'attribut autoplay d'un <video> est evalue par
   le navigateur au moment ou l'element recoit assez de donnees, pas
   recalcule en continu depuis une classe CSS — respecter
   prefers-reduced-motion ("pas d'autoplay decoratif", cahier des
   charges) exige donc un minimum de JS pour appeler .play()/.pause()
   soi-meme selon la preference systeme.

   DEGRADATION : sans JS (ou pendant l'hydratation), l'element reste
   sur son attribut `poster` — une vraie image fixe, jamais un cadre
   vide. Voir ASSETS_SOURCES.md pour la source de la video et du poster. */
import { useEffect, useRef } from "react";

export default function VideoRobotique({
  src,
  poster,
  ariaLabel,
}: {
  src: string;
  poster: string;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const appliquer = () => {
      const el = ref.current;
      if (!el) return;
      if (mq.matches) el.play().catch(() => {});
      else el.pause();
    };
    appliquer();
    mq.addEventListener("change", appliquer);
    return () => mq.removeEventListener("change", appliquer);
  }, []);

  return (
    <video
      ref={ref}
      className="h-full w-full object-cover"
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={ariaLabel}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

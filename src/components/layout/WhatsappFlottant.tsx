"use client";

import { useEffect, useRef } from "react";
import type { WhatsappDictionary } from "@/i18n/dictionaries";
import { IconeWhatsapp } from "@/components/ui/icones";

/* Bouton flottant. Icone seule jusqu'a desk (1100px, 48px, cible
   tactile conforme) : ajouter le texte plus tot le ferait entrer en
   collision avec les titres centres des sections (CtaFinal notamment)
   sur les largeurs tablette — mesure a l'ecran a 768px avec un premier
   essai a partir de sm (640px) : la premiere ligne du titre CTA
   chevauchait reellement le bouton, pas seulement sa boite. A partir de
   desk seulement, une invitation courte ("Besoin d'aide ?") apparait a
   cote de l'icone, dans l'esprit observe chez ACIM sans en reprendre le
   style — un seul <a>, pas de bulle separee, pas d'etat "ferme/ouvert"
   a gerer. Le message pre-rempli et le aria-label portent l'explication
   complete dans tous les cas.

   position: fixed + inset calcule avec les safe-area insets (iOS) deja
   disponibles via le reset global (voir globals.css :root). z-40 : sous
   un eventuel modal/menu mobile (qui doit rester au-dessus), au-dessus
   du contenu de page.

   Le lien reste natif. Il s'efface temporairement s'il couvrirait du
   texte ou un champ : les liens WhatsApp du footer restent disponibles.
   Mesures regroupees dans un seul frame par scroll, sans rendu React. */
export default function WhatsappFlottant({ dict }: { dict: WhatsappDictionary }) {
  const href = `${dict.href}?text=${encodeURIComponent(dict.message)}`;
  const lienRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const lien = lienRef.current;
    if (!lien) return;
    let frame = 0;
    const verifier = () => {
      frame = 0;
      if (document.activeElement === lien) return;
      const bouton = lien.getBoundingClientRect();
      const chevauche = (rect: DOMRect) => rect.width > 0 && rect.height > 0 &&
        rect.left < bouton.right && rect.right > bouton.left &&
        rect.top < bouton.bottom && rect.bottom > bouton.top;
      const elements = document.querySelectorAll(
        "main p, main h1, main h2, main h3, main label, main input, main select, main textarea, main button, main a, footer p, footer a",
      );
      const collision = Array.from(elements).some((element) => {
        if (!chevauche(element.getBoundingClientRect())) return false;
        if (element.matches("input, select, textarea, button, a, label")) return true;
        // Les rectangles des lignes de texte excluent le blanc en fin de ligne.
        const texte = document.createRange();
        texte.selectNodeContents(element);
        return Array.from(texte.getClientRects()).some(chevauche);
      });
      lien.style.visibility = collision ? "hidden" : "visible";
    };
    const planifier = () => { if (!frame) frame = requestAnimationFrame(verifier); };
    const observer = new MutationObserver(planifier);
    for (const zone of document.querySelectorAll("main, footer")) {
      observer.observe(zone, { childList: true, characterData: true, subtree: true });
    }
    window.addEventListener("scroll", planifier, { passive: true });
    window.addEventListener("resize", planifier);
    window.visualViewport?.addEventListener("resize", planifier);
    lien.addEventListener("blur", planifier);
    planifier();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", planifier);
      window.removeEventListener("resize", planifier);
      window.visualViewport?.removeEventListener("resize", planifier);
      lien.removeEventListener("blur", planifier);
    };
  }, []);

  return (
    <a
      ref={lienRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.ariaLabel}
      className="group fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center gap-2.5 rounded-full bg-whatsapp text-white shadow-[0_8px_24px_rgba(18,140,126,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-whatsapp-fonce hover:shadow-[0_12px_28px_rgba(18,140,126,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp-fonce motion-reduce:transition-none motion-reduce:hover:translate-y-0 desk:w-auto desk:pl-5 desk:pr-4"
      style={{
        bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))",
        right: "calc(1.25rem + env(safe-area-inset-right, 0px))",
      }}
    >
      <span aria-hidden="true" className="hidden whitespace-nowrap text-[0.875rem] font-semibold desk:inline">
        {dict.aideLabel}
      </span>
      <span className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
        {IconeWhatsapp}
      </span>
    </a>
  );
}

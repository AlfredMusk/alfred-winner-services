import type { WhatsappDictionary } from "@/i18n/dictionaries";
import { IconeWhatsapp } from "@/components/ui/icones";

/* Bouton flottant, pas une bannière : une icone seule (48px, cible
   tactile conforme), jamais de texte permanent "Discuter sur WhatsApp"
   qui resterait affiche en dur sur le contenu. Le message pre-rempli et
   le aria-label portent l'explication ; le visuel reste discret.

   position: fixed + inset calcule avec les safe-area insets (iOS) deja
   disponibles via le reset global (voir globals.css :root). z-40 : sous
   un eventuel modal/menu mobile (qui doit rester au-dessus), au-dessus
   du contenu de page.

   Server Component pur : un <a> suffit, aucune interaction JS requise
   pour ouvrir wa.me dans un nouvel onglet. */
export default function WhatsappFlottant({ dict }: { dict: WhatsappDictionary }) {
  const href = `${dict.href}?text=${encodeURIComponent(dict.message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.ariaLabel}
      className="group fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-aws-navy text-white shadow-[0_8px_24px_rgba(0,36,84,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-aws-navy-soft hover:shadow-[0_12px_28px_rgba(0,36,84,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aws-navy motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      style={{
        bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))",
        right: "calc(1.25rem + env(safe-area-inset-right, 0px))",
      }}
    >
      <span className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
        {IconeWhatsapp}
      </span>
    </a>
  );
}

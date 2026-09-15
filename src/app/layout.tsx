import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

/* Montserrat : meme famille que la reference ACIM, sous licence
   SIL Open Font License 1.1, donc libre d'usage commercial.
   next/font la telecharge AU BUILD et la sert depuis notre domaine :
   aucune requete vers Google cote visiteur.
   Pas de "weight" precise : Montserrat existe en police variable,
   un seul fichier couvre toutes les graisses. */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

/* Metadonnees provisoires : a valider en phase SEO, rien d'invente ici. */
export const metadata: Metadata = {
  title: "Alfred Winner Services",
  description:
    "Alfred Winner Services — Bourse & Finance, Immobilier, Software & IA. Abidjan, Côte d'Ivoire.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    /* lang="fr" : indispensable pour les lecteurs d'ecran (prononciation)
       et pour les moteurs de recherche. Le template livrait "en". */
    <html
      lang="fr"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main id="top" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}

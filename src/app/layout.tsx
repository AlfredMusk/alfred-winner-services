import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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

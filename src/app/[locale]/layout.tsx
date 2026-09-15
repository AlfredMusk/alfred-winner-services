import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import { getDictionary, hasLocale, locales } from "@/i18n/dictionaries";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

/* Pre-genere /fr et /en au build : ces deux pages deviennent statiques,
   donc servies instantanement, sans calcul serveur a chaque visite. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Alfred Winner Services",
    description:
      locale === "en"
        ? "Alfred Winner Services — Markets & Finance, Real Estate, Software & AI. Abidjan, Côte d'Ivoire."
        : "Alfred Winner Services — Bourse & Finance, Immobilier, Software & IA. Abidjan, Côte d'Ivoire.",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  /* En Next 16, params est une Promise : il faut l'attendre.
     Verifie dans node_modules/next/dist/docs/.../internationalization.md */
  const { locale } = await params;

  /* /de n'existe pas -> vraie page 404, pas une erreur d'execution. */
  if (!hasLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    /* lang suit la langue de l'URL : un lecteur d'ecran change
       reellement de prononciation entre /fr et /en. */
    <html
      lang={locale}
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar locale={locale} dict={dict.navbar} />
        <main id="top" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}

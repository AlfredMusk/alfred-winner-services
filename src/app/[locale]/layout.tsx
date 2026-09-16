import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getDictionary, hasLocale, locales } from "@/i18n/dictionaries";
import { isIndexable, organizationSchema, seoCopy } from "@/lib/seo";

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
  if (!hasLocale(locale)) notFound();
  return {
    ...seoCopy[locale],
    robots: { index: isIndexable, follow: true },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()).replace(/</g, "\\u003c"),
          }}
        />
        <Navbar locale={locale} dict={dict.navbar} />
        <main id="top" className="flex-1">
          {children}
        </main>
        <Footer
          locale={locale}
          dict={dict.footer}
          nav={dict.navbar}
          expertises={dict.expertises}
          contact={dict.contact}
        />
      </body>
    </html>
  );
}

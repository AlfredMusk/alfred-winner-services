import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsappFlottant from "@/components/layout/WhatsappFlottant";
import { getDictionary, hasLocale, locales } from "@/i18n/dictionaries";
import { isIndexable, organizationSchema, seoCopy } from "@/lib/seo";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

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
    icons: { icon: { url: "/images/brand/aws-emblem.png", type: "image/png" } },
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
        <a href="#top" className="sr-only z-[60] rounded-lg bg-white px-4 py-3 text-aws-navy focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:outline-2 focus:outline-aws-blue-text">
          {locale === "fr" ? "Aller au contenu" : "Skip to content"}
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()).replace(/</g, "\\u003c"),
          }}
        />
        <Navbar locale={locale} dict={dict.navbar} />
        <main id="top" tabIndex={-1} className="flex-1 scroll-mt-24">
          {children}
        </main>
        <Footer
          locale={locale}
          dict={dict.footer}
          nav={dict.navbar}
          contact={dict.contact}
          whatsapp={dict.whatsapp}
        />
        <WhatsappFlottant dict={dict.whatsapp} />
      </body>
    </html>
  );
}

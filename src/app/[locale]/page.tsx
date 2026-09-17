import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import Hero from "@/components/sections/Hero";
import Approach from "@/components/sections/Approach";
import Method from "@/components/sections/Method";
import Apropos from "@/components/sections/Apropos";
import Expertises from "@/components/sections/Expertises";
import Projets from "@/components/sections/Projets";
import Vision from "@/components/sections/Vision";
import Fondateur from "@/components/sections/Fondateur";
import CtaFinal from "@/components/sections/CtaFinal";
import Contact from "@/components/sections/Contact";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  return pageMetadata(locale);
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Hero dict={dict.hero} />
      <Approach dict={dict.approche} />
      <Method dict={dict.methode} />
      <Apropos dict={dict.apropos} />
      <Expertises dict={dict.expertises} projets={dict.projets.liste} />
      <Projets dict={dict.projets} />
      <Vision dict={dict.vision} />
      <Fondateur dict={dict.fondateur} />
      <CtaFinal dict={dict.ctaFinal} />
      <Contact dict={dict.contact} />
    </>
  );
}

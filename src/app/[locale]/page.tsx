import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import Hero from "@/components/sections/Hero";
import Approach from "@/components/sections/Approach";
import Method from "@/components/sections/Method";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Hero dict={dict.hero} />
      <Approach dict={dict.approche} />
      <Method dict={dict.methode} />
    </>
  );
}

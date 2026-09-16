import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import LegalPage from "@/components/sections/LegalPage";

export async function generateMetadata({ params }: PageProps<"/[locale]/confidentialite">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return pageMetadata(locale, "/confidentialite", {
    title: `${dict.confidentialite.titre} — Alfred Winner Services`,
    description: dict.confidentialite.sections[0]?.paragraphes[0] ?? "",
  });
}

export default async function Confidentialite({ params }: PageProps<"/[locale]/confidentialite">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return <LegalPage dict={dict.confidentialite} />;
}

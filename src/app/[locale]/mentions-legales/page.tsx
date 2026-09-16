import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import LegalPage from "@/components/sections/LegalPage";

export async function generateMetadata({ params }: PageProps<"/[locale]/mentions-legales">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return pageMetadata(locale, "/mentions-legales", {
    title: `${dict.mentionsLegales.titre} — Alfred Winner Services`,
    description: dict.mentionsLegales.sections[0]?.paragraphes[0] ?? "",
  });
}

export default async function MentionsLegales({ params }: PageProps<"/[locale]/mentions-legales">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return <LegalPage dict={dict.mentionsLegales} />;
}

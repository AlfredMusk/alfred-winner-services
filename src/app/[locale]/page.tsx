import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";

/* ECHAFAUDAGE TEMPORAIRE — CE N'EST PAS LE HERO.
   Donne simplement de la hauteur pour tester la navbar collante.
   Sera entierement remplace a la phase Hero. */
export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
      <div className="flex min-h-[70vh] items-center">
        <p className="max-w-md text-sm leading-relaxed text-aws-ink/45">
          {dict.scaffold}
        </p>
      </div>
      <div className="h-[80vh]" aria-hidden="true" />
    </div>
  );
}

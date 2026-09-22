import type { MetadataRoute } from "next";
import { locales } from "@/i18n/dictionaries";
import { isIndexable, languageAlternates, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexable || !siteUrl) return [];
  // Only implemented, public, indexable routes. Sections are not pages.
  return ["", "/mentions-legales", "/confidentialite"].flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}

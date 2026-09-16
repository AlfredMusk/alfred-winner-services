import type { MetadataRoute } from "next";
import { locales } from "@/i18n/dictionaries";
import { isIndexable, languageAlternates, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexable || !siteUrl) return [];
  // Only implemented, public, indexable routes. Sections are not pages.
  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    alternates: { languages: languageAlternates() },
  }));
}

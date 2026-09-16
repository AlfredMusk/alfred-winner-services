import type { Metadata } from "next";
import type { Locale } from "@/i18n/dictionaries";

// Set only after Alfred confirms that the official HTTPS domain is live.
// No localhost, preview host or unpurchased domain is emitted as a public URL.
const configuredUrl = process.env.AWS_SITE_URL?.trim();
export const siteUrl = configuredUrl
  ? validateSiteUrl(configuredUrl)
  : undefined;

function validateSiteUrl(value: string): string {
  const url = new URL(value);
  if (
    url.protocol !== "https:" ||
    url.hostname !== "www.alfredwinnerservices.com" ||
    url.port || url.username || url.password || url.search || url.hash ||
    url.pathname !== "/"
  ) {
    throw new Error("AWS_SITE_URL must be https://www.alfredwinnerservices.com");
  }
  return url.origin;
}

// NODE_ENV alone is insufficient: preview builds also use production mode.
export const isIndexable = Boolean(
  siteUrl &&
  process.env.NODE_ENV === "production" &&
  process.env.AWS_DEPLOYMENT_ENV === "production" &&
  process.env.AWS_INDEXING_ENABLED === "true" &&
  (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production"),
);

export const business = {
  name: "Alfred Winner Services",
  legalName: "ALFRED WINNER SERVICES",
  telephone: "+2250748191100",
  email: "krodi2001@gmail.com",
  logoPath: "/images/brand/logo.png",
} as const;

export const seoCopy = {
  fr: {
    title: "Alfred Winner Services | Finance, Immobilier, Software & IA",
    description: "Alfred Winner Services, entreprise basée à Abidjan, développe ses activités autour de la finance, de l’immobilier et des technologies Software & IA.",
  },
  en: {
    title: "Alfred Winner Services | Finance, Real Estate, Software & AI",
    description: "Alfred Winner Services is an Abidjan-based company developing its activities across finance, real estate, software and artificial intelligence.",
  },
} as const;

export function languageAlternates(path = "") {
  if (!siteUrl) return undefined;
  return {
    fr: `${siteUrl}/fr${path}`,
    en: `${siteUrl}/en${path}`,
    "x-default": `${siteUrl}/fr${path}`,
  };
}

export function pageMetadata(
  locale: Locale,
  path = "",
  copy: { title: string; description: string } = seoCopy[locale],
): Metadata {
  const url = siteUrl ? `${siteUrl}/${locale}${path}` : undefined;
  return {
    ...copy,
    ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
    robots: { index: isIndexable, follow: true },
    ...(url ? { alternates: { canonical: url, languages: languageAlternates(path) } } : {}),
    openGraph: {
      ...copy,
      type: "website",
      siteName: business.name,
      locale: locale === "fr" ? "fr_CI" : "en_US",
      alternateLocale: locale === "fr" ? "en_US" : "fr_CI",
      ...(url ? { url } : {}),
      ...(siteUrl ? { images: [{ url: `${siteUrl}${business.logoPath}`, width: 1448, height: 1086, alt: business.name }] } : {}),
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: business.name,
    legalName: business.legalName,
    telephone: business.telephone,
    email: business.email,
    ...(siteUrl ? {
      "@id": `${siteUrl}/#organization`,
      url: siteUrl,
      logo: `${siteUrl}${business.logoPath}`,
    } : {}),
    // Exact address, hours, pin, social URLs and LocalBusiness remain pending.
    // Both languages use this same object and, after activation, the same @id.
  };
}

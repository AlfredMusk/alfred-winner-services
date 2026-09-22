import type { Metadata } from "next";
import type { Locale } from "@/i18n/dictionaries";
import { telephoneE164 } from "@/lib/contact";

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
    url.hostname === "localhost" || !url.hostname.includes(".") ||
    url.port || url.username || url.password || url.search || url.hash ||
    url.pathname !== "/"
  ) {
    throw new Error("AWS_SITE_URL must be the confirmed public HTTPS origin, without a path, query or credentials");
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
  telephone: telephoneE164,
  email: "contact@alfredwinnerservices.com",
  logoPath: "/images/brand/logo.png",
  address: {
    streetAddress: "Cocody Angré — Nouveau CHU",
    addressLocality: "Abidjan",
    addressCountry: "CI",
  },
} as const;

export const seoCopy = {
  fr: {
    title: "Alfred Winner Services | Software, IA, Finance & Immobilier",
    description: "Alfred Winner Services, entreprise basée à Abidjan, développe des solutions Software, IA et technologies financières, avec une branche Immobilier & BTP.",
  },
  en: {
    title: "Alfred Winner Services | Software, AI, Finance & Real Estate",
    description: "Alfred Winner Services is an Abidjan-based company developing software, AI and financial technology solutions, with a real estate and construction branch.",
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
    "@type": ["LocalBusiness", "SoftwareCompany"],
    name: business.name,
    legalName: business.legalName,
    telephone: business.telephone,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      ...business.address,
    },
    areaServed: [
      { "@type": "City", name: "Abidjan" },
      { "@type": "Country", name: "Côte d’Ivoire" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: business.telephone,
      email: business.email,
      contactType: "customer support",
      availableLanguage: ["French", "English"],
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "22:00",
    },
    ...(siteUrl ? {
      "@id": `${siteUrl}/#organization`,
      url: siteUrl,
      logo: `${siteUrl}${business.logoPath}`,
    } : {}),
    // The corporate canonical URLs of social profiles are not confirmed, so
    // `sameAs` remains intentionally absent. Both languages emit this same @id.
  };
}

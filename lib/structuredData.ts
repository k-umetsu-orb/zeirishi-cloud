import { SITE_URL } from "@/lib/sitemap";
import type { Office } from "@/lib/data";

export const SITE_NAME = "税理士クラウド";

const LOGO_URL = `${SITE_URL}/favicon-192x192.png`;

function toAbsoluteUrl(pathOrUrl: string): string {
  return pathOrUrl.startsWith("http") ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export interface BreadcrumbSchemaItem {
  name: string;
  url?: string;
}

export function buildBreadcrumbListSchema(items: BreadcrumbSchemaItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: toAbsoluteUrl(item.url) } : {}),
    })),
  };
}

export interface FAQSchemaItem {
  question: string;
  answer: string;
}

export function buildFAQPageSchema(items: FAQSchemaItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** 税理士・会計事務所1件分の AccountingService（LocalBusinessのサブタイプ）構造化データ。 */
export function buildAccountingServiceSchema(office: Office, path: string) {
  const knowsAbout = [...office.industries, ...office.services];

  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: office.name,
    url: toAbsoluteUrl(path),
    ...(office.address
      ? {
          address: {
            "@type": "PostalAddress",
            addressCountry: "JP",
            ...(office.prefectureName ? { addressRegion: office.prefectureName } : {}),
            ...(office.cityName ? { addressLocality: `${office.cityName}${office.wardName ?? ""}` } : {}),
            streetAddress: office.address,
          },
        }
      : {}),
    ...(office.tel ? { telephone: office.tel } : {}),
    ...(office.websiteUrl ? { sameAs: office.websiteUrl } : {}),
    ...(office.prefectureName ? { areaServed: office.prefectureName } : {}),
    ...(knowsAbout.length > 0 ? { knowsAbout } : {}),
    ...(office.establishedYear ? { foundingDate: String(office.establishedYear) } : {}),
    ...(office.staffCount != null ? { numberOfEmployees: office.staffCount } : {}),
  };
}

export interface ItemListSchemaItem {
  name: string;
  url: string;
}

export function buildItemListSchema(items: ItemListSchemaItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: toAbsoluteUrl(item.url),
      name: item.name,
    })),
  };
}

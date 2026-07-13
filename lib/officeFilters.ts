/**
 * Pure office-filtering predicates shared between pages/api/offices.ts,
 * pages/[...slug].tsx (getStaticProps) and middleware.ts, so that all three
 * agree exactly on which offices belong to a given area/category scope.
 */
import type { Office } from "@/lib/data";
import type { CategoryInfo } from "@/lib/categorySlugMap";

export interface AreaScope {
  prefecture?: string;
  city?: string;
  ward?: string;
  station?: string;
}

/** Mirrors the area filter chain in pages/api/offices.ts. */
export function filterOfficesByArea(offices: Office[], scope: AreaScope): Office[] {
  let filtered = offices;
  if (scope.prefecture) filtered = filtered.filter((o) => o.prefecture === scope.prefecture);
  if (scope.city) filtered = filtered.filter((o) => o.city === scope.city);
  if (scope.ward) filtered = filtered.filter((o) => o.ward === scope.ward);
  if (scope.station) filtered = filtered.filter((o) => o.nearestStations.includes(scope.station!));
  return filtered;
}

/**
 * Mirrors the category(+area) filters inlined in pages/[...slug].tsx's getStaticProps.
 * When scope.station is set, area matching is by nearestStations only (no prefecture/city/ward
 * co-check), matching the existing station-scoped prefCategory branches exactly.
 */
export function filterOfficesByCategoryAndArea(
  offices: Office[],
  category: CategoryInfo,
  scope: AreaScope
): Office[] {
  const isIndustry = category.type === "industry";
  return offices.filter((o) => {
    if (scope.station) {
      if (!o.nearestStations.includes(scope.station)) return false;
    } else {
      if (scope.prefecture && o.prefecture !== scope.prefecture) return false;
      if (scope.city && o.city !== scope.city) return false;
      if (scope.ward && o.ward !== scope.ward) return false;
    }
    const field = isIndustry ? o.industries : o.services;
    return category.dbValues.some((v) => field.includes(v));
  });
}

/**
 * 与えられたカテゴリ一覧のうち、指定エリアで事務所が1件以上あるものだけのslugを返す。
 * カテゴリ×エリアの導線リンクを、0件で404化されたページに向けないために使う
 * （pages/[...slug].tsx, pages/sitemap.tsx で共通利用し、判定基準のズレを防ぐ）。
 */
export function getAvailableCategorySlugs(
  offices: Office[],
  categories: CategoryInfo[],
  scope: AreaScope
): string[] {
  return categories.filter((cat) => filterOfficesByCategoryAndArea(offices, cat, scope).length > 0).map((c) => c.slug);
}

/**
 * 単一カテゴリについて、兄弟エリア（市区町村/行政区/駅など）のうち事務所が1件以上あるものだけのslugを返す。
 * PrefCategoryListの「他のエリアで探す」チップを、0件で404化されたページに向けないために使う。
 */
export function getAvailableAreaSlugsForCategory(
  offices: Office[],
  category: CategoryInfo,
  areas: { slug: string }[],
  scopeFor: (slug: string) => AreaScope
): string[] {
  return areas.filter((a) => filterOfficesByCategoryAndArea(offices, category, scopeFor(a.slug)).length > 0).map((a) => a.slug);
}

/**
 * Catch-all SSG route for area-related pages.
 *
 * Handled URL patterns:
 *   /{pref}                                           → OfficeList (prefecture)
 *   /{pref}/{city}                                    → OfficeList (city)
 *   /{pref}/{city}/{ward}                             → OfficeList (ward)
 *   /{pref}/{city}/{station}                          → OfficeList (station, no ward)
 *   /{pref}/{city}/{ward}/{station}                   → OfficeList (ward+station)
 *   /{pref}/{city}/{station}/{officeId}               → OfficeDetail
 *   /{pref}/{city}/{ward}/{station}/{officeId}        → OfficeDetail
 *   /{pref}/{city}/{ward}/{officeId}                  → OfficeDetail (no station)
 *   /{pref}/{city}/{station}/{officeId}/{itvId}       → InterviewDetail
 *   /{pref}/{city}/{ward}/{station}/{officeId}/{itvId}→ InterviewDetail
 *   /{category}                                       → CategoryList
 *   /{pref}/{category}                                → PrefCategoryList
 *   /{pref}/{city}/{category}                         → PrefCategoryList
 *   /{pref}/{city}/{ward}/{category}                  → PrefCategoryList
 *   /{pref}/{city}/{ward}/{station}/{category}        → PrefCategoryList
 *   /{pref}/{articleSlug}                             → ArticlePage (recommendation)
 *   /{pref}/{city}/{articleSlug}                      → ArticlePage (recommendation+city)
 */

import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { PageMeta } from "@/lib/usePageMeta";
import type {
  Prefecture,
  City,
  Ward,
  Station,
  Office,
  Interview,
  Article,
} from "@/lib/data";
import {
  getAllPrefectures,
  getPrefectureBySlug,
  getCitiesByPrefecture,
  getCityBySlug,
  getWardBySlug,
  getStationsForCity,
  getStationBySlug,
  getInterviewById,
  getAllInterviews,
  getAllArticles,
  getArticleBySlug,
  getArticlesForPrefecture,
  buildOfficeUrl,
  buildInterviewUrl,
} from "@/lib/data";
import {
  getAllOffices,
  getOfficeById,
  getOfficesByArea,
} from "@/lib/offices-server";
import { filterOfficesByArea, filterOfficesByCategoryAndArea, getAvailableCategorySlugs, getAvailableAreaSlugsForCategory } from "@/lib/officeFilters";
import { CATEGORIES, getCategoryBySlug, type CategoryInfo } from "@/lib/categorySlugMap";
import { CONTENT_COMING_SOON } from "@/lib/contentVisibility";
import { SITE_URL } from "@/lib/sitemap";
import { useWouterSearch } from "@/lib/useWouterSearch";
import { getPageFromSearch, ITEMS_PER_PAGE } from "@/lib/pagination";
import dynamic from "next/dynamic";
const OfficeList = dynamic(() => import("@/page-components/OfficeList"));
const OfficeDetail = dynamic(() => import("@/page-components/OfficeDetail"));
const InterviewDetail = dynamic(() => import("@/page-components/InterviewDetail"));
const ArticlePage = dynamic(() => import("@/page-components/ArticlePage"));
const CategoryList = dynamic(() => import("@/page-components/CategoryList"));
const PrefCategoryList = dynamic(() => import("@/page-components/PrefCategoryList"));

// ─── Page type discriminant ──────────────────────────────────────────────────

export type PageType =
  | "prefecture"
  | "city"
  | "ward"
  | "station"
  | "office"
  | "interview"
  | "article"
  | "category"
  | "prefCategory";

// ─── Props ───────────────────────────────────────────────────────────────────

type PageMeta = { title: string; description: string; noindex?: boolean; canonical?: string; officeCount?: number };

type AreaListData = {
  cities: City[];
  stations: Station[];
  relatedArticles: Article[];
};

export type SlugPageProps =
  | ({ pageType: "prefecture"; prefecture: Prefecture; availableCategorySlugs: string[] } & AreaListData & PageMeta)
  | ({ pageType: "city"; prefecture: Prefecture; city: City; availableCategorySlugs: string[] } & AreaListData & PageMeta)
  | ({ pageType: "ward"; prefecture: Prefecture; city: City; ward: Ward; availableCategorySlugs: string[] } & AreaListData & PageMeta)
  | ({ pageType: "station"; prefecture: Prefecture; city: City; ward?: Ward; station: Station; availableCategorySlugs: string[] } & AreaListData & PageMeta)
  | ({ pageType: "office"; prefecture: Prefecture; city: City; ward?: Ward; station?: Station; office: Office; sameAreaOffices: Office[] } & PageMeta)
  | ({ pageType: "interview"; prefecture: Prefecture; city: City; ward?: Ward; station?: Station; office: Office; interview: Interview } & PageMeta)
  | ({ pageType: "article"; article: Article; prefecture?: Prefecture; city?: City } & PageMeta)
  | ({ pageType: "category"; category: CategoryInfo; offices: Office[]; availableCategorySlugs: string[] } & PageMeta)
  | ({ pageType: "prefCategory"; prefecture: Prefecture; category: CategoryInfo; city?: City; ward?: Ward; station?: Station; offices: Office[]; availableAreaSlugs: string[] } & AreaListData & PageMeta);

// ─── getStaticPaths ──────────────────────────────────────────────────────────

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { slug: string[] } }[] = [];

  const prefectures = getAllPrefectures();

  for (const pref of prefectures) {
    const prefSlug = pref.slug;

    // ── /{pref} ──
    paths.push({ params: { slug: [prefSlug] } });

    const cities = getCitiesByPrefecture(prefSlug);

    // ── /{pref}/{articleSlug} (recommendation, no city) ──
    if (!CONTENT_COMING_SOON) {
      for (const article of getAllArticles()) {
        if (
          article.category === "recommendation" &&
          article.relatedPrefecture === prefSlug &&
          !article.relatedCity
        ) {
          paths.push({ params: { slug: [prefSlug, article.slug] } });
        }
      }
    }

    for (const city of cities) {
      const citySlug = city.slug;

      // ── /{pref}/{city} ──
      paths.push({ params: { slug: [prefSlug, citySlug] } });

      // ── /{pref}/{city}/{articleSlug} (recommendation with city) ──
      if (!CONTENT_COMING_SOON) {
        for (const article of getAllArticles()) {
          if (
            article.category === "recommendation" &&
            article.relatedPrefecture === prefSlug &&
            article.relatedCity === citySlug
          ) {
            paths.push({ params: { slug: [prefSlug, citySlug, article.slug] } });
          }
        }
      }

      const wards = city.wards ?? [];
      const stations = getStationsForCity(prefSlug, citySlug);

      // ── /{pref}/{city}/{station} (no ward) ──
      for (const st of stations) {
        paths.push({ params: { slug: [prefSlug, citySlug, st.slug] } });
      }

      if (wards.length > 0) {
        for (const ward of wards) {
          const wardSlug = ward.slug;

          // ── /{pref}/{city}/{ward} ──
          paths.push({ params: { slug: [prefSlug, citySlug, wardSlug] } });

          const wardStations = getStationsForCity(prefSlug, citySlug, wardSlug);

          for (const st of wardStations) {
            // ── /{pref}/{city}/{ward}/{station} ──
            paths.push({ params: { slug: [prefSlug, citySlug, wardSlug, st.slug] } });
          }
        }
      }
    }
  }

  // ── Office paths ──
  for (const office of getAllOffices()) {
    const officeUrl = buildOfficeUrl(office);
    const officeSegments = officeUrl.replace(/^\//, "").split("/");
    paths.push({ params: { slug: officeSegments } });
  }

  // ── Interview paths ──
  if (!CONTENT_COMING_SOON) {
    for (const interview of getAllInterviews()) {
      const office = getOfficeById(interview.officeId);
      if (!office) continue;
      const itvUrl = buildInterviewUrl(interview, office);
      const itvSegments = itvUrl.replace(/^\//, "").split("/");
      paths.push({ params: { slug: itvSegments } });
    }
  }

  // カテゴリページ・記事ページは fallback: 'blocking' で初回アクセス時に生成
  return { paths, fallback: "blocking" };
};

// ─── getStaticProps ──────────────────────────────────────────────────────────

export const getStaticProps: GetStaticProps<SlugPageProps> = async ({ params }) => {
  const rawSlug = params?.slug;
  if (!rawSlug || !Array.isArray(rawSlug) || rawSlug.length === 0) {
    return { notFound: true };
  }

  const slug = rawSlug as string[];

  // ── 1 segment ────────────────────────────────────────────────────────────

  if (slug.length === 1) {
    const [seg0] = slug;

    // /{category}
    const cat = getCategoryBySlug(seg0);
    if (cat) {
      const isIndustry = cat.type === "industry";
      const catOffices = filterOfficesByCategoryAndArea(getAllOffices(), cat, {});
      if (catOffices.length === 0) return { notFound: true };
      return {
        props: {
          pageType: "category" as const,
          category: cat,
          offices: catOffices,
          availableCategorySlugs: getAvailableCategorySlugs(getAllOffices(), CATEGORIES, {}),
          title: isIndustry
            ? `${cat.name}業界に強い税理士・会計事務所の検索や相談なら【税理士クラウド】`
            : `${cat.name}に強い税理士・会計事務所の検索や相談なら【税理士クラウド】`,
          description: isIndustry
            ? `${cat.name}業界に強い税理士・会計事務所の一覧です。お困りの方は紹介料無料の税理士紹介サービスをご利用ください。`
            : `${cat.name}に強い税理士・会計事務所の一覧です。お困りの方は紹介料無料の税理士紹介サービスをご利用ください。`,
          officeCount: catOffices.length,
          canonical: `${SITE_URL}/${cat.slug}`,
        },
      };
    }

    // /{pref}
    const pref = getPrefectureBySlug(seg0);
    if (pref) {
      const prefOffices = filterOfficesByArea(getAllOffices(), { prefecture: pref.slug });
      return {
        props: {
          pageType: "prefecture" as const,
          prefecture: pref,
          cities: getCitiesByPrefecture(pref.slug),
          stations: [],
          relatedArticles: getArticlesForPrefecture(pref.slug).slice(0, 4),
          availableCategorySlugs: getAvailableCategorySlugs(getAllOffices(), CATEGORIES, { prefecture: pref.slug }),
          title: `${pref.name}の税理士・会計事務所の検索や相談なら【税理士クラウド】`,
          description: `${pref.name}の税理士・会計事務所の一覧です。得意な業種や業務内容から税理士・会計事務所を探すことができます。無料の紹介サービスもご利用ください。`,
          noindex: prefOffices.length === 0,
          officeCount: prefOffices.length,
          canonical: `${SITE_URL}/${pref.slug}`,
        },
      };
    }

    return { notFound: true };
  }

  // ── 2 segments ───────────────────────────────────────────────────────────

  if (slug.length === 2) {
    const [seg0, seg1] = slug;

    const pref = getPrefectureBySlug(seg0);
    if (!pref) return { notFound: true };

    // /{pref}/{category}
    const cat = getCategoryBySlug(seg1);
    if (cat) {
      const isIndustry = cat.type === "industry";
      const categoryLabel = isIndustry ? `${cat.name}業界` : cat.name;
      const prefCatOffices = filterOfficesByCategoryAndArea(getAllOffices(), cat, { prefecture: pref.slug });
      if (prefCatOffices.length === 0) return { notFound: true };
      return {
        props: {
          pageType: "prefCategory" as const,
          prefecture: pref,
          category: cat,
          offices: prefCatOffices,
          cities: getCitiesByPrefecture(pref.slug),
          stations: [],
          availableAreaSlugs: getAvailableAreaSlugsForCategory(
            getAllOffices(),
            cat,
            getCitiesByPrefecture(pref.slug),
            (slug) => ({ prefecture: pref.slug, city: slug })
          ),
          relatedArticles: getArticlesForPrefecture(pref.slug).slice(0, 4),
          title: `${pref.name}で${categoryLabel}に強い税理士・会計事務所の検索や相談なら【税理士クラウド】`,
          description: `${pref.name}で${categoryLabel}に強い税理士・会計事務所の一覧です。お困りの方は紹介料無料の税理士紹介サービスをご利用ください。`,
          officeCount: prefCatOffices.length,
          canonical: `${SITE_URL}/${pref.slug}/${cat.slug}`,
        },
      };
    }

    // /{pref}/{city}
    const city = getCityBySlug(seg0, seg1);
    if (city) {
      const cityOffices = filterOfficesByArea(getAllOffices(), { prefecture: pref.slug, city: city.slug });
      return {
        props: {
          pageType: "city" as const,
          prefecture: pref,
          city,
          cities: getCitiesByPrefecture(pref.slug),
          stations: getStationsForCity(pref.slug, city.slug),
          relatedArticles: getArticlesForPrefecture(pref.slug).slice(0, 4),
          availableCategorySlugs: getAvailableCategorySlugs(getAllOffices(), CATEGORIES, { prefecture: pref.slug, city: city.slug }),
          title: `${pref.name}${city.name}の税理士・会計事務所の検索や相談なら【税理士クラウド】`,
          description: `${pref.name}${city.name}の税理士・会計事務所の一覧です。得意な業種や業務内容から税理士・会計事務所を探すことができます。無料の紹介サービスもご利用ください。`,
          noindex: cityOffices.length === 0,
          officeCount: cityOffices.length,
          canonical: `${SITE_URL}/${pref.slug}/${city.slug}`,
        },
      };
    }

    // /{pref}/{articleSlug}
    const article = getArticleBySlug(seg1);
    if (!CONTENT_COMING_SOON && article && article.relatedPrefecture === pref.slug && !article.relatedCity) {
      return {
        props: {
          pageType: "article" as const,
          article,
          prefecture: pref,
          title: `${article.title} | 税理士クラウド`,
          description: article.excerpt,
        },
      };
    }

    return { notFound: true };
  }

  // ── 3 segments ───────────────────────────────────────────────────────────

  if (slug.length === 3) {
    const [seg0, seg1, seg2] = slug;

    const pref = getPrefectureBySlug(seg0);
    if (!pref) return { notFound: true };

    const city = getCityBySlug(seg0, seg1);
    if (!city) return { notFound: true };

    // /{pref}/{city}/{category}
    const cat = getCategoryBySlug(seg2);
    if (cat) {
      const isIndustry = cat.type === "industry";
      const categoryLabel = isIndustry ? `${cat.name}業界` : cat.name;
      const cityCatOffices = filterOfficesByCategoryAndArea(getAllOffices(), cat, { prefecture: pref.slug, city: city.slug });
      if (cityCatOffices.length === 0) return { notFound: true };
      return {
        props: {
          pageType: "prefCategory" as const,
          prefecture: pref,
          category: cat,
          city,
          offices: cityCatOffices,
          cities: getCitiesByPrefecture(pref.slug),
          stations: getStationsForCity(pref.slug, city.slug),
          availableAreaSlugs: [
            ...getAvailableAreaSlugsForCategory(
              getAllOffices(),
              cat,
              city.wards ?? [],
              (slug) => ({ prefecture: pref.slug, city: city.slug, ward: slug })
            ),
            ...getAvailableAreaSlugsForCategory(
              getAllOffices(),
              cat,
              getStationsForCity(pref.slug, city.slug),
              (slug) => ({ station: slug })
            ),
          ],
          relatedArticles: getArticlesForPrefecture(pref.slug).slice(0, 4),
          title: `${pref.name}${city.name}で${categoryLabel}に強い税理士・会計事務所の検索や相談なら【税理士クラウド】`,
          description: `${pref.name}${city.name}で${categoryLabel}に強い税理士・会計事務所の一覧です。お困りの方は紹介料無料の税理士紹介サービスをご利用ください。`,
          officeCount: cityCatOffices.length,
          canonical: `${SITE_URL}/${pref.slug}/${city.slug}/${cat.slug}`,
        },
      };
    }

    // /{pref}/{city}/{ward}
    const ward = getWardBySlug(seg0, seg1, seg2);
    if (ward) {
      const wardOffices = filterOfficesByArea(getAllOffices(), { prefecture: pref.slug, city: city.slug, ward: ward.slug });
      return {
        props: {
          pageType: "ward" as const,
          prefecture: pref,
          city,
          ward,
          cities: getCitiesByPrefecture(pref.slug),
          stations: getStationsForCity(pref.slug, city.slug, ward.slug),
          relatedArticles: getArticlesForPrefecture(pref.slug).slice(0, 4),
          availableCategorySlugs: getAvailableCategorySlugs(getAllOffices(), CATEGORIES, { prefecture: pref.slug, city: city.slug, ward: ward.slug }),
          title: `${city.name}${ward.name}の税理士・会計事務所の検索や相談なら【税理士クラウド】`,
          description: `${city.name}${ward.name}の税理士・会計事務所の一覧です。得意な業種や業務内容から税理士・会計事務所を探すことができます。無料の紹介サービスもご利用ください。`,
          noindex: wardOffices.length === 0,
          officeCount: wardOffices.length,
          canonical: `${SITE_URL}/${pref.slug}/${city.slug}/${ward.slug}`,
        },
      };
    }

    // /{pref}/{city}/{station}
    const station = getStationBySlug(seg0, seg1, seg2);
    if (station) {
      const stationOffices = filterOfficesByArea(getAllOffices(), { prefecture: pref.slug, city: city.slug, station: station.slug });
      return {
        props: {
          pageType: "station" as const,
          prefecture: pref,
          city,
          station,
          cities: getCitiesByPrefecture(pref.slug),
          stations: getStationsForCity(pref.slug, city.slug),
          relatedArticles: getArticlesForPrefecture(pref.slug).slice(0, 4),
          availableCategorySlugs: getAvailableCategorySlugs(getAllOffices(), CATEGORIES, { prefecture: pref.slug, city: city.slug, station: station.slug }),
          title: `${station.name}(${pref.name})の税理士・会計事務所の検索や相談なら【税理士クラウド】`,
          description: `${station.name}の税理士・会計事務所の一覧です。得意な業種や業務内容から税理士・会計事務所を探すことができます。無料の紹介サービスもご利用ください。`,
          noindex: stationOffices.length === 0,
          officeCount: stationOffices.length,
          canonical: `${SITE_URL}/${pref.slug}/${city.slug}/${station.slug}`,
        },
      };
    }

    // /{pref}/{city}/{articleSlug}
    const article = getArticleBySlug(seg2);
    if (
      !CONTENT_COMING_SOON &&
      article &&
      article.relatedPrefecture === pref.slug &&
      article.relatedCity === city.slug
    ) {
      return {
        props: {
          pageType: "article" as const,
          article,
          prefecture: pref,
          city,
          title: `${article.title} | 税理士クラウド`,
          description: article.excerpt,
        },
      };
    }

    return { notFound: true };
  }

  // ── 4 segments ───────────────────────────────────────────────────────────

  if (slug.length === 4) {
    const [seg0, seg1, seg2, seg3] = slug;

    const pref = getPrefectureBySlug(seg0);
    if (!pref) return { notFound: true };

    const city = getCityBySlug(seg0, seg1);
    if (!city) return { notFound: true };

    // Try ward path first
    const ward = getWardBySlug(seg0, seg1, seg2);
    if (ward) {
      // /{pref}/{city}/{ward}/{category}
      const cat = getCategoryBySlug(seg3);
      if (cat) {
        const isIndustry = cat.type === "industry";
        const categoryLabel = isIndustry ? `${cat.name}業界` : cat.name;
        const wardCatOffices = filterOfficesByCategoryAndArea(getAllOffices(), cat, { prefecture: pref.slug, city: city.slug, ward: ward.slug });
        if (wardCatOffices.length === 0) return { notFound: true };
        return {
          props: {
            pageType: "prefCategory" as const,
            prefecture: pref,
            category: cat,
            city,
            ward,
            offices: wardCatOffices,
            cities: getCitiesByPrefecture(pref.slug),
            stations: getStationsForCity(pref.slug, city.slug, ward.slug),
            availableAreaSlugs: getAvailableAreaSlugsForCategory(
              getAllOffices(),
              cat,
              getStationsForCity(pref.slug, city.slug, ward.slug),
              (slug) => ({ station: slug })
            ),
            relatedArticles: getArticlesForPrefecture(pref.slug).slice(0, 4),
            title: `${city.name}${ward.name}で${categoryLabel}に強い税理士・会計事務所の検索や相談なら【税理士クラウド】`,
            description: `${city.name}${ward.name}で${categoryLabel}に強い税理士・会計事務所の一覧です。お困りの方は紹介料無料の税理士紹介サービスをご利用ください。`,
            officeCount: wardCatOffices.length,
            canonical: `${SITE_URL}/${pref.slug}/${city.slug}/${ward.slug}/${cat.slug}`,
          },
        };
      }

      // /{pref}/{city}/{ward}/{station}
      const wStation = getStationBySlug(seg0, seg1, seg3, seg2);
      if (wStation) {
        const wardStationOffices = filterOfficesByArea(getAllOffices(), { prefecture: pref.slug, city: city.slug, ward: ward.slug, station: wStation.slug });
        return {
          props: {
            pageType: "station" as const,
            prefecture: pref,
            city,
            ward,
            station: wStation,
            cities: getCitiesByPrefecture(pref.slug),
            stations: getStationsForCity(pref.slug, city.slug, ward.slug),
            relatedArticles: getArticlesForPrefecture(pref.slug).slice(0, 4),
            availableCategorySlugs: getAvailableCategorySlugs(getAllOffices(), CATEGORIES, { prefecture: pref.slug, city: city.slug, ward: ward.slug, station: wStation.slug }),
            title: `${wStation.name}(${pref.name})の税理士・会計事務所の検索や相談なら【税理士クラウド】`,
            description: `${wStation.name}の税理士・会計事務所の一覧です。得意な業種や業務内容から税理士・会計事務所を探すことができます。無料の紹介サービスもご利用ください。`,
            noindex: wardStationOffices.length === 0,
            officeCount: wardStationOffices.length,
            canonical: `${SITE_URL}/${pref.slug}/${city.slug}/${ward.slug}/${wStation.slug}`,
          },
        };
      }

      // /{pref}/{city}/{ward}/{officeId}
      const officeByWard = getOfficeById(seg3);
      if (officeByWard) {
        return {
          props: {
            pageType: "office" as const,
            prefecture: pref,
            city,
            ward,
            office: officeByWard,
            sameAreaOffices: getOfficesByArea(pref.slug, city.slug, ward.slug).filter(o => o.id !== officeByWard.id).slice(0, 6),
            title: `${officeByWard.name} | 税理士クラウド`,
            description: `${officeByWard.name}は${pref.name}${city.name}の税理士・会計事務所です。${officeByWard.name}の得意な業種や業務内容をご覧いただけます。`,
          },
        };
      }

      return { notFound: true };
    }

    // No ward — try station path: /{pref}/{city}/{station}/{officeId}
    const station = getStationBySlug(seg0, seg1, seg2);
    if (station) {
      // /{pref}/{city}/{station}/{category}
      const cat = getCategoryBySlug(seg3);
      if (cat) {
        const isIndustry = cat.type === "industry";
        const categoryLabel = isIndustry ? `${cat.name}業界` : cat.name;
        const stationCatOffices = filterOfficesByCategoryAndArea(getAllOffices(), cat, { station: station.slug });
        if (stationCatOffices.length === 0) return { notFound: true };
        return {
          props: {
            pageType: "prefCategory" as const,
            prefecture: pref,
            category: cat,
            city,
            station,
            offices: stationCatOffices,
            cities: getCitiesByPrefecture(pref.slug),
            stations: getStationsForCity(pref.slug, city.slug),
            availableAreaSlugs: getAvailableAreaSlugsForCategory(
              getAllOffices(),
              cat,
              getStationsForCity(pref.slug, city.slug),
              (slug) => ({ station: slug })
            ),
            relatedArticles: getArticlesForPrefecture(pref.slug).slice(0, 4),
            title: `${station.name}(${pref.name})で${categoryLabel}に強い税理士・会計事務所の検索や相談なら【税理士クラウド】`,
            description: `${station.name}で${categoryLabel}に強い税理士・会計事務所の一覧です。お困りの方は紹介料無料の税理士紹介サービスをご利用ください。`,
            officeCount: stationCatOffices.length,
            canonical: `${SITE_URL}/${pref.slug}/${city.slug}/${station.slug}/${cat.slug}`,
          },
        };
      }

      // /{pref}/{city}/{station}/{officeId}
      const officeByStation = getOfficeById(seg3);
      if (officeByStation) {
        return {
          props: {
            pageType: "office" as const,
            prefecture: pref,
            city,
            station,
            office: officeByStation,
            sameAreaOffices: getOfficesByArea(pref.slug, city.slug).filter(o => o.id !== officeByStation.id).slice(0, 6),
            title: `${officeByStation.name} | 税理士クラウド`,
            description: `${officeByStation.name}は${pref.name}${city.name}の税理士・会計事務所です。${officeByStation.name}の得意な業種や業務内容をご覧いただけます。`,
          },
        };
      }
    }

    return { notFound: true };
  }

  // ── 5 segments ───────────────────────────────────────────────────────────

  if (slug.length === 5) {
    const [seg0, seg1, seg2, seg3, seg4] = slug;

    const pref = getPrefectureBySlug(seg0);
    if (!pref) return { notFound: true };

    const city = getCityBySlug(seg0, seg1);
    if (!city) return { notFound: true };

    // Try ward → station → officeId
    const ward = getWardBySlug(seg0, seg1, seg2);
    if (ward) {
      const wStation = getStationBySlug(seg0, seg1, seg3, seg2);
      if (wStation) {
        // /{pref}/{city}/{ward}/{station}/{category}
        const cat = getCategoryBySlug(seg4);
        if (cat) {
          const isIndustry = cat.type === "industry";
          const categoryLabel = isIndustry ? `${cat.name}業界` : cat.name;
          const wardStationCatOffices = filterOfficesByCategoryAndArea(getAllOffices(), cat, { station: wStation.slug });
          if (wardStationCatOffices.length === 0) return { notFound: true };
          return {
            props: {
              pageType: "prefCategory" as const,
              prefecture: pref,
              category: cat,
              city,
              ward,
              station: wStation,
              offices: wardStationCatOffices,
              cities: getCitiesByPrefecture(pref.slug),
              stations: getStationsForCity(pref.slug, city.slug, ward.slug),
              availableAreaSlugs: getAvailableAreaSlugsForCategory(
                getAllOffices(),
                cat,
                getStationsForCity(pref.slug, city.slug, ward.slug),
                (slug) => ({ station: slug })
              ),
              relatedArticles: getArticlesForPrefecture(pref.slug).slice(0, 4),
              title: `${wStation.name}(${pref.name})で${categoryLabel}に強い税理士・会計事務所の検索や相談なら【税理士クラウド】`,
              description: `${wStation.name}で${categoryLabel}に強い税理士・会計事務所の一覧です。お困りの方は紹介料無料の税理士紹介サービスをご利用ください。`,
              officeCount: wardStationCatOffices.length,
              canonical: `${SITE_URL}/${pref.slug}/${city.slug}/${ward.slug}/${wStation.slug}/${cat.slug}`,
            },
          };
        }

        // /{pref}/{city}/{ward}/{station}/{officeId}
        const office = getOfficeById(seg4);
        if (office) {
          return {
            props: {
              pageType: "office" as const,
              prefecture: pref,
              city,
              ward,
              station: wStation,
              office,
              sameAreaOffices: getOfficesByArea(pref.slug, city.slug, ward.slug).filter(o => o.id !== office.id).slice(0, 6),
              title: `${office.name} | 税理士クラウド`,
              description: `${office.name}は${pref.name}${city.name}の税理士・会計事務所です。${office.name}の得意な業種や業務内容をご覧いただけます。`,
            },
          };
        }
      }
      return { notFound: true };
    }

    // Try station → officeId → interviewId
    const station = getStationBySlug(seg0, seg1, seg2);
    if (station) {
      const office = getOfficeById(seg3);
      if (office) {
        // /{pref}/{city}/{station}/{officeId}/{interviewId}
        const interview = getInterviewById(seg4);
        if (!CONTENT_COMING_SOON && interview && interview.officeId === office.id) {
          return {
            props: {
              pageType: "interview" as const,
              prefecture: pref,
              city,
              station,
              office,
              interview,
              title: `${interview.title} | 税理士クラウド`,
              description: interview.excerpt,
            },
          };
        }
      }
    }

    return { notFound: true };
  }

  // ── 6 segments ───────────────────────────────────────────────────────────

  if (slug.length === 6) {
    const [seg0, seg1, seg2, seg3, seg4, seg5] = slug;

    const pref = getPrefectureBySlug(seg0);
    if (!pref) return { notFound: true };

    const city = getCityBySlug(seg0, seg1);
    if (!city) return { notFound: true };

    const ward = getWardBySlug(seg0, seg1, seg2);
    if (!ward) return { notFound: true };

    const wStation = getStationBySlug(seg0, seg1, seg3, seg2);
    if (!wStation) return { notFound: true };

    const office = getOfficeById(seg4);
    if (!office) return { notFound: true };

    // /{pref}/{city}/{ward}/{station}/{officeId}/{interviewId}
    const interview = getInterviewById(seg5);
    if (!CONTENT_COMING_SOON && interview && interview.officeId === office.id) {
      return {
        props: {
          pageType: "interview" as const,
          prefecture: pref,
          city,
          ward,
          station: wStation,
          office,
          interview,
          title: `${interview.title} | 税理士クラウド`,
          description: interview.excerpt,
        },
      };
    }

    return { notFound: true };
  }

  return { notFound: true };
};

// ─── Page component ──────────────────────────────────────────────────────────

export default function SlugPage(props: SlugPageProps) {
  const search = useWouterSearch();

  // List-type pages (prefecture/city/ward/station/category/prefCategory) carry
  // officeCount, letting us fold pagination/filter query params into the same
  // noindex+canonical decision the server already made from the office count —
  // without needing any client-side DOM patch that would fight this <Head>.
  let noindex = props.noindex;
  let canonical = props.canonical;
  if (props.officeCount !== undefined) {
    const currentPage = getPageFromSearch(search);
    const params = new URLSearchParams(search);
    const isFiltered = params.has("industry") || params.has("service");
    const totalPages = Math.max(1, Math.ceil(props.officeCount / ITEMS_PER_PAGE));

    if (isFiltered || currentPage > totalPages) {
      noindex = true;
      canonical = undefined;
    } else if (currentPage > 1 && canonical) {
      canonical = `${canonical}?page=${currentPage}`;
    }
  }

  const meta = (
    <PageMeta
      title={props.title}
      description={props.description}
      noindex={noindex}
      canonical={canonical}
    />
  );

  switch (props.pageType) {
    case "prefecture":
      return <>{meta}<OfficeList prefecture={props.prefecture} cities={props.cities} stations={props.stations} relatedArticles={props.relatedArticles} availableCategorySlugs={props.availableCategorySlugs} /></>;

    case "city":
      return <>{meta}<OfficeList prefecture={props.prefecture} city={props.city} cities={props.cities} stations={props.stations} relatedArticles={props.relatedArticles} availableCategorySlugs={props.availableCategorySlugs} /></>;

    case "ward":
      return (
        <>{meta}<OfficeList
          prefecture={props.prefecture}
          city={props.city}
          ward={props.ward}
          cities={props.cities}
          stations={props.stations}
          relatedArticles={props.relatedArticles}
          availableCategorySlugs={props.availableCategorySlugs}
        /></>
      );

    case "station":
      return (
        <>{meta}<OfficeList
          prefecture={props.prefecture}
          city={props.city}
          ward={props.ward}
          station={props.station}
          cities={props.cities}
          stations={props.stations}
          relatedArticles={props.relatedArticles}
          availableCategorySlugs={props.availableCategorySlugs}
        /></>
      );

    case "office":
      return (
        <>{meta}<OfficeDetail
          prefecture={props.prefecture}
          city={props.city}
          ward={props.ward}
          station={props.station}
          office={props.office}
          sameAreaOffices={props.sameAreaOffices}
        /></>
      );

    case "interview":
      return (
        <>{meta}<InterviewDetail
          prefecture={props.prefecture}
          city={props.city}
          ward={props.ward}
          station={props.station}
          office={props.office}
          interview={props.interview}
        /></>
      );

    case "article":
      return (
        <>{meta}<ArticlePage
          article={props.article}
          prefecture={props.prefecture}
          city={props.city}
        /></>
      );

    case "category":
      return <>{meta}<CategoryList category={props.category} offices={props.offices} availableCategorySlugs={props.availableCategorySlugs} /></>;

    case "prefCategory":
      return (
        <>{meta}<PrefCategoryList
          prefecture={props.prefecture}
          category={props.category}
          city={props.city}
          ward={props.ward}
          station={props.station}
          offices={props.offices}
          cities={props.cities}
          stations={props.stations}
          relatedArticles={props.relatedArticles}
          availableAreaSlugs={props.availableAreaSlugs}
        /></>
      );

    default: {
      const _exhaustive: never = props;
      return null;
    }
  }
}

/**
 * Resolves a [...slug] path into the page type pages/[...slug].tsx's
 * getStaticProps would produce, mirroring its exact disambiguation order.
 *
 * - "area" / "category" / "prefCategory" → listing pages (paginated).
 * - "office" / "interview" / "article" → detail pages with no pagination at all.
 * - null → not recognized by [...slug].tsx (either some other explicit page
 *   route like /search, or a genuinely invalid path) — callers should leave
 *   these untouched.
 */
import {
  getPrefectureBySlug,
  getCityBySlug,
  getWardBySlug,
  getStationBySlug,
  getArticleBySlug,
  getInterviewById,
  type Prefecture,
  type City,
  type Ward,
  type Station,
} from "@/lib/data";
import { getCategoryBySlug, type CategoryInfo } from "@/lib/categorySlugMap";
import { getOfficeById } from "@/lib/offices-server";

export type SlugRoute =
  | { kind: "area"; prefecture: Prefecture; city?: City; ward?: Ward; station?: Station }
  | { kind: "category"; category: CategoryInfo }
  | { kind: "prefCategory"; category: CategoryInfo; prefecture: Prefecture; city?: City; ward?: Ward; station?: Station }
  | { kind: "office" }
  | { kind: "interview" }
  | { kind: "article" };

export function resolveSlugRoute(slug: string[]): SlugRoute | null {
  if (slug.length === 1) {
    const [seg0] = slug;
    const cat = getCategoryBySlug(seg0);
    if (cat) return { kind: "category", category: cat };
    const pref = getPrefectureBySlug(seg0);
    if (pref) return { kind: "area", prefecture: pref };
    return null;
  }

  if (slug.length === 2) {
    const [seg0, seg1] = slug;
    const pref = getPrefectureBySlug(seg0);
    if (!pref) return null;
    const cat = getCategoryBySlug(seg1);
    if (cat) return { kind: "prefCategory", category: cat, prefecture: pref };
    const city = getCityBySlug(seg0, seg1);
    if (city) return { kind: "area", prefecture: pref, city };
    const article = getArticleBySlug(seg1);
    if (article && article.relatedPrefecture === pref.slug && !article.relatedCity) {
      return { kind: "article" };
    }
    return null;
  }

  if (slug.length === 3) {
    const [seg0, seg1, seg2] = slug;
    const pref = getPrefectureBySlug(seg0);
    if (!pref) return null;
    const city = getCityBySlug(seg0, seg1);
    if (!city) return null;
    const cat = getCategoryBySlug(seg2);
    if (cat) return { kind: "prefCategory", category: cat, prefecture: pref, city };
    const ward = getWardBySlug(seg0, seg1, seg2);
    if (ward) return { kind: "area", prefecture: pref, city, ward };
    const station = getStationBySlug(seg0, seg1, seg2);
    if (station) return { kind: "area", prefecture: pref, city, station };
    const article = getArticleBySlug(seg2);
    if (article && article.relatedPrefecture === pref.slug && article.relatedCity === city.slug) {
      return { kind: "article" };
    }
    return null;
  }

  if (slug.length === 4) {
    const [seg0, seg1, seg2, seg3] = slug;
    const pref = getPrefectureBySlug(seg0);
    if (!pref) return null;
    const city = getCityBySlug(seg0, seg1);
    if (!city) return null;

    const ward = getWardBySlug(seg0, seg1, seg2);
    if (ward) {
      const cat = getCategoryBySlug(seg3);
      if (cat) return { kind: "prefCategory", category: cat, prefecture: pref, city, ward };
      const wStation = getStationBySlug(seg0, seg1, seg3, seg2);
      if (wStation) return { kind: "area", prefecture: pref, city, ward, station: wStation };
      if (getOfficeById(seg3)) return { kind: "office" };
      return null;
    }

    const station = getStationBySlug(seg0, seg1, seg2);
    if (station) {
      const cat = getCategoryBySlug(seg3);
      if (cat) return { kind: "prefCategory", category: cat, prefecture: pref, city, station };
      if (getOfficeById(seg3)) return { kind: "office" };
      return null;
    }

    return null;
  }

  if (slug.length === 5) {
    const [seg0, seg1, seg2, seg3, seg4] = slug;
    const pref = getPrefectureBySlug(seg0);
    if (!pref) return null;
    const city = getCityBySlug(seg0, seg1);
    if (!city) return null;

    const ward = getWardBySlug(seg0, seg1, seg2);
    if (ward) {
      const wStation = getStationBySlug(seg0, seg1, seg3, seg2);
      if (wStation) {
        const cat = getCategoryBySlug(seg4);
        if (cat) return { kind: "prefCategory", category: cat, prefecture: pref, city, ward, station: wStation };
        const office = getOfficeById(seg4);
        if (office) return { kind: "office" };
      }
      return null;
    }

    const station = getStationBySlug(seg0, seg1, seg2);
    if (station) {
      const office = getOfficeById(seg3);
      if (office) {
        const interview = getInterviewById(seg4);
        if (interview && interview.officeId === office.id) return { kind: "interview" };
      }
    }

    return null;
  }

  if (slug.length === 6) {
    const [seg0, seg1, seg2, seg3, seg4, seg5] = slug;
    const pref = getPrefectureBySlug(seg0);
    if (!pref) return null;
    const city = getCityBySlug(seg0, seg1);
    if (!city) return null;
    const ward = getWardBySlug(seg0, seg1, seg2);
    if (!ward) return null;
    const wStation = getStationBySlug(seg0, seg1, seg3, seg2);
    if (!wStation) return null;
    const office = getOfficeById(seg4);
    if (!office) return null;
    const interview = getInterviewById(seg5);
    if (interview && interview.officeId === office.id) return { kind: "interview" };
    return null;
  }

  return null;
}

/**
 * Data access layer – areas, articles, interviews.
 * Office data is in lib/offices-server.ts (server-only, not bundled into client).
 */
import areasData from "../data/areas.json";
import articlesData from "../data/articles.json";
import interviewsData from "../data/interviews.json";

// ===== Types =====
export interface Prefecture {
  name: string;
  slug: string;
  region: string;
}

export interface Ward {
  name: string;
  slug: string;
}

export interface City {
  name: string;
  slug: string;
  wards?: Ward[];
}

export interface Station {
  name: string;
  slug: string;
}

export interface Region {
  name: string;
  prefectures: string[];
}

export interface Office {
  id: string;
  name: string;
  type: string;
  prefecture: string;
  prefectureName: string;
  city: string;
  cityName: string;
  ward: string | null;
  wardName: string | null;
  address: string;
  nearestStations: string[];
  nearestStationNames: string[];
  industries: string[];
  services: string[];
  staffCount: number;
  qualifiedStaff: string;
  capital: string | null;
  tel: string | null;
  fax: string | null;
  establishedYear: number;
  websiteUrl: string;
  groupCompany: string | null;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: "guide" | "column" | "recommendation";
  excerpt: string;
  content: string;
  author: string;
  supervisor: string;
  publishedAt: string;
  relatedPrefecture: string | null;
  relatedCity: string | null;
}

export interface Interview {
  id: string;
  officeId: string;
  officeName: string;
  title: string;
  excerpt: string;
  content: string;
  interviewer: string;
  interviewee: string;
  date: string;
  prefecture: string;
  city: string;
  ward: string | null;
  station: string | null;
}

// ===== Data accessors =====
const areas = areasData as {
  prefectures: Prefecture[];
  cities: Record<string, City[]>;
  stations: Record<string, Record<string, Station[] | Record<string, Station[]>>>;
  regions: Region[];
};

const articles = articlesData as Article[];
const interviews = interviewsData as Interview[];

// ===== Prefecture =====
export function getAllPrefectures(): Prefecture[] {
  return areas.prefectures;
}

export function getPrefectureBySlug(slug: string): Prefecture | undefined {
  return areas.prefectures.find((p) => p.slug === slug);
}

export function getRegions(): Region[] {
  return areas.regions;
}

export function getPrefecturesByRegion(regionName: string): Prefecture[] {
  const region = areas.regions.find((r) => r.name === regionName);
  if (!region) return [];
  return areas.prefectures.filter((p) => region.prefectures.includes(p.slug));
}

// ===== City =====
export function getCitiesByPrefecture(prefSlug: string): City[] {
  return areas.cities[prefSlug] || [];
}

export function getCityBySlug(prefSlug: string, citySlug: string): City | undefined {
  const cities = getCitiesByPrefecture(prefSlug);
  return cities.find((c) => c.slug === citySlug);
}

// ===== Ward =====
export function getWardBySlug(prefSlug: string, citySlug: string, wardSlug: string): Ward | undefined {
  const city = getCityBySlug(prefSlug, citySlug);
  if (!city?.wards) return undefined;
  return city.wards.find((w) => w.slug === wardSlug);
}

// ===== Station =====
export function getStationsForCity(prefSlug: string, citySlug: string, wardSlug?: string): Station[] {
  const prefStations = areas.stations[prefSlug];
  if (!prefStations) return [];
  const cityStations = prefStations[citySlug];
  if (!cityStations) return [];

  if (Array.isArray(cityStations)) {
    return cityStations as Station[];
  }

  // cityStations is Record<string, Station[]> (ward-based)
  if (wardSlug) {
    return (cityStations as Record<string, Station[]>)[wardSlug] || [];
  }

  // Return all stations for all wards
  const all: Station[] = [];
  for (const ws of Object.values(cityStations as Record<string, Station[]>)) {
    all.push(...ws);
  }
  return all;
}

export function getStationBySlug(prefSlug: string, citySlug: string, stationSlug: string, wardSlug?: string): Station | undefined {
  const stations = getStationsForCity(prefSlug, citySlug, wardSlug);
  return stations.find((s) => s.slug === stationSlug);
}

export function findStationAnywhere(stationSlug: string): { station: Station; prefSlug: string; citySlug: string; wardSlug?: string } | undefined {
  for (const prefSlug of Object.keys(areas.stations)) {
    const prefStations = areas.stations[prefSlug];
    for (const citySlug of Object.keys(prefStations)) {
      const cityStations = prefStations[citySlug];
      if (Array.isArray(cityStations)) {
        const found = (cityStations as Station[]).find((s) => s.slug === stationSlug);
        if (found) return { station: found, prefSlug, citySlug };
      } else {
        for (const wardSlug of Object.keys(cityStations as Record<string, Station[]>)) {
          const wardStations = (cityStations as Record<string, Station[]>)[wardSlug];
          const found = wardStations.find((s) => s.slug === stationSlug);
          if (found) return { station: found, prefSlug, citySlug, wardSlug };
        }
      }
    }
  }
  return undefined;
}

// ===== Article =====
export function getAllArticles(): Article[] {
  return articles;
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter((a) => a.category === category);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRecommendationArticles(): Article[] {
  return articles.filter((a) => a.category === "recommendation");
}

export function getArticlesForPrefecture(prefSlug: string): Article[] {
  return articles.filter((a) => a.relatedPrefecture === prefSlug);
}

// ===== Interview =====
export function getAllInterviews(): Interview[] {
  return interviews;
}

export function getInterviewById(id: string): Interview | undefined {
  return interviews.find((i) => i.id === id);
}

export function getInterviewsByOffice(officeId: string): Interview[] {
  return interviews.filter((i) => i.officeId === officeId);
}

// ===== URL builders =====
export function buildSearchUrl(prefSlug: string, citySlug?: string, wardSlug?: string, stationSlug?: string): string {
  let url = `/${prefSlug}`;
  if (citySlug) url += `/${citySlug}`;
  if (wardSlug) url += `/${wardSlug}`;
  if (stationSlug) url += `/${stationSlug}`;
  return url;
}

export function buildOfficeUrl(office: Office, stationSlug?: string): string {
  let url = `/${office.prefecture}/${office.city}`;
  if (office.ward) url += `/${office.ward}`;
  // stationSlug が明示された場合はそのまま使用。
  // そうでない場合は nearestStations を順番に検索し、areas.json に実在する最初の駅を使う。
  const st = stationSlug ?? office.nearestStations.find(
    (s) => getStationBySlug(office.prefecture, office.city, s, office.ward ?? undefined)
  );
  if (st) url += `/${st}`;
  url += `/${office.id}`;
  return url;
}

export function buildInterviewUrl(interview: Interview, office: Office): string {
  return `${buildOfficeUrl(office)}/${interview.id}`;
}

export interface StationWithContext {
  station: Station;
  prefSlug: string;
  citySlug: string;
  wardSlug?: string;
}

export function getAllStationsWithContext(): StationWithContext[] {
  const result: StationWithContext[] = [];
  const stationsData = areas.stations as Record<
    string,
    Record<string, Station[] | Record<string, Station[]>>
  >;
  for (const [prefSlug, prefStations] of Object.entries(stationsData)) {
    for (const [citySlug, cityStations] of Object.entries(prefStations)) {
      if (Array.isArray(cityStations)) {
        for (const station of cityStations as Station[]) {
          result.push({ station, prefSlug, citySlug });
        }
      } else {
        for (const [wardSlug, wardStations] of Object.entries(
          cityStations as Record<string, Station[]>
        )) {
          for (const station of wardStations) {
            result.push({ station, prefSlug, citySlug, wardSlug });
          }
        }
      }
    }
  }
  return result;
}

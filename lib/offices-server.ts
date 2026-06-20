/**
 * Server-only data access for offices.
 * Uses fs.readFileSync so Webpack does NOT bundle offices.json into client chunks.
 * Import this file only from getStaticProps / getStaticPaths / API routes.
 */
import { readFileSync } from "fs";
import { join } from "path";
import areasData from "../data/areas.json";
import type { Office, City, Station, Interview } from "./data";
import { getStationBySlug } from "./data";

// ===== Slug normalization maps (built from areas.json) =====

const areas = areasData as {
  cities: Record<string, City[]>;
  stations: Record<string, Record<string, Station[] | Record<string, Station[]>>>;
};

const _cityNameToSlug = new Map<string, Map<string, string>>();
const _wardNameToSlug = new Map<string, Map<string, string>>();
const _stationNameToSlug = new Map<string, Map<string, string>>();

(function buildAreaLookups() {
  const validCitySlugs = new Set<string>();
  for (const [prefSlug, cities] of Object.entries(areas.cities)) {
    const cityMap = new Map<string, string>();
    for (const city of cities as City[]) {
      validCitySlugs.add(city.slug);
      cityMap.set(city.name, city.slug);
      if (city.wards) {
        const wardMap = new Map<string, string>();
        for (const ward of city.wards) wardMap.set(ward.name, ward.slug);
        _wardNameToSlug.set(city.slug, wardMap);
      }
    }
    _cityNameToSlug.set(prefSlug, cityMap);
  }
  for (const [prefSlug, prefStations] of Object.entries(areas.stations)) {
    const stMap = new Map<string, string>();
    for (const [citySlug, cityStations] of Object.entries(prefStations)) {
      if (!validCitySlugs.has(citySlug)) continue;
      if (Array.isArray(cityStations)) {
        for (const st of cityStations as Station[]) stMap.set(st.name, st.slug);
      } else {
        for (const wardStations of Object.values(cityStations as Record<string, Station[]>)) {
          for (const st of wardStations) stMap.set(st.name, st.slug);
        }
      }
    }
    _stationNameToSlug.set(prefSlug, stMap);
  }
})();

// ===== Normalization helpers =====

const INDUSTRY_EN_TO_JA: Record<string, string> = {
  agriculture:     "農林水産",
  beauty:          "美容",
  construction:    "建設",
  education:       "教育",
  finance:         "金融",
  "food-beverage": "飲食",
  accommodation:   "宿泊",
  it:              "IT・通信",
  manufacturing:   "製造",
  medical:         "医療・福祉",
  nonprofit:       "各種法人",
  other:           "その他",
  "real-estate":   "不動産",
  retail:          "流通・小売",
  service:         "サービス",
  wholesale:       "卸売",
};

const SERVICE_EN_TO_JA: Record<string, string> = {
  "accounting-outsource": "経理代行",
  bookkeeping:            "記帳代行",
  "business-plan":        "経営支援",
  "corporate-tax":        "法人決算・申告",
  "electronic-books":     "会計ソフト導入支援",
  "financial-plan":       "資金計画支援",
  fundraising:            "経営支援",
  hr:                     "労務・社保対応",
  incorporation:          "法人化支援",
  "individual-tax":       "個人確定申告",
  "inheritance-tax":      "相続税・資産税対応",
  invoice:                "インボイス対応",
  ma:                     "事業承継・M&A支援",
  "management-advice":    "経営支援",
  payroll:                "給与計算代行",
  "software-support":     "会計ソフト導入支援",
  startup:                "起業・会社設立支援",
  "tax-audit":            "税務調査対応",
  "tax-saving":           "節税対策",
  "year-end-adjustment":  "年末調整対応",
};

function normalizeOfficeSlugs(o: Office): Office {
  const normalizedCity =
    (o.cityName ? _cityNameToSlug.get(o.prefecture)?.get(o.cityName) : undefined) ?? o.city;
  let normalizedWard = o.ward;
  if (o.wardName && normalizedCity) {
    normalizedWard = _wardNameToSlug.get(normalizedCity)?.get(o.wardName) ?? o.ward;
  }
  const prefStMap = _stationNameToSlug.get(o.prefecture);
  const normalizedStations = o.nearestStations.map((slug, i) => {
    if (!prefStMap) return slug;
    const rawName = o.nearestStationNames[i];
    if (!rawName) return slug;
    const stationName = rawName.replace(/(?:から|まで)(?:徒歩|バス).*/, "").trim();
    return prefStMap.get(stationName) ?? slug;
  });
  return { ...o, city: normalizedCity, ward: normalizedWard, nearestStations: normalizedStations };
}

// ===== Load and process offices.json =====

const _raw: any[] = JSON.parse(
  readFileSync(join(process.cwd(), "data/offices.json"), "utf-8")
);

const _offices: Office[] = _raw.map((o) => ({
  ...normalizeOfficeSlugs(o as Office),
  industries: (o.industries as string[]).map((v) => INDUSTRY_EN_TO_JA[v] ?? v),
  services:   (o.services   as string[]).map((v) => SERVICE_EN_TO_JA[v]   ?? v),
}));

function hasProperAddress(o: Office): boolean {
  return typeof o.address === "string" && /[0-9０-９]|丁目|番地|番号/.test(o.address);
}

const publishedOffices = _offices.filter(hasProperAddress);

// ===== Public accessors =====

export function getAllOffices(): Office[] {
  return publishedOffices;
}

export function getOfficeById(id: string): Office | undefined {
  return publishedOffices.find((o) => o.id === id);
}

export function getOfficesByPrefecture(prefSlug: string): Office[] {
  return publishedOffices.filter((o) => o.prefecture === prefSlug);
}

export function getOfficesByCity(prefSlug: string, citySlug: string): Office[] {
  return publishedOffices.filter((o) => o.prefecture === prefSlug && o.city === citySlug);
}

export function getOfficesByWard(prefSlug: string, citySlug: string, wardSlug: string): Office[] {
  return publishedOffices.filter(
    (o) => o.prefecture === prefSlug && o.city === citySlug && o.ward === wardSlug
  );
}

export function getOfficesByStation(stationSlug: string): Office[] {
  return publishedOffices.filter((o) => o.nearestStations.includes(stationSlug));
}

export function getOfficesByArea(prefSlug: string, citySlug?: string, wardSlug?: string): Office[] {
  if (wardSlug && citySlug) return getOfficesByWard(prefSlug, citySlug, wardSlug);
  if (citySlug) return getOfficesByCity(prefSlug, citySlug);
  return getOfficesByPrefecture(prefSlug);
}

export function buildOfficeUrl(office: Office, stationSlug?: string): string {
  let url = `/${office.prefecture}/${office.city}`;
  if (office.ward) url += `/${office.ward}`;
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

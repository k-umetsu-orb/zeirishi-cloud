import { getAllPrefectures, getCitiesByPrefecture, getAllStationsWithContext } from '@/lib/data';
import { CATEGORIES } from '@/lib/categorySlugMap';
import { getAllOffices } from '@/lib/offices-server';
import { SITE_URL, type UrlEntry } from '@/lib/sitemap';

/**
 * 都道府県・市区町村・行政区・カテゴリ（全国／都道府県×／市区町村×／行政区×）の一覧URL。
 * 事務所が1件もない組み合わせは含めない。
 */
export function buildListUrls(): UrlEntry[] {
  const urls: UrlEntry[] = [];

  urls.push({ loc: `${SITE_URL}/search`, changefreq: 'weekly', priority: 0.9 });

  const prefHasOffice = new Set<string>();
  const cityHasOffice = new Set<string>();
  const wardHasOffice = new Set<string>();
  const catNationwideHasOffice = new Set<string>();
  const catPrefHasOffice = new Set<string>();
  const catCityHasOffice = new Set<string>();
  const catWardHasOffice = new Set<string>();

  for (const office of getAllOffices()) {
    prefHasOffice.add(office.prefecture);
    cityHasOffice.add(`${office.prefecture}:${office.city}`);
    if (office.ward) wardHasOffice.add(`${office.prefecture}:${office.city}:${office.ward}`);

    for (const cat of CATEGORIES) {
      const field = cat.type === 'industry' ? office.industries : office.services;
      if (!cat.dbValues.some((v) => field.includes(v))) continue;
      catNationwideHasOffice.add(cat.slug);
      catPrefHasOffice.add(`${cat.slug}:${office.prefecture}`);
      catCityHasOffice.add(`${cat.slug}:${office.prefecture}:${office.city}`);
      if (office.ward) catWardHasOffice.add(`${cat.slug}:${office.prefecture}:${office.city}:${office.ward}`);
    }
  }

  for (const cat of CATEGORIES) {
    if (catNationwideHasOffice.has(cat.slug)) {
      urls.push({ loc: `${SITE_URL}/${cat.slug}`, changefreq: 'weekly', priority: 0.7 });
    }
  }

  for (const pref of getAllPrefectures()) {
    if (!prefHasOffice.has(pref.slug)) continue;
    urls.push({ loc: `${SITE_URL}/${pref.slug}`, changefreq: 'weekly', priority: 0.7 });

    for (const cat of CATEGORIES) {
      if (catPrefHasOffice.has(`${cat.slug}:${pref.slug}`)) {
        urls.push({ loc: `${SITE_URL}/${pref.slug}/${cat.slug}`, changefreq: 'weekly', priority: 0.6 });
      }
    }

    for (const city of getCitiesByPrefecture(pref.slug)) {
      if (cityHasOffice.has(`${pref.slug}:${city.slug}`)) {
        urls.push({ loc: `${SITE_URL}/${pref.slug}/${city.slug}`, changefreq: 'weekly', priority: 0.6 });

        for (const cat of CATEGORIES) {
          if (catCityHasOffice.has(`${cat.slug}:${pref.slug}:${city.slug}`)) {
            urls.push({ loc: `${SITE_URL}/${pref.slug}/${city.slug}/${cat.slug}`, changefreq: 'weekly', priority: 0.5 });
          }
        }
      }

      for (const ward of city.wards ?? []) {
        if (!wardHasOffice.has(`${pref.slug}:${city.slug}:${ward.slug}`)) continue;
        urls.push({ loc: `${SITE_URL}/${pref.slug}/${city.slug}/${ward.slug}`, changefreq: 'monthly', priority: 0.5 });

        for (const cat of CATEGORIES) {
          if (catWardHasOffice.has(`${cat.slug}:${pref.slug}:${city.slug}:${ward.slug}`)) {
            urls.push({ loc: `${SITE_URL}/${pref.slug}/${city.slug}/${ward.slug}/${cat.slug}`, changefreq: 'monthly', priority: 0.4 });
          }
        }
      }
    }
  }

  return urls;
}

/** 駅・駅×カテゴリの一覧URL。事務所が1件もない組み合わせは含めない。 */
export function buildStationListUrls(): UrlEntry[] {
  const stationHasOffice = new Set<string>();
  const catStationHasOffice = new Set<string>();
  for (const office of getAllOffices()) {
    for (const slug of office.nearestStations) {
      stationHasOffice.add(slug);
    }
    for (const cat of CATEGORIES) {
      const field = cat.type === 'industry' ? office.industries : office.services;
      if (!cat.dbValues.some((v) => field.includes(v))) continue;
      for (const slug of office.nearestStations) {
        catStationHasOffice.add(`${cat.slug}:${slug}`);
      }
    }
  }

  const urls: UrlEntry[] = [];
  for (const { station, prefSlug, citySlug, wardSlug } of getAllStationsWithContext()) {
    if (!stationHasOffice.has(station.slug)) continue;
    const path = wardSlug
      ? `/${prefSlug}/${citySlug}/${wardSlug}/${station.slug}`
      : `/${prefSlug}/${citySlug}/${station.slug}`;
    urls.push({ loc: `${SITE_URL}${path}`, changefreq: 'weekly', priority: 0.5 });

    for (const cat of CATEGORIES) {
      if (catStationHasOffice.has(`${cat.slug}:${station.slug}`)) {
        urls.push({ loc: `${SITE_URL}${path}/${cat.slug}`, changefreq: 'weekly', priority: 0.4 });
      }
    }
  }

  return urls;
}

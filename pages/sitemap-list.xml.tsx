import type { GetServerSideProps } from 'next';
import { getAllPrefectures, getCitiesByPrefecture } from '@/lib/data';
import { CATEGORIES } from '@/lib/categorySlugMap';
import { getAllOffices } from '@/lib/offices-server';
import { SITE_URL, buildSitemapXml, sendXml, type UrlEntry } from '@/lib/sitemap';

export default function SitemapList() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const urls: UrlEntry[] = [];

  // 検索ページ
  urls.push({ loc: `${SITE_URL}/search`, changefreq: 'weekly', priority: 0.9 });

  // ── 事務所が1件以上ある（都道府県／市区町村／行政区／カテゴリ）組み合わせを事前計算 ──
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

  // カテゴリページ（全国）：事務所0件を除外
  for (const cat of CATEGORIES) {
    if (catNationwideHasOffice.has(cat.slug)) {
      urls.push({ loc: `${SITE_URL}/${cat.slug}`, changefreq: 'weekly', priority: 0.7 });
    }
  }

  for (const pref of getAllPrefectures()) {
    // 都道府県ページ：事務所0件を除外
    if (!prefHasOffice.has(pref.slug)) continue;
    urls.push({ loc: `${SITE_URL}/${pref.slug}`, changefreq: 'weekly', priority: 0.7 });

    // 都道府県×カテゴリ
    for (const cat of CATEGORIES) {
      if (catPrefHasOffice.has(`${cat.slug}:${pref.slug}`)) {
        urls.push({ loc: `${SITE_URL}/${pref.slug}/${cat.slug}`, changefreq: 'weekly', priority: 0.6 });
      }
    }

    // 市区町村ページ + 市区町村×カテゴリ
    for (const city of getCitiesByPrefecture(pref.slug)) {
      if (cityHasOffice.has(`${pref.slug}:${city.slug}`)) {
        urls.push({ loc: `${SITE_URL}/${pref.slug}/${city.slug}`, changefreq: 'weekly', priority: 0.6 });

        for (const cat of CATEGORIES) {
          if (catCityHasOffice.has(`${cat.slug}:${pref.slug}:${city.slug}`)) {
            urls.push({ loc: `${SITE_URL}/${pref.slug}/${city.slug}/${cat.slug}`, changefreq: 'weekly', priority: 0.5 });
          }
        }
      }

      // 行政区ページ + 行政区×カテゴリ
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

  sendXml(res, buildSitemapXml(urls));
  return { props: {} };
};

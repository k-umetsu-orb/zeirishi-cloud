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

  // ── 都道府県×カテゴリページ：事務所0件を除外 ────────────────────────
  // 事務所ありの（カテゴリスラッグ:都道府県スラッグ）ペアを事前計算
  const catPrefHasOffice = new Set<string>();
  for (const office of getAllOffices()) {
    for (const cat of CATEGORIES) {
      const field = cat.type === 'industry' ? office.industries : office.services;
      if (cat.dbValues.some((v) => field.includes(v))) {
        catPrefHasOffice.add(`${cat.slug}:${office.prefecture}`);
      }
    }
  }

  // カテゴリページ（全国）
  for (const cat of CATEGORIES) {
    urls.push({ loc: `${SITE_URL}/${cat.slug}`, changefreq: 'weekly', priority: 0.7 });
  }

  // 都道府県・市区町村・区ページ + 都道府県×カテゴリページ
  for (const pref of getAllPrefectures()) {
    urls.push({ loc: `${SITE_URL}/${pref.slug}`, changefreq: 'weekly', priority: 0.7 });

    // 都道府県×カテゴリ
    for (const cat of CATEGORIES) {
      if (catPrefHasOffice.has(`${cat.slug}:${pref.slug}`)) {
        urls.push({ loc: `${SITE_URL}/${pref.slug}/${cat.slug}`, changefreq: 'weekly', priority: 0.6 });
      }
    }

    // 市区町村・区
    for (const city of getCitiesByPrefecture(pref.slug)) {
      urls.push({ loc: `${SITE_URL}/${pref.slug}/${city.slug}`, changefreq: 'weekly', priority: 0.6 });

      for (const ward of city.wards ?? []) {
        urls.push({ loc: `${SITE_URL}/${pref.slug}/${city.slug}/${ward.slug}`, changefreq: 'monthly', priority: 0.5 });
      }
    }
  }

  sendXml(res, buildSitemapXml(urls));
  return { props: {} };
};

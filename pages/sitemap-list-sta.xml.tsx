import type { GetServerSideProps } from 'next';
import { getAllStationsWithContext } from '@/lib/data';
import { CATEGORIES } from '@/lib/categorySlugMap';
import { getAllOffices } from '@/lib/offices-server';
import { SITE_URL, buildSitemapXml, sendXml, type UrlEntry } from '@/lib/sitemap';

export default function SitemapListSta() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // 事務所が1件以上ある（駅／駅×カテゴリ）組み合わせを事前計算
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

    // 駅×カテゴリ
    for (const cat of CATEGORIES) {
      if (catStationHasOffice.has(`${cat.slug}:${station.slug}`)) {
        urls.push({ loc: `${SITE_URL}${path}/${cat.slug}`, changefreq: 'weekly', priority: 0.4 });
      }
    }
  }

  sendXml(res, buildSitemapXml(urls));
  return { props: {} };
};

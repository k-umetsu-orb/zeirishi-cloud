import type { GetServerSideProps } from 'next';
import { getAllStationsWithContext } from '@/lib/data';
import { getAllOffices } from '@/lib/offices-server';
import { SITE_URL, buildSitemapXml, sendXml, type UrlEntry } from '@/lib/sitemap';

export default function SitemapListSta() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // 事務所が1件以上ある駅スラッグのセット
  const stationHasOffice = new Set<string>();
  for (const office of getAllOffices()) {
    for (const slug of office.nearestStations) {
      stationHasOffice.add(slug);
    }
  }

  const urls: UrlEntry[] = [];
  for (const { station, prefSlug, citySlug, wardSlug } of getAllStationsWithContext()) {
    if (!stationHasOffice.has(station.slug)) continue;
    const path = wardSlug
      ? `/${prefSlug}/${citySlug}/${wardSlug}/${station.slug}`
      : `/${prefSlug}/${citySlug}/${station.slug}`;
    urls.push({ loc: `${SITE_URL}${path}`, changefreq: 'weekly', priority: 0.5 });
  }

  sendXml(res, buildSitemapXml(urls));
  return { props: {} };
};

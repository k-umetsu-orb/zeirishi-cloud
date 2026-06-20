import type { GetServerSideProps } from 'next';
import { buildOfficeUrl } from '@/lib/data';
import { getAllOffices } from '@/lib/offices-server';
import { SITE_URL, buildSitemapXml, sendXml, type UrlEntry } from '@/lib/sitemap';

export default function SitemapOffice() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const urls: UrlEntry[] = [];

  for (const office of getAllOffices()) {
    urls.push({
      loc: `${SITE_URL}${buildOfficeUrl(office)}`,
      changefreq: 'monthly',
      priority: 0.5,
    });
  }

  sendXml(res, buildSitemapXml(urls));
  return { props: {} };
};

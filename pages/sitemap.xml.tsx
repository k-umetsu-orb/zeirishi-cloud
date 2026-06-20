import type { GetServerSideProps } from 'next';
import { SITE_URL, buildSitemapIndexXml, sendXml } from '@/lib/sitemap';

export default function SitemapIndex() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const today = new Date().toISOString().split('T')[0];

  const xml = buildSitemapIndexXml([
    { loc: `${SITE_URL}/sitemap-top.xml`,      lastmod: today },
    { loc: `${SITE_URL}/sitemap-list.xml`,     lastmod: today },
    { loc: `${SITE_URL}/sitemap-list-sta.xml`, lastmod: today },
    { loc: `${SITE_URL}/sitemap-office.xml`,   lastmod: today },
    { loc: `${SITE_URL}/sitemap-column.xml`,   lastmod: today },
  ]);

  sendXml(res, xml);
  return { props: {} };
};

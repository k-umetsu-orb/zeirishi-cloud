import type { GetServerSideProps } from 'next';
import { SITE_URL, buildSitemapIndexXml, sendXml } from '@/lib/sitemap';

export default function SitemapIndex() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const today = new Date().toISOString().split('T')[0];

  const xml = buildSitemapIndexXml([
    { loc: `${SITE_URL}/sitemap-top.xml`,         lastmod: today },
    { loc: `${SITE_URL}/sitemap-list-01.xml`,     lastmod: today },
    { loc: `${SITE_URL}/sitemap-list-02.xml`,     lastmod: today },
    { loc: `${SITE_URL}/sitemap-list-sta-01.xml`, lastmod: today },
    { loc: `${SITE_URL}/sitemap-list-sta-02.xml`, lastmod: today },
    { loc: `${SITE_URL}/sitemap-list-sta-03.xml`, lastmod: today },
    { loc: `${SITE_URL}/sitemap-list-sta-04.xml`, lastmod: today },
    { loc: `${SITE_URL}/sitemap-office.xml`,      lastmod: today },
    { loc: `${SITE_URL}/sitemap-column.xml`,      lastmod: today },
  ]);

  sendXml(res, xml);
  return { props: {} };
};

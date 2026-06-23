import type { GetServerSideProps } from 'next';
import { SITE_URL, buildSitemapIndexXml, sendXml } from '@/lib/sitemap';

export default function SitemapIndex() {
  return null;
}

const LIST_PARTS = 5;
const LIST_STA_PARTS = 14;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const today = new Date().toISOString().split('T')[0];
  const pad = (n: number) => String(n).padStart(2, '0');

  const xml = buildSitemapIndexXml([
    { loc: `${SITE_URL}/sitemap-top.xml`, lastmod: today },
    ...Array.from({ length: LIST_PARTS }, (_, i) => ({
      loc: `${SITE_URL}/sitemap-list-${pad(i + 1)}.xml`,
      lastmod: today,
    })),
    ...Array.from({ length: LIST_STA_PARTS }, (_, i) => ({
      loc: `${SITE_URL}/sitemap-list-sta-${pad(i + 1)}.xml`,
      lastmod: today,
    })),
    { loc: `${SITE_URL}/sitemap-office.xml`, lastmod: today },
    { loc: `${SITE_URL}/sitemap-column.xml`, lastmod: today },
  ]);

  sendXml(res, xml);
  return { props: {} };
};

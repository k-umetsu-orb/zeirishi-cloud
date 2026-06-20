import type { GetServerSideProps } from 'next';
import { SITE_URL, buildSitemapXml, sendXml, type UrlEntry } from '@/lib/sitemap';

export default function SitemapTop() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const today = new Date().toISOString().split('T')[0];

  const urls: UrlEntry[] = [
    // TOPページ
    { loc: `${SITE_URL}/`,               lastmod: today, changefreq: 'daily',   priority: 1.0 },
    // 税理士紹介ページ
    { loc: `${SITE_URL}/introduction`,    lastmod: today, changefreq: 'monthly', priority: 0.8 },
    { loc: `${SITE_URL}/introduction-01`, lastmod: today, changefreq: 'monthly', priority: 0.7 },
    { loc: `${SITE_URL}/introduction-02`, lastmod: today, changefreq: 'monthly', priority: 0.7 },
    { loc: `${SITE_URL}/introduction-03`, lastmod: today, changefreq: 'monthly', priority: 0.7 },
    { loc: `${SITE_URL}/introduction-04`, lastmod: today, changefreq: 'monthly', priority: 0.7 },
    { loc: `${SITE_URL}/introduction-05`, lastmod: today, changefreq: 'monthly', priority: 0.7 },
    { loc: `${SITE_URL}/introduction-06`, lastmod: today, changefreq: 'monthly', priority: 0.7 },
    // 会社情報
    { loc: `${SITE_URL}/company`,         lastmod: today, changefreq: 'monthly', priority: 0.5 },
    // 利用規約・プライバシーポリシー
    { loc: `${SITE_URL}/terms`,           lastmod: today, changefreq: 'yearly',  priority: 0.3 },
    { loc: `${SITE_URL}/privacy`,         lastmod: today, changefreq: 'yearly',  priority: 0.3 },
  ];

  sendXml(res, buildSitemapXml(urls));
  return { props: {} };
};

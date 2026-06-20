import type { GetServerSideProps } from 'next';
import { getAllArticles, getAllInterviews, buildInterviewUrl } from '@/lib/data';
import { getOfficeById } from '@/lib/offices-server';
import { SITE_URL, buildSitemapXml, sendXml, type UrlEntry } from '@/lib/sitemap';

export default function SitemapColumn() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const urls: UrlEntry[] = [];

  // コンテンツ一覧ページ
  urls.push({ loc: `${SITE_URL}/guide`,          changefreq: 'weekly',  priority: 0.8 });
  urls.push({ loc: `${SITE_URL}/column`,          changefreq: 'weekly',  priority: 0.8 });
  urls.push({ loc: `${SITE_URL}/interview`,       changefreq: 'weekly',  priority: 0.7 });
  urls.push({ loc: `${SITE_URL}/recommendation`,  changefreq: 'monthly', priority: 0.7 });

  // ガイド記事・おすすめ記事（詳細ページ）
  for (const article of getAllArticles()) {
    const lastmod = article.publishedAt.split('T')[0];

    if (article.category === 'guide') {
      urls.push({
        loc: `${SITE_URL}/guide/${article.slug}`,
        lastmod,
        changefreq: 'monthly',
        priority: 0.6,
      });
    } else if (article.category === 'column') {
      urls.push({
        loc: `${SITE_URL}/column/${article.slug}`,
        lastmod,
        changefreq: 'monthly',
        priority: 0.6,
      });
    } else if (article.category === 'recommendation' && article.relatedPrefecture) {
      const path = article.relatedCity
        ? `/${article.relatedPrefecture}/${article.relatedCity}/${article.slug}`
        : `/${article.relatedPrefecture}/${article.slug}`;
      urls.push({ loc: `${SITE_URL}${path}`, lastmod, changefreq: 'monthly', priority: 0.6 });
    }
  }

  // インタビュー詳細ページ
  for (const interview of getAllInterviews()) {
    const office = getOfficeById(interview.officeId);
    if (!office) continue;
    urls.push({
      loc: `${SITE_URL}${buildInterviewUrl(interview, office)}`,
      lastmod: interview.date.split('T')[0],
      changefreq: 'monthly',
      priority: 0.5,
    });
  }

  sendXml(res, buildSitemapXml(urls));
  return { props: {} };
};

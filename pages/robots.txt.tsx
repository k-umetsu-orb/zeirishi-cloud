import type { GetServerSideProps } from 'next';

export default function RobotsPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zeirishi-cloud.jp';

  const content = [
    'User-agent: *',
    'Allow: /',
    '',
    'Disallow: /api/',
    'Disallow: /404',
    'Disallow: /search/results',
    '',
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join('\n');

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400');
  res.write(content);
  res.end();

  return { props: {} };
};

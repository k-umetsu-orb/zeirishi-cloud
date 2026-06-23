export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zeirishi-cloud.jp';

export interface UrlEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export function buildSitemapXml(urls: UrlEntry[]): string {
  const entries = urls
    .map(({ loc, lastmod, changefreq, priority }) => {
      const lines = [`    <loc>${loc}</loc>`];
      if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`);
      if (changefreq) lines.push(`    <changefreq>${changefreq}</changefreq>`);
      if (priority !== undefined) lines.push(`    <priority>${priority.toFixed(1)}</priority>`);
      return `  <url>\n${lines.join('\n')}\n  </url>`;
    })
    .join('\n');

  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entries +
    '\n</urlset>'
  );
}

export function buildSitemapIndexXml(sitemaps: Array<{ loc: string; lastmod?: string }>): string {
  const entries = sitemaps
    .map(({ loc, lastmod }) => {
      const lines = [`    <loc>${loc}</loc>`];
      if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`);
      return `  <sitemap>\n${lines.join('\n')}\n  </sitemap>`;
    })
    .join('\n');

  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entries +
    '\n</sitemapindex>'
  );
}

/**
 * urls を固定件数で分割し、partNumber 番目（1始まり）の範囲を返す。
 * 最終パート（partNumber === totalParts）は残り全件を含む（データ増加時もURLを欠落させない）。
 */
export function getSitemapChunk<T>(items: T[], chunkSize: number, partNumber: number, totalParts: number): T[] {
  const start = (partNumber - 1) * chunkSize;
  if (partNumber >= totalParts) return items.slice(start);
  return items.slice(start, start + chunkSize);
}

export function sendXml(res: import('http').ServerResponse, xml: string, maxAge = 86400): void {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', `public, s-maxage=${maxAge}, stale-while-revalidate=3600`);
  res.write(xml);
  res.end();
}

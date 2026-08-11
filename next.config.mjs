/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Renderのビルド環境ではos.cpus()がコンテナの実メモリに対して過大なコア数を
    // 返すことがあり、既定値(cpus-1)だとページ生成ワーカーが立ちすぎてOOMになる。
    cpus: 2,
    memoryBasedWorkersCount: true,
    webpackMemoryOptimizations: true,
  },
  async redirects() {
    return [
      {
        source: '/privacy',
        destination: 'https://orb-inc.co.jp/privacy-policy',
        permanent: true,
      },
      {
        source: '/introduction-thanks',
        destination: '/introduction/thanks',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      // Area/category listing pages are SSG, so the static HTML is identical
      // regardless of query string and always renders as the unfiltered
      // listing. A client-side-only <meta noindex> patch only takes effect
      // after JS hydration, which crawlers can't rely on — this header makes
      // noindex visible on the very first HTTP response, and (unlike setting
      // it in middleware) survives Next's static page cache.
      {
        source: '/:path*',
        has: [{ type: 'query', key: 'industry' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
      {
        source: '/:path*',
        has: [{ type: 'query', key: 'service' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
    ];
  },
};

export default nextConfig;

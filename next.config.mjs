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
};

export default nextConfig;

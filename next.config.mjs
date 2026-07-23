/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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

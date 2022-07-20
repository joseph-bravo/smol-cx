/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
};

module.exports = nextConfig;

module.exports = {
  async redirects() {
    return [
      {
        source: '/:uid',
        destination: '/api/:uid', // Matched parameters can be used in the destination
        permanent: true
      }
    ];
  }
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: 'standalone',

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'scougalrubber.com',
          },
        ],
        destination: 'https://www.scougalrubber.com/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

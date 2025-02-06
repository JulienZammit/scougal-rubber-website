/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: 'standalone',

  async redirects() {
    return [
      // 1) Unifier le domaine scougalrubber.com vers www.scougalrubber.com
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'scougalrubber.com',
          },
        ],
        destination: 'https://www.scougalrubber.com/:path*',
        permanent: true, // 301
      },

      // 2) Redirections spécifiques (on est maintenant sur www.scougalrubber.com)
      {
        source: '/contact.html',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/about.html',
        destination: '/company',
        permanent: true,
      },
      {
        source: '/about2',
        destination: '/company',
        permanent: true,
      },
      {
        source: '/company-overview',
        destination: '/company',
        permanent: true,
      },
      {
        source: '/bearingPads.html',
        destination: '/bearing-pads',
        permanent: true,
      },
      {
        source: '/laminated.html',
        destination: '/bearing-pads',
        permanent: true,
      },
      {
        source: '/plain.html',
        destination: '/bearing-pads',
        permanent: true,
      },
      {
        source: '/loadPlates.html',
        destination: '/bearing-pads',
        permanent: true,
      },
      {
        source: '/bridge-bearings',
        destination: '/bearing-pads',
        permanent: true,
      },
      {
        source: '/steel-laminated-elastomeric-bearings',
        destination: '/steel',
        permanent: true,
      },
      {
        source: '/steel-reinforced-elastomeric',
        destination: '/steel',
        permanent: true,
      },
      {
        source: '/steel-fabrication',
        destination: '/steel',
        permanent: true,
      },
      {
        source: '/ramps.html',
        destination: '/ramps',
        permanent: true,
      },
      {
        source: '/rubber-parts-overview',
        destination: '/rubber-parts',
        permanent: true,
      },
      {
        source: '/industrial-rubber-parts',
        destination: '/rubber-parts',
        permanent: true,
      },
      {
        source: '/molded.html',
        destination: '/rubber-parts',
        permanent: true,
      },
      {
        source: '/molded-products',
        destination: '/rubber-parts',
        permanent: true,
      },
      {
        source: '/hand-built-mandrel',
        destination: '/rubber-parts',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;

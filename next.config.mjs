/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: 'standalone',

  async redirects() {
    return [
      {
        source: '/contact.html',
        has: [{ type: 'host', value: 'scougalrubber.com' }],
        destination: 'https://www.scougalrubber.com/contact-us',
        permanent: true,
      },
      {
        source: '/about.html',
        has: [{ type: 'host', value: 'scougalrubber.com' }],
        destination: 'https://www.scougalrubber.com/company',
        permanent: true,
      },
      {
        source: '/about2',
        has: [{ type: 'host', value: 'scougalrubber.com' }],
        destination: 'https://www.scougalrubber.com/company',
        permanent: true,
      },
      {
        source: '/company-overview',
        has: [{ type: 'host', value: 'scougalrubber.com' }],
        destination: 'https://www.scougalrubber.com/company',
        permanent: true,
      },
      {
        source: '/bearingPads.html',
        has: [{ type: 'host', value: 'scougalrubber.com' }],
        destination: 'https://www.scougalrubber.com/bearing-pads',
        permanent: true,
      },
      {
        source: '/laminated.html',
        has: [{ type: 'host', value: 'scougalrubber.com' }],
        destination: 'https://www.scougalrubber.com/bearing-pads',
        permanent: true,
      },
      {
        source: '/plain.html',
        has: [{ type: 'host', value: 'scougalrubber.com' }],
        destination: 'https://www.scougalrubber.com/bearing-pads',
        permanent: true,
      },
      {
        source: '/loadPlates.html',
        has: [{ type: 'host', value: 'scougalrubber.com' }],
        destination: 'https://www.scougalrubber.com/bearing-pads',
        permanent: true,
      },
      {
        source: '/bridge-bearings',
        has: [{ type: 'host', value: 'scougalrubber.com' }],
        destination: 'https://www.scougalrubber.com/bearing-pads',
        permanent: true,
      },
      {
        source: '/steel-laminated-elastomeric-bearings',
        has: [{ type: 'host', value: 'scougalrubber.com' }],
        destination: 'https://www.scougalrubber.com/steel',
        permanent: true,
      },
      {
        source: '/steel-reinforced-elastomeric',
        has: [{ type: 'host', value: 'scougalrubber.com' }],
        destination: 'https://www.scougalrubber.com/steel',
        permanent: true,
      },

      {
        source: '/steel-fabrication',
        has: [{ type: 'host', value: 'scougalrubber.com' }],
        destination: 'https://www.scougalrubber.com/steel',
        permanent: true,
      },
      {
        source: '/ramps.html',
        has: [{ type: 'host', value: 'scougalrubber.com' }],
        destination: 'https://www.scougalrubber.com/ramps',
        permanent: true,
      },
      {
        source: '/rubber-parts-overview',
        has: [{ type: 'host', value: 'scougalrubber.com' }],
        destination: 'https://www.scougalrubber.com/rubber-parts',
        permanent: true,
      },
      {
        source: '/industrial-rubber-parts',
        has: [{ type: 'host', value: 'scougalrubber.com' }],
        destination: 'https://www.scougalrubber.com/rubber-parts',
        permanent: true,
      },
      {
        source: '/molded.html',
        has: [{ type: 'host', value: 'scougalrubber.com' }],
        destination: 'https://www.scougalrubber.com/rubber-parts',
        permanent: true,
      },
      {
        source: '/molded-products',
        has: [{ type: 'host', value: 'scougalrubber.com' }],
        destination: 'https://www.scougalrubber.com/rubber-parts',
        permanent: true,
      },
      {
        source: '/hand-built-mandrel',
        has: [{ type: 'host', value: 'scougalrubber.com' }],
        destination: 'https://www.scougalrubber.com/rubber-parts',
        permanent: true,
      },

      {
        source: '/index.html',
        has: [{ type: 'host', value: 'scougalrubber.com' }],
        destination: 'https://www.scougalrubber.com/',
        permanent: true,
      },

      {
        source: '/:path*',
        has: [{ type: 'host', value: 'scougalrubber.com' }],
        destination: '/404', 
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

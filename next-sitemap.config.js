/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.scougalrubber.com/', // URL de votre site local
    generateRobotsTxt: true, // Génère également un fichier robots.txt
    sitemapSize: 10000,
    outDir: './public',
    priority: 0.7,
    changefreq: 'daily',
    exclude: ['/api/*'],
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/' },
      ],
    },
  };
  
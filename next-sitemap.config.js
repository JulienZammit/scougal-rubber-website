/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.scougalrubber.com/', // URL de votre site local
    generateRobotsTxt: true, // Génère également un fichier robots.txt
    sitemapSize: 7000,
    outDir: './public',
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/' },
      ],
    },
  };
  
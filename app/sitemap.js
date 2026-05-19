export const dynamic = "force-dynamic";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  function toISODate(dateString) {
    if (!dateString) {
      return "2025-02-07T11:07:45.253Z";
    }
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) {
      return "2025-02-07T11:07:45.253Z";
    }
    return dateObj.toISOString();
  }

  const staticUrls = [
    {
      url: `${baseUrl}/`,
      lastModified: toISODate("2025-02-07T11:07:45.253Z"),
      changefreq: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: toISODate("2025-02-07T11:07:45.253Z"),
      changefreq: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/rubber-parts`,
      lastModified: toISODate("2025-02-07T11:07:45.253Z"),
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/company`,
      lastModified: toISODate("2025-02-07T11:07:45.253Z"),
      changefreq: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bearing-pads`,
      lastModified: toISODate("2025-02-07T11:07:45.253Z"),
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/steel`,
      lastModified: toISODate("2025-02-07T11:07:45.253Z"),
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/employment`,
      lastModified: toISODate("2025-02-07T11:07:45.253Z"),
      changefreq: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: toISODate("2025-02-07T11:07:45.253Z"),
      changefreq: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: toISODate("2025-02-07T11:07:45.253Z"),
      changefreq: "weekly",
      priority: 0.7,
    },
  ];

  return staticUrls;
}

import { getAllPosts } from "@/service/blog";

export const dynamic = "force-dynamic";

export default function sitemap() {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://www.scougalrubber.com";

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

  const blogIndex = {
    url: `${baseUrl}/blog`,
    lastModified: toISODate("2025-02-07T11:07:45.253Z"),
    changefreq: "weekly",
    priority: 0.8,
  };

  const blogPosts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: toISODate(post.lastModified || post.date),
    changefreq: "weekly",
    priority: 0.7,
  }));

  return [...staticUrls, blogIndex, ...blogPosts];
}

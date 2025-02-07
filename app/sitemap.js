import { getAllPosts } from "@/service/postsAzure";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const allPosts = await getAllPosts();

  const staticUrls = [
    {
      url: `${baseUrl}/`,
      lastModified: "2025-02-07T11:07:45.253Z",
      changefreq: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: "2025-02-07T11:07:45.253Z",
      changefreq: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/rubber-parts`,
      lastModified: "2025-02-07T11:07:45.253Z",
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/company`,
      lastModified: "2025-02-07T11:07:45.253Z",
      changefreq: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bearing-pads`,
      lastModified: "2025-02-07T11:07:45.253Z",
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/steel`,
      lastModified: "2025-02-07T11:07:45.253Z",
      changefreq: "weekly",
      priority: 0.9, 
    },
    {
      url: `${baseUrl}/employment`,
      lastModified: "2025-02-07T11:07:45.253Z",
      changefreq: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: "2025-02-07T11:07:45.253Z",
      changefreq: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: "2025-02-07T11:07:45.253Z",
      changefreq: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ramps`,
      lastModified: "2025-02-07T11:07:45.253Z",
      changefreq: "weekly",
      priority: 0.9,
    },
  ];

  const blogIndex = {
    url: `${baseUrl}/blog`,
    lastModified: "2025-02-07T11:07:45.253Z",
    changefreq: "weekly",
    priority: 0.8,
  };

  const blogPosts = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModifiedified: post.lastModifiedified,
    changefreq: "weekly",
    priority: 0.7,
  }));

  return [...staticUrls, blogIndex, ...blogPosts];
}

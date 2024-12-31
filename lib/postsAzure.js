// lib/postsAzure.js

export async function getAllPosts() {
    // We do a server fetch to /api/list-posts
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/list-posts`, {
      cache: "no-store", // or "default", etc.
    });
    if (!res.ok) {
      console.error("Failed to fetch posts from Azure");
      return [];
    }
    const data = await res.json();
    // data.files is an array of objects: { name, slug, frontmatter keys, ... }
    // Sort by date if needed
    const sorted = data.files.sort((a, b) => new Date(b.date) - new Date(a.date));
    return sorted;
  }
  
  export async function getPostBySlug(slug) {
    const fileSlug = slug.endsWith(".md") ? slug : slug + ".md";
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/get-post?slug=${fileSlug}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      console.error("Failed to fetch post from Azure", res.status);
      return null;
    }
    const data = await res.json();
    if (data.error) {
      console.error(data.error);
      return null;
    }
    return {
      slug: data.slug,
      ...data.frontmatter, // e.g. title, date, category, ...
      content: data.content,
    };
  }
  
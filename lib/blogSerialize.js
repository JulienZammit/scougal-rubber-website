// lib/blogSerialize.js
//
// Serialize the blog-management editor state to a Markdown file (frontmatter +
// body) and parse it back. We use gray-matter's stringify so the YAML is ALWAYS
// valid — unlike the old hand-rolled string concatenation that broke whenever a
// title contained a double-quote. The output frontmatter shape matches exactly
// what `service/blog.js` reads on the public site.

import matter from "gray-matter";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Turn a free-text string into a URL-safe slug.
 */
export function slugify(input) {
  return String(input || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // strip accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/**
 * Build the clean frontmatter object from the editor metadata state.
 * Drops empty / undefined fields so the YAML stays tidy.
 */
function buildFrontmatter(meta = {}) {
  const fm = {};

  const setStr = (key, val) => {
    const v = (val ?? "").toString().trim();
    if (v) fm[key] = v;
  };

  setStr("title", meta.title);
  setStr("description", meta.description);
  setStr("slug", meta.slug);
  setStr("canonicalUrl", meta.canonicalUrl);
  setStr("coverImage", meta.coverImage);
  setStr("ogImage", meta.ogImage || meta.coverImage);
  setStr("twitterCard", meta.twitterCard || "summary_large_image");
  setStr("twitterCreator", meta.twitterCreator);
  setStr("category", meta.category);

  const tags = Array.isArray(meta.tags)
    ? meta.tags
    : String(meta.tags || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
  if (tags.length) fm.tags = tags;

  setStr("date", meta.date);
  setStr("lastModified", meta.lastModified || meta.date);
  fm.status = meta.status === "published" ? "published" : "draft";
  fm.featured = !!meta.featured;
  fm.trending = !!meta.trending;

  const author = meta.author || {};
  const authorObj = {};
  if ((author.name || "").trim()) authorObj.name = author.name.trim();
  if ((author.title || "").trim()) authorObj.title = author.title.trim();
  if ((author.bio || "").trim()) authorObj.bio = author.bio.trim();
  if ((author.avatar || "").trim()) authorObj.avatar = author.avatar.trim();
  if ((author.twitter || "").trim()) authorObj.twitter = author.twitter.trim();
  if ((author.linkedin || "").trim()) authorObj.linkedin = author.linkedin.trim();
  if (Object.keys(authorObj).length) fm.author = authorObj;

  const rt = Number(meta.readingTime);
  if (Number.isFinite(rt) && rt > 0) fm.readingTime = Math.round(rt);

  return fm;
}

/**
 * Serialize { metadata, body } into a full `.md` string.
 */
export function buildMarkdown(metadata, body) {
  const fm = buildFrontmatter(metadata);
  // matter.stringify always emits valid, quoted-as-needed YAML.
  return matter.stringify(`\n${(body || "").trim()}\n`, fm);
}

/**
 * Parse a `.md` string back into { metadata, body } for editing.
 * The returned metadata is flattened to the editor's state shape.
 */
export function parseMarkdown(raw) {
  const { data, content } = matter(raw || "");
  return {
    metadata: {
      title: data.title || "",
      description: data.description || "",
      slug: data.slug || "",
      canonicalUrl: data.canonicalUrl || "",
      coverImage: data.coverImage || "",
      ogImage: data.ogImage || "",
      twitterCard: data.twitterCard || "summary_large_image",
      twitterCreator: data.twitterCreator || "",
      category: data.category || "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      date: data.date || "",
      lastModified: data.lastModified || "",
      status: data.status || "draft",
      featured: !!data.featured,
      trending: !!data.trending,
      author: data.author || {},
      readingTime: data.readingTime || 0,
    },
    body: (content || "").trim(),
  };
}

/**
 * Validate editor input before saving. Returns { ok, errors[], slug }.
 */
export function validatePost(metadata, body) {
  const errors = [];
  const title = (metadata?.title || "").trim();
  const slug = (metadata?.slug || slugify(title)).trim();

  if (!title) errors.push("Title is required.");
  if (!slug) errors.push("Slug is required.");
  else if (!SLUG_RE.test(slug))
    errors.push("Slug must be lowercase letters, numbers and single dashes (e.g. my-article).");
  if (!(body || "").trim()) errors.push("Article body is empty.");

  // Final safety net: make sure what we are about to write parses back cleanly.
  if (errors.length === 0) {
    try {
      const md = buildMarkdown({ ...metadata, slug }, body);
      matter(md);
    } catch (e) {
      errors.push("Generated Markdown is invalid: " + (e?.message || e));
    }
  }

  return { ok: errors.length === 0, errors, slug };
}

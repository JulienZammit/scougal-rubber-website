import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";
import GithubSlugger from "github-slugger";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

function createMarked() {
  const slugger = new GithubSlugger();
  const renderer = {
    heading({ tokens, depth, text }) {
      const inner = this.parser ? this.parser.parseInline(tokens) : text;
      const plain = String(text || "").replace(/<[^>]+>/g, "");
      const id = slugger.slug(plain);
      return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
    },
    image({ href, title, text }) {
      const safeHref = String(href || "");
      const alt = String(text || "");
      const titleAttr = title ? ` title="${title}"` : "";
      return `<img src="${safeHref}" alt="${alt}"${titleAttr} loading="lazy" />`;
    },
  };
  return new Marked({ gfm: true, breaks: false }, { renderer });
}

function listFiles() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
}

function readPostFile(filename) {
  const slugFromFile = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const slug = (data.slug || slugFromFile).toString();

  const wordCount =
    data.wordCount ||
    content
      .replace(/```[\s\S]*?```/g, "")
      .replace(/[#>*_`~\-]/g, " ")
      .split(/\s+/)
      .filter(Boolean).length;

  const readingTime = data.readingTime || Math.max(1, Math.ceil(wordCount / 220));

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    coverImage: data.coverImage || "/logo.webp",
    ogImage: data.ogImage || data.coverImage || "/logo.webp",
    category: data.category || "Insights",
    tags: Array.isArray(data.tags) ? data.tags : [],
    date: data.date || null,
    lastModified: data.lastModified || data.date || null,
    status: data.status || "published",
    featured: !!data.featured,
    trending: !!data.trending,
    author: data.author || null,
    readingTime,
    wordCount,
    canonicalUrl: data.canonicalUrl || null,
    twitterCard: data.twitterCard || "summary_large_image",
    twitterCreator: data.twitterCreator || null,
    related: Array.isArray(data.related) ? data.related : [],
    prerequisites: Array.isArray(data.prerequisites) ? data.prerequisites : [],
    rawContent: content,
  };
}

export function getAllPosts() {
  const posts = listFiles()
    .map((f) => readPostFile(f))
    .filter((p) => p.status === "published")
    .sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    });

  return posts.map(({ rawContent, ...meta }) => meta);
}

export function getAllPostSlugs() {
  return getAllPosts().map((p) => p.slug);
}

export function getPostBySlug(slug) {
  const files = listFiles();
  for (const file of files) {
    const post = readPostFile(file);
    if (post.slug === slug && post.status === "published") {
      const md = createMarked();
      const html = md.parse(post.rawContent || "");
      const headings = extractHeadings(post.rawContent || "");
      const { rawContent, ...meta } = post;
      return { ...meta, html, headings };
    }
  }
  return null;
}

export function extractHeadings(markdown) {
  if (!markdown) return [];
  const local = new GithubSlugger();
  const lines = markdown.split("\n");
  const result = [];
  let inCodeBlock = false;

  for (const line of lines) {
    if (/^```/.test(line)) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;
    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;
    const level = match[1].length;
    const text = match[2].replace(/`/g, "").trim();
    const slug = local.slug(text);
    result.push({ level, text, slug });
  }
  return result;
}

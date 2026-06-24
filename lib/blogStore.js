// lib/blogStore.js
//
// One interface, two backends. The blog-management UI talks only to this module
// and never knows where posts physically live:
//
//   • LOCAL mode  (no GITHUB_TOKEN)  → reads/writes content/blog/*.md and
//     public/blog/** directly on disk. Instant; perfect for local testing.
//   • GITHUB mode (GITHUB_TOKEN set) → reads via the GitHub API and publishes
//     each save as a single commit, which the CI/CD pipeline auto-deploys.
//
// The public website is unaffected — it keeps reading the deployed filesystem
// through service/blog.js. This module is the *authoring* path only.

import fs from "node:fs";
import path from "node:path";
import { buildMarkdown, parseMarkdown } from "@/lib/blogSerialize";
import {
  commitFiles,
  listBlogDir,
  getFile,
  deleteFile,
} from "@/lib/githubCommit";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");
const PUBLIC_DIR = path.join(process.cwd(), "public");

export function storageMode() {
  return process.env.GITHUB_TOKEN ? "github" : "local";
}

function stripDataUrl(b64) {
  const i = String(b64 || "").indexOf("base64,");
  return i === -1 ? b64 : b64.slice(i + "base64,".length);
}

function summarize(slug, filename, md) {
  const { metadata } = parseMarkdown(md);
  return {
    slug: metadata.slug || slug,
    filename,
    title: metadata.title || slug,
    description: metadata.description || "",
    status: metadata.status || "draft",
    category: metadata.category || "",
    date: metadata.date || "",
    coverImage: metadata.coverImage || "",
    author: metadata.author?.name || "",
  };
}

// ── LIST ────────────────────────────────────────────────────────────────────
export async function listPosts() {
  if (storageMode() === "github") {
    const files = await listBlogDir();
    const out = [];
    for (const f of files) {
      const file = await getFile(f.path);
      if (file) out.push(summarize(f.name.replace(/\.md$/, ""), f.name, file.content));
    }
    return sortPosts(out);
  }
  // local
  if (!fs.existsSync(POSTS_DIR)) return [];
  const out = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const md = fs.readFileSync(path.join(POSTS_DIR, f), "utf8");
      return summarize(f.replace(/\.md$/, ""), f, md);
    });
  return sortPosts(out);
}

function sortPosts(list) {
  return list.sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    return db - da;
  });
}

// ── GET ONE ─────────────────────────────────────────────────────────────────
export async function getPost(slug) {
  if (storageMode() === "github") {
    const files = await listBlogDir();
    for (const f of files) {
      const file = await getFile(f.path);
      if (!file) continue;
      const parsed = parseMarkdown(file.content);
      const fileSlug = parsed.metadata.slug || f.name.replace(/\.md$/, "");
      if (fileSlug === slug) {
        return { ...parsed, slug: fileSlug, filename: f.name };
      }
    }
    return null;
  }
  // local
  if (!fs.existsSync(POSTS_DIR)) return null;
  for (const f of fs.readdirSync(POSTS_DIR)) {
    if (!f.endsWith(".md")) continue;
    const md = fs.readFileSync(path.join(POSTS_DIR, f), "utf8");
    const parsed = parseMarkdown(md);
    const fileSlug = parsed.metadata.slug || f.replace(/\.md$/, "");
    if (fileSlug === slug) {
      return { ...parsed, slug: fileSlug, filename: f };
    }
  }
  return null;
}

// ── SAVE ────────────────────────────────────────────────────────────────────
/**
 * @param {Object} opts
 * @param {Object} opts.metadata           editor metadata (includes slug)
 * @param {string} opts.body               Markdown body
 * @param {Array<{path:string, base64:string}>} [opts.images]  paths relative to public/
 * @param {string} [opts.originalSlug]     previous slug when renaming an edit
 * @returns {Promise<{mode:string, slug:string, commit?:string, url?:string}>}
 */
export async function savePost({ metadata, body, images = [], originalSlug }) {
  const slug = metadata.slug;
  const md = buildMarkdown(metadata, body);
  const mdRepoPath = `content/blog/${slug}.md`;
  const renamed = originalSlug && originalSlug !== slug;

  if (storageMode() === "github") {
    const files = [{ path: mdRepoPath, content: md, encoding: "utf-8" }];
    for (const img of images) {
      files.push({
        path: `public/${img.path}`,
        content: stripDataUrl(img.base64),
        encoding: "base64",
      });
    }
    const res = await commitFiles({
      message: `blog: ${metadata.status === "published" ? "publish" : "save draft"} "${metadata.title}"`,
      files,
    });
    if (renamed) {
      await deleteFile(`content/blog/${originalSlug}.md`, `blog: rename ${originalSlug} → ${slug}`).catch(
        () => {}
      );
    }
    return { mode: "github", slug, commit: res.commit, url: res.url };
  }

  // local
  fs.mkdirSync(POSTS_DIR, { recursive: true });
  fs.writeFileSync(path.join(POSTS_DIR, `${slug}.md`), md, "utf8");
  for (const img of images) {
    const dest = path.join(PUBLIC_DIR, img.path);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, Buffer.from(stripDataUrl(img.base64), "base64"));
  }
  if (renamed) {
    const oldFile = path.join(POSTS_DIR, `${originalSlug}.md`);
    if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);
  }
  return { mode: "local", slug };
}

// ── DELETE ──────────────────────────────────────────────────────────────────
export async function deletePost(slug) {
  if (storageMode() === "github") {
    await deleteFile(`content/blog/${slug}.md`, `blog: delete "${slug}"`);
    return { mode: "github", slug };
  }
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (fs.existsSync(file)) fs.unlinkSync(file);
  return { mode: "local", slug };
}

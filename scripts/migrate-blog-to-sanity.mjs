// Migration script: Azure Blob (markdown) → Sanity (Portable Text)
// Usage: node scripts/migrate-blog-to-sanity.mjs
//
// Required env vars (load from .env.local + .env via --env-file or dotenv):
//   AZURE_STORAGE_CONNECTION_STRING
//   NEXT_PUBLIC_SANITY_PROJECT_ID
//   NEXT_PUBLIC_SANITY_DATASET (default: production)
//   SANITY_API_TOKEN  (write-access token from sanity.io/manage → API → Tokens)

import "dotenv/config";
import { BlobServiceClient } from "@azure/storage-blob";
import { createClient } from "@sanity/client";
import matter from "gray-matter";
import { JSDOM } from "jsdom";
import { Schema } from "@sanity/schema";
import { htmlToBlocks } from "@sanity/block-tools";
import { marked } from "marked";
import crypto from "node:crypto";

const {
  AZURE_STORAGE_CONNECTION_STRING,
  NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET = "production",
  SANITY_API_TOKEN,
} = process.env;

if (!AZURE_STORAGE_CONNECTION_STRING) {
  console.error("Missing AZURE_STORAGE_CONNECTION_STRING");
  process.exit(1);
}
if (!NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  process.exit(1);
}
if (!SANITY_API_TOKEN) {
  console.error(
    "Missing SANITY_API_TOKEN — create at sanity.io/manage → API → Tokens (Editor)"
  );
  process.exit(1);
}

const sanity = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-10-01",
  token: SANITY_API_TOKEN,
  useCdn: false,
});

const blockContentSchema = {
  name: "blockContent",
  type: "array",
  of: [
    { type: "block" },
    { type: "image" },
  ],
};

const compiledSchema = Schema.compile({
  name: "default",
  types: [
    {
      name: "post",
      type: "document",
      fields: [{ name: "content", type: "blockContent" }],
    },
    blockContentSchema,
  ],
});

const blockContentType = compiledSchema
  .get("post")
  .fields.find((f) => f.name === "content").type;

async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
}

function normalizeUrl(url) {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `https://www.scougalrubber.com${url}`;
  return null;
}

async function uploadImageFromUrl(rawUrl, filename) {
  const url = normalizeUrl(rawUrl);
  if (!url) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`  ⚠ Image fetch failed (${res.status}): ${url}`);
      return null;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    const asset = await sanity.assets.upload("image", buffer, {
      filename: filename || url.split("/").pop()?.split("?")[0] || "image",
    });
    return asset._id;
  } catch (err) {
    console.warn(`  ⚠ Image upload failed for ${url}: ${err.message}`);
    return null;
  }
}

function htmlToPortableText(html) {
  const dom = new JSDOM(`<!doctype html><html><body>${html}</body></html>`);
  return htmlToBlocks(dom.window.document.body.innerHTML, blockContentType, {
    parseHtml: (h) => new JSDOM(h).window.document,
    rules: [
      {
        deserialize(el, next, block) {
          if (el.tagName?.toLowerCase() === "img") {
            return block({
              _type: "image",
              _sanityAsset: `image@${el.getAttribute("src")}`,
              alt: el.getAttribute("alt") || "",
            });
          }
          return undefined;
        },
      },
    ],
  });
}

async function resolveInlineImagesInBlocks(blocks) {
  const out = [];
  for (const block of blocks) {
    if (block._type === "image" && block._sanityAsset) {
      const url = block._sanityAsset.replace(/^image@/, "");
      const assetId = await uploadImageFromUrl(url);
      if (assetId) {
        out.push({
          _type: "image",
          _key: crypto.randomBytes(6).toString("hex"),
          asset: { _type: "reference", _ref: assetId },
          alt: block.alt || "",
        });
      } else {
        // skip broken image
      }
    } else {
      out.push({
        ...block,
        _key: block._key || crypto.randomBytes(6).toString("hex"),
        ...(block.children
          ? {
              children: block.children.map((c) => ({
                ...c,
                _key: c._key || crypto.randomBytes(6).toString("hex"),
              })),
            }
          : {}),
      });
    }
  }
  return out;
}

function slugify(s) {
  return (s || "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 96);
}

async function migrateOne(blobName, mdContent) {
  const slug = blobName.replace(/\.md$/, "");
  const { data: fm, content: markdown } = matter(mdContent);

  console.log(`\n→ ${slug}`);

  // 1. Convert markdown to HTML
  const html = marked.parse(markdown || "", { mangle: false, headerIds: false });

  // 2. HTML → Portable Text blocks (with image placeholders)
  const rawBlocks = htmlToPortableText(html);

  // 3. Upload inline images, resolve references
  const blocks = await resolveInlineImagesInBlocks(rawBlocks);

  // 4. Upload cover image
  let coverImageRef = null;
  if (fm.coverImage) {
    const id = await uploadImageFromUrl(
      fm.coverImage,
      `${slug}-cover`
    );
    if (id) {
      coverImageRef = {
        _type: "image",
        asset: { _type: "reference", _ref: id },
        alt: fm.title || slug,
      };
    }
  }

  // 5. Upload OG image (if different)
  let ogImageRef = null;
  if (fm.ogImage && fm.ogImage !== fm.coverImage) {
    const id = await uploadImageFromUrl(fm.ogImage, `${slug}-og`);
    if (id) {
      ogImageRef = {
        _type: "image",
        asset: { _type: "reference", _ref: id },
      };
    }
  }

  // 6. Upload author avatar
  let authorAvatarRef = null;
  if (fm.author?.avatar) {
    const id = await uploadImageFromUrl(
      fm.author.avatar,
      `${slug}-author-avatar`
    );
    if (id) {
      authorAvatarRef = {
        _type: "image",
        asset: { _type: "reference", _ref: id },
      };
    }
  }

  const doc = {
    _id: `post-${slugify(slug)}`,
    _type: "post",
    title: fm.title || slug,
    slug: { _type: "slug", current: slugify(slug) },
    description: fm.description || "",
    ...(coverImageRef ? { coverImage: coverImageRef } : {}),
    ...(ogImageRef ? { ogImage: ogImageRef } : {}),
    category: fm.category || undefined,
    date: fm.date
      ? new Date(fm.date).toISOString()
      : new Date().toISOString(),
    readingTime: fm.readingTime || undefined,
    metaTitle: fm.metaTitle || undefined,
    metaDescription: fm.metaDescription || undefined,
    status:
      fm.status === "draft" || fm.status === "published"
        ? fm.status
        : "published",
    content: blocks,
    ...(fm.author
      ? {
          author: {
            name: fm.author.name || "Scougal Rubber",
            title: fm.author.title || "",
            ...(authorAvatarRef ? { avatar: authorAvatarRef } : {}),
          },
        }
      : {}),
  };

  await sanity.createOrReplace(doc);
  console.log(`  ✓ migrated`);
}

async function main() {
  console.log("Connecting to Azure Blob…");
  const blobService = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );
  const container = blobService.getContainerClient("posts");

  console.log("Listing markdown blobs…");
  const blobs = [];
  for await (const blob of container.listBlobsFlat()) {
    if (blob.name.endsWith(".md")) blobs.push(blob.name);
  }
  console.log(`Found ${blobs.length} markdown post(s)\n`);

  for (const name of blobs) {
    try {
      const client = container.getBlockBlobClient(name);
      const dl = await client.download(0);
      const buf = await streamToBuffer(dl.readableStreamBody);
      await migrateOne(name, buf.toString("utf-8"));
    } catch (err) {
      console.error(`✗ ${name}: ${err.message}`);
    }
  }

  console.log(`\n✅ Migration complete. ${blobs.length} posts processed.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

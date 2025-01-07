// lib/postsAzure.js
import { BlobServiceClient } from "@azure/storage-blob";
import matter from "gray-matter";

export async function getAllPosts() {
  try {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (!connectionString) {
      throw new Error("Missing AZURE_STORAGE_CONNECTION_STRING");
    }

    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient("posts");

    // On liste tous les blobs .md
    const posts = [];
    let count = 0;
    for await (const blob of containerClient.listBlobsFlat()) {
      count++;
      if (!blob.name.endsWith(".md")) continue;

      // Télécharge le contenu de ce blob
      const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
      const downloadRes = await blockBlobClient.download(0);
      const buf = await streamToBuffer(downloadRes.readableStreamBody);
      const mdContent = buf.toString("utf-8");

      // On parse le frontmatter
      const { data: frontmatter } = matter(mdContent);

      // On enlève ".md" si besoin
      const slug = blob.name.replace(/\.md$/, "");

      // On push un objet "Post"
      posts.push({
        slug,
        ...frontmatter,
      });
    }

    // Trier par date si nécessaire
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    return posts;
  } catch (err) {
    console.error("getAllPosts error:", err);
    return [];
  }
}

export async function getPostBySlug(slug) {
  try {
    const fileSlug = slug.endsWith(".md") ? slug : slug + ".md";
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (!connectionString) {
      throw new Error("Missing AZURE_STORAGE_CONNECTION_STRING");
    }

    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient("posts");

    // Télécharge le blob correspondant
    const blockBlobClient = containerClient.getBlockBlobClient(fileSlug);
    const exists = await blockBlobClient.exists();
    if (!exists) {
      console.error("Blob not found:", fileSlug);
      return null;
    }

    const downloadRes = await blockBlobClient.download(0);
    const buf = await streamToBuffer(downloadRes.readableStreamBody);
    const mdContent = buf.toString("utf-8");

    // Parse
    const { data: frontmatter, content } = matter(mdContent);

    // Renvoie un objet complet
    return {
      slug,
      ...frontmatter,
      content,
    };
  } catch (err) {
    console.error("getPostBySlug error:", err);
    return null;
  }
}

// Petit helper pour convertir un ReadableStream en Buffer
async function streamToBuffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

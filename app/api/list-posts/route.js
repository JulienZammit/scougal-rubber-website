import { NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";
import matter from "gray-matter";

export async function GET() {
  try {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (!connectionString) {
      return NextResponse.json({ files: [] });
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient("posts");
    const exists = await containerClient.exists();
    if (!exists) {
      return NextResponse.json({ files: [] });
    }

    const files = [];

    for await (const blob of containerClient.listBlobsFlat()) {
      if (!blob.name.endsWith(".md")) continue;

      // Optionally parse front matter to get status, etc.
      const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
      const downloadResponse = await blockBlobClient.download(0);
      const buffer = await streamToBuffer(downloadResponse.readableStreamBody);
      const content = buffer.toString("utf8");

      const { data } = matter(content);
      files.push({
        name: blob.name,
        slug: data.slug || blob.name.replace(".md", ""),
        title: data.title || "",
        description: data.description || "",
        category: data.category || "",
        coverImage: data.coverImage || "",
        ogImage: data.ogImage || "",
        date: data.date || "",
        lastModified: data.lastModified || "",
        status: data.status || "draft",
        featured: data.featured || false,
        trending: data.trending || false
        // etc. if needed
      });
    }

    return NextResponse.json({ files });
  } catch (err) {
    console.error("list-posts error:", err);
    return NextResponse.json({ files: [] }, { status: 500 });
  }
}

async function streamToBuffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

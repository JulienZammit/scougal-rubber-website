import { NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";
import matter from "gray-matter";

export async function GET() {
  try {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (!connectionString) {
      return NextResponse.json({ categories: [] });
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient("posts");

    // If container doesn't exist, return empty
    const exists = await containerClient.exists();
    if (!exists) {
      return NextResponse.json({ categories: [] });
    }

    const categorySet = new Set();

    // list all .md blobs
    for await (const blob of containerClient.listBlobsFlat()) {
      if (!blob.name.endsWith(".md")) continue;

      const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
      // Download to buffer
      const downloadResponse = await blockBlobClient.download(0);
      const downloaded = await streamToBuffer(downloadResponse.readableStreamBody);
      const content = downloaded.toString("utf8");

      // parse with gray-matter
      const { data } = matter(content);
      if (data.category) {
        categorySet.add(data.category);
      }
    }

    return NextResponse.json({ categories: Array.from(categorySet) });
  } catch (err) {
    console.error("list-categories error:", err);
    return NextResponse.json({ categories: [] });
  }
}

// Helper function
async function streamToBuffer(readableStream) {
  const chunks = [];
  for await (const chunk of readableStream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

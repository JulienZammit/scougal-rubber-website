import { NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";
import matter from "gray-matter";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (!connectionString) {
      return NextResponse.json({ error: "No connection string" }, { status: 500 });
    }

    // Connect to Blob
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient("posts");

    // For the .md name
    const fileName = slug.endsWith(".md") ? slug : slug + ".md";
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    const exists = await blockBlobClient.exists();
    if (!exists) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Download
    const downloadRes = await blockBlobClient.download(0);
    const buffer = await streamToBuffer(downloadRes.readableStreamBody);
    const content = buffer.toString("utf8");

    // parse front matter with gray-matter
    const { data, content: md } = matter(content);

    // Return frontmatter + raw content
    return NextResponse.json({
      slug,
      frontmatter: data,
      content: md
    });
  } catch (err) {
    console.error("get-post error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

async function streamToBuffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

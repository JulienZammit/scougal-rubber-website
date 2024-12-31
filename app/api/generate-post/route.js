import { NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";
import { randomUUID } from "crypto";

export async function POST(request) {
  try {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (!connectionString) {
      return NextResponse.json({ error: "Missing AZURE_STORAGE_CONNECTION_STRING" }, { status: 500 });
    }

    const data = await request.json();
    const metadata = data.metadata;
    const blocks = data.blocks;

    // Build frontmatter
    const lines = [];
    lines.push("---");
    lines.push(`# SEO Metadata`);
    lines.push(`title: "${metadata.title}"`);
    lines.push(`description: "${metadata.description}"`);
    lines.push(`slug: "${metadata.slug}"`);
    lines.push(`canonicalUrl: "${metadata.canonicalUrl}"`);
    lines.push(`coverImage: "${metadata.coverImage}"`);
    lines.push("");
    lines.push("# Social Sharing");
    lines.push(`ogImage: "${metadata.ogImage}"`);
    lines.push("");
    lines.push("# Content Organization");
    lines.push(`category: "${metadata.category}"`);

    // tags
    const tagArr = metadata.tags?.split(",").map((t) => t.trim()) || [];
    lines.push("tags:");
    tagArr.forEach((t) => {
      if (t) lines.push(`  - ${t}`);
    });

    lines.push("");
    lines.push("# Publication Info");
    lines.push(`date: "${metadata.date}"`);
    lines.push(`lastModified: "${metadata.lastModified}"`);
    lines.push(`status: "${metadata.status}"`);
    lines.push(`featured: ${metadata.featured ? "true" : "false"}`);
    lines.push(`trending: ${metadata.trending ? "true" : "false"}`);
    lines.push("");
    lines.push("# Author Information");
    lines.push("author:");
    lines.push(`  name: "${metadata.authorName}"`);
    lines.push(`  title: "${metadata.authorTitle}"`);
    lines.push(`  bio: "${metadata.authorBio}"`);
    lines.push(`  avatar: "${metadata.authorAvatar}"`);
    lines.push("");
    lines.push("# Content Metrics");
    lines.push(`readingTime: ${metadata.readingTime || 0}`);
    lines.push("");
    lines.push("# Related Content");
    lines.push("related:");
    lines.push("");
    lines.push("# Additional Metadata");
    lines.push("prerequisites:");
    (metadata.prerequisites || "").split(",").forEach((p) => {
      if (p.trim()) lines.push(`  - "${p.trim()}"`);
    });
    lines.push("---");
    lines.push("");

    // Build the content from blocks
    for (const block of blocks) {
      if (block.type === "h1") lines.push(`# ${block.text}\n`);
      else if (block.type === "h2") lines.push(`## ${block.text}\n`);
      else if (block.type === "h3") lines.push(`### ${block.text}\n`);
      else if (block.type === "text") lines.push(`${block.text}\n`);
      else if (block.type === "image") {
        lines.push(`![${block.alt || "image"}](${block.url})\n`);
      }
    }

    const finalStr = lines.join("\n");

    // Upload to Azure
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient("posts");
    await containerClient.createIfNotExists();

    let slugFile = metadata.slug?.trim() || `post-${Date.now()}`;
    if (!slugFile.endsWith(".md")) slugFile += ".md";

    const blockBlobClient = containerClient.getBlockBlobClient(slugFile);
    await blockBlobClient.uploadData(Buffer.from(finalStr, "utf8"), {
      blobHTTPHeaders: { blobContentType: "text/markdown" },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Generate post error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

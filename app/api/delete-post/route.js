import { NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";
import matter from "gray-matter";

// IMPORT NextAuth
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export async function POST(request) {
  // 1) Vérifier la session
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { filename } = await request.json();

    if (!filename) {
      console.error("[delete-post] No filename provided in JSON body.");
      return NextResponse.json({ error: "No filename" }, { status: 400 });
    }

    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (!connectionString) {
      console.error("[delete-post] Missing AZURE_STORAGE_CONNECTION_STRING");
      return NextResponse.json(
        { error: "Missing AZURE_STORAGE_CONNECTION_STRING" },
        { status: 500 }
      );
    }

    // 1) Determine the slug (strip ".md" if present)
    let slug = filename.replace(".md", "");

    // 2) Connect to 'posts' container
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const postsContainer = blobServiceClient.getContainerClient("posts");
    await postsContainer.createIfNotExists();

    const finalName = filename.endsWith(".md") ? filename : filename + ".md";

    const postBlobClient = postsContainer.getBlockBlobClient(finalName);
    const exists = await postBlobClient.exists();
    if (!exists) {
      console.error("[delete-post] Post file does NOT exist:", finalName);
      return NextResponse.json({ error: "File does not exist" }, { status: 404 });
    }

    const downloadRes = await postBlobClient.download(0);
    const fileBuffer = await streamToBuffer(downloadRes.readableStreamBody);
    const mdContent = fileBuffer.toString("utf8");

    // 3) Parse with gray-matter
    const { data: frontmatter, content } = matter(mdContent);

    // 4) Extract image URLs from the content
    const imageRegex = /!\[[^\]]*\]\(([^)]+)\)/g;
    const matches = [...content.matchAll(imageRegex)];
    const imageUrls = matches.map((m) => m[1]);

    // 5) Also check frontmatter for coverImage & ogImage
    if (frontmatter.coverImage) {
      imageUrls.push(frontmatter.coverImage);
    }
    if (frontmatter.ogImage) {
      imageUrls.push(frontmatter.ogImage);
    }

    // 6) Delete from 'images' container
    const imagesContainer = blobServiceClient.getContainerClient("images");
    await imagesContainer.createIfNotExists();

    // E.g. your domain: "myblogimages.blob.core.windows.net"
    const imagesDomain = process.env.IMAGE_DOMAIN || "myblogimages.blob.core.windows.net";

    for (const url of imageUrls) {
      if (url.includes(imagesDomain)) {
        const parts = url.split("/");
        const blobName = parts[parts.length - 1];

        try {
          const imageBlobClient = imagesContainer.getBlockBlobClient(blobName);
          const delImageRes = await imageBlobClient.deleteIfExists();
        } catch (err) {
          console.error("[delete-post] Error removing image blob:", blobName, err);
        }
      }
    }

    // 7) Finally, remove the .md from 'posts'
    const delRes = await postBlobClient.deleteIfExists();
    if (!delRes.succeeded) {
      console.error("[delete-post] Could not delete post:", finalName);
      return NextResponse.json(
        { error: "File does not exist or cannot be deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[delete-post] Unhandled error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

async function streamToBuffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(chunk);
  }
  const finalBuf = Buffer.concat(chunks);
  return finalBuf;
}

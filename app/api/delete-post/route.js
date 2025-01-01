import { NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";
import matter from "gray-matter";

export async function POST(request) {
  console.log("[delete-post] Start");
  try {
    const { filename } = await request.json();
    console.log("[delete-post] Received filename:", filename);

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
    console.log("[delete-post] Derived slug:", slug);

    // 2) Connect to 'posts' container
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const postsContainer = blobServiceClient.getContainerClient("posts");
    await postsContainer.createIfNotExists();

    const finalName = filename.endsWith(".md") ? filename : filename + ".md";
    console.log("[delete-post] Checking existence of .md in 'posts':", finalName);

    const postBlobClient = postsContainer.getBlockBlobClient(finalName);
    const exists = await postBlobClient.exists();
    if (!exists) {
      console.error("[delete-post] Post file does NOT exist:", finalName);
      return NextResponse.json({ error: "File does not exist" }, { status: 404 });
    }

    console.log("[delete-post] Post file exists, proceeding to download...");
    const downloadRes = await postBlobClient.download(0);
    const fileBuffer = await streamToBuffer(downloadRes.readableStreamBody);
    const mdContent = fileBuffer.toString("utf8");
    console.log("[delete-post] Downloaded content length:", mdContent.length);

    // 3) Parse with gray-matter
    const { data: frontmatter, content } = matter(mdContent);
    console.log(
      "[delete-post] Parsed frontmatter keys:",
      Object.keys(frontmatter || {})
    );
    console.log("[delete-post] Frontmatter:", frontmatter);
    console.log("[delete-post] Content:", content);

    // 4) Extract image URLs from the content
    const imageRegex = /!\[[^\]]*\]\(([^)]+)\)/g;
    const matches = [...content.matchAll(imageRegex)];
    const imageUrls = matches.map((m) => m[1]);
    console.log("[delete-post] Found image URLs in content:", imageUrls);

    // 5) Also check frontmatter for coverImage & ogImage
    //    so that images from metadata are also deleted
    if (frontmatter.coverImage) {
      console.log("[delete-post] Adding frontmatter.coverImage:", frontmatter.coverImage);
      imageUrls.push(frontmatter.coverImage);
    }
    if (frontmatter.ogImage) {
      console.log("[delete-post] Adding frontmatter.ogImage:", frontmatter.ogImage);
      imageUrls.push(frontmatter.ogImage);
    }

    console.log("[delete-post] All image URLs to delete:", imageUrls);

    // 6) Delete from 'images' container
    const imagesContainer = blobServiceClient.getContainerClient("images");
    await imagesContainer.createIfNotExists();

    // E.g. your domain: "myblogimages.blob.core.windows.net"
    const imagesDomain = process.env.IMAGE_DOMAIN || "myblogimages.blob.core.windows.net";

    for (const url of imageUrls) {
      console.log("[delete-post] Checking image URL:", url);
      if (url.includes(imagesDomain)) {
        const parts = url.split("/");
        const blobName = parts[parts.length - 1];
        console.log("[delete-post] Attempting to delete image blob:", blobName);

        try {
          const imageBlobClient = imagesContainer.getBlockBlobClient(blobName);
          const delImageRes = await imageBlobClient.deleteIfExists();
          if (delImageRes.succeeded) {
            console.log("[delete-post] Successfully deleted image blob:", blobName);
          } else {
            console.warn("[delete-post] Image not found or already removed:", blobName);
          }
        } catch (err) {
          console.error("[delete-post] Error removing image blob:", blobName, err);
        }
      } else {
        console.log("[delete-post] This URL does not match images domain, skipping:", url);
      }
    }

    // 7) Finally, remove the .md from 'posts'
    console.log("[delete-post] Deleting post .md now:", finalName);
    const delRes = await postBlobClient.deleteIfExists();
    if (!delRes.succeeded) {
      console.error("[delete-post] Could not delete post:", finalName);
      return NextResponse.json(
        { error: "File does not exist or cannot be deleted" },
        { status: 404 }
      );
    }
    console.log("[delete-post] Successfully deleted post file:", finalName);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[delete-post] Unhandled error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

async function streamToBuffer(readable) {
  console.log("[delete-post] streamToBuffer start");
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(chunk);
  }
  const finalBuf = Buffer.concat(chunks);
  console.log("[delete-post] streamToBuffer done. Buffer size:", finalBuf.length);
  return finalBuf;
}

import { NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";
import { randomUUID } from "crypto";
import matter from "gray-matter";

/**
 * Petit utilitaire pour lire un stream en entier et le transformer en Buffer
 */
async function streamToBuffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

/**
 * Extrait toutes les URLs d'images présentes dans le frontmatter et le contenu Markdown
 *
 * @param {string} mdContent - Contenu complet du fichier .md (incluant le frontmatter).
 * @returns {Array<string>} - Tableau de toutes les URLs d'images trouvées.
 */
function extractImageUrls(mdContent) {
  // 1) Parse frontmatter + contenu
  const { data: frontmatter, content } = matter(mdContent);

  // 2) Récupération des URLs via la syntaxe ![alt](url)
  const imageRegex = /!\[[^\]]*\]\(([^)]+)\)/g;
  const matches = [...content.matchAll(imageRegex)];
  const imageUrls = matches.map((m) => m[1]);

  // 3) Récupération des images frontmatter
  if (frontmatter.coverImage) {
    imageUrls.push(frontmatter.coverImage);
  }
  if (frontmatter.ogImage) {
    imageUrls.push(frontmatter.ogImage);
  }

  return imageUrls;
}

export async function POST(request) {
  try {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (!connectionString) {
      return NextResponse.json(
        { error: "Missing AZURE_STORAGE_CONNECTION_STRING" },
        { status: 500 }
      );
    }

    const data = await request.json();
    const metadata = data.metadata;
    const blocks = data.blocks;

    // ---------------------------------------------------------
    // 1) Vérifier s'il existe déjà un .md avec ce slug
    //    Si oui, on récupère les anciennes URLs pour pouvoir
    //    supprimer les images qui ne sont plus utilisées
    // ---------------------------------------------------------
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient("posts");
    await containerClient.createIfNotExists();

    let slugFile = metadata.slug?.trim() || `post-${Date.now()}`;
    if (!slugFile.endsWith(".md")) slugFile += ".md";

    const blockBlobClient = containerClient.getBlockBlobClient(slugFile);

    let oldImages = [];
    const exists = await blockBlobClient.exists();
    if (exists) {
      // Le post existe déjà -> on va le télécharger, parser les images,
      // et ainsi détecter celles à supprimer si plus utilisées.
      const downloadResponse = await blockBlobClient.download(0);
      const fileBuffer = await streamToBuffer(downloadResponse.readableStreamBody);
      const oldMdContent = fileBuffer.toString("utf8");
      oldImages = extractImageUrls(oldMdContent);
    }

    // ---------------------------------------------------------
    // 2) Construire la nouvelle string en Markdown
    // ---------------------------------------------------------
    const lines = [];
    lines.push("---");
    lines.push(`# SEO Metadata`);
    lines.push(`title: "${metadata.title || ""}"`);
    lines.push(`description: "${metadata.description || ""}"`);
    lines.push(`slug: "${metadata.slug || ""}"`);
    lines.push(`canonicalUrl: "${metadata.canonicalUrl || ""}"`);
    lines.push(`coverImage: "${metadata.coverImage || ""}"`);
    lines.push("");
    lines.push("# Social Sharing");
    lines.push(`ogImage: "${metadata.ogImage || ""}"`);
    lines.push("");
    lines.push("# Content Organization");
    lines.push(`category: "${metadata.category || ""}"`);

    // tags
    const tagArr = metadata.tags?.split(",").map((t) => t.trim()) || [];
    lines.push("tags:");
    tagArr.forEach((t) => {
      if (t) lines.push(`  - ${t}`);
    });

    lines.push("");
    lines.push("# Publication Info");
    lines.push(`date: "${metadata.date || ""}"`);
    lines.push(`lastModified: "${metadata.lastModified || ""}"`);
    lines.push(`status: "${metadata.status || ""}"`);
    lines.push(`featured: ${metadata.featured ? "true" : "false"}`);
    lines.push(`trending: ${metadata.trending ? "true" : "false"}`);
    lines.push("");
    lines.push("# Author Information");
    lines.push("author:");
    lines.push(`  name: "${metadata.authorName || ""}"`);
    lines.push(`  title: "${metadata.authorTitle || ""}"`);
    lines.push(`  bio: "${metadata.authorBio || ""}"`);
    lines.push(`  avatar: "${metadata.authorAvatar || ""}"`);
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

    // Blocks
    for (const block of blocks) {
      if (block.type === "h1") lines.push(`# ${block.text}\n`);
      else if (block.type === "h2") lines.push(`## ${block.text}\n`);
      else if (block.type === "h3") lines.push(`### ${block.text}\n`);
      else if (block.type === "text") lines.push(`${block.text}\n`);
      else if (block.type === "image") {
        // insérer la balise Markdown
        lines.push(`![${block.alt || "image"}](${block.url})\n`);
      }
    }

    const finalStr = lines.join("\n");

    // ---------------------------------------------------------
    // 3) Extraire les nouvelles URLs du nouveau contenu
    // ---------------------------------------------------------
    const newImages = extractImageUrls(finalStr);

    // ---------------------------------------------------------
    // 4) Déterminer quelles images supprimer (dans oldImages,
    //    mais plus présentes dans newImages) ET qui appartiennent
    //    effectivement à notre container images
    // ---------------------------------------------------------
    const imagesDomain =
      process.env.IMAGE_DOMAIN || "myblogimages.blob.core.windows.net";
    const imagesToDelete = oldImages.filter(
      (oldUrl) =>
        // L'ancienne URL n'est plus utilisée
        !newImages.includes(oldUrl) &&
        // L'URL appartient bien à notre domaine d'images
        oldUrl.includes(imagesDomain)
    );

    // ---------------------------------------------------------
    // 5) Supprimer effectivement ces images du container "images"
    // ---------------------------------------------------------
    if (imagesToDelete.length > 0) {
      const imagesContainer = blobServiceClient.getContainerClient("images");
      await imagesContainer.createIfNotExists();

      for (const imgUrl of imagesToDelete) {
        try {
          // Récupérer le blobName (dernier segment après le '/')
          const parts = imgUrl.split("/");
          const blobName = parts[parts.length - 1];

          // Supprimer le blob si exists
          const imageBlobClient = imagesContainer.getBlockBlobClient(blobName);
          const delImageRes = await imageBlobClient.deleteIfExists();
          if (delImageRes.succeeded) {
            console.log("[generate-post] Deleted old image:", blobName);
          } else {
            console.warn("[generate-post] Old image not found or already removed:", blobName);
          }
        } catch (err) {
          console.error("[generate-post] Error removing old image:", imgUrl, err);
        }
      }
    }

    // ---------------------------------------------------------
    // 6) Uploader le nouveau contenu .md
    // ---------------------------------------------------------
    await blockBlobClient.uploadData(Buffer.from(finalStr, "utf8"), {
      blobHTTPHeaders: { blobContentType: "text/markdown" },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Generate post error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

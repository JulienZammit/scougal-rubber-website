"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import MetadataForm from "./MetadataForm";
import BlogContentBuilder from "./BlogContentBuilder";

/**
 * Single "Article Creation" UI with sub-tabs:
 *   - "metadata"
 *   - "content"
 *
 * We do final generation in handleGeneratePost, 
 * validating that user has required fields: title, slug, date, category.
 * Then uploading images & calling /api/generate-post.
 * On success, we redirect to tab=manage so user sees updated post list.
 */

export default function ArticleCreation({
  metadata,
  setMetadata,
  blocks,
  setBlocks,
}) {
  const router = useRouter();

  // subTab: 'metadata' or 'content'
  const [subTab, setSubTab] = useState("metadata");

  async function handleGeneratePost() {
    // 1) Basic validations
    if (!metadata.title?.trim()) {
      toast.error("Title is required");
      setSubTab("metadata");
      return;
    }
    if (!metadata.slug?.trim()) {
      toast.error("Slug is required");
      setSubTab("metadata");
      return;
    }
    if (!metadata.date?.trim()) {
      toast.error("Date is required");
      setSubTab("metadata");
      return;
    }
    if (!metadata.category?.trim()) {
      toast.error("Category is required");
      setSubTab("metadata");
      return;
    }
    // optionally check readingTime, etc.

    // must have at least one block
    if (!blocks || blocks.length === 0) {
      toast.error("No blog content! Add at least one block.");
      setSubTab("content");
      return;
    }

    // 2) Upload images (both blocks + metadata)
    try {
      // (A) blocks
      for (const block of blocks) {
        if (block.type === "image" && block._file) {
          const formData = new FormData();
          formData.append("file", block._file);

          const uploadRes = await fetch("/api/upload-image", {
            method: "POST",
            body: formData,
          });
          if (!uploadRes.ok) {
            toast.error("Error uploading a block image");
            return;
          }
          const uploadData = await uploadRes.json();
          if (uploadData.error) {
            toast.error("Block image upload error: " + uploadData.error);
            return;
          }
          block.url = uploadData.imageUrl; // replace local with azure
          block._file = null;
        }
      }

      // (B) metadata images
      if (metadata._coverFile) {
        const formData = new FormData();
        formData.append("file", metadata._coverFile);

        const res = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.error) {
          toast.error("Error uploading cover image: " + data.error);
          return;
        }
        metadata.coverImage = data.imageUrl;
        metadata._coverFile = null;
      }

      if (metadata._ogFile) {
        const formData = new FormData();
        formData.append("file", metadata._ogFile);

        const res = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.error) {
          toast.error("Error uploading OG image: " + data.error);
          return;
        }
        metadata.ogImage = data.imageUrl;
        metadata._ogFile = null;
      }
    } catch (err) {
      toast.error("Image upload error: " + err.message);
      return;
    }

    // 3) Now call /api/generate-post
    try {
      const payload = { metadata, blocks };
      const genRes = await fetch("/api/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!genRes.ok) {
        toast.error("Error generating post");
        return;
      }
      const result = await genRes.json();
      if (result.success) {
        toast.success("Post created/updated successfully");
        // redirect to manage
        router.push("/blog-management?tab=manage");
      } else {
        toast.error("Error generating post");
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Article Creation</h2>

      <div className="space-x-4 mb-6">
        <button
          onClick={() => setSubTab("metadata")}
          className={`px-3 py-1 rounded ${
            subTab === "metadata" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Metadata
        </button>
        <button
          onClick={() => setSubTab("content")}
          className={`px-3 py-1 rounded ${
            subTab === "content" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Blog Content
        </button>
      </div>

      <div style={{ display: subTab === "metadata" ? "block" : "none" }}>
        <MetadataForm metadata={metadata} setMetadata={setMetadata} />
      </div>

      <div style={{ display: subTab === "content" ? "block" : "none" }}>
        <BlogContentBuilder
          blocks={blocks}
          setBlocks={setBlocks}
          onGeneratePost={handleGeneratePost}
        />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import MetadataForm from "@/components/blog/MetadataForm";
import BlogContentBuilder from "@/components/blog/BlogContentBuilder";

export default function ArticleCreation({
  metadata,
  setMetadata,
  blocks,
  setBlocks,
}) {
  // Sub-tabs: "metadata" or "content"
  const [subTab, setSubTab] = useState("metadata");

  async function handleGeneratePost() {
    // 1) Basic validations
    const rt = Number(metadata.readingTime);
    if (rt < 0 || rt > 60) {
      toast.error("Reading Time must be between 0 and 60 minutes.");
      return;
    }
    if (!metadata.title?.trim()) {
      toast.error("Title (H1) is required");
      setSubTab("metadata");
      return;
    }
    if (!metadata.slug?.trim()) {
      toast.error("Slug is required");
      setSubTab("metadata");
      return;
    }
    if (!metadata.category?.trim()) {
      toast.error("Category is required");
      setSubTab("metadata");
      return;
    }
    if (!metadata.date?.trim()) {
      toast.error("Date is required");
      setSubTab("metadata");
      return;
    }
    if (!blocks || blocks.length === 0) {
      toast.error("Blog content is empty!");
      setSubTab("content");
      return;
    }

    // 2) Upload images for blocks and metadata
    try {
      // (A) Blocks
      for (const block of blocks) {
        if (block.type === "image" && block._file) {
          const formData = new FormData();
          formData.append("file", block._file);

          const uploadRes = await fetch("/api/upload-image", {
            method: "POST",
            body: formData,
          });
          if (!uploadRes.ok) {
            toast.error("Error uploading block image");
            return;
          }
          const uploadData = await uploadRes.json();
          if (uploadData.error) {
            toast.error("Upload error: " + uploadData.error);
            return;
          }
          // Replace local preview with Azure URL
          block.url = uploadData.imageUrl;
          block._file = null;
        }
      }

      // (B) Metadata images
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
      toast.error("Error uploading images: " + err.message);
      return;
    }

    // 3) Now call /api/generate-post
    try {
      const payload = { metadata, blocks };
      const res = await fetch("/api/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        toast.error("Error generating post");
        return;
      }
      const result = await res.json();
      if (result.success) {
        toast.success("Post generated (or updated) successfully");
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

      {/* Sub-navigation for "metadata" / "content" */}
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

      {/* Instead of conditional *unmount*, we always render but hide with display */}
      <div style={{ display: subTab === "metadata" ? "block" : "none" }}>
        <MetadataForm metadata={metadata} setMetadata={setMetadata} />
      </div>
      <div style={{ display: subTab === "content" ? "block" : "none" }}>
        <BlogContentBuilder
          blocks={blocks}
          setBlocks={setBlocks}
          onGeneratePost={handleGeneratePost}
          noMaxHeight
        />
      </div>
    </div>
  );
}

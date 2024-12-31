/* ------------------------------------------------------------------
   ArticleCreation.jsx
   This component has its own sub-nav:
     - "Metadata"
     - "Blog Content"
   All in one place, no max-h on the live preview.
------------------------------------------------------------------ */

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

  // The combined generate logic
  async function handleGeneratePost() {
    // Validate readingTime
    const rt = Number(metadata.readingTime);
    if (rt < 0 || rt > 60) {
      toast.error("Reading Time must be between 0 and 60 minutes.");
      return;
    }
    // required fields
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

      {subTab === "metadata" && (
        <MetadataForm metadata={metadata} setMetadata={setMetadata} />
      )}
      {subTab === "content" && (
        <BlogContentBuilder
          blocks={blocks}
          setBlocks={setBlocks}
          // We'll pass handleGeneratePost here so user can finalize from content tab
          onGeneratePost={handleGeneratePost}
          noMaxHeight
        />
      )}
    </div>
  );
}

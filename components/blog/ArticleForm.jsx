/* ------------------------------------------------------------------
   ArticleForm.jsx
   A single component that displays BOTH Metadata and Blog Content
   in one page. So the user can fill everything in one place.
   We'll keep a small local "toggle" or just stack them vertically.
------------------------------------------------------------------ */

"use client";
import MetadataForm from "@/components/blog/MetadataForm";
import BlogContentBuilder from "@/components/blog/BlogContentBuilder";
import { toast } from "react-toastify";

// We'll re-use your "generate post" logic, or pass it in from parent
// but let's do everything inside "ArticleForm" for clarity.

export default function ArticleForm({
  metadata,
  setMetadata,
  blocks,
  setBlocks,
}) {
  // We'll create a function "handleGeneratePost" here or call parent's

  async function handleGeneratePost() {
    // Basic validations
    const rt = Number(metadata.readingTime);
    if (rt < 0 || rt > 60) {
      toast.error("Reading Time must be between 0 and 60 minutes.");
      return;
    }

    if (!metadata.title?.trim()) {
      toast.error("Title (H1) is required");
      return;
    }
    if (!metadata.slug?.trim()) {
      toast.error("Slug is required");
      return;
    }
    if (!metadata.category?.trim()) {
      toast.error("Category is required");
      return;
    }
    if (!metadata.date?.trim()) {
      toast.error("Date is required");
      return;
    }

    if (!blocks || blocks.length === 0) {
      toast.error("Blog content is empty!");
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
      {/* We can stack them vertically or do a two-column layout. */}
      <h2 className="text-xl font-bold mb-4">Article Creation</h2>

      {/* 1) Metadata at the top */}
      <MetadataForm metadata={metadata} setMetadata={setMetadata} />

      <hr className="my-6" />

      {/* 2) Blog Content below */}
      <BlogContentBuilder
        blocks={blocks}
        setBlocks={setBlocks}
        onGeneratePost={handleGeneratePost} // We pass our combined generate
      />
    </div>
  );
}

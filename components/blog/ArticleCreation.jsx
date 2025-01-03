"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import MetadataForm from "./MetadataForm";
import BlogContentBuilder from "./BlogContentBuilder";
import { FileText, Settings2, PenTool } from "lucide-react";

/**
 * ArticleCreation:
 *  - "metadata" tab: sets up coverImage, ogImage, etc.
 *  - "content" tab: handles blocks, including image blocks with local previews.
 *
 * On "Generate Post", we validate the fields, then upload block images
 * (replacing blob: URLs with Azure URLs). Same for cover/og images.
 * Finally, we call /api/generate-post with the final data.
 */

export default function ArticleCreation({
  metadata,
  setMetadata,
  blocks,
  setBlocks,
}) {
  const router = useRouter();
  const [subTab, setSubTab] = useState("metadata");

  async function handleGeneratePost() {
    // 1) Validate fields
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
    if (!blocks || blocks.length === 0) {
      toast.error("No blog content! Add at least one block.");
      setSubTab("content");
      return;
    }

    // 2) Upload images in blocks + metadata
    try {
      // A) Blocks
      for (const block of blocks) {
        if (block.type === "image") {
          // If the user added an image block but never picked a file
          // and there's no existing 'url', we treat it as an error
          if (!block._file && !block.url) {
            toast.error(
              "Image block has no file. Please select a file or remove the image block."
            );
            return;
          }

          // If we have a file => upload it, then store the new Azure URL
          if (block._file) {
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
              toast.error("Block image upload error: " + uploadData.error);
              return;
            }
            block.url = uploadData.imageUrl;
            block._file = null; // clear file reference
          }
        }
      }

      // B) Metadata images (cover / og)
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

    // 3) Generate the .md post
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
        router.push("/blog-management?tab=manage");
      } else {
        toast.error("Error generating post");
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-200">
  <div className="p-6">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
      <FileText className="w-6 h-6 mr-2 text-gray-600" />
      Article Creation
    </h2>

    {/* Improved Sub-navigation */}
    <div className="flex space-x-2 mb-8 p-1 bg-gray-50 rounded-lg w-fit">
      <button
        onClick={() => setSubTab("metadata")}
        className={`
          px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
          ${subTab === "metadata" 
            ? "bg-white text-blue-600 shadow-sm ring-1 ring-gray-200"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }
        `}
      >
        <div className="flex items-center space-x-2">
          <Settings2 className="w-4 h-4" />
          <span>Metadata</span>
        </div>
      </button>
      <button
        onClick={() => setSubTab("content")}
        className={`
          px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
          ${subTab === "content"
            ? "bg-white text-blue-600 shadow-sm ring-1 ring-gray-200"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }
        `}
      >
        <div className="flex items-center space-x-2">
          <PenTool className="w-4 h-4" />
          <span>Blog Content</span>
        </div>
      </button>
    </div>

    {/* Content Container with smooth transitions */}
    <div className="relative">
      {subTab === "metadata" && (
        <div className="transition-all duration-200 animate-in fade-in">
          <MetadataForm metadata={metadata} setMetadata={setMetadata} />
        </div>
      )}

      {subTab === "content" && (
        <div className="transition-all duration-200 animate-in fade-in">
          <BlogContentBuilder
            blocks={blocks}
            setBlocks={setBlocks}
            onGeneratePost={handleGeneratePost}
          />
        </div>
      )}
    </div>
  </div>
</div>
  );
}

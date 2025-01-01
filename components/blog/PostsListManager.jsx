"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

/**
 * Utility function to parse raw markdown into blocks for generating.
 * If your /api/generate-post expects 'blocks', we need to replicate the logic
 * used in your existing code. This is a minimal example.
 */
function mdToBlocks(md) {
  const lines = md.split("\n");
  const blocksArray = [];
  let paragraph = [];

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      const text = paragraph.join("\n").trim();
      if (text) {
        blocksArray.push({ type: "text", text });
      }
      paragraph = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith("### ")) {
      flushParagraph();
      blocksArray.push({ type: "h3", text: line.slice(4) });
    } else if (line.startsWith("## ")) {
      flushParagraph();
      blocksArray.push({ type: "h2", text: line.slice(3) });
    } else if (line.startsWith("# ")) {
      flushParagraph();
      blocksArray.push({ type: "h1", text: line.slice(2) });
    } else if (line.trim().startsWith("![")) {
      flushParagraph();
      const match = line.match(/^!\[([^)]*)\]\(([^)]*)\)/);
      if (match) {
        blocksArray.push({
          type: "image",
          alt: match[1].trim() || "image",
          url: match[2].trim(),
        });
      }
    } else {
      // Accumulate into paragraph
      paragraph.push(line);
    }
  }
  flushParagraph();
  return blocksArray;
}

/**
 * Convert frontmatter (gray-matter style) => generate-post 'metadata' shape
 * You might also merge tags, date, author, etc. as needed.
 */
function frontmatterToMetadata(frontmatter, newStatus) {
  return {
    title: frontmatter.title || "",
    description: frontmatter.description || "",
    slug: frontmatter.slug || "",
    canonicalUrl: frontmatter.canonicalUrl || "",
    coverImage: frontmatter.coverImage || "",
    ogImage: frontmatter.ogImage || "",
    category: frontmatter.category || "",
    tags:
      Array.isArray(frontmatter.tags) ? frontmatter.tags.join(", ") : frontmatter.tags || "",
    date: frontmatter.date || "",
    lastModified: frontmatter.lastModified || "",
    status: newStatus, // <--- The only real override
    featured: !!frontmatter.featured,
    trending: !!frontmatter.trending,
    authorName: frontmatter.author?.name || "",
    authorTitle: frontmatter.author?.title || "",
    authorBio: frontmatter.author?.bio || "",
    authorAvatar: frontmatter.author?.avatar || "/employees/sn.jpg",
    readingTime: frontmatter.readingTime || 0,
    related: "", // or from frontmatter
    prerequisites: "", // or from frontmatter
  };
}

export default function PostsListManager({ onEditPost, onNewArticle }) {
  const [posts, setPosts] = useState([]);

  // For local filtering/sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // "all", "draft", "published"
  const [sortOrder, setSortOrder] = useState("desc"); // "asc" or "desc"

  useEffect(() => {
    fetchPosts();
  }, []);

  // -------------------------
  // Fetch all posts from /api/list-posts
  // -------------------------
  async function fetchPosts() {
    try {
      const res = await fetch("/api/list-posts");
      if (!res.ok) {
        toast.error("Error fetching posts");
        return;
      }
      const data = await res.json();
      setPosts(data.files || []);
    } catch (err) {
      console.error(err);
      toast.error("Network error fetching posts");
    }
  }

  // -------------------------
  // Delete Post
  // -------------------------
  async function handleDeletePost(filename) {
    if (!confirm(`Delete ${filename}?`)) return;
    try {
      const res = await fetch("/api/delete-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename }),
      });
      if (!res.ok) {
        const errData = await res.json();
        toast.error(errData.error || "Error deleting post");
        return;
      }
      toast.success("Post deleted");
      fetchPosts();
    } catch (err) {
      toast.error(err.message);
    }
  }

  // -------------------------
  // Toggle Publish/Unpublish
  // We do NOT overwrite the content with placeholder text.
  // Instead, we fetch the original .md, parse the blocks,
  // update only frontmatter.status => newStatus,
  // re-generate post with original blocks
  // -------------------------
  async function handleToggleStatus(post) {
    const newStatus = post.status === "published" ? "draft" : "published";

    try {
      // 1) Fetch the existing full content from /api/get-post?slug=post.slug
      //    We rely on post.slug or post.name if needed.
      const slug = post.slug || post.name.replace(".md", "");
      const getURL = `/api/get-post?slug=${encodeURIComponent(slug)}`;
      const getRes = await fetch(getURL);
      if (!getRes.ok) {
        const errMsg = await getRes.json();
        toast.error(errMsg.error || "Cannot fetch existing post");
        return;
      }
      const getData = await getRes.json();
      // getData = { slug, frontmatter, content }

      // 2) Convert frontmatter => new metadata with updated status
      const updatedMetadata = frontmatterToMetadata(getData.frontmatter, newStatus);

      // 3) Convert raw content => blocks
      //    so the re-generated post keeps the original text, images, etc.
      const blocks = mdToBlocks(getData.content);

      // 4) Call /api/generate-post with updated metadata + same blocks
      const payload = {
        metadata: updatedMetadata,
        blocks,
      };

      const genRes = await fetch("/api/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!genRes.ok) {
        toast.error("Error toggling status");
        return;
      }
      const result = await genRes.json();
      if (result.success) {
        toast.success(`Status changed to ${newStatus}`);
        fetchPosts();
      } else {
        toast.error("Error toggling status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to toggle status: " + err.message);
    }
  }

  // -------------------------
  // Local Searching/Filtering/Sorting
  // -------------------------
  function getFilteredAndSortedPosts() {
    let filtered = [...posts];

    // status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    // search filter by title or slug
    const term = searchTerm.toLowerCase();
    if (term) {
      filtered = filtered.filter(
        (p) =>
          p.title?.toLowerCase().includes(term) ||
          p.slug?.toLowerCase().includes(term)
      );
    }

    // sort by date
    filtered.sort((a, b) => {
      const ad = new Date(a.date).getTime();
      const bd = new Date(b.date).getTime();
      return sortOrder === "asc" ? ad - bd : bd - ad;
    });

    return filtered;
  }

  const displayedPosts = getFilteredAndSortedPosts();

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Manage Articles</h2>
        <button
          onClick={onNewArticle}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Create New
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Search by slug or title */}
        <div>
          <label className="block font-medium mb-1">Search</label>
          <input
            type="text"
            placeholder="Search by title or slug..."
            className="w-full border border-gray-300 px-2 py-1 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div>
          <label className="block font-medium mb-1">Filter by Status</label>
          <select
            className="w-full border border-gray-300 px-2 py-1 rounded"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Sort by date asc/desc */}
        <div>
          <label className="block font-medium mb-1">Sort by Date</label>
          <select
            className="w-full border border-gray-300 px-2 py-1 rounded"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      {!displayedPosts.length ? (
        <p>No matching posts found.</p>
      ) : (
        <ul className="space-y-2">
          {displayedPosts.map((post, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center border p-2 rounded"
            >
              <div>
                <span className="font-semibold mr-2">{post.name}</span>
                <span className="text-sm text-gray-600">
                  (Status: {post.status})
                </span>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleToggleStatus(post)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                >
                  {post.status === "published" ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => onEditPost?.(post)}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePost(post.name)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

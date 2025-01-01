"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

/**
 * Renders a list of posts from /api/list-posts,
 * with:
 *  - search, status filter, date sort
 *  - "Edit" => calls onEditPost(post)
 *  - "Create New" => calls onNewArticle()
 *  - "Toggle Publish" => fetch the real post => set status => re-generate
 *  - "Delete"
 */
export default function PostsListManager({ onEditPost, onNewArticle }) {
  const [posts, setPosts] = useState([]);

  // For searching/filtering/sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetchPosts();
  }, []);

  // 1) Fetch all posts
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
      toast.error("Network error fetching posts");
    }
  }

  // 2) handleDelete
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

  // 3) Toggle Publish
  // Instead of creating a "new" post, we fetch the existing content, 
  // set status = newStatus, then re-generate with the original content.
  async function handleToggleStatus(post) {
    const newStatus = post.status === "published" ? "draft" : "published";
    try {
      // a) fetch the existing post
      const getRes = await fetch(`/api/get-post?slug=${encodeURIComponent(post.slug)}`);
      if (!getRes.ok) {
        const errMsg = await getRes.json();
        toast.error(errMsg.error || "Cannot fetch existing post");
        return;
      }
      const { frontmatter, content } = await getRes.json();

      // b) update frontmatter
      frontmatter.status = newStatus;

      // c) Build blocks from content
      const blocks = parseMDToBlocks(content);

      // d) Call generate-post
      const payload = { metadata: frontmatterToMetadata(frontmatter), blocks };
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
      toast.error("Failed to toggle status: " + err.message);
    }
  }

  // parse content => blocks
  function parseMDToBlocks(md) {
    if (!md) return [];
    const lines = md.split("\n");
    const blocksArray = [];
    let paragraph = [];

    function flushParagraph() {
      if (paragraph.length > 0) {
        const text = paragraph.join("\n").trim();
        if (text) {
          blocksArray.push({ type: "text", text });
        }
        paragraph = [];
      }
    }

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
        } else {
          paragraph.push(line);
        }
      } else {
        paragraph.push(line);
      }
    }
    flushParagraph();
    return blocksArray;
  }

  // convert frontmatter => metadata
  function frontmatterToMetadata(fm) {
    return {
      title: fm.title || "",
      description: fm.description || "",
      slug: fm.slug || "",
      canonicalUrl: fm.canonicalUrl || "",
      coverImage: fm.coverImage || "",
      ogImage: fm.ogImage || "",
      category: fm.category || "",
      tags: Array.isArray(fm.tags) ? fm.tags.join(", ") : fm.tags || "",
      date: fm.date || "",
      lastModified: fm.lastModified || "",
      status: fm.status || "draft",
      featured: !!fm.featured,
      trending: !!fm.trending,
      authorName: fm.author?.name || "",
      authorTitle: fm.author?.title || "",
      authorBio: fm.author?.bio || "",
      authorAvatar: fm.author?.avatar || "/employees/sn.jpg",
      readingTime: fm.readingTime || 0,
      related: Array.isArray(fm.related)
        ? fm.related.join(", ")
        : fm.related || "",
      prerequisites: Array.isArray(fm.prerequisites)
        ? fm.prerequisites.join(", ")
        : fm.prerequisites || "",
    };
  }

  // Filter/sort
  function getFilteredSortedPosts() {
    let filtered = [...posts];

    if (statusFilter !== "all") {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    const term = searchTerm.toLowerCase();
    if (term) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.slug.toLowerCase().includes(term)
      );
    }

    filtered.sort((a, b) => {
      const ad = new Date(a.date).getTime();
      const bd = new Date(b.date).getTime();
      return sortOrder === "asc" ? ad - bd : bd - ad;
    });

    return filtered;
  }

  const displayed = getFilteredSortedPosts();

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
        <div>
          <label className="block font-medium mb-1">Search</label>
          <input
            type="text"
            placeholder="Search title or slug..."
            className="w-full border border-gray-300 px-2 py-1 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Filter Status</label>
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
        <div>
          <label className="block font-medium mb-1">Sort by Date</label>
          <select
            className="w-full border border-gray-300 px-2 py-1 rounded"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </div>
      </div>

      {!displayed.length ? (
        <p>No posts found.</p>
      ) : (
        <ul className="space-y-2">
          {displayed.map((p, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center border p-2 rounded"
            >
              <div>
                <span className="font-semibold mr-2">{p.name}</span>
                <span className="text-sm text-gray-600">
                  (Status: {p.status})
                </span>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleToggleStatus(p)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                >
                  {p.status === "published" ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => onEditPost?.(p)}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePost(p.name)}
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

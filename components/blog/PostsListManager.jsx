"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

/**
 * Props:
 *  - onEditPost(post)
 *  - onNewArticle()
 */
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
  // -------------------------
  async function handleToggleStatus(post) {
    const newStatus = post.status === "published" ? "draft" : "published";

    // minimal approach: we re-upload with new status
    const payload = {
      metadata: {
        title: post.title || "",
        description: post.description || "",
        slug: post.slug || "",
        canonicalUrl: post.canonicalUrl || "",
        coverImage: post.coverImage || "",
        ogImage: post.ogImage || "",
        category: post.category || "",
        tags: "",
        date: post.date || "",
        lastModified: post.lastModified || "",
        status: newStatus,
        featured: !!post.featured,
        trending: !!post.trending,
        authorName: "",
        authorTitle: "",
        authorBio: "",
        authorAvatar: "/employees/sn.jpg",
        readingTime: 0,
        related: "",
        prerequisites: "",
      },
      blocks: [
        { type: "text", text: "Placeholder content for status toggle." },
      ],
    };

    try {
      const res = await fetch("/api/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        toast.error("Error toggling status");
        return;
      }
      const result = await res.json();
      if (result.success) {
        toast.success(`Status changed to ${newStatus}`);
        fetchPosts();
      } else {
        toast.error("Error toggling status");
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  // -------------------------
  // Local Searching/Filtering/Sorting
  // -------------------------
  // 1) Filter by status: all, draft, published
  // 2) Filter by searchTerm in title or slug
  // 3) Sort by date ascending or descending
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
          p.title.toLowerCase().includes(term) ||
          p.slug.toLowerCase().includes(term)
      );
    }

    // sort by date
    // p.date might be "2024-01-01T12:00:00Z" or something
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

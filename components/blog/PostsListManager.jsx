/* ------------------------------------------------------------------
   PostsListManager.jsx
   We keep the Publish/Unpublish toggle as it was.
   We also add a 'Create New' button that calls onNewArticle().
------------------------------------------------------------------ */

"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function PostsListManager({ onEditPost, onNewArticle }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

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

  // Publish/unpublish
  async function handleToggleStatus(post) {
    const newStatus = post.status === "published" ? "draft" : "published";
    // We'll do a quick update by re-calling generate-post with minimal info
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
        // minimal placeholder
        { type: "text", text: "Placeholder content for toggle." }
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

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Manage Articles</h2>
        <button
          onClick={onNewArticle}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Create New
        </button>
      </div>

      {!posts.length ? (
        <p>No posts found.</p>
      ) : (
        <ul className="space-y-2">
          {posts.map((post, idx) => (
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

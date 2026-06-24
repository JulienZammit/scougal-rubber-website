"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PenSquare, Trash2, Plus, RefreshCw, ExternalLink } from "lucide-react";

export default function PostsListManager({ onEdit, onNew }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busySlug, setBusySlug] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/blog-admin/posts", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load posts");
      setPosts(data.posts || []);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(slug) {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    setBusySlug(slug);
    try {
      const res = await fetch("/api/blog-admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      toast.success(
        data.mode === "github"
          ? "Deleted — change will be live after the next deploy (~1–2 min)."
          : "Deleted."
      );
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusySlug("");
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">
          Articles {posts.length ? `(${posts.length})` : ""}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            className="flex items-center gap-1 text-sm px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button
            onClick={onNew}
            className="flex items-center gap-1 text-sm px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" /> New article
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center text-gray-400">Loading…</div>
      ) : posts.length === 0 ? (
        <div className="p-8 text-center text-gray-400">
          No articles yet. Click “New article” to write your first one.
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {posts.map((p) => (
            <li key={p.slug} className="flex items-center gap-4 p-4 hover:bg-gray-50">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900 truncate">{p.title}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      p.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 truncate">
                  /blog/{p.slug}
                  {p.category ? ` · ${p.category}` : ""}
                  {p.date ? ` · ${new Date(p.date).toLocaleDateString()}` : ""}
                  {p.author ? ` · ${p.author}` : ""}
                </p>
              </div>
              {p.status === "published" && (
                <a
                  href={`/blog/${p.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded hover:bg-gray-100 text-gray-500"
                  title="View live"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <button
                onClick={() => onEdit(p.slug)}
                className="p-2 rounded hover:bg-gray-100 text-blue-600"
                title="Edit"
              >
                <PenSquare className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(p.slug)}
                disabled={busySlug === p.slug}
                className="p-2 rounded hover:bg-gray-100 text-red-600 disabled:opacity-40"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

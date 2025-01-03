"use client";

import { Edit2, Loader2, Power, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function PostsListManager({ onEditPost, onNewArticle }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStates, setLoadingStates] = useState({
    publish: null, // stocke l'ID du post en cours de publication
    delete: null,  // stocke l'ID du post en cours de suppression
    edit: null,    // stocke l'ID du post en cours d'édition
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");

  // Récupération des posts au montage
  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeletePost(filename) {
    if (!confirm(`Delete ${filename}?`)) return;

    setLoadingStates((prev) => ({ ...prev, delete: filename }));
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
    } finally {
      setLoadingStates((prev) => ({ ...prev, delete: null }));
    }
  }

  async function handleToggleStatus(post) {
    const newStatus = post.status === "published" ? "draft" : "published";

    setLoadingStates((prev) => ({ ...prev, publish: post.name }));
    try {
      // Récupération du contenu du post
      const getRes = await fetch(
        `/api/get-post?slug=${encodeURIComponent(post.slug)}`
      );
      if (!getRes.ok) {
        const errMsg = await getRes.json();
        toast.error(errMsg.error || "Cannot fetch existing post");
        return;
      }
      const { frontmatter, content } = await getRes.json();

      // On met à jour le status
      frontmatter.status = newStatus;

      // Conversion du markdown en blocks
      const blocks = parseMDToBlocks(content);
      const payload = { metadata: frontmatterToMetadata(frontmatter), blocks };

      // Génération du nouveau post
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
    } finally {
      setLoadingStates((prev) => ({ ...prev, publish: null }));
    }
  }

  const handleEdit = (post) => {
    setLoadingStates((prev) => ({ ...prev, edit: post.name }));
    onEditPost?.(post);

    // On réinitialise l'état de chargement après un court délai
    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, edit: null }));
    }, 500);
  };

  // Conversion du contenu markdown en blocks
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

  // Conversion du frontmatter en metadata
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

  // Filtrage et tri des posts
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
    <div className="bg-white rounded-lg shadow-lg p-6 mx-auto">
      {/* Header + bouton Create New */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Manage Articles</h2>
        <button
          onClick={onNewArticle}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
        >
          <span className="hidden sm:inline">Create New Article</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>

      {/* Filtres */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Search
          </label>
          <input
            type="text"
            placeholder="Search by title or slug..."
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Sort
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </div>
      </div>

      {/* Liste des posts ou chargement */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Loader2 className="w-12 h-12 text-blue-500 spin" />
          <p className="text-gray-500">Loading articles...</p>
        </div>
      ) : !displayed.length ? (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
          <p>No posts found matching your criteria.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {displayed.map((p, idx) => (
            <li
              key={idx}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-200 bg-white"
            >
              <div className="space-y-1">
                <h3 className="font-medium text-gray-900">{p.name}</h3>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    p.status === "published"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {/* Publish / Unpublish */}
                <button
                  onClick={() => handleToggleStatus(p)}
                  disabled={loadingStates.publish === p.name}
                  className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                    p.status === "published"
                      ? "bg-yellow-100 hover:bg-yellow-200 text-yellow-700"
                      : "bg-green-100 hover:bg-green-200 text-green-700"
                  }`}
                >
                  {loadingStates.publish === p.name ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Power className="w-4 h-4 mr-2" />
                      {p.status === "published" ? "Unpublish" : "Publish"}
                    </>
                  )}
                </button>

                {/* Edit */}
                <button
                  onClick={() => handleEdit(p)}
                  disabled={loadingStates.edit === p.name}
                  className="inline-flex items-center bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {loadingStates.edit === p.name ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </>
                  )}
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDeletePost(p.name)}
                  disabled={loadingStates.delete === p.name}
                  className="inline-flex items-center bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {loadingStates.delete === p.name ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

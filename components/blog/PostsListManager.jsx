"use client";

import { Edit2, Loader2, Power, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createSlugFromText } from "../utils"; // your slug utility

/**
 * The main manager for listing articles and importing from LinkedIn in a popup.
 */
export default function PostsListManager({ onEditPost, onNewArticle }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // For toggling statuses, deleting, editing
  const [loadingStates, setLoadingStates] = useState({
    publish: null,
    delete: null,
    edit: null,
  });

  // For searching / filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");

  // ----------------------------------------------------------------
  // Modal (popup) states & logic
  // ----------------------------------------------------------------
  const [showImportModal, setShowImportModal] = useState(false);
  const [useAi, setUseAi] = useState(false); // determines if we want AI generation
  const [importSteps, setImportSteps] = useState([]);
  const [isImporting, setIsImporting] = useState(false);

  function openImportModal() {
    // Reset everything each time we open
    setUseAi(false);
    setImportSteps([]);
    setIsImporting(false);
    setShowImportModal(true);
  }

  function closeImportModal() {
    setShowImportModal(false);
  }

  // Called after the import is fully done
  function finalizeImport() {
    // Optionally fetch posts again
    fetchPosts();
    setIsImporting(false);
  }

  // ----------------------------------------------------------------
  // 1) useEffect: Fetch existing posts on mount
  // ----------------------------------------------------------------
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

  // ----------------------------------------------------------------
  // 2) Deleting a post
  // ----------------------------------------------------------------
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

  // ----------------------------------------------------------------
  // 3) Toggle status (published / draft)
  // ----------------------------------------------------------------
  async function handleToggleStatus(post) {
    const newStatus = post.status === "published" ? "draft" : "published";
    setLoadingStates((prev) => ({ ...prev, publish: post.name }));

    try {
      // fetch existing post content
      const getRes = await fetch(
        `/api/get-post?slug=${encodeURIComponent(post.slug)}`
      );
      if (!getRes.ok) {
        const errMsg = await getRes.json();
        toast.error(errMsg.error || "Cannot fetch existing post");
        return;
      }

      const { frontmatter, content } = await getRes.json();
      frontmatter.status = newStatus;

      // convert markdown to blocks
      const blocks = parseMDToBlocks(content);
      const payload = { metadata: frontmatterToMetadata(frontmatter), blocks };

      // post updated data to /api/generate-post
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

  // ----------------------------------------------------------------
  // 4) Edit a post
  // ----------------------------------------------------------------
  function handleEdit(post) {
    setLoadingStates((prev) => ({ ...prev, edit: post.name }));
    onEditPost?.(post);

    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, edit: null }));
    }, 500);
  }

  // ----------------------------------------------------------------
  // 5) The import process (triggered by modal)
  // ----------------------------------------------------------------
  async function handleStartImport() {
    setIsImporting(true);
    setImportSteps(["Fetching the latest LinkedIn posts..."]);

    try {
      // Step A: get the 2 latest LinkedIn posts
      const linkedinRes = await fetch("/api/linkedin-latest-posts");
      if (!linkedinRes.ok) {
        throw new Error("Failed to fetch LinkedIn posts");
      }
      const linkedinPosts = await linkedinRes.json();
      setImportSteps((prev) => [
        ...prev,
        "LinkedIn posts retrieved successfully.",
      ]);

      // Step B: For each post, generate a slug from the first 4 words
      for (const post of linkedinPosts) {
        const commentary =
          post?.specificContent?.["com.linkedin.ugc.ShareContent"]
            ?.shareCommentary?.text;
        if (!commentary) continue; // skip empty

        const newSlug = createSlugFromText(commentary, 4);
        setImportSteps((prev) => [
          ...prev,
          `Checking existence of "${newSlug}"...`,
        ]);

        // Check if already exists
        const checkRes = await fetch(
          `/api/get-post?slug=${encodeURIComponent(newSlug)}`
        );
        // In handleStartImport (where you're checking if the post exists)
        if (checkRes.ok) {
          setImportSteps((prev) => [
            ...prev,
            `Post "${newSlug}" already exists, skipping.`,
          ]);
          toast.info("These LinkedIn posts have already been generated."); // <-- Add this
          setShowImportModal(false); // <-- Close the popup
          continue;
        }

        // Doesn't exist => create
        let payload;
        if (useAi) {
          // AI approach
          setImportSteps((prev) => [
            ...prev,
            `Generating AI-based content for "${newSlug}"...`,
          ]);
          payload = await createDraftWithAi(
            commentary,
            newSlug,
            post?.firstPublishedAt
          );
        } else {
          // Minimal approach
          setImportSteps((prev) => [
            ...prev,
            `Creating a basic draft for "${newSlug}"...`,
          ]);
          payload = createDraftFromLinkedIn(
            commentary,
            newSlug,
            post?.firstPublishedAt
          );
        }

        // Upload final JSON to /api/generate-post
        setImportSteps((prev) => [
          ...prev,
          `Uploading article for "${newSlug}"...`,
        ]);
        const genRes = await fetch("/api/generate-post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!genRes.ok) {
          setImportSteps((prev) => [...prev, `Error creating "${newSlug}".`]);
        } else {
          setImportSteps((prev) => [
            ...prev,
            `Article "${newSlug}" created as draft.`,
          ]);
        }
      }

      setImportSteps((prev) => [...prev, "Verification completed."]);
    } catch (err) {
      console.error("Import error:", err);
      setImportSteps((prev) => [...prev, `Error: ${err.message}`]);
    } finally {
      finalizeImport();
    }
  }

  // Minimal approach (no AI)
  function createDraftFromLinkedIn(commentary = "", slug, publishedAt) {
    const date = publishedAt
      ? new Date(publishedAt).toISOString()
      : new Date().toISOString();

    // default “Scott Nelson” data
    const defaultAuthor = {
      name: "Scott Nelson",
      title: "Vice President Sales & Marketing",
      bio: "Since 2006, Scott has played a vital role in overseeing sales and marketing, as well as guiding Scougal’s transition to a state-of-the-art facility in Nevada.",
      avatar: "/employees/sn.jpg",
    };

    const frontmatter = {
      title: `${slug}`,
      description: commentary.substring(0, 160),
      slug,
      status: "draft",
      date,
      authorName: defaultAuthor.name,
      authorTitle: defaultAuthor.title,
      authorBio: defaultAuthor.bio,
      authorAvatar: defaultAuthor.avatar,
    };

    const blocks = [{ type: "text", text: commentary }];

    return {
      metadata: frontmatterToMetadata(frontmatter),
      blocks,
    };
  }

  // AI approach => call /api/ai/generate-post-data
  async function createDraftWithAi(commentary = "", slug, publishedAt) {
    const date = publishedAt
      ? new Date(publishedAt).toISOString()
      : new Date().toISOString();

    const aiRes = await fetch("/api/ai/generate-post-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentary, slug, date }),
    });

    if (!aiRes.ok) {
      throw new Error("Failed to generate AI-based content");
    }
    const aiData = await aiRes.json();
    return aiData;
  }

  // ----------------------------------------------------------------
  // 6) parseMDToBlocks & frontmatterToMetadata
  // ----------------------------------------------------------------
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
      authorName: fm.authorName || "Scott Nelson",
      authorTitle: fm.authorTitle || "Vice President Sales & Marketing",
      authorBio: fm.authorBio || "Since 2006, Scott has played a vital role...",
      authorAvatar: fm.authorAvatar || "/employees/sn.jpg",
      readingTime: fm.readingTime || 0,
      related: Array.isArray(fm.related)
        ? fm.related.join(", ")
        : fm.related || "",
      prerequisites: Array.isArray(fm.prerequisites)
        ? fm.prerequisites.join(", ")
        : fm.prerequisites || "",
    };
  }

  // ----------------------------------------------------------------
  // 7) Filter & sort for display
  // ----------------------------------------------------------------
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
    <div className="relative bg-white rounded-lg shadow-lg p-6 mx-auto">
      {/* Header + Create & Import Buttons */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Manage Articles</h2>
        <div className="flex gap-2">
          <button
            onClick={openImportModal}
            className="bg-white text-black border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
          >
            Import Post from LinkedIn
          </button>
          <button
            onClick={onNewArticle}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
          >
            <span className="hidden sm:inline">Create New Article</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Search */}
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

        {/* Status */}
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

        {/* Sort Order */}
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

      {/* List of posts or loading */}
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
                {/* Toggle status */}
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

      {/* The Import Modal (popup) */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded shadow-lg p-6 max-w-md w-full relative">
            <button
              onClick={closeImportModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold mb-4">
              Import Posts from LinkedIn
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              This will fetch the latest LinkedIn posts and create draft posts
              for you.
            </p>

            {!isImporting ? (
              <>
                {/* Ask if we want AI */}
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    id="useAiCheckbox"
                    checked={useAi}
                    onChange={(e) => setUseAi(e.target.checked)}
                  />
                  <label htmlFor="useAiCheckbox" className="text-sm">
                    Use AI generation?
                  </label>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleStartImport}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
                  >
                    Start Import
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <Loader2 className="w-5 h-5 text-blue-500 spin" />
                  <span className="font-medium text-sm">
                    Importing LinkedIn posts...
                  </span>
                </div>
                <div className="p-2 border rounded h-40 overflow-auto text-sm">
                  {importSteps.map((step, i) => (
                    <div key={i}>• {step}</div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

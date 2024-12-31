/* ------------------------------------------------------------------
   BlogManagementPageClient.jsx
   We now have TWO main tabs at the top:
   1) "Manage Articles"
   2) "Article Creation"
   Inside "Article Creation", we want internal sub-navigation:
      - “Metadata”
      - “Blog Content”
   The user can switch between them, but they are still on the same tab 
   (i.e., the “Article Creation” tab).
   Also, keep "Published / Unpublished" toggle in Manage Articles.
------------------------------------------------------------------ */

"use client";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

import ArticleCreation from "@/components/blog/ArticleCreation"; // a new component merging metadata & content sub-nav
import PostsListManager from "@/components/blog/PostsListManager";

export default function BlogManagementPageClient() {
  const router = useRouter();

  // Auth
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  // State for metadata & blocks (passed down to ArticleCreation)
  const [metadata, setMetadata] = useState({
    title: "",
    description: "",
    slug: "",
    canonicalUrl: "",
    coverImage: "",
    ogImage: "",
    category: "",
    tags: "",
    date: "",
    lastModified: "",
    status: "draft",
    featured: false,
    trending: false,
    authorName: "",
    authorTitle: "",
    authorBio: "",
    authorAvatar: "/employees/sn.jpg",
    readingTime: 0,
    related: "",
    prerequisites: "",
  });
  const [blocks, setBlocks] = useState([]);

  // Tabs: "manage" or "creation"
  const [activeTab, setActiveTab] = useState("manage");

  // -----------------------
  // handleLogin
  // -----------------------
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/check-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Invalid credentials");
        return;
      }
      const data = await res.json();
      if (data.success) {
        toast.success("Logged in successfully");
        setIsAuth(true);
      } else {
        toast.error("Invalid credentials");
      }
    } catch (err) {
      toast.error("Network error");
    }
  }

  // -----------------------
  // Create New => reset form, switch tab to "creation"
  // -----------------------
  function handleCreateNew() {
    setMetadata({
      title: "",
      description: "",
      slug: "",
      canonicalUrl: "",
      coverImage: "",
      ogImage: "",
      category: "",
      tags: "",
      date: "",
      lastModified: "",
      status: "draft",
      featured: false,
      trending: false,
      authorName: "",
      authorTitle: "",
      authorBio: "",
      authorAvatar: "/employees/sn.jpg",
      readingTime: 0,
      related: "",
      prerequisites: "",
    });
    setBlocks([]);
    setActiveTab("creation");
  }

  // -----------------------
  // Edit an existing post
  // -----------------------
  async function handleEditPost(selectedPost) {
    if (!selectedPost.slug) {
      toast.error("No slug found. Cannot edit post");
      return;
    }
    try {
      const res = await fetch(`/api/get-post?slug=${selectedPost.slug}`);
      if (!res.ok) {
        toast.error("Error fetching post details");
        return;
      }
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }

      setMetadata(frontmatterToMetadata(data.frontmatter));
      setBlocks(parseMDToBlocks(data.content));
      setActiveTab("creation");
    } catch (err) {
      toast.error("Error editing post");
    }
  }

  // Helpers
  function parseMDToBlocks(md) {
    if (!md) return [];
    const lines = md.split("\n");
    const blocksArray = [];
    let paragraphLines = [];

    function flushParagraph() {
      if (paragraphLines.length > 0) {
        const text = paragraphLines.join("\n").trim();
        if (text) {
          blocksArray.push({ type: "text", text });
        }
        paragraphLines = [];
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
          paragraphLines.push(line);
        }
      } else {
        paragraphLines.push(line);
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
      authorName: fm.author?.name || "",
      authorTitle: fm.author?.title || "",
      authorBio: fm.author?.bio || "",
      authorAvatar: fm.author?.avatar || "/employees/sn.jpg",
      readingTime: fm.readingTime || 0,
      related: Array.isArray(fm.related) ? fm.related.join(", ") : fm.related || "",
      prerequisites: Array.isArray(fm.prerequisites)
        ? fm.prerequisites.join(", ")
        : fm.prerequisites || "",
    };
  }

  // If not authenticated => show login form
  if (!isAuth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <ToastContainer />
        <div className="w-full max-w-sm bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Username</label>
              <input
                type="text"
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />

      <header className="p-4 bg-white shadow flex justify-between items-center">
        <h1 className="text-xl font-bold">Blog Management</h1>
        {/* Only 2 tabs: Manage / Article Creation */}
        <nav className="space-x-4">
          <button
            onClick={() => setActiveTab("manage")}
            className={`px-3 py-1 rounded ${
              activeTab === "manage" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Manage Articles
          </button>
          <button
            onClick={() => setActiveTab("creation")}
            className={`px-3 py-1 rounded ${
              activeTab === "creation"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Article Creation
          </button>
        </nav>
      </header>

      <div className="p-4">
        {activeTab === "manage" && (
          <PostsListManager
            onEditPost={handleEditPost}
            onNewArticle={handleCreateNew}
          />
        )}
        {activeTab === "creation" && (
          <ArticleCreation
            metadata={metadata}
            setMetadata={setMetadata}
            blocks={blocks}
            setBlocks={setBlocks}
          />
        )}
      </div>
    </div>
  );
}

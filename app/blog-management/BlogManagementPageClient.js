"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ArticleCreation from "@/components/blog/ArticleCreation";
import PostsListManager from "@/components/blog/PostsListManager";

/**
 * The main client page with two top-level tabs:
 *  - "Manage Articles" (PostsListManager)
 *  - "Article Creation" (ArticleCreation)
 *
 * Key improvements:
 * 1) We keep the user logged in across tabs (client-side).
 * 2) We do not re-initialize blocks on tab switch.
 * 3) We have correct toggling of publish/unpublish in PostsListManager that fetches the real content.
 * 4) Basic validations in ArticleCreation to avoid empty title/date/slug/category.
 */

export default function BlogManagementPageClient() {
  const searchParams = useSearchParams();

  // 1) We define hooks unconditionally, so we never get "Rendered more hooks than during previous render"
  const [activeTab, setActiveTab] = useState("manage");
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // For the article creation page
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

  // 2) On mount, we see if there's a ?tab= param
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  // 3) Minimal "session check" logic
  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    try {
      // For real security, you'd do a server-side approach (JWT in httpOnly cookie, or NextAuth).
      const res = await fetch("/api/check-session");
      if (res.ok) {
        const data = await res.json();
        if (data.isAuth) {
          setIsAuth(true);
        }
      }
    } catch (err) {
      // if fail => user remains not auth
    }
  }

  // 4) handleLogin
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

  // 5) handleCreateNew => fresh post, switch to creation tab
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

  // 6) handleEditPost => fetch the real .md from server, parse frontmatter + content
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

  // 7) The parseMDToBlocks function
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

  // 8) Render: show login if not auth, else show the tabs
  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ marginTop: "50px" }}
      />
      {!isAuth ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
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
      ) : (
        <>
          <header className="p-4 bg-white shadow flex justify-between items-center">
            <h1 className="text-xl font-bold">Blog Management</h1>
            <nav className="space-x-4">
              <button
                onClick={() => setActiveTab("manage")}
                className={`px-3 py-1 rounded ${
                  activeTab === "manage"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
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
        </>
      )}
    </div>
  );
}

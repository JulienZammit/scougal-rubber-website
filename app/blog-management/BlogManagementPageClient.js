"use client";

import ArticleCreation from "@/components/blog/ArticleCreation";
import PostsListManager from "@/components/blog/PostsListManager";
import { Files, FileText, Layout, PenSquare } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import NextAuth hooks
import { useSession, signIn, signOut } from "next-auth/react";

export default function BlogManagementPage() {
  const searchParams = useSearchParams();

  // Récupère la session (data) et le status ("loading" | "authenticated" | "unauthenticated")
  const { data: session, status } = useSession();

  // Gère les différents onglets
  const [activeTab, setActiveTab] = useState("manage");

  // username/password pour le login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Pour la page de création d'article
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

  // Au mount, si un paramètre ?tab= est présent, on positionne l'onglet actif
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  // Fonction de login via NextAuth
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false, // on gère la redirection nous-mêmes
      });

      if (result.error) {
        toast.error("Invalid credentials");
      } else {
        toast.success("Logged in successfully");
      }
    } catch (err) {
      toast.error("Network error");
    }
  }

  // Création d'un nouvel article (réinitialise les states, bascule l'onglet)
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

  // Édition d'un article existant (fetch, parse, etc.)
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

  // Parse le markdown en blocs (fonction existante)
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

  // Convertit le frontmatter en metadata (fonction existante)
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

  // Si la session est en chargement, on peut afficher un petit spinner ou placeholder
  if (status === "loading") {
    return <p className="min-h-screen flex items-center justify-center">Loading...</p>;
  }

  // Si on n'a pas de session => formulaire de login
  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
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
          theme="light"
          className="mt-16"
        />
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center justify-center mb-8">
              <Layout className="w-10 h-10 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Blog Dashboard
              </h2>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Sign In</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Sinon (session présente) => le Dashboard
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
        theme="light"
        className="mt-16"
      />

      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:h-16 space-y-4 sm:space-y-0">
              {/* Logo & Title - Responsive layout */}
              <div className="flex items-center space-x-3 w-full sm:w-auto justify-center sm:justify-start">
                <FileText className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <h1 className="text-xl font-semibold text-gray-800 whitespace-nowrap">
                  Blog Management
                </h1>
                <div className="hidden sm:flex items-center space-x-2">
                  <span className="text-xl font-semibold text-gray-800 whitespace-nowrap">
                    X
                  </span>
                  <div className="relative">
                    <Image
                      src="./logo_resized.webp"
                      alt="Scougal Rubber Logo"
                      width={200}
                      height={180}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Navigation + bouton logout */}
              <div className="flex items-center space-x-4">
                <nav className="flex bg-gray-50 p-1 rounded-lg shadow-sm">
                  <button
                    onClick={() => setActiveTab("manage")}
                    className={`
                      flex items-center px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                      ${
                        activeTab === "manage"
                          ? "bg-white text-blue-600 shadow-sm ring-1 ring-gray-200"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }
                    `}
                  >
                    <Files className="w-4 h-4 mr-2 flex-shrink-0" />
                    Manage Articles
                  </button>
                  <button
                    onClick={() => setActiveTab("creation")}
                    className={`
                      flex items-center px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                      ${
                        activeTab === "creation"
                          ? "bg-white text-blue-600 shadow-sm ring-1 ring-gray-200"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }
                    `}
                  >
                    <PenSquare className="w-4 h-4 mr-2 flex-shrink-0" />
                    New Article
                  </button>
                </nav>

                <button
                  onClick={() => signOut()}
                  className="text-sm border border-gray-300 hover:border-gray-400 px-3 py-2 rounded-md"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 sm:px-6 lg:px-8 py-4 px-4">
          <div className="transition-all duration-200 animate-in fade-in">
            {activeTab === "manage" && (
              <PostsListManager onEditPost={handleEditPost} onNewArticle={handleCreateNew} />
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
        </main>
      </div>
    </div>
  );
}

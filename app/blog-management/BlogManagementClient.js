"use client";

import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LogOut, ArrowLeft, Save, Send, Loader2, Lock } from "lucide-react";
import MetadataForm, { AUTHORS } from "@/components/blog/MetadataForm";
import MarkdownEditor from "@/components/blog/MarkdownEditor";
import PostsListManager from "@/components/blog/PostsListManager";

// Light, type-as-you-go slug sanitizer (keeps a trailing dash while typing).
const liveSlug = (s) =>
  String(s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 80);

const BODY_TEMPLATE = `## Introduction

Start writing your article here.

## Key points

- First point
- Second point

## Conclusion

Wrap up here.
`;

function defaultMetadata() {
  const scott = AUTHORS.find((a) => a.id === "scott-nelson") || AUTHORS[0];
  return {
    title: "",
    description: "",
    slug: "",
    canonicalUrl: "",
    coverImage: "",
    ogImage: "",
    twitterCard: "summary_large_image",
    twitterCreator: "@scougalrubber",
    category: "",
    tags: [],
    date: new Date().toISOString(),
    lastModified: "",
    status: "draft",
    featured: false,
    trending: false,
    author: {
      name: scott.name,
      title: scott.title,
      bio: scott.bio,
      avatar: scott.avatar,
      twitter: scott.twitter || "",
      linkedin: scott.linkedin || "",
    },
    readingTime: 3,
  };
}

function readDataUrl(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

export default function BlogManagementClient() {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [mode, setMode] = useState("local");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [view, setView] = useState("list"); // 'list' | 'editor'
  const [metadata, setMetadata] = useState(defaultMetadata());
  const [body, setBody] = useState(BODY_TEMPLATE);
  const [images, setImages] = useState([]); // { path, base64 } relative to /public
  const [originalSlug, setOriginalSlug] = useState(null);
  const [saving, setSaving] = useState(false);
  const slugTouched = useRef(false);

  // ── Session ────────────────────────────────────────────────────────────────
  async function checkSession() {
    try {
      const res = await fetch("/api/blog-admin/session", { cache: "no-store" });
      const data = await res.json();
      setAuthed(!!data.authenticated);
      setMode(data.mode || "local");
    } catch {
      setAuthed(false);
    } finally {
      setChecking(false);
    }
  }
  useEffect(() => {
    checkSession();
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setLoggingIn(true);
    try {
      const res = await fetch("/api/blog-admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      setPassword("");
      await checkSession();
      toast.success("Welcome back!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/blog-admin/logout", { method: "POST" });
    setAuthed(false);
  }

  // ── Slug helpers ───────────────────────────────────────────────────────────
  function remap(p, oldSlug, newSlug) {
    const pref = `/blog/${oldSlug}/`;
    return oldSlug && typeof p === "string" && p.startsWith(pref)
      ? `/blog/${newSlug}/` + p.slice(pref.length)
      : p;
  }
  function changeSlug(newSlugRaw) {
    const newSlug = liveSlug(newSlugRaw);
    const oldSlug = metadata.slug;
    if (oldSlug === newSlug) {
      setMetadata((prev) => ({ ...prev, slug: newSlug }));
      return;
    }
    setMetadata((prev) => ({
      ...prev,
      slug: newSlug,
      coverImage: remap(prev.coverImage, oldSlug, newSlug),
      ogImage: remap(prev.ogImage, oldSlug, newSlug),
    }));
    if (oldSlug) {
      setBody((b) => b.split(`/blog/${oldSlug}/`).join(`/blog/${newSlug}/`));
      setImages((imgs) =>
        imgs.map((i) =>
          i.path.startsWith(`blog/${oldSlug}/`)
            ? { ...i, path: `blog/${newSlug}/` + i.path.slice(`blog/${oldSlug}/`.length) }
            : i
        )
      );
    }
  }
  function handleSlugChange(raw) {
    slugTouched.current = true;
    changeSlug(raw);
  }

  // Auto-derive slug from title until the user edits the slug manually.
  function setMetadataSmart(updater) {
    setMetadata((prev) => {
      const next = typeof updater === "function" ? updater(prev) : { ...prev, ...updater };
      // Keep the slug in sync with the title until the user edits the slug manually.
      if (!slugTouched.current && next.title !== prev.title) {
        return { ...next, slug: liveSlug(next.title) };
      }
      return next;
    });
  }

  // ── Image staging ──────────────────────────────────────────────────────────
  function ensureSlug() {
    if (metadata.slug) return metadata.slug;
    const s = liveSlug(metadata.title) || "post";
    setMetadata((prev) => ({ ...prev, slug: prev.slug || s }));
    return s;
  }
  async function stageImage(file) {
    const slug = ensureSlug();
    const dataUrl = await readDataUrl(file);
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const base = liveSlug(file.name.replace(/\.[^.]+$/, "")) || "image";
    const name = `${base}-${Date.now().toString(36)}.${ext}`;
    const relPath = `blog/${slug}/${name}`;
    setImages((prev) => [...prev, { path: relPath, base64: dataUrl }]);
    return `/${relPath}`;
  }

  // ── Editor lifecycle ───────────────────────────────────────────────────────
  function newPost() {
    setMetadata(defaultMetadata());
    setBody(BODY_TEMPLATE);
    setImages([]);
    setOriginalSlug(null);
    slugTouched.current = false;
    setView("editor");
  }

  async function editPost(slug) {
    try {
      const res = await fetch(`/api/blog-admin/post?slug=${encodeURIComponent(slug)}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not load post");
      setMetadata({ ...defaultMetadata(), ...data.post.metadata });
      setBody(data.post.body || "");
      setImages([]);
      setOriginalSlug(data.post.slug);
      slugTouched.current = true; // existing slug is authoritative
      setView("editor");
    } catch (e) {
      toast.error(e.message);
    }
  }

  async function save(publish) {
    if (!metadata.title.trim()) return toast.error("Add a title first.");
    if (!body.trim()) return toast.error("The article body is empty.");
    setSaving(true);
    const status = publish ? "published" : "draft";
    const payload = {
      metadata: { ...metadata, status, lastModified: new Date().toISOString() },
      body,
      images,
      originalSlug,
    };
    try {
      const res = await fetch("/api/blog-admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setImages([]);
      setOriginalSlug(data.slug);
      setMetadata((prev) => ({ ...prev, status }));
      if (data.mode === "github") {
        toast.success(
          publish
            ? "Published! It will be live in ~1–2 min (deploy running)."
            : "Draft committed. Live after the next deploy (~1–2 min)."
        );
      } else {
        toast.success(
          publish ? `Published! Live now at /blog/${data.slug}.` : "Draft saved to disk."
        );
      }
      setView("list");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  if (checking) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
        <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading…
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <ToastContainer position="top-right" />
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-800">Blog Editor</h1>
          </div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
          <input
            className="w-full px-4 py-2 mb-4 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 mb-6 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={loggingIn}
            className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loggingIn && <Loader2 className="w-4 h-4 animate-spin" />}
            Sign in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <ToastContainer position="top-right" />

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {view === "editor" && (
            <button
              onClick={() => setView("list")}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
              title="Back to list"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <h1 className="text-2xl font-bold text-gray-900">
            {view === "editor" ? "Write article" : "Blog editor"}
          </h1>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              mode === "github" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"
            }`}
            title={
              mode === "github"
                ? "Publishing commits to GitHub; live after deploy."
                : "Local mode: writes files directly to your repo (for testing)."
            }
          >
            {mode === "github" ? "GitHub mode" : "Local mode"}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600"
        >
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </div>

      {view === "list" ? (
        <PostsListManager onEdit={editPost} onNew={newPost} />
      ) : (
        <div className="space-y-6">
          <MetadataForm
            metadata={metadata}
            setMetadata={setMetadataSmart}
            onSlugChange={handleSlugChange}
            onStageImage={stageImage}
          />
          <MarkdownEditor body={body} setBody={setBody} onInsertImage={stageImage} images={images} />

          <div className="sticky bottom-0 bg-white/90 backdrop-blur border-t border-gray-100 -mx-4 px-4 py-3 flex items-center justify-end gap-3">
            {images.length > 0 && (
              <span className="text-xs text-gray-400 mr-auto">
                {images.length} image{images.length > 1 ? "s" : ""} staged
              </span>
            )}
            <button
              onClick={() => save(false)}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save draft
            </button>
            <button
              onClick={() => save(true)}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Publish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

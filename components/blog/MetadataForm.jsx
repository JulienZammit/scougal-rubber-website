"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";

// The team, matched to avatars already in /public/employees.
export const AUTHORS = [
  {
    id: "rob-anderson",
    name: "Rob Anderson",
    title: "President",
    avatar: "/employees/ra.jpg",
    bio: "President of Scougal Rubber, leading the company's strategy and operations across its Seattle and Reno facilities.",
    linkedin: "",
    twitter: "@scougalrubber",
  },
  {
    id: "scott-nelson",
    name: "Scott Nelson",
    title: "Vice President Sales & Marketing",
    avatar: "/employees/sn.jpg",
    bio: "Since 2006, Scott has overseen sales and marketing and guided Scougal's transition to a state-of-the-art facility in Nevada.",
    linkedin: "https://www.linkedin.com/in/scott-nelson-5a573b94/",
    twitter: "@scougalrubber",
  },
  {
    id: "alfredo-shanklin",
    name: "Alfredo Shanklin",
    title: "Plant Manager, Seattle",
    avatar: "/employees/as.jpg",
    bio: "Plant Manager in Seattle, ensuring quality and on-time delivery of Scougal's molded and bonded rubber products.",
    linkedin: "",
    twitter: "@scougalrubber",
  },
  {
    id: "ahsan-ativalu",
    name: "Ahsan Ativalu",
    title: "Plant Manager, Reno",
    avatar: "/employees/aa.jpg",
    bio: "Plant Manager in Reno, overseeing production and continuous improvement at Scougal's Nevada facility.",
    linkedin: "",
    twitter: "@scougalrubber",
  },
  {
    id: "brad-streeter",
    name: "Brad Streeter",
    title: "Quality Manager",
    avatar: "/employees/bs.jpg",
    bio: "Quality Manager at Scougal Rubber, responsible for quality systems and compliance across all product lines.",
    linkedin: "",
    twitter: "@scougalrubber",
  },
];

const CATEGORY_SUGGESTIONS = [
  "Manufacturing & Technology",
  "Bridge & Infrastructure",
  "Product Insights",
  "Company News",
  "Industry Insights",
];

const inputClass =
  "w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all";
const labelClass = "block text-sm font-medium text-gray-700 mb-2";
const sectionClass = "bg-white p-6 rounded-lg border border-gray-100 shadow-sm";

function isoToLocalInput(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}
function localInputToIso(local) {
  if (!local) return "";
  const d = new Date(local);
  return isNaN(d.getTime()) ? "" : d.toISOString();
}

export default function MetadataForm({
  metadata,
  setMetadata,
  onSlugChange,
  onStageImage,
}) {
  const [coverPreview, setCoverPreview] = useState("");
  const [coverBusy, setCoverBusy] = useState(false);

  const author = metadata.author || {};
  const selectedAuthorId =
    AUTHORS.find((a) => a.name === author.name)?.id || "";

  function selectAuthor(id) {
    const a = AUTHORS.find((x) => x.id === id);
    if (!a) return;
    setMetadata((prev) => ({
      ...prev,
      author: {
        name: a.name,
        title: a.title,
        bio: a.bio,
        avatar: a.avatar,
        twitter: a.twitter || "",
        linkedin: a.linkedin || "",
      },
    }));
  }

  async function handleCover(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverBusy(true);
    try {
      setCoverPreview(URL.createObjectURL(file));
      const publicPath = await onStageImage(file);
      setMetadata((prev) => ({ ...prev, coverImage: publicPath }));
    } finally {
      setCoverBusy(false);
      e.target.value = "";
    }
  }

  const set = (field) => (e) =>
    setMetadata((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="space-y-6">
      <div className={sectionClass}>
        <h3 className="text-xl font-semibold text-gray-800 mb-1">
          Article details
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Fields marked * are required.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className={labelClass}>Title *</label>
            <input
              type="text"
              placeholder="A clear, descriptive headline"
              className={inputClass}
              value={metadata.title || ""}
              onChange={set("title")}
            />
          </div>
          <div>
            <label className={labelClass}>Slug (URL) *</label>
            <input
              type="text"
              placeholder="my-new-article"
              className={inputClass}
              value={metadata.slug || ""}
              onChange={(e) => onSlugChange(e.target.value)}
            />
            <p className="text-xs text-gray-400 mt-1">
              /blog/{metadata.slug || "…"}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <label className={labelClass}>Description (SEO meta) *</label>
          <textarea
            rows={2}
            placeholder="1–2 sentence summary. 150–160 characters is ideal for Google."
            className={inputClass}
            value={metadata.description || ""}
            onChange={set("description")}
          />
          <p className="text-xs text-gray-400 mt-1">
            {(metadata.description || "").length} characters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className={labelClass}>Cover image</label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="cover-image"
              onChange={handleCover}
            />
            <label
              htmlFor="cover-image"
              className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              {coverBusy ? "Loading…" : "Choose cover image"}
            </label>
            {(coverPreview || metadata.coverImage) && (
              <div className="mt-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverPreview || metadata.coverImage}
                  alt="Cover preview"
                  className="w-28 h-20 object-cover rounded border"
                />
                <span className="text-xs text-gray-500 mt-1 block break-all">
                  {metadata.coverImage}
                </span>
              </div>
            )}
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <input
              type="text"
              list="category-suggestions"
              placeholder="Manufacturing & Technology"
              className={inputClass}
              value={metadata.category || ""}
              onChange={set("category")}
            />
            <datalist id="category-suggestions">
              {CATEGORY_SUGGESTIONS.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className={labelClass}>Tags (comma separated)</label>
            <input
              type="text"
              placeholder="CNC, Efficiency, Innovation"
              className={inputClass}
              value={
                Array.isArray(metadata.tags)
                  ? metadata.tags.join(", ")
                  : metadata.tags || ""
              }
              onChange={(e) =>
                setMetadata((prev) => ({
                  ...prev,
                  tags: e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                }))
              }
            />
          </div>
          <div>
            <label className={labelClass}>Publish date</label>
            <input
              type="datetime-local"
              className={inputClass}
              value={isoToLocalInput(metadata.date)}
              onChange={(e) =>
                setMetadata((prev) => ({
                  ...prev,
                  date: localInputToIso(e.target.value),
                }))
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={labelClass}>Status</label>
            <select
              className={inputClass}
              value={metadata.status || "draft"}
              onChange={set("status")}
            >
              <option value="draft">Draft (hidden)</option>
              <option value="published">Published (live)</option>
            </select>
          </div>
          <div className="flex items-end gap-6">
            <label className="flex items-center gap-2 cursor-pointer pb-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={!!metadata.featured}
                onChange={(e) =>
                  setMetadata((prev) => ({ ...prev, featured: e.target.checked }))
                }
              />
              <span className="text-sm text-gray-700">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer pb-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={!!metadata.trending}
                onChange={(e) =>
                  setMetadata((prev) => ({ ...prev, trending: e.target.checked }))
                }
              />
              <span className="text-sm text-gray-700">Trending</span>
            </label>
          </div>
          <div>
            <label className={labelClass}>Reading time (min)</label>
            <input
              type="number"
              min={0}
              max={60}
              className={inputClass}
              value={metadata.readingTime || 0}
              onChange={set("readingTime")}
            />
          </div>
        </div>
      </div>

      {/* Author */}
      <div className={sectionClass}>
        <h4 className="text-lg font-medium text-gray-800 mb-4">Author</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {AUTHORS.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => selectAuthor(a.id)}
              className={`relative flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                selectedAuthorId === a.id
                  ? "border-blue-500 bg-blue-50 shadow-sm"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden border flex-shrink-0">
                <Image src={a.avatar} alt={a.name} fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900">{a.name}</p>
                <p className="text-sm text-gray-500">{a.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

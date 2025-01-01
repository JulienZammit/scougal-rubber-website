"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

/**
 * The form for metadata (title, slug, images, category, date, etc.)
 * We only store local _coverFile and _ogFile for images, 
 * then actually upload them in handleGeneratePost of ArticleCreation.
 */
export default function MetadataForm({ metadata, setMetadata }) {
  const [categories, setCategories] = useState([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    fetch("/api/list-categories")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      })
      .then((data) => {
        setCategories(data.categories || []);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Cannot fetch categories");
      });
  }, []);

  function handleCategoryChange(e) {
    const val = e.target.value;
    if (val === "__new__") {
      setShowNewCategory(true);
      setMetadata((prev) => ({ ...prev, category: "" }));
    } else {
      setShowNewCategory(false);
      setMetadata((prev) => ({ ...prev, category: val }));
    }
  }

  function handleNewCategorySave() {
    if (!newCategoryName.trim()) {
      toast.error("Please enter a category name");
      return;
    }
    setMetadata((prev) => ({ ...prev, category: newCategoryName.trim() }));
    setCategories((prev) => [...prev, newCategoryName.trim()]);
    setShowNewCategory(false);
    setNewCategoryName("");
  }

  function handleImageSelect(e, field) {
    const file = e.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);

    if (field === "coverImage") {
      setMetadata((prev) => ({
        ...prev,
        _coverFile: file,
        _coverLocalUrl: localUrl,
      }));
    } else {
      setMetadata((prev) => ({
        ...prev,
        _ogFile: file,
        _ogLocalUrl: localUrl,
      }));
    }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Metadata</h3>
      <p className="text-gray-600 mb-4">Title, Slug, Date, and Category are required.</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Title */}
        <div>
          <label className="font-semibold block mb-1">Title (H1)*</label>
          <input
            type="text"
            placeholder="Short descriptive title..."
            className="w-full border border-gray-300 px-2 py-1 rounded"
            value={metadata.title}
            onChange={(e) =>
              setMetadata((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        {/* Description */}
        <div>
          <label className="font-semibold block mb-1">Description (meta)</label>
          <input
            type="text"
            placeholder="Brief summary for SEO..."
            className="w-full border border-gray-300 px-2 py-1 rounded"
            value={metadata.description}
            onChange={(e) =>
              setMetadata((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Slug */}
        <div>
          <label className="font-semibold block mb-1">Slug*</label>
          <input
            type="text"
            placeholder="my-new-article"
            className="w-full border border-gray-300 px-2 py-1 rounded"
            value={metadata.slug}
            onChange={(e) =>
              setMetadata((prev) => ({ ...prev, slug: e.target.value }))
            }
          />
        </div>
        {/* Canonical */}
        <div>
          <label className="font-semibold block mb-1">Canonical URL</label>
          <input
            type="text"
            placeholder="https://www.example.com/blog/my-new-article"
            className="w-full border border-gray-300 px-2 py-1 rounded"
            value={metadata.canonicalUrl}
            onChange={(e) =>
              setMetadata((prev) => ({
                ...prev,
                canonicalUrl: e.target.value,
              }))
            }
          />
        </div>
      </div>

      {/* Cover & OG Image */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-semibold mb-1">Cover Image</label>
          <input
            type="file"
            onChange={(e) => handleImageSelect(e, "coverImage")}
          />
          {metadata._coverLocalUrl && (
            <p className="text-xs text-green-600 mt-1">
              Local preview: {metadata._coverLocalUrl}
            </p>
          )}
        </div>
        <div>
          <label className="block font-semibold mb-1">OG Image</label>
          <input
            type="file"
            onChange={(e) => handleImageSelect(e, "ogImage")}
          />
          {metadata._ogLocalUrl && (
            <p className="text-xs text-green-600 mt-1">
              Local preview: {metadata._ogLocalUrl}
            </p>
          )}
        </div>
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="font-semibold block mb-1">Category*</label>
        <select
          className="w-full border border-gray-300 px-2 py-1 rounded"
          value={showNewCategory ? "__new__" : metadata.category || ""}
          onChange={handleCategoryChange}
        >
          <option value="">(Select a category)</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
          <option value="__new__">+ Add new category</option>
        </select>
        {showNewCategory && (
          <div className="mt-2 flex space-x-2">
            <input
              type="text"
              placeholder="New category name..."
              className="border border-gray-300 px-2 py-1 rounded"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <button
              onClick={handleNewCategorySave}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Tags */}
        <div>
          <label className="font-semibold block mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            placeholder="CNC, Efficiency..."
            className="w-full border border-gray-300 px-2 py-1 rounded"
            value={metadata.tags}
            onChange={(e) =>
              setMetadata((prev) => ({ ...prev, tags: e.target.value }))
            }
          />
        </div>
        {/* Date */}
        <div>
          <label className="font-semibold block mb-1">Date*</label>
          <input
            type="datetime-local"
            className="w-full border border-gray-300 px-2 py-1 rounded"
            value={metadata.date}
            onChange={(e) =>
              setMetadata((prev) => ({ ...prev, date: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* LastModified */}
        <div>
          <label className="font-semibold block mb-1">Last Modified</label>
          <input
            type="datetime-local"
            className="w-full border border-gray-300 px-2 py-1 rounded"
            value={metadata.lastModified}
            onChange={(e) =>
              setMetadata((prev) => ({
                ...prev,
                lastModified: e.target.value,
              }))
            }
          />
        </div>
        {/* Status */}
        <div>
          <label className="font-semibold block mb-1">Publication Status</label>
          <select
            className="w-full border border-gray-300 px-2 py-1 rounded"
            value={metadata.status}
            onChange={(e) =>
              setMetadata((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      {/* featured & trending */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={metadata.featured}
            onChange={(e) =>
              setMetadata((prev) => ({ ...prev, featured: e.target.checked }))
            }
          />
          <label>Featured</label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={metadata.trending}
            onChange={(e) =>
              setMetadata((prev) => ({ ...prev, trending: e.target.checked }))
            }
          />
          <label>Trending</label>
        </div>
      </div>

      {/* Author Info */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="font-semibold block mb-1">Author Name</label>
          <input
            type="text"
            placeholder="John Smith"
            className="w-full border border-gray-300 px-2 py-1 rounded"
            value={metadata.authorName}
            onChange={(e) =>
              setMetadata((prev) => ({ ...prev, authorName: e.target.value }))
            }
          />
        </div>
        <div>
          <label className="font-semibold block mb-1">Author Title</label>
          <input
            type="text"
            placeholder="Expert in Manufacturing"
            className="w-full border border-gray-300 px-2 py-1 rounded"
            value={metadata.authorTitle}
            onChange={(e) =>
              setMetadata((prev) => ({ ...prev, authorTitle: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="font-semibold block mb-1">Author Bio</label>
          <input
            type="text"
            placeholder="Short intro for author..."
            className="w-full border border-gray-300 px-2 py-1 rounded"
            value={metadata.authorBio}
            onChange={(e) =>
              setMetadata((prev) => ({ ...prev, authorBio: e.target.value }))
            }
          />
        </div>
        <div>
          <label className="font-semibold block mb-1">Author Avatar</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-2 py-1 rounded"
            value={metadata.authorAvatar}
            onChange={(e) =>
              setMetadata((prev) => ({
                ...prev,
                authorAvatar: e.target.value,
              }))
            }
          />
          <p className="text-xs text-gray-400">Default: /employees/sn.jpg</p>
        </div>
      </div>

      {/* readingTime & prerequisites */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="font-semibold block mb-1">
            Reading Time (0-60 min)
          </label>
          <input
            type="number"
            className="w-full border border-gray-300 px-2 py-1 rounded"
            value={metadata.readingTime || 0}
            onChange={(e) =>
              setMetadata((prev) => ({
                ...prev,
                readingTime: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label className="font-semibold block mb-1">Prerequisites</label>
          <input
            type="text"
            placeholder="comma-separated..."
            className="w-full border border-gray-300 px-2 py-1 rounded"
            value={metadata.prerequisites}
            onChange={(e) =>
              setMetadata((prev) => ({
                ...prev,
                prerequisites: e.target.value,
              }))
            }
          />
        </div>
      </div>
    </div>
  );
}

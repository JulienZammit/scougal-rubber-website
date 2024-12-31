"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function MetadataForm({ metadata, setMetadata }) {
  const [categories, setCategories] = useState([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // We'll store local object URLs in e.g. metadata._coverFile, metadata._coverUrl
  // or do a separate piece of state. For simplicity, let's store them in metadata.

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

  // Instead of uploading to Azure, just store file in memory
  function handleImageSelect(e, field) {
    const file = e.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    // e.g. store them in _coverFile / _coverUrl
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
      <p className="text-gray-600 mb-4">
        (*) Title, Slug, Category, and Date are required.
      </p>

      {/* Title & Description */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="font-semibold block mb-1">
            Title (H1)<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            placeholder="Short, descriptive title..."
            className="w-full border border-gray-300 px-2 py-1 rounded"
            value={metadata.title}
            onChange={(e) =>
              setMetadata((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div>
          <label className="font-semibold block mb-1">Description (meta)</label>
          <input
            type="text"
            placeholder="A brief summary for SEO..."
            className="w-full border border-gray-300 px-2 py-1 rounded"
            value={metadata.description}
            onChange={(e) =>
              setMetadata((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>
      </div>

      {/* Slug & Canonical */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="font-semibold block mb-1">
            Slug<span className="text-red-500 ml-1">*</span>
          </label>
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

      {/* Cover & OG Image => no immediate upload, just local preview */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-semibold mb-1">Cover Image</label>
          <input
            name="file"
            type="file"
            onChange={(e) => handleImageSelect(e, "coverImage")}
          />
          {metadata._coverLocalUrl && (
            <p className="text-xs mt-1 text-green-600">
              Local preview: {metadata._coverLocalUrl}
            </p>
          )}
        </div>
        <div>
          <label className="block font-semibold mb-1">OG Image</label>
          <input
            name="file"
            type="file"
            onChange={(e) => handleImageSelect(e, "ogImage")}
          />
          {metadata._ogLocalUrl && (
            <p className="text-xs mt-1 text-green-600">
              Local preview: {metadata._ogLocalUrl}
            </p>
          )}
        </div>
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="font-semibold block mb-1">
          Category<span className="text-red-500 ml-1">*</span>
        </label>
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

      {/* Tags & Date */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="font-semibold block mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            placeholder="CNC, Efficiency, Innovation"
            className="w-full border border-gray-300 px-2 py-1 rounded"
            value={metadata.tags}
            onChange={(e) =>
              setMetadata((prev) => ({ ...prev, tags: e.target.value }))
            }
          />
        </div>
        <div>
          <label className="font-semibold block mb-1">
            Date<span className="text-red-500 ml-1">*</span>
          </label>
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

      {/* LastModified & Status */}
      <div className="grid grid-cols-2 gap-4 mb-4">
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

      {/* Featured & Trending */}
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
            placeholder="Scott Nelson"
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
            placeholder="Expert in Sales Strategy"
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
            placeholder="Short introduction for the author..."
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
          <p className="text-xs text-gray-400">
            Default: /employees/sn.jpg (e.g. initials for the employee)
          </p>
        </div>
      </div>

      {/* Reading Time & Prerequisites */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="font-semibold block mb-1">
            Reading Time (0-60 minutes)
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
            placeholder="comma-separated (e.g. Basic knowledge...)"
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

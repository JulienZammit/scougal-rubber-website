import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Upload, Plus, X } from "lucide-react";
import Image from "next/image";

export default function MetadataForm({ metadata, setMetadata }) {
  const [categories, setCategories] = useState([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Keeping all existing functions unchanged
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

  // Style classes
  const inputClass = "w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";
  const sectionClass = "bg-white p-6 rounded-lg border border-gray-100 shadow-sm";
  
  return (
    <div className="space-y-8">
      <div className={sectionClass}>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Article Metadata</h3>
        <p className="text-sm text-gray-500 mb-6">Fields marked with * are required</p>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className={labelClass}>Title (H1)*</label>
            <input
              type="text"
              placeholder="Short descriptive title..."
              className={inputClass}
              value={metadata.title}
              onChange={(e) => setMetadata((prev) => ({ ...prev, title: e.target.value }))}
            />
          </div>
          <div>
            <label className={labelClass}>Description (meta)</label>
            <input
              type="text"
              placeholder="Brief summary for SEO..."
              className={inputClass}
              value={metadata.description}
              onChange={(e) => setMetadata((prev) => ({ ...prev, description: e.target.value }))}
            />
          </div>
        </div>

        {/* URL Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className={labelClass}>Slug*</label>
            <input
              type="text"
              placeholder="my-new-article"
              className={inputClass}
              value={metadata.slug}
              onChange={(e) => setMetadata((prev) => ({ ...prev, slug: e.target.value }))}
            />
          </div>
          <div>
            <label className={labelClass}>Canonical URL</label>
            <input
              type="text"
              placeholder="https://www.example.com/blog/my-new-article"
              className={inputClass}
              value={metadata.canonicalUrl}
              onChange={(e) => setMetadata((prev) => ({ ...prev, canonicalUrl: e.target.value }))}
            />
          </div>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className={labelClass}>Cover Image</label>
            <div className="relative">
              <input
                type="file"
                className="hidden"
                id="cover-image"
                onChange={(e) => handleImageSelect(e, "coverImage")}
              />
              <label 
                htmlFor="cover-image"
                className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose Cover Image
              </label>
              {metadata._coverLocalUrl && (
                <div className="mt-2 relative">
                  <Image
                    src={metadata._coverLocalUrl}
                    alt="Cover preview"
                    className="w-24 h-24 object-cover rounded"
                  />
                  <span className="text-xs text-green-600 mt-1 block">Image selected</span>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label className={labelClass}>OG Image (for sharing)</label>
            <div className="relative">
              <input
                type="file"
                className="hidden"
                id="og-image"
                onChange={(e) => handleImageSelect(e, "ogImage")}
              />
              <label 
                htmlFor="og-image"
                className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose OG Image
              </label>
              {metadata._ogLocalUrl && (
                <div className="mt-2 relative">
                  <Image
                    src={metadata._ogLocalUrl}
                    alt="OG preview"
                    className="w-24 h-24 object-cover rounded"
                  />
                  <span className="text-xs text-green-600 mt-1 block">Image selected</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="mb-8">
          <label className={labelClass}>Category*</label>
          <select
            className={inputClass}
            value={showNewCategory ? "__new__" : metadata.category || ""}
            onChange={handleCategoryChange}
          >
            <option value="">(Select a category)</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
            <option value="__new__">+ Add new category</option>
          </select>
          
          {showNewCategory && (
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                placeholder="New category name..."
                className={inputClass}
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <button
                onClick={handleNewCategorySave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </button>
            </div>
          )}
        </div>

        {/* Tags and Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className={labelClass}>Tags (comma separated)</label>
            <input
              type="text"
              placeholder="CNC, Efficiency..."
              className={inputClass}
              value={metadata.tags}
              onChange={(e) => setMetadata((prev) => ({ ...prev, tags: e.target.value }))}
            />
          </div>
          <div>
            <label className={labelClass}>Date*</label>
            <input
              type="datetime-local"
              className={inputClass}
              value={metadata.date}
              onChange={(e) => setMetadata((prev) => ({ ...prev, date: e.target.value }))}
            />
          </div>
        </div>

        {/* Publication Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className={labelClass}>Last Modified</label>
            <input
              type="datetime-local"
              className={inputClass}
              value={metadata.lastModified}
              onChange={(e) => setMetadata((prev) => ({ ...prev, lastModified: e.target.value }))}
            />
          </div>
          <div>
            <label className={labelClass}>Publication Status</label>
            <select
              className={inputClass}
              value={metadata.status}
              onChange={(e) => setMetadata((prev) => ({ ...prev, status: e.target.value }))}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {/* Flags */}
        {/* <div className="flex gap-6 mb-8">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              checked={metadata.featured}
              onChange={(e) => setMetadata((prev) => ({ ...prev, featured: e.target.checked }))}
            />
            <span className="text-sm text-gray-700">Featured Article</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              checked={metadata.trending}
              onChange={(e) => setMetadata((prev) => ({ ...prev, trending: e.target.checked }))}
            />
            <span className="text-sm text-gray-700">Trending Article</span>
          </label>
        </div> */}

        {/* Author Information */}
        <div className="border-t border-gray-100 pt-8">
          <h4 className="text-lg font-medium text-gray-800 mb-6">Author Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className={labelClass}>Author Name</label>
              <input
                type="text"
                placeholder="John Smith"
                className={inputClass}
                value={metadata.authorName}
                onChange={(e) => setMetadata((prev) => ({ ...prev, authorName: e.target.value }))}
              />
            </div>
            <div>
              <label className={labelClass}>Author Title</label>
              <input
                type="text"
                placeholder="Expert in Manufacturing"
                className={inputClass}
                value={metadata.authorTitle}
                onChange={(e) => setMetadata((prev) => ({ ...prev, authorTitle: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className={labelClass}>Author Bio</label>
              <input
                type="text"
                placeholder="Short intro for author..."
                className={inputClass}
                value={metadata.authorBio}
                onChange={(e) => setMetadata((prev) => ({ ...prev, authorBio: e.target.value }))}
              />
            </div>
            <div>
              <label className={labelClass}>Author Avatar</label>
              <input
                type="text"
                className={inputClass}
                value={metadata.authorAvatar}
                onChange={(e) => setMetadata((prev) => ({ ...prev, authorAvatar: e.target.value }))}
              />
              <p className="text-xs text-gray-400 mt-1">Default: /employees/sn.jpg</p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="border-t border-gray-100 pt-8">
          <h4 className="text-lg font-medium text-gray-800 mb-6">Additional Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Reading Time (0-60 min)</label>
              <input
                type="number"
                className={inputClass}
                value={metadata.readingTime || 0}
                onChange={(e) => setMetadata((prev) => ({ ...prev, readingTime: e.target.value }))}
              />
            </div>
            {/* <div>
              <label className={labelClass}>Prerequisites</label>
              <input
                type="text"
                placeholder="comma-separated..."
                className={inputClass}
                value={metadata.prerequisites}
                onChange={(e) => setMetadata((prev) => ({ ...prev, prerequisites: e.target.value }))}
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
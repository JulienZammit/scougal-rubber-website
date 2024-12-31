"use client";

import { toast } from "react-toastify";

export default function BlockItem({ block, index, blocks, setBlocks, onMove, onDelete }) {
  function updateBlock(field, value) {
    const copy = [...blocks];
    copy[index] = { ...copy[index], [field]: value };
    setBlocks(copy);
  }

  async function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        toast.error("Block image upload failed");
        return;
      }
      const { imageUrl } = await res.json();
      updateBlock("url", imageUrl);
      toast.success(`Image uploaded: ${imageUrl}`);
    } catch (err) {
      toast.error(err.message);
    }
  }

  function addBold() {
    const text = block.text || "";
    updateBlock("text", `**${text}**`);
  }
  function addLink() {
    const text = block.text || "";
    updateBlock("text", `[${text}](https://example.com)`);
  }

  return (
    <div className="mb-4 border p-2 rounded relative bg-gray-50">
      <div className="absolute top-2 right-2 space-x-2">
        <button
          onClick={() => onMove(index, "up")}
          className="text-xs bg-gray-200 px-1 rounded"
        >
          ↑
        </button>
        <button
          onClick={() => onMove(index, "down")}
          className="text-xs bg-gray-200 px-1 rounded"
        >
          ↓
        </button>
        <button
          onClick={() => onDelete(index)}
          className="text-xs bg-red-200 px-1 rounded"
        >
          X
        </button>
      </div>
      {block.type === "h1" || block.type === "h2" || block.type === "h3" ? (
        <>
          <label className="block font-bold mb-1">
            {block.type.toUpperCase()}
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 px-2 py-1 rounded"
            value={block.text || ""}
            onChange={(e) => updateBlock("text", e.target.value)}
          />
          <div className="mt-2 flex space-x-2">
            <button onClick={addBold} className="py-1 px-2 bg-gray-200 text-sm rounded">
              Bold
            </button>
            <button onClick={addLink} className="py-1 px-2 bg-gray-200 text-sm rounded">
              Link
            </button>
          </div>
        </>
      ) : block.type === "text" ? (
        <>
          <label className="block font-bold mb-1">Paragraph</label>
          <textarea
            rows={3}
            className="w-full border border-gray-300 px-2 py-1 rounded"
            value={block.text || ""}
            onChange={(e) => updateBlock("text", e.target.value)}
          />
          <div className="mt-2 flex space-x-2">
            <button onClick={addBold} className="py-1 px-2 bg-gray-200 text-sm rounded">
              Bold
            </button>
            <button onClick={addLink} className="py-1 px-2 bg-gray-200 text-sm rounded">
              Link
            </button>
          </div>
        </>
      ) : block.type === "image" ? (
        <>
          <label className="block font-bold mb-1">Image Block</label>
          <input type="file" onChange={handleImageUpload} />
          {block.url && (
            <p className="text-xs mt-1 text-green-600">Uploaded: {block.url}</p>
          )}
          <label className="block font-semibold mt-2">Alt Text</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-2 py-1 rounded"
            value={block.alt || ""}
            onChange={(e) => updateBlock("alt", e.target.value)}
          />
        </>
      ) : null}
    </div>
  );
}

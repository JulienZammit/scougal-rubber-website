"use client";
import { useRef, useState } from "react";
import { Bold, Link as LinkIcon, ChevronUp, ChevronDown, X, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function BlockItem({
  block,
  index,
  blocks,
  setBlocks,
  onMove,
  onDelete,
}) {
  const textRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  function updateBlock(field, value) {
    const newBlocks = [...blocks];
    newBlocks[index] = { ...newBlocks[index], [field]: value };
    setBlocks(newBlocks);
  }

  function handleImageSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    const updated = {
      ...block,
      url: localUrl,
      _file: file,
      alt: block.alt || "my image",
    };

    const newBlocks = [...blocks];
    newBlocks[index] = updated;
    setBlocks(newBlocks);
  }

  function wrapSelectionWithMarkdown(prefix, suffix) {
    if (!textRef.current) return;
    const node = textRef.current;
    const text = node.value;
    const start = node.selectionStart;
    const end = node.selectionEnd;

    if (start === end) {
      setErrorMessage("Please select some text to apply formatting.");
      return;
    }

    setErrorMessage("");
    const selectedText = text.substring(start, end);
    const replaced = prefix + selectedText + suffix;
    const newText = text.substring(0, start) + replaced + text.substring(end);
    node.value = newText;
    updateBlock("text", newText);
    node.focus();
    const newPosStart = start + prefix.length;
    const newPosEnd = newPosStart + selectedText.length;
    node.setSelectionRange(newPosStart, newPosEnd);
  }

  function addBold() {
    wrapSelectionWithMarkdown("**", "**");
  }

  function addLink() {
    wrapSelectionWithMarkdown("[", "](https://example.com)");
  }

  return (
    <div className="relative bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md">
      {/* Block Controls */}
      <div className="absolute right-3 top-3 flex items-center space-x-1">
        <button
          onClick={() => onMove(index, "up")}
          className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          title="Move Up"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <button
          onClick={() => onMove(index, "down")}
          className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          title="Move Down"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(index)}
          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
          title="Delete"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4">
        {/* Text Blocks (Headers & Paragraphs) */}
        {(["h1", "h2", "h3", "text"].includes(block.type)) && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {block.type === "text" ? "Paragraph" : block.type.toUpperCase()}
            </label>
            
            {block.type === "text" ? (
              <textarea
                ref={textRef}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y"
                value={block.text || ""}
                onChange={(e) => updateBlock("text", e.target.value)}
                placeholder="Enter your text here..."
              />
            ) : (
              <input
                ref={textRef}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={block.text || ""}
                onChange={(e) => updateBlock("text", e.target.value)}
                placeholder={`Enter ${block.type} text...`}
              />
            )}

            <div className="flex space-x-2">
              <button
                onClick={addBold}
                className="inline-flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md transition-colors"
              >
                <Bold className="w-4 h-4 mr-1.5" />
                Bold
              </button>
              <button
                onClick={addLink}
                className="inline-flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md transition-colors"
              >
                <LinkIcon className="w-4 h-4 mr-1.5" />
                Link
              </button>
            </div>
            
            {errorMessage && (
              <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
            )}
          </div>
        )}

        {/* Image Block */}
        {block.type === "image" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Image Block
              </label>
            </div>

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors cursor-pointer"
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleImageSelect}
                className="hidden"
                accept="image/*"
              />
              
              {!block.url ? (
                <div className="text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <Image
                    src={block.url}
                    alt={block.alt || "image preview"}
                    className="max-w-full h-auto rounded-md"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alt Text
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={block.alt || ""}
                onChange={(e) => updateBlock("alt", e.target.value)}
                placeholder="Describe your image..."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
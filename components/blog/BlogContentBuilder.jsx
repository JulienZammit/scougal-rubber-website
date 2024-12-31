/* ------------------------------------------------------------------
   BlogContentBuilder.jsx
   The only difference is: we remove the max-h on the preview.
   We'll add a prop "noMaxHeight" if you want no max-h style. 
------------------------------------------------------------------ */

"use client";

import ReactMarkdown from "react-markdown";
import BlockItem from "./BlockItem";
import { useState } from "react";

export default function BlogContentBuilder({
  blocks,
  setBlocks,
  onGeneratePost,
  noMaxHeight = false,
}) {
  function addBlock(type) {
    if (["h1", "h2", "h3", "text"].includes(type)) {
      setBlocks((prev) => [...prev, { type, text: "" }]);
    } else if (type === "image") {
      setBlocks((prev) => [...prev, { type: "image", url: "", alt: "" }]);
    }
  }

  function moveBlock(index, direction) {
    const newBlocks = [...blocks];
    if (direction === "up" && index > 0) {
      [newBlocks[index - 1], newBlocks[index]] = [
        newBlocks[index],
        newBlocks[index - 1],
      ];
    } else if (direction === "down" && index < newBlocks.length - 1) {
      [newBlocks[index + 1], newBlocks[index]] = [
        newBlocks[index],
        newBlocks[index + 1],
      ];
    }
    setBlocks(newBlocks);
  }

  function deleteBlock(index) {
    const newBlocks = [...blocks];
    newBlocks.splice(index, 1);
    setBlocks(newBlocks);
  }

  function blocksToMarkdown() {
    let md = "";
    for (const block of blocks) {
      if (block.type === "h1") {
        md += `# ${block.text}\n\n`;
      } else if (block.type === "h2") {
        md += `## ${block.text}\n\n`;
      } else if (block.type === "h3") {
        md += `### ${block.text}\n\n`;
      } else if (block.type === "text") {
        md += `${block.text}\n\n`;
      } else if (block.type === "image") {
        md += `![${block.alt || "image"}](${block.url})\n\n`;
      }
    }
    return md.trim();
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Blog Content</h3>
      <p className="text-sm text-gray-600 mb-4">
        Build your article blocks. You have a live preview on the right.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: block editor */}
        <div>
          <div className="flex space-x-2 mb-4">
            <button
              className="py-1 px-2 bg-blue-500 text-white rounded"
              onClick={() => addBlock("h1")}
            >
              + H1
            </button>
            <button
              className="py-1 px-2 bg-blue-500 text-white rounded"
              onClick={() => addBlock("h2")}
            >
              + H2
            </button>
            <button
              className="py-1 px-2 bg-blue-500 text-white rounded"
              onClick={() => addBlock("h3")}
            >
              + H3
            </button>
            <button
              className="py-1 px-2 bg-blue-500 text-white rounded"
              onClick={() => addBlock("text")}
            >
              + Text
            </button>
            <button
              className="py-1 px-2 bg-blue-500 text-white rounded"
              onClick={() => addBlock("image")}
            >
              + Image
            </button>
          </div>

          {blocks.map((block, i) => (
            <BlockItem
              key={i}
              block={block}
              index={i}
              blocks={blocks}
              setBlocks={setBlocks}
              onMove={moveBlock}
              onDelete={deleteBlock}
            />
          ))}

          <button
            onClick={onGeneratePost}
            className="mt-4 w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Generate/Update Post
          </button>
        </div>

        {/* Right: live preview => NO max-h style */}
        <div className="border p-4 rounded bg-gray-50 overflow-auto">
          <h4 className="text-md font-semibold mb-2">Live Preview</h4>
          <div className="prose prose-sm sm:prose lg:prose-lg">
            <ReactMarkdown>{blocksToMarkdown()}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

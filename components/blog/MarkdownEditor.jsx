"use client";

import { useRef, useState } from "react";
import { marked } from "marked";
import { Bold, Italic, Heading2, Heading3, List, Link2, Image as ImageIcon, Eye, Code } from "lucide-react";

marked.setOptions({ gfm: true, breaks: false });

export default function MarkdownEditor({ body, setBody, onInsertImage, images = [] }) {
  const taRef = useRef(null);
  const [imgBusy, setImgBusy] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  // Staged images aren't on disk yet, so their /blog/<slug>/... path 404s in the
  // preview. Swap each staged path for its in-memory data URL for previewing only.
  function previewMarkdown() {
    let src = body || "*Nothing to preview yet.*";
    for (const img of images) {
      if (img?.path && img?.base64) src = src.split(`/${img.path}`).join(img.base64);
    }
    return src;
  }

  // Insert text around the current selection in the textarea.
  function surround(before, after = "", placeholder = "") {
    const ta = taRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = body.slice(start, end) || placeholder;
    const next = body.slice(0, start) + before + selected + after + body.slice(end);
    setBody(next);
    requestAnimationFrame(() => {
      ta.focus();
      const cursor = start + before.length + selected.length;
      ta.setSelectionRange(cursor, cursor);
    });
  }

  function prefixLine(prefix) {
    const ta = taRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const lineStart = body.lastIndexOf("\n", start - 1) + 1;
    const next = body.slice(0, lineStart) + prefix + body.slice(lineStart);
    setBody(next);
    requestAnimationFrame(() => ta.focus());
  }

  function insertAtCursor(text) {
    const ta = taRef.current;
    const pos = ta ? ta.selectionStart : body.length;
    setBody(body.slice(0, pos) + text + body.slice(pos));
    requestAnimationFrame(() => {
      if (!ta) return;
      ta.focus();
      const cursor = pos + text.length;
      ta.setSelectionRange(cursor, cursor);
    });
  }

  async function handleImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgBusy(true);
    try {
      const publicPath = await onInsertImage(file);
      const alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
      insertAtCursor(`\n![${alt}](${publicPath})\n`);
    } finally {
      setImgBusy(false);
      e.target.value = "";
    }
  }

  const Btn = ({ onClick, title, children }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="p-2 rounded hover:bg-gray-100 text-gray-600"
    >
      {children}
    </button>
  );

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-gray-100 flex-wrap">
        <Btn onClick={() => prefixLine("## ")} title="Heading 2">
          <Heading2 className="w-4 h-4" />
        </Btn>
        <Btn onClick={() => prefixLine("### ")} title="Heading 3">
          <Heading3 className="w-4 h-4" />
        </Btn>
        <Btn onClick={() => surround("**", "**", "bold text")} title="Bold">
          <Bold className="w-4 h-4" />
        </Btn>
        <Btn onClick={() => surround("_", "_", "italic text")} title="Italic">
          <Italic className="w-4 h-4" />
        </Btn>
        <Btn onClick={() => prefixLine("- ")} title="List item">
          <List className="w-4 h-4" />
        </Btn>
        <Btn onClick={() => surround("[", "](https://)", "link text")} title="Link">
          <Link2 className="w-4 h-4" />
        </Btn>
        <Btn onClick={() => surround("`", "`", "code")} title="Inline code">
          <Code className="w-4 h-4" />
        </Btn>
        <label
          className="p-2 rounded hover:bg-gray-100 text-gray-600 cursor-pointer"
          title="Insert image"
        >
          <ImageIcon className="w-4 h-4" />
          <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
        </label>
        {imgBusy && <span className="text-xs text-gray-400 ml-1">uploading…</span>}

        <div className="ml-auto">
          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            className="flex items-center gap-1 text-sm px-2 py-1 rounded hover:bg-gray-100 text-gray-600"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? "Hide preview" : "Show preview"}
          </button>
        </div>
      </div>

      {/* Editor + preview */}
      <div className={`grid ${showPreview ? "md:grid-cols-2" : "grid-cols-1"} divide-x divide-gray-100`}>
        <textarea
          ref={taRef}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          spellCheck
          placeholder="Write your article in Markdown…"
          className="w-full min-h-[480px] p-4 font-mono text-sm outline-none resize-y rounded-bl-lg"
        />
        {showPreview && (
          <div
            className="prose prose-sm max-w-none p-4 overflow-auto min-h-[480px] prose-headings:scroll-mt-20"
            dangerouslySetInnerHTML={{ __html: marked.parse(previewMarkdown()) }}
          />
        )}
      </div>
    </div>
  );
}

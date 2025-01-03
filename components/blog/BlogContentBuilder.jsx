import ReactMarkdown from "react-markdown";
import BlockItem from "./BlockItem";
import { PlusCircle, Type, Image as ImageIcon, FileText, Heading1, Heading2, Heading3, Eye } from "lucide-react";

export default function BlogContentBuilder({ blocks, setBlocks, onGeneratePost }) {
  // Keeping all existing functions unchanged
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
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
    } else if (direction === "down" && index < newBlocks.length - 1) {
      [newBlocks[index + 1], newBlocks[index]] = [newBlocks[index], newBlocks[index + 1]];
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
        const alt = block.alt?.trim() || "image";
        const src = block.url?.trim() || "";
        if (src && !src.startsWith("blob:")) {
          md += `![${alt}](${src})\n\n`;
        } else {
          md += `\n\n[Placeholder for image: An image will be displayed here after it is uploaded and saved.]\n\n`;
        }
      }
    }
    return md.trim();
  }

  const renderers = {
    paragraph: ({ children }) => {
      if (typeof children[0] === "string" && children[0].includes("Image not displayed in preview")) {
        return (
          <div className="p-4 border-2 border-dashed border-yellow-400 bg-yellow-50 rounded-lg">
            <p className="text-yellow-700 font-medium flex items-center">
              <ImageIcon className="w-4 h-4 mr-2" />
              {children}
            </p>
          </div>
        );
      }
      return <p>{children}</p>;
    },
  };

  const blockTypes = [
    { type: "h1", icon: Heading1, label: "Heading 1" },
    { type: "h2", icon: Heading2, label: "Heading 2" },
    { type: "h3", icon: Heading3, label: "Heading 3" },
    { type: "text", icon: Type, label: "Paragraph" },
    { type: "image", icon: ImageIcon, label: "Image" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Content Editor
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            {/* Block Type Buttons */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-3">Add Content Blocks</p>
              <div className="flex flex-wrap gap-2">
                {blockTypes.map(({ type, icon: Icon, label }) => (
                  <button
                    key={type}
                    onClick={() => addBlock(type)}
                    className="inline-flex items-center px-3 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4 mr-1.5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Blocks */}
            <div className="space-y-4">
              {blocks.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <PlusCircle className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">Add your first content block using the buttons above</p>
                </div>
              ) : (
                blocks.map((block, i) => (
                  <BlockItem
                    key={i}
                    block={block}
                    index={i}
                    blocks={blocks}
                    setBlocks={setBlocks}
                    onMove={moveBlock}
                    onDelete={deleteBlock}
                  />
                ))
              )}
            </div>

            {blocks.length > 0 && (
              <button
                onClick={onGeneratePost}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
              >
                Generate/Update Post
              </button>
            )}
          </div>

          {/* Preview Panel */}
          <div className="sticky top-4">
            <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
                <h4 className="font-medium text-gray-800 flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  Live Preview
                </h4>
              </div>
              <div className="p-6 overflow-y-auto max-h-[800px]">
                <div className="prose prose-sm sm:prose lg:prose-lg prose-blue max-w-none">
                  <ReactMarkdown components={renderers}>
                    {blocksToMarkdown()}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
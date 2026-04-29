"use client";

import { PortableText } from "@portabletext/react";
import { urlFor } from "@/service/sanity";

const slugify = (text) =>
  (text || "")
    .toString()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

function getHeadingText(value) {
  if (!value?.children) return "";
  return value.children.map((c) => c.text || "").join("");
}

const components = {
  block: {
    h2: ({ children, value }) => {
      const slug = slugify(getHeadingText(value));
      return (
        <h2 id={slug} className="flex items-center gap-4 group scroll-mt-24">
          <span>{children}</span>
          <a
            href={`#${slug}`}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400"
            aria-label="Anchor link"
          >
            #
          </a>
        </h2>
      );
    },
    h3: ({ children, value }) => {
      const slug = slugify(getHeadingText(value));
      return (
        <h3 id={slug} className="flex items-center gap-4 group scroll-mt-24">
          <span>{children}</span>
          <a
            href={`#${slug}`}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400"
            aria-label="Anchor link"
          >
            #
          </a>
        </h3>
      );
    },
    h4: ({ children }) => <h4 className="font-semibold">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
        {children}
      </blockquote>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const src = urlFor(value).width(1200).fit("max").auto("format").url();
      return (
        <figure className="my-8">
          <img
            src={src}
            alt={value.alt || ""}
            loading="lazy"
            className="rounded-md w-full h-auto"
          />
          {value.caption && (
            <figcaption className="text-sm text-gray-500 mt-2 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    link: ({ value, children }) => {
      const target = value?.blank ? "_blank" : undefined;
      const rel = value?.blank ? "noopener noreferrer" : undefined;
      return (
        <a href={value?.href} target={target} rel={rel}>
          {children}
        </a>
      );
    },
    code: ({ children }) => (
      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">{children}</code>
    ),
  },
};

export default function PortableTextRenderer({ value }) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}

export function extractHeadings(blocks) {
  if (!Array.isArray(blocks)) return [];
  return blocks
    .filter(
      (b) => b._type === "block" && (b.style === "h2" || b.style === "h3")
    )
    .map((b) => {
      const text = (b.children || []).map((c) => c.text || "").join("");
      return {
        level: b.style === "h2" ? 2 : 3,
        text,
        slug: slugify(text),
      };
    });
}

import React from "react";
import { getAllPosts, getAllPostSlugs, getPostBySlug } from "@/service/blog";
import BlogPostDetailClient from "./BlogPostDetailClient";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.scougalrubber.com";
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const ogImage = post.ogImage?.startsWith("http")
    ? post.ogImage
    : `${baseUrl}${post.ogImage || "/logo.webp"}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags ?? [],
    openGraph: {
      title: post.title,
      description: post.description,
      url: postUrl,
      siteName: "Scougal Rubber",
      images: [{ url: ogImage, alt: post.title }],
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.lastModified || post.date,
      authors: [post.author?.name || "Scougal Rubber"],
      tags: post.tags,
    },
    twitter: {
      card: post.twitterCard || "summary_large_image",
      title: post.title,
      description: post.description,
      creator: post.twitterCreator || post.author?.twitter || "@ScougalRubber",
      images: [ogImage],
    },
    alternates: {
      canonical: post.canonicalUrl
        ? post.canonicalUrl.startsWith("http")
          ? post.canonicalUrl
          : `${baseUrl}${post.canonicalUrl}`
        : postUrl,
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  };
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

function generateJSONLD(post) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.scougalrubber.com";
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const image = post.ogImage?.startsWith("http")
    ? post.ogImage
    : `${baseUrl}${post.ogImage || "/logo.webp"}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image,
    datePublished: post.date,
    dateModified: post.lastModified ?? post.date,
    author: {
      "@type": "Person",
      name: post.author?.name || "Scougal Rubber",
      ...(post.author?.twitter && {
        sameAs: [`https://twitter.com/${post.author.twitter.replace("@", "")}`],
      }),
    },
    publisher: {
      "@type": "Organization",
      name: "Scougal Rubber Corporation",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.webp`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    keywords: post.tags?.join(", "),
    articleSection: post.category || "Blog",
    wordCount: post.wordCount ?? 500,
  };
}

export const dynamic = "force-static";
export const revalidate = 60;

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const jsonLd = JSON.stringify(generateJSONLD(post));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <BlogPostDetailClient post={post} allPosts={allPosts} />
    </>
  );
}

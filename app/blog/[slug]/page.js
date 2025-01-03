// app/blog/[slug]/page.js

import React from "react";
import { getAllPosts, getPostBySlug } from "@/lib/postsAzure";
import BlogPostDetailClient from "./BlogPostDetailClient";
import { notFound } from "next/navigation";

/* --------------------------------------------------
   1) GÉNÉRATION DES MÉTADONNÉES DYNAMIQUES
   -------------------------------------------------- */
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug); // on attend le post

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.scougalrubber.com";
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const ogImage = post.ogImage || `${baseUrl}/default-og-image.jpg`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags ?? [],
    openGraph: {
      title: post.title,
      description: post.description,
      url: postUrl,
      siteName: "Scougal Rubber",
      images: [
        {
          url: ogImage,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.lastModified || post.date,
      authors: [post.author?.name || "Scougal Rubber"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: post.author?.twitter || "@ScougalRubber",
      images: [ogImage],
    },
    alternates: {
      canonical: post.canonicalUrl || postUrl,
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

/* --------------------------------------------------
   2) GÉNÉRATION DES ROUTES STATIQUES (SSG)
   -------------------------------------------------- */
export async function generateStaticParams() {
  // On appelle directement Azure
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug, // sans .md
  }));
}

/* --------------------------------------------------
   3) FONCTION POUR CRÉER LE JSON-LD (STRUCTURED DATA)
   -------------------------------------------------- */
function generateJSONLD(post) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.scougalrubber.com";
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.ogImage ?? `${baseUrl}/default-og-image.jpg`,
    datePublished: post.date,
    dateModified: post.lastModified ?? post.date,
    author: {
      "@type": "Person",
      name: post.author?.name || "Scougal Rubber",
      ...(post.author?.twitter && {
        sameAs: [`https://twitter.com/${post.author.twitter}`],
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
    articleBody: post.content,
  };
}

export const dynamic = "force-dynamic";

/* --------------------------------------------------
   4) COMPOSANT DE PAGE (SERVER COMPONENT)
   -------------------------------------------------- */
export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  // On récupère la liste des posts pour l'affichage des "Autres posts", etc.
  const allPosts = await getAllPosts();

  const structuredData = generateJSONLD(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BlogPostDetailClient post={post} allPosts={allPosts} />
    </>
  );
}

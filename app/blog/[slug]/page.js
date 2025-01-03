import React from "react";
import { getAllPosts, getPostBySlug } from "@/lib/postsAzure";
import BlogPostDetailClient from "./BlogPostDetailClient";
import { notFound } from "next/navigation";

/* --------------------------------------------------
   1) GÉNÉRATION DES MÉTADONNÉES DYNAMIQUES
   -------------------------------------------------- */
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug); // <--- On "await" ici

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
    // --- Métadonnées de base
    title: post.title,
    description: post.description,

    // --- Mots-clés (optionnel)
    keywords: post.tags ?? [],

    // --- Open Graph
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
      // Type "article" pour un article de blog
      type: "article",
      // Informations propres aux articles
      publishedTime: post.date,
      modifiedTime: post.lastModified || post.date,
      authors: [post.author?.name || "Scougal Rubber"],
      tags: post.tags,
    },

    // --- Twitter Card
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: post.author?.twitter || "@ScougalRubber",
      images: [ogImage],
    },

    // --- Canonical
    alternates: {
      canonical: post.canonicalUrl || postUrl,
    },

    // --- Robots directives
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
  const posts = await getAllPosts(); // <--- On "await" ici
  return posts.map((post) => ({
    slug: post.slug,
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
      // si post.author.twitter est défini, on peut l'ajouter en sameAs
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

/* --------------------------------------------------
   4) COMPOSANT DE PAGE (SERVER COMPONENT)
   -------------------------------------------------- */
export default async function BlogPostPage({ params }) {
  // On "await" ici pour récupérer le post et la liste
  const post = await getPostBySlug(params.slug);
  const allPosts = await getAllPosts();

  if (!post) {
    notFound();
  }

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

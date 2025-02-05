"use client";

import FadeInAnimation from "@/components/FadeInAnimation";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  MessageSquare,
  Share2,
  Tag,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

/* ---------------------------------------------------
   Table of Contents
--------------------------------------------------- */
function TableOfContents({ content }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-20% 0% -35% 0%",
    });

    // On surveille TOUTES les balises h2 et h3 dans le DOM
    document.querySelectorAll("h2, h3").forEach((heading) => {
      observer.observe(heading);
    });

    return () => observer.disconnect();
  }, []);

  // Extrait tous les titres h2/h3 du contenu
  const headings = content.match(/#{2,3}\s+([^\n]+)/g) || [];

  // Gère le scroll en douceur lors du clic sur un lien du ToC
  const handleClick = (e, slug) => {
    e.preventDefault();
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!headings.length) return null;

  return (
    <div className="sticky top-8 bg-white/80 backdrop-blur-md rounded-md shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">
            Quick Navigation
          </h3>
        </div>
        <nav className="space-y-3">
          {headings.map((heading, index) => {
            const level = heading.match(/#{2,3}/)[0].length;
            const text = heading.replace(/#{2,3}\s+/, "").trim();
            const slug = text.toLowerCase().replace(/[^\w]+/g, "-");

            return (
              <a
                key={index}
                href={`#${slug}`}
                onClick={(e) => handleClick(e, slug)}
                className={`group flex items-center transition-all duration-200
                  ${level === 2 ? "font-medium" : "ml-4"}
                  ${
                    activeId === slug
                      ? "text-blue-500 transform translate-x-2"
                      : "text-gray-600 hover:text-blue-500"
                  }
                `}
              >
                <ChevronRight
                  className={`w-4 h-4 mr-2 transition-transform duration-200 ${
                    activeId === slug
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />
                <span className="text-sm">{text}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

/* ---------------------------------------------------
   Related Posts
--------------------------------------------------- */
function RelatedPosts({ currentPost, posts }) {
  // On filtre les articles de la même catégorie, sauf l'article actuel
  const relatedPosts = posts
    .filter(
      (p) => p.slug !== currentPost.slug && p.category === currentPost.category
    )
    .slice(0, 3);

  return relatedPosts.length > 0 ? (
    <div className="mt-16 bg-gradient-to-br from-blue-50 to-gray-50 rounded-md p-8">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Tag className="w-6 h-6 text-blue-500" />
        Related Articles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group relative bg-white rounded-md shadow-sm p-4 transition-all duration-300 hover:shadow-md"
          >
            <div className="relative h-48 mb-4 rounded-md overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h4 className="font-semibold text-gray-900 group-hover:text-blue-500 transition-colors mb-2">
              {post.title}
            </h4>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {post.readingTime} min read
              <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  ) : null;
}

/* ---------------------------------------------------
   Barre de progression (scroll)
--------------------------------------------------- */
function ProgressBar({ post }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);

    const updateProgress = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((scrolled / height) * 100);
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, [post.slug]);

  return (
    <div className="fixed top-20 left-0 w-full h-1 bg-gray-100 z-50">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500 backdrop-blur-lg transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/* ---------------------------------------------------
   Composant principal
--------------------------------------------------- */
export default function BlogPostDetailClient({ post, allPosts }) {
  // Si le post n'existe pas
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Article Not Found
          </h1>
          <Link
            href="/blog"
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen">
      {/* Motif en fond (optionnel) */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />

      {/* Barre de progression */}
      <ProgressBar post={post} />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Zone principale (article) */}
          <main className="lg:col-span-8">
            <FadeInAnimation>
              <article className="bg-white/80 backdrop-blur-md rounded-md shadow-sm border border-gray-100">
                <div className="p-6 lg:p-10">
                  {/* Header de l'article (bouton retour + bouton share) */}
                  <div className="flex justify-between items-center mb-8">
                    <Link
                      href="/blog"
                      className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Blog
                    </Link>

                    <button
                      onClick={() => {
                        navigator.share({
                          title: post.title,
                          text: post.description,
                          url: `/blog/${post.slug}`,
                        });
                      }}
                      className="inline-flex ml-5 items-center px-4 py-2 bg-blue-50 text-blue-500 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Article
                    </button>
                  </div>

                  {/* Métadonnées + titre + description */}
                  <header className="mb-12">
                    <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                      {/* Date */}
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <time>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </time>
                      </div>

                      {/* Catégorie */}
                      {post.category && (
                        <span className="px-4 py-1 text-sm font-medium text-blue-500 bg-blue-50 rounded-full ring-1 ring-blue-500/10">
                          {post.category}
                        </span>
                      )}

                      {/* Durée de lecture */}
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {post.readingTime} min read
                      </div>
                    </div>

                    {/* Titre */}
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                      {post.title}
                    </h1>

                    {/* Description */}
                    {post.description && (
                      <p className="text-xl text-gray-600 leading-relaxed">
                        {post.description}
                      </p>
                    )}
                  </header>

                  {/* Image de couverture */}
                  {post.coverImage && (
                    <div className="relative h-[400px] lg:h-[500px] mb-12 rounded-md overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        loading="lazy"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  )}

                  {/* Contenu markdown */}
                  <div className="prose prose-lg max-w-none prose-headings:scroll-mt-20 prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600 prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline prose-img:rounded-md prose-strong:text-gray-900">
                    <ReactMarkdown
                      components={{
                        h2: ({ node, children }) => {
                          const text = children.toString().trim();
                          const slug = text
                            .toLowerCase()
                            .replace(/[^\w]+/g, "-");
                          return (
                            <h2
                              id={slug}
                              className="flex items-center gap-4 group"
                            >
                              {children}
                              {/* Permet un lien direct en hover */}
                              <a
                                href={`#${slug}`}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                #
                              </a>
                            </h2>
                          );
                        },
                        h3: ({ node, children }) => {
                          const text = children.toString().trim();
                          const slug = text
                            .toLowerCase()
                            .replace(/[^\w]+/g, "-");
                          return (
                            <h3
                              id={slug}
                              className="flex items-center gap-4 group"
                            >
                              {children}
                              <a
                                href={`#${slug}`}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                #
                              </a>
                            </h3>
                          );
                        },
                      }}
                    >
                      {post.content}
                    </ReactMarkdown>
                  </div>

                  {/* Footer de l'article */}
                  <footer className="mt-12 pt-6 border-t border-gray-200">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => {
                            navigator.share({
                              title: post.title,
                              text: post.description,
                              url: `/blog/${post.slug}`,
                            });
                          }}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                          Share Article
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-gray-500">
                        <MessageSquare className="w-4 h-4" />
                        Contact us for more information
                      </div>
                    </div>

                    {/* Articles liés */}
                    <RelatedPosts currentPost={post} posts={allPosts} />
                  </footer>
                </div>
              </article>
            </FadeInAnimation>
          </main>

          {/* Barre latérale */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Table des matières */}
              <TableOfContents content={post.content} />

              {/* Carte auteur */}
              {post.author && (
                <div className="bg-white/80 backdrop-blur-md rounded-md shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <User className="w-5 h-5 text-blue-500" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        About the Author
                      </h3>
                    </div>
                    <div className="flex items-center mb-4">
                      {post.author.avatar && (
                        <div className="relative">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={64}
                            height={64}
                            loading="lazy"
                            className="rounded-full ring-2 ring-white"
                          />
                        </div>
                      )}
                      <div className="ml-4">
                        <h3 className="font-semibold text-gray-900">
                          {post.author.name}
                        </h3>
                        {post.author.title && (
                          <p className="text-sm text-gray-600">
                            {post.author.title}
                          </p>
                        )}
                      </div>
                    </div>
                    {post.author.bio && (
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {post.author.bio}
                      </p>
                    )}

                    {/* Lien pour contacter ou en savoir plus */}
                    <Link
                      href="/contact-us"
                      className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-500 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      Reach Out
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

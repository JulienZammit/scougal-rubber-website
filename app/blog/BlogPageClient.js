"use client";
import FadeInAnimation from "@/components/FadeInAnimation";
import LinkedInPostGrid from "@/components/LinkedInPostGrid";
import Pagination from "@/components/Pagination";
import {
  ArrowRight,
  Bell,
  Clock,
  Filter,
  Search,
  Share2,
  Tag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const POSTS_PER_PAGE = 6;

export default function BlogPageClient({ allPosts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [posts, setPosts] = useState([]);

  const publishedPosts = (allPosts || []).filter(
    (post) => post.status !== "draft"
  );

  const categories = ["All", ...new Set(publishedPosts.map((p) => p.category))];

  const latestPosts = publishedPosts.slice(0, 3);

  const filteredPosts = publishedPosts
    .filter(
      (post) =>
        selectedCategory === "all" ||
        post.category?.toLowerCase() === selectedCategory
    )
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("/api/linkedin-latest-posts");
      const data = await res.json();
      setPosts(data || []);
    }
    fetchPosts();
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br ">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <FadeInAnimation>
          <header className="text-center mb-16 relative">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-100/20 to-transparent rounded-md blur-xl" />
              <div className="absolute inset-0 bg-grid-gray-100/20 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
            </div>

            <h1 className="text-5xl font-extrabold mb-6 text-gray-900 tracking-tight">
              Industrial Insights & Expertise
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
              Discover the latest innovations in elastomeric bearings,
              industrial rubber, and manufacturing solutions from Scougal
              Rubber's expert team.
            </p>

            <div className="mb-16 mt-12">
              <div className="flex items-center justify-center gap-2 mb-8">
                <Bell className="w-5 h-5 text-blue-500" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Latest Updates
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {latestPosts.map((post) => (
                  <div
                    key={post.slug}
                    className="relative bg-white/80 backdrop-blur-sm p-6 rounded-md shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                  >
                    <div className="absolute top-0 right-0 -mt-2 -mr-2">
                      <span className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                        New
                      </span>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="font-semibold text-gray-900 hover:text-blue-500 transition-colors line-clamp-2 mb-3">
                        {post.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readingTime} min read
                      </div>
                      <p className="text-gray-600 line-clamp-2 mb-4">
                        {post.description}
                      </p>
                      <span className="text-blue-500 flex items-center text-sm font-medium hover:gap-2 transition-all">
                        Read more <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 relative">
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-md blur opacity-70" />
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search technical articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-80 transition-shadow bg-white/80 backdrop-blur-sm"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <div className="relative">
                  <label htmlFor="category-select" className="sr-only">
                    Select a category
                  </label>
                  <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) =>
                      setSelectedCategory(e.target.value.toLowerCase())
                    }
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => setTimeout(() => setIsOpen(false), 150)}
                    className="pl-10 pr-8 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white/80 backdrop-blur-sm cursor-pointer transition-shadow w-full sm:w-48"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category?.toLowerCase()}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <div
                    className={`absolute top-1/2 right-3 transform -translate-y-1/2 transition-transform duration-200 pointer-events-none ${isOpen ? "rotate-180" : "rotate-0"
                      }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-md border ${viewMode === "grid"
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white/80 border-gray-200 hover:bg-gray-50"
                    } transition-colors backdrop-blur-sm`}
                >
                  Grid View
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-md border ${viewMode === "list"
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white/80 border-gray-200 hover:bg-gray-50"
                    } transition-colors backdrop-blur-sm`}
                >
                  List View
                </button>
              </div>
            </div>
          </header>
        </FadeInAnimation>

        <div
          key={`page-${currentPage}`}
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }
        >
          {currentPosts.map((post, index) => (
            <FadeInAnimation
              key={`page-${currentPage}-${post.slug}`}
              delay={index * 0.1}
            >
              <Link
                href={`/blog/${post.slug}`}
                className={`group relative bg-white rounded-md shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${viewMode === "list" ? "flex" : "block"
                  }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div
                  className={`relative ${viewMode === "list" ? "w-1/3" : "h-48"
                    } overflow-hidden`}
                >
                  <Image
                    src={post.coverImage || "/placeholder-blog.jpg"}
                    alt={post.title}
                    layout="fill"
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {post.category && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-medium text-white bg-blue-500/90 backdrop-blur-sm rounded-full">
                        {post.category}
                      </span>
                    </div>
                  )}
                </div>

                <div className={`p-6 ${viewMode === "list" ? "w-2/3" : ""}`}>
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <time>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readingTime} min read
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-500 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.description}
                  </p>

                  <div className="flex items-center justify-between mt-6">
                    {post.author && (
                      <div className="flex items-center">
                        {post.author.avatar && (
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={40}
                            height={40}
                            loading="lazy"
                            className="rounded-full border-2 border-white shadow-sm"
                          />
                        )}
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {post.author.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {post.author.title || "Expert"}
                          </p>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        navigator.share({
                          title: post.title,
                          text: post.description,
                          url: `/blog/${post.slug}`,
                        });
                      }}
                      className="p-2 rounded-full hover:bg-gray-50 transition-colors relative z-10"
                    >
                      <Share2 className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </Link>
            </FadeInAnimation>
          ))}
        </div>

        {filteredPosts.length > POSTS_PER_PAGE && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredPosts.length / POSTS_PER_PAGE)}
              onPageChange={setCurrentPage}
            />
          </div>
        )}

        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-md shadow-sm border border-gray-100">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center text-gray-900">
              <Tag className="w-5 h-5 mr-2" />
              Technical Categories
            </h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) =>
                cat !== "All" ? (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat.toLowerCase())}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${selectedCategory === cat.toLowerCase()
                        ? "bg-blue-500 text-white shadow-sm"
                        : "bg-gray-100/80 text-gray-700 hover:bg-gray-200/80"
                      } transition-all duration-300`}
                  >
                    {cat}
                  </button>
                ) : null
              )}
            </div>
          </div>
        </div>

        {posts.length > 0 && (
          <section className="w-full py-16">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-16">
                Latest Updates on LinkedIn
              </h2>
              <LinkedInPostGrid posts={posts} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

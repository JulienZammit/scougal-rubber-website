"use client";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Linkedin, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ExternalLink } from "lucide-react";
import { useState } from "react";

// LinkedIn Post Card Component
function LinkedInPostCard({ post, index }) {
    const [isHovered, setIsHovered] = useState(false);

    const formatDate = (timestamp) => {
        if (!timestamp) return 'Recent';
        return new Date(timestamp).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const getPostContent = (post) => {
        try {
            const content = post?.specificContent?.['com.linkedin.ugc.ShareContent'];
            if (!content) {
                return {
                    text: '',
                    media: null,
                    timestamp: null,
                    shareMediaCategory: null,
                    url: null
                };
            }
            return {
                text: content.shareCommentary?.text || '',
                media: content.media?.[0] || null,
                timestamp: post?.created?.time,
                shareMediaCategory: content.shareMediaCategory,
                url: content.shareMediaCategory === 'ARTICLE' ? content.media?.[0]?.originalUrl : null
            };
        } catch (error) {
            console.warn('Error parsing LinkedIn post:', error);
            return {
                text: '',
                media: null,
                timestamp: null,
                shareMediaCategory: null,
                url: null
            };
        }
    };

    const { text, media, timestamp, shareMediaCategory, url } = getPostContent(post);

    // Don't render if no content
    if (!text) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => url && window.open(url, '_blank')}
            className={`relative h-full bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl ${url ? 'cursor-pointer' : ''}`}
        >
            {/* LinkedIn brand indicator */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0077B5] to-[#00a0dc]" />

            <div className="p-6 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#0077B5] flex items-center justify-center shadow-sm">
                            <Linkedin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="font-bold text-gray-900">Scougal Rubber</p>
                            <p className="text-xs text-gray-500">{formatDate(timestamp)}</p>
                        </div>
                    </div>
                    {url && (
                        <ExternalLink className={`w-5 h-5 text-gray-400 transition-colors ${isHovered ? 'text-[#0077B5]' : ''}`} />
                    )}
                </div>

                {/* Content */}
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-6 mb-5 flex-1">
                    {text}
                </p>

                {/* Media preview */}
                {media && shareMediaCategory === 'ARTICLE' && media.thumbnails && (
                    <div className={`relative h-44 rounded-xl overflow-hidden transition-transform duration-300 ${isHovered ? 'scale-[1.02]' : ''}`}>
                        <Image
                            src={media.thumbnails[0].url}
                            alt={media.title?.text || "Article thumbnail"}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        {media.title && (
                            <div className="absolute bottom-3 left-3 right-3">
                                <p className="text-white text-sm font-medium line-clamp-2">{media.title.text}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

// Blog Post Card Component
function BlogPostCard({ post, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="h-full"
        >
            <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col h-full bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                    <Image
                        src={post.coverImage || "/placeholder-blog.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {post.category && (
                        <span className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full shadow-sm">
                            {post.category}
                        </span>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(post.date).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readingTime} min read
                        </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-5 flex-1">
                        {post.description}
                    </p>

                    <div className="flex items-center text-blue-600 text-sm font-semibold mt-auto">
                        Read full article
                        <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function CompanyNewsSection({ linkedInPosts = [], blogPosts = [] }) {
    const displayedLinkedIn = linkedInPosts.slice(0, 1);
    const displayedBlog = blogPosts.slice(0, 1);

    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4">
                        Stay Updated
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Company News & Updates
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Follow our latest projects, innovations, and industry insights from our team and social channels.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-10 items-stretch">
                    {/* Latest Blog Article */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2.5 mb-6">
                            <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                                <Newspaper className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Latest Article</h3>
                        </div>
                        <div className="flex-1">
                            {displayedBlog.length > 0 ? (
                                displayedBlog.map((post, index) => (
                                    <BlogPostCard key={post.slug || index} post={post} index={index} />
                                ))
                            ) : (
                                <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center h-full flex flex-col items-center justify-center">
                                    <Newspaper className="w-14 h-14 text-gray-200 mx-auto mb-4" />
                                    <p className="text-gray-500 font-medium">Articles coming soon</p>
                                    <p className="text-gray-400 text-sm mt-2">Check back for our latest insights</p>
                                </div>
                            )}
                        </div>
                        {blogPosts.length > 1 && (
                            <Link
                                href="/blog"
                                className="mt-6 inline-flex items-center gap-1.5 text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm"
                            >
                                View all articles
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        )}
                    </div>

                    {/* LinkedIn Update */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2.5 mb-6">
                            <div className="w-9 h-9 rounded-lg bg-[#e8f4fd] flex items-center justify-center">
                                <Linkedin className="w-5 h-5 text-[#0077B5]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">LinkedIn Update</h3>
                        </div>
                        <div className="flex-1">
                            {displayedLinkedIn.length > 0 ? (
                                displayedLinkedIn.map((post, index) => (
                                    <LinkedInPostCard key={index} post={post} index={index} />
                                ))
                            ) : (
                                <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center h-full flex flex-col items-center justify-center">
                                    <Linkedin className="w-14 h-14 text-gray-200 mx-auto mb-4" />
                                    <p className="text-gray-500 font-medium">Follow us on LinkedIn for updates</p>
                                    <a
                                        href="https://www.linkedin.com/company/scougal-rubber-corporation"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-[#0077B5] text-white rounded-lg text-sm font-semibold hover:bg-[#006097] transition-colors shadow-sm"
                                    >
                                        <Linkedin className="w-4 h-4" />
                                        Follow on LinkedIn
                                    </a>
                                </div>
                            )}
                        </div>
                        {displayedLinkedIn.length > 0 && (
                            <a
                                href="https://www.linkedin.com/company/scougal-rubber-corporation"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-flex items-center gap-2 text-[#0077B5] font-semibold hover:text-[#006097] transition-colors text-sm"
                            >
                                <Linkedin className="w-4 h-4" />
                                Follow us on LinkedIn
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

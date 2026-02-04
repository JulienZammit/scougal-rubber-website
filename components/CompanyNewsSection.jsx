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
            className={`relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg ${url ? 'cursor-pointer' : ''}`}
        >
            {/* LinkedIn brand indicator */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#0077B5]" />

            <div className="p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0077B5] flex items-center justify-center">
                            <Linkedin className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 text-sm">Scougal Rubber</p>
                            <p className="text-xs text-gray-500">{formatDate(timestamp)}</p>
                        </div>
                    </div>
                    {url && (
                        <ExternalLink className={`w-4 h-4 text-gray-400 transition-colors ${isHovered ? 'text-[#0077B5]' : ''}`} />
                    )}
                </div>

                {/* Content */}
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-4 mb-4">
                    {text}
                </p>

                {/* Media preview */}
                {media && shareMediaCategory === 'ARTICLE' && media.thumbnails && (
                    <div className={`relative h-32 rounded-lg overflow-hidden transition-transform duration-300 ${isHovered ? 'scale-[1.02]' : ''}`}>
                        <Image
                            src={media.thumbnails[0].url}
                            alt={media.title?.text || "Article thumbnail"}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        {media.title && (
                            <div className="absolute bottom-2 left-2 right-2">
                                <p className="text-white text-xs font-medium line-clamp-2">{media.title.text}</p>
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
        >
            <Link
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                    <Image
                        src={post.coverImage || "/placeholder-blog.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {post.category && (
                        <span className="absolute top-3 left-3 px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                            {post.category}
                        </span>
                    )}
                </div>

                {/* Content */}
                <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
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
                            {post.readingTime} min
                        </span>
                    </div>

                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {post.description}
                    </p>

                    <div className="flex items-center text-blue-600 text-sm font-medium">
                        Read article
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function CompanyNewsSection({ linkedInPosts = [], blogPosts = [] }) {
    const displayedLinkedIn = linkedInPosts.slice(0, 2);
    const displayedBlog = blogPosts.slice(0, 3);

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

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Latest Blog Articles */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <Newspaper className="w-5 h-5 text-blue-600" />
                            <h3 className="text-xl font-bold text-gray-900">Latest Articles</h3>
                        </div>
                        <div className="space-y-6">
                            {displayedBlog.length > 0 ? (
                                displayedBlog.map((post, index) => (
                                    <BlogPostCard key={post.slug || index} post={post} index={index} />
                                ))
                            ) : (
                                <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
                                    <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">Articles coming soon</p>
                                    <p className="text-gray-400 text-sm mt-2">Check back for our latest insights</p>
                                </div>
                            )}
                        </div>
                        {blogPosts.length > 3 && (
                            <Link
                                href="/blog"
                                className="mt-6 inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                            >
                                View all articles
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        )}
                    </div>

                    {/* LinkedIn Updates */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <Linkedin className="w-5 h-5 text-[#0077B5]" />
                            <h3 className="text-xl font-bold text-gray-900">LinkedIn Updates</h3>
                        </div>
                        <div className="space-y-6">
                            {displayedLinkedIn.length > 0 ? (
                                displayedLinkedIn.map((post, index) => (
                                    <LinkedInPostCard key={index} post={post} index={index} />
                                ))
                            ) : (
                                <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
                                    <Linkedin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">Follow us on LinkedIn for updates</p>
                                    <a
                                        href="https://www.linkedin.com/company/scougal-rubber-corporation"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded-lg text-sm font-medium hover:bg-[#006097] transition-colors"
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
                                className="mt-6 inline-flex items-center gap-2 text-[#0077B5] font-medium hover:text-[#006097] transition-colors"
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

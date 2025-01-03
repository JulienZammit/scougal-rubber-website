import React from "react";
import { getAllPosts } from "@/lib/postsAzure";
import BlogPageClient from "./BlogPageClient";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const allPosts = await getAllPosts(); 

  return <BlogPageClient allPosts={allPosts} />;
}

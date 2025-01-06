import React from "react";
import { getAllPosts } from "@/service/postsAzure";
import BlogPageClient from "./BlogPageClient";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const allPosts = await getAllPosts(); 

  return <BlogPageClient allPosts={allPosts} />;
}

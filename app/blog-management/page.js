// app/blog-management/page.js

export const dynamic = "force-dynamic";

import BlogManagementPageClient from "./BlogManagementPageClient";

export default function BlogManagementPage() {
  // Simplement on rend le composant client
  return <BlogManagementPageClient />;
}

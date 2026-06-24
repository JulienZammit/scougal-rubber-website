// app/blog-management/page.js
// Internal blog editor. Protected by a login gate (see BlogManagementClient) and
// kept out of search engines via robots noindex + a Disallow in app/robots.js.

import BlogManagementClient from "./BlogManagementClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog Editor — Scougal Rubber",
  robots: { index: false, follow: false },
};

export default function BlogManagementPage() {
  return <BlogManagementClient />;
}

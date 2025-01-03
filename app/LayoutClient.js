// app/LayoutClient.jsx
"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LayoutClient({ children }) {
  // This is a client component, so we can use client hooks
  const segments = useSelectedLayoutSegments();
  const isBlogManagement = segments.includes("blog-management");

  return (
    <>
      {/* Conditionally render header/footer */}
      {!isBlogManagement && <Header />}
      <div id="__next">
        <main>{children}</main>
      </div>
      {!isBlogManagement && <Footer />}
    </>
  );
}

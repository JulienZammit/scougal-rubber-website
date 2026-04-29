// app/LayoutClient.jsx
"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LayoutClient({ children }) {
  // This is a client component, so we can use client hooks
  const segments = useSelectedLayoutSegments();
  const hideChrome = segments.includes("blog-management") || segments.includes("studio");

  return (
    <>
      {!hideChrome && <Header />}
      <div id="__next">
        <main>{children}</main>
      </div>
      {!hideChrome && <Footer />}
    </>
  );
}

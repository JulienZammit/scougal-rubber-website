"use client";

import { usePathname } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  // The internal blog editor is a full-screen app — no public site chrome.
  const isBare = pathname?.startsWith("/blog-management");

  if (isBare) {
    return (
      <div id="__next">
        <main>{children}</main>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div id="__next">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}

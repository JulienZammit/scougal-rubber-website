"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LayoutClient({ children }) {
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

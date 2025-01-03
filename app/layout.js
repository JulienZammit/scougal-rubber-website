// app/layout.js (Server Component, NO "use client" at the top)
import "./globals.css";
import { Inter } from "next/font/google";
import LayoutClient from "./LayoutClient";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "America's Custom Molded Rubber Company",
  description: "Leading provider of custom molded rubber solutions since 1916.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://scougalrubber.com/",
    site_name: "America's Custom Molded Rubber Company",
  },
  additionalMetaTags: [
    {
      property: "keywords",
      content:
        "custom molded, rubber company, industrial rubber, rubber manufacturing",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content="Scougal Rubber is a company that manufactures custom molded rubber products since 1916."
        />
        <meta
          name="keywords"
          content="rubber, molded rubber, custom rubber products"
        />
        <meta name="author" content="Scougal Rubber" />
        {/* If you need this script, keep it here */}
        <script src="../node_modules/preline/dist/preline.js"></script>
      </head>
      <body className={inter.className}>
        <Providers>
          {/* 
          We hand off the *rest* of the UI to a 
          client component that can do route checks 
          and skip <Header>/<Footer> if needed.
        */}
          <LayoutClient>{children}</LayoutClient>
        </Providers>
      </body>
    </html>
  );
}

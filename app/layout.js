// Dans app/layout.js
import Script from "next/script";
import "./globals.css";
import { Inter } from "next/font/google";
import LayoutClient from "./LayoutClient";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://www.scougalrubber.com"),
  title: "America's Custom Molded Rubber Company",
  description: "Leading provider of custom molded rubber solutions since 1916.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.scougalrubber.com/",
    site_name: "America's Custom Molded Rubber Company",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content:
        "custom molded, rubber company, industrial rubber, rubber manufacturing, molded rubber products",
    },
    {
      name: "author",
      content: "Scougal Rubber",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script src="/js/preline.js" strategy="defer" />
      </head>
      <body className={inter.className}>
        <Providers>
          <LayoutClient>{children}</LayoutClient>
        </Providers>
      </body>
    </html>
  );
}

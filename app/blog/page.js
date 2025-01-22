import React from "react";
import { getAllPosts } from "@/service/postsAzure";
import BlogPageClient from "./BlogPageClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Scougal Rubber - Industrial Insights & Expertise",
  description:
    "Discover the latest innovations in elastomeric bearings, industrial rubber, and manufacturing solutions from Scougal Rubber's expert team.",
  keywords:
    "Scougal Rubber, custom molded rubber, elastomeric bearings, industrial rubber, rubber manufacturing, rubber solutions, Scougal Rubber blog",
  robots: "index, follow",
  author: "Scougal Rubber Corporation",
  openGraph: {
    title: "Scougal Rubber - Industrial Insights & Expertise",
    description:
      "Discover the latest innovations in elastomeric bearings, industrial rubber, and manufacturing solutions from Scougal Rubber's expert team.",
    url: "https://www.scougalrubber.com/blog",
    type: "website",
    images: [
      {
        url: "https://www.scougalrubber.com/logo.webp",
        alt: "Scougal Rubber Company Logo",
      },
    ],
  },
  alternates: {
    canonical: "https://www.scougalrubber.com/blog",
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "contact:phone_number": "+1 (775) 284-8500",
    "contact:email": "info@scougalrubber.com",
    "contact:address":
      "885 Denmark Drive Suite 103, McCarran, NV 89437-4425, USA",
    "contact:address2": "6239 Corson Ave S, Seattle, WA 98108-3443, USA",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Scougal Rubber Corporation",
  "url": "https://www.scougalrubber.com",
  "logo": "https://www.scougalrubber.com/logo.webp",
  "description": "Scougal Rubber, a leading provider of custom molded rubber products and elastomeric bearing pads for industrial projects and infrastructure solutions since 1916.",
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "885 Denmark Drive Suite 103",
      "addressLocality": "McCarran",
      "addressRegion": "NV",
      "postalCode": "89437-4425",
      "addressCountry": "USA"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "6239 Corson Ave S",
      "addressLocality": "Seattle",
      "addressRegion": "WA",
      "postalCode": "98108-3443",
      "addressCountry": "USA"
    }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-775-284-8500",
    "contactType": "Customer Service",
    "email": "info@scougalrubber.com"
  },
  "sameAs": [
    "https://www.linkedin.com/company/scougal-rubber-corporation/",
    "https://www.facebook.com/scougalrubbercorp"
  ],
};

export default async function BlogPage() {
  const allPosts = await getAllPosts(); 

  {/* Inject JSON-LD for structured data */}
  <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
/>

  return <BlogPageClient allPosts={allPosts} />;
}

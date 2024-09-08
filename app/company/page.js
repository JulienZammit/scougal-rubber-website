import CompanyClient from "./CompanyClient";

export const metadata = {
  title: "Scougal Rubber - Custom Rubber Products and Infrastructure Solutions | Since 1916",
  description:
    "Scougal Rubber, a leader in custom molded rubber products and elastomeric bearing pads since 1916. Trusted for industrial and infrastructure solutions. AISC certified, Buy American compliant.",
  keywords:
    "Scougal Rubber, custom molded rubber, rubber products, industrial rubber, elastomeric bearing pads, bridge bearings, AISC certified, Buy American, rubber manufacturing, infrastructure solutions",
  robots: "index, follow",
  author: "Scougal Rubber Corporation",
  openGraph: {
    title: "Scougal Rubber - Custom Rubber Products and Infrastructure Solutions | Since 1916",
    description:
      "Learn more about Scougal Rubber, a trusted provider of custom molded rubber products, elastomeric bearing pads, and industrial solutions since 1916. Quality and innovation at the forefront.",
    url: "https://www.scougalrubber.com/company",
    type: "website",
    images: [
      {
        url: "https://www.scougalrubber.com/logo.webp",
        alt: "Scougal Rubber Company Logo",
      },
    ],
  },
  alternates: {
    canonical: "https://www.scougalrubber.com/company",
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

export default function Company() {
  return (
    <>
      {/* Inject JSON-LD for structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Your page content */}
      <CompanyClient />
    </>
  );
}

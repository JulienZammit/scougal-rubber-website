import SteelClient from "./SteelClient";

export const metadata = {
  title: "Steel Fabrication - Precision and Reliability | Scougal Rubber",
  description:
    "Scougal Rubber offers advanced steel fabrication services with precision, efficiency, and adherence to high-quality standards. Explore our expertise in handling complex projects and delivering custom metal fabrication solutions.",
  keywords:
    "steel fabrication, custom metal fabrication, precision steel work, CNC machining, industrial metal fabrication, Scougal Rubber steel services, AISC certified, NTPEP certified, CAGE certified",
  robots: "index, follow",
  author: "Scougal Rubber Corporation",
  openGraph: {
    title: "Steel Fabrication - Precision and Reliability | Scougal Rubber",
    description:
      "Discover Scougal Rubber’s steel fabrication capabilities, from CNC machining to large-scale custom projects. Certified for quality and committed to exceeding expectations.",
    url: "https://www.scougalrubber.com/steel",
    type: "website",
    images: [
      {
        url: "https://www.scougalrubber.com/logo.webp",
        alt: "Scougal Rubber Company Logo"
      },
    ],
  },
  alternates: {
    canonical: "https://www.scougalrubber.com/steel",
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "contact:email": "info@scougalrubber.com",
    "contact:phone_number": "+1 (775) 284-8500",
  },
};

// Structured Data (JSON-LD) for Steel Fabrication Page
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Steel Fabrication",
  "provider": {
    "@type": "Organization",
    "name": "Scougal Rubber Corporation",
    "url": "https://www.scougalrubber.com",
    "logo": "https://www.scougalrubber.com/logo.webp",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-775-284-8500",
      "contactType": "Customer Service",
      "email": "info@scougalrubber.com",
      "availableLanguage": ["English"],
      "areaServed": "US"
    }
  },
  "description": "Scougal Rubber provides advanced steel fabrication services, delivering custom metal fabrication, CNC machining, and certified steel solutions for industrial and infrastructure projects.",
  "areaServed": {
    "@type": "Place",
    "name": "US"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://www.scougalrubber.com/steel",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Scougal Rubber Corporation"
    }
  },
  "additionalType": "http://www.productontology.org/id/Metal_fabrication",
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Certifications",
      "value": "AISC, NTPEP, CAGE"
    },
    {
      "@type": "PropertyValue",
      "name": "Capabilities",
      "value": "CNC machining, custom metal fabrication, large-scale steel projects"
    },
    {
      "@type": "PropertyValue",
      "name": "Precision",
      "value": "High precision steel fabrication for industrial applications"
    }
  ]
};

export default function Steel() {
  return (
    <>
      {/* Inject JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Page content */}
      <SteelClient />
    </>
  );
}

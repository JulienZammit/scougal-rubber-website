import RampsClient from "./RampsClient";

export const metadata = {
  title:
    "Scougal Ramps - Efficient Road Plate Management for Enhanced Productivity",
  description:
    "Scougal Ramps provide a durable, reusable solution for road plate management. Reduce cold mix usage, prevent site damage, and improve safety with our innovative ramp system for efficient construction workflows.",
  keywords:
    "Scougal Rubber ramps, road plate management, construction ramps, reusable ramps, cold mix reduction, road safety solutions, durable ramps, efficient road plate handling, prevent damage claims",
  robots: "index, follow",
  author: "Scougal Rubber Corporation",
  openGraph: {
    title:
      "Scougal Ramps - Efficient Road Plate Management for Enhanced Productivity",
    description:
      "Boost productivity and improve safety with Scougal Ramps. Our reusable ramps streamline road plate management, reduce cold mix usage, and protect worksites from damage.",
    url: "https://www.scougalrubber.com/ramps",
    type: "website",
    images: [
      {
        url: "https://www.scougalrubber.com/logo.webp",
        alt: "Scougal Rubber Company Logo",
      },
    ],
  },
  alternates: {
    canonical: "https://www.scougalrubber.com/ramps",
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "contact:email": "info@scougalrubber.com",
    "contact:phone_number": "+1 (775) 284-8500",
  },
};

// Structured Data (JSON-LD) for Scougal Ramps Page
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Scougal Ramps - Road Plate Management",
  "image": "https://www.scougalrubber.com/ramps/ramps.webp",
  "description": "Durable, reusable ramps for road plate management that reduce cold mix usage and prevent site damage. Ideal for construction sites to improve workflow efficiency and safety.",
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
  "areaServed": {
    "@type": "Place",
    "name": "US"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://www.scougalrubber.com/ramps",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Scougal Rubber Corporation"
    }
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Durability",
      "value": "Reusable for long-term projects"
    },
    {
      "@type": "PropertyValue",
      "name": "Efficiency",
      "value": "Reduces cold mix and eliminates disposal issues"
    },
    {
      "@type": "PropertyValue",
      "name": "Safety",
      "value": "Prevents site damage and enhances road safety"
    }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-775-284-8500",
    "contactType": "Customer Service",
    "email": "info@scougalrubber.com",
    "availableLanguage": ["English"],
    "areaServed": "US"
  }
};

export default function Ramps() {
  return (
    <>
      {/* Inject JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Page content */}
      <RampsClient />
    </>
  );
}

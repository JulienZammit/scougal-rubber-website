import RubberPartsClient from "./RubberPartsClient";

export const metadata = {
  title: "Industrial Rubber Parts - Custom Molded Solutions | Scougal Rubber",
  description:
    "Discover Scougal Rubber’s high-quality industrial rubber parts, including custom molded products, rubber rollers, and mandrel-built solutions. With over 100 years of experience, we deliver precision and durability across industries.",
  keywords:
    "industrial rubber parts, custom molded rubber, rubber rollers, mandrel-built products, vulcanized rubber to metal, Scougal Rubber, custom rubber solutions, rubber components",
  robots: "index, follow",
  author: "Scougal Rubber Corporation",
  openGraph: {
    title: "Industrial Rubber Parts - Custom Molded Solutions | Scougal Rubber",
    description:
      "Explore Scougal Rubber's custom rubber parts, from molded products to rubber rollers and mandrel-built solutions. Designed for aerospace, marine, food processing, and other industries.",
    url: "https://www.scougalrubber.com/rubber-parts",
    type: "website",
    images: [
      {
        url: "https://www.scougalrubber.com/logo.webp",
        alt: "Scougal Rubber Company Logo",
      },
    ],
  },
  alternates: {
    canonical: "https://www.scougalrubber.com/rubber-parts",
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "contact:email": "info@scougalrubber.com",
    "contact:phone_number": "+1 (775) 284-8500",
  },
};

// Structured Data (JSON-LD) for Industrial Rubber Parts Page
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.scougalrubber.com/rubber-parts",
  name: "Industrial Rubber Parts - Custom Molded Solutions",
  provider: {
    "@type": "Organization",
    name: "Scougal Rubber Corporation",
    url: "https://www.scougalrubber.com",
    logo: "https://www.scougalrubber.com/logo.webp",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-775-284-8500",
      contactType: "Customer Service",
      email: "info@scougalrubber.com",
      availableLanguage: ["English"],
      areaServed: "US",
    },
  },
  areaServed: {
    "@type": "Place",
    name: "US",
  },
  name: "Custom Molded Rubber Solutions",
  description:
    "Custom molded rubber components for industrial applications, including vulcanized rubber and rubber-to-metal bonding.",
  url: "https://www.scougalrubber.com/rubber-parts",
  image: "https://www.scougalrubber.com/rubber/mandrel.webp",
  offers: {
    "@type": "Offer",
    url: "https://www.scougalrubber.com/rubber-parts",
    priceCurrency: "USD",
    price: 0,
    availability: "https://schema.org/InStock",
  },
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Custom Molded Rubber",
      value: "Designed to fit various industry-specific applications",
    },
    {
      "@type": "PropertyValue",
      name: "Rubber Rollers",
      value: "Precision-engineered for durability and efficiency",
    },
    {
      "@type": "PropertyValue",
      name: "Mandrel-Built Products",
      value: "Custom-built for strength and reliability",
    },
    {
      "@type": "PropertyValue",
      name: "Vulcanized Rubber to Metal",
      value: "Durable rubber-metal bonding for demanding environments",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-775-284-8500",
    contactType: "Customer Service",
    email: "info@scougalrubber.com",
    availableLanguage: ["English"],
    areaServed: "US",
  },
};

export default function RubberParts() {
  return (
    <>
      {/* Inject JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Page content */}
      <RubberPartsClient />
    </>
  );
}

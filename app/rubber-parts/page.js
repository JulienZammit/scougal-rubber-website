import RubberPartsClient from "./RubberPartsClient";

export const metadata = {
  title: 'Industrial Rubber Parts - Custom Molded Solutions | Scougal Rubber',
  description:
    'Discover Scougal Rubber’s high-quality industrial rubber parts, including custom molded products, rubber rollers, and mandrel-built solutions. With over 100 years of experience, we deliver precision and durability across industries.',
  keywords:
    'industrial rubber parts, custom molded rubber, rubber rollers, mandrel-built products, vulcanized rubber to metal, Scougal Rubber, custom rubber solutions, rubber components',
  robots: 'index, follow',
  author: 'Scougal Rubber Corporation',
  openGraph: {
    title: 'Industrial Rubber Parts - Custom Molded Solutions | Scougal Rubber',
    description:
      "Explore Scougal Rubber's custom rubber parts, from molded products to rubber rollers and mandrel-built solutions. Designed for aerospace, marine, food processing, and other industries.",
    url: 'https://www.scougalrubber.com/industrial-rubber-parts',
    type: 'website',
    images: [
      {
        url: 'https://www.scougalrubber.com/logo.webp',
        alt: 'Scougal Rubber Company Logo',
      }
    ],
  },
  alternates: {
    canonical: 'https://www.scougalrubber.com/industrial-rubber-parts',
  },
  icons: {
    icon: '/favicon.ico',
  },
  other: {
    'contact:email': 'info@scougalrubber.com',
    'contact:phone_number': '+1 (775) 284-8500',
  },
};

// Structured Data (JSON-LD) for Industrial Rubber Parts Page
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Industrial Rubber Parts - Custom Molded Solutions",
  "image": "https://www.scougalrubber.com/images/industrial-rubber-parts-banner.jpg",
  "description": "Scougal Rubber provides high-quality industrial rubber parts, including custom molded solutions, rubber rollers, and mandrel-built products, designed for industries like aerospace, marine, and food processing.",
  "brand": {
    "@type": "Organization",
    "name": "Scougal Rubber Corporation",
    "logo": "https://www.scougalrubber.com/logo.webp",
    "url": "https://www.scougalrubber.com"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://www.scougalrubber.com/industrial-rubber-parts",
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
      "name": "Custom Molded Rubber",
      "value": "Designed to fit various industry-specific applications"
    },
    {
      "@type": "PropertyValue",
      "name": "Rubber Rollers",
      "value": "Precision-engineered for durability and efficiency"
    },
    {
      "@type": "PropertyValue",
      "name": "Mandrel-Built Products",
      "value": "Custom-built for strength and reliability"
    },
    {
      "@type": "PropertyValue",
      "name": "Vulcanized Rubber to Metal",
      "value": "Durable rubber-metal bonding for demanding environments"
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

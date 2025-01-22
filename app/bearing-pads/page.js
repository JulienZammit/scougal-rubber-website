import BearingPadsClient from "./BearingPadsClient";

export const metadata = {
  title: 'Elastomeric Bearing Pads - High-Quality Bridge and Industrial Bearings | Scougal Rubber',
  description:
    'Discover Scougal Rubber’s premium elastomeric bearing pads, designed for bridge and industrial applications. We offer laminated, plain, and steel-reinforced bearing pads with Buy American and AISC certifications.',
  keywords:
    'elastomeric bearing pads, bearing pads, bridge bearings, laminated bearing pads, steel-reinforced pads, neoprene bearing pads, rubber bridge pads, industrial bearings, custom bearing pads, Buy American certified, AISC certified, industrial rubber solutions',
  robots: 'index, follow',
  author: 'Scougal Rubber Corporation',
  openGraph: {
    title: 'Elastomeric Bearing Pads - Durable and Certified Solutions | Scougal Rubber',
    description:
      'Explore Scougal Rubber’s durable and reliable elastomeric bearing pads, trusted for bridge and industrial applications. Buy American and AISC certified for top-tier performance.',
    url: 'https://www.scougalrubber.com/bearing-pads',
    type: 'website',
    images: [
      {
        url: 'https://www.scougalrubber.com/logo.webp',
        alt: 'Scougal Rubber Company Logo',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.scougalrubber.com/bearing-pads',
  },
  icons: {
    icon: '/favicon.ico',
  },
  other: {
    'contact:phone_number': '+1 (775) 284-8500',
    'contact:email': 'sales@scougalrubber.com',
    'contact:address': '885 Denmark Drive Suite 103, McCarran, NV 89437-4425',
  },
};

// Structured Data (JSON-LD) for Bearing Pads Page
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Elastomeric Bearing Pads",
  "image": "https://www.scougalrubber.com/bearing/bearingPad_loadPlate_217.jpg",
  "description": "Scougal Rubber provides premium elastomeric bearing pads, offering durable and flexible solutions for bridge and industrial applications. Our products are Buy American and AISC certified.",
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
    "url": "https://www.scougalrubber.com/bearing-pads",
    "priceCurrency": "USD",
    "price": "Contact for pricing",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Scougal Rubber Corporation"
    }
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Type",
      "value": "Laminated, Plain, and Steel-Reinforced"
    },
    {
      "@type": "PropertyValue",
      "name": "Material",
      "value": "Neoprene and natural rubber options"
    },
    {
      "@type": "PropertyValue",
      "name": "Certifications",
      "value": "Buy American, AISC certified"
    },
    {
      "@type": "PropertyValue",
      "name": "Applications",
      "value": "Bridges, industrial structures, seismic isolation"
    },
    {
      "@type": "PropertyValue",
      "name": "Customization",
      "value": "Available in custom sizes and designs"
    }
  ],
  "review": {
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "4.9",
      "bestRating": "5"
    },
    "author": {
      "@type": "Person",
      "name": "John Smith"
    },
    "reviewBody": "The elastomeric bearing pads from Scougal Rubber are durable and reliable, ideal for our bridge construction projects."
  }
};

export default function BearingPads() {
  return (
    <>
      {/* Inject JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Page content */}
      <BearingPadsClient />
    </>
  );
}

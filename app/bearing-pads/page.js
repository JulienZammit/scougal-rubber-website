import BearingPadsClient from "./BearingPadsClient";

export const metadata = {
  title:
    "Elastomeric Bearing Pads - Bridge, Industrial & Seismic Isolation Solutions | Scougal Rubber",
  description:
    "Discover Scougal Rubber’s premium elastomeric bearing pads – including bridge bearing neoprene and natural rubber pads, laminated and plain solutions – designed for bridge, industrial and seismic isolation applications. Buy American, AASHTO M-251, AISC and NTPEP certified.",
  keywords:
    "elastomeric bearing pads, bridge bearings, bridge bearing neoprene rubber pads, bridge bearing natural rubber pads, laminated elastomeric bearing pads, plain elastomeric bearings, seismic isolation device or pad, steel reinforced elastomeric bearing, AASHTO M-251 compliant bearings, AISC certified fabricator and erector, NTPEP datamine tested, government project custom rubber molding, rubber parts, industrial rubber manufacturing, aerospace molded rubber engineering, O-Rings, rubber gasket materials, elastomer, shims, internal plates, vulcanizing, AREMA, CHSR, rocker bearings, steel bearings, elastomeric washers, round elastomeric bearing pads",
  robots: "index, follow",
  author: "Scougal Rubber Corporation",
  openGraph: {
    title:
      "Elastomeric Bearing Pads (AASHTO M-251, NTPEP) | Bridge & Industrial Bearings – Scougal Rubber",
    description:
      "Explore Scougal Rubber’s durable and reliable elastomeric bearing pads, trusted for bridge and industrial applications. Buy American and AISC certified for top-tier performance.",
    url: "https://www.scougalrubber.com/bearing-pads",
    type: "website",
    images: [
      {
        url: "https://www.scougalrubber.com/logo.webp",
        alt: "Scougal Rubber Company Logo",
      },
    ],
  },
  alternates: {
    canonical: "https://www.scougalrubber.com/bearing-pads",
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "contact:phone_number": "+1 (775) 284-8500",
    "contact:email": "sales@scougalrubber.com",
    "contact:address": "885 Denmark Drive Suite 103, McCarran, NV 89437-4425",
  },
};

// Structured Data (JSON-LD) for Bearing Pads Page
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.scougalrubber.com/bearing-pads",
  name: "Elastomeric Bearing Pads",
  image: "https://www.scougalrubber.com/bearing/bearingPad_loadPlate_217.jpg",
  description:
    "Scougal Rubber offers high-quality elastomeric bearing pads for bridge, industrial and seismic isolation applications. Our range includes bridge bearing neoprene and natural rubber pads, laminated and plain solutions, all Buy American, AASHTO M-251, AISC and NTPEP certified.",
  provider: {
    "@type": "Organization",
    name: "Scougal Rubber Corporation",
    url: "https://www.scougalrubber.com",
    logo: "https://www.scougalrubber.com/logo.webp",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-775-284-8500",
      contactType: "Customer Service",
      email: "sales@scougalrubber.com",
      availableLanguage: ["English"],
      areaServed: "US"
    }
  },
  offers: {
    "@type": "Offer",
    url: "https://www.scougalrubber.com/bearing-pads",
    priceCurrency: "USD",
    price: 0,
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition"
  },
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Type",
      value: "Laminated, Plain, and Steel-Reinforced"
    },
    {
      "@type": "PropertyValue",
      name: "Material",
      value: "Neoprene and Natural Rubber"
    },
    {
      "@type": "PropertyValue",
      name: "Certifications",
      value: "Buy American, AASHTO M-251, AISC, NTPEP"
    },
    {
      "@type": "PropertyValue",
      name: "Applications",
      value: "Bridges, Industrial Structures, Seismic Isolation"
    },
    {
      "@type": "PropertyValue",
      name: "Customization",
      value: "Available in custom sizes and designs"
    }
  ]
};

export default function BearingPads() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BearingPadsClient />
    </>
  );
}

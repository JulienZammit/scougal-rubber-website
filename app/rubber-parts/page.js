import RubberPartsClient from "./RubberPartsClient";

export const metadata = {
  title: "Industrial Rubber Parts - Custom Molded & Aerospace Solutions | Scougal Rubber",
  description:
    "Discover Scougal Rubber’s high-quality industrial rubber parts. Our custom molded rubber solutions serve diverse industries, including aerospace molded rubber engineering, government project custom rubber molding, and more. Precision, durability, and compliance for all your rubber component needs.",
  keywords:
    "industrial rubber parts, custom molded rubber, aerospace molded rubber engineering, government project custom rubber molding, rubber parts, industrial rubber manufacturing, O-Rings, rubber gasket materials, elastomer, vulcanizing, custom rubber solutions, rubber components",
  robots: "index, follow",
  author: "Scougal Rubber Corporation",
  openGraph: {
    title: "Industrial Rubber Parts - Custom Molded & Aerospace Solutions | Scougal Rubber",
    description:
      "Explore Scougal Rubber's custom rubber parts, from molded products to rubber rollers and hand-built mandrel solutions. Designed for aerospace, government projects, and other industries.",
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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.scougalrubber.com/rubber-parts",
  name: "Industrial Rubber Parts - Custom Molded & Aerospace Solutions",
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
  description:
    "Custom molded rubber components for industrial applications, including vulcanized rubber, rubber-to-metal bonding, and aerospace molded rubber engineering. Our solutions meet stringent government project requirements.",
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
      value: "Engineered for diverse industrial and aerospace applications",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <RubberPartsClient />
    </>
  );
}

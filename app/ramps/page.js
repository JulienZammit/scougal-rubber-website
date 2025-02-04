import RampsClient from "./RampsClient";

export const metadata = {
  title:
    "Scougal Ramps - Efficient Road Plate Management & Cold Mix Reduction | Scougal Rubber",
  description:
    "Boost productivity with Scougal Ramps, durable and reusable solutions for efficient road plate management. Our ramps reduce cold mix usage, prevent site damage, and enhance road safety on construction sites.",
  keywords:
    "Scougal Rubber ramps, road plate management, construction ramps, reusable ramps, cold mix reduction, road safety solutions, durable ramps, efficient road plate handling, prevent damage claims",
  robots: "index, follow",
  author: "Scougal Rubber Corporation",
  openGraph: {
    title:
      "Scougal Ramps - Efficient Road Plate Management & Cold Mix Reduction | Scougal Rubber",
    description:
      "Enhance your construction workflow with Scougal Ramps. Our reusable ramps streamline road plate management, reduce cold mix usage, and protect worksites, ensuring enhanced road safety and productivity.",
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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.scougalrubber.com/ramps",
  name: "Scougal Ramps - Efficient Road Plate Management",
  description:
    "Reusable, durable ramps designed for efficient road plate management. Scougal Ramps reduce cold mix usage, prevent site damage, and enhance road safety on construction sites.",
  url: "https://www.scougalrubber.com/ramps",
  image: "https://www.scougalrubber.com/ramps/ramp1.webp",
  offers: {
    "@type": "Offer",
    url: "https://www.scougalrubber.com/ramps",
    priceCurrency: "USD",
    price: 0,
    availability: "https://schema.org/InStock",
  },
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Durability",
      value: "Reusable for long-term projects",
    },
    {
      "@type": "PropertyValue",
      name: "Efficiency",
      value: "Reduces cold mix and eliminates disposal issues",
    },
    {
      "@type": "PropertyValue",
      name: "Safety",
      value: "Prevents site damage and enhances road safety",
    },
  ],
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
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-775-284-8500",
    contactType: "Customer Service",
    email: "info@scougalrubber.com",
    availableLanguage: ["English"],
    areaServed: "US",
  },
};

export default function Ramps() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <RampsClient />
    </>
  );
}

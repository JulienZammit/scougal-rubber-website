import SteelClient from "./SteelClient";

export const metadata = {
  title:
    "Steel Fabrication Services - Precision, Reliability & Certified Quality | Scougal Rubber",
  description:
    "Scougal Rubber provides advanced steel fabrication services with precision and reliability. Our custom metal fabrication and CNC machining solutions are AISC, NTPEP, CAGE, AS9100, and ISO 9001 certified—delivering high-quality industrial steel solutions for infrastructure projects.",
  keywords:
    "steel fabrication, custom metal fabrication, precision steel work, CNC machining, industrial metal fabrication, AISC certified fabricator and erector, NTPEP datamine tested, CAGE code certified, AS9100, ISO 9001, steel bearings, structural bearings, steel reinforced elastomeric bearing",
  robots: "index, follow",
  author: "Scougal Rubber Corporation",
  openGraph: {
    title:
      "Steel Fabrication Services - Precision, Reliability & Certified Quality | Scougal Rubber",
    description:
      "Discover Scougal Rubber’s advanced steel fabrication capabilities, including custom metal fabrication, CNC machining, and industrial steel solutions certified by AISC, NTPEP, CAGE, AS9100, and ISO 9001.",
    url: "https://www.scougalrubber.com/steel",
    type: "website",
    images: [
      {
        url: "https://www.scougalrubber.com/logo.webp",
        alt: "Scougal Rubber Company Logo",
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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.scougalrubber.com/steel",
  name: "Steel Fabrication Services - Precision, Reliability & Certified Quality",
  description:
    "Scougal Rubber provides advanced steel fabrication services with custom metal fabrication, CNC machining, and industrial steel solutions. Our processes are AISC, NTPEP, CAGE, AS9100, and ISO 9001 certified—ensuring high precision and durability in every project.",
  url: "https://www.scougalrubber.com/steel",
  image: "https://www.scougalrubber.com/logo.webp",
  offers: {
    "@type": "Offer",
    url: "https://www.scougalrubber.com/steel",
    priceCurrency: "USD",
    price: 0,
    availability: "https://schema.org/InStock",
  },
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
  additionalType: "http://www.productontology.org/id/Metal_fabrication",
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Certifications",
      value: "AISC, NTPEP, CAGE, AS9100, ISO 9001",
    },
    {
      "@type": "PropertyValue",
      name: "Capabilities",
      value:
        "CNC machining, custom metal fabrication, large-scale steel projects, precision steel work",
    },
    {
      "@type": "PropertyValue",
      name: "Specialties",
      value: "Steel bearings, structural bearings, steel reinforced elastomeric bearing solutions",
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

export default function Steel() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SteelClient />
    </>
  );
}

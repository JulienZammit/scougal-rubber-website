import MainPageClient from "./MainPageClient";
import { unstable_noStore as noStore } from "next/cache";

export const metadata = {
  title: "America's Leading Custom Molded Rubber Manufacturer | Scougal Rubber",
  description:
    "Since 1916, Scougal Rubber has been the leader in custom molded rubber solutions for industrial and infrastructure applications. Explore our elastomeric bearings, custom rubber products, and precision steel fabrication for projects of all sizes.",
  keywords:
    "custom molded rubber, industrial rubber, elastomeric bearings, bridge bearings, steel fabrication, rubber manufacturing, rubber to metal bonding, vulcanized rubber, AISC certified, Buy American certified",
  robots: "index, follow",
  author: "Scougal Rubber Corporation",
  openGraph: {
    title:
      "America's Leading Custom Molded Rubber Manufacturer | Scougal Rubber",
    description:
      "Scougal Rubber, America's premier provider of custom molded rubber products and elastomeric bearings. Serving the industrial and infrastructure sectors with high-quality, certified solutions since 1916.",
    type: "website",
    url: "https://www.scougalrubber.com/",
    images: [
      {
        url: "https://www.scougalrubber.com/logo.webp",
        alt: "Scougal Rubber Company Logo",
      },
    ],
  },
  alternates: {
    canonical: "https://www.scougalrubber.com/",
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "contact:phone_number": "+1 (775) 284-8500",
    "contact:email": "info@scougalrubber.com",
    "contact:address":
      "885 Denmark Drive Suite 103, McCarran, NV 89437-4425, USA",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: "1.0",
};

// Structured Data (JSON-LD) for Main Page
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.scougalrubber.com",
      url: "https://www.scougalrubber.com/",
      name: "Scougal Rubber Corporation",
      logo: "https://www.scougalrubber.com#organization",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-775-284-8500",
        contactType: "Customer Service",
        email: "info@scougalrubber.com",
        availableLanguage: ["English"],
        areaServed: "US",
      },
      description:
        "Scougal Rubber is a leading custom molded rubber manufacturer providing elastomeric bearings, rubber-to-metal bonding, and industrial rubber solutions for bridges and infrastructure since 1916.",
      sameAs: [
        "https://www.linkedin.com/company/scougal-rubber-corporation/",
        "https://www.facebook.com/scougalrubbercorp",
      ],
      foundingDate: "1916",
      founders: [
        {
          "@type": "Person",
          name: "Rob Anderson",
        },
      ],
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "885 Denmark Drive Suite 103",
          addressLocality: "McCarran",
          addressRegion: "NV",
          postalCode: "89437-4425",
          addressCountry: "USA",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "6239 Corson Ave S",
          addressLocality: "Seattle",
          addressRegion: "WA",
          postalCode: "98108-3443",
          addressCountry: "USA",
        },
      ],
    },

    // =========== PRODUCT 1 ===========
    {
      "@type": "Product",
      "@id": "https://www.scougalrubber.com/bearing-pads",
      name: "Bearings and Bearing Pads",
      description:
        "High-quality elastomeric bearings for bridge and industrial applications, Buy American certified and AISC certified.",
      url: "https://www.scougalrubber.com/bearing-pads",
      image:
        "https://www.scougalrubber.com/bearing/bearingPad_loadPlate_217.jpg",
      offers: {
        "@type": "Offer",
        url: "https://www.scougalrubber.com/bearing-pads",
        priceCurrency: "USD",
        price: 0,
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    },

    // =========== PRODUCT 2 ===========
    {
      "@type": "Product",
      "@id": "https://www.scougalrubber.com/rubber-parts",
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
    },

    // =========== PRODUCT 3 ===========
    {
      "@type": "Product",
      "@id": "https://www.scougalrubber.com/steel",
      name: "Steel Fabrication Services",
      description:
        "Precision steel fabrication services, including CNC machining and custom metal solutions for industrial applications.",
      url: "https://www.scougalrubber.com/steel",
      image: "https://www.scougalrubber.com/logo.webp",
      offers: {
        "@type": "Offer",
        url: "https://www.scougalrubber.com/steel",
        priceCurrency: "USD",
        price: 0,
        availability: "https://schema.org/InStock",
      },
    },

    // =========== PRODUCT 4 ===========
    {
      "@type": "Product",
      "@id": "https://www.scougalrubber.com/ramps",
      name: "Scougal Ramps",
      description:
        "Reusable, durable ramps designed for efficient road plate management, reducing cold mix usage and improving road safety.",
      url: "https://www.scougalrubber.com/ramps",
      image: "https://www.scougalrubber.com/ramps/ramp1.webp",
      offers: {
        "@type": "Offer",
        url: "https://www.scougalrubber.com/ramps",
        priceCurrency: "USD",
        price: 0,
        availability: "https://schema.org/InStock",
      },
    },
  ],
};

export default function Home() {
  noStore(); // Disable caching for this page

  const timeOnServer = new Date().toLocaleTimeString("en-US");

  return (
    <>
      {/* Inject JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Page content */}
      <MainPageClient />
    </>
  );
}

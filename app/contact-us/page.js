import ContactUsClient from "./ContactUsClient";

export const metadata = {
  title: "Contact Scougal Rubber - Custom Rubber Solutions & Bearings Support",
  description:
    "Contact Scougal Rubber for expert support on custom rubber molding, elastomeric bearings, and industrial rubber solutions. Our team is here to help with your rubber product inquiries.",
  keywords:
    "Scougal Rubber contact, custom rubber molding, bearing sales, industrial rubber support, rubber product inquiries, elastomeric bearings, rubber solutions, contact Scougal Rubber",
  robots: "index, follow",
  author: "Scougal Rubber Corporation",
  openGraph: {
    title: "Contact Scougal Rubber - Custom Rubber Solutions & Bearings Support",
    description:
      "Reach out to Scougal Rubber for personalized advice on custom rubber products, bearings, and industrial components. Our expert team is ready to assist.",
    url: "https://www.scougalrubber.com/contact-us",
    type: "website",
    images: [
      {
        url: "https://www.scougalrubber.com/logo.webp",
        alt: "Scougal Rubber Company Logo",
      },
    ],
  },
  alternates: {
    canonical: "https://www.scougalrubber.com/contact-us",
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "contact:phone_number": "+1 (775) 284-8500",
    "contact:phone_number2": "+1 (206) 763-2650",
    "contact:email": "sales@scougalrubber.com",
    "contact:email2": "info@scougalrubber.com",
    "contact:address":
      "885 Denmark Drive Suite 103, McCarran, NV 89437-4425, USA",
    "contact:address2": "6239 Corson Ave S, Seattle, WA 98108-3443, USA",
  },
};

// Structured Data (JSON-LD) for Contact Information
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Scougal Rubber Corporation",
  "url": "https://www.scougalrubber.com",
  "logo": "https://www.scougalrubber.com/logo.webp",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+1-775-284-8500",
      "contactType": "Customer Service",
      "areaServed": "US",
      "availableLanguage": ["English"],
      "email": "sales@scougalrubber.com"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+1-206-763-2650",
      "contactType": "General Inquiries",
      "areaServed": "US",
      "availableLanguage": ["English"],
      "email": "info@scougalrubber.com"
    }
  ],
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "885 Denmark Drive Suite 103",
      "addressLocality": "McCarran",
      "addressRegion": "NV",
      "postalCode": "89437-4425",
      "addressCountry": "USA"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "6239 Corson Ave S",
      "addressLocality": "Seattle",
      "addressRegion": "WA",
      "postalCode": "98108-3443",
      "addressCountry": "USA"
    }
  ],
  "sameAs": [
    "https://www.linkedin.com/company/scougal-rubber-corporation/",
    "https://www.facebook.com/scougalrubbercorp"
  ],
};

export default function ContactUs() {
  return (
    <>
      {/* Inject JSON-LD for structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Page content */}
      <ContactUsClient />
    </>
  );
}

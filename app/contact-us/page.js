import ContactUsClient from "./ContactUsClient";

export const metadata = {
  title: "Contact Scougal Rubber - Expert Support for Custom Rubber Solutions & Bearings",
  description:
    "Get in touch with Scougal Rubber for expert advice and support on custom rubber molding, elastomeric bearings, and industrial rubber solutions. Our dedicated team is ready to assist with all your rubber product inquiries.",
  keywords:
    "Scougal Rubber contact, custom rubber molding, rubber support, industrial rubber solutions, elastomeric bearings support, rubber product inquiries, customer service, contact Scougal Rubber",
  robots: "index, follow",
  author: "Scougal Rubber Corporation",
  openGraph: {
    title: "Contact Scougal Rubber - Expert Support for Custom Rubber Solutions & Bearings",
    description:
      "Reach out to Scougal Rubber for personalized support on custom rubber products, elastomeric bearings, and industrial components. Our expert team is here to help.",
    url: "https://www.scougalrubber.com/contact-us",
    type: "website",
    images: [
      {
        url: "https://www.scougalrubber.com/logo/logo-grey.ico",
        alt: "Scougal Rubber Company Logo",
      },
    ],
  },
  alternates: {
    canonical: "https://www.scougalrubber.com/contact-us",
  },
  icons: {
    icon: "https://www.scougalrubber.com/logo/logo-grey.ico",
  },
  other: {
    "contact:phone_number": "+1 (775) 284-8500",
    "contact:phone_number2": "+1 (206) 763-2650",
    "contact:email": "sales@scougalrubber.com",
    "contact:email2": "info@scougalrubber.com",
    "contact:address": "885 Denmark Drive Suite 103, McCarran, NV 89437-4425, USA",
    "contact:address2": "6239 Corson Ave S, Seattle, WA 98108-3443, USA",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Scougal Rubber Corporation",
  url: "https://www.scougalrubber.com",
  logo: "https://www.scougalrubber.com/logo/logo-grey.ico",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+1-775-284-8500",
      contactType: "Customer Service",
      areaServed: "US",
      availableLanguage: ["English"],
      email: "sales@scougalrubber.com",
    },
    {
      "@type": "ContactPoint",
      telephone: "+1-206-763-2650",
      contactType: "General Inquiries",
      areaServed: "US",
      availableLanguage: ["English"],
      email: "info@scougalrubber.com",
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
  sameAs: [
    "https://www.linkedin.com/company/scougal-rubber-corporation/",
    "https://www.facebook.com/scougalrubbercorp",
  ],
};

export default function ContactUs() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ContactUsClient />
    </>
  );
}

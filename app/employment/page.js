import EmploymentClient from "./EmploymentClient";

export const metadata = {
  title: "Careers at Scougal Rubber - Join Our Team",
  description:
    "Explore rewarding career opportunities at Scougal Rubber, a leader in innovative rubber manufacturing. We value diversity, creativity, and excellence. Apply online to join our dynamic team and help shape the future of custom rubber solutions.",
  keywords:
    "Scougal Rubber careers, rubber manufacturing jobs, industrial careers, custom rubber jobs, career opportunities, diversity in manufacturing, join our team, equal opportunity employer",
  robots: "index, follow",
  author: "Scougal Rubber Corporation",
  openGraph: {
    title: "Careers at Scougal Rubber - Join Our Team",
    description:
      "Join Scougal Rubber for exciting career opportunities in rubber manufacturing and custom rubber solutions. We value diversity, innovation, and excellence. Apply online today.",
    url: "https://www.scougalrubber.com/employment",
    type: "website",
    images: [
      {
        url: "https://www.scougalrubber.com/logo.webp",
        alt: "Scougal Rubber Company Logo",
      },
    ],
  },
  alternates: {
    canonical: "https://www.scougalrubber.com/employment",
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "contact:email": "info@scougalrubber.com",
    "contact:address": "885 Denmark Drive Suite 103, McCarran, NV 89437-4425, USA",
    "contact:phone_number": "+1 (775) 284-8500",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.scougalrubber.com/#organization",
      "name": "Scougal Rubber Corporation",
      "url": "https://www.scougalrubber.com",
      "logo": "https://www.scougalrubber.com/logo.webp",
      "sameAs": [
        "https://www.linkedin.com/company/scougal-rubber-corporation/",
        "https://www.facebook.com/scougalrubbercorp"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+1-775-284-8500",
          "contactType": "Human Resources",
          "email": "info@scougalrubber.com",
          "availableLanguage": ["English"],
          "areaServed": "US"
        }
      ]
    },
    {
      "@type": "JobPosting",
      "title": "Rubber Manufacturing Technician",
      "description": "Join Scougal Rubber as a Rubber Manufacturing Technician and contribute to the production of high-quality custom rubber products. Responsibilities include ensuring safety standards, operating manufacturing equipment, and collaborating with our engineering team.",
      "datePosted": "2024-09-01",
      "employmentType": "FULL_TIME",
      "hiringOrganization": {
        "@type": "Organization",
        "@id": "https://www.scougalrubber.com/#organization",
        "name": "Scougal Rubber Corporation"
      },
      "jobLocation": [
        {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "885 Denmark Drive Suite 103",
            "addressLocality": "McCarran",
            "addressRegion": "NV",
            "postalCode": "89437-4425",
            "addressCountry": "USA"
          }
        },
        {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "6239 Corson Ave S",
            "addressLocality": "Seattle",
            "addressRegion": "WA",
            "postalCode": "98108-3443",
            "addressCountry": "USA"
          }
        }
      ],
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": {
          "@type": "QuantitativeValue",
          "value": 0,
          "unitText": "YEAR"
        }
      },
      "validThrough": "2024-12-31",
      "responsibilities": [
        "Manufacture high-quality custom rubber products",
        "Ensure adherence to safety and quality standards",
        "Collaborate effectively with the engineering and production teams"
      ],
      "qualifications": [
        "Experience in a manufacturing environment",
        "Strong attention to detail and safety protocols",
        "Ability to work collaboratively in a team setting"
      ]
    }
  ]
};

export default function Employment() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <EmploymentClient />
    </>
  );
}

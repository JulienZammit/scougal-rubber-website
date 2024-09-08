import EmploymentClient from "./EmploymentClient";

export const metadata = {
  title: "Careers at Scougal Rubber - Join Our Team",
  description:
    "Explore career opportunities at Scougal Rubber, a leader in rubber manufacturing. We are committed to diversity, innovation, and respect. Apply online and start making a difference today.",
  keywords:
    "Scougal Rubber careers, jobs at Scougal, rubber manufacturing jobs, industrial jobs, diversity in the workplace, career opportunities in manufacturing, work at Scougal Rubber, equal opportunity employer",
  robots: "index, follow",
  author: "Scougal Rubber Corporation",
  openGraph: {
    title: "Careers at Scougal Rubber - Join Our Team",
    description:
      "Join Scougal Rubber for exciting career opportunities in rubber manufacturing. We value diversity, respect, and innovation. Apply online today.",
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
    "contact:address":
      "885 Denmark Drive Suite 103, McCarran, NV 89437-4425, USA",
    "contact:phone_number": "+1 (775) 284-8500",
  },
};

// Structured Data (JSON-LD) for Employment Opportunities
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Scougal Rubber Corporation",
  "url": "https://www.scougalrubber.com",
  "logo": "https://www.scougalrubber.com/logo.webp",
  "sameAs": [
    "https://www.linkedin.com/company/scougal-rubber-corporation/",
    "https://www.facebook.com/scougalrubbercorp"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-775-284-8500",
    "contactType": "Human Resources",
    "email": "info@scougalrubber.com",
    "availableLanguage": ["English"],
    "areaServed": "US"
  },
  "jobPosting": {
    "@type": "JobPosting",
    "title": "Rubber Manufacturing Technician",
    "description": "Join Scougal Rubber and help manufacture high-quality rubber products. Contact us to apply today!",
    "datePosted": "2024-09-01",
    "employmentType": "Full-Time",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Scougal Rubber Corporation",
      "sameAs": "https://www.scougalrubber.com"
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
      "currency": "USD"
    },
    "validThrough": "2024-12-31",
    "responsibilities": [
      "Manufacture high-quality rubber products",
      "Ensure safety standards are met",
      "Collaborate with the engineering team"
    ],
    "qualifications": [
      "Experience in manufacturing",
      "Strong attention to detail",
      "Ability to work in a team"
    ]
  }
};

export default function Employment() {
  return (
    <>
      {/* Inject JSON-LD for structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Page content */}
      <EmploymentClient />
    </>
  );
}

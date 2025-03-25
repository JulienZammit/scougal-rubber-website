import ProjectsClient from './ProjectsClient';

export const metadata = {
  title: 'Our Projects - Scougal Rubber | Bridge & Industrial Rubber Solutions',
  description:
    'Explore the key projects completed by Scougal Rubber, including bridge construction and industrial rubber solutions. Discover how our expertise has been applied in projects like the Bay Bridge, San Francisco, California, Hood Canal, and more.',
  keywords:
    'Scougal Rubber projects, bridge construction projects, industrial rubber projects, elastomeric bearings projects, custom rubber solutions, Bayway Bridge, Hood Canal, Advanced American project, Lynn Lake project',
  robots: 'index, follow',
  author: 'Scougal Rubber Corporation',
  openGraph: {
    title: 'Our Projects - Scougal Rubber | Bridge & Industrial Rubber Solutions',
    description:
      "See how Scougal Rubber's expertise has been applied in various bridge and industrial projects. Explore our completed projects including Bay Bridge, San Francisco, California and Advanced American.",
    url: 'https://www.scougalrubber.com/projects',
    type: 'website',
    images: [
      {
        url: 'https://www.scougalrubber.com/logo.webp',
        alt: 'Scougal Rubber Company Logo',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.scougalrubber.com/projects',
  },
  icons: {
    icon: '/favicon.ico',
  },
  other: {
    'contact:email': 'info@scougalrubber.com',
    'contact:phone_number': '+1 (775) 284-8500',
  },
};

// Define key projects with project-specific information
const projects = [
  {
    name: 'Bay Bridge, San Francisco, California',
    description:
      'Scougal Rubber supplied elastomeric bearings for the Bay Bridge, San Francisco, California, ensuring long-lasting, durable support for critical infrastructure.',
    image: 'https://www.scougalrubber.com/Bayway/bw1.webp',
    date: '2020-05-01',
    location: {
      city: 'Florida',
      country: 'USA',
    },
  },
  {
    name: 'Hood Canal Bridge',
    description:
      'The Hood Canal Bridge project involved custom rubber solutions by Scougal Rubber, ensuring flexibility and strength for one of the longest floating bridges in the world.',
    image: 'https://www.scougalrubber.com/Hood Canal/September 2008 001.webp',
    date: '2018-09-15',
    location: {
      city: 'Washington',
      country: 'USA',
    },
  },
  {
    name: 'Advanced American Project',
    description:
      'For the Advanced American Project, Scougal Rubber delivered precision-engineered elastomeric bearings and rubber components to support key industrial operations.',
    image: 'https://www.scougalrubber.com/advanced-american/1A.webp',
    date: '2019-08-01',
    location: {
      city: 'California',
      country: 'USA',
    },
  },
  {
    name: 'Lynn Lake Project',
    description:
      'Scougal Rubber provided customized elastomeric bearings and rubber solutions to the Lynn Lake Project, ensuring optimal performance in harsh environmental conditions.',
    image: 'https://www.scougalrubber.com/lynnlake/ll1.webp',
    date: '2021-03-10',
    location: {
      city: 'Texas',
      country: 'USA',
    },
  },
];

// Generate structured data for the projects
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Scougal Rubber Corporation",
  "url": "https://www.scougalrubber.com",
  "logo": "https://www.scougalrubber.com/logo.webp",
  "description": "Scougal Rubber is a leader in bridge construction and industrial rubber solutions, providing elastomeric bearings and custom rubber components for infrastructure projects.",
  "sameAs": [
    "https://www.linkedin.com/company/scougal-rubber-corporation/",
    "https://www.facebook.com/scougalrubbercorp"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-775-284-8500",
    "contactType": "Customer Service",
    "email": "info@scougalrubber.com",
    "availableLanguage": ["English"],
    "areaServed": "US"
  },
  "hasPart": projects.map((project) => ({
    "@type": "Project",
    "name": project.name,
    "description": project.description,
    "startDate": project.date,
    "location": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": project.location.city,
        "addressCountry": project.location.country,
      },
    },
    "image": project.image,
  })),
};

export default function Projects() {
  return (
    <>
      {/* Inject JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Page content */}
      <ProjectsClient />
    </>
  );
}

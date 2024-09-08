import ExperienceClient from "./ExperienceClient";

export const metadata = {
  title: "Our Team and Expertise - Leaders in Rubber Solutions | Scougal Rubber",
  description:
    "Meet the expert team at Scougal Rubber, specialists in custom rubber products and industrial solutions. With decades of experience, we drive innovation in elastomeric bearings and rubber manufacturing.",
  keywords:
    "Scougal Rubber team, leadership, custom rubber experts, industrial solutions, elastomeric bearings, rubber manufacturing experts, team experience, rubber industry leaders",
  robots: "index, follow",
  author: "Scougal Rubber Corporation",
  openGraph: {
    title: "Our Team and Expertise - Leaders in Rubber Solutions | Scougal Rubber",
    description:
      "Discover the experienced professionals behind Scougal Rubber, driving innovation in custom rubber products and industrial solutions for over 100 years. Learn more about our leadership.",
    url: "https://www.scougalrubber.com/experience",
    type: "website",
    images: [
      {
        url: "https://www.scougalrubber.com/logo.webp",
        alt: "Scougal Rubber Company Logo",
      },
    ],
  },
  alternates: {
    canonical: "https://www.scougalrubber.com/experience",
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "contact:email": "info@scougalrubber.com",
    "contact:phone_number": "+1 (775) 284-8500",
  },
};

const teamMembers = [
  {
    name: "Rob Anderson",
    position: "President",
    description: `After stints with Boeing and a commercial window manufacturer, Rob came to Scougal in 1992 and has played a role in virtually every facet of the company. He has managed growth in production, operations, and sales. Rob is currently running both the Seattle and Reno operations.`,
    image: "/employees/ra.jpg",
  },
  {
    name: "Scott Nelson",
    position: "Vice President Sales & Marketing",
    description: `Scott joined the Sales/Estimating Team in 2006 after graduating from University of Washington. He played an instrumental role in moving Scougal Rubber to the new plant in McCarran, NV in 2011.`,
    image: "/employees/sn.jpg",
  },
  {
    name: "Alfredo Shanklin",
    position: "Plant Manager - Seattle",
    description: `Al has worked at Scougal for over 16 years, starting in Quality Control, but quickly finding his specialty in Production. He has been instrumental in keeping the company competitive in the rubber manufacturing world.`,
    image: "/employees/as.jpg",
  },
  {
    name: "Ahsan Ativalu",
    position: "Plant Manager - Reno",
    description: `Ahsan started with Scougal Rubber in 1999 and was instrumental in helping to plan and implement the relocation of several critical pieces of equipment to McCarran, NV in 2010.`,
    image: "/employees/aa.jpg",
  },
  {
    name: "Brad Streeter",
    position: "Quality Manager",
    description: `Brad oversees the quality function for the company and has over 30 years of experience in implementing formal quality management and continuous improvement programs.`,
    image: "/employees/bs.jpg",
  },
];

// Structured Data (JSON-LD) for the Team and Experience Page
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Scougal Rubber Corporation",
  "url": "https://www.scougalrubber.com",
  "logo": "https://www.scougalrubber.com/logo.webp",
  "description": "Scougal Rubber is a leader in custom rubber products and industrial solutions, driven by a team of experts with decades of experience in elastomeric bearings and rubber manufacturing.",
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
  "employee": teamMembers.map(member => ({
    "@type": "Person",
    "name": member.name,
    "jobTitle": member.position,
    "description": member.description,
    "image": `https://www.scougalrubber.com${member.image}`,
    "worksFor": {
      "@type": "Organization",
      "name": "Scougal Rubber Corporation"
    }
  }))
};

export default function Experience() {
  return (
    <>
      {/* Inject JSON-LD for structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Page content */}
      <ExperienceClient />
    </>
  );
}

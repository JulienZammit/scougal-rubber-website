import ExperienceClient from "./ExperienceClient";

export const metadata = {
  title: "Our Team & Expertise - Industry Leaders in Rubber Solutions | Scougal Rubber",
  description:
    "Discover the expert team at Scougal Rubber—industry leaders in custom rubber products, innovative elastomeric bearings, and industrial solutions. With decades of experience, our professionals drive excellence in rubber manufacturing and engineering.",
  keywords:
    "Scougal Rubber team, industry experts, custom rubber products, industrial solutions, elastomeric bearings, rubber manufacturing, leadership, rubber innovation",
  robots: "index, follow",
  author: "Scougal Rubber Corporation",
  openGraph: {
    title: "Our Team & Expertise - Industry Leaders in Rubber Solutions | Scougal Rubber",
    description:
      "Meet the experienced professionals behind Scougal Rubber. Our leadership drives innovation in custom rubber products, elastomeric bearings, and industrial solutions for over 100 years.",
    url: "https://www.scougalrubber.com/experience",
    type: "website",
    images: [
      {
        url: "https://www.scougalrubber.com/logo/logo-grey.ico",
        alt: "Scougal Rubber Company Logo",
      },
    ],
  },
  alternates: {
    canonical: "https://www.scougalrubber.com/experience",
  },
  icons: {
    icon: "https://www.scougalrubber.com/logo/logo-grey.ico",
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
    description: `After stints with Boeing and a commercial window manufacturer, Rob joined Scougal in 1992 and has been instrumental in overseeing production, operations, and sales. He currently manages both the Seattle and Reno operations.`,
    image: "/employees/ra.jpg",
  },
  {
    name: "Scott Nelson",
    position: "Vice President Sales & Marketing",
    description: `Scott joined the Sales/Estimating Team in 2006 after graduating from the University of Washington. He played a key role in relocating Scougal Rubber to the new McCarran, NV plant in 2011.`,
    image: "/employees/sn.jpg",
  },
  {
    name: "Alfredo Shanklin",
    position: "Plant Manager - Seattle",
    description: `With over 16 years at Scougal, Al transitioned from Quality Control to Production, ensuring the company remains competitive in rubber manufacturing.`,
    image: "/employees/as.jpg",
  },
  {
    name: "Ahsan Ativalu",
    position: "Plant Manager - Reno",
    description: `Ahsan, who joined Scougal Rubber in 1999, was pivotal in planning and executing the relocation of critical equipment to McCarran, NV in 2010.`,
    image: "/employees/aa.jpg",
  },
  {
    name: "Brad Streeter",
    position: "Quality Manager",
    description: `Brad oversees quality management with over 30 years of experience in formal quality systems and continuous improvement, ensuring top-notch product standards.`,
    image: "/employees/bs.jpg",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Scougal Rubber Corporation",
  url: "https://www.scougalrubber.com",
  logo: "https://www.scougalrubber.com/logo/logo-grey.ico",
  description:
    "Scougal Rubber is a leader in custom rubber products and industrial solutions, driven by a team of experts with decades of experience in elastomeric bearings and rubber manufacturing.",
  sameAs: [
    "https://www.linkedin.com/company/scougal-rubber-corporation/",
    "https://www.facebook.com/scougalrubbercorp"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-775-284-8500",
    contactType: "Customer Service",
    email: "info@scougalrubber.com",
    availableLanguage: ["English"],
    areaServed: "US"
  },
  employee: teamMembers.map(member => ({
    "@type": "Person",
    name: member.name,
    jobTitle: member.position,
    description: member.description,
    image: `https://www.scougalrubber.com${member.image}`,
    worksFor: {
      "@type": "Organization",
      name: "Scougal Rubber Corporation"
    }
  }))
};

export default function Experience() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ExperienceClient />
    </>
  );
}

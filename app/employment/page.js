import EmploymentClient from "./EmploymentClient";

export const metadata = {
  title: "Employment Opportunities - Careers at Scougal Rubber",
  description:
    "Join the team at Scougal Rubber and make a difference in the world. We offer exciting career opportunities in rubber manufacturing, with a commitment to respect, diversity, and innovation. Apply online today.",
  keywords:
    "Scougal Rubber employment, Scougal Rubber jobs, careers in rubber manufacturing, industrial jobs, equal opportunity employer, work at Scougal, employment opportunities",
  robots: "index, follow",
  author: "Scougal Rubber Corporation",
  openGraph: {
    title: "Employment Opportunities - Careers at Scougal Rubber",
    description:
      "Explore career opportunities at Scougal Rubber, where we value diversity, respect, and innovation. Make a positive impact by joining our team. Apply online now.",
    url: "https://www.scougalrubber.com/employment",
    type: "website",
    images: [
      {
        url: "https://www.scougalrubber.com/images/employment-banner.jpg",
      },
    ],
  },
  alternates: {
    canonical: "https://www.scougalrubber.com/employment",
  },
  icons: {
    icon: "/favicon.ico",
  },
  // Métadonnées supplémentaires de contact
  other: {
    "contact:email": "info@scougalrubber.com",
    "contact:address":
      "885 Denmark Drive Suite 103, McCarran, NV 89437-4425, USA",
    "contact:phone_number": "+1 (775) 284-8500",
  },
};

export default function Employment() {

  return (
    <>
      <EmploymentClient />
    </>
  );
}

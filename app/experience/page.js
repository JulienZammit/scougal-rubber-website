import ExperienceClient from "./ExperienceClient";

export const metadata = {
  title: "Our Experience - Meet the Team at Scougal Rubber",
  description:
    "Meet the experienced team behind Scougal Rubber, leaders in custom rubber products and industrial solutions. Discover the expertise that drives our success in elastomeric bearings and rubber manufacturing.",
  keywords:
    "Scougal Rubber team, experience, rubber industry experts, elastomeric bearings experts, industrial rubber solutions, Scougal Rubber leadership, manufacturing experts, custom rubber solutions",
  robots: "index, follow",
  author: "Scougal Rubber Corporation",
  openGraph: {
    title: "Our Experience - Meet the Team at Scougal Rubber",
    description:
      "Learn about the experienced professionals leading Scougal Rubber, a trusted name in industrial rubber solutions and custom molded products. Our team is committed to quality and innovation.",
    url: "https://www.scougalrubber.com/experience",
    type: "website",
    images: [
      {
        url: "https://www.scougalrubber.com/images/experience-banner.jpg",
      },
    ],
  },
  alternates: {
    canonical: "https://www.scougalrubber.com/experience",
  },
  icons: {
    icon: "/favicon.ico",
  },
  // Métadonnées supplémentaires de contact
  other: {
    "contact:email": "info@scougalrubber.com",
    "contact:phone_number": "+1 (775) 284-8500",
  },
};

export default function Experience() {
  return (
    <>
      <ExperienceClient />
    </>
  );
}

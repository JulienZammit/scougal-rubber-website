import SteelClient from "./SteelClient";

export const metadata = {
  title: "Steel Fabrication - Precision and Reliability | Scougal Rubber",
  description:
    "Scougal Rubber offers advanced steel fabrication services with precision, efficiency, and adherence to high-quality standards. Explore our expertise in handling complex projects and delivering custom metal fabrication solutions.",
  keywords:
    "steel fabrication, custom metal fabrication, precision steel work, CNC machining, industrial metal fabrication, Scougal Rubber steel services, AISC certified, NTPEP certified, CAGE certified",
  robots: "index, follow",
  author: "Scougal Rubber Corporation",
  openGraph: {
    title: "Steel Fabrication - Precision and Reliability | Scougal Rubber",
    description:
      "Discover Scougal Rubber’s steel fabrication capabilities, from CNC machining to large-scale custom projects. Certified for quality and committed to exceeding expectations.",
    url: "https://www.scougalrubber.com/steel-fabrication",
    type: "website",
    images: [
      {
        url: "https://www.scougalrubber.com/images/steel-fabrication-banner.jpg",
      },
    ],
  },
  alternates: {
    canonical: "https://www.scougalrubber.com/steel-fabrication",
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

export default function Steel() {

  return (
    <>
      <SteelClient />
    </>
  );
}

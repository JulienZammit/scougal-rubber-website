import CompanyClient from "./CompanyClient";

export const metadata = {
  title: "About Scougal Rubber - Custom Molded Rubber Company Since 1916",
  description:
    "Learn about Scougal Rubber, a leading provider of custom molded rubber products and elastomeric bearing pads for industrial projects and critical infrastructure since 1916. Our commitment to quality, innovation, and sustainability makes us a trusted partner in the industry.",
  keywords:
    "Scougal Rubber, custom molded rubber, elastomeric bearing pads, rubber products, industrial rubber, infrastructure solutions, bridge bearings, rubber manufacturing, AISC certified, Buy American",
  robots: "index, follow",
  author: "Scougal Rubber Corporation",
  openGraph: {
    title: "About Scougal Rubber - Custom Molded Rubber Company Since 1916",
    description:
      "Discover Scougal Rubber, a trusted provider of high-performance rubber components and elastomeric bearing pads since 1916. We prioritize quality, innovation, and customer satisfaction.",
    url: "https://www.scougalrubber.com/company",
    type: "website",
    images: [
      {
        url: "https://www.scougalrubber.com/images/company-banner.jpg",
      },
    ],
  },
  alternates: {
    canonical: "https://www.scougalrubber.com/company",
  },
  icons: {
    icon: "/favicon.ico",
  },
  // Métadonnées supplémentaires de contact
  other: {
    "contact:phone_number": "+1 (775) 284-8500",
    "contact:email": "info@scougalrubber.com",
    "contact:address":
      "885 Denmark Drive Suite 103, McCarran, NV 89437-4425, USA",
    "contact:address2": "6239 Corson Ave S, Seattle, WA 98108-3443, USA",
  },
};

export default function Company() {
  return (
    <>
      <CompanyClient />
    </>
  );
}

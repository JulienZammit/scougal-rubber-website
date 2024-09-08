import MainPageClient from './MainPageClient';

export const metadata = {
  title: "America's Leading Custom Molded Rubber Manufacturer | Scougal Rubber",
  description:
    "Scougal Rubber, the premier provider of custom molded rubber solutions for industrial applications since 1916. Explore our high-quality elastomeric bearings, steel fabrication, and custom rubber parts for infrastructure and industrial projects.",
  keywords:
    "custom molded rubber, industrial rubber solutions, elastomeric bearings, rubber manufacturing, steel fabrication, Scougal Rubber, bridge bearings, industrial rubber components, vulcanized rubber, AISC certified rubber, Buy American rubber",
  robots: "index, follow",
  author: "Scougal Rubber Corporation",
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    title:
      "America's Leading Custom Molded Rubber Manufacturer | Scougal Rubber",
    description:
      "Since 1916, Scougal Rubber has provided innovative custom molded rubber solutions for industrial and infrastructure projects. Discover our products including elastomeric bearings, rubber to metal bonding, and precision steel fabrication.",
    type: "website",
    url: "https://scougalrubber.com/",
    images: [
      {
        url: "https://www.scougalrubber.com/images/home-banner.jpg",
        alt: "Scougal Rubber logo",
      },
    ],
  },
  alternates: {
    canonical: "https://scougalrubber.com/",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function Home() {
  
  return (
    <>
      <MainPageClient />
    </>
  );
}

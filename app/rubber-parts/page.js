import RubberPartsClient from "./RubberPartsClient";

export const metadata = {
  title: 'Industrial Rubber Parts - Custom Molded Solutions | Scougal Rubber',
  description: 'Discover Scougal Rubber’s high-quality industrial rubber parts, including custom molded products, rollers, and mandrel-built solutions. With over 100 years of experience, we deliver precision and durability across industries.',
  keywords: 'industrial rubber parts, custom molded rubber, rubber rollers, mandrel-built products, vulcanized rubber to metal, Scougal Rubber, custom rubber solutions, rubber components',
  robots: 'index, follow',
  author: 'Scougal Rubber Corporation',
  openGraph: {
    title: 'Industrial Rubber Parts - Custom Molded Solutions | Scougal Rubber',
    description: "Explore Scougal Rubber's custom rubber parts, from molded products to rollers and mandrel-built solutions, designed for various industries including aerospace, marine, and food processing.",
    url: 'https://www.scougalrubber.com/industrial-rubber-parts',
    type: 'website',
    images: [
      {
        url: 'https://www.scougalrubber.com/images/industrial-rubber-parts-banner.jpg',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.scougalrubber.com/industrial-rubber-parts',
  },
  icons: {
    icon: '/favicon.ico',
  },
  // Métadonnées supplémentaires de contact
  other: {
    'contact:email': 'info@scougalrubber.com',
    'contact:phone_number': '+1 (775) 284-8500',
  },
};

export default function RubberParts() {

  return (
    <>
      <RubberPartsClient />
    </>
  );
}

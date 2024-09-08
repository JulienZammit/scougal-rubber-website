import BearingPadsClient from "./BearingPadsClient";

export const metadata = {
  title: 'High-Quality Bearing Pads - Elastomeric Bearing Solutions | Scougal Rubber',
  description: 'Explore high-quality elastomeric bearing pads from Scougal Rubber, the industry leader in bridge and industrial bearing solutions since 1916. Custom steel-reinforced, laminated, and plain bearing pads to suit all applications. Buy American certified and AISC certified products.',
  keywords: 'elastomeric bearing pads, bearing pads, bridge bearings, laminated bearing pads, plain pads, steel-reinforced pads, AISC certified bearings, custom bearing pads, bridge bearing solutions, industrial bearings, Buy American bearings',
  robots: 'index, follow',
  author: 'Scougal Rubber Corporation',
  openGraph: {
    title: 'High-Quality Bearing Pads - Elastomeric Bearing Solutions | Scougal Rubber',
    description: 'Discover Scougal Rubber’s premium elastomeric bearing pads, providing long-lasting solutions for bridges and industrial applications. Trusted by engineers across North America.',
    url: 'https://www.scougalrubber.com/bearing-pads',
    type: 'website',
    images: [
      {
        url: 'https://www.scougalrubber.com/images/bearing-pads-main.jpg',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.scougalrubber.com/bearing-pads',
  },
  icons: {
    icon: '/favicon.ico',
  },
  other: {
    'contact:phone_number': '+1 (775) 284-8500',
    'contact:email': 'sales@scougalrubber.com',
    'contact:address': '885 Denmark Drive Suite 103, McCarran, NV 89437-4425',
  },
};

export default function BearingPads() {

  return (
    <>
      <BearingPadsClient />
    </>
  );
}

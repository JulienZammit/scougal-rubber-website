import RampsClient from "./RampsClient";

export const metadata = {
  title:
    "Scougal Ramps - Boost Productivity with Efficient Road Plate Management",
  description:
    "Ramp up your productivity with Scougal Ramps. Our reusable, durable road plate management solution reduces cold mix usage, cleans up worksites, and eliminates damage claims. Ideal for efficient, safe workflow.",
  keywords:
    "Scougal Rubber ramps, road plate management, durable ramps, reusable ramps, cold mix reduction, road plate efficiency, eliminate disposal issues, construction ramps, road safety solutions",
  robots: "index, follow",
  author: "Scougal Rubber Corporation",
  openGraph: {
    title:
      "Scougal Ramps - Boost Productivity with Efficient Road Plate Management",
    description:
      "Discover Scougal Ramps, the durable solution for managing road plates efficiently. Save time, reduce waste, and enhance road safety with our easy-to-use ramps.",
    url: "https://www.scougalrubber.com/ramps",
    type: "website",
    images: [
      {
        url: "https://www.scougalrubber.com/images/ramps-banner.jpg",
      },
    ],
  },
  alternates: {
    canonical: "https://www.scougalrubber.com/ramps",
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "contact:email": "info@scougalrubber.com",
    "contact:phone_number": "+1 (775) 284-8500",
  },
};

export default function Ramps() {
  return (
    <>
      <RampsClient />
    </>
  );
}

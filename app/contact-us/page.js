
import ContactUsClient from "./ContactUsClient";

export const metadata = {
  title: "Contact Us - Scougal Rubber | Bearing & Industrial Rubber Solutions",
  description:
    "Get in touch with Scougal Rubber for expert advice on custom rubber molding, polymers, and industrial rubber solutions. Contact our Bearing and Industrial Sales teams for personalized support on your projects.",
  keywords:
    "Scougal Rubber contact, rubber products contact, bearing sales, industrial rubber contact, custom molded rubber, elastomeric bearings, rubber components sales, contact Scougal Rubber",
  robots: "index, follow",
  author: "Scougal Rubber Corporation",
  openGraph: {
    title:
      "Contact Us - Scougal Rubber | Bearing & Industrial Rubber Solutions",
    description:
      "Need expert advice on rubber solutions? Contact Scougal Rubber for personalized support on custom rubber products, bearings, and industrial components.",
    url: "https://www.scougalrubber.com/contact-us",
    type: "website",
    images: [
      {
        url: "https://www.scougalrubber.com/images/contact-banner.jpg",
      },
    ],
  },
  alternates: {
    canonical: "https://www.scougalrubber.com/contact-us",
  },
  icons: {
    icon: "/favicon.ico",
  },
  // Métadonnées supplémentaires de contact
  other: {
    "contact:phone_number": "+1 (775) 284-8500",
    "contact:phone_number2": "+1 (206) 763-2650",
    "contact:email": "sales@scougalrubber.com",
    "contact:email2": "info@scougalrubber.com",
    "contact:address":
      "885 Denmark Drive Suite 103, McCarran, NV 89437-4425, USA",
    "contact:address2": "6239 Corson Ave S, Seattle, WA 98108-3443, USA",
  },
};

export default function ContactUs() {

  return (
    <>
      <ContactUsClient />
    </>
  );
}

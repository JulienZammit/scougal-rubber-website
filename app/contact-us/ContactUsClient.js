"use client";
import HeroAboutContact from "@/components/HeroAboutContact";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

const SalesMap = dynamic(() => import("@/components/SalesMap"), { ssr: false });

const salesTerritories = [
  {
    position: [39.158, -75.5244],
    name: "Delaware",
    rep: "Hans Swartzentruber",
    email: "hans.swartzentruber@scougalrubber.com",
    phone: "775-360-7572",
  },
  {
    position: [27.9944024, -81.7602544],
    name: "Florida",
    rep: "Hans Swartzentruber",
    email: "hans.swartzentruber@scougalrubber.com",
    phone: "775-360-7572",
  },
  {
    position: [32.1656221, -82.9000751],
    name: "Georgia",
    rep: "Hans Swartzentruber",
    email: "hans.swartzentruber@scougalrubber.com",
    phone: "775-360-7572",
  },
  {
    position: [39.0457549, -76.6412712],
    name: "Maryland",
    rep: "Hans Swartzentruber",
    email: "hans.swartzentruber@scougalrubber.com",
    phone: "775-360-7572",
  },
  {
    position: [40.0583238, -74.4056612],
    name: "New Jersey",
    rep: "Hans Swartzentruber",
    email: "hans.swartzentruber@scougalrubber.com",
    phone: "775-360-7572",
  },
  {
    position: [40.7127753, -74.0059728],
    name: "New York",
    rep: "Hans Swartzentruber",
    email: "hans.swartzentruber@scougalrubber.com",
    phone: "775-360-7572",
  },
  {
    position: [35.7595731, -79.0192997],
    name: "North Carolina",
    rep: "Hans Swartzentruber",
    email: "hans.swartzentruber@scougalrubber.com",
    phone: "775-360-7572",
  },
  {
    position: [33.836081, -81.1637245],
    name: "South Carolina",
    rep: "Hans Swartzentruber",
    email: "hans.swartzentruber@scougalrubber.com",
    phone: "775-360-7572",
  },
  {
    position: [37.4315734, -78.6568942],
    name: "Virginia",
    rep: "Hans Swartzentruber",
    email: "hans.swartzentruber@scougalrubber.com",
    phone: "775-360-7572",
  },
  {
    position: [38.9071923, -77.0368707],
    name: "Washington DC",
    rep: "Hans Swartzentruber",
    email: "hans.swartzentruber@scougalrubber.com",
    phone: "775-360-7572",
  },
  {
    position: [38.5976262, -80.4549026],
    name: "West Virginia",
    rep: "Hans Swartzentruber",
    email: "hans.swartzentruber@scougalrubber.com",
    phone: "775-360-7572",
  },
  {
    position: [56.130366, -106.346771],
    name: "Canada",
    rep: "Hans Swartzentruber",
    email: "hans.swartzentruber@scougalrubber.com",
    phone: "775-360-7572",
  },
  {
    position: [32.3182314, -86.902298],
    name: "Alabama",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [61.3707161, -152.404419],
    name: "Alaska",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [34.0489281, -111.0937311],
    name: "Arizona",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [35.20105, -91.8318334],
    name: "Arkansas",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [39.5500507, -105.7820674],
    name: "Colorado",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [19.8967662, -155.5827818],
    name: "Hawaii",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [44.0682019, -114.7420408],
    name: "Idaho",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [39.011902, -98.4842465],
    name: "Kansas",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [37.8393332, -84.2700179],
    name: "Kentucky",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [30.9842977, -91.9623327],
    name: "Louisiana",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [32.3546679, -89.3985283],
    name: "Mississippi",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [37.9642529, -91.8318334],
    name: "Missouri",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [46.8796822, -110.3625658],
    name: "Montana",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [34.5199402, -105.8700901],
    name: "New Mexico",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [35.0077519, -97.092877],
    name: "Oklahoma",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [43.8041334, -120.5542012],
    name: "Oregon",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [36.1626638, -86.7816016],
    name: "Tennessee",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [31.9685988, -99.9018131],
    name: "Texas",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [39.3209801, -111.0937311],
    name: "Utah",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [47.7510741, -120.7401386],
    name: "Washington",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [43.0759678, -107.2902839],
    name: "Wyoming",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [36.778261, -119.4179324],
    name: "California",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [41.6032207, -73.087749],
    name: "Connecticut",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [40.633125, -89.3985283],
    name: "Illinois",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [40.2671941, -86.1349021],
    name: "Indiana",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [41.8780025, -93.097702],
    name: "Iowa",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [45.253783, -69.4454689],
    name: "Maine",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [42.4072107, -71.3824374],
    name: "Massachusetts",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [44.3148443, -85.6023643],
    name: "Michigan",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [46.729553, -94.6858998],
    name: "Minnesota",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [41.4925374, -99.9018131],
    name: "Nebraska",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [38.8026097, -116.419389],
    name: "Nevada",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [43.1938516, -71.5723953],
    name: "New Hampshire",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [47.5514926, -101.0020119],
    name: "North Dakota",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [40.4172871, -82.907123],
    name: "Ohio",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [41.2033216, -77.1945247],
    name: "Pennsylvania",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [41.5800945, -71.4774291],
    name: "Rhode Island",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [43.9695148, -99.9018131],
    name: "South Dakota",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [44.5588028, -72.5778415],
    name: "Vermont",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [43.7844397, -88.7878678],
    name: "Wisconsin",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
];

export default function ContactUsClient() {
  const contacts = [
    {
      title: "Bearing Sales",
      address: "885 Denmark Drive, Suite 103, McCarran, NV, 89437-4425",
      email: "sales@scougalrubber.com",
      phone: "(775) 284-8500",
      image: "/contact/Banner1.webp",
    },
    {
      title: "Industrial Sales",
      address: "6239 Corson Ave S, Seattle, WA, 98108-3443",
      email: "sales@scougalrubber.com",
      phone: "(206) 763-2650",
      image: "/contact/Banner2.webp",
    },
    {
      title: "General Information",
      email: "info@scougalrubber.com",
      image: "/contact/Banner3.webp",
    },
  ];

  const socialLinks = {
    linkedin: "https://www.linkedin.com/company/scougal-rubber-corporation", // Remplacez par votre URL LinkedIn
    facebook: "https://www.facebook.com/scougalrubbercorp/"
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <HeroAboutContact
        backgroundImage="/banner2/Banner1.webp"
        title="Contact Us"
        subtitle="Expert advice on molding, polymers, inventory, and time-sensitive projects"
      />

      <div className="md:p-20 px-4 py-10 flex flex-col items-center justify-center w-full space-y-12">
        {/* Section Carte des ventes */}
        <div className="w-full max-w-6xl">
          <h2 className="text-4xl font-bold mb-10 text-gray-800 text-center">
            Our Sales Map
          </h2>
          <p
            className="text-lg text-gray-600 mb-12 text-center"
            style={{ textAlign: "justify" }}
          >
            This map shows the sales territories covered by our dedicated team
            across the United States and Canada. Click on a marker to see the
            details of the sales representative for each region.
          </p>
          <div className="w-full h-[500px] rounded-[5px] border-4 border-white shadow-lg mb-12">
            <SalesMap salesTerritories={salesTerritories} />
          </div>
        </div>

        {/* Section Contacts */}
        <div className="flex flex-col items-center justify-center max-w-7xl w-full p-8 mb-12 space-y-12">
          <h2 className="text-4xl font-bold mb-10 text-gray-800 text-center">
            Our Contacts
          </h2>
          {/* Liens vers les réseaux sociaux */}
          <div className="flex items-center justify-center space-x-6 mb-12">
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75 transition-opacity"
            >
              <FaLinkedin size={40} />
            </a>
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75 transition-opacity"
            >
              <FaFacebook size={40} />
            </a>
          </div>
          {contacts.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -25 : 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.2 * index,
                duration: 0.5,
                ease: "easeInOut",
              }}
              className={`flex flex-col md:flex-row items-center justify-between w-full gap-8 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full md:w-1/2 p-4">
                <Image
                  src={contact.image}
                  alt={`${contact.title} image`}
                  width={400}
                  height={300}
                  loading="lazy"
                  className="rounded-[5px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 p-4 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-4">{contact.title}</h2>
                {contact.address && (
                  <address className="not-italic mb-4">
                    {contact.address.split(", ").map((line, idx) => (
                      <div key={idx}>{line}</div>
                    ))}
                  </address>
                )}
                <p>
                  Email:{" "}
                  <a href={`mailto:${contact.email}`} className="text-blue-500">
                    {contact.email}
                  </a>
                </p>
                {contact.phone && (
                  <p>
                    Phone:{" "}
                    <a href={`tel:${contact.phone}`} className="text-blue-500">
                      {contact.phone}
                    </a>
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

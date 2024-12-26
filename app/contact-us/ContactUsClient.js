"use client";
import HeroAboutContact from "@/components/HeroAboutContact";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

const SalesMap = dynamic(() => import("@/components/SalesMap"), { ssr: false });

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
    linkedin: "https://www.linkedin.com/company/scougal-rubber-corporation",
    facebook: "https://www.facebook.com/scougalrubbercorp/",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <HeroAboutContact
        backgroundImage="/banner2/Banner1.webp"
        title="Contact Us"
        subtitle="Expert advice on molding, polymers, inventory, and time-sensitive projects"
      />

      <div className="md:px-20 px-4 py-10 flex flex-col items-center justify-center w-full space-y-12">
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
            <SalesMap salesTerritories={[]} />
          </div>
        </div>

        {/* Section Contacts */}
        <div className="flex flex-col items-center justify-center max-w-7xl w-full px-8 mb-12 space-y-12">
          <h2 className="text-4xl font-bold mb-10 text-gray-800 text-center">
            Our Contacts
          </h2>
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
              className={`flex flex-col md:flex-row items-center justify-between w-full gap-8 md:px-12 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full md:w-1/2">
                <Image
                  src={contact.image}
                  alt={`${contact.title} image`}
                  width={600}
                  height={400}
                  className="rounded-[5px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-4">{contact.title}</h2>
                {contact.address && (
                  <address className="not-italic mb-4">
                    {contact.address.split(", ").map((line, idx) => (
                      <div key={idx}>{line}</div>
                    ))}
                  </address>
                )}
                <p>
                  Email: {" "}
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-blue-500"
                  >
                    {contact.email}
                  </a>
                </p>
                {contact.phone && (
                  <p>
                    Phone: {" "}
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-blue-500"
                    >
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

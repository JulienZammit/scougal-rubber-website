"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import HeroAboutContact from "@/components/HeroAboutContact";

export default function ContactUs() {
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen md:p-20 p-5 overflow-hidden mt-12">
      <div className="relative w-full flex flex-col overflow-hidden rounded-md mb-12">
        <HeroAboutContact
          backgroundImage="/about/banner1.webp"
          title="Contact Us"
          subtitle="We are here to help you with your project"
        />
      </div>

      <div className="max-w-4xl w-full p-8 mb-12 text-center">
        <p className="text-lg mb-8">
          We can offer suggestions regarding molding and polymer selection, inventory programs to support your just-in-time manufacturing requirements, and our team of experienced professionals is ready to assist you with time sensitive projects, competitive pricing, and superior quality.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center w-9/12 p-8 mb-12 space-y-12">
        {contacts.map((contact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -25 : 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.2 * index,
              duration: 0.8,
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
                className="rounded-md object-cover"
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
  );
}

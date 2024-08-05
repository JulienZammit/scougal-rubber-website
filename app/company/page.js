"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import HeroAboutContact from "@/components/HeroAboutContact";

export default function Company() {
  const maps = [
    {
      address: "885 Denmark Dr, Sparks, NV 89437, États-Unis",
      src: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d50407853.19421591!2d-119.47069200000001!3d39.544922!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80991f7dd081d623%3A0x43cfac11d31dd352!2s885%20Denmark%20Dr%2C%20Sparks%2C%20NV%2089437%2C%20USA!5e0!3m2!1sen!2sin!4v1722606885297!5m2!1sen!2sin",
    },
    {
      address: "Scougal Rubber Corporation, Seattle, WA",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2693.108778776251!2d-122.32467478759615!3d47.546211571064184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54904194b04fdfe7%3A0x22b51f970886d70e!2sScougal%20Rubber%20Corporation!5e0!3m2!1sen!2sin!4v1722606782388!5m2!1sen!2sin",
    },
  ];

  const aboutCompanyText = [
    "At SRC, our mission is to continue as the leading provider of innovative and reliable rubber products tailored specifically for industrial projects and critical infrastructure on a global scale. With a commitment to excellence, safety, and sustainability, we specialize in the precision manufacturing of bridge bearings and a comprehensive array of high-performance rubber components that enhance the longevity, resilience, and performance of complex industrial and infrastructure systems.",
    "Driven by our dedication to engineering excellence and a passion for quality, we strive to exceed customer expectations by delivering products that withstand the test of time and environmental challenges. Our highly skilled team of professionals, state-of-the-art technologies, and a culture of continuous improvement enable us to consistently meet the evolving needs of our clients.",
    "We are committed to contributing positively to the communities we serve by ensuring the safety and reliability of the projects that our products support. With a history of pride in excellence coupled with a strong vision for the future, SRC is a leader in the world of rubber fabrication.",
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen md:p-20 p-5 mt-12">
      <div className="relative w-full flex flex-col overflow-hidden rounded-md mb-12">
      <HeroAboutContact
          backgroundImage="/about/banner1.webp"
          title="Our Company"
          subtitle="America's Custom Molded Rubber Company Since 1916"
        />
      </div>
      <div className="max-w-4xl w-full p-8 mb-12">
        <div className="flex flex-col gap-8">
          {aboutCompanyText.map((paragraph, index) => (
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
                  src={`/about/Banner${index + 1}.webp`}
                  alt={`About image ${index + 1}`}
                  width={400}
                  height={300}
                  className="rounded-md"
                />
              </div>
              <div className="w-full md:w-1/2 p-4 text-center md:text-left">
                <p className="text-lg">{paragraph}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full p-8 mb-12">
        <h2 className="text-4xl font-bold mb-20">Our Locations</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {maps.map((map, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.6 + index * 0.1,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="w-full rounded-lg border-4 border-white shadow-lg overflow-hidden relative"
            >
              <iframe
                src={map.src}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  delay: 0.9,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="absolute bottom-0 w-full text-center bg-white bg-opacity-75 py-2 pointer-events-none"
              >
                <p className="font-bold">{map.address}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

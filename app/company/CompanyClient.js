"use client";
import HeroAboutContact from "@/components/HeroAboutContact";
import { motion } from "framer-motion";
import {
  Award,
  Building,
  Calendar,
  Globe,
  Users
} from "lucide-react";
import Image from "next/image";

const companyHighlights = [
  {
    icon: Building,
    title: "Advanced Manufacturing",
    description: "Cutting-edge facilities in Seattle and Reno designed for precision and efficiency.",
  },
  {
    icon: Users,
    title: "Industry Expertise",
    description: "A team of dedicated professionals with over a century of combined experience in rubber engineering.",
  },
  {
    icon: Globe,
    title: "North American Leader",
    description: "Supporting infrastructure and industrial projects across the U.S. and Canada with tailored solutions.",
  },
  {
    icon: Award,
    title: "Uncompromising Quality",
    description: "AISC-certified processes and rigorous testing standards for reliable, durable products.",
  },
];

const timelineEvents = [
  {
    year: "1916",
    title: "Foundation",
    description: "Scougal Rubber Company established, marking the beginning of a legacy in rubber manufacturing.",
  },
  {
    year: "1992",
    title: "Expansion",
    description: "Significant growth in production capacity, modernizing facilities to meet increasing demand.",
  },
  {
    year: "2010",
    title: "New Facility",
    description: "Launch of the state-of-the-art manufacturing plant in McCarran, NV, tailored for bridge bearing production.",
  },
  {
    year: "2024",
    title: "Innovation",
    description: "Integration of advanced manufacturing technologies to enhance precision and efficiency.",
  },
];


export default function CompanyClient() {
  const maps = [
    {
      address: "885 Denmark Dr, Sparks, NV 89437, États-Unis",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d769.1635496100836!2d-119.47181328921722!3d39.5448542779333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80993f2f92c5ec87%3A0xfc1547a496c0a744!2sScougal%20Rubber!5e0!3m2!1sen!2snl!4v1724346679762!5m2!1sen!2snl",
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <HeroAboutContact
        backgroundImage="/about/banner1.webp"
        title="Our Company"
        subtitle="America's Custom Molded Rubber Company Since 1916"
      />

      {/* Company Highlights Section */}
      <section className="w-full py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow bg-white"
              >
                <highlight.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {highlight.title}
                </h3>
                <p className="text-gray-600">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Company Section with Existing Content */}
      <div className="w-full py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-16">
            {aboutCompanyText.map((paragraph, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -25 : 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.8 }}
                className={`flex flex-col md:flex-row items-center justify-between gap-12 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full md:w-1/2">
                  <Image
                    src={`/about/Banner${index + 1}.webp`}
                    alt={`About image ${index + 1}`}
                    width={800}
                    height={600}
                    className="rounded-lg shadow-lg w-full h-auto"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <p
                    className="text-lg text-gray-700"
                    style={{ textAlign: "justify" }}
                  >
                    {paragraph}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Timeline Section */}
      <section className="w-full py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            <div className="space-y-16">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  } relative`}
                >
                  <div className="w-1/2 flex items-center">
                    <div
                      className={`bg-white p-8 rounded-lg shadow-lg ${
                        index % 2 === 0 ? "mr-8" : "ml-8"
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-blue-600 font-bold">
                          {event.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LinkedIn Feed Section */}
      <section className="w-full py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Latest Updates on LinkedIn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg shadow-lg p-6 bg-white">
              <iframe
                src="https://www.linkedin.com/posts/scougal-rubber-corporation_to-meet-evolving-customer-demands-we-have-activity-7270186472748531713--e20?utm_source=share&utm_medium=member_desktop"
                height="600"
                width="100%"
                frameBorder="0"
                allowFullScreen=""
                title="Embedded LinkedIn Post 1"
                className="rounded-lg"
              ></iframe>
            </div>
            <div className="rounded-lg shadow-lg p-6 bg-white">
              <iframe
                src="https://www.linkedin.com/posts/scougal-rubber-corporation_another-post-example-url-here"
                height="600"
                width="100%"
                frameBorder="0"
                allowFullScreen=""
                title="Embedded LinkedIn Post 2"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <div className="w-full py-16">
        <h2 className="text-4xl font-bold text-center mb-16">Our Locations</h2>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {maps.map((map, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                className="w-full h-[400px] rounded-lg shadow-lg overflow-hidden relative"
              >
                <iframe
                  src={map.src}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="absolute bottom-0 w-full text-center bg-white bg-opacity-90 py-3"
                >
                  <p className="font-bold text-gray-800">{map.address}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

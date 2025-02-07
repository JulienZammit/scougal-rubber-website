"use client";
import React from "react";
import { motion } from "framer-motion";
import HeroAboutContact from "@/components/HeroAboutContact";
import {
  CheckCircle,
  Users,
  Trophy,
  Target,
  ArrowRight,
  Building,
  Briefcase,
  Linkedin,
} from "lucide-react";
import Image from "next/image";

const companyStats = [
  { number: "100+", label: "Years of Expertise", icon: Trophy },
  { number: "200+", label: "Projects Delivered Annually", icon: Target },
  { number: "24/7", label: "Continuous Production", icon: CheckCircle },
  { number: "50+", label: "Regular Clients Across North America", icon: Users },
];

const companyValues = [
  {
    title: "Innovation",
    description:
      "Redefining manufacturing standards with customized rubber solutions.",
    icon: Building,
  },
  {
    title: "Quality",
    description:
      "Upholding rigorous AISC-certified standards to ensure exceptional products.",
    icon: Trophy,
  },
  {
    title: "Responsiveness",
    description:
      "Meeting tight deadlines with a commitment to agility and reliability.",
    icon: Users,
  },
  {
    title: "Integrity",
    description:
      "Operating with transparency and ethical practices in every project.",
    icon: Briefcase,
  },
];

const teamMembers = [
  {
    name: "Rob Anderson",
    position: "President",
    description: `Rob joined Scougal in 1992 and has contributed to every aspect of the company. His expertise in steel-reinforced elastomeric bearings has made him a respected figure in the bridge bearing industry.`,
    image: "/employees/ra.jpg",
    expertise: [
      "Strategic Leadership",
      "Innovation in Engineering",
      "Operational Excellence",
    ],
    linkedin: "https://www.linkedin.com/in/rob-anderson-158aaa17a/",
  },
  {
    name: "Scott Nelson",
    position: "Vice President Sales & Marketing",
    description: `Since 2006, Scott has played a vital role in overseeing sales and marketing, as well as guiding Scougal’s transition to a state-of-the-art facility in Nevada.`,
    image: "/employees/sn.jpg",
    expertise: ["Sales Strategy", "Market Expansion", "Client Relations"],
    linkedin: "https://www.linkedin.com/in/scott-nelson-5a573b94/",
  },
  {
    name: "Ahsan Ativalu",
    position: "Plant Manager - Reno",
    description: `Starting in 1999, Ahsan has been instrumental in Scougal's manufacturing advancements and the relocation of critical equipment to the Reno facility.`,
    image: "/employees/aa.jpg",
    expertise: [
      "Production Management",
      "Process Optimization",
      "Team Development",
    ],
    linkedin: "https://www.linkedin.com/in/ahsan-ativalu-28a529122/",
  },
  {
    name: "Brad Streeter",
    position: "Quality Manager",
    description: `Brad oversees quality assurance, ensuring compliance with rigorous AISC standards and implementing continuous improvement initiatives.`,
    image: "/employees/bs.jpg",
    expertise: [
      "Quality Control",
      "Process Improvement",
      "Certification Management",
    ],
    linkedin: "https://www.linkedin.com/in/brad-streeter-560193153/",
  },
];

const ExperienceClient = () => {
  return (
    <div className="flex flex-col items-center overflow-hidden">
      <HeroAboutContact
        backgroundImage="/banner1/Banner5.webp"
        title="Our Experience"
        subtitle="Excellence Through Innovation"
      />

      {/* Mission Statement Section */}
      <section className="w-full py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Leading the Industry Since 1992
            </h2>
            <p className="text-lg text-gray-600">
              We specialize in innovative rubber manufacturing solutions,
              combining decades of expertise with cutting-edge technology to
              deliver exceptional products and services to our clients
              worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <stat.icon className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600 text-center">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                <value.icon className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="w-full py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-800">
            Our Leadership Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="aspect-w-3 aspect-h-3 md:aspect-h-4 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 md:p-6 flex-grow flex flex-col">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1 md:mb-2">
                      {member.name}
                    </h3>
                    <p className="text-blue-500 text-sm md:text-base mb-2 md:mb-4">
                      {member.position}
                    </p>
                    <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 line-clamp-3 md:line-clamp-none">
                      {member.description}
                    </p>
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {member.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="inline-block px-2 md:px-3 py-0.5 md:py-1 bg-blue-50 text-blue-500 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 md:mt-auto pt-2 md:pt-4 flex items-center justify-center text-blue-500 hover:text-blue-800 transition-colors group"
                  >
                    <span className="flex items-center text-sm md:text-base">
                      <Linkedin className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                      View Profile
                    </span>
                    <ArrowRight className="ml-1 md:ml-2 w-3 h-3 md:w-4 md:h-4 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExperienceClient;

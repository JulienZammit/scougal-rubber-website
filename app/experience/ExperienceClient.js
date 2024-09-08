"use client";
import React from "react";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import HeroAboutContact from "@/components/HeroAboutContact";

const teamMembers = [
  {
    name: "Rob Anderson",
    position: "President",
    description: `After stints with Boeing and a commercial window manufacturer, Rob came to Scougal in 1992 and has played a role in virtually every facet of the company. He has managed growth in production, operations, and sales. Rob is currently running both the Seattle and Reno operations. His expertise in steel reinforced elastomeric bearings has earned him a noteworthy voice in the bridge bearing community. He has served as a liaison between regulatory and academic entities regarding bearing design and testing standards. Rob has a passion for empowering people to be successful through teamwork and leadership.`,
    image: "/employees/ra.jpg",
  },
  {
    name: "Scott Nelson",
    position: "Vice President Sales & Marketing",
    description: `Scott joined the Sales/Estimating Team in 2006 after graduating from University of Washington with a B.A. in Political Science. He played an instrumental role in moving Scougal Rubber to the new plant in McCarran, NV in 2011, and was responsible for the training and oversight of the estimating team at the new location. Scott was promoted to the position of Sales Manager in 2014, and completed his MBA at University of Nevada in 2016.`,
    image: "/employees/sn.jpg",
  },
  {
    name: "Alfredo Shanklin",
    position: "Plant Manager - Seattle",
    description: `Al has worked at Scougal for over 16 years, starting in Quality Control, but quickly finding his specialty in Production. Each year that Al has been with Scougal, he has been instrumental in keeping the company competitive in the rubber manufacturing world. Outside of work, Al enjoys spending time with his grandchildren, showing them the joys of bird watching. The one thing on his bucket list is to see every species of bird in Washington state.`,
    image: "/employees/as.jpg",
  },
  {
    name: "Ahsan Ativalu",
    position: "Plant Manager - Reno",
    description: `Ahsan started with Scougal Rubber in 1999.  He quickly established himself as a hard worker with a great mind for tackling challenging fabrication issues.  He was promoted to shift supervisor in 2006, and was instrumental in helping to plan and implement the relocation of several critical pieces of equipment to McCarran, NV in 2010 with the opening of the new plant.  During that time Ahsan was promoted to Production Manager, and finally Plant Manager.  He continues to be a vital part of the Scougal Rubber Team.  Ahsan is an avid football fan, and rarely leaves home without wearing the Seahawks emblem.`,
    image: "/employees/aa.jpg",
  },
  {
    name: "Brad Streeter",
    position: "Quality Manager",
    description: `Brad oversees the quality function for the company and brings a wealth of experience and training to the position. He was responsible for implementing formal quality management and continuous improvement programs across the country for over 30 years and is a part the Scougal Rubber success by initiating, developing, and maintaining certifications for AISC at the Nevada site and AS9100 at the Washington site. His love for classic automobiles includes the occasional drive through the desert in his 1968 Pontiac GTO and enjoys the NFL but is a Patriots fan.`,
    image: "/employees/bs.jpg",
  },
];

export default function ExperienceClient() {
  return (
    <div className="flex flex-col items-center overflow-hidden justify-center min-h-screen">
      <HeroAboutContact
        backgroundImage="/banner1/banner5.webp"
        title="Our Experience"
        subtitle="Discover our team of experts"
      />
      <div className="md:p-20 p-5">
        <div className="w-full max-w-6xl px-4">
          <h2 className="text-4xl font-bold mb-10 text-gray-800 text-center">
            Meet Our Team
          </h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.1 * index,
                duration: 0.5,
                ease: "easeInOut",
              }}
              className="p-4 flex flex-col items-center text-center"
            >
              <div className="w-52 h-80 rounded-[5px] overflow-hidden shadow-lg mb-4 border-2 border-gray-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                {member.name}
              </h3>
              <p className="text-gray-600 mb-4">{member.position}</p>
              <p className="text-gray-600" style={{ textAlign: "justify" }}>
                {member.description}
              </p>
            </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

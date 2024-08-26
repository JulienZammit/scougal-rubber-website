"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import HeroAboutContact from "@/components/HeroAboutContact";
import ApplyOnlineForm from "@/components/ApplicationForm";

export default function Employment() {
  const employmentDetails = [
    {
      text: "Scougal’s strength lies in its employees. If you are looking for a place to work where you can make a difference, be treated with respect and take pride in your success, consider Scougal where we are changing the world for the better, one bridge at a time.",
      image: "/employment/Banner1.webp",
    },
    {
      text: `The Transparency in Coverage Final Rules require certain group health plans to disclose on a public website information regarding in-network allowed amounts and billed charges for covered items and services in two separate machine-readable files (MRFs). Please click <a href="https://transparency-in-coverage.uhc.com/" target="_blank" class="text-blue-500 underline">HERE</a> to view the benefits package under our Group Health Plan.`,
      image: "/employment/Banner2.webp",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <HeroAboutContact
        backgroundImage="/banner1/banner9.webp"
        title="Employment"
        subtitle="Join our team and make a difference"
      />
      <div className="md:p-15 p-5">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <ApplyOnlineForm />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="my-12 p-8 bg-gradient-to-r bg-blue-500 text-white rounded-[5px] shadow-lg text-center text-2xl font-bold"
        >
          Scougal Rubber is an Equal Opportunity Employer and Welcomes Your
          Inquiry.
        </motion.div>
        <div className="max-w-4xl w-full p-8 mb-12">
          <div className="flex flex-col gap-8">
            {employmentDetails.map((detail, index) => (
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
                    src={detail.image}
                    alt={`Employment image ${index + 1}`}
                    width={400}
                    height={300}
                    className="rounded-[5px]"
                  />
                </div>
                <div
                  className="w-full md:w-1/2 p-4 text-center md:text-left"
                  style={{ textAlign: "justify" }}
                  dangerouslySetInnerHTML={{ __html: detail.text }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="max-w-4xl w-full p-8 text-black"
          style={{ textAlign: "justify" }}
        >
          <p className="bg-red-500 text-white p-2 rounded-[5px] mb-4 font-bold">
            Please note that Scougal is a drug-free workplace. All positions
            require a pre-employment drug test.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

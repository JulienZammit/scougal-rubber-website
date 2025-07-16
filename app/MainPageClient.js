"use client";
import Head from "next/head";
import Hero from "../components/Hero";
import { ImagesSlider } from "../components/ui/images-slider";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import CallToAction from "@/components/CallToAction";
import FaqSection from "@/components/FaqSection";

const text1_words1 = `In 2010, Scougal Rubber opened a new facility in McCarran, NV just outside of Reno dedicated to the production and testing of steel reinforced and plain elastomeric bearings for bridges and buildings.`;
const text1_words2 = `Starting with an empty slate, we were able to design and build a first-class, modern facility to fit our growing needs. With round-the-clock production, we are producing bearing pads to meet our customers' needs throughout North America, allowing us to offer the best lead times in the industry.`;
const text1_words3 = `Our quality assurance lab has the capability of testing for all the requirements of most specifications.`;
const text1_words4 = `Scougal Rubber is an AISC certified Simple Bridge and Bridge Component manufacturer.`;

const text2_words1 = `Scougal Rubber's Industrial Parts can be found everywhere from playground equipment, ski lifts and food processing plants to U.S. Military Vehicles.`;
const text2_words2 = `Whether you need ten parts or ten thousand, our team of experienced professionals is ready to assist you. In addition, we offer inventory programs to support your just-in-time manufacturing requirements.`;
const text2_words3 = `We take pride in our competitive pricing, quality, and agile response time. Scougal will work quickly to satisfy your demands.`;
const text2_words4 = `Scougal Rubber maintains a strict quality assurance program in order to exceed your expectations with the adaptation of ISO 9001:2015 and AS9100.`;

const images1 = [
  "/banner1/Banner1.webp",
  "/banner1/Banner2.webp",
  "/banner1/Banner3.webp",
  "/banner1/Banner4.webp",
  "/banner1/Banner5.webp",
  "/banner1/Banner6.webp",
  "/banner1/Banner7.webp",
  "/banner1/Banner8.webp",
  "/banner1/Banner9.webp",
  "/banner1/Banner10.webp",
  "/banner1/Banner11.webp",
  "/banner1/Banner12.webp",
];

const images2 = [
  "/banner2/Banner1.webp",
  "/banner2/Banner2.webp",
  "/banner2/Banner3.webp",
  "/banner2/Banner4.webp",
  "/banner2/Banner5.webp",
  "/banner2/Banner6.webp",
  "/banner2/Banner7.webp",
  "/banner2/Banner8.webp",
];

const faqs = [
  {
    id: 1,
    question: "What are the lead times for your products?",
    answer: "Lead times depend on product type and order volume, but our integrated production model enables efficient scheduling. Standard elastomeric bearings and stock components typically ship within 4 to 8 weeks. Specialized civil and military-grade components—fabricated in Seattle—or large-scale bridge bearings—manufactured in Reno—may require additional fabrication time. With in-house steel machining and fabrication, we reduce external dependencies and keep your project moving forward.",
  },
  {
    id: 2,
    question: "What are your quality assurance standards?",
    answer: "Scougal Rubber's quality system is built around precision, compliance, and accountability. Across both sites, we proudly meet or exceed standards set by AS9100, ISO9001, AISC, AASHTO, NT-PEP, and various DOT agencies such as Bulletin15, across the US, with government procurement requirements—including CAGE code qualification for federal contracts. From elastomer molding to precision steel fabrication, our QA teams in both Reno and Seattle conduct strict dimensional, performance, and material inspections at every step. Whether your project involves seismic isolation, aerospace-grade components, or military applications, quality is never optional.",
  },
  {
    id: 3,
    question: "What are your production capabilities?",
    answer: "Our Reno facility specializes in the production of structural bridge bearings, and elastomeric systems used throughout North America. Meanwhile, our Seattle operation focuses on advanced rubber molding, specialty solutions for civil infrastructure, and government and aerospace projects requiring tight tolerances and full compliance documentation. With newly added steel plate machining and fabrication, we now deliver complete assembly solutions tailored for next-generation bridge construction and advanced industrial needs. Scougal Rubber's products are also found in diverse industries including automotive, marine, aerospace, food processing, and military applications. Our ability to meet highly specialized requirements positions us as a trusted partner across sectors demanding performance, durability, and regulatory compliance.",
  },
  {
    id: 5,
    question: "Expert Assistance and Material Selection",
    answer: "Scougal Rubber's team brings decades of experience in steel fabrication, rubber molding techniques, and structural integration. Whether you're selecting elastomers for seismic isolation or rubber-metal bonds for aerospace assemblies, we help you choose the right materials and manufacturing approach for maximum performance, lifecycle efficiency, and compliance with all relevant standards.",
  },
];

export default function MainPageClient() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="min-h-screen">
      <Head>
        <title>America's Custom Molded Rubber Company</title>
        <meta
          name="description"
          content="Leading provider of custom molded rubber solutions since 1916. Discover our products and services."
        />
        <meta
          name="keywords"
          content="custom molded, rubber company, industrial rubber, rubber manufacturing"
        />
        <meta
          property="og:title"
          content="America's Custom Molded Rubber Company"
        />
        <meta
          property="og:description"
          content="Leading provider of custom molded rubber solutions since 1916. Discover our products and services."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.scougalrubber.com/" />
        <meta
          property="og:image"
          content="https://www.scougalrubber.com/logo-animated.webm"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />

      <div className="flex flex-col md:p-20 p-4 gap-4">
        <motion.div
          data-aos="fade-up"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg md:text-2xl text-black space-y-6"
          style={{ textAlign: 'justify' }}
        >
          <p>{text1_words1}</p>
          <p>{text1_words2}</p>
          <p>{text1_words3}</p>
          <p>{text1_words4}</p>
        </motion.div>
      </div>

      <div className="p-0 md:p-10">
        <ImagesSlider
          className="h-[40rem] rounded-lg overflow-hidden"
          images={images1}
        >
          <motion.div
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="z-50 flex flex-col justify-center items-center p-5"
          >
            <motion.h2 className="font-bold text-3xl md:text-6xl text-center text-white mb-4">
              Rubber Pads & Bearings
            </motion.h2>
            <div className="text-center space-y-2 mb-6">
              <p className="text-lg text-white font-medium">
                885 Denmark Drive, Suite 103, McCarran, NV, 89437-4425
              </p>
              <p className="text-lg text-white font-medium">
                Email:{" "}
                <a
                  href="mailto:sales@scougalrubber.com"
                  className="text-blue-400 transition-colors hover:text-blue-300"
                >
                  sales@scougalrubber.com
                </a>
                {" "}| Phone: (775) 284-8500
              </p>
            </div>
            <Link href="/bearing-pads">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-4 py-2 rounded-lg bg-blue-500 text-white transition-colors hover:bg-blue-500"
              >
                <span className="relative z-10">Explore Our Products</span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </Link>
          </motion.div>
        </ImagesSlider>
      </div>

      <div className="flex flex-col md:p-20 p-4 gap-4">
        <motion.div
          data-aos="fade-up"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg md:text-2xl text-black space-y-6"
          style={{ textAlign: 'justify' }}
        >
          <p>{text2_words1}</p>
          <p>{text2_words2}</p>
          <p>{text2_words3}</p>
          <p>{text2_words4}</p>
        </motion.div>
      </div>

      <div className="p-0 md:p-10">
        <ImagesSlider
          className="h-[40rem] rounded-lg overflow-hidden"
          images={images2}
        >
          <motion.div
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="z-50 flex flex-col justify-center items-center p-5"
          >
            <motion.h2 className="font-bold text-3xl md:text-6xl text-center text-white mb-4">
              Industrial Products
            </motion.h2>
            <div className="text-center space-y-2 mb-6">
              <p className="text-lg text-white font-medium">
                6239 Corson Ave S Seattle, WA, 98108-3443
              </p>
              <p className="text-lg text-white font-medium">
                Email:{" "}
                <a
                  href="mailto:sales@scougalrubber.com"
                  className="text-blue-400 transition-colors hover:text-blue-300"
                >
                  sales@scougalrubber.com
                </a>
                {" "}| Phone: (206) 763-2650
              </p>
            </div>
            <Link href="/rubber-parts" scroll={false}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-4 py-2 rounded-lg bg-blue-500 text-white transition-colors hover:bg-blue-500"
              >
                <span className="relative z-10">Explore Industrial Products</span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </Link>
          </motion.div>
        </ImagesSlider>
      </div>

      <div className="p-10 md:mb-0 mb-32">
        <CallToAction />
      </div>

      <div className="p-10">
        <FaqSection faqs={faqs} />
      </div>
    </div>
  );
}
"use client";
import Head from "next/head";
import Hero from "../components/Hero";
import { ImagesSlider } from "../components/ui/images-slider";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { ImprovedModal, ModalButton, NavigationLink } from "../components/ui/modal-components";
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
    answer: "Scougal Rubber is committed to providing the fastest lead times in the industry. No matter the size or scope of your project, we have the expertise to deliver exceptional results. Our dedicated outreach program ensures that our customer service team responds to every inquiry within 24 hours, demonstrating our commitment to your satisfaction.",
  },
  {
    id: 2,
    question: "What are your quality assurance standards?",
    answer: "Scougal Rubber maintains a strict quality assurance program in order to exceed your expectations with the adaptation of ISO 9001:2015 and AS9100.",
  },
  {
    id: 3,
    question: "What are your production capabilities?",
    answer: "Scougal Rubber has the capability to produce and test steel reinforced and plain elastomeric bearings for bridges and buildings.",
  },
  {
    id: 4,
    question: "Do you offer inventory programs?",
    answer: "Yes, Scougal Rubber offers inventory programs to support your just-in-time manufacturing requirements.",
  },
];

export default function MainPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <ModalButton onClick={() => setIsModalOpen(true)}>
              Explore Our Products
            </ModalButton>
          </motion.div>
        </ImagesSlider>
      </div>

      <ImprovedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">
            Rubber Pads & Bearings
          </h3>
          <p className="text-gray-600">
            Explore our high-quality rubber solutions tailored for various industrial applications.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <NavigationLink href="/rubber-parts">
              Rubber Pads
            </NavigationLink>
            <NavigationLink href="/bearing-pads">
              Bearings
            </NavigationLink>
          </div>
        </div>
      </ImprovedModal>

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
              <ModalButton>
                Explore Industrial Products
              </ModalButton>
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
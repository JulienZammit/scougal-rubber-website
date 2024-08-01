"use client";
import Head from "next/head";
import Hero from "../components/Hero";
import { ImagesSlider } from "../components/ui/images-slider";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../components/ui/animated-modal";
import CallToAction from "@/components/CallToAction";
import FaqSection from "@/components/FaqSection";

const text1_words1 = `In 2010, Scougal Rubber opened a new facility in McCarran, NV just outside of Reno dedicated to the production and testing of steel reinforced and plain elastomeric bearings for bridges and buildings.`;
const text1_words2 = `Starting with an empty slate, we were able to design and build a first-class, modern facility to fit our growing needs. With round-the-clock production, we are producing bearing pads to meet our customers’ needs throughout North America, allowing us to offer the best lead times in the industry.`;
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
    answer:
      "Scougal Rubber has the best lead times in the industry. We are able to produce and ship most orders within 24 hours.",
    href: "#",
  },
  {
    id: 2,
    question: "What are your quality assurance standards?",
    answer:
      "Scougal Rubber maintains a strict quality assurance program in order to exceed your expectations with the adaptation of ISO 9001:2015 and AS9100.",
    href: "#",
  },
  {
    id: 3,
    question: "What are your production capabilities?",
    answer:
      "Scougal Rubber has the capability to produce and test steel reinforced and plain elastomeric bearings for bridges and buildings.",
    href: "#",
  },
  {
    id: 4,
    question: "Do you offer inventory programs?",
    answer:
      "Yes, Scougal Rubber offers inventory programs to support your just-in-time manufacturing requirements.",
    href: "#",
  },
];

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Durée de l'animation
      easing: "ease-in-out", // Fonction d'animation
      once: true, // Si vrai, l'animation ne se déclenche qu'une fois
    });
    AOS.refresh(); // Actualise AOS pour prendre en compte les nouveaux éléments
  }, []);
  return (
    <div>
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
        <meta property="og:url" content="https://scougalrubber.com/" />
        <meta
          property="og:image"
          content="https://scougalrubber.com/logo-animated.webm"
        />
        <link rel="canonical" href="https://scougalrubber.com/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />

      <div className="flex flex-col p-20 gap-4">
        <div
          data-aos="fade-up"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          className={`font-bold text-lg md:text-2xl text-black`}
        >
          {text1_words1} <br /> <br />
          {text1_words2} <br /> <br />
          {text1_words3} <br /> <br />
          {text1_words4} <br /> <br />
        </div>
      </div>

      <div className="p-0 md:p-10">
        <ImagesSlider
          className="h-[40rem] rounded-xl overflow-hidden"
          images={images1}
        >
          <motion.div
            initial={{
              opacity: 0,
              y: -80,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="z-50 flex flex-col justify-center items-center p-5"
          >
            <motion.p className="font-bold text-3xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
              Rubber Pads & Bearings
            </motion.p>
            <p className="text-l text-neutral-100 font-bold text-center">
              885 Denmark Drive, Suite 103, McCarran, NV, 89437-4425
            </p>
            <p className="text-l text-neutral-100 font-bold text-center">
              Email:{" "}
              <a
                href="mailto:sales@scougalrubber.com"
                className="text-blue-500 hover:text-blue-700"
              >
                sales@scougalrubber.com
              </a>{" "}
              | Phone: (775) 284-8500
            </p>
            <Modal>
              <ModalTrigger className="px-4 py-2 backdrop-blur-sm border bg-blue-300/10 border-blue-500/20 text-white mx-auto text-center rounded-full relative mt-4">
                <span>See more →</span>
                <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-blue-500 to-transparent" />
              </ModalTrigger>
              <ModalBody>
                <ModalContent className="bg-neutral-100 p-10 rounded-xl">
                  <h4 className="text-lg md:text-2xl text-neutral-900 font-bold text-center mb-8">
                    Rubber Pads & Bearings
                  </h4>
                  <p className="text-center text-sm md:text-xl text-neutral-700 mb-4">
                    Explore our high-quality rubber solutions tailored for
                    various industrial applications.
                  </p>
                  <div className="flex flex-col md:flex-row justify-between items-center px-6 space-y-4 md:space-y-0 md:space-x-4">
                    <Link href="/rubber-parts" passHref>
                      <button className="px-4 py-2 backdrop-blur-sm border bg-blue-500 mt-12 border-blue-500/20 text-white text-center rounded-full relative">
                        <span>Rubber Pads →</span>
                        <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                      </button>
                    </Link>
                    <Link href="/bearing-pads" passHref>
                      <button className="px-4 py-2 backdrop-blur-sm border bg-blue-500 mt-12 border-blue-500/20 text-white text-center rounded-full relative">
                        <span>Bearings →</span>
                        <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                      </button>
                    </Link>
                  </div>
                </ModalContent>
              </ModalBody>
            </Modal>
          </motion.div>
        </ImagesSlider>
      </div>

      <div className="flex flex-col p-20 gap-4">
        <div
          data-aos="fade-up"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          className={`font-bold text-lg md:text-2xl text-black`}
        >
          {text2_words1} <br /><br />
          {text2_words2} <br /><br />
          {text2_words3} <br /><br />
          {text2_words4} <br /><br />
        </div>
      </div>

      <div className="p-0 md:p-10">
        <ImagesSlider
          className="h-[40rem] rounded-xl overflow-hidden"
          images={images2}
        >
          <motion.div
            initial={{
              opacity: 0,
              y: -80,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="z-50 flex flex-col justify-center items-center p-5"
          >
            <motion.p className="font-bold text-3xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
              Industrial Products
            </motion.p>
            <p className="text-l text-neutral-100 font-bold text-center">
              6239 Corson Ave S Seattle, WA, 98108-3443
            </p>
            <p className="text-l text-neutral-100 font-bold text-center">
              Email:{" "}
              <a
                href="mailto:sales@scougalrubber.com"
                className="text-blue-500 hover:text-blue-700"
              >
                sales@scougalrubber.com
              </a>{" "}
              | Phone: (206) 763-2650
            </p>
            <Link href="/ramps" passHref>
              <button className="px-4 py-2 backdrop-blur-sm border bg-blue-300/10 border-blue-500/20 text-white mx-auto text-center rounded-full relative mt-4">
                <span>See more →</span>
                <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-blue-500 to-transparent" />
              </button>
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

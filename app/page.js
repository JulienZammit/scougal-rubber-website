"use client";
import Head from "next/head";
import Hero from "../components/Hero";
import { ImagesSlider } from "../components/ui/images-slider";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../components/ui/animated-modal";

const text1_words1 = `In 2010, Scougal Rubber opened a new facility in McCarran, NV just outside of Reno dedicated to the production and testing of steel reinforced and plain elastomeric bearings for bridges and buildings.`;
const text1_words2 = `Starting with an empty slate, we were able to design and build a first-class, modern facility to fit our growing needs. With round-the-clock production, we are producing bearing pads to meet our customers’ needs throughout North America, allowing us to offer the best lead times in the industry.`;
const text1_words3 = `Our quality assurance lab has the capability of testing for all the requirements of most specifications.`;
const text1_words4 = `Scougal Rubber is an AISC certified Simple Bridge and Bridge Component manufacturer.`;

const text2_words1 = `Scougal Rubber's Industrial Parts can be found everywhere from playground equipment, ski lifts and food processing plants to U.S. Military Vehicles.`;
const text2_words2 = `Whether you need ten parts or ten thousand, our team of experienced professionals is ready to assist you. In addition, we offer inventory programs to support your just-in-time manufacturing requirements.`;
const text2_words3 = `We take pride in our competitive pricing, quality, and agile response time. Scougal will work quickly to satisfy your demands.`;
const text2_words4 = `Scougal Rubber maintains a strict quality assurance program in order to exceed your expectations with the adaptation of ISO 9001:2015 and AS9100.`;

const images1 = [
  "/banner1/Banner1.jpg",
  "/banner1/Banner2.jpg",
  "/banner1/Banner3.jpg",
  "/banner1/Banner4.jpg",
  "/banner1/Banner5.jpg",
  "/banner1/Banner6.jpg",
  "/banner1/Banner7.jpg",
  "/banner1/Banner8.jpg",
  "/banner1/Banner9.jpg",
  "/banner1/Banner10.jpg",
  "/banner1/Banner11.jpg",
  "/banner1/Banner12.jpg",
];

const images2 = [
  "/banner2/Banner1.jpg",
  "/banner2/Banner2.jpg",
  "/banner2/Banner3.jpg",
  "/banner2/Banner4.jpg",
  "/banner2/Banner5.jpg",
  "/banner2/Banner6.jpg",
  "/banner2/Banner7.jpg",
  "/banner2/Banner8.jpg",
];

export default function Home() {
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
          content="https://scougalrubber.com/logo.gif"
        />
        <link rel="canonical" href="https://scougalrubber.com/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />

      <div className="flex flex-col p-20 gap-4">
        {" "}
        {/* Added gap for spacing between paragraphs */}
        <TextGenerateEffect
          duration={1}
          filter={false}
          words={text1_words1}
          startDelay={0.5}
        />
        <TextGenerateEffect
          duration={1}
          filter={false}
          words={text1_words2}
          startDelay={1.5}
        />
        <TextGenerateEffect
          duration={1}
          filter={false}
          words={text1_words3}
          startDelay={2.5}
        />
        <TextGenerateEffect
          duration={1}
          filter={false}
          words={text1_words4}
          startDelay={3.5}
        />
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
            <p className="text-l text-neutral-600 dark:text-neutral-100 font-bold text-center">
              885 Denmark Drive, Suite 103, McCarran, NV, 89437-4425
            </p>
            <p className="text-l text-neutral-600 dark:text-neutral-100 font-bold text-center">
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
              <ModalTrigger>
                <button className="px-4 py-2 backdrop-blur-sm border bg-blue-300/10 border-blue-500/20 text-white mx-auto text-center rounded-full relative mt-4">
                  <span>See more →</span>
                  <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-blue-500 to-transparent" />
                </button>
              </ModalTrigger>
              <ModalBody>
                <ModalContent>
                  <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                    Rubber Pads & Bearings
                  </h4>
                  <p className="text-center text-sm md:text-base text-neutral-500 dark:text-neutral-400 mb-4">
                    Explore our high-quality rubber solutions tailored for
                    various industrial applications.
                  </p>
                  <div className="flex flex-col md:flex-row justify-between items-center px-6 space-y-4 md:space-y-0 md:space-x-4">
                    <Link href="/rubber-parts" passHref>
                      <button className="px-4 py-2 backdrop-blur-sm border bg-blue-300/10 border-blue-500/20 text-white text-center rounded-full relative">
                        <span>Rubber Pads →</span>
                        <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                      </button>
                    </Link>
                    <Link href="/bearing-pads" passHref>
                      <button className="px-4 py-2 backdrop-blur-sm border bg-blue-300/10 border-blue-500/20 text-white text-center rounded-full relative">
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
        <TextGenerateEffect
          duration={1}
          filter={false}
          words={text2_words1}
          startDelay={0.5}
        />
        <TextGenerateEffect
          duration={1}
          filter={false}
          words={text2_words2}
          startDelay={1.5}
        />
        <TextGenerateEffect
          duration={1}
          filter={false}
          words={text2_words3}
          startDelay={2.5}
        />
        <TextGenerateEffect
          duration={1}
          filter={false}
          words={text2_words4}
          startDelay={3.5}
        />
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
            <p className="text-l text-neutral-600 dark:text-neutral-100 font-bold text-center">
              6239 Corson Ave S Seattle, WA, 98108-3443
            </p>
            <p className="text-l text-neutral-600 dark:text-neutral-100 font-bold text-center">
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
    </div>
  );
}

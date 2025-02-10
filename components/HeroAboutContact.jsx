"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroAboutContact({ backgroundImage, title, subtitle }) {
  const scrollToNextSection = () => {
    const targetPosition = window.innerHeight - 50;
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center overflow-hidden h-screen bg-gradient-to-br from-slate-700 to-blue-500">
      <div className="absolute inset-0 w-full h-full flex items-center justify-center z-0">
        <Image
          src={backgroundImage}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="opacity-40"
          loading="eager"
          quality={50}
          placeholder="blur"
          blurDataURL="/project/banner-placeholder.webp"
        />
      </div>
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }}
        className="bg-gradient-to-br from-yellow-400 to-red-600 text-white bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent md:text-7xl z-10"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
        className="text-white text-center text-lg md:text-2xl mt-4 z-10"
      >
        {subtitle}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5, ease: "easeInOut" }}
        className="absolute bottom-10 w-10 h-10 bg-white rounded-[5px] flex items-center justify-center shadow-lg z-10 cursor-pointer"
        onClick={scrollToNextSection}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-blue-500 animate-bounce"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </div>
  );
}

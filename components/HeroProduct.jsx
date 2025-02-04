import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";

const HeroProduct = ({ title, subtitle, certifications }) => { 
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const handleLearnMore = () => {
    window.scrollTo({
      top: window.innerHeight - 50,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-700 via-blue-500 to-slate-700">
      {/* Subtle animated wave background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-slate-700 opacity-50">
        </div>
      </div>

      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={containerVariants}
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 my-6 text-center w-10/12 mx-auto"
      >
        <motion.h1
          variants={itemVariants}
          className="mb-6 text-xl font-extrabold tracking-tight text-white md:text-4xl"
        >
          {title}
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="max-w-2xl mb-12 text-md font-medium text-slate-100 md:text-2xl"
        >
          {subtitle}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <Image
                src={cert.src}
                alt={cert.alt}
                priority
                width={cert.defaultWidth || 80}
                height={cert.defaultHeight || 48}
                className="object-contain transition-transform duration-300 rounded-[5px]"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          variants={itemVariants}
          onClick={handleLearnMore}
          className="px-6 py-2 text-md font-semibold text-slate-700 bg-white rounded-[5px] md:px-8 md:py-3 md:text-lg hover:bg-slate-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          Learn More
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HeroProduct;

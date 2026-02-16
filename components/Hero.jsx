"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Hero = () => {
  const certifications = [
    {
      src: "/certification/cage.webp",
      alt: "CAGE Certification",
      name: "CAGE",
    },
    {
      src: "/certification/Seal-Compliassure_Confirm.webp",
      alt: "Seal Compliasure Confirm Certification",
      name: "Compliasure",
    },
    {
      src: "/logo_bridge_conference.png",
      alt: "Bridge conference logo",
      name: "Bridge Conference",
    },
  ];

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://myblogimages.blob.core.windows.net/videos/Bay_Bridge.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay gradients for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Image
            src="/logo_resized.webp"
            alt="Scougal Rubber Logo"
            width={400}
            height={170}
            priority
            className="w-[260px] md:w-[360px] lg:w-[400px] h-auto drop-shadow-2xl brightness-0 invert"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-3xl lg:text-4xl font-bold text-white max-w-4xl leading-tight text-center mb-4"
        >
          America&apos;s Trusted Bridge Bearing and Custom Molded Rubber Company
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-200 text-center mb-10 max-w-2xl"
        >
          Engineering Excellence Since 1916
        </motion.p>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-6 md:gap-10"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="relative flex flex-col items-center group w-20 md:w-24"
            >
              <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 shadow-lg group-hover:bg-white/20 transition-all duration-300">
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  fill
                  className="object-contain p-2"
                  sizes="80px"
                />
              </div>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs md:text-sm text-white/80 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {cert.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white/60"
          >
            <span className="text-sm hidden md:block">Scroll to explore</span>
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

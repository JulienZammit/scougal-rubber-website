"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Highlight } from "./ui/hero-highlight";
import { AuroraBackground } from "./ui/aurora-background";

const Hero = () => {
  const certifications = [
    {
      src: "/certification/cage.webp",
      alt: "CAGE Certification",
      defaultWidth: 63,
      defaultHeight: 75,
      rounded: true,
    },
    {
      src: "/certification/Seal-Compliassure_Confirm.webp",
      alt: "Seal Compliasure Confirm Certification",
      defaultWidth: 80,
      defaultHeight: 35,
      rounded: true,
    },
  ];

  return (
    <AuroraBackground>
      <div className="relative flex flex-col items-center justify-center">
        {/* Vidéo optimisée */}
        <div className="flex justify-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/logo-placeholder.webp"
            className="w-[300px] h-[180px] max-w-full md:w-[500px] md:h-[300px]"
          >
            <source src="/logo-animated.webm" type="video/webm" />
            <source src="/logo-animated.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Titre animé avec framer-motion */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          className="text-3xl px-4 md:text-7xl lg:text-5xl font-bold text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto mt-4"
        >
          America&apos;s Custom Molded Rubber Company Since 1916
        </motion.h1>

        {/* Certifications */}
        <div className="flex justify-center items-center flex-wrap mt-8 gap-8 mb-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className={`m-2 ${cert.rounded ? "rounded-[5px]" : ""} certification-logo`}
              style={{ width: cert.defaultWidth, height: cert.defaultHeight }}
            >
              <Image
                src={cert.src}
                alt={cert.alt}
                width={cert.defaultWidth}
                height={cert.defaultHeight}
                loading="lazy"
                priority={index === 2}
                sizes="(max-width: 640px) 40px, (max-width: 768px) 60px, 80px"
                style={{
                  objectFit: "contain",
                  borderRadius: cert.rounded ? "10px" : "0",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </AuroraBackground>
  );
};

export default Hero;

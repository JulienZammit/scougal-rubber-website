"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Highlight } from "./ui/hero-highlight";
import { AuroraBackground } from "./ui/aurora-background";

const Hero = () => {
  const certifications = [
    { src: "/certification/aisc.png", alt: "AISC Certification" },
    { src: "/certification/as9100.png", alt: "AS9100 Certification" },
    { src: "/certification/cage.png", alt: "CAGE Certification" },
    { src: "/certification/iso9001.png", alt: "ISO 9001 Certification" },
    {
      src: "/certification/Seal-Compliassure_Confirm.png",
      alt: "Seal Compliasure Confirm Certification",
    },
  ];

  return (
    <AuroraBackground>
      <div className="relative flex flex-col items-center justify-center">
        <div className="flex justify-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            width="500"
            height="300"
            style={{ filter: "brightness(15) contrast(1)" }}
          >
            <source src="/logo-animated.webm" type="video/webm" />
            <source src="/logo-animated.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-3xl px-4 md:text-7xl lg:text-5xl font-bold text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto mt-4"
        >
          <p>
            America's Custom Molded Rubber Company
            <span> </span>
            <Highlight className="text-white">Since 1916</Highlight>
          </p>
        </motion.h1>
        <div className="flex justify-center items-center flex-wrap mt-8 space-x-4">
          {certifications.map((cert, index) => (
            <div key={index} className="m-2">
              <Image
                src={cert.src}
                alt={cert.alt}
                width={80}
                height={80}
                className="rounded-full"
                loading="lazy" // Lazy load the images
                sizes="(max-width: 640px) 40px, (max-width: 768px) 60px, 80px" // Define the sizes attribute for responsive loading
                srcSet={`
                  ${cert.src} 40w,
                  ${cert.src} 60w,
                  ${cert.src} 80w
                `} // Define the srcset attribute for responsive loading
              />
            </div>
          ))}
        </div>
      </div>
    </AuroraBackground>
  );
};

export default Hero;

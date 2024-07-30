"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Highlight } from "./ui/hero-highlight";
import { AuroraBackground } from "./ui/aurora-background";

const Hero = () => {
  const certifications = [
    // { src: "/certification/aisc.webp", alt: "AISC Certification", defaultWidth: 135, defaultHeight: 60, rounded: true },
    // { src: "/certification/as9100.webp", alt: "AS9100 Certification", defaultWidth: 100, defaultHeight: 100, rounded: false },
    { src: "/certification/cage.webp", alt: "CAGE Certification", defaultWidth: 63, defaultHeight: 75, rounded: true },
    // { src: "/certification/iso9001.webp", alt: "ISO 9001 Certification", defaultWidth: 100, defaultHeight: 100, rounded: false },
    { src: "/certification/Seal-Compliassure_Confirm.webp", alt: "Seal Compliasure Confirm Certification", defaultWidth: 80, defaultHeight: 35, rounded: true },
  ];

  return (
    <AuroraBackground>
      <div className="relative flex flex-col items-center justify-center ">
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          className="text-3xl px-4 md:text-7xl lg:text-5xl font-bold text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto mt-4"
        >
          <p>
            America's Custom Molded Rubber Company
            <span> </span>
            <Highlight className="text-white">Since 1916</Highlight>
          </p>
        </motion.h1>
        <div className="flex justify-center items-center flex-wrap mt-8 gap-8 mb-8">
          {certifications.map((cert, index) => (
            <div key={index} className={`m-2 ${cert.rounded ? 'rounded-lg' : ''} certification-logo`} style={{ width: cert.defaultWidth, height: cert.defaultHeight }}>
              <Image
                src={cert.src}
                alt={cert.alt}
                width={cert.defaultWidth}
                height={cert.defaultHeight}
                priority={index === 2} // Priorité seulement pour la 3ème image
                sizes="(max-width: 640px) 40px, (max-width: 768px) 60px, 80px"
                style={{ objectFit: 'contain', borderRadius: cert.rounded ? '10px' : '0' }} // 'contain' pour conserver la forme du logo
              />
            </div>
          ))}
        </div>
      </div>
    </AuroraBackground>
  );
};

export default Hero;

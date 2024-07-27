"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Highlight } from "./ui/hero-highlight";
import { AuroraBackground } from "./ui/aurora-background";

const Hero = () => {
  const certifications = [
    { src: "/certification/aisc.webp", alt: "AISC Certification", width: 80, height: 80 },
    { src: "/certification/as9100.webp", alt: "AS9100 Certification", width: 80, height: 80 },
    { src: "/certification/cage.webp", alt: "CAGE Certification", width: 80, height: 80 },
    { src: "/certification/iso9001.webp", alt: "ISO 9001 Certification", width: 80, height: 80 },
    { src: "/certification/Seal-Compliassure_Confirm.webp", alt: "Seal Compliasure Confirm Certification", width: 80, height: 80 },
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
            <div key={index} className="m-2" style={{ width: cert.width, height: cert.height }}>
              <Image
                src={cert.src}
                alt={cert.alt}
                width={cert.width}
                height={cert.height}
                className="rounded-full"
                priority={cert.src === "/certification/cage.webp"} // Ajout de la propriété priority
                sizes="(max-width: 640px) 40px, (max-width: 768px) 60px, 80px"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Utilisation de objectFit pour maintenir le ratio d'aspect
              />
            </div>
          ))}
        </div>
      </div>
    </AuroraBackground>
  );
};

export default Hero;

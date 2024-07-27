"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Highlight } from "./ui/hero-highlight";
import { AuroraBackground } from "./ui/aurora-background";

const Hero = () => {
  return (
    <AuroraBackground>
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
        className="text-3xl px-4 md:text-7xl lg:text-5xl font-bold text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image
            src="/logo.gif"
            alt="Logo of America's Custom Molded Rubber Company"
            width={500}
            height={300}
            priority
            style={{ filter: "brightness(15) contrast(1)" }}  // Applique un filtre pour éclaircir l'image
          />
        </div>
        <p>
          America's Custom Molded Rubber Company
          <span> </span>
          <Highlight className="text-white">Since 1916</Highlight>
        </p>
      </motion.h1>
    </AuroraBackground>
  );
};

export default Hero;

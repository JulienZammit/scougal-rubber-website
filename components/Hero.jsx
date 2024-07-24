"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";

const Hero = () => {
  return (
    <div className="hero">
      <h1 className="hero-text">
        <HeroHighlight>
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
            className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
          >
            <img src="/logo.gif" alt="Hero GIF" className="hero-gif mt-4" />
            America's Custom Molded Rubber Company
            <Highlight className="text-black">
              Since 1916
            </Highlight>
          </motion.h1>
        </HeroHighlight>
      </h1>
    </div>
  );
};

export default Hero;

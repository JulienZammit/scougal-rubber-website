"use client";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from 'react-intersection-observer';

export const TextGenerateEffect = ({
  words,
  className,
  filter = false,
  duration = 2,
  startDelay = 0,
}) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      controls.start(i => ({
        opacity: 1,
        y: 0,
        filter: filter ? "blur(0px)" : "none",
        transition: {
          delay: startDelay, // Use the startDelay prop
          duration: duration,
          ease: "easeOut",
        }
      }));
    }
  }, [controls, inView, startDelay, duration, filter]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, filter: filter ? "blur(10px)" : "none" }}
      animate={controls}
      className={`font-bold text-lg md:text-2xl text-black ${className}`} // Adjusted for larger, black text
    >
      {words.split(" ").map((word, index) => (
        <span key={index}>{word} </span>
      ))}
    </motion.div>
  );
};

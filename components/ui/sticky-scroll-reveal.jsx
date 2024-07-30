"use client";
import React, { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "../utils";
import { Highlight } from "./hero-highlight";
import { FaArrowDown } from "react-icons/fa"; // Importez l'icône de flèche vers le bas

export const StickyScroll = ({ content, contentClassName }) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useEffect(() => {
    const handleScroll = () => {
      const latest = scrollYProgress.get();
      const cardsBreakpoints = content.map((_, index) => index / cardLength);
      const closestBreakpointIndex = cardsBreakpoints.reduce(
        (acc, breakpoint, index) => {
          const distance = Math.abs(latest - breakpoint);
          if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
            return index;
          }
          return acc;
        },
        0
      );
      setActiveCard(closestBreakpointIndex);
    };

    const unsubscribe = scrollYProgress.onChange(handleScroll);
    return () => unsubscribe();
  }, [scrollYProgress, content, cardLength]);

  const backgroundColors = ["var(--slate-900)"];
  const linearGradients = [
    "linear-gradient(to bottom right, var(--white), var(--white))",
    "linear-gradient(to bottom right, var(--white), var(--white))",
    "linear-gradient(to bottom right, var(--white), var(--white))",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 p-10"
      ref={ref}
    >
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-kg text-slate-300 max-w-sm mt-10"
              >
                {item.description}
              </motion.p>
              {/* Section visible en mode mobile */}
              <div className="lg:hidden flex flex-col items-center mt-10">
                <Highlight className="text-white font-bold text-lg mb-2 mt-6 flex items-center">
                  Click Here
                  <FaArrowDown className="text-white ml-2" />
                </Highlight>
                <div
                  style={{ background: backgroundGradient }}
                  className={cn(
                    "flex items-center justify-center h-60 w-full rounded-md bg-white overflow-hidden",
                    contentClassName
                  )}
                >
                  {item.content ?? null}
                </div>
                <h3 className="text-white font-bold text-lg mt-2">
                  {item.modalTitle}
                </h3>
              </div>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      {/* Section visible en mode desktop */}
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "hidden lg:flex flex-col items-center justify-center h-80 w-100 rounded-md bg-white sticky top-10 overflow-hidden",
          contentClassName
        )}
      >
        <Highlight className="text-white font-bold text-lg mb-2 mt-6 flex items-center">
          Click Here
          <FaArrowDown className="text-white ml-2" />
        </Highlight>
        <div
          style={{ background: backgroundGradient }}
          className={cn(
            "flex items-center justify-center h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden",
            contentClassName
          )}
        >
          {content[activeCard].content ?? null}
        </div>
        <h3 className="text-black font-bold text-2xl m-4">
          {content[activeCard].modalTitle}
        </h3>
      </div>
    </motion.div>
  );
};

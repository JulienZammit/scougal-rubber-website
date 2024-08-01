"use client";
import React, { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "../utils";

export const StickyScrollOriginal = ({ content, contentClassName }) => {
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
      className="h-[25rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
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
              <div className="lg:hidden flex flex-col items-center mt-10">
                <div
                  style={{
                    background: backgroundGradient,
                    height: `${item.height / 2}px`, // Half size for mobile
                    width: `${item.width / 2}px`,  // Half size for mobile
                  }}
                  className={cn(
                    "block rounded-md bg-white sticky top-10 overflow-hidden",
                    contentClassName
                  )}
                >
                  {item.content ?? null}
                </div>
              </div>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        style={{
          background: backgroundGradient,
          height: `${content[activeCard].height}px`,
          width: `${content[activeCard].width}px`,
        }}
        className={cn(
          "hidden lg:flex items-center justify-center rounded-md bg-white sticky top-10 overflow-hidden",
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};

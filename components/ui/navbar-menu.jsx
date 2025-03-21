import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({ setActive, active, item, children }) => {
  let timeout;

  const handleMouseEnter = () => {
    clearTimeout(timeout);
    setActive(item);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 960) {
      timeout = setTimeout(() => setActive(null), 200);
    } else {
      setActive(null);
    }
  };
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative md:text-lg text-sm"
    >
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer hover:opacity-[0.9] text-white"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-1">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-slate-800 backdrop-blur-sm rounded-[5px] overflow-hidden border border-white/[0.2] shadow-lg"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({ setActive, children }) => {
  let timeout;

  const handleMouseEnter = () => {
    clearTimeout(timeout);
  };

  const handleMouseLeave = () => {
    timeout = setTimeout(() => setActive(null), 500); // 0.5 second delay
  };

  return (
    <nav
      onMouseLeave={handleMouseLeave} // resets the state
      onMouseEnter={handleMouseEnter}
      className="relative rounded-[5px] border bg-slate-800 border-white/[0.2] shadow-lg flex justify-center space-x-4 px-8 py-4 "
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({ title, description, href, src }) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        loading="lazy"
        className="flex-shrink-0 rounded-[5px] shadow-lg"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-white">{title}</h4>
        <p className="text-sm max-w-[10rem] text-neutral-300">{description}</p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }) => {
  return (
    <Link {...rest} className="text-neutral-200 hover:text-slate-700 md:text-lg text-sm">
      {children}
    </Link>
  );
};

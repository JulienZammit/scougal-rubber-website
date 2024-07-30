import React from "react";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import Image from "next/image";

const words = [
  {
    text: "Custom Molded Rubber",
  },
  {
    text: "Since 1916",
    className: "text-blue-500",
  },
];

const CallToAction = ({ iconLogo, scrollToSection }) => {
  return (
    <div className="text-center py-24">
      <div className="container mx-auto">
        <div className="mb-6 flex justify-center">
          <Image
            src="/logo.webp"
            alt="Scougal Rubber Logo"
            width={451}
            height={256}
          />
        </div>
        <div className="flex flex-col items-center justify-center ">
          <p className="text-black sm:text-base  ">
            Quality, service and reliability have been the "Scougal Standart"
          </p>
          <TypewriterEffectSmooth words={words} />
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">

              <a href="mailto:sales@scougalrubber.com" className="w-full">
                <button className="bg-blue-500 text-white text-sm px-6 py-2 rounded-[20px] border w-full hover:bg-blue-300 transition-all duration-300">
                  Contact Sales Now
                </button>
              </a>
              </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;

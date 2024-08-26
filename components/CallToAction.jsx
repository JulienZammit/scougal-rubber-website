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

const CallToAction = () => {
  return (
    <div className="text-center">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <Image
            src="/logo_resized.webp"
            alt="Scougal Rubber Logo"
            width={300}
            height={180}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-black md:text-2xl text-lg p-2">
            Quality, service, and reliability, have been the "Scougal Standard"
          </p>
          <TypewriterEffectSmooth words={words} />
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            <a href="mailto:sales@scougalrubber.com" className="w-full">
              <button className="bg-blue-500 text-white text-sm md:text-2xl px-6 py-2 rounded-[5px] border w-full hover:bg-slate-700 transition-all duration-300">
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

"use client";
import React from "react";
import { Boxes } from "./ui/background-boxes";
import { cn } from "./utils";
import Image from "next/image";

export function HeroRamps() {
  const image = [
    { src: "/ramps/ramps.webp", alt: "ramps scougal", defaultWidth: 908, defaultHeight: 291, rounded: false },
  ];
  return (
    <div className="md:h-[48rem] h-[32rem] relative w-full overflow-hidden flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1
        className={cn(
          "md:mt-20 mt-28 md:text-6xl text-3xl text-black font-bold relative z-10"
        )}
      >
        Scougal Ramps
      </h1>

      <p className="text-center md:text-3xl text-xl mt-2 p-2 text-black font-bold relative z-10">
        RAMP UP YOUR PRODUCTIVITY
      </p>
      <div className="flex justify-center items-center flex-wrap mt-8 gap-8 mb-8 z-10"> 
        {image.map((cert, index) => (
          <div
            key={index}
            className="w-full md:w-auto m-2"
          >
            <Image
              src={cert.src}
              alt={cert.alt}
              width={cert.defaultWidth}
              height={cert.defaultHeight}
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 908px"
              style={{
                objectFit: "contain",
                borderRadius: "35px",
              }}
              className="w-full h-auto md:w-[908px] md:h-[291px] sm:w-[454px] sm:h-[145px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

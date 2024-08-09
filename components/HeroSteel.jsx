"use client";
import React from "react";
import { Boxes } from "./ui/background-boxes";
import { cn } from "./utils";
import Image from "next/image";


export function HeroSteel() {
  const certifications = [
    {
      src: "/certification/aisc.webp",
      alt: "AISC Certification",
      defaultWidth: 135,
      defaultHeight: 60,
      rounded: true,
    },
    {
      src: "/certification/NTPEP.webp",
      alt: "NTPEP Certification",
      defaultWidth: 100,
      defaultHeight: 60,
      rounded: true,
    },
    // { src: "/certification/as9100.webp", alt: "AS9100 Certification", defaultWidth: 100, defaultHeight: 100, rounded: false },
    {
      src: "/certification/cage.webp",
      alt: "CAGE Certification",
      defaultWidth: 63,
      defaultHeight: 75,
      rounded: true,
    },
    // { src: "/certification/iso9001.webp", alt: "ISO 9001 Certification", defaultWidth: 100, defaultHeight: 100, rounded: false },
    
  ];
  return (
    <div className="md:h-[48rem] h-[32rem] relative w-full overflow-hidden flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1
        className={cn(
          "md:mt-20 mt-28 md:text-6xl text-3xl text-black font-bold relative z-40"
        )}
      >
        Steel Fabrication
      </h1>

      <p className="text-center md:text-3xl text-xl mt-2 p-2 text-black font-bold relative">
        Quality, service, and reliability, have been the "Scougal Standard"
      </p>
      <div className="flex justify-center items-center flex-wrap mt-8 gap-8 mb-8 z-40">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className={`m-1 ${
              cert.rounded ? "rounded-lg" : ""
            } certification-logo`}
            style={{ width: cert.defaultWidth, height: cert.defaultHeight }}
          >
            <Image
              src={cert.src}
              alt={cert.alt}
              width={cert.defaultWidth}
              height={cert.defaultHeight}
              priority={index === 2} // Priorité seulement pour la 3ème image
              sizes="(max-width: 640px) 40px, (max-width: 768px) 60px, 80px"
              style={{
                objectFit: "contain",
                borderRadius: cert.rounded ? "10px" : "0",
              }} // 'contain' pour conserver la forme du logo
            />
          </div>
        ))}
      </div>
    </div>
  );
}

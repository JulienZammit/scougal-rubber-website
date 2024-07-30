"use client";
import React from "react";
import { Boxes } from "./ui/background-boxes";
import { cn } from "./utils";
import Image from "next/image";

export function HeroBearingPads() {
  const certifications = [
    {
      src: "/certification/aisc.webp",
      alt: "AISC Certification",
      defaultWidth: 135,
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
    {
      src: "/certification/Seal-Compliassure_Confirm.webp",
      alt: "Seal Compliasure Confirm Certification",
      defaultWidth: 80,
      defaultHeight: 35,
      rounded: true,
    },
  ];
  return (
    <div className="h-96 relative w-full overflow-hidden flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1
        className={cn(
          "md:mt-20 mt-36 md:text-4xl text-xl text-black font-bold relative"
        )}
      >
        Bearing Pads
      </h1>

      <p className="text-center mt-2 text-black font-bold relative">
        Qulaity, service and reliability, have been our the "Scougal Standart"
      </p>
      <div className="flex justify-center items-center flex-wrap mt-8 gap-8 mb-8">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className={`m-2 ${
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

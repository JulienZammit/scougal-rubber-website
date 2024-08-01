"use client";
import React from "react";
import { StickyScrollOriginal } from "./ui/sticky-scroll-reveal-original";
import Image from "next/image";

const content = [
  {
    title: "Ramp up your productivity.",
    description:
      "The Scougal Ramp clips quickly onto a steel road plate and stays securely in place. No more shoveling cold mix. The covering process is faster, so you can keep a hole open later and work longer into the day. It’s neat, clean, safe, and stands up beautifully to traffic.",
    height: 121,
    width: 385,
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        <Image
          src="/ramps/ramps-slogan.webp"
          width={385}
          height={121}
          className="h-full w-full object-cover"
          alt="Scougal Ramp"
        />
      </div>
    ),
  },
  {
    title: "Clean up your worksite.",
    description:
      "Scougal Ramps are durable and pay for themselves in weeks. Use them on job after job. One standard 60 length will save laying down cold mix every evening and pulling it up the next day. See how quickly that adds up.",
    height: 172,
    width: 430,
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        <Image
          src="/ramps/ramp1.webp"
          width={860}
          height={344}
          className="h-full w-full object-cover"
          alt="Ramp 1"
        />
      </div>
    ),
  },
  {
    title: "Be green and eliminate disposal issues.",
    description:
      "The Scougal Ramp is reusable reducing the need to properly dispose of cold mix. The reduction of oil-based material at your construction site is a bonus.",
    height: 172,
    width: 430,
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/ramps/ramp2.webp"
          width={849}
          height={338}
          className="h-full w-full object-cover"
          alt="Ramp 2"
        />
      </div>
    ),
  },
  {
    title: "Save cold cash on cold mix and eliminate claims.",
    description:
      "The Scougal Ramp remains intact and will not break apart, eliminating damage claims from flying asphalt.",
    height: 270,
    width: 250,
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        <Image
          src="/ramps/ramp3.webp"
          width={507}
          height={547}
          className="h-full w-full object-cover"
          alt="Ramp 3"
        />
      </div>
    ),
  },
];

export function StickyScrollRamps() {
  return <StickyScrollOriginal content={content} />;
}

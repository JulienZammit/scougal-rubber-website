"use client";
import CallToAction from "@/components/CallToAction";
import FaqSection from "@/components/FaqSection";
import ProductDisplay from "../../components/ProductDisplay";
import {TextContentProduct} from "../../components/TextContentProduct";
import HeroProduct from "../../components/HeroProduct";

export default function BearingPads() {
  const faqs = [
    {
      id: 1,
      question: "What are the lead times for your products?",
      answer:
        "Scougal Rubber has the best lead times in the industry. We are able to produce and ship most orders within 24 hours.",
      href: "#",
    },
    {
      id: 2,
      question: "What are your quality assurance standards?",
      answer:
        "Scougal Rubber maintains a strict quality assurance program in order to exceed your expectations with the adaptation of ISO 9001:2015 and AS9100.",
      href: "#",
    },
    {
      id: 3,
      question: "What are your production capabilities?",
      answer:
        "Scougal Rubber has the capability to produce and test steel reinforced and plain elastomeric bearings for bridges and buildings.",
      href: "#",
    },
    {
      id: 4,
      question: "Do you offer inventory programs?",
      answer:
        "Yes, Scougal Rubber offers inventory programs to support your just-in-time manufacturing requirements.",
      href: "#",
    },
  ];

  const image = [
    {
      src: "/ramps/ramps.webp",
      alt: "ramps scougal",
      defaultWidth: 700,
      defaultHeight: 291,
      rounded: false,
    },
  ];

  const contentText = [
    {
      title: "Ramp up your productivity.",
      description:
        "The Scougal Ramp clips quickly onto a steel road plate and stays securely in place. No more shoveling cold mix. The covering process is faster, so you can keep a hole open later and work longer into the day. It’s neat, clean, safe, and stands up beautifully to traffic.",
    },
    {
      title: "Clean up your worksite.",
      description:
        "Scougal Ramps are durable and pay for themselves in weeks. Use them on job after job. One standard 60 length will save laying down cold mix every evening and pulling it up the next day. See how quickly that adds up.",
    },
    {
      title: "Be green and eliminate disposal issues.",
      description:
        "The Scougal Ramp is reusable reducing the need to properly dispose of cold mix. The reduction of oil-based material at your construction site is a bonus.",
    },
    {
      title: "Save cold cash on cold mix and eliminate claims.",
      description:
        "The Scougal Ramp remains intact and will not break apart, eliminating damage claims from flying asphalt.",
    }
  ];

  const content = [
    {
      ImageMain: "/ramps/ramps-slogan.webp",
      ImageMainHeight: 121,
      ImageMainWidth: 385,
      title : "Ramp up your productivity.",
      images: [
        "/ramps/ramp1.webp",
        "/ramps/ramp2.webp",
        "/ramps/ramp3.webp"
      ],
      paragraphs: [
        "The Scougal Ramp is designed to revolutionize your workflow, offering a durable, easy-to-use solution for managing road plates efficiently and safely."
      ],
    },
  ];

  return (
    <>
      <HeroProduct
        title="Scougal Ramps"
        subtitle="Ramp up your productivity with Scougal Ramps"
        certifications={image}
      />
      <ProductDisplay content={content} />
      <TextContentProduct contentText={contentText} />
      <div className="p-10 md:mb-0 mb-32">
        <CallToAction />
      </div>

      <div className="p-10">
        <FaqSection faqs={faqs} />
      </div>
    </>
  );
}

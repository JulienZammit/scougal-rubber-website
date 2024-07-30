"use client";
import CallToAction from "@/components/CallToAction";
import { HeroBearingPads } from "../../components/HeroBearingPads";
import { StickyScrollBearingPads } from "../../components/StickyScrollBearingPads";
import FaqSection from "@/components/FaqSection";
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
  return (
    <>
      <HeroBearingPads />
      <StickyScrollBearingPads />
      <div className="p-0 md:p-10">
        <CallToAction />
      </div>

      <div className="p-0 md:p-10">
        <FaqSection faqs={faqs} />
      </div>
    </>
  );
}

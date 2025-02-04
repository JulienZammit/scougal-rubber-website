"use client";
import CallToAction from "@/components/CallToAction";
import HeroProduct from "../../components/HeroProduct";
import FaqSection from "@/components/FaqSection";
import { TextContentProduct } from "../../components/TextContentProduct";
import { useEffect } from "react";
import Link from "next/link";

export default function SteelClient() {
  const faqs = [
    {
      id: 1,
      question: "What are the lead times for your steel fabrication projects?",
      answer:
        "Our lead times for steel fabrication projects are tailored to meet the demanding schedules of industrial and infrastructure projects. We work closely with our clients to ensure that production timelines align with project milestones, delivering precision-engineered steel solutions on time.",
      href: "#",
    },
    {
      id: 2,
      question: "What quality assurance standards do you follow?",
      answer:
        "At Scougal Rubber, our steel fabrication processes adhere to rigorous quality standards. We are AISC certified, and our production is NTPEP and CAGE certified. In addition, our operations comply with AS9100 and ISO 9001 standards, ensuring that every project meets the highest levels of quality and reliability.",
      href: "#",
    },
    {
      id: 3,
      question: "What are your production capabilities?",
      answer:
        "We have significantly expanded our steel fabrication capabilities by integrating advanced CNC machinery and a state-of-the-art welding department. This enables us to handle both small-scale and large-scale custom metal fabrication projects with high precision and efficiency, ensuring that every steel component is crafted to meet strict industry standards.",
      href: "#",
    },
    {
      id: 4,
      question: "Do you offer inventory programs for steel fabrication services?",
      answer:
        "Yes, Scougal Rubber offers flexible inventory programs tailored to the needs of our clients. Our efficient production processes and advanced manufacturing technologies allow us to manage large-scale projects and ensure a consistent supply of high-quality steel components, reducing downtime and ensuring project continuity.",
      href: "#",
    },
  ];

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
    {
      src: "/certification/cage.webp",
      alt: "CAGE Certification",
      defaultWidth: 63,
      defaultHeight: 75,
      rounded: true,
    },
  ];

  const contentText = [
    {
      title: "State-of-the-Art CNC Integration",
      description:
        "To meet evolving customer demands, we have introduced a state-of-the-art CNC machine into our manufacturing process. Featuring an intuitive software interface and automatic nesting capabilities, this advancement minimizes material waste, reduces lead times, and lowers production costs.",
    },
    {
      title: "Enhanced Efficiency & Customer Satisfaction",
      description:
        "This innovative technology ensures higher efficiency and customer satisfaction, positioning Scougal Rubber as a leader in advanced steel fabrication.",
    },
  ];

  useEffect(() => {
    document.body.style.overflow = "unset";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeroProduct
        title="Steel Fabrication Services"
        subtitle="Custom metal fabrication, CNC machining, and industrial steel solutions — Certified by AISC, NTPEP and CAGE 9SFQ3"
        certifications={certifications}
      />
      <TextContentProduct contentText={contentText} />
      <div className="p-10 md:mb-0 mb-32">
        <CallToAction />
      </div>
      <div className="p-10">
        <FaqSection faqs={faqs} />
      </div>
      <div className="text-center py-8">
        <p className="text-lg text-slate-700">
          Looking for Steel Fabrication Services near you? Contact Scougal Rubber, located at 885 Denmark Drive Suite 103, McCarran, NV – proudly serving clients across the US.
        </p>
        <Link href="/contact-us" className="text-blue-500 underline">Get in Touch</Link>
      </div>
    </>
  );
}

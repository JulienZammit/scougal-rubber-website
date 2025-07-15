"use client";
import CallToAction from "@/components/CallToAction";
import FaqSection from "@/components/FaqSection";
import ProductDisplay from "../../components/ProductDisplay";
import { TextContentProduct } from "../../components/TextContentProduct";
import HeroProduct from "../../components/HeroProduct";
import { useEffect } from "react";
import Link from "next/link";

export default function RampsClient() {
  const faqs = [
    {
      id: 1,
      question: "How do Scougal Ramps work?",
      answer:
        "Scougal Ramps clip securely onto steel road plates without the need for adhesives or cold mix. Once in place, they provide a smooth, safe transition between the road surface and the plate edge—eliminating tripping hazards, reducing vehicle impact, and making site cleanup significantly faster and more efficient.",
      href: "#",
    },
    {
      id: 2,
      question: "What sizes are available?",
      answer:
        "Our standard ramp size is 60\", designed to fit most common road plates. Custom lengths or special configurations may be available upon request. Contact us to discuss your specific jobsite needs or municipal compliance requirements.",
      href: "#",
    },
    {
      id: 3,
      question: "What are the lead times for Scougal Ramps?",
      answer:
        "Standard Scougal Ramps are typically available for immediate shipment or within 1–2 weeks, depending on current stock. For bulk orders or custom specifications, we will provide a project-specific lead time.",
      href: "#",
    },
    {
      id: 4,
      question: "What are the benefits of using Scougal Ramps over cold mix?",
      answer:
        "Scougal Ramps reduce or eliminate the need for cold mix, saving you both time and money. You'll no longer need to apply and remove material daily, which streamlines site management and minimizes labor. In addition, the ramps reduce cold mix waste and disposal costs—helping your operation become more sustainable and compliant with green construction practices.",
      href: "#",
    },
    {
      id: 5,
      question: "Are Scougal Ramps reusable?",
      answer:
        "Yes. Scougal Ramps are engineered for durability and long-term reusability. Built to withstand daily jobsite abuse and heavy traffic, a single ramp can be reused across multiple projects, often paying for itself in just a few weeks.",
      href: "#",
    },
    {
      id: 6,
      question: "Are these ramps compliant with safety regulations?",
      answer:
        "Scougal Ramps are designed with safety in mind. They create a smooth transition that reduces trip hazards and vehicle impact, helping contractors meet safety expectations for public works and municipal road projects. Always verify with local jurisdictional requirements to ensure full compliance.",
      href: "#",
    },
    {
      id: 7,
      question: "Can Scougal Ramps help prevent damage claims?",
      answer:
        "Absolutely. Because they eliminate the need for loose cold mix, Scougal Ramps significantly reduce the risk of material breakage, fragmentation, and flying debris—common causes of damage claims involving vehicles or pedestrians.",
      href: "#",
    },
    {
      id: 8,
      question: "Do you offer volume pricing or inventory programs?",
      answer:
        "Yes. We offer volume pricing for contractors, municipalities, and utility providers who order in bulk. We can also work with you to establish inventory or stocking programs to keep your fleet ready to deploy.",
      href: "#",
    },
  ];

  const image = [
    {
      src: "/ramps/ramps.webp",
      alt: "Scougal Ramps for Efficient Road Plate Management",
      defaultWidth: 350,
      defaultHeight: 145,
      rounded: false,
    },
  ];

  const contentText = [
    {
      title: "Ramp up your productivity.",
      description:
        "The Scougal Ramp clips quickly onto a steel road plate and stays securely in place. No more shoveling cold mix – the covering process is faster, letting you keep a hole open longer and work deeper into the day. It’s neat, clean, safe, and built to withstand heavy traffic.",
    },
    {
      title: "Clean up your worksite.",
      description:
        "Scougal Ramps are engineered for durability and pay for themselves in weeks. A single standard 60” ramp reduces the need to lay down cold mix every evening and remove it the next day, significantly streamlining your workflow.",
    },
    {
      title: "Be green and eliminate disposal issues.",
      description:
        "Our reusable Scougal Ramp minimizes the need for disposing of cold mix, helping to reduce oil-based material waste at your construction site.",
    },
    {
      title: "Save cold cash on cold mix and eliminate claims.",
      description:
        "The Scougal Ramp’s robust design prevents breakage and fragmentation, thereby eliminating damage claims related to flying asphalt.",
    },
  ];

  const content = [
    {
      ImageMain: "/ramps/ramps-slogan.webp",
      ImageMainHeight: 121,
      ImageMainWidth: 385,
      title: "Ramp up your productivity.",
      images: [
        "/ramps/ramp1.webp",
        "/ramps/ramp2.webp",
        "/ramps/ramp3.webp"
      ],
      paragraphs: [
        "The Scougal Ramp is designed to revolutionize your workflow by offering a durable, easy-to-use solution for managing road plates efficiently and safely. Its innovative design reduces cold mix usage and enhances overall site safety."
      ],
    },
  ];

  useEffect(() => {
    document.body.style.overflow = "unset";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeroProduct
        title="Scougal Ramps - Efficient Road Plate Management"
        subtitle="Ramp up your productivity with our durable, reusable ramps"
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
      <div className="text-center py-8">
        <p className="text-lg text-slate-700">
          Looking for Ramps near you? Contact Scougal Rubber, located at 885 Denmark Drive Suite 103, McCarran, NV – proudly serving clients across the US.
        </p>
        <Link href="/contact-us" className="text-blue-500 underline">Get in Touch</Link>
      </div>
    </>
  );
}

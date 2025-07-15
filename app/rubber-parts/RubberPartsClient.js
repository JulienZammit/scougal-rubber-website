"use client";
import CallToAction from "@/components/CallToAction";
import HeroProduct from "../../components/HeroProduct";
import ProductDisplay from "../../components/ProductDisplay";
import { TextContentProduct } from "../../components/TextContentProduct";
import FaqSection from "@/components/FaqSection";
import { useEffect } from "react";
import Link from "next/link";

export default function RubberPartsClient() {
  const faqs = [
    {
      id: 1,
      question: "What types of industrial rubber products do you manufacture?",
      answer:
        "Scougal Rubber designs and produces a wide range of custom-molded rubber components for industrial, marine, aerospace, military, and food processing applications. Our product capabilities include vibration isolators, shock mounts, bumpers, gaskets, bushings, molded sleeves, and more. Each product is engineered for the specific performance, environmental, and regulatory requirements of its application.",
      href: "#",
    },
    {
      id: 2,
      question: "Do you offer engineering support for custom parts?",
      answer:
        "Yes. Our in-house engineering team works directly with clients to provide material recommendations, design consultation, and manufacturing feasibility guidance. From initial concept to production tooling, we help ensure every component meets your durability, compliance, and cost-efficiency goals.",
      href: "#",
    },
    {
      id: 3,
      question: "What are your quality assurance and certification standards?",
      answer:
        "Scougal Rubber is CAGE Code registered and adheres to strict quality protocols for both commercial and government contracts. We maintain certifications with ISO9001, AS9100, NTPEP, PennDOT, and other regulatory bodies as required. For industrial clients, we offer full traceability, material certifications, and custom testing solutions upon request.",
      href: "#",
    },
    {
      id: 4,
      question: "What materials do you work with?",
      answer:
        "We mold and bond a broad range of elastomers including natural rubber, EPDM, neoprene, nitrile, SBR, silicone, and high-performance compounds such as Viton®. We also offer rubber-to-metal bonding, fabric-reinforced elastomers, and specialty formulations tailored to extreme temperature, chemical, or load-bearing environments.",
      href: "#",
    },
    {
      id: 5,
      question: "What are your lead times?",
      answer:
        "Lead times depend on part complexity, order volume, and current production load. Standard molded components typically ship in 4 to 6 weeks. Custom parts requiring tooling or testing may take longer. We're happy to provide project-specific lead time estimates upon review.",
      href: "#",
    },
    {
      id: 6,
      question: "Can you support government or defense-related projects?",
      answer:
        "Yes. Scougal Rubber holds a valid CAGE Code and has a long-standing history of supporting defense, aerospace, and government infrastructure projects. Our team understands the compliance, documentation, and procurement requirements specific to federal and defense-related work.",
      href: "#",
    },
    {
      id: 7,
      question: "Do you offer stocking or fulfillment programs?",
      answer:
        "We offer flexible inventory programs for high-volume and recurring orders. Whether you need just-in-time fulfillment, safety stock solutions, or multi-site drop shipments, our team can develop a stocking program tailored to your operational needs.",
      href: "#",
    },
    {
      id: 8,
      question: "How do I get started with a custom part?",
      answer:
        "Simply contact us with your drawings, specs, or a sample. Our engineering team will evaluate your requirements and respond with recommendations, quotes, and next steps. We're equipped to handle both prototype development and full-scale production.",
      href: "#",
    },
  ];

  const certifications = [
    {
      src: "/certification/as9100.webp",
      alt: "AS9100 Certification",
    },
    {
      src: "/certification/cage.webp",
      alt: "CAGE Certification",
    },
    {
      src: "/certification/iso9001.webp",
      alt: "ISO 9001 Certification",
    },
    {
      src: "/certification/Seal-Compliassure_Confirm.webp",
      alt: "Seal Compliasure Confirm Certification",
    },
  ];

  const contentText = [
    {
      title: "Versatile Applications of Scougal Rubber’s Parts",
      description:
        "Scougal Rubber’s parts are used in diverse industries including automotive, marine, aerospace, food processing, and military applications. Our products meet the rigorous standards required for government projects and advanced industrial manufacturing.",
    },
    {
      title: "Expert Assistance and Material Selection",
      description:
        "Our experienced team offers expert guidance on molding techniques and polymer selection. We help you choose the best materials and manufacturing processes to ensure durability, performance, and compliance with industry standards.",
    },
    {
      title: "Responsive Inventory Programs",
      description:
        "We provide inventory programs tailored to your just-in-time manufacturing needs. Our rapid response and commitment to timely delivery ensure that your production schedule remains on track, even under the most demanding circumstances.",
    },
  ];

  const content = [
    {
      ImageMain: "/rubber/molded.webp",
      ImageMainWidth: 217,
      ImageMainHeight: 145,
      title: "Molded Products",
      images: [
        "/molded/image1.webp",
        "/molded/image2.webp",
      ],
      paragraphs: [
        "Scougal Rubber supplies molded parts to a variety of industries, including automotive, marine, food processing, aerospace, military and more. We specialize in vulcanizing rubber to metal and offer custom molded rubber solutions designed to meet government project requirements and aerospace standards.",
        "Our wide range of proven house rubber compounds, including Natural Rubber, Neoprene, EPDM, Nitrile, Urethane, and SBR, can be tailored to your exact specifications. With over 100 years of manufacturing experience, our expertise in industrial rubber manufacturing ensures precision, durability, and compliance with industry standards.",
      ],
    },
    {
      ImageMain: "/rubber/roller.webp",
      ImageMainWidth: 281,
      ImageMainHeight: 180,
      title: "Rollers",
      images: [
        "/rollers/image1.webp",
        "/rollers/image2.webp",
      ],
      paragraphs: [
        "Scougal Rubber offers custom rubber rollers that are hot vulcanized to ensure long-lasting performance. Engineered to exact dimensions with a variety of industry-leading materials, our rubber rollers are ideal for aerospace, marine, and food processing applications.",
      ],
    },
    {
      ImageMain: "/rubber/mandrel.webp",
      ImageMainWidth: 217,
      ImageMainHeight: 140,
      title: "Hand-Built Mandrel Products",
      images: [
        "/mandrel/image1.webp",
        "/mandrel/image2.webp",
        "/mandrel/image3.webp",
      ],
      paragraphs: [
        "Our experienced craftsmen wrap and cure various rubber compounds on a mandrel to produce custom rubber boots, tubes, and other shapes. We stock a comprehensive range of mandrels for common diameters. Hand-built mandrel products are autoclave-cured and demonstrate our commitment to high-performance, custom rubber solutions.",
        "Scougal also offers the capability to vulcanize rubber to steel or aluminum, incorporating reinforcing plies as needed. Our hand-built solutions are trusted in demanding environments, from industrial manufacturing to government projects and aerospace applications.",
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
        title="Industrial Rubber Parts & Custom Molded Solutions"
        subtitle="High-performance rubber components for aerospace, transportation & industrial applications"
        certifications={certifications}
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
          Looking for Rubber Parts near you? Contact Scougal Rubber, located at 885 Denmark Drive Suite 103, McCarran, NV – proudly serving clients across the US.
        </p>
        <Link href="/contact-us" className="text-blue-500 underline">Get in Touch</Link>
      </div>
    </>
  );
}

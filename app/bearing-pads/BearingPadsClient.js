"use client";
import CallToAction from "@/components/CallToAction";
import FaqSection from "@/components/FaqSection";
import HeroProduct from "../../components/HeroProduct";
import ProductDisplay from "../../components/ProductDisplay";
import { TextContentProduct } from "../../components/TextContentProduct";
import { useEffect } from "react";
import Link from "next/link";

export default function BearingPadsClient() {
  const faqs = [
    {
      id: 1,
      question: "What are the lead times for your products?",
      answer:
        "Lead times vary depending on the complexity and volume of the order, but we strive to maintain competitive turnaround times across all product lines. Our vertically integrated operations and in-house machining, fabrication, and molding allow us to control production schedules and reduce delays. For standard elastomeric bearings and commonly ordered components, lead times typically range from 4 to 8 weeks. Custom steel-fabricated products may require additional scheduling time—please contact us for an accurate estimate.",
      href: "#",
    },
    {
      id: 2,
      question: "What are your quality assurance standards?",
      answer:
        "Scougal Rubber operates under rigorous quality protocols to ensure compliance with AISC, AASHTO, DOT, and project-specific standards. We employ robust in-house testing, documentation, and material traceability systems. Our recent expansion into precision steel plate machining and fabrication has brought additional QA measures, including flatness tolerances, weld inspections, and dimensional verification using state-of-the-art tools. Our goal is simple: every product we ship meets or exceeds the specifications our client's demand.",
      href: "#",
    },
    {
      id: 3,
      question: "What are your production capabilities?",
      answer:
        "We specialize in manufacturing elastomeric bearings, laminated bearing pads, seismic isolation systems, —now complemented by advanced metalworking capabilities. With the integration of steel plate machining and fabrication into our infrastructure, we are now positioned to deliver complete bearing assemblies and structural components tailored for modern bridge construction, heavy civil projects, and specialty applications.",
      href: "#",
    }
  ];

  const certifications = [
    { src: "/certification/aisc.webp", alt: "AISC Certification" },
    { src: "/certification/NTPEP.webp", alt: "NTPEP Certification" },
    { src: "/certification/PennDOT.webp", alt: "PennDOT Certification" },
    { src: "/certification/cage.webp", alt: "CAGE Certification" },
    {
      src: "/certification/Seal-Compliassure_Confirm.webp",
      alt: "Seal Compliasure Confirm Certification",
    },
  ];

  const contentText = [
    {
      title: "Introduction to Elastomeric Bearing Pads for Bridge & Seismic Isolation",
      description:
        "Since their US introduction in the 1950’s, elastomeric bearing pads have become the standard for both steel and concrete bridge structures throughout North America. Manufactured with a service life that typically exceeds that of the bridge superstructure, these pads continue to set the benchmark in durability and performance.",
    },
    {
      title: "Steel-Reinforced Elastomeric Bearing Pads – NTPEP & PennDOT Approved",
      description:
        "Bearings with a high proportion of steel shims relative to rubber volume handle greater loads and shear forces. Wider shim spacing also provides excellent vibration isolation – a feature particularly valued in theaters and concert halls. Engineers can adjust these variables to design a bearing that meets almost any application requirement.",
    },
    {
      title: "Manufacturing and Testing Excellence",
      description:
        "Our state-of-the-art manufacturing and testing processes ensure that every bearing pad meets stringent performance standards. From bridge bearings compensating for rotations, loads, and horizontal movements to components used in light rail and industrial projects, we can produce virtually any shape or size to suit your needs.",
    },
    {
      title: "Customized Solutions for Unique Applications",
      description:
        "Whether for bridge bearings that accommodate rotations and loads or for specialized industrial applications, our custom solutions are engineered to deliver precise performance. We work closely with our clients to tailor designs that meet specific project requirements.",
    },
  ];

  const content = [
    {
      ImageMain: "/bearing/bearingPad_loadPlate_217.jpg",
      ImageMainWidth: 217,
      ImageMainHeight: 108,
      title: "Bearing Pads with Load Plates",
      images: [
        "/bearing/load-plates/image1.webp",
        "/bearing/load-plates/image2.webp",
      ],
      paragraphs: [
        "In many applications, elastomeric bearing pads are vulcanized directly to heavy steel sole plates and/or masonry plates. This configuration allows for a positive connection by welding and/or bolting, while still permitting the desired range of motion. For sloped bridge spans, the top sole plate is tapered to match the bridge’s slope. Anchor bolts attach the masonry plate and may continue through the sole plate to restrict movement. Various restrainers can also be incorporated to limit motion.",
        "For bridge rehabilitation projects, elastomeric bearings are frequently chosen to replace damaged or frozen steel bearing assemblies. Because an elastomeric bearing occupies significantly less space than an equivalent rocker bearing, Scougal supplies fabricated steel bolsters to bridge the gap between the bearing seat and the bridge superstructure. For fast-track repair emergencies, we pride ourselves on meeting tight deadlines for time-critical projects.",
        "In addition, our bridge bearing pads are engineered to meet the rigorous standards of local government and Department of Transportation projects, ensuring full compliance with AASHTO M-251 and NTPEP requirements."
      ],
    },
    {
      ImageMain: "/bearing/laminatedPad.jpg",
      ImageMainWidth: 174,
      ImageMainHeight: 177,
      title: "Laminated Bearing Pads",
      images: [
        "/bearing/laminated/image1.webp",
        "/bearing/laminated/image2.webp",
        "/bearing/laminated/image3.webp",
      ],
      paragraphs: [
        "Steel-reinforced elastomeric bearing pads incorporate multiple thin steel layers between rubber layers. The manufacturing process uses heat and pressure to vulcanize the materials into a homogeneous unit. The steel reinforcements limit lateral bulging of the elastomer and significantly enhance longitudinal movement, compressive strength, and rotational capacity.",
        "Bearings are available in either neoprene or natural rubber, as specified in AASHTO requirements for highway bridges. They typically range in durometer from 50 to 70 based on the required modulus, and steel shim thicknesses are available in gauges such as 10, 11, 12 or 14 per ASTM A1011. Flexible manufacturing techniques even allow for designs with holes or clipped corners to accommodate special conditions.",
      ],
    },
    {
      ImageMain: "/bearing/pads_IMG_0380_243.jpg",
      ImageMainWidth: 243,
      ImageMainHeight: 94,
      title: "Plain Pads",
      images: ["/bearing/plain/image1.webp", "/bearing/plain/image2.webp"],
      paragraphs: [
        "Scougal Rubber Corporation offers high-quality neoprene (polychloroprene) and natural rubber (polyisoprene) bearing pad materials that meet AASHTO and other industry specifications. Plain bearing pads are used for various applications in the bridge and construction industries, allowing for expansion and contraction of precast and steel components. Due to their relatively low compressive strength, plain elastomeric bearings are typically used in shorter span bridges or as a continuous strip under box beams or concrete slabs.",
      ],
    },
    {
      ImageMain: "/bearing/slider_IMG_0372_183.jpg",
      ImageMainWidth: 183,
      ImageMainHeight: 183,
      title: "Slide Bearings",
      images: ["/bearing/slide/image1.webp", "/bearing/slide/image2.webp"],
      paragraphs: [
        "When the limits of steel-reinforced elastomeric bearings are reached, PTFE slide bearings become the choice for many designers. The steel-reinforced pad is topped with a steel plate that is permanently vulcanized to the elastomer, with a PTFE element either bonded to or recessed into the plate. This PTFE element, which can be sized smaller and dimpled to improve friction, slides against a polished stainless steel surface that is welded to a steel plate on the supported member. This design allows for larger longitudinal and transverse movements compared to standard laminated pads.",
      ],
    },
  ];

  useEffect(() => {
    document.body.style.overflow = 'unset';
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeroProduct
        title="Elastomeric Bearing Pads for Bridges, Seismic & Industrial Applications"
        subtitle="Engineered for durability, precision, and compliance with AASHTO, NTPEP, and DOT standards"
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
          Looking for Bridge Bearing Manufacturers near you? Contact Scougal Rubber, located at 885 Denmark Drive Suite 103, McCarran, NV – proudly serving clients across the US.
        </p>
        <Link href="/contact-us" className="text-blue-500 underline">Get in Touch</Link>
      </div>
    </>
  );
}

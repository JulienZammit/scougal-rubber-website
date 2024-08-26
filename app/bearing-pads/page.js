"use client";
import CallToAction from "@/components/CallToAction";
import HeroProduct from "../../components/HeroProduct";
import ProductDisplay from "../../components/ProductDisplay";
import {TextContentProduct} from "../../components/TextContentProduct";
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

  const certifications = [
    { src: "/certification/aisc.webp", alt: "AISC Certification" },
    { src: "/certification/NTPEP.webp", alt: "NTPEP Certification" },
    { src: "/certification/PennDOT.webp", alt: "PennDOT Certification" },
    { src: "/certification/cage.webp", alt: "CAGE Certification" },
    { src: "/certification/Seal-Compliassure_Confirm.webp", alt: "Seal Compliasure Confirm Certification" },
  ];

  const contentText = [
    {
      title: "Introduction to Elastomeric Bearing Pads",
      description:
        "Since their US introduction in the 1950’s elastomeric bearing pads have become the standard for both steel and concrete bridge structures throughout North America. They are manufactured with a service life that typically exceeds that of the bridge superstructure itself. So far as we know, the first use of rubber bearings in a bridge was in Australia in 1889; a century later, these bearings were reportedly still in service.", 
    },
    {
      title: "Steel Shims in Bearings",
      description:
        "Bearings with a large number of steel shims relative to the overall volume of rubber can handle higher loads and shear forces; by contrast, bearings with wider spacing of the steel shims can provide excellent vibration isolation characteristics, and are often used in theaters and concert halls. By manipulating a small number of variables, engineers can design an elastomeric bearing to suit most any application.",
    },
    {
      title: "Manufacturing and Testing",
      description:
        "Simply put, our ability to manufacture and test bearing pads for multiple applications has become our signature. From bridge bearings that require compensation for rotations, loads, and horizontal movements to buildings, light rail projects and machinery that compensate for vibrations, we can make virtually any shape or size of product desired.",
    },
    {
      title: "Customized Solutions",
      description:
        "From bridge bearings that require compensation for rotations, loads, and horizontal movements to buildings, light rail projects and machinery that compensate for vibrations, we can make virtually any shape or size of product desired.",
    }
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
        "In many applications, elastomeric bearing pads are vulcanized directly to heavy steel sole plates and/or masonry plates. This configuration allows for a positive connection by welding and/or bolting, while still allowing the desired range of motion. For sloped bridge spans, the top sole plate is tapered to match the slope of the bridge. Anchor bolts are used to attach the masonry plate and sometimes continue up through the sole plate to restrict movement. In addition, various restrainers can be incorporated to limit the range of motion. There is a wide range of designs to suit a variety of applications.",
        "For bridge rehabilitation projects, elastomeric bearings are frequently chosen to replace damaged or frozen steel bearing assemblies. Because an elastomeric bearing takes up much less space than an equivalent rocker bearing, Scougal provides the fabricated steel bolsters to fill in the gap between the bearing seat and the bridge superstructure. For fast track bridge repair emergencies, we take pride in our ability to meet tight deadlines for time critical projects.",
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
        "/bearing/laminated/image3.webp"
      ],
      paragraphs: [
        "Steel-reinforced elastomeric bearing pads incorporate multiple thin steel layers between the layers of rubber. The manufacturing process uses heat and pressure to vulcanize the materials together into a homogenous unit. The presence of reinforcements limits the ability of the elastomer to bulge at the sides, and results in greatly increased longitudinal movement, compressive strength, and rotational capacity.",
        "Bearings come in either Neoprene or natural rubber, and are commonly called out in the AASHTO specification for highway bridges. They range in durometer from 50 to 70 depending on the required modulus. Steel shim thicknesses are typically 10, 11, 12 or 14 gauge per ASTM A1011. Flexible manufacturing techniques allow for bearings with holes or clipped corners in order to accommodate special conditions.",
      ],
    },
    { ImageMain: "/bearing/pads_IMG_0380_243.jpg",
      ImageMainWidth: 243,
      ImageMainHeight: 94,
      title: "Plain Pads",
      images: [],
      paragraphs: [
        "Scougal Rubber Corporation offers high quality Neoprene (polychloroprene) and natural rubber (polyisoprene) bearing pad material to meet AASHTO and many other specifications. Plain bearing pads are used for a variety of purposes in the bridge and construction industries. They allow for expansion and contraction of precast and steel components. The amount of movement depends on the thickness of the bearing pad. Plain elastomeric bearings are the least expensive bearing pad system. Due to their relatively low compressive strength, they are used in shorter span bridges or as a continuous strip under box beams or concrete slabs.",
      ],
      images: [
        "/bearing/plain/image1.webp",
        "/bearing/plain/image2.webp",
      ],
    },
    {
      ImageMain: "/bearing/slider_IMG_0372_183.jpg",
      ImageMainWidth: 183,
      ImageMainHeight: 183,
      title: "Slide Bearings",
      images: [
        "/bearing/slide/image1.webp",
        "/bearing/slide/image2.webp",
      ],
      paragraphs: [
        "When the practical limits of steel-reinforced elastomeric bearings are exceeded, PTFE slide bearings are the choice of many designers. The steel-reinforced bearing pad is topped with a steel plate that is permanently vulcanized to the elastomer. A PTFE element is then either bonded to the surface of the plate or partially recessed into the plate. The PTFE can be sized smaller than the bearing and can be dimpled to improve the coefficient of friction. In application, the PTFE element slides against a polished stainless steel upper surface, which is welded to the underside of a steel plate attached to the supported member. PTFE slide bearings allow for the design of larger longitudinal and transverse movement than with a standard laminated pad.",
      ],
    },
  ];

  return (
    <>
      <HeroProduct
        title="Bearing Pads" 
        subtitle="Quality, service, and reliability, have been the 'Scougal Standard'"
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
    </>
  );
}

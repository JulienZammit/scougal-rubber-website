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
    // {
    //   src: "/certification/aisc.webp",
    //   alt: "AISC Certification",
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
        "Scougal Rubber’s parts can be found everywhere from playground equipment to ski lifts to food processing factories. We supply cabin pressure test kits for commercial aircraft and custom floor mats for military vehicles. Whether you need ten parts or ten thousand, our team of experienced professionals is ready to assist during the design phase of your next project.",
      
    },
    {
      title: "Expert Assistance and Material Selection",
      description:
        "We can offer suggestions regarding molding and polymer selection. Our experienced team is equipped to help you choose the best materials and techniques for your specific application, ensuring durability and performance. This expertise is crucial during the design phase to meet the unique requirements of each project.",
    },
    {
      title: "Responsive Inventory Programs",
      description:
        "In addition, we offer inventory programs to support your just-in-time manufacturing requirements. We pride ourselves on our ability to respond quickly in order to meet our customers’ tight deadlines on time-critical projects. Our commitment to timely delivery and customer satisfaction is at the core of our operations, ensuring that your production schedule remains on track.",
    },
  ]

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
        "Scougal Rubber supplies molded parts to a variety of industries, including automotive, marine, food processing, aerospace, military and many more. We specialize in vulcanizing rubber to metal. Our experienced team can guide you through the process of rubber compound selection to molding. We have the ability to respond quickly to meet all of your needs. In addition, we offer inventory programs to support your just-in-time manufacturing requirements.",
        "Scougal stocks a wide variety of proven house rubber compounds. Some of our house compounds are Natural Rubber, Neoprene, EPDM, Nitrile, Urethane and SBR which are offered in a variety of hardnesses. Custom compounds can be formulated to meet your exact specifications. If you own a mold, maximize your profits by contacting us for a competitive quote. With over 100 years of manufacturing experience, Scougal Rubber will exceed your expectations.",
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
        "Scougal custom covers new and used rolls for variety of industries. We will re-cover your rolls to exact dimensions with a long list of industry leading materials. The material is hot vulcanized to the core, then machined to your specifications ensuring the longest service life possible. We also offer a variety of grooving options."
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
        "Our experienced craftsmen can wrap and cure a variety of rubber compounds on a mandrel to form custom rubber boots, tubes and a variety of other shapes. We stock a comprehensive range of mandrels for common diameters. Hand-Built and Mandrel Items are autoclave-cured. Scougal can also form and bond rubber to nearly any metal surface. In addition to rollers, we can vulcanize rubber to steel or aluminum on hand-built parts. Fabric with reinforcing plies can be incorporated into the rubber wall according to your specifications. Scougal has produced hand-built conical boots for cable-stayed bridges throughout North America, South America and Europe. And the next time you eat a french fry, know that the potatoes were most likely sorted with a Scougal spinner and sliced through a Scougal built tube."
      ],
    },
  ];

  return (
    <>
    <HeroProduct
        title="Industrial Rubber Parts" 
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

"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import AnimatedModal from "./AnimatedModal"; // Assurez-vous que le chemin est correct

const content = [
  {
    title: "Versatile Applications of Scougal Rubber’s Parts",
    description:
      "Scougal Rubber’s parts can be found everywhere from playground equipment to ski lifts to food processing factories. We supply cabin pressure test kits for commercial aircraft and custom floor mats for military vehicles. Whether you need ten parts or ten thousand, our team of experienced professionals is ready to assist during the design phase of your next project.",
    triggerImage: "/rubber/molded.webp",
    triggerImageWidth: 217,
    triggerImageHeight: 145,
    modalTitle: "Molded Products",
    modalImages: [
      "/molded/image1.webp",
      "/molded/image2.webp",
    ],
    modalParagraphs: [
      "Scougal Rubber supplies molded parts to a variety of industries, including automotive, marine, food processing, aerospace, military and many more. We specialize in vulcanizing rubber to metal. Our experienced team can guide you through the process of rubber compound selection to molding. We have the ability to respond quickly to meet all of your needs. In addition, we offer inventory programs to support your just-in-time manufacturing requirements.",
      "Scougal stocks a wide variety of proven house rubber compounds. Some of our house compounds are Natural Rubber, Neoprene, EPDM, Nitrile, Urethane and SBR which are offered in a variety of hardnesses. Custom compounds can be formulated to meet your exact specifications. If you own a mold, maximize your profits by contacting us for a competitive quote. With over 100 years of manufacturing experience, Scougal Rubber will exceed your expectations.",
    ],
  },
  {
    title: "Expert Assistance and Material Selection",
    description:
      "We can offer suggestions regarding molding and polymer selection. Our experienced team is equipped to help you choose the best materials and techniques for your specific application, ensuring durability and performance. This expertise is crucial during the design phase to meet the unique requirements of each project.",
    triggerImage: "/rubber/roller.webp",
    triggerImageWidth: 281,
    triggerImageHeight: 180,
    modalTitle: "Rollers",
    modalImages: [
      "/rollers/image1.webp",
      "/rollers/image2.webp",
    ],
    modalParagraphs: [
      "Scougal custom covers new and used rolls for variety of industries. We will re-cover your rolls to exact dimensions with a long list of industry leading materials. The material is hot vulcanized to the core, then machined to your specifications ensuring the longest service life possible. We also offer a variety of grooving options."
    ],
  },
  {
    title: "Responsive Inventory Programs",
    description:
      "In addition, we offer inventory programs to support your just-in-time manufacturing requirements. We pride ourselves on our ability to respond quickly in order to meet our customers’ tight deadlines on time-critical projects. Our commitment to timely delivery and customer satisfaction is at the core of our operations, ensuring that your production schedule remains on track.",
    triggerImage: "/rubber/mandrel.webp",
    triggerImageWidth: 217,
    triggerImageHeight: 140,
    modalTitle: "Hand-Built Mandrel Products",
    modalImages: [
      "/mandrel/image1.webp",
      "/mandrel/image2.webp",
      "/mandrel/image3.webp",
    ],
    modalParagraphs: [
      "Our experienced craftsmen can wrap and cure a variety of rubber compounds on a mandrel to form custom rubber boots, tubes and a variety of other shapes. We stock a comprehensive range of mandrels for common diameters. Hand-Built and Mandrel Items are autoclave-cured. Scougal can also form and bond rubber to nearly any metal surface. In addition to rollers, we can vulcanize rubber to steel or aluminum on hand-built parts. Fabric with reinforcing plies can be incorporated into the rubber wall according to your specifications. Scougal has produced hand-built conical boots for cable-stayed bridges throughout North America, South America and Europe. And the next time you eat a french fry, know that the potatoes were most likely sorted with a Scougal spinner and sliced through a Scougal built tube."
    ],
  },
];

export function StickyScrollRubberParts() {
  return (
    <StickyScroll
      content={content.map((item, index) => ({
        ...item,
        content: (
          <AnimatedModal
            triggerImage={item.triggerImage}
            title={item.modalTitle}
            images={item.modalImages}
            paragraphs={item.modalParagraphs}
            specialImages={item.specialImages || []}
            triggerImageWidth={item.triggerImageWidth}
            triggerImageHeight={item.triggerImageHeight}
          />
        ),
      }))}
    />
  );
}

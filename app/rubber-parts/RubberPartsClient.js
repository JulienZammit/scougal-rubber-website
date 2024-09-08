"use client";
import CallToAction from "@/components/CallToAction";
import HeroProduct from "../../components/HeroProduct";
import ProductDisplay from "../../components/ProductDisplay";
import {TextContentProduct} from "../../components/TextContentProduct";
import FaqSection from "@/components/FaqSection";

export default function RubberPartsClient() {
  const faqs = [
    {
      id: 1,
      question: "What are the lead times for your products?",
      answer:
        "Our lead times for products related to bridge and elevated roadway construction are aligned with your specific project timelines and site scheduling requirements. With construction set dates being a key factor, we are fully transparent and upfront with customers regarding delivery schedules and milestones. To further enhance our service, our dedicated project coordinator will work closely with you, ensuring that all aspects of the project are in sync with your site plans and timelines. As the #1 company in the industry for customer service, we pride ourselves on being highly responsive and focused on meeting the needs of our clients. Customers can expect a response from our staff within 24 hours or sooner, ensuring seamless communication and coordination throughout the project. Our goal is to not only meet your deadlines but also exceed expectations by delivering high-quality products exactly when you need them, keeping your construction schedule on track.",
      href: "#",
    },
    {
      id: 2,
      question: "What are your quality assurance standards?",
      answer:
        "At Scougal Rubber Corporation, we uphold rigorous quality assurance standards, certified through the American Institute of Steel Construction (AISC). Our AISC certification reflects our commitment to producing high-quality products that meet or exceed industry requirements. Our comprehensive quality assurance process includes detailed inspection plans (IP), non-destructive testing (NDT), and destructive testing, along with full material traceability to ensure compliance with both customer specifications and regulatory standards. We are also fully aligned with the 'Buy American'standard, ensuring that all materials used in our products are sourced domestically, supporting U.S. manufacturing and infrastructure projects. In addition to our stringent inspection processes, we operate a world-class laboratory that performs both destructive and non-destructive testing to guarantee the integrity of the materials used in our finished products. This testing ensures that our components deliver optimal performance and durability. Our QA professionals carefully monitor each step of production, from raw material verification to final product inspection, ensuring that our customers receive products built to the highest standards of excellence and reliability.",
      href: "#",
    },
    {
      id: 3,
      question: "What are your production capabilities?",
      answer:
        "Scougal Rubber Corporation has significantly expanded its capabilities by incorporating steel fabrication into its portfolio, now equipped with advanced CNC machinery designed for handling larger, more complex projects. This strategic addition enables the company to tackle an even wider range of industrial demands, providing precision and efficiency for both small-scale and large-scale fabrications. Alongside this, Scougal has invested in a state-of-the-art welding department, which ensures perfect traceability on all products from start to finish, a crucial factor for industries requiring high-quality standards and accountability. With these new resources, Scougal can deliver projects of increased scale and complexity, meeting its customers' evolving needs without compromising on quality or precision. By enhancing its production capacity and introducing cutting-edge steel fabrication technologies, Scougal Rubber Corporation continues to prioritize customer satisfaction. The company’s commitment to meeting tight deadlines and maintaining the highest levels of product quality positions it as a reliable partner for industries that demand both excellence and speed. The seamless integration of CNC machining and a robust welding department allows Scougal to meet the ever-growing requirements of its clients while ensuring every product is meticulously crafted and delivered on time. This expansion underscores Scougal’s dedication to innovation and its resolve to exceed customer expectations in terms of both quality and service.",
      href: "#",
    },
    {
      id: 4,
      question: "Do you offer inventory programs?",
      answer:
        "Scougal Rubber Corporation stands out for metal fabrication needs due to our ability to deliver precision and efficiency at scale. Our team is not only skilled in handling complex fabrication but is also dedicated to adapting to the unique requirements of each project. From start to finish, we ensure seamless collaboration, with clear communication and fast response times that keep your project on track. With our advanced CNC machinery and highly skilled welding teams, we are equipped to take on challenging metal fabrication tasks while maintaining strict adherence to industry standards. What truly sets us apart is our customer-first approach, ensuring we’re not just a vendor but a reliable partner in your project’s success. We provide full transparency throughout the process, delivering quality materials and expert craftsmanship that meets your specifications. Our long-standing reputation for excellent service and our ability to handle both large and small-scale projects make us the ideal choice for your metal fabrication needs. When you choose Scougal, you’re opting for a company that values precision, reliability, and a commitment to exceeding your expectations.",
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

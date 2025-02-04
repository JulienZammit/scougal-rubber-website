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
        "Our lead times for products related to bridge and elevated roadway construction are aligned with your specific project timelines and site scheduling requirements. With construction set dates being a key factor, we are fully transparent and upfront with customers regarding delivery schedules and milestones. To further enhance our service, our dedicated project coordinator will work closely with you, ensuring that all aspects of the project are in sync with your site plans and timelines. As the #1 company in the industry for customer service, we pride ourselves on being highly responsive and focused on meeting the needs of our clients. Customers can expect a response from our staff within 24 hours or sooner, ensuring seamless communication and coordination throughout the project. Our goal is to not only meet your deadlines but also exceed expectations by delivering high-quality products exactly when you need them, keeping your construction schedule on track.",
      href: "#",
    },
    {
      id: 2,
      question: "What are your quality assurance standards?",
      answer:
        "At Scougal Rubber Corporation, we uphold rigorous quality assurance standards, certified through the American Institute of Steel Construction (AISC). Our AISC certification reflects our commitment to producing high-quality products that meet or exceed industry requirements. Our comprehensive quality assurance process includes detailed inspection plans (IP), non-destructive testing (NDT), and destructive testing, along with full material traceability to ensure compliance with both customer specifications and regulatory standards. We are also fully aligned with the 'Buy American' standard, ensuring that all materials used in our products are sourced domestically, supporting U.S. manufacturing and infrastructure projects. In addition to our stringent inspection processes, we operate a world-class laboratory that performs both destructive and non-destructive testing to guarantee the integrity of the materials used in our finished products. This testing ensures that our components deliver optimal performance and durability. Our QA professionals carefully monitor each step of production, from raw material verification to final product inspection, ensuring that our customers receive products built to the highest standards of excellence and reliability.",
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

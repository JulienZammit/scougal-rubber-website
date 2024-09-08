"use client";
import CallToAction from "@/components/CallToAction";
import FaqSection from "@/components/FaqSection";
import HeroProduct from "../../components/HeroProduct";
import ProductDisplay from "../../components/ProductDisplay";
import { TextContentProduct } from "../../components/TextContentProduct";
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
        "/bearing/laminated/image3.webp",
      ],
      paragraphs: [
        "Steel-reinforced elastomeric bearing pads incorporate multiple thin steel layers between the layers of rubber. The manufacturing process uses heat and pressure to vulcanize the materials together into a homogenous unit. The presence of reinforcements limits the ability of the elastomer to bulge at the sides, and results in greatly increased longitudinal movement, compressive strength, and rotational capacity.",
        "Bearings come in either Neoprene or natural rubber, and are commonly called out in the AASHTO specification for highway bridges. They range in durometer from 50 to 70 depending on the required modulus. Steel shim thicknesses are typically 10, 11, 12 or 14 gauge per ASTM A1011. Flexible manufacturing techniques allow for bearings with holes or clipped corners in order to accommodate special conditions.",
      ],
    },
    {
      ImageMain: "/bearing/pads_IMG_0380_243.jpg",
      ImageMainWidth: 243,
      ImageMainHeight: 94,
      title: "Plain Pads",
      images: [],
      paragraphs: [
        "Scougal Rubber Corporation offers high quality Neoprene (polychloroprene) and natural rubber (polyisoprene) bearing pad material to meet AASHTO and many other specifications. Plain bearing pads are used for a variety of purposes in the bridge and construction industries. They allow for expansion and contraction of precast and steel components. The amount of movement depends on the thickness of the bearing pad. Plain elastomeric bearings are the least expensive bearing pad system. Due to their relatively low compressive strength, they are used in shorter span bridges or as a continuous strip under box beams or concrete slabs.",
      ],
      images: ["/bearing/plain/image1.webp", "/bearing/plain/image2.webp"],
    },
    {
      ImageMain: "/bearing/slider_IMG_0372_183.jpg",
      ImageMainWidth: 183,
      ImageMainHeight: 183,
      title: "Slide Bearings",
      images: ["/bearing/slide/image1.webp", "/bearing/slide/image2.webp"],
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

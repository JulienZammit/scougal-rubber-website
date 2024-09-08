"use client";
import CallToAction from "@/components/CallToAction";
import HeroProduct from "../../components/HeroProduct";
import FaqSection from "@/components/FaqSection";
export default function SteelClient() {
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
    // { src: "/certification/as9100.webp", alt: "AS9100 Certification", defaultWidth: 100, defaultHeight: 100, rounded: false },
    {
      src: "/certification/cage.webp",
      alt: "CAGE Certification",
      defaultWidth: 63,
      defaultHeight: 75,
      rounded: true,
    },
    // { src: "/certification/iso9001.webp", alt: "ISO 9001 Certification", defaultWidth: 100, defaultHeight: 100, rounded: false },
    
  ];
  return (
    <>
      <HeroProduct
        title="Steel Fabrication" 
        subtitle="Quality, service, and reliability, have been the 'Scougal Standard'"
        certifications={certifications}
      />
      <div className="p-10 md:mb-0 mb-32">
        <CallToAction />
      </div>

      <div className="p-10">
        <FaqSection faqs={faqs} />
      </div>
    </>
  );
}

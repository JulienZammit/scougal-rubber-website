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

"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Image from "next/image";
import HeroAboutContact from "@/components/HeroAboutContact";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "react-modal";

const projects = [
  {
    name: "Bayway & Caloosahatchee Bridge",
    slides: [
      { type: "video", src: "https://myblogimages.blob.core.windows.net/videos/Bay_Bridge.webm" },
      { type: "image", src: "/Bayway/bw1.webp" },
      { type: "image", src: "/Bayway/bw2.webp" },
      { type: "image", src: "/Bayway/bw3.webp" },
      { type: "image", src: "/Bayway/bw4.webp" }
    ]
  },
  {
    name: "Hood Canal",
    slides: [
      { type: "image", src: "/Hood Canal/September 2008 001.webp" },
      { type: "image", src: "/Hood Canal/September 2008 002.webp" },
      { type: "image", src: "/Hood Canal/September 2008 007.webp" },
      { type: "image", src: "/Hood Canal/September 2008 008.webp" }
    ]
  },
  {
    name: "Advanced American",
    slides: [
      { type: "image", src: "/advanced-american/1A.webp" },
      { type: "image", src: "/advanced-american/1B.webp" },
      { type: "image", src: "/advanced-american/1C.webp" },
      { type: "image", src: "/advanced-american/1D.webp" },
      { type: "image", src: "/advanced-american/1N.webp" },
      { type: "image", src: "/advanced-american/1O.webp" },
      { type: "image", src: "/advanced-american/1P.webp" },
      { type: "image", src: "/advanced-american/1Q.webp" }
    ]
  },
  {
    name: "Lynn Lake",
    slides: [
      { type: "image", src: "/lynnlake/ll1.webp" },
      { type: "image", src: "/lynnlake/ll2.webp" },
      { type: "image", src: "/lynnlake/ll3.webp" },
      { type: "image", src: "/lynnlake/ll4.webp" }
    ]
  }
];

function NextArrow(props) {
  const { onClick } = props;
  return (
    <div className="custom-next-arrow" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="custom-prev-arrow" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </div>
  );
}

export default function ProjectsClient() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  const openModal = (image) => {
    setModalImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalImage("");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="https://myblogimages.blob.core.windows.net/videos/Bay_Bridge_compressed.webm"
          as="video"
          type="video/webm"
        />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <HeroAboutContact backgroundImage="/project/banner.webp" title="Our Projects" subtitle="Let's see what we have done" />
        <div className="md:p-20 px-4 py-10 relative w-full flex flex-col overflow-hidden rounded-[5px] mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2 * index,
                duration: 0.5,
                ease: "easeInOut"
              }}
              className="w-full mb-12"
            >
              <h2 className="text-4xl font-bold mb-8 text-center">{project.name}</h2>
              <Slider {...settings} className="md:h-[48rem] h-[26rem]">
                {project.slides.map((slide, slideIndex) => (
                  <div key={slideIndex} className="relative w-full md:h-[48rem] h-[26rem]">
                    {slide.type === "video" ? (
                      <video
                        src={slide.src}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                      />
                    ) : (
                      <Image
                        src={slide.src}
                        alt={project.name + " " + (slideIndex + 1)}
                        layout="fill"
                        loading="eager"
                        className="object-cover rounded-[5px] cursor-pointer"
                        onClick={() => openModal(slide.src)}
                      />
                    )}
                  </div>
                ))}
              </Slider>
            </motion.div>
          ))}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Image Modal"
            className="modal-content"
            overlayClassName="modal-overlay"
            shouldCloseOnOverlayClick
          >
            <div className="relative w-full max-w-4xl h-auto mx-auto">
              <button className="absolute top-0 right-0 mt-4 mr-4 text-black text-2xl" onClick={closeModal}>
                &times;
              </button>
              <Image
                src={modalImage}
                alt="Modal Image"
                layout="responsive"
                width={800}
                height={600}
                loading="lazy"
                objectFit="contain"
                className="rounded-[5px]"
              />
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}

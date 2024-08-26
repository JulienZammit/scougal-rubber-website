"use client";
import { useEffect, useState } from "react";
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
    images: [
      "/Bayway/bw1.webp",
      "/Bayway/bw2.webp",
      "/Bayway/bw3.webp",
      "/Bayway/bw4.webp",
    ],
  },
  {
    name: "Hood Canal",
    images: [
      "/Hood Canal/September 2008 001.webp",
      "/Hood Canal/September 2008 002.webp",
      "/Hood Canal/September 2008 007.webp",
      "/Hood Canal/September 2008 008.webp",
    ],
  },
  {
    name: "Advanced American",
    images: [
      "/advanced-american/1A.webp",
      "/advanced-american/1B.webp",
      "/advanced-american/1C.webp",
      "/advanced-american/1D.webp",
      "/advanced-american/1N.webp",
      "/advanced-american/1O.webp",
      "/advanced-american/1P.webp",
      "/advanced-american/1Q.webp",
    ],
  },
  {
    name: "Lynn Lake",
    images: [
      "/lynnlake/ll1.webp",
      "/lynnlake/ll2.webp",
      "/lynnlake/ll3.webp",
      "/lynnlake/ll4.webp",
    ],
  },
];

function NextArrow(props) {
  const { onClick } = props;
  return (
    <div className="custom-next-arrow" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="custom-prev-arrow" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </div>
  );
}

export default function Projects() {
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
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <HeroAboutContact
          backgroundImage="/banner1/Banner2.webp"
          title="Our Projects"
          subtitle="Let's see what we have done"
        />
      <div className="md:p-20 p-5 relative w-full flex flex-col overflow-hidden rounded-[5px] mb-12">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2 * index,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="w-full mb-12 p-8"
        >
          <h2 className="text-4xl font-bold mb-8 text-center">
            {project.name}
          </h2>
          <Slider {...settings} className="md:h-[48rem] h-[26rem]">
            {project.images.map((src, imgIndex) => (
              <div key={imgIndex} className="relative w-full md:h-[48rem] h-[26rem]">
                <Image
                  src={src}
                  alt={`${project.name} image ${imgIndex + 1}`}
                  fill
                  className="object-cover rounded-[5px] cursor-pointer"
                  onClick={() => openModal(src)}
                />
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
        shouldCloseOnOverlayClick={true}
      >
        <div className="relative w-full max-w-4xl h-auto mx-auto">
          <button
            className="absolute top-0 right-0 mt-4 mr-4 text-black text-2xl"
            onClick={closeModal}
          >
            &times;
          </button>
          <Image
            src={modalImage}
            alt="Modal Image"
            layout="responsive"
            width={800}
            height={600}
            objectFit="contain"
            className="rounded-[5px]"
          />
        </div>
      </Modal>
      </div>
    </div>
  );
}

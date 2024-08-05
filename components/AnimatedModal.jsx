"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./ui/animated-modal";
import Image from "next/image";
import { motion } from "framer-motion";

const AnimatedModal = ({
  triggerImage,
  title,
  images,
  paragraphs,
  specialImages,
  triggerImageWidth,
  triggerImageHeight,
}) => {
  return (
    <Modal className="bg-white md:mt-0 mt-10">  
      <ModalTrigger className="flex justify-center items-center group/modal-btn ">
        <motion.div
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
            zIndex: 100,
          }}
          className="flex justify-center items-center"
        >
          <Image
            src={triggerImage}
            layout="intrinsic"
            width={triggerImageWidth}
            height={triggerImageHeight}
            className="rounded-lg cursor-pointer"
            alt="Modal Trigger"
          />
        </motion.div>
      </ModalTrigger>
      <ModalBody>
        <ModalContent className="max-w-7xl mx-auto md:max-w-3xl lg:max-w-5xl relative">
          <h4 className="text-lg md:text-2xl text-neutral-600 font-bold text-center mb-8">
            {title}
          </h4>
          <div className="flex justify-center items-center">
            {images.map((image, idx) => (
              <motion.div
                key={"images" + idx}
                style={{
                  rotate: Math.random() * 20 - 10,
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 0,
                  zIndex: 100,
                }}
                whileTap={{
                  scale: 1.1,
                  rotate: 0,
                  zIndex: 100,
                }}
                className="rounded-xl -mr-4 mt-4 p-1 bg-white border border-neutral-100 flex-shrink-0 overflow-hidden"
              >
                <Image
                  src={image}
                  alt={title}
                  width="500"
                  height="500"
                  className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                />
              </motion.div>
            ))}
          </div>
          <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start w-full mx-auto overflow-y-auto max-h-80 scrollbar-custom">
            {paragraphs.map((paragraph, idx) => (
              <p key={idx} className="text-neutral-600 ">
                {paragraph}
              </p>
            ))}
            {specialImages && specialImages.map((image, idx) => (
              <Image
                key={idx}
                src={image}
                alt={`Special Image ${idx + 1}`}
                width={idx === 0 ? 853 : 853}
                height={idx === 0 ? 217 : 250}
                className="rounded-lg h-40 w-40 md:h-auto md:w-auto object-cover flex-shrink-0 hidden md:block"
              />
            ))}
          </div>
        </ModalContent>
        <ModalFooter className="sticky bottom-0 left-0 w-full bg-white p-4 z-50">
          <a href="mailto:sales@scougalrubber.com" className="w-full">
            <button className="bg-blue-500 text-white text-sm px-6 py-2 rounded-md border w-full hover:bg-blue-300 transition-all duration-300">
              Contact Sales Now
            </button>
          </a>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default AnimatedModal;

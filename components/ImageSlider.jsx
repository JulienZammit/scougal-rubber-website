"use client";
import { cn } from "./utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

export const ImagesSlider = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
  title, // New prop for the title
  paragraph // New prop for the paragraph
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState([]);

  useEffect(() => {
    loadImages();
  }, [images]);

  const loadImages = () => {
    if (images && images.length) {
      setLoading(true);
      const loadPromises = images.map((image) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = image;
          img.onload = () => resolve(image);
          img.onerror = reject;
        });
      });

      Promise.all(loadPromises)
        .then((loadedImages) => {
          setLoadedImages(loadedImages);
          setLoading(false);
        })
        .catch((error) => console.error("Failed to load images", error));
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    let interval;
    if (autoplay) {
      interval = setInterval(handleNext, 5000);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (interval) clearInterval(interval);
    };
  }, [handleNext, handlePrevious, autoplay]);

  return (
    <div className={cn("overflow-hidden h-full w-full relative flex items-center justify-center", className)}
         style={{ perspective: "1000px" }}>
      {loading && <p>Loading...</p>}
      {areImagesLoaded && children}
      {areImagesLoaded && overlay && (
        <div className={cn("absolute inset-0 bg-black/60 z-40", overlayClassName)} />
      )}
      {areImagesLoaded && (
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={loadedImages[currentIndex]}
            initial="initial"
            animate="visible"
            exit={direction === "up" ? "upExit" : "downExit"}
            variants={slideVariants}
            className="image h-full w-full absolute inset-0 object-cover object-center"
          />
        </AnimatePresence>
      )}
      {title && <h1>{title}</h1>} // Render the title if provided
      {paragraph && <p>{paragraph}</p>} // Render the paragraph if provided
    </div>
  );
};

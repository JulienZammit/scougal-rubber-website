import React, { useState, useEffect } from 'react';
import { FaTimes, FaInfoCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from "next/link";
import Image from "next/image";

const ProductDisplay = ({ content }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedImage, setExpandedImage] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const nextProduct = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % content.length);
    setShowInfo(false);
  };

  const prevProduct = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + content.length) % content.length);
    setShowInfo(false);
  };

  const product = content[activeIndex];

  const closeExpandedImage = () => {
    setExpandedImage(null);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        nextProduct();
      } else if (event.key === 'ArrowLeft') {
        prevProduct();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      {content.length > 1 && (
        <>
          <button
            onClick={prevProduct}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-slate-200 text-blue-500 w-8 h-8 rounded-[5px] hover:bg-blue-500 hover:text-white transition-colors duration-300 flex items-center justify-center shadow-lg z-10 opacity-70 hover:opacity-100"
          >
            <FaChevronLeft className="text-sm" />
          </button>
          <button
            onClick={nextProduct}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-slate-200 text-blue-500 w-8 h-8 rounded-[5px] hover:bg-blue-500 hover:text-white transition-colors duration-300 flex items-center justify-center shadow-lg z-10 opacity-70 hover:opacity-100"
          >
            <FaChevronRight className="text-sm" />
          </button>
        </>
      )}
      <div className="bg-white shadow-lg rounded-[5px] overflow-hidden border-5 border-blue-500 transition-all duration-300 ease-in-out transform">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-3/5 p-8 relative">
            <div className="relative group max-w-2xl mx-auto overflow-hidden rounded-[5px]">
              <Image
                src={product.ImageMain}
                alt={product.title}
                width={product.ImageMainWidth}
                height={product.ImageMainHeight}
                className="object-contain rounded-[5px] shadow-lg cursor-pointer transition-transform duration-500 group-hover:scale-105"
                onClick={() => setExpandedImage(product.ImageMain)}
                style={{ width: `${product.ImageMainWidth}px`, height: `${product.ImageMainHeight}px`, maxWidth: '100%', margin: 'auto' }}
              />
            </div>
            <div className="mt-6 grid grid-cols-4 gap-4">
              {product.images.map((img, index) => (
                <div key={index} className="relative group overflow-hidden rounded-[5px]">
                  <Image
                    src={img}
                    alt={`${product.title} - ${index + 1}`}
                    className="w-full h-24 object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                    onClick={() => setExpandedImage(img)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-2/5 p-8 bg-slate-50 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold text-slate-700 mb-6 pb-4 relative">
                {product.title}
                <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-blue-500"></span>
              </h2>
              <button 
                onClick={() => setShowInfo(!showInfo)} 
                className="mb-6 text-blue-500 hover:text-slate-700 flex items-center text-lg font-semibold transition-all duration-300 transform hover:translate-x-2"
              >
                <FaInfoCircle className="mr-2" /> {showInfo ? 'Hide' : 'Show'} Details
              </button>
              <div className={`space-y-4 transition-all duration-500 ease-in-out ${showInfo ? 'opacity-100 max-h-96 overflow-y-auto' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                {product.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-slate-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <Link 
                href="/contact-us"
                className="block w-full bg-blue-500 text-white py-3 px-6 rounded-[5px] hover:bg-slate-700 transition-colors duration-300 text-lg font-semibold shadow-lg text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
      {expandedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={closeExpandedImage}
        >
          <div className="max-w-5xl max-h-full p-4 relative" onClick={(e) => e.stopPropagation()}>
            <Image
              src={expandedImage}
              alt="Expanded view"
              className="max-w-full max-h-full object-contain rounded-[5px]"
            />
            <button
              onClick={closeExpandedImage}
              className="absolute top-4 right-4 text-white text-xl bg-blue-500 rounded-[5px] hover:bg-slate-700 transition-colors duration-300"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDisplay;

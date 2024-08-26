"use client";
import Link from "next/link";
import { FaChevronRight, FaQuoteLeft } from "react-icons/fa";

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

export function TextContentProduct({ contentText }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {contentText.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-[5px] shadow-lg overflow-hidden transform transition duration-500 hover:scale-105"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <FaQuoteLeft className="text-blue-500 text-2xl mr-3" />
                <h3 className="text-slate-700 text-xl font-semibold">
                  {item.title}
                </h3>
              </div>
              <p className="text-slate-700 mb-4">{item.description}</p>
              <div className="flex justify-end">
                <button className="flex items-center text-blue-500 hover:text-slate-700 transition duration-300">
                  <Link href="/company">Learn more about our company</Link>
                  <FaChevronRight className="ml-2" />
                </button>
              </div>
            </div>
            <div className="h-1 bg-gradient-to-r from-blue-500 to-slate-700"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

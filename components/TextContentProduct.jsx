"use client";
import Link from "next/link";
import { FaChevronRight, FaQuoteLeft } from "react-icons/fa";

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

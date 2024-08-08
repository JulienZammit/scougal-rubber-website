"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const menuItems = [
    {
      title: 'Our products',
      links: [
        { href: '/bearing-pads', text: 'Bearing Pads' },
        { href: '/rubber-parts', text: 'Rubber Parts' },
        { href: '/ramps', text: 'Ramps' },
        { href: '/steel', text: 'Steel Fabrication' },
      ],
    },
    {
      title: 'About us',
      links: [
        { href: '/company', text: 'Company' },
        { href: '/experience', text: 'Experience' },
        { href: '/projects', text: 'Projects' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { href: '/contact-us', text: 'Contact Us' },
        { href: '/employment', text: 'Employment' },
      ],
    },
  ];

  return (
    <div className="w-full text-gray-700 bg-white">
      <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between p-4">
          <Link href="/" className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg focus:outline-none focus:shadow-outline">
            <Image src="/logo.webp" alt="Logo" width={150} height={50} />
          </Link>
          <button
            className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              <path
                fillRule="evenodd"
                d={
                  isOpen
                    ? "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    : "M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                }
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <nav
          className={`${
            isOpen ? 'flex' : 'hidden'
          } flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row transition-all duration-300 ease-in-out`}
        >
          <Link href="/" className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            Home
          </Link>
          {menuItems.map((item, index) => (
            <div key={index} className="relative">
              <button
                onClick={() => toggleDropdown(index)}
                className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              >
                <span>{item.title}</span>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className={`inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform ${
                    activeDropdown === index ? 'rotate-180' : 'rotate-0'
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              {activeDropdown === index && (
                <div className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48 z-50 transition-opacity duration-300 ease-in-out">
                  <div className="px-2 py-2 bg-white rounded-md shadow">
                    {item.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        href={link.href}
                        className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      >
                        {link.text}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Header;

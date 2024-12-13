"use client";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

const footerNavigation = {
  product: [
    { name: "Home", href: "/" },
    { name: "Bearing Pads", href: "/bearing-pads" },
    { name: "Industrial Rubber Parts", href: "/rubber-parts" },
    { name: "Scougal Ramps", href: "/ramps" },
  ],
  company: [
    { name: "Company", href: "/company" },
    { name: "Experience", href: "/experience" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Employment", href: "/employment" },
  ],
};

const Footer = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 md:py-24">
      <footer aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex-1 mb-10">
            <div style={{ width: 100, height: 70 }}>
              <Image
                src="/logo/A46117_SRC_Logos-01.png"
                alt="Logo of America's Custom Molded Rubber Company"
                width={100}
                height={70}
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <p className="mt-4 max-w-xs text-sm">
              Scougal Rubber is a company that manufactures custom molded rubber
              products since 1916.
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="https://www.linkedin.com/company/scougal-rubber-corporation"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-gray-500 transition"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://www.facebook.com/scougalrubbercorp/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-gray-500 transition"
              >
                <FaFacebook size={24} />
              </a>
            </div>
            <p className="mt-4 text-sm">
              Copyright © 2024 - All rights reserved
            </p>
          </div>
          <div className="flex-1 flex flex-wrap justify-between gap-10">
            <div>
              <h3 className="text-sm font-semibold leading-6">PRODUCT</h3>
              <ul className="mt-6 space-y-4">
                {footerNavigation.product.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm leading-6 hover:underline"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6">COMPANY</h3>
              <ul className="mt-6 space-y-4">
                {footerNavigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm leading-6 hover:underline"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
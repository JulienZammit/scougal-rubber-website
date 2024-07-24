"use client";
import Link from 'next/link';

const footerNavigation = {
  product: [
    { name: 'Home', href: "/" },
    { name: 'Bearing Pads', href: "/bearing-pads" },
    { name: 'Rubber Parts', href: "/rubber-parts" },
    { name: 'Ramps', href: "/ramps" },
    { name: 'Experience', href: "/experience" },
    { name: 'Company', href: "/company" },
    { name: 'Contact Us', href: "/contact-us" },
    { name: 'Employment', href: "/employment" },
  ],
  company: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/tos' },
  ],
};

const Footer = () => {
  return (
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 md:py-24">
        <footer aria-labelledby="footer-heading">
          <h2 id="footer-heading" className="sr-only">Footer</h2>
          <div className="flex flex-wrap justify-between gap-10">
            <div className="flex-1 mb-10">
              <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
              <p className="mt-4 max-w-xs text-sm">
                Scougal Rubber is a company that manufactures custom molded rubber products since 1916.
              </p>
              <p className="mt-4 text-sm">Copyright © 2024 - All rights reserved</p>
            </div>
            <div className="flex-1 flex flex-wrap justify-between gap-10">
              <div>
                <h3 className="text-sm font-semibold leading-6">LINKS</h3>
                <ul className="mt-6 space-y-4">
                  {footerNavigation.product.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 hover:underline">{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold leading-6">LEGAL</h3>
                <ul className="mt-6 space-y-4">
                  {footerNavigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 hover:underline">{item.name}</Link>
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

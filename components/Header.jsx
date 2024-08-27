"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MdMenu, MdClose, MdKeyboardArrowDown } from "react-icons/md";
import styles from "./Header.module.css";

const menuItems = [
  {
    title: "Our products",
    links: [
      { href: "/bearing-pads", text: "Bearing Pads" },
      { href: "/rubber-parts", text: "Industrial Rubber Parts" },
      { href: "/ramps", text: "Ramps" },
      { href: "/steel", text: "Steel Fabrication" },
    ],
  },
  {
    title: "About us",
    links: [
      { href: "/company", text: "Company" },
      { href: "/experience", text: "Experience" },
      { href: "/projects", text: "Projects" },
    ],
  },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeAllMenus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeAllMenus = () => {
    setActiveMenu(null);
    setMenuOpen(false);
  };

  const toggleMenu = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  const isActive = (item) => {
    return item.links.some((link) => pathname.startsWith(link.href));
  };

  const handleLinkClick = () => {
    closeAllMenus();
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.companyBar}>
        <Link href="/" className={styles.logo} onClick={handleLinkClick}>
          <Image
            src="./logo_resized.webp"
            alt="Scougal Rubber Logo"
            width={200}
            height={180}
          />
        </Link>
      </div>

      <input
        type="checkbox"
        id={styles["menu-bar"]}
        checked={menuOpen}
        onChange={() => setMenuOpen(!menuOpen)}
      />
      <label htmlFor={styles["menu-bar"]}>
        {menuOpen ? <MdClose size={30} /> : <MdMenu size={30} />}
      </label>

      <nav className={`${styles.navbar} ${menuOpen ? styles.active : ""}`} ref={menuRef}>
        <ul>
          <li>
            <Link href="/" className={pathname === "/" ? styles.active : ""} onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu(index);
                }}
                className={`${styles.dropdown} ${
                  isActive(item) ? styles.active : ""
                }`}
              >
                {item.title}
                <span
                  className={`${styles.arrow} ${
                    activeMenu === index ? styles.active : ""
                  }`}
                >
                  <MdKeyboardArrowDown
                    size={24}
                    className={`${styles.arrow} ${
                      activeMenu === index ? "rotate" : ""
                    }`}
                  />
                </span>
              </a>
              {activeMenu === index && (
                <ul
                  className={`${styles.submenu} ${
                    activeMenu === index ? styles.active : ""
                  }`}
                >
                  {item.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className={
                          pathname.startsWith(link.href) ? styles.active : ""
                        }
                        onClick={handleLinkClick}
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li>
            <Link
              href="/employment"
              className={pathname === "/employment" ? styles.active : ""}
              onClick={handleLinkClick}
            >
              Employment
            </Link>
          </li>
          <li className={styles.contact}>
            <Link
              href="/contact-us"
              className={pathname === "/contact-us" ? styles.active : ""}
              onClick={handleLinkClick}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
      <Link href="/contact-us" className={styles.contactButton} onClick={handleLinkClick}>
        Contact Us
      </Link>
    </header>
  );
};

export default Header;
"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "./utils";
import Image from "next/image";

function Header({ className }) {
  const [active, setActive] = useState(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
      <HoveredLink href="/">Home</HoveredLink>
        <MenuItem setActive={setActive} active={active} item="Our products">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/bearing-pads">Bearing Pads</HoveredLink>
            <HoveredLink href="/rubber-parts">Rubber Parts</HoveredLink>
            <HoveredLink href="/ramps">Ramps</HoveredLink>
            <HoveredLink href="/steel">Steel</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="About us">
        <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/company">Company</HoveredLink>
            <HoveredLink href="/experience">Experience</HoveredLink>
            <HoveredLink href="/projects">Projects</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Contact">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/contact-us">Contact Us</HoveredLink>
            <HoveredLink href="/employment">Employment</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Header;

"use client";

import React, { useState, useEffect } from "react";
import SideDrawer from "./Drawer";
import { Button } from "@heroui/react";
import Link from "next/link";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`site-header flex justify-between items-center w-[90%] py-2 rounded-full z-50 fixed top-2 transition-colors duration-300 ${
        isScrolled ? "bg-[#a8744a]" : "bg-transparent"
      }`}
    >
      {/* Logo Section */}
      <div className="flex px-6 items-center">
        <Link href={"/"} className="bg-transparent text-white outline-none rounded-full focus:border-0">
          Home
        </Link>
      </div>

      {/* Placeholder for Menu */}
      <div className="flex">
        <Link href={"/"}>
          <h1 className="kalam_font text-3xl text-white">Daryaft</h1>
        </Link>
      </div>

      {/* Drawer Menu */}
      <div>
        <SideDrawer />
      </div>
    </div>
  );
};

export default Header;

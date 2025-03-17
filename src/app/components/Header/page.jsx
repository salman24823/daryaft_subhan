"use client";

import React, { useState, useEffect } from "react";
import SideDrawer from "./Drawer";
import { Button } from "@heroui/react";
import Link from "next/link";
import Cart from "./Cart";
import { FaPhoneAlt } from "react-icons/fa";

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
      className={`site-header   w-[90%] py-2 rounded-full z-50 fixed top-2 transition-colors duration-300 ${
        isScrolled ? "bg-[#a8744a]" : "bg-transparent"
      }`}
    >

      <div className="w-full flex justify-between ">
      <div className="menu_icon flex  items-center ">
        <SideDrawer  />
      </div>
      <div className="">
        <Link href={"/"}>
          <h1 className="header_logo text-4xl text-white font-bold px-4">Daryaft</h1>
        </Link>
      </div>
      <div className="flex items-center">
      <div className="header_phone">
      <Link href={"/"}>
      <FaPhoneAlt className="text-white w-5 h-5"/>
      </Link>
      </div>

      
      <div>
        <Cart />
      </div>
      </div>
      </div>
    </div>
  );
};

export default Header;

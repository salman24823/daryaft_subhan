"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
} from "@heroui/react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import Link from "next/link";

export default function SideDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // Function to scroll to a specific section with an offset
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    setIsOpen(false); // Close drawer on link click

    if (section) {
      const offset = -70; // Adjust this value as needed
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: sectionTop + offset,
        behavior: "smooth",
      });
    } else {
      // Navigate to the home page and then scroll to the section
      window.location.href = `/#${id}`;
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          className="menu_icon_btn bg-transparent border-0 focus:outline-0 focus:border-0 text-white"
          onPress={handleOpen}
        >
          <HiOutlineMenuAlt1 className="w-12 h-12 font-bold" />
        </Button>
      </div>

      <Drawer
        className="w-[350px] max-[770px]:w-[90%] p-[2%] rounded-none"
        isOpen={isOpen}
        placement="left"
        onOpenChange={setIsOpen}
      >
        <DrawerContent className="bg-neutral text-textSecondary">
          <DrawerHeader className="flex flex-col gap-1 text-textPrimary font-bold">
            <span className="header_logo text-4xl text-[#a16c3d]">Daryaft</span>
          </DrawerHeader>

          <DrawerBody className="text-textPrimary w-full flex flex-col justify-between">
            <div className="sidebar_links items-start flex flex-col gap-4">
              <button onClick={() => scrollToSection("/")} className="sl">Home</button>
              <button onClick={() => scrollToSection("about")} className="sl">About</button>
              <button onClick={() => scrollToSection("featured-products")} className="sl">Featured Products</button>
              <button onClick={() => scrollToSection("trending-items")} className="sl">Trending Items</button>

              <div className="cat_dp">
                <button onClick={() => location.replace("/shop")} className="sl">Categories</button>
                <div className="cat_hide flex flex-col">
                  <button onClick={() => location.replace("/shop?category=Men")} className="sl gap-3">Mens</button>
                  <button onClick={() => location.replace("/shop?category=Women")} className="sl gap-3">Womens</button>
                  <button onClick={() => location.replace("/shop?category=Kids")} className="sl gap-3">Kids</button>
                  <button onClick={() => location.replace("/")} className="sl gap-3">Custom Print</button>
                </div>
              </div>

              <button onClick={() => scrollToSection("blogs")} className="sl">Blogs</button>
            </div>

            <Link href="/" className="w-full text-center bg-[#a16c3d] text-white p-3 rounded-sm" onClick={handleClose}>
              Contact us
            </Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

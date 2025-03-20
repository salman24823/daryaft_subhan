"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
} from "@heroui/react";
import { Menu } from "lucide-react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import Link from "next/link";



export default function SideDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          className="menu_icon_btn bg-transparent border-0 focus:outline-0 focus:border-0 text-white"
          onPress={handleOpen}
        >
          <HiOutlineMenuAlt1 className="w-12 h-12 font-bold"/>
        </Button>
      </div>
      <Drawer
        className="w-[350px] max-[770px]:w-[90%] p-[2%] rounded-none"
        isOpen={isOpen}
        placement="left"
        onOpenChange={setIsOpen}
      >
        <DrawerContent className="bg-neutral text-textSecondary">
          <>
            <DrawerHeader className="flex flex-col gap-1 text-textPrimary font-bold">
              <span className="header_logo text-4xl text-[#a16c3d]">Daryaft</span>
            </DrawerHeader>
            <DrawerBody className="text-textPrimary w-full flex flex-col justify-between">
              <div className="sidebar_links flex flex-col gap-4 ">
                <Link href={"/"}className="sl">Home</Link>
                <Link href={"/"}className="sl">About</Link>
                <Link href={"/"}className="sl">Featured Products</Link>
                <Link href={"/"}className="sl">Trendings Items</Link>
                <div className="cat_dp">
                <Link href={"/"}className="sl">Categories </Link>
                <div className="cat_hide flex flex-col">
                  <Link href={"/"} className="sl gap-3">Mens</Link>
                  <Link href={"/"} className="sl gap-3">Womens</Link>
                  <Link href={"/"} className="sl gap-3">Kids</Link>
                  <Link href={"/"} className="sl gap-3">Custom Print</Link>
                </div>
                </div>
                <Link href={"/"}className="sl">Blogs</Link>
                {/* <Link href={"/"}>Contact us</Link> */}
              </div>
              <>
                <Link href={"/"} className="w-full text-center bg-[#a16c3d] text-white p-3 rounded-sm">
                Contact us
                </Link>
                </>

            </DrawerBody>
          </>
        </DrawerContent>
      </Drawer>
    </>
  );
}

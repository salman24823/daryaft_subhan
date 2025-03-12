import React from "react";
import SideDrawer from "./Drawer";
import { Button } from "@heroui/react";
import Link from "next/link";

const Header = () => {
  return (
    <div  className="site-header flex justify-between items-center w-[90%] py-2 rounded-full z-50 fixed top-2">

      {/* Logo Section */}
      <div className="flex items-center">
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

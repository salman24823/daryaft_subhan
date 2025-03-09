import React from "react";
import SideDrawer from "./Drawer";
import { Button } from "@heroui/react";

const Header = () => {
  return (
    <div className="flex justify-between items-center w-[90%] py-2 rounded-full z-50 fixed top-2">

      {/* Logo Section */}
      <div className="flex items-center">
        <Button className="bg-transparent text-white outline-none rounded-full focus:border-0">
          Logo
        </Button>
      </div>

      {/* Placeholder for Menu */}
      <div className="flex">
        <h1 className="kalam_font text-3xl text-white">Daryaft</h1>
      </div>

      {/* Drawer Menu */}
      <div> 
        <SideDrawer />
      </div>

    </div>
  );
};

export default Header;

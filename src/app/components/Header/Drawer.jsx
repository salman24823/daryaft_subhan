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

export default function SideDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          className="bg-transparent border-0 focus:outline-0 focus:border-0 text-white"
          onPress={handleOpen}
        >
          <Menu />
        </Button>
      </div>
      <Drawer
        className="max-[770px]:w-[90%]"
        isOpen={isOpen}
        placement="right"
        onOpenChange={setIsOpen}
      >
        <DrawerContent className="bg-neutral text-textSecondary">
          <>
            <DrawerHeader className="flex flex-col gap-1 text-textPrimary font-bold">
              Drawer Title
            </DrawerHeader>
            <DrawerBody className="text-textPrimary">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                quam.
              </p>
              <p>
                Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
              </p>
            </DrawerBody>
          </>
        </DrawerContent>
      </Drawer>
    </>
  );
}

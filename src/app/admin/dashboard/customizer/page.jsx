"use client";

import React, { useState } from "react";
import { Tabs, Tab, Checkbox } from "@heroui/react";
import Hoodie from "./Hoodie";
import Shirt from "./Shirt";
import Zipper from "./Zipper";

const Customizer = () => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div>
      {/* Checkbox */}
      <div className="flex flex-col gap-2 mb-4">
        <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
          Designing
        </Checkbox>
        <p className="text-default-500">Selected: {isSelected ? "true" : "false"}</p>
      </div>

      {/* Other details */}
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options">
          <Tab key="hoodie" title="Hoodie">
            <Hoodie />
          </Tab>
          <Tab key="shirt" title="Shirt">
            <Shirt />
          </Tab>
          <Tab key="zipper" title="Zipper">
            <Zipper />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Customizer;

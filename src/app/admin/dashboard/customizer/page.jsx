"use client";

import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody, Checkbox } from "@heroui/react";
import Hoodie from "./Hoodie";
import Shirt from "./Shirt";
import Zipper from "./Zipper";

const Customizer = () => {
  const [isSelected, setIsSelected] = React.useState(false);

  return (
    <div>
      {/* checkbox */}
      <div className="flex flex-col gap-2">
        <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
          Customize
        </Checkbox>
        <p className="text-default-500">
          Selected: {isSelected ? "true" : "false"}
        </p>
      </div>
      {/* Other details */}
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options">
          <Tab key="photos" title="Hoodie">
            <Hoodie />
          </Tab>
          <Tab key="music" title="Shirt">
            <Shirt />
          </Tab>
          <Tab key="videos" title="Zipper">
            <Zipper />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Customizer;

"use client";

import React, { useState, useEffect } from "react";
import { Tabs, Tab, Checkbox } from "@heroui/react";
import Hoodie from "./Hoodie";
import Shirt from "./Shirt";
import Zipper from "./Zipper";

const Customizer = () => {
  const [isSelected, setIsSelected] = useState(false);

  // Fetch state from API when the component mounts
  useEffect(() => {
    const fetchState = async () => {
      try {
        const res = await fetch("/api/state");
        const data = await res.json();
        if (data && typeof data.statusState === "boolean") {
          setIsSelected(data.statusState);
        }
      } catch (error) {
        console.error("Error fetching state:", error);
      }
    };

    fetchState();
  }, []);

  // Handle checkbox toggle and update API
  const handleToggle = async (newState) => {
    setIsSelected(newState);

    try {
      await fetch("/api/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statusState: newState }),
      });
    } catch (error) {
      console.error("Error updating state:", error);
    }
  };

  return (
    <div>

      <div className="flex flex-col gap-2 mb-4">
        <Checkbox isSelected={isSelected} onValueChange={handleToggle}>
          {isSelected ? "Enabled" : "Disabled"}
        </Checkbox>
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

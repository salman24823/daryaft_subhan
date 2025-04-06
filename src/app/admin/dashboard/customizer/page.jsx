"use client";

import React, { useState } from "react";
import { Checkbox, Tabs, Tab } from "@heroui/react";
import Hoodie from "./Hoodie";
import Shirt from "./Shirt";
import Zipper from "./Zipper";
import Logo from "./Logo";

const Customizer = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [activeTab, setActiveTab] = useState("hoodie");

  const handleToggle = async (newState) => {
    setIsSelected(newState);
  
    try {
      const response = await fetch('/api/handleState', {
        method: 'PUT', // or 'POST' depending on your API design
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isSelected: newState }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update toggle state');
      }
  
      const data = await response.json();
      console.log('Toggle updated:', data);
    } catch (error) {
      console.error('Error updating toggle:', error);
    }
  };
  

  return (
    <div>
      {/* Toggle checkbox */}
      <div className="flex flex-col gap-2 mb-4">

      </div>

      <div className="flex gap-5">
        {/* Tabs */}
        <Tabs selectedKey={activeTab} onSelectionChange={setActiveTab}>
          <Tab key="hoodie" title="Hoodie" />
          <Tab key="shirt" title="Shirt" />
          <Tab key="zipper" title="Zipper" />
          <Tab key="logo" title="Logo" />
        </Tabs>

        <Checkbox isSelected={isSelected} onValueChange={handleToggle}>
          {isSelected ? "Enabled" : "Disabled"}
        </Checkbox>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "hoodie" ? (
          <Hoodie />
        ) : activeTab === "shirt" ? (
          <Shirt />
        ) : activeTab === "zipper" ? (
          <Zipper />
        ) : activeTab === "logo" ? (
          <Logo />
        ) : null}
      </div>
    </div>
  );
};

export default Customizer;

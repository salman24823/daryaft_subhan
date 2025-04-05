"use client";

import { Button } from "@heroui/react";
import React, { useState, useEffect } from "react";
import Color from "./Color";
import { toast } from "react-toastify";
import Logo from "./Logo";
import Action from "./Action";

export default function Customizer() {

  const [selectedColor, setSelectedColor] = useState([]);
  const [logoPosition, setLogoPosition] = useState({ x: "end", y: "center" }); // Updated to use justify and items
  const [logoSize, setLogoSize] = useState("md");
  const [selectedLogo, setSelectedLogo] = useState(
    "https://utfs.io/f/vm2okaME29juIbAIO5rumr8HTLDGP7M1wWp2qZcBhf5lR0nk"
  );




  const [panelType, setPanelType] = useState("color");
  const [apiData, setData] = useState([]);


  async function fetchVariation() {
    const response = await fetch("/api/handleVariation", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      toast.error("Failed to fetch variation data");
    }
    const data = await response.json();
    setData(data)
  }

  useEffect(() => {
    fetchVariation()
  }, [])

  return (
    <div className="w-full gap-20 h-[110vh] md:h-auto lg:h-screen grid lg-gap-5 p-2 mt-20 grid-col-1 lg:grid-cols-10">

      <div className="col-span-1 lg:col-span-3 h-full ">
        <div className="h-full bg-white shadow-lg p-6 border border-gray-300 rounded-xl backdrop-blur-md bg-opacity-80">

          {/* panel buttons */}
          <div className="grid grid-cols-3 mb-6 rounded-full overflow-hidden">
            <Button
              className={`rounded-none py-2 ${panelType === "color"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              onPress={() => setPanelType("color")}
            >
              Color
            </Button>
            <Button
              className={`rounded-none py-2 ${panelType === "logo"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              onPress={() => setPanelType("logo")}
            >
              Logo
            </Button>
            <Button
              className={`rounded-none py-2 ${panelType === "stock"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              onPress={() => setPanelType("stock")}
            >
              Stock
            </Button>
          </div>

          {/* Panel Content */}
          <div className="w-full">
            {panelType === "color" ? (

              <Color selectedColor={selectedColor} setSelectedColor={setSelectedColor} apiData={apiData} />

            ) : panelType == "logo" ? (

              <Logo selectedLogo={selectedLogo} setSelectedLogo={setSelectedLogo} logoSize={logoSize} setLogoSize={setLogoSize} logoPosition={logoPosition} setLogoPosition={setLogoPosition} />

            ) : (
              
              <Action selectedColor={selectedColor} logoPosition={logoPosition} logoSize={logoSize} selectedLogo={selectedLogo} />

            )}
          </div>
        </div>
      </div>

      <div className="col-span-1  lg:col-span-7 flex items-start justify-center">

        <div className="flex justify-center items-center w-1/2 h-auto relative">

          {/* Hoodie Vector Image */}
          {selectedColor?.colorImage ? (
            <>
              <img
                src={selectedColor.colorImage}
                alt="Hoodie"
                className="w-full h-full"
              />

              {/* Selected Logo Overlay */}
              <div
                className={`absolute w-[50%] h-[40%] flex justify-${logoPosition.x} items-${logoPosition.y}`}
              >
                <img
                  src={selectedLogo}
                  alt="Selected Logo"
                  className={` 
                ${logoSize === "sm" ? "w-16 h-16" : ""} 
                ${logoSize === "md" ? "w-24 h-24" : ""} 
                ${logoSize === "lg" ? "w-32 h-32" : ""}
              `}
                />
              </div>
            </>
          ) : (
            <img
              src="https://res.cloudinary.com/dr0vskm6n/image/upload/v1743681869/Add_a_subheading-removebg-preview_a2onu2.png"
              alt="Default Hoodie"
              className="w-full h-full"
            />
          )}


        </div>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import ModalViewer from "../components/ModelViewer/page";

const Product = () => {
  const [panelType, setPanelType] = useState("color");
  const [selectedColor, setSelectedColor] = useState("#4A90E2");
  const [selectedLogo, setSelectedLogo] = useState("https://utfs.io/f/vm2okaME29juIbAIO5rumr8HTLDGP7M1wWp2qZcBhf5lR0nk");
  const [logoPosition, setLogoPosition] = useState("right");
  const [logoOptions, setLogoOptions] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const colorOptions = [
    { name: "White", hex: "#ffffff" },
    { name: "Green", hex: "#33FF57" },
    { name: "Blue", hex: "#3357FF" },
    { name: "Pink", hex: "#FF33A1" },
    { name: "Purple", hex: "#A133FF" },
    { name: "Teal", hex: "#33FFA1" },
    { name: "Orange", hex: "#FFA133" },
    { name: "Lime", hex: "#57FF33" },
    { name: "Sky Blue", hex: "#33A1FF" },
    { name: "Rose", hex: "#FF3357" },
    { name: "Black", hex: "#000000" },
  ];

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const response = await fetch("/api/handleLogo"); // API route for fetching logos
        if (!response.ok) throw new Error("Failed to fetch logos");

        const data = await response.json();

        console.log(data, "Logos");
        setLogoOptions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, []);

  return (
    <div className="w-full h-screen bg-gray-50 border border-gray-300">

      <div className="w-full gap-5 h-full grid grid-cols-4 p-4">
        {/* Side Panel */}
        <div className="col-span-1 bg-white shadow-lg p-6 border border-gray-300 rounded-xl backdrop-blur-md bg-opacity-80">
          <div className="grid grid-cols-3 mb-6 rounded-full overflow-hidden">
            <Button
              className={`rounded-none py-2 ${
                panelType === "color"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onPress={() => setPanelType("color")}
            >
              Color
            </Button>
            <Button
              className={`rounded-none py-2 ${
                panelType === "logo"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onPress={() => setPanelType("logo")}
            >
              Logo
            </Button>
            <Button className="rounded-none py-2 bg-gray-200 text-gray-700 hover:bg-gray-300">
              Stock
            </Button>
          </div>

          {/* Panel Content */}
          <div className="w-full">
            {panelType === "color" ? (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-4 w-full text-center">
                  Choose Your Color
                </h2>
                <div className="flex flex-wrap gap-3 justify-center">
                  {colorOptions.map((color, index) => (
                    <div key={index} className="text-center">
                      <Button
                        className="w-12 min-w-12 min-h-12 h-12 rounded-full border border-gray-400 shadow-md hover:scale-110 transition"
                        style={{ backgroundColor: color.hex }}
                        onPress={() => setSelectedColor(color.hex)}
                      />
                      <p className="text-sm text-gray-700 mt-1 font-medium">
                        {color.name}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 w-full text-center">
                  Logo Position
                </h2>
                <div className="rounded-full overflow-hidden mb-4 grid grid-cols-3">
                  <Button
                    className={`px-0 rounded-none py-2 ${
                      logoPosition === "left"
                        ? "bg-gray-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onPress={() => setLogoPosition("left")}
                  >
                    Left
                  </Button>
                  <Button
                    className={`px-0 rounded-none py-2 ${
                      logoPosition === "center"
                        ? "bg-gray-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onPress={() => setLogoPosition("center")}
                  >
                    Center
                  </Button>
                  <Button
                    className={`px-0 rounded-none py-2 ${
                      logoPosition === "right"
                        ? "bg-gray-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onPress={() => setLogoPosition("right")}
                  >
                    Right
                  </Button>
                </div>

                <h2 className="text-lg font-semibold text-gray-900 mb-4 w-full text-center">
                  Choose Your Logo
                </h2>

                {loading ? (
                  <p className="text-center text-gray-500">Loading logos...</p>
                ) : error ? (
                  <p className="text-center text-red-500">{error}</p>
                ) : (
                  <div className="flex flex-wrap gap-3 justify-center">

                    {logoOptions?.logoUrls?.map((logo, index) => (
                      <div
                        key={index}
                        className={`p-2 border-2 rounded-lg cursor-pointer hover:border-blue-500 transition ${
                          selectedLogo === logo
                            ? "border-blue-600 shadow-lg"
                            : "border-gray-300"
                        }`}
                        onClick={() => setSelectedLogo(logo)}
                      >
                        <img
                          src={logo} // Prioritize URL, fallback to src
                          alt={`Logo ${index + 1}`}
                          width={64}
                          height={64}
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* 3D Viewer Section */}
        <div className="col-span-3 p-6 bg-gray-100 border border-gray-300 rounded-xl shadow-inner">
          <ModalViewer
            selectedColor={selectedColor}
            selectedLogo={selectedLogo}
            logoPosition={logoPosition}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;

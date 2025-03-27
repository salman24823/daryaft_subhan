"use client";

import React, { useState, useEffect } from "react";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, RadioGroup, Radio } from "@heroui/react";
import { CldUploadWidget } from "next-cloudinary";

export default function Customizer() {
  const [selectedColor, setSelectedColor] = useState("#4A90E2");
  const [selectedLogo, setSelectedLogo] = useState(
    "https://utfs.io/f/vm2okaME29juIbAIO5rumr8HTLDGP7M1wWp2qZcBhf5lR0nk"
  );
  const [logoPosition, setLogoPosition] = useState({ x: "end", y: "center" }); // Updated to use justify and items
  const [logoSize, setLogoSize] = useState("md");
  const [quantity, setQuantity] = useState(1);

  const [selected, setSelected] = React.useState("");
  const [selectedHoodieImage, setSelectedHoodieImage] = useState(
    "https://res.cloudinary.com/dr0vskm6n/image/upload/v1742363939/236d2355-ef94-45ae-b51b-8d4cfb1cdbf5-removebg-preview_1_bxrczt.png"
  );

  const [stuff, setStuff] = useState([]);
  const [panelType, setPanelType] = useState("color");
  const [logoOptions, setLogoOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update the handleLogoSizeChange function
  const handleLogoSizeChange = (size) => {
    setLogoSize(size);
  };

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

  const fetchVariation = async () => {
    try {
      // Replace with actual API call
      const response = await fetch("/api/handleCustomizer");
      const data = await response.json();
      setStuff(data)
    } catch (err) {
      setError("Failed to load logos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Simulate fetching logo options from an API
    fetchVariation()
  }, []);


  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} items to cart`);
    // Add your cart logic here
  };

  const handleLogoPositionChange = (axis, value) => {
    setLogoPosition((prev) => ({ ...prev, [axis]: value }));
  };

  const handleColorSelect = (product) => {
    setSelectedColor(product.variantColorCode);
    setSelectedHoodieImage(product.variantImage);
  };

  return (
    <div className="w-full gap-20 h-[110vh] md:h-auto lg:h-screen grid lg-gap-5 p-2 mt-20 grid-col-1 lg:grid-cols-10">
      <div className="col-span-1 lg:col-span-3 h-full ">
        <div className="h-full bg-white shadow-lg p-6 border border-gray-300 rounded-xl backdrop-blur-md bg-opacity-80">
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
              <>
                <h2 onClick={fetchVariation} className="text-lg font-semibold text-gray-900 mt-6 mb-4 w-full text-center">
                  Choose Your Color
                </h2>
                <h2  onClick={() => console.log(stuff,selected, "stuff and selected")} className="text-lg font-semibold text-gray-900 mt-6 mb-4 w-full text-center">
                  stuff
                </h2>


                <RadioGroup
                  label="Select your stuff"
                  value={selected}
                  onValueChange={setSelected}
                >
                  {stuff[0]?.stuffName?.map((value) => (
                    <Radio key={value} value={value}>
                      {value}
                    </Radio>
                  ))}
                </RadioGroup>


                <div className="flex flex-wrap gap-3 justify-center">
                  {stuff.map((product) => {
                    // Check if this color is available for the selected material
                    const isAvailable = !selected || product.stuffName.includes(selected);

                    return (
                      <div key={product._id} className="text-center">
                        <Button
                          onPress={() => isAvailable && handleColorSelect(product)}

                          className={`
          w-10 h-10 rounded-full border-2 shadow-md transition
          ${selectedColor === product.variantColorCode ?
                              'ring-2 ring-offset-2 ring-blue-500' :
                              'border-transparent'
                            }
          ${isAvailable ?
                              'hover:scale-110 cursor-pointer' :
                              'opacity-50 cursor-not-allowed'
                            }
        `}
                          style={{ backgroundColor: product.variantColorCode }}
                          isDisabled={!isAvailable}
                        />
                        <p className={`text-xs mt-1 ${isAvailable ? 'text-gray-700' : 'text-gray-400'
                          }`}>
                          {product.variantColorName}
                          {!isAvailable && ' (Unavailable)'}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : panelType == "logo" ? (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 w-full text-center">
                  Logo Position
                </h2>

                <div className="rounded-full overflow-hidden mb-4 grid grid-cols-3">
                  <Button
                    className={`px-0 rounded-none py-2 ${logoPosition.y === "start"
                      ? "bg-gray-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    onPress={() => handleLogoPositionChange("y", "start")}
                  >
                    Top
                  </Button>
                  <Button
                    className={`px-0 rounded-none py-2 ${logoPosition.y === "center"
                      ? "bg-gray-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    onPress={() => handleLogoPositionChange("y", "center")}
                  >
                    Middle
                  </Button>
                  <Button
                    className={`px-0 rounded-none py-2 ${logoPosition.y === "end"
                      ? "bg-gray-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    onPress={() => handleLogoPositionChange("y", "end")}
                  >
                    Bottom
                  </Button>
                </div>

                <div className="rounded-full overflow-hidden mb-4 grid grid-cols-3">
                  <Button
                    className={`px-0 rounded-none py-2 ${logoPosition.x === "start"
                      ? "bg-gray-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    onPress={() => handleLogoPositionChange("x", "start")}
                  >
                    Left
                  </Button>
                  <Button
                    className={`px-0 rounded-none py-2 ${logoPosition.x === "center"
                      ? "bg-gray-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    onPress={() => handleLogoPositionChange("x", "center")}
                  >
                    Center
                  </Button>
                  <Button
                    className={`px-0 rounded-none py-2 ${logoPosition.x === "end"
                      ? "bg-gray-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    onPress={() => handleLogoPositionChange("x", "end")}
                  >
                    Right
                  </Button>
                </div>

                {/* // Update the buttons for logo size */}
                <div className="rounded-full overflow-hidden mb-4 grid grid-cols-3">
                  <Button
                    className={`px-0 rounded-none py-2 ${logoSize === "sm"
                      ? "bg-gray-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    onPress={() => handleLogoSizeChange("sm")}
                  >
                    Small
                  </Button>
                  <Button
                    className={`px-0 rounded-none py-2 ${logoSize === "md"
                      ? "bg-gray-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    onPress={() => handleLogoSizeChange("md")}
                  >
                    Medium
                  </Button>
                  <Button
                    className={`px-0 rounded-none py-2 ${logoSize === "lg"
                      ? "bg-gray-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    onPress={() => handleLogoSizeChange("lg")}
                  >
                    Large
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
                    {logoOptions.map((logo, index) => (
                      <div
                        key={index}
                        className={`p-2 border-2 rounded-lg cursor-pointer hover:border-blue-500 transition ${selectedLogo === logo
                          ? "border-blue-600 shadow-lg"
                          : "border-gray-300"
                          }`}
                        onClick={() => setSelectedLogo(logo)}
                      >
                        {/* <p>Hi : {logo} </p> */}
                        <img
                          src={logo}
                          alt={`Logo ${index + 1}`}
                          width={64}
                          height={64}
                          className="object-contain"
                        />
                      </div>
                    ))}
                    {/* <div
                      className={`p-2 border-2 rounded-lg cursor-pointer hover:border-blue-500 transition `}
                      // onClick={() => setSelectedLogo(logo)}
                    > */}
                    <CldUploadWidget
                      uploadPreset="ml_default"
                      options={{ sources: ["local", "url"] }}
                      onSuccess={(result) => {
                        setSelectedLogo(result.info.secure_url);
                      }}
                    >
                      {({ open }) => (
                        <button
                          className="text-white font-semibold text-sm rounded-lg px-4 py-2 bg-blue-500"
                          onClick={() => open()}
                        >
                          Upload Logo
                        </button>
                      )}
                    </CldUploadWidget>
                    {/* </div> */}
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col justify-center gap-2">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-700">
                    Hoodie Price :
                  </h2>
                  <h2 className="text-gray-900">
                    {" "}
                    <span className="font-semibold"> R.S 1900 </span>{" "}
                  </h2>
                </div>

                <hr />

                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-700">Logo Price :</h2>
                  <h2 className="text-gray-900">
                    {" "}
                    <span className="font-semibold"> R.S 100 </span> / logo
                  </h2>
                </div>

                <hr />

                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-700">Hoodie Size :</h2>

                  <div>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button className="rounded-full" variant="bordered">Select Size</Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="new">Small</DropdownItem>
                        <DropdownItem key="copy">Medium</DropdownItem>
                        <DropdownItem key="edit">Large</DropdownItem>
                        <DropdownItem key="edit">Extra Large</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>

                <hr />

                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-700">QTY :</h2>

                  <div className="flex rounded-full overflow-hidden">
                    {/* Minus Button */}
                    <button
                      onClick={handleDecrement}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold"
                    >
                      -
                    </button>

                    {/* Quantity Input */}
                    <input
                      type="number"
                      value={quantity}
                      min="1"
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="w-16 text-center border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Plus Button */}
                    <button
                      onClick={handleIncrement}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <hr />

                {/* Add to Cart Button */}
                <Button
                  onPress={handleAddToCart}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold"
                >
                  Add to Cart
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="col-span-1  lg:col-span-7 flex items-start justify-center">
        <div className="flex justify-center items-center w-1/2 h-auto relative">
          {/* Hoodie Vector Image */}
          <img
            src={selectedHoodieImage}
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
        </div>
      </div>
    </div>
  );
}

// ${
//   selectedLogo === logo
//     ? "border-blue-600 shadow-lg"
//     : "border-gray-300"
// }

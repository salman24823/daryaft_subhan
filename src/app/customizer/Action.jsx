import React, { useState } from "react";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";

const Action = ({ selectedColor, logoPosition, logoSize, selectedLogo }) => {

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(""); // Store selected size
  // const [loading, set] = useState(""); // Store selected size


  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {

    const logoPrice = 100

    const newCartItem = {
      color: selectedColor.colorName,
      size: selectedSize,
      quantity,
      thumbnail: selectedColor.colorImage,
      id: "Custom Product",
      salePrice: (selectedColor.stuffPrice + logoPrice) * quantity, // Adding logo price
      name: "Custom Hoodie",

      colorCode: selectedColor.colorCode,
      logoPrice: logoPrice,
      logoPosition,
      logoSize,
      selectedLogo,
      stuffPrice: selectedColor.stuffPrice,
    };

    // Get current cart from localStorage or initialize an empty array
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add new item to the cart
    existingCart.push(newCartItem);

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));
  };

  return (
    <div className="flex flex-col justify-center gap-2">

      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-700">Stuff Name :</h2>
        <h2 className="text-gray-900">
          <span className="font-semibold">{selectedColor.stuffName}</span>
        </h2>
      </div>

      <hr />

      <div className="flex items-center justify-between">
        <h2 onClick={() => console.log(selectedColor.colorCode, selectedColor.colorName, "selectedColor ,", selectedSize, "selectedSize ,", logoPosition, "logoPosition ,", logoSize, "logoSize ,", selectedLogo, "selectedLogo ,", quantity, "quantity ,", selectedColor.stuffPrice, "stuffPrice")} className="font-semibold text-gray-700">Hoodie Price :</h2>
        <h2 className="text-gray-900">
          <span className="font-semibold">R.S {selectedColor.stuffPrice}</span>
        </h2>
      </div>

      <hr />

      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-700">Logo Price :</h2>
        <h2 className="text-gray-900">
          <span className="font-semibold">R.S 100</span> / logo
        </h2>
      </div>

      <hr />

      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-700">Hoodie Size :</h2>
        <Dropdown>
          <DropdownTrigger>
            <Button className="rounded-full" variant="bordered">
              {selectedSize ? selectedSize : "Select Size"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Hoodie Sizes" onAction={(key) => setSelectedSize(key)}>
            <DropdownItem key="Small">Small</DropdownItem>
            <DropdownItem key="Medium">Medium</DropdownItem>
            <DropdownItem key="Large">Large</DropdownItem>
            <DropdownItem key="Extra Large">Extra Large</DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
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
        // isLoading={loading}
        onPress={handleAddToCart}
        className="px-4 py-2 bg-[#a16c3d] hover:bg-[#754d2a] text-white rounded-full font-semibold"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default Action;

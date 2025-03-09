"use client"

import React, { useState } from "react";
import { toast } from "react-toastify"; // For toast notifications
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Icons for "In Stock" and "Out of Stock"
import { Button } from "@heroui/react";

const Stock = ({ logoSize, selectedColor, selectedLogo, logoPosition }) => {
  const [quantity, setQuantity] = useState(1); // Quantity state
  const [inStock, setInStock] = useState(true); // In stock condition (can be toggled or fetched from API)
  const [isAdded, setIsAdded] = useState(false); // To track if the item is added to cart
  const [isHovered, setIsHovered] = useState(false); // To track hover state for the Button

  const handleAddToCart = () => {
  
    // Create cart item with all selected options
    const cartItem = {
      name: "Sample Product", // Change to dynamic name if needed
      quantity,
      logoSize,
      selectedColor,
      selectedLogo,
      logoPosition,
    };

    // Get existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item already exists in cart (same logo, color, size, position)
    const existingIndex = cart.findIndex(
      (item) =>
        item.logoSize === cartItem.logoSize &&
        item.selectedColor === cartItem.selectedColor &&
        item.selectedLogo === cartItem.selectedLogo &&
        item.logoPosition === cartItem.logoPosition
    );

    if (existingIndex !== -1) {
      // If item exists, update its quantity
      cart[existingIndex].quantity += quantity;
    } else {
      // Otherwise, add new item
      cart.push(cartItem);
    }

    // Save updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Display success toast
    toast.success("Item added to cart!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
    });

    setIsAdded(true); // Mark the item as added
  };

  return (
    <div className="p-6 bg-white rounded-lg flex flex-col items-center max-w-sm mx-auto">
      {/* In Stock Message */}
      <div className="flex items-center gap-2">
        {inStock ? (
          <>
            <FaCheckCircle className="text-green-500" />
            <span className="text-green-500 font-medium">In Stock</span>
          </>
        ) : (
          <>
            <FaTimesCircle className="text-red-500" />
            <span className="text-red-500 font-medium">Out of Stock</span>
          </>
        )}
      </div>

      {/* Secure Payment Message */}
      <div className="mt-4">
        <p className="text-gray-600 text-center text-sm">Secure payment options available</p>
      </div>

      {/* Quantity Selector */}
      <div className="mt-4 flex items-center overflow-hidden w-fit border rounded-full">
        <Button
          className="px-2 rounded-none py-2 hover:bg-gray-300 transition"
          onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
        >
          -
        </Button>
        <input
          type="number"
          value={quantity}
          min="1"
          className="focus:outline-none focus:border-none w-20 text-center"
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <Button
          className="px-2 rounded-none py-2 hover:bg-gray-300 transition"
          onPress={() => setQuantity(quantity + 1)}
        >
          +
        </Button>
      </div>

      {/* Add to Cart Button */}
      <div className="mt-6">
        <Button
          onPress={handleAddToCart}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`px-6 py-2 text-white rounded-full transition w-full ${
            inStock
              ? isHovered
                ? "bg-blue-700"
                : "bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!inStock}
        >
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>

      {/* Confirmation Message */}
      {isAdded && (
        <div className="mt-4 text-center">
          <p className="text-green-600 text-sm">Item successfully added to your cart!</p>
        </div>
      )}
    </div>
  );
};

export default Stock;

import { Button } from "@heroui/react";
import React, { useState } from "react";

const BuyAction = ({product , setVariantImage}) => {

      // State for selected color, size, and quantity
  const [selectedColor, setSelectedColor] = useState(""); // Default color is black
  const [selectedSize, setSelectedSize] = useState("8"); // Default size is 8
  const [quantity, setQuantity] = useState(1); // Default quantity is 1

  // Handle color selection
  const handleColorSelect = ({name , color , image} ) => {
    setSelectedColor(name);
    setVariantImage(image)
  };

  // Handle size selection
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  // Handle checkout
  const handleCheckout = () => {
    const productDetails = {
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      id: product._id ,
      thumbnail : product.thumbnail,
      salePrice : product.salePrice,
      name : product.name,
    };

    console.log(productDetails,"productDetails")
  
    // Get existing cart data from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Check if product already exists in the cart
    const existingIndex = cart.findIndex((item) => item.id === productDetails.id);
  
    if (existingIndex !== -1) {
      // If product exists, update the quantity
      cart[existingIndex].quantity += quantity;
    } else {
      // If product does not exist, add it to the cart
      cart.push(productDetails);
    }
  
    // Save updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    location.replace(`/checkout?product_id=${product._id}`)
  
    console.log("Updated Cart:", cart);
  };

  


  return (
    <div className="select_color flex flex-col gap-4">
      <span className="text-gray-400">
        Color: <span className="text-black font-bold">{selectedColor}</span>
      </span>
      <div className="colorselector flex gap-4">
      {product.variations.map((color, index) => (
        <button
          key={index}
          className={`w-8 h-8 rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-[#B4531A] ${
            selectedColor === color.colorName ? "ring-2 ring-[#B4531A]" : ""
          }`}
          style={{ backgroundColor: color.colorCode }}
          onClick={() =>
            handleColorSelect({
              name: color.colorName,
              color: color.colorCode,
              image: color.image,
            })
          }
        ></button>
      ))}

      </div>
      <span className="text-gray-400">
        Size: <span className="text-black font-bold">{selectedSize}</span>
      </span>
      <div className="size_selector flex gap-4 flex-wrap">
        {product.sizes.map((size, index) => (
          <button
            key={index}
            className={`px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-[#B4531A] hover:text-[#B4531A] transition-all ${
              selectedSize === size ? "!border-[#B4531A] text-[#B4531A]" : ""
            }`}
            onClick={() => handleSizeSelect(size)}
          >
            {size}
          </button>
        ))}
      </div>
      <div className="quantity_selector flex flex-col gap-2">
        <span className="text-gray-400">Quantity:</span>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#B4531A] focus:outline-none"
        />
      </div>
      <div className="detail_btn w-full flex gap-4 mt-6">
        <Button className="w-[50%] bg-[#B4531A] text-white text-lg font-bold border-none rounded-lg hover:bg-[#9C3E16] transition-all">
          Add to Cart
        </Button>
        <Button
          className="w-[50%] bg-transparent border-2 border-[#B4531A] text-[#B4531A] text-lg font-bold rounded-lg hover:bg-[#B4531A] hover:text-white transition-all"
          onPress={handleCheckout}
        >
          Check Out
        </Button>
      </div>
    </div>
  );
};

export default BuyAction;

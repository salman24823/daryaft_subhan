"use client";

import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  Button,
} from "@heroui/react";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.salePrice * item.quantity, 0);
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (id, delta) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          className="bg-transparent border-0 focus:outline-0 focus:border-0 text-white"
          onPress={handleOpen}
        >
          <ShoppingCart />
        </Button>
      </div>
      <Drawer
        className="max-[770px]:w-[90%] rounded-none"
        isOpen={isOpen}
        placement="right"
        onOpenChange={setIsOpen}
      >
        <DrawerContent className="bg-white text-textSecondary">
          <div className="cart_drawer max-w-[500px] w-full h-[100vh] flex flex-col justify-between py-[2%]">
            <div>
              <div className="your_cart p-[2%] border-[#c77d37] border-b-[2px]">
                <span className="font-bold text-[#c77d37] text-xl">Your Cart</span>
              </div>
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div key={index} className="cart_cont grid grid-cols-12 p-[2%] border-b relative">
                    <div className="cart_image col-span-3">
                      <img src={item.thumbnail} alt={item.name} className="w-full h-auto" />
                    </div>
                    <div className="col-span-6 py-[2%] pl-[20px] flex flex-col gap-2">
                      <span className="font-bold">{item.name}</span>
                      <span>
                        Size: <strong>{item.size}</strong> | Color: <strong>{item.color}</strong>
                      </span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.id, -1)} className="border p-1 rounded text-lg">
                          <Minus size={16} />
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="border p-1 rounded text-lg">
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="col-span-3 p-[2%] flex flex-col items-end justify-between">
                      <span>R.S {(item.salePrice * item.quantity).toFixed(2)}</span>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center">Your cart is empty</div>
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="check_btn">
                <div className="flex p-[2%] justify-between">
                  <span>
                    Subtotal <strong>{cartItems.length}</strong> items
                  </span>
                  <span>R.S {calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="check_out_btns p-[2%] flex flex-col gap-2">
                  <Button onPress={()=> setIsOpen(false) } className="w-full bg-white text-center p-2 border-[#c77d37] text-[#c77d37] font-bold border">
                    Continue Shopping
                  </Button>
                  <Button onPress={()=> location.replace("/checkout") } className="w-full text-center p-2 border-[#c77d37] text-white bg-[#c77d37] font-bold border">
                    Check Out
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Spinner } from "@heroui/react"; // Assuming you're using @heroui/react
import IMG from "./../../../../public/banner/slider.png";

export default function LandingSlider() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate image loading
    const img = new window.Image();
    img.src = IMG.src;
    img.onload = () => setIsLoading(false);
  }, []);

  return (
    <div className="overflow-hidden w-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Spinner size="lg" />
        </div>
      )}
      <Image
        src={IMG}
        alt="Landing Slider"
        layout="responsive"
        width={1200} // Replace with actual dimensions of your image
        height={600} // Replace with actual dimensions of your image
        className={`transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        priority
      />
    </div>
  );
}

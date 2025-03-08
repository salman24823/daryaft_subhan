"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import Features from "../Feature-Section/page";
import Image from "next/image";
import IMG_C from "@/../../public/Hero_section/Image_C.webp";
import IMG_R from "@/../../public/Hero_section/Image_R.webp";
import IMG_L from "@/../../public/Hero_section/Image_L.webp";
import { AudioLines } from "lucide-react";



const Hero = () => {
  const [rotation, setRotation] = useState(0);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1200, // Smooth animations
      easing: "ease-in-out", // For smoother transitions
      once: true, // Trigger only once
      offset: 100, // Trigger animations earlier
    });
  }, []);

  // Handle scroll rotation effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setRotation(scrollTop * 0.2); // Adjust rotation speed here
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="relative px-[5%] py-0 bg-white"
    >
      <Features />

      <AudioLines
        className="z-30 sticky left-5 top-24 w-20 h-20 text-amber-500 opacity-15"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: "transform 0.1s ease-out",
        }}
      />


      {/* Main Content */}
      <div className="SECTION--primary !gap-28 mb-48">
        {/* Left Content */}
        <div className="flex relative flex-col items-end justify-center space-y-6">
          <h2
            className="heading--primary max-[770px]:text-6xl text-8xl leading-tight !font-extrabold"
            data-aos="slide-right"
          >
            Daryaft
          </h2>
          <p
            className="des text-gray-700 text-end w-3/4 font-normal text-lg leading-relaxed"
            data-aos="fade-in"
          >
            At Daryaft, we believe clothing is more than fabric—it’s an
            extension of your personality and creativity. Our name,{" "}
            <strong>“Daryaft”</strong>, means <strong>discovery</strong>, and
            we’re here to help you discover your unique style. Whether it’s a
            classic look or a custom creation, we bring your fashion ideas to
            life with cutting-edge technology and expert craftsmanship.
          </p>
          <div className="flex gap-3" data-aos="zoom-in" data-aos-delay="400">
            <Button className="BUTTON--primary">
              Lorem Ipsum
            </Button>
            <Button className="BUTTON--primary">
              Lorem Ipsum
            </Button>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex justify-start items-center">
          <div className="relative">

            {/* Image Left */}
            <Image
              data-aos="fade-right"
              data-aos-delay="100"
              className="w-80 transform scale-100 hover:scale-105 transition-transform duration-1000"
              src={IMG_L}
              alt="Image Left"
            />

            {/* Image Center */}
            <Image
              data-aos="fade-up"
              data-aos-delay="300"
              className="absolute w-80 left-36 z-10 top-10 transform scale-95 hover:scale-105 transition-transform duration-1000"
              src={IMG_C}
              alt="Image Center"
            />

            {/* Image Right */}
            <Image
              data-aos="fade-left"
              data-aos-delay="500"
              className="absolute w-80 -top-5 z-20 left-16 transform scale-90 hover:scale-105 transition-transform duration-1000"
              src={IMG_R}
              alt="Image Right"
            />
          </div>
        </div>

      </div>

    </div>
  );
};

export default Hero;

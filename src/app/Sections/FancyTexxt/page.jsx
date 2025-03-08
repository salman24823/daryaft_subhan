"use client";

import React, { useEffect } from "react";
import { Button } from "@heroui/react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const FancyText = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease-out", // Easing function
      once: true, // Trigger animations only once
    });
  }, []);

  return (
    <div className="py-16 w-full">

      <div className="relative">
        {/* Animated Profile Images */}
        <div
          className="flex items-center justify-center mb-5 -space-x-2"
          data-aos="zoom-in"
        >
          <img
            loading="lazy"
            width="400"
            height="400"
            src="https://randomuser.me/api/portraits/women/12.jpg"
            alt="member photo"
            className="h-8 w-8 rounded-full object-cover"
          />
          <img
            loading="lazy"
            width="200"
            height="200"
            src="https://randomuser.me/api/portraits/women/45.jpg"
            alt="member photo"
            className="h-12 w-12 rounded-full object-cover"
            data-aos="zoom-in"
            data-aos-delay="200"
          />
          <img
            loading="lazy"
            width="200"
            height="200"
            src="https://randomuser.me/api/portraits/women/60.jpg"
            alt="member photo"
            className="z-10 h-16 w-16 rounded-full object-cover"
            data-aos="zoom-in"
            data-aos-delay="400"
          />
          <img
            loading="lazy"
            width="200"
            height="200"
            src="https://randomuser.me/api/portraits/women/4.jpg"
            alt="member photo"
            className="relative h-12 w-12 rounded-full object-cover"
            data-aos="zoom-in"
            data-aos-delay="600"
          />
          <img
            loading="lazy"
            width="200"
            height="200"
            src="https://randomuser.me/api/portraits/women/34.jpg"
            alt="member photo"
            className="h-8 w-8 rounded-full object-cover"
            data-aos="zoom-in"
            data-aos-delay="800"
          />
        </div>

        {/* Animated Text Content */}
        <div className="w-full">
          <h1
            className="font-semibold text-xl text-white font-[Lora] text-center"
            data-aos="fade-up"
          >
            Our Services
          </h1>

          <p
            className="text-center text-4xl font-[Lora] text-white"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Discover your potential
            <span className="px-2 py-1 relative inline-block">
              <svg
                className="stroke-current bottom-0 absolute text-white -translate-x-2"
                viewBox="0 0 410 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6.4c16.8 16.8 380.8-11.2 397.6 5.602"
                  strokeWidth="12"
                  fill="none"
                  fillRule="evenodd"
                  strokeLinecap="round"
                ></path>
              </svg>
              <span className="relative">with us</span>
            </span>
          </p>

          {/* Animated Buttons */}
          <div
            className="flex mt-5 flex-wrap justify-center gap-6"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <Button className="p-5 BUTTON--secondary">
              Get Started
            </Button>
            <Button className="p-5 BUTTON--secondary">
              Contact Now
            </Button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default FancyText;

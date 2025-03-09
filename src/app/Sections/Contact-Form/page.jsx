"use client"

import { Button } from "@heroui/react";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import CircleImage from "../../../../public/images/Circles.png";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const ContactForm = () => {
  // Initialize AOS with `once: true`
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-out", // Easing function for animations
      once: true, // Trigger animations only the first time the section enters
    });
  }, []);

  return (
    <div className="grid grid-cols-2 max-[770px]:grid-cols-1 max-md:gap-48 gap-8 px-[5%] max-[770px]:pt-2 max-[770px]:pb-20 pt-44 pb-72 bg-gradient-to-r from-[#815832] via-[#8f5a28] to-[#c77d37]">
      {/* Left Section */}
      <div
        className="flex flex-col gap-6"
        data-aos="fade-right"
        data-aos-delay="200"
      >
        <h1
          className="heading--secondary"
          data-aos="fade-down"
          data-aos-delay="400"
        >
          Have questions? Fill out our form, and we’ll get back to you soon!
        </h1>
        <p
          className="!text-white text--primary"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          Essentials is designed with your customers in mind, so you can track
          and analyze all your data in one central location. There are no limits
          to how you can look at your data.
        </p>
        <ul className="space-y-4">
          {[
            "Tendis tempor ante acu ipsum finibus.",
            "Pellentesque habitant morbi tristique.",
            "Cras facilisis tortor in metus ultrices.",
            "Maecenas volutpat leo in metus pulvinar.",
          ].map((text, index) => (
            <li
              key={index}
              className="flex items-start gap-3"
              data-aos="fade-left"
              data-aos-delay={700 + index * 100} // Incremental delay for each list item
            >
              <CircleCheck className="text-white rounded-full mt-1" />
              <p className="text-white">{text}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section */}
      <div className="relative max-[770px]:px-0 px-[18%]" data-aos="fade-left" data-aos-delay="300">
        {/* <Image
          className="animate__animated animate__fadeInUp absolute -top-28 max-[770px]:right-0 right-20 z-0 w-3/4"
          src={CircleImage}
          alt="Decorative Circle"
          data-aos="zoom-in"
          data-aos-delay="500"
        /> */}

        {/* Form */}
        <div
          className="shadow px-6 py-12 relative z-10 bg-white rounded-lg"
          data-aos="zoom-in"
          data-aos-delay="700"
        >
          <h2
            className="text-center !text-gray-900 heading--primary mb-8 !text-2xl"
            data-aos="fade-down"
            data-aos-delay="800"
          >
            Get in Touch
          </h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-aos="fade-up"
              data-aos-delay="900"
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-aos="fade-up"
              data-aos-delay="1000"
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-aos="fade-up"
              data-aos-delay="1100"
            />
            <Button
              className="w-full BUTTON--primary"
              data-aos="fade-up"
              data-aos-delay="1200"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

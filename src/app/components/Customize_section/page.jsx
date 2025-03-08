"use client";

import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "aos/dist/aos.css"; // Import AOS styles

import AOS from "aos";
import Slider from "react-slick";
import { Button } from "@heroui/react";
import Image from "next/image";
import V1 from "@/../../public/anime/1.png"
import V2 from "@/../../public/anime/2.png"
import V3 from "@/../../public/anime/3.png"

export default function CustomizeSection() {
  const [activeSlide, setActiveSlide] = React.useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    beforeChange: (current, next) => setActiveSlide(next),
    responsive: [
      {
        breakpoint: 770, // For screens <= 770px
        settings: {
          slidesToShow: 1, // Show only 1 slide
          slidesToScroll: 1, // Scroll 1 slide
        },
      },
    ],
  };


  // AOS Initialization
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-out", // Easing function for animations
      once: false, // Trigger animations every time the section is in the viewport
    });
  }, []);

  const [SlidesData, setSlidesData] = useState([
    { image: V1, heading: "Lorem Ipsum Dolor", btn: "Customize Now" },
    { image: V2, heading: "Lorem Ipsum Dolor", btn: "Customize Now" },
    { image: V3, heading: "Lorem Ipsum Dolor", btn: "Customize Now" },
    { image: V1, heading: "Lorem Ipsum Dolor", btn: "Customize Now" },
    { image: V2, heading: "Lorem Ipsum Dolor", btn: "Customize Now" }
  ]);

  return (
    <>
      <div className="mt-20 text-center">
        <h2
          data-aos="fade-down"
          className="!text-gray-900 sub-heading--primary">
          Customization
        </h2>
        <h2
          className=" heading--primary"
        >
          Your customization tailoring services.
        </h2>
      </div>

      <div className="w-[90%] my-20 overflow-hidden">
        <Slider className="" {...settings}>
          {SlidesData.map((slide, index) => (
            <div key={slide.id} className="py-4">
              <div
                className={`rounded-lg text-center overflow-hidden transform transition-all duration-500 ${activeSlide === index
                  ? "scale-105"
                  : "scale-90 opacity-70"
                  }`}
              >
                <div>
                  <Image
                    src={slide.image}
                    alt="image"
                  />
                  <div>
                    <h1 className="my-3 !text-gray-900 sub-heading--primary text-center">
                      {slide.heading}
                    </h1>
                    <Button className="BUTTON--primary w-3/4">
                      {slide.btn}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}

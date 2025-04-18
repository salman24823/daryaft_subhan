"use client";

import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "aos/dist/aos.css";

import AOS from "aos";
import Slider from "react-slick";
import { Button } from "@heroui/react";
import Image from "next/image";
import V1 from "@/../../public/anime/1.png";
import V2 from "@/../../public/anime/2.png";
import V3 from "@/../../public/anime/3.png";

export default function CustomizeSection() {
  const [activeSlide, setActiveSlide] = useState(0);

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
        breakpoint: 770,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // AOS Initialization
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out",
      once: false,
    });
  }, []);

  const slidesData = [
    { image: V1, heading: "Hoodie Ipsum Dolor", btn: "Customize Now", link: "/customizer" },
    { image: V2, heading: "Lorem Ipsum Dolor", btn: "Customize Now" },
    { image: V3, heading: "Lorem Ipsum Dolor", btn: "Customize Now" },
    { image: V1, heading: "Lorem Ipsum Dolor", btn: "Customize Now" },
    { image: V2, heading: "Lorem Ipsum Dolor", btn: "Customize Now" },
  ];

  return (
    <>
      <div className="mt-20 text-center">
        <h2 data-aos="fade-down" className="!text-gray-900 sub-heading--primary">
          Customization
        </h2>
        <h2 className="heading--primary">Your customization tailoring services.</h2>
      </div>

      <div id="custom" className="w-screen my-20 overflow-hidden">
        <Slider className="" {...settings}>
          {slidesData.map((slide, index) => (
            <div key={index} className="py-4">
              <div className={`rounded-lg text-center overflow-hidden transform transition-all duration-500 ${activeSlide === index ? "scale-105" : "scale-90 opacity-70"}`}>
                <div>
                  <Image src={slide.image} alt="image" />
                  <div>
                    <h1 className="my-3 !text-gray-900 sub-heading--primary text-center">{slide.heading}</h1>
                    <Button onPress={() => location.replace(slide.link)} className="BUTTON--primary w-3/4">
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

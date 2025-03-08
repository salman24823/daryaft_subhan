"use client"

import { useState } from "react";
import { CheckCircle, House, Palette } from "lucide-react";
import React from "react";
import FancyText from "../FancyTexxt/page";

const ServiceCards = () => {
  const [services] = useState([
    {
      id: 1,
      icon: <House className="w-10 h-auto text-white" />,
      title: "In-House Manufacturing",
      description:
        "We take pride in crafting every piece in our own facilities to ensure exceptional quality and attention to detail. From stitching to finishing, every step is handled by our skilled team.",
      features: [
        "Lorem, ipsum dolor sit amet consectetur",
        "Affordable pricing",
        "High-quality detergents used",
      ],
    },
    {
      id: 2,
      icon: <Palette className="w-10 h-auto text-white" />,
      title: "Pre-Designed Apparel",
      description:
        "Browse our curated collections of ready-to-wear styles. Whether you’re looking for casual chic, formal elegance, or ethnic charm, you’ll find something that resonates with you.",
      features: [
        "Custom care for delicate fabrics",
        "Environmentally friendly cleaning solutions",
        "High-quality detergents used",
      ],
    },
    {
      id: 3,
      icon: <CheckCircle className="w-10 h-auto text-white" />,
      title: "Sustainable Fashion",
      description:
        "We’re committed to ethical and eco-friendly practices, ensuring your fashion choices are both stylish and responsible",
      features: [
        "Same-day service available",
        "Affordable pricing",
        "High-quality detergents used",
      ],
    },
  ]);

  return (
    <div className="bg-[#a16c3d] bg-center bg-no-repeat bg-cover bgImage">
      <FancyText />

      <div className=" mb-32 w-full">
        <div className="w-full grid grid-cols-3 max-[770px]:grid-cols-1 flex-nowrap max-[770px]:px-[5%] px-[10%] gap-4 justify-center py-10">
          {services.map((service) => (
            <div
              key={service.id}
              className="group hover:border-t-5 hover:border-[#d08b5d] shadow-[#a16c3d] shadow-lg relative cursor-pointer overflow-hidden bg-[#8a5a30] px-6 pt-10 pb-8 ring-gray-900/5 transition-all duration-500 hover:-translate-y-5"
            >
              <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-[#946134] transition-all duration-500 group-hover:scale-[18]"></span>

              <div className="relative z-10">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-[#a16c3d] transition-all duration-500 group-hover:bg-[#d08b5d]">
                  {service.icon}
                </div>

                <div className="space-y-6 pt-5 text-base leading-7 text-gray-100 transition-all duration-300 group-hover:text-white/90">
                  <p>{service.description}</p>
                </div>

                <div className="pt-5 text-xl font-semibold leading-7">
                  <p>
                    <a
                      href="#"
                      className="text-white transition-all duration-300 group-hover:text-white"
                    >
                      {service.title}
                    </a>
                  </p>
                </div>

                <div className="space-y-6 pt-5 text-base leading-7 text-gray-100 transition-all duration-300 group-hover:text-white/90">
                  <ul>
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className={`py-2 ${index < service.features.length - 1 ? "border-b border-gray-200" : "border-gray-200"}`}
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ServiceCards;

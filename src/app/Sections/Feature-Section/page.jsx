"use client";

import { Avatar, AvatarGroup } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa"; // Example icons
import { TbStarsFilled } from "react-icons/tb";
import CountUp from "react-countup"; // Import CountUp

const Features = () => {
  // State to control if the section is in view
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true); // Trigger animation once the section is in view
          observer.disconnect(); // Stop observing after triggering the animation
        }
      },
      { threshold: 0.5 } // Adjust this to control when the section is considered in view
    );

    const section = document.getElementById("features-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <div
      id="features-section"
      className="z-10 w-full max-[770px]:px-[5%] px-[10%]"
    >
      <div className="bg-secondary -mt-16 w-full grid grid-cols-2 max-[770px]:flex rounded-lg shadow-xl">

        {/* first */}
        <div className="w-full py-3">
          <div className="flex gap-8 py-5 border-r max-[770px]:border-r-3 border-base-200 justify-center items-center">
            <AvatarGroup isBordered max={3}>
              <Avatar
                size="lg"
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              />
              <Avatar
                size="lg"
                src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
              />
              <Avatar
                size="lg"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </AvatarGroup>
            <h2 className="text-neutral text-3xl font-normal">
              {inView && <CountUp end={4.8} duration={2.5} decimals={1} />}+
            </h2>
          </div>
        </div>

        {/* second */}
        <div className="max-[770px]:hidden grid grid-cols-2 py-3 justify-center items-center">
          <div className="flex py-5 border-r border-base-200 items-center justify-center">
            <TbStarsFilled className="text-neutral w-28 h-16" />
            <h2 className="text-neutral text-3xl font-normal">
              {inView && <CountUp end={100} duration={2.5} />}+
            </h2>
          </div>

          <div className="flex py-5 items-center justify-center">
            <FaStar className="text-neutral w-20 h-8" />
            <h2 className="text-neutral text-3xl font-normal">
              {inView && <CountUp end={10} duration={2.5} />}+
            </h2>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Features;

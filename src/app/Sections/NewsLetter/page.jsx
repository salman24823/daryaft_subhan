"use client"

import { Button } from "@heroui/react";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const NewsLetter = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-out", // Easing function for animations
      once: true, // Trigger animations only the first time
    });
  }, []);

  return (
    <div
      className="w-full bg-white pt-44 relative"
      // data-aos="fade-in"
    >
      {/* Google Maps Embed */}
      <div
        className="absolute w-full -top-32 z-10 px-[5%]"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        <div className="border flex justify-center rounded-lg overflow-hidden shadow-sm shadow-black border-slate-50">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217897.6204657345!2d72.92448952265913!3d31.423759040174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392242a895a55ca9%3A0xdec58f88932671c6!2sFaisalabad%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1737018854309!5m2!1sen!2s"
            className="w-full h-64"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="relative">
        {/* SVG Decorative Bottom */}
        <div className="absolute inset-x-0 bottom-0">
          <svg
            viewBox="0 0 224 12"
            fill="currentColor"
            className="w-full -mb-1 text-[#a16c3d]"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z"></path>
          </svg>
        </div>

        {/* Content */}
        <div
          className="px-4 py-16"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="relative max-w-2xl mx-auto text-center">
            {/* Title */}
            <h2
              className="mb-6 heading--primary"
              data-aos="fade-down"
              data-aos-delay="500"
            >
              Subscribe to our newsletter
            </h2>

            {/* Description */}
            <p
              className="mb-6 text--primary"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae. explicabo. Sed ut perspiciatis unde omnis.
            </p>

            {/* Form */}
            <form
              className="flex rounded-2xl overflow-hidden justify-center items-center w-full mb-4"
              data-aos="zoom-in"
              data-aos-delay="700"
            >
              <input
                placeholder="Email"
                required=""
                type="text"
                className="flex-grow w-full h-12 px-4 text-gray-900 transition rounded-l-2xl duration-200 border-2 border-[#a8744a] appearance-none bg-white focus:border-teal-accent-700 focus:outline-none focus:shadow-outline"
              />
              <Button
                className="bg-[#a8744a] p-6 text-white rounded-none"
                data-aos="fade-left"
                data-aos-delay="800"
              >
                Subscribe
              </Button>
            </form>

            {/* Footer Text */}
            <p
              className="w-full text-center mb-10 text-xs tracking-wide text-gray-900"
              data-aos="fade-up"
              data-aos-delay="900"
            >
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque.
            </p>

            {/* Scroll Down Icon */}
            <a
              href="/"
              aria-label="Scroll down"
              className="flex items-center justify-center w-10 h-10 mx-auto text-[#a8744a] duration-300 transform border border-[#a8744a] rounded-full hover:text-teal-accent-400 hover:border-teal-accent-400 hover:shadow hover:scale-110"
              data-aos="fade-up"
              data-aos-delay="1000"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="currentColor"
              >
                <path d="M10.293,3.293,6,7.586,1.707,3.293A1,1,0,0,0,.293,4.707l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,1,0-1.414-1.414Z"></path>
              </svg>
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};

export default NewsLetter;

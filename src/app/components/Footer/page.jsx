"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BiSolidUpArrow } from "react-icons/bi";
import { TiSocialTwitter, TiSocialInstagram, TiSocialFacebookCircular } from "react-icons/ti";
import { IoMdMail } from "react-icons/io";
import Link from "next/link";

const Footer = () => {

  useEffect(() => {
    AOS.init({
      duration: 500, // Animation duration in milliseconds
      once: true, // Ensure animations run only once
    });
  }, []);

  const FooterLinks = [
    { Title: "Home" },
    { Title: "Services" },
    { Title: "About us" },
    { Title: "Blogs" },
    { Title: "Contact us" },
    { Title: "Privacy Policy" },
  ];

  const SocialIcons = [
    { icon: <TiSocialInstagram className="icon relative z-10" />, link: "https://www.instagram.com" },
    { icon: <TiSocialFacebookCircular className="icon relative z-10" />, link: "https://www.facebook.com" },
    { icon: <TiSocialTwitter className="icon relative z-10" />, link: "https://www.twitter.com" },
    { icon: <IoMdMail className="icon relative z-10" />, link: "mailto:support@alishaimpex.com" },
  ];

  return (
    <div className="w-full relative bg-[#a16c3d] overflow-hidden text-white">
      <footer className="flex flex-col gap-6 p-[5%]">
        <div className="ft_cont grid grid-cols-[1.5fr,1fr,1fr,1fr] py-[3%] gap-6">

          <div
            className="flex flex-col gap-4"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            <div className="logo flex gap-2 items-center">
              
              <h1 className="text-2xl font-bold text-white">Daryaft</h1>
            </div>
            <div className="sin">
              <h2 className="text-transparent text-[4rem]">since 1980.</h2>
            </div>
            <span className="mt-8 text-white">
              2025 <span className="text-white cursor-pointer">Daryaft.</span> All Rights reserved.
            </span>
          </div>

          <div
            className="footer_card"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="child">
              <span className="text-[1.5rem] font-semibold">Faisalabad</span>
              <p className="font-light text-white text-base leading-6">
                523 Sylvan Ave, 5th Floor <br /> Mountain View, CA 94041 USA
              </p>
            </div>
            <div
              className="child"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <span className="text-[1.5rem] font-semibold">Social Links</span>
              <div className="social_links flex gap-2 mt-2">
                {SocialIcons.map((value, index) => (
                  <a
                    key={index}
                    href={value.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="s_link border border-white p-2 text-[1.5rem] relative overflow-hidden hover:bg-transparent transition-all"
             
                  >
                    {value.icon}
                    <span className="footer_animation"></span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div
            className="footer_card"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="child">
              <span className="text-[1.5rem] font-semibold">Contact</span>
              <ul className="list-none px-2 mt-2">
                <li
                  className="font-light text-lg hover:text-white cursor-pointer transition-all"
            
                >
                  +1934719 8948
                </li>
                <li
                  className="font-light text-lg hover:text-white cursor-pointer transition-all"
            
                >
                  +1934719 8948
                </li>
              </ul>
            </div>
            <div
              className="child"
        
            >
              <span className="text-[1.5rem] font-semibold">Email</span>
              <Link href="/">
                <span className="font-light text-white hover:text-white">support@daryaft.com</span>
              </Link>
            </div>
          </div>

          <div
            className="child"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <span className="text-[1.5rem] font-semibold">Main Menu</span>
            <div className="nav_links flex flex-col font-light gap-1 mt-2">
              {FooterLinks.map((menu, index) => (
                <Link
                  key={index}
                  href={`/${menu.Title.replace(/\\s+/g, "").toLowerCase()}`}
                  className="transition-all duration-200 pl-2 border-l-2 border-transparent hover:font-semibold hover:border-white"
                >
                  {menu.Title}
                </Link>
              ))}
            </div>
          </div>

        </div>

        <hr
          className="w-full border-white"
          // data-aos="fade-up"
          // data-aos-delay="700"
        />

        <span
          className="self-center text-white text-sm"
        >
          Copyright @ 2025 <span className="text-white cursor-pointer">Daryaft.</span> All Rights reserved.
        </span>
      </footer>
    </div>
  );
};

export default Footer;

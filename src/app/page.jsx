"use client"

import Faqs from "./components/Faqs/page";
import LandingSlider from "./components/landingSlider/page";
import ContactForm from "./Sections/Contact-Form/page";
// import Features from "./Sections/Feature-Section/page";
import Hero from "./Sections/Hero-Section/page";
import NewsLetter from "./Sections/NewsLetter/page";
import ServiceCards from "./Sections/Service-Cards/page";
import Newarrival from "./Sections/Newarrival_Section/page";
import Trending_items from "./Sections/Trending_items/page";
import Featured_products from "./Sections/Featured_products/page";
import Category from "./Sections/Category/page";
import CustomizeSection from "./components/Customize_section/page";
import { useEffect, useState } from "react";

export default function Home() {

  const [status, setStatus] = useState()

  useEffect(() => {

    async function fetchStatus() {
      try {
        const response = await fetch("/api/handleState");
        const data = await response.json();

        if (!response.ok) {
          toast.error("Failed to fetch status");
        }

        setStatus(data)

      } catch (error) {
        toast.error("Failed to fetch status");
      }
    }

    fetchStatus()

  }, [])


  return (
    <>
      <p onClick={() => console.log(status, "status")} >asd</p>
      <LandingSlider />
      <Hero />
      <Category />
      <Featured_products />
      <Newarrival />
      <Trending_items />
      <ServiceCards />
      {
        status?.data?.isSelected === true ? (
          <CustomizeSection />
        ) : null
      }

      <Faqs />
      <ContactForm />
      <NewsLetter />
    </>
  );
}

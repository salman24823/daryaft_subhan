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


export default function Home() {
  return (
   <>
    <LandingSlider />
    <Hero />
    <Category />
    <Featured_products />
    <Newarrival />
    <Trending_items />
    <ServiceCards />
    <CustomizeSection />
    <Faqs />
    <ContactForm />
    <NewsLetter />
   </>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@heroui/react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

export default function Faqs() {
    const [selectedKeys, setSelectedKeys] = useState(new Set(["1"])); // Accordion state

    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            easing: "ease-out", // Easing function for animations
            once: true, // Trigger animations only the first time the section enters
        });
    }, []);

    const faqData = [
        {
            id: "1",
            question: "What services do you provide?",
            answer:
                "We provide bespoke tailoring services online. From custom suits to shirts, our tailors ensure a perfect fit and top-notch quality, all delivered to your door.",
        },
        {
            id: "2",
            question: "How do I take my measurements?",
            answer:
                "You can follow our detailed measurement guide online or book a virtual appointment with one of our expert tailors to guide you through the process.",
        },
        {
            id: "3",
            question: "What materials do you use?",
            answer:
                "We use the finest materials available, including high-quality wool, cotton, and linen, sourced from the best suppliers to ensure durability and comfort.",
        },
    ];

    return (
        <div id="faq-section" className="px-[10%] w-full py-20">
            {/* FAQ Title and Description */}
            <div className="text-center mb-16">
                <h2
                    className="sub-heading--primary !text-gray-900"
                    data-aos="fade-up"
                >
                    Frequently Asked Questions
                </h2>
                <h2
                    className="heading--primary"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    We answer you with precision and care.
                </h2>
            </div>

            {/* Accordion Section */}
            <div
                className="bg-white w-full border border-slate-100 shadow-sm rounded-lg"
                data-aos="fade-up"
                data-aos-delay="300"
            >
                <Accordion
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                >
                    {faqData.map((faq, index) => (
                        <AccordionItem
                            key={faq.id}
                            aria-label={`Accordion ${faq.id}`}
                            title={faq.question}
                            className="px-4 py-2"
                            data-aos="fade-up"
                            data-aos-delay={300 + index * 100} // Incremental delay for each tab
                        >
                            <p className="text-gray-600 px-6 pb-4 leading-relaxed">
                                {faq.answer}
                            </p>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}

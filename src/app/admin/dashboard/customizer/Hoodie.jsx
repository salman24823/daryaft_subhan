"use client";

import { Button, Tab, Tabs } from '@heroui/react';
import { CldUploadWidget } from 'next-cloudinary';
import React, { useState, useEffect } from 'react';

const Hoodie = () => {
    const [variants, setVariants] = useState([]);

    useEffect(() => {
        // Fetch variants on component mount
        const fetchVariants = async () => {
            try {
                const response = await fetch('/api/handleCustomizer');
                if (!response.ok) {
                    throw new Error("Failed to fetch variants");
                }
                const data = await response.json();
                setVariants(data);
            } catch (error) {
                console.error("Error fetching variants:", error);
            }
        };

        fetchVariants();
    }, []);

    const addVariation = async (colorName, colorCode, imageUrl) => {
        if (!colorName || !colorCode || !imageUrl) return;

        // Validate hex color code
        const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        if (!hexColorRegex.test(colorCode)) {
            alert("Please enter a valid hex color code (e.g., #fff or #ffffff).");
            return;
        }

        // Save the variant to the database
        try {
            const response = await fetch('/api/handleCustomizer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: "Hoodie",
                    variantImage: imageUrl,
                    variantColorName: colorName,
                    variantColorCode: colorCode,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to save variant");
            }

            const data = await response.json();
            setVariants(prevVariants => [...prevVariants, data.variant]);
        } catch (error) {
            console.error("Error saving variant:", error);
            alert("Failed to save variant. Please try again.");
        }
    };

    const removeVariation = async (index, variantId) => {
        try {
            const response = await fetch('/api/handleCustomizer', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: variantId }),
            });

            if (!response.ok) {
                throw new Error("Failed to delete variant");
            }

            // Remove the variant from the local state
            setVariants(prevVariants => prevVariants.filter((_, i) => i !== index));
        } catch (error) {
            console.error("Error deleting variant:", error);
            alert("Failed to delete variant. Please try again.");
        }
    };

    const [tabItems, settabItems] = useState([
        { key: "Cotton", title: "Cotton", },
        { key: "PolyEster", title: "PolyEster", },
    ]);

    return (
        <>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="mb-8 flex justify-between ">
                    
                    <label className="block text-lg font-semibold text-gray-800">
                        Add Variations
                    </label>

                    <div className='flex gap-2'>

                        <div className="flex rounded-xl border border-blue-500 overflow-hidden items-center">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-2 py-1 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            />
                            <Button
                                color='default'
                                size='sm'
                                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-none hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                            >
                                Add Stuff
                            </Button>
                        </div>

                        <CldUploadWidget
                            uploadPreset="ml_default"
                            options={{ sources: ["local", "url"] }}
                            onSuccess={(result) => {
                                const uploadedImage = result.info.secure_url;
                                const colorName = prompt("Enter color name:");
                                const colorCode = prompt("Enter color hex code (e.g., #fff):");
                                if (colorName && colorCode)
                                    addVariation(colorName, colorCode, uploadedImage);
                            }}
                            onError={(error) => {
                                console.error("Upload failed:", error);
                                alert("Image upload failed. Please try again.");
                            }}
                        >
                            {({ open }) => (
                                <Button
                                    className='bg-blue-600 text-white'
                                    size='sm'
                                    onPress={() => open()}
                                >
                                    Add Variation
                                </Button>
                            )}
                        </CldUploadWidget>

                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
                    {variants.map((v, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <div
                                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                                style={{ backgroundColor: v.variantColorCode }}
                            ></div>
                            <img
                                src={v.variantImage}
                                alt={v.variantColorName}
                                className="w-24 h-24 mt-4 object-cover rounded-lg"
                            />
                            <p className="text-sm font-medium text-gray-700 mt-3">
                                {v.variantColorName}
                            </p>
                            <button
                                onClick={() => removeVariation(index, v._id)}
                                className="text-xs text-red-500 hover:text-red-600 mt-2 transition-colors duration-200"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>


            <div className="p-6 mt-4 bg-white rounded-lg shadow-md">

                <Tabs isVertical aria-label="Options">
                    {tabItems.map(({ key, title }) => (
                        <Tab key={key} title={title}>

                            <div>
                                {variants.map((v, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                                    >
                                        <div
                                            className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                                            style={{ backgroundColor: v.variantColorCode }}
                                        ></div>
                                        <img
                                            src={v.variantImage}
                                            alt={v.variantColorName}
                                            className="w-24 h-24 mt-4 object-cover rounded-lg"
                                        />
                                        <p className="text-sm font-medium text-gray-700 mt-3">
                                            {v.variantColorName}
                                        </p>
                                        <button
                                            onClick={() => removeVariation(index, v._id)}
                                            className="text-xs text-red-500 hover:text-red-600 mt-2 transition-colors duration-200"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}

                            </div>






                        </Tab>
                    ))}
                </Tabs>

            </div>
        </>

    );
};

export default Hoodie;
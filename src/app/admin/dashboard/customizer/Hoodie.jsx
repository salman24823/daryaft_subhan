"use client";

import { Button, Tab, Tabs } from "@heroui/react";
import { CldUploadWidget } from "next-cloudinary";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Hoodie = () => {
    const [variants, setVariants] = useState([]);
    const [stuffList, setStuffList] = useState([]); // Fixed state for multiple stuff items
    const [stuffName, setStuffName] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        fetchVariants();
        fetchStuff();
    }, []);

    async function fetchVariants() {
        try {
            const response = await fetch("/api/handleCustomizer");
            if (!response.ok) throw new Error("Failed to fetch variants");

            const data = await response.json();
            setVariants(data);
        } catch (error) {
            console.error("Error fetching variants:", error);
        }
    }

    async function fetchStuff() {
        try {
            const response = await fetch("/api/handleStuff", { method: "GET" });
            if (!response.ok) throw new Error("Failed to fetch stuff");

            const data = await response.json();
            setStuffList(data.stuff || []); // Ensure array format
        } catch (error) {
            console.error(error);
        }
    }

    async function handleStuff() {
        if (!stuffName) return alert("Stuff name cannot be empty.");

        setLoading(true);
        try {
            const response = await fetch("/api/handleStuff", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ stuffName }),
            });

            if (!response.ok) throw new Error("Failed to add stuff");

            const data = await response.json();
            setStuffList((prev) => [...prev, data.stuff]);
            setStuffName("");

            toast.success("Successfully added stuff");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const addVariation = async (colorName, colorCode, imageUrl) => {
        if (!colorName || !colorCode || !imageUrl) return;
        const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

        if (!hexColorRegex.test(colorCode)) {
            alert("Enter a valid hex color code (e.g., #ffffff)");
            return;
        }

        try {
            const response = await fetch("/api/handleCustomizer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: "Hoodie",
                    variantImage: imageUrl,
                    variantColorName: colorName,
                    variantColorCode: colorCode,
                }),
            });

            if (!response.ok) throw new Error("Failed to save variant");

            const data = await response.json();
            setVariants((prev) => [...prev, data.variant]);
        } catch (error) {
            console.error("Error saving variant:", error);
            alert("Failed to save variant. Please try again.");
        }
    };

    const removeVariation = async (index, variantId) => {
        try {
            const response = await fetch("/api/handleCustomizer", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: variantId }),
            });

            if (!response.ok) throw new Error("Failed to delete variant");

            setVariants((prev) => prev.filter((_, i) => i !== index));
        } catch (error) {
            console.error("Error deleting variant:", error);
            alert("Failed to delete variant. Please try again.");
        }
    };

    async function updateVariant(variantStuff){
        console.log(variantStuff , "console")
        return
        const response = await fetch("/api/handleCustomizer",{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                variantID,
                variantStuff,
            })
        })
    }
    
    return (
        <>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="mb-8 flex justify-between">
                    <label className="block text-lg font-semibold text-gray-800">Add Variations</label>

                    <div className="flex gap-2">
                        <div className="flex rounded-xl border border-blue-500 overflow-hidden items-center">
                            <input
                                type="text"
                                placeholder="Enter Stuff Name"
                                className="w-full px-2 py-1 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                value={stuffName}
                                onChange={(e) => setStuffName(e.target.value)}
                            />
                            <Button
                                isLoading={loading}
                                color="default"
                                size="sm"
                                className="px-6 py-2 bg-blue-600 text-white font-semibold"
                                onPress={handleStuff}
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
                                const colorCode = prompt("Enter color hex code (e.g., #ffffff):");
                                if (colorName && colorCode) addVariation(colorName, colorCode, uploadedImage);
                            }}
                            onError={(error) => {
                                console.error("Upload failed:", error);
                                alert("Image upload failed. Please try again.");
                            }}
                        >
                            {({ open }) => (
                                <Button className="bg-blue-600 text-white" size="sm" onPress={() => open()}>
                                    Add Variation
                                </Button>
                            )}
                        </CldUploadWidget>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
                    {variants.map((v, index) => (
                        <div key={index} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm">
                            <div className="w-10 h-10 rounded-full" style={{ backgroundColor: v.variantColorCode }}></div>
                            <img src={v.variantImage} alt={v.variantColorName} className="w-24 h-24 mt-4 object-cover" />
                            <p className="text-sm font-medium text-gray-700 mt-3">{v.variantColorName}</p>
                            <button onClick={() => removeVariation(index, v._id)} className="text-xs text-red-500 mt-2">
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-6 mt-4 bg-white rounded-lg shadow-md">
                <Tabs isVertical>
                    {stuffList.map(({ _id, stuffName }) => (
                        <Tab title={stuffName} key={_id}>
                            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
                                {variants.map((v, index) => (
                                    <div onClick={()=> updateVariant(stuffName) } key={index} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm">
                                        <div className="w-10 h-10 rounded-full" style={{ backgroundColor: v.variantColorCode }}></div>
                                        <img src={v.variantImage} alt={v.variantColorName} className="w-24 h-24 mt-4 object-cover" />
                                        <p className="text-sm font-medium text-gray-700 mt-3">{v.variantColorName}</p>
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

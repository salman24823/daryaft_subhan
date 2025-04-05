"use client";

import { Button, Select, SelectItem } from '@heroui/react';
import { CheckIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const Color = ({ apiData, selectedColor, setSelectedColor }) => {
    const [availableColors, setAvailableColors] = useState([]);
    const [stuffTypes, setStuffTypes] = useState([]);
    const [selectedStuff, setSelectedStuff] = useState('');


    useEffect(() => {
        if (apiData && apiData.variations) {
            // Extract unique stuff types from apiData
            const uniqueStuffTypes = [
                ...new Set(apiData.variations.map(variation => variation.variants[0].stuffType))
            ];
            setStuffTypes(uniqueStuffTypes);
        }
    }, [apiData]);

    useEffect(() => {
        if (selectedStuff) {
            // Filter available colors based on the selected stuff type
            const colors = apiData.variations
                .filter(variation => variation.variants[0].stuffType === selectedStuff)
                .map(variation => ({
                    colorName: variation.variants[0].color,  // Store the color name
                    colorCode: variation.variants[0].colorCode, // Store the color code
                    colorImage: variation.variants[0].image, // Store the color code
                    stuffPrice: variation.variants[0].price, // Store the color code
                    stuffName: variation.variants[0].stuffType // Store the color code
                }));

            setAvailableColors(colors);
        }
    }, [selectedStuff, apiData]);


    return (
        <div className='space-y-5'>

            {/* Select Stuff Types */}
            <Select size='sm' label='Select Stuff' onSelectionChange={(value) => setSelectedStuff(value.currentKey)} value={selectedStuff}>
                {stuffTypes.length === 0 ? "Loading" : stuffTypes.map((stuffType) => (
                    <SelectItem key={stuffType} value={stuffType}>
                        {stuffType}
                    </SelectItem>
                ))}
            </Select>


            {/* Display Available Colors */}
            <div className="flex flex-wrap gap-3 items-center">
                {availableColors.length === 0 ? (
                    <p className="text-gray-500 text-sm">Please Select the Stuff First !</p>
                ) : (
                    availableColors.map((color) => (
                        <Button
                            key={color.colorCode}
                            aria-label={`Select ${color.colorName || 'color'} ${color.colorCode}`}
                            className={`
                            relative p-0 min-w-10 h-10 rounded-full 
                            transition-all duration-200 ease-in-out
                            hover:scale-105 hover:shadow-md
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                            ${selectedColor === color.colorCode
                                    ? 'ring-2 ring-offset-2 ring-gray-800 shadow-inner'
                                    : 'border border-gray-100 dark:border-gray-700'
                                }
                            `}
                            style={{ backgroundColor: color.colorCode }}
                            onPress={() => setSelectedColor(color)}
                        >
                            {/* Selection indicator (checkmark) */}
                            {selectedColor.colorCode === color.colorCode && (
                                <span className="absolute inset-0 flex items-center justify-center">
                                    <CheckIcon className="w-4 h-4 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" />
                                </span>
                            )}
                        </Button>
                    ))
                )}
            </div>
        </div>
    );
};

export default Color;

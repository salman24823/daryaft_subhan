import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";

const Zipper = () => {
    const [variations, setVariations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchVariations = async () => {
            try {
                const response = await fetch("/api/handleVariation?type=Zipper",);
                const data = await response.json();
                if (response.ok) {
                    setVariations(data.variations);
                } else {
                    console.error("Error fetching variations:", data.error);
                }
            } catch (error) {
                console.error("Network error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVariations();
    }, []);

    return (
        <div className="">
            <div className="mt-5 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <Table aria-label="Variation Data" className="min-w-full">
                    <TableHeader className="bg-gray-50">
                        <TableColumn className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Image
                        </TableColumn>
                        {/* <TableColumn className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                        </TableColumn> */}
                        <TableColumn className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Stuff Type
                        </TableColumn>
                        <TableColumn className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Color
                        </TableColumn>
                        <TableColumn className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Color Code
                        </TableColumn>
                        <TableColumn className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                        </TableColumn>
                        <TableColumn className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                        </TableColumn>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-200">
                        {isLoading ? (
                            <TableRow>
                                <TableCell className="px-6 py-2 text-center">
                                    <div className="animate-pulse flex justify-center">
                                        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                                    </div>
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                {/* <TableCell></TableCell> */}
                                <TableCell></TableCell>
                            </TableRow>
                        ) : variations.length > 0 ? (
                            variations.map((variant, index) => (
                                <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                                    <TableCell className="px-6 py-2 whitespace-nowrap">
                                        <img
                                            src={variant.image}
                                            alt={variant.color}
                                            className="w-16 h-16 object-cover rounded-md border border-gray-200"
                                        />
                                    </TableCell>
                                    {/* <TableCell className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {variant.title}
                                    </TableCell> */}
                                    <TableCell className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                        {variant.stuffType}
                                    </TableCell>
                                    <TableCell className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <span className="mr-2">{variant.color}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center">
                                            {variant.colorCode && (
                                                <>
                                                    <span
                                                        className="inline-block w-4 h-4 rounded-full mr-2 border border-gray-300"
                                                        style={{ backgroundColor: variant.colorCode }}
                                                    ></span>
                                                    {variant.colorCode}
                                                </>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                        ${variant.price}
                                    </TableCell>
                                    <TableCell className="px-6 py-2 whitespace-nowrap text-sm font-medium">
                                        <button className="text-red-600 hover:text-red-900 transition-colors">
                                            Delete
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))

                        ) : (
                            <TableRow>
                                <TableCell className="px-6 py-2 text-center text-sm text-gray-500" colSpan="full">
                                    No variations available
                                </TableCell>
                                <TableCell></TableCell>
                                {/* <TableCell></TableCell> */}
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Zipper;
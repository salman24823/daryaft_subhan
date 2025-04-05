import React, { useEffect, useState } from "react";
import Action from "./action";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";

const Customizer = () => {
    const [variations, setVariations] = useState([]);

    useEffect(() => {
        const fetchVariations = async () => {
            try {
                const response = await fetch("/api/handleVariation");
                const data = await response.json();
                if (response.ok) {
                    setVariations(data.variations);
                } else {
                    console.error("Error fetching variations:", data.error);
                }
            } catch (error) {
                console.error("Network error:", error);
            }
        };

        fetchVariations();
    }, []);

    return (
        <div>
            <Action />
            <div className="mt-5">
                <Table aria-label="Variation Data">
                    <TableHeader>
                        <TableColumn className="w-32">Image</TableColumn>
                        <TableColumn>Title</TableColumn>
                        <TableColumn>Stuff Type</TableColumn>
                        <TableColumn>Color</TableColumn>
                        <TableColumn>Color Code</TableColumn>
                        <TableColumn>Price</TableColumn>
                        <TableColumn>Action</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {variations.length > 0 ? (
                            variations.map((variation) =>
                                variation.variants.map((variant, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <img
                                                src={variant.image}
                                                alt={variant.color}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                        </TableCell>
                                        <TableCell>{variation.title}</TableCell>
                                        <TableCell>{variant.stuffType}</TableCell>
                                        <TableCell>{variant.color}</TableCell>
                                        <TableCell>{variant.colorCode}</TableCell>
                                        <TableCell>${variant.price}</TableCell>
                                        <TableCell>Delete</TableCell>
                                    </TableRow>
                                ))
                            )
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                    No Variations Available
                                </TableCell>
                                <TableCell colSpan={6} className="text-center">
                                    No Variations Available
                                </TableCell>
                                <TableCell colSpan={6} className="text-center">
                                    No Variations Available
                                </TableCell>
                                <TableCell colSpan={6} className="text-center">
                                    No Variations Available
                                </TableCell>
                                <TableCell colSpan={6} className="text-center">
                                    No Variations Available
                                </TableCell>
                                <TableCell colSpan={6} className="text-center">
                                    No Variations Available
                                </TableCell>
                                <TableCell colSpan={6} className="text-center">
                                    No Variations Available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Customizer;
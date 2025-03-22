import dbConnection from '@/config/dbConnection';
import Variant from '@/models/variantSchema';
import { NextResponse } from 'next/server';

// POST request to save a variant
export async function POST(request) {
    await dbConnection();

    try {
        const { variantImage, variantColorName, variantColorCode, title } = await request.json();

        // Validate input
        if (!variantImage || !variantColorName || !variantColorCode) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Create a new variant
        const newVariant = new Variant({
            title,
            variantImage,
            variantColorName,
            variantColorCode,
        });

        // Save to the database
        await newVariant.save();

        return NextResponse.json(
            { message: "Variant saved successfully", variant: newVariant },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving variant:", error);
        return NextResponse.json(
            { error: "Failed to save variant" },
            { status: 500 }
        );
    }
}

// GET request to fetch all variants
export async function GET() {
    await dbConnection();

    try {
        const variants = await Variant.find({});
        return NextResponse.json(variants, { status: 200 });
    } catch (error) {
        console.error("Error fetching variants:", error);
        return NextResponse.json(
            { error: "Failed to fetch variants" },
            { status: 500 }
        );
    }
}

// DELETE request to delete a variant by ID
export async function DELETE(request) {
    await dbConnection();

    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: "Variant ID is required" },
                { status: 400 }
            );
        }

        const deletedVariant = await Variant.findByIdAndDelete(id);

        if (!deletedVariant) {
            return NextResponse.json(
                { error: "Variant not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Variant deleted successfully", variant: deletedVariant },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting variant:", error);
        return NextResponse.json(
            { error: "Failed to delete variant" },
            { status: 500 }
        );
    }
}
import dbConnection from "@/config/dbConnection";
import customizeModel from "@/models/customizeModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Connect to the database
    await dbConnection();

    // Parse request body
    const body = await req.json();
    const { logo, colorName, colorCode, colorImage } = body;

    // Validate input
    if (!logo || !colorName || !colorCode || !colorImage) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure the model exists before calling it
    if (!customizeModel) {
      throw new Error("Customize Model is not defined.");
    }

    // Create a new customizer document
    const newCustomizer = new customizeModel({
      logo,
      colorName,
      colorCode,
      colorImage,
    });

    await newCustomizer.save();

    // Return success response
    return NextResponse.json(
      { success: true, customizer: newCustomizer },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error uploading customizer details:", error.message);
    return NextResponse.json(
      { error: "Failed to upload customizer information", details: error.message },
      { status: 500 }
    );
  }
}

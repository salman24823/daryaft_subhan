import dbConnection from "@/config/dbConnection";
import customizeModel from "@/models/customizeModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // ✅ Connect to the database
    await dbConnection();

    // ✅ Fetch all customizations
    const customizers = await customizeModel.find({});

    // ✅ Return response with status code
    return NextResponse.json(
      { success: true, data: customizers },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Failed fetching data:", error.message);
    return NextResponse.json(
      { success: false, error: "Failed to fetch data", details: error.message },
      { status: 500 }
    );
  }
}

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
      {
        error: "Failed to upload customizer information",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

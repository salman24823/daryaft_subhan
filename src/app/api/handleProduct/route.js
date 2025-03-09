import dbConnection from "@/config/dbConnection";
import ProductModel from "@/models/productModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Connect to the database
    await dbConnection();

    // Parse the request body
    const { productData } = await req.json();

    // Validate required fields
    if (
      !productData.name ||
      !productData.description ||
      !productData.regularPrice ||
      !productData.category
    ) {
      return new NextResponse(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Create a new product document
    const newProduct = new ProductModel(productData);

    // Save the product to the database
    await newProduct.save();

    // Return success response
    return new NextResponse(
      JSON.stringify({ success: true, product: newProduct }),
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Error uploading product:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to upload product" }),
      { status: 500 }
    );
  }
}
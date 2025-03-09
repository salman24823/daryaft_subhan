import dbConnection from "@/config/dbConnection";
import ProductModel from "@/models/productModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to the database
    await dbConnection();
    // Fetch all products from the database
    const products = await ProductModel.find({});
    console.log(products, "products");
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching Products:", error);
    return NextResponse.json(
      { error: "Failed to fetch Products" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    // Connect to the database
    await dbConnection();

    // Parse the request body
    const { productData } = await req.json();

    console.log(productData,"productData")

    // Validate required fields
    if (
      !productData.name ||
      !productData.description ||
      !productData.regularPrice ||
      !productData.categories 
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

export async function PUT(req) {
  try {
    // Connect to the database
    await dbConnection();
    // Parse the request body
    const { productId, productData } = await req.json();
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
    // Update the product document
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      productData,
      { new: true }
    );
    // Return success response
    return new NextResponse(
      JSON.stringify({ success: true, product: updatedProduct }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading product:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to upload product" }),
      { status: 500 }
    );
  }
}
export async function Delete(req) {
  try {
    // Connect to the database
    await dbConnection();
    // Parse the request body
    const { productId } = await req.json();
    // Delete the product document
    await ProductModel.findByIdAndDelete(productId);
    // Return success response
    return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error Deleting product:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to Delete product" }),
      { status: 500 }
    );
  }
}

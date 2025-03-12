import dbConnection from "@/config/dbConnection";
import ProductModel from "@/models/productModel";
import { NextResponse } from "next/server";

export const revalidate = 0;


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

    // Parse request body
    const { salePrice, id } = await req.json();

    if (!id || !salePrice) {
      return new NextResponse(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Find and update the product
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { salePrice },
      { new: true }
    );

    if (!updatedProduct) {
      return new NextResponse(
        JSON.stringify({ error: "Product not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({ success: true, product: updatedProduct }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to update product" }),
      { status: 500 }
    );
  }
}



export async function DELETE(req) {
  try {
    // Connect to the database
    await dbConnection();
    // Parse the request body
    const { id } = await req.json();
    console.log(id,"id")
    // Delete the product document
    await ProductModel.findByIdAndDelete(id);
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

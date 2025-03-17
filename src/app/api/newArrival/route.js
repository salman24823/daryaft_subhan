import dbConnection from "@/config/dbConnection";
import ProductModel from "@/models/productModel";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Opt out of static rendering

export const revalidate = 0;

export async function GET(request) {
  try {
    await dbConnection();

    // If category is provided, fetch products by category
    const products = await ProductModel.find();
    // Return the products data as a JSON response
    return NextResponse.json(products);
    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

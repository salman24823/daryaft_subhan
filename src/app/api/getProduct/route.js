import dbConnection from '@/config/dbConnection';
import ProductModel from '@/models/productModel';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await dbConnection();

    // Extract the product_id from the query parameters
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('product_id');

    console.log(productId, "productId");

    if (!productId) {
      return NextResponse.json(
        { error: 'product_id is required' },
        { status: 400 }
      );
    }

    const product = await ProductModel.findById(productId);
    console.log(product, "product");

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Return the product data as a JSON response
    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
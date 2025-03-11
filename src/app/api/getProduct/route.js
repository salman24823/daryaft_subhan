import dbConnection from '@/config/dbConnection';
import ProductModel from '@/models/productModel';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Opt out of static rendering

export async function GET(request) {
  try {
    await dbConnection();

    // Extract query parameters from the URL
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('product_id');
    const category = searchParams.get('category');
    const collectionName = searchParams.get('collectionName');

    // If product_id is provided, fetch a single product by ID
    if (productId) {
      const product = await ProductModel.findById(productId);

      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }

      // Return the product data as a JSON response
      return NextResponse.json(product);
    }

    // If category is provided, fetch products by category
    if (category) {
      const products = await ProductModel.find({ categories: category });

      // Return the products data as a JSON response
      return NextResponse.json(products);
    }

    // If category is provided, fetch products by category
    if (collectionName) {
      const products = await ProductModel.find({ collectionName: collectionName });

      // Return the products data as a JSON response
      return NextResponse.json(products);
    }

    // If neither product_id nor category is provided, return an error
    return NextResponse.json(
      { error: 'Either product_id or category is required' },
      { status: 400 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
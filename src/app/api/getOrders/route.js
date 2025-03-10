import dbConnection from '@/config/dbConnection';
import ProductModel from '@/models/productModel';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Opt out of static rendering

export async function GET(request) {
  try {
    await dbConnection();

    // Extract query parameters from the URL
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('order_id');

    // If product_id is provided, fetch a single product by ID
      const order = await ProductModel.findById(orderId);

      if (!order) {
        return NextResponse.json(
          { error: 'Order not found' },
          { status: 404 }
        );
      }
    
    return NextResponse.json(order);

    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
import dbConnection from "@/config/dbConnection";
import ordersModel from "@/models/orderModel";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    // Connect to the database
    await dbConnection();

    // Fetch all checkout details from the database
    const Orders = await ordersModel.find({});

    return NextResponse.json(
      {
        Orders,
        success: true,
        message: "Checkout details fetched successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error fetching checkout details:", error.message);
    return NextResponse.json(
      { success: false, error: "Failed to fetch checkout details" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnection();
    
    const { name, email, phone, address, paymentMethod, cart } = await req.json();

    if (!name || !email || !phone || !address || !paymentMethod || !cart || !Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    const newCheckout = new ordersModel({
      name,
      email,
      phone,
      address,
      paymentMethod,
      cart, 
    });

    await newCheckout.save();

    return NextResponse.json(
      {
        success: true,
        message: "Checkout data saved successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving checkout data:", error);
    return NextResponse.json(
      { error: "Failed to save checkout data" },
      { status: 500 }
    );
  }
}
